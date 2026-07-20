// Central switch for real backend vs demo mode.
// When the two public env vars are present, the app talks to Supabase;
// otherwise it stays in the database-free demo mode (fictional data, local auth).

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** True only when both public Supabase env vars are configured. */
export const isSupabaseConfigured: boolean = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
