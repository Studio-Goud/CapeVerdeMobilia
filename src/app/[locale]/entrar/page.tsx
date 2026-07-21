'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth, type Role } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';

const FORGOT: TL = { pt: 'Esqueceu a palavra-passe?', en: 'Forgot your password?', nl: 'Wachtwoord vergeten?' };
const FORGOT_SENT: TL = { pt: 'Enviámos um link de recuperação para o seu email.', en: 'We sent a recovery link to your email.', nl: 'We hebben een herstel-link naar je e-mail gestuurd.' };
const FORGOT_NEEDEMAIL: TL = { pt: 'Introduza o seu email primeiro.', en: 'Enter your email first.', nl: 'Vul eerst je e-mail in.' };

export default function LoginPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { signIn, demoLogin, configured } = useAuth();
  const [role, setRole] = useState<Role>('private');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onForgot(): Promise<void> {
    setError(null); setNotice(null);
    if (!email) { setError(tr(FORGOT_NEEDEMAIL, locale)); return; }
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/${locale}/nova-senha`,
    });
    if (err) { setError(err.message); return; }
    setNotice(tr(FORGOT_SENT, locale));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setBusy(true);
    const res = await signIn({ email, password, role });
    setBusy(false);
    if (res.error) { setError(res.error); return; }
    router.push(`/${locale}/painel`);
  }
  function quick(u: { name: string; role: Role }): void {
    demoLogin(u);
    router.push(`/${locale}/painel`);
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">{t(locale, 'auth.loginTitle')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t(locale, 'auth.loginSubtitle')}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        {!configured && (
          <div className="flex gap-2">
            {(['private', 'business'] as Role[]).map((r) => (
              <button type="button" key={r} onClick={() => setRole(r)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${role === r ? 'border-brand bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'}`}>
                {t(locale, r === 'private' ? 'auth.private' : 'auth.business')}
              </button>
            ))}
          </div>
        )}
        <label className="block text-sm">
          <span className="text-slate-600">{t(locale, 'auth.email')}</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="voce@exemplo.cv" />
        </label>
        <label className="block text-sm">
          <span className="text-slate-600">{t(locale, 'auth.password')}</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="••••••••" />
        </label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
          {t(locale, 'auth.loginBtn')}
        </button>
        {notice && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{notice}</p>}
        {configured && (
          <button type="button" onClick={() => void onForgot()} className="w-full text-center text-xs text-slate-500 hover:text-brand">
            {tr(FORGOT, locale)}
          </button>
        )}
      </form>

      {!configured && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-sand-50 p-4">
          <p className="text-xs text-slate-500">{t(locale, 'auth.quickDemo')}</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <button onClick={() => quick({ name: 'Ana', role: 'private' })} className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand">
              {t(locale, 'auth.demoPrivate')}
            </button>
            <button onClick={() => quick({ name: 'Construções Djar', role: 'business' })} className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand">
              {t(locale, 'auth.demoBusiness')}
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-sm">
        <Link href={`/${locale}/registar`} className="text-brand hover:underline">{t(locale, 'auth.noAccount')}</Link>
      </p>
      {!configured && <p className="mt-3 text-xs text-slate-400">{t(locale, 'auth.demoNote')}</p>}
    </div>
  );
}
