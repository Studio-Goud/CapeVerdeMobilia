'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type Role = 'private' | 'business' | 'admin';
export interface DemoUser { name: string; role: Role; email?: string }

export interface SignUpInput { name: string; role: Role; email: string; password: string; company?: string }
export interface SignInInput { email: string; password: string; role?: Role }
export interface AuthResult { error?: string; needsConfirm?: boolean }

interface AuthState {
  ready: boolean;
  configured: boolean;
  user: DemoUser | null;
  signUp: (input: SignUpInput) => Promise<AuthResult>;
  signIn: (input: SignInInput) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  /** Demo-mode only: instant login used by the quick-demo buttons. */
  demoLogin: (u: DemoUser) => void;
}

const STORAGE_KEY = 'djarvista.demoUser';
const AuthContext = createContext<AuthState | null>(null);

function mapUser(u: User | null): DemoUser | null {
  if (!u) return null;
  const md = (u.user_metadata ?? {}) as Record<string, string>;
  const role: Role = md.role === 'business' || md.role === 'admin' ? md.role : 'private';
  const name = md.name || md.company || u.email?.split('@')[0] || 'Utilizador';
  return { name, role, email: u.email ?? undefined };
}

/**
 * Resolve the user with the DB as the source of truth for `role`. The admin
 * console and info editor gate on `role === 'admin'`, and admin is granted by
 * setting `profiles.role` (never in user_metadata) — so trusting metadata alone
 * would leave the console unreachable. We overlay the DB role on the metadata map.
 */
async function resolveUser(
  supabase: NonNullable<ReturnType<typeof getBrowserSupabase>>,
  u: User | null,
): Promise<DemoUser | null> {
  const mapped = mapUser(u);
  if (!mapped || !u) return mapped;
  const { data } = await supabase.from('profiles').select('role').eq('id', u.id).maybeSingle();
  const dbRole = (data as { role?: string } | null)?.role;
  if (dbRole === 'private' || dbRole === 'business' || dbRole === 'admin') mapped.role = dbRole;
  return mapped;
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  const configured = isSupabaseConfigured;

  useEffect(() => {
    if (configured) {
      const supabase = getBrowserSupabase();
      if (!supabase) { setReady(true); return; }
      supabase.auth.getUser()
        .then(async ({ data }) => { setUser(await resolveUser(supabase, data.user)); })
        .catch(() => { /* keep user null on init failure */ })
        .finally(() => setReady(true));
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        void resolveUser(supabase, session?.user ?? null).then(setUser);
      });
      return () => sub.subscription.unsubscribe();
    }
    // demo mode
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch { /* ignore */ }
    setReady(true);
    return undefined;
  }, [configured]);

  const demoLogin = useCallback((u: DemoUser) => {
    setUser(u);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); } catch { /* ignore */ }
  }, []);

  const signUp = useCallback(async (input: SignUpInput): Promise<AuthResult> => {
    if (configured) {
      const supabase = getBrowserSupabase();
      if (!supabase) return { error: 'not-configured' };
      const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: { name: input.name, role: input.role, company: input.company ?? '' },
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
        },
      });
      if (error) return { error: error.message };
      return { needsConfirm: !data.session };
    }
    demoLogin({ name: input.role === 'business' ? (input.company || input.name) : input.name, role: input.role, email: input.email });
    return {};
  }, [configured, demoLogin]);

  const signIn = useCallback(async (input: SignInInput): Promise<AuthResult> => {
    if (configured) {
      const supabase = getBrowserSupabase();
      if (!supabase) return { error: 'not-configured' };
      const { error } = await supabase.auth.signInWithPassword({ email: input.email, password: input.password });
      if (error) return { error: error.message };
      return {};
    }
    demoLogin({ name: input.email.split('@')[0] || 'Utilizador', role: input.role ?? 'private', email: input.email });
    return {};
  }, [configured, demoLogin]);

  const signOut = useCallback(async (): Promise<void> => {
    if (configured) {
      const supabase = getBrowserSupabase();
      await supabase?.auth.signOut();
      setUser(null);
      return;
    }
    setUser(null);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, [configured]);

  const value = useMemo<AuthState>(
    () => ({ ready, configured, user, signUp, signIn, signOut, demoLogin }),
    [ready, configured, user, signUp, signIn, signOut, demoLogin],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
