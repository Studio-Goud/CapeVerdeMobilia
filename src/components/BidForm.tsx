'use client';

import { useState } from 'react';
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { submitBid } from '@/lib/browserData';

const COPY = {
  loginPrompt: {
    pt: 'Entre para enviar uma proposta',
    en: 'Log in to bid',
    nl: 'Log in om te bieden',
  },
  title: {
    pt: 'Enviar proposta',
    en: 'Submit a bid',
    nl: 'Bod versturen',
  },
  amount: { pt: 'Valor (CVE)', en: 'Amount (CVE)', nl: 'Bedrag (CVE)' },
  message: { pt: 'Mensagem', en: 'Message', nl: 'Bericht' },
  demo: {
    pt: 'Demonstração - a proposta não é enviada sem backend ativo.',
    en: 'Demo - the bid is not sent without an active backend.',
    nl: 'Demo - het bod wordt niet verzonden zonder actieve backend.',
  },
  sessionExpired: {
    pt: 'A sua sessão expirou. Entre novamente para enviar a proposta.',
    en: 'Your session has expired. Please log in again to send the bid.',
    nl: 'Uw sessie is verlopen. Log opnieuw in om het bod te versturen.',
  },
  success: {
    pt: 'Proposta enviada.',
    en: 'Bid submitted.',
    nl: 'Bod verstuurd.',
  },
} satisfies Record<string, TL>;

export function BidForm({ locale, tenderId }: { locale: Locale; tenderId: string }): JSX.Element {
  const { ready, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (!ready) {
    return <div className="h-24" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-card">
        <p>{tr(COPY.loginPrompt, locale)}</p>
        <Link href={`/${locale}/entrar`} className="mt-2 inline-block font-semibold text-brand hover:underline">
          {t(locale, 'nav.login')}
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 shadow-card">
        {tr(COPY.success, locale)}
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = await submitBid({
      tenderId,
      amount: amount ? Math.round(Number(amount)) : null,
      message,
    });
    setBusy(false);
    if (result === null) {
      setDone(true);
      return;
    }
    if (result === 'demo') setError(tr(COPY.demo, locale));
    else if (result === 'auth') setError(tr(COPY.sessionExpired, locale));
    else setError(result);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="mb-3 text-sm font-semibold text-slate-900">{tr(COPY.title, locale)}</p>
      <label className="block text-sm">
        <span className="text-slate-600">{tr(COPY.amount, locale)}</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="mt-3 block text-sm">
        <span className="text-slate-600">{tr(COPY.message, locale)}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      {error && <p className="mt-2 rounded bg-red-50 px-2 py-1.5 text-xs text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-3 w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {tr(COPY.title, locale)}
      </button>
    </form>
  );
}
