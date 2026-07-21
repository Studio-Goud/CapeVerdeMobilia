'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';

const TXT = {
  title: { pt: 'Definir nova palavra-passe', en: 'Set a new password', nl: 'Nieuw wachtwoord instellen' } as TL,
  intro: { pt: 'Escolha uma nova palavra-passe para a sua conta.', en: 'Choose a new password for your account.', nl: 'Kies een nieuw wachtwoord voor je account.' } as TL,
  field: { pt: 'Nova palavra-passe', en: 'New password', nl: 'Nieuw wachtwoord' } as TL,
  save: { pt: 'Guardar palavra-passe', en: 'Save password', nl: 'Wachtwoord opslaan' } as TL,
  done: { pt: 'Palavra-passe atualizada.', en: 'Password updated.', nl: 'Wachtwoord bijgewerkt.' } as TL,
  needLink: { pt: 'Abra esta página a partir do link de recuperação no seu email.', en: 'Open this page from the recovery link in your email.', nl: 'Open deze pagina via de herstel-link in je e-mail.' } as TL,
};

export default function NewPasswordPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user } = useAuth();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        {tr(TXT.needLink, locale)}
        <div className="mt-3"><Link href={`/${locale}/entrar`} className="font-semibold text-brand hover:underline">{t(locale, 'nav.login')}</Link></div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setBusy(true);
    const supabase = getBrowserSupabase();
    if (!supabase) { setBusy(false); return; }
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) { setError(err.message); return; }
    setDone(true);
    setTimeout(() => router.push(`/${locale}/painel`), 1200);
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">{tr(TXT.title, locale)}</h1>
      <p className="mt-1 text-sm text-slate-600">{tr(TXT.intro, locale)}</p>
      {done ? (
        <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{tr(TXT.done, locale)}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <label className="block text-sm">
            <span className="text-slate-600">{tr(TXT.field, locale)}</span>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="••••••••" />
          </label>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{tr(TXT.save, locale)}</button>
        </form>
      )}
    </div>
  );
}
