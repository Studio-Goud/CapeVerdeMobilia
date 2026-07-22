import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from '@/lib/supabase/env';

type CookieToSet = { name: string; value: string; options: CookieOptions };

// Private / utility routes (login, forms, dashboards) — keep them out of search
// indexes. Works for client-component pages too, which can't export metadata.
const PRIVATE = /\/(painel|admin|entrar|registar|nova-senha|verificar|mensagens|editor|novo|publicar|editar)(\/|$)/;
const noindex = (res: NextResponse, path: string): NextResponse => {
  if (PRIVATE.test(path)) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
};

/** Refreshes the Supabase auth session on each request. No-op in demo mode. */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  if (!isSupabaseConfigured) return noindex(NextResponse.next(), path);

  let response = NextResponse.next({ request });
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(toSet: CookieToSet[]) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // Touch the session so tokens refresh and cookies are rewritten.
  await supabase.auth.getUser();
  return noindex(response, path);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
