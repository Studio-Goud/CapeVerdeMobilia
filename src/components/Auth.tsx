'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Role = 'private' | 'business';
export interface DemoUser { name: string; role: Role; email?: string }

interface AuthState {
  ready: boolean;
  user: DemoUser | null;
  login: (u: DemoUser) => void;
  logout: () => void;
}

const STORAGE_KEY = 'djarvista.demoUser';
const AuthContext = createContext<AuthState | null>(null);

/** Client-only demo auth. No backend — the "session" lives in localStorage. */
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const login = useCallback((u: DemoUser) => {
    setUser(u);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); } catch { /* ignore */ }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  const value = useMemo<AuthState>(() => ({ ready, user, login, logout }), [ready, user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
