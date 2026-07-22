import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from './env';
import type { SupabaseClient } from '@supabase/supabase-js';

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Server Supabase client bound to the request cookies, or null in demo mode.
 * Safe to call in Server Components: cookie writes are ignored there
 * (the middleware refreshes the session), so we swallow the write error.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet: CookieToSet[]) {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          /* called from a Server Component - ignore, middleware handles refresh */
        }
      },
    },
  });
}
