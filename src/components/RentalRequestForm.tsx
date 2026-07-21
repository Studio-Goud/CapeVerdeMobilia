'use client';

import { useState } from 'react';
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { createRentalRequest } from '@/lib/browserData';

const COPY = {
  loginPrompt: {
    pt: 'Entre para pedir para arrendar',
    en: 'Log in to request to rent',
    nl: 'Log in om een huuraanvraag te doen',
  },
  title: {
    pt: 'Pedir para arrendar',
    en: 'Request to rent',
    nl: 'Huuraanvraag versturen',
  },
  start: { pt: 'Data de início', en: 'Start date', nl: 'Startdatum' },
  end: { pt: 'Data de fim', en: 'End date', nl: 'Einddatum' },
  message: { pt: 'Mensagem para o senhorio', en: 'Message to the landlord', nl: 'Bericht aan de verhuurder' },
  demo: {
    pt: 'Demonstração — o pedido não é enviado sem backend ativo.',
    en: 'Demo — the request is not sent without an active backend.',
    nl: 'Demo — de aanvraag wordt niet verzonden zonder actieve backend.',
  },
  success: {
    pt: 'Pedido enviado ao senhorio.',
    en: 'Request sent to the landlord.',
    nl: 'Aanvraag verstuurd naar de verhuurder.',
  },
} satisfies Record<string, TL>;

interface RentalRequestFormProps {
  locale: Locale;
  listingId: string;
  landlordId?: string | null;
}

export function RentalRequestForm({ locale, listingId, landlordId }: RentalRequestFormProps): JSX.Element {
  const { ready, user } = useAuth();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
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
    const result = await createRentalRequest({
      listingId,
      landlordId: landlordId ?? null,
      start,
      end,
      message,
    });
    setBusy(false);
    if (result === null) {
      setDone(true);
      return;
    }
    setError(result === 'demo' ? tr(COPY.demo, locale) : result);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="mb-3 text-sm font-semibold text-slate-900">{tr(COPY.title, locale)}</p>
      <label className="block text-sm">
        <span className="text-slate-600">{tr(COPY.start, locale)}</span>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="mt-3 block text-sm">
        <span className="text-slate-600">{tr(COPY.end, locale)}</span>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
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
