import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { getServerSupabase } from '@/lib/supabase/server';

/**
 * Handles Supabase auth redirects: email confirmation, magic links and
 * password recovery. Exchanges the code/token for a session (sets cookies),
 * then sends the user to their dashboard.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const tokenHash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type') as EmailOtpType | null;
  const next = url.searchParams.get('next') ?? '/pt/painel';

  const supabase = getServerSupabase();
  if (supabase) {
    if (code) await supabase.auth.exchangeCodeForSession(code);
    else if (tokenHash && type) await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  }
  return NextResponse.redirect(new URL(next, url.origin));
}
