'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth, type Role } from '@/components/Auth';

const CHECK_EMAIL: TL = {
  pt: 'Conta criada. Verifique o seu email para confirmar antes de entrar.',
  en: 'Account created. Check your email to confirm before logging in.',
  nl: 'Account aangemaakt. Bevestig via je e-mail voordat je inlogt.',
};

export default function RegisterPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { signUp } = useAuth();
  const [role, setRole] = useState<Role>('private');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setNotice(null); setBusy(true);
    const res = await signUp({ name, role, email, password, company: role === 'business' ? company : undefined });
    setBusy(false);
    if (res.error) { setError(res.error); return; }
    if (res.needsConfirm) { setNotice(tr(CHECK_EMAIL, locale)); return; }
    router.push(`/${locale}/painel`);
  }

  const roleCard = (r: Role): JSX.Element => (
    <button type="button" key={r} onClick={() => setRole(r)}
      className={`rounded-xl border p-4 text-left transition ${role === r ? 'border-brand bg-brand-50 ring-1 ring-brand' : 'border-slate-200 bg-white hover:border-brand-300'}`}>
      <span className="flex items-center gap-2 font-semibold text-slate-900">
        <span aria-hidden>{r === 'private' ? '🏠' : '🏢'}</span>
        {t(locale, r === 'private' ? 'auth.private' : 'auth.business')}
      </span>
      <span className="mt-1 block text-xs text-slate-500">{t(locale, r === 'private' ? 'auth.privateDesc' : 'auth.businessDesc')}</span>
    </button>
  );

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900">{t(locale, 'auth.registerTitle')}</h1>
      <p className="mt-1 text-sm text-slate-600">{t(locale, 'auth.registerSubtitle')}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">{t(locale, 'auth.accountType')}</p>
          <div className="grid gap-3 sm:grid-cols-2">{roleCard('private')}{roleCard('business')}</div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          {role === 'business' && (
            <label className="block text-sm">
              <span className="text-slate-600">{t(locale, 'auth.companyName')}</span>
              <input required value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>
          )}
          <label className="block text-sm">
            <span className="text-slate-600">{t(locale, 'auth.name')}</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600">{t(locale, 'auth.email')}</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="voce@exemplo.cv" />
          </label>
          <label className="block text-sm">
            <span className="text-slate-600">{t(locale, 'auth.password')}</span>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="••••••••" />
          </label>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {notice && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{notice}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-coral px-3 py-2.5 font-semibold text-white hover:bg-coral-600 disabled:opacity-60">
            {t(locale, 'auth.registerBtn')}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link href={`/${locale}/entrar`} className="text-brand hover:underline">{t(locale, 'auth.haveAccount')}</Link>
      </p>
      <p className="mt-3 text-xs text-slate-400">{t(locale, 'auth.demoNote')}</p>
    </div>
  );
}
