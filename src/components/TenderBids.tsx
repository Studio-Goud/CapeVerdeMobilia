'use client';

import { useEffect, useState } from 'react';
import { formatEur, cveToEur, formatDate, tr, type Locale, type TL } from '@/i18n';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { fetchTenderBids, type BidItem } from '@/lib/browserData';

const COPY = {
  heading: { pt: 'Propostas recebidas', en: 'Bids received', nl: 'Ontvangen inschrijvingen' },
  none: { pt: 'Ainda não há propostas.', en: 'No bids yet.', nl: 'Nog geen inschrijvingen.' },
  noAmount: { pt: 'Valor não indicado', en: 'No amount given', nl: 'Geen bedrag opgegeven' },
} satisfies Record<string, TL>;

/**
 * Shows the bids on a tender — but only to the tender owner. RLS already limits
 * `tender_bids` reads to the owner (and each bidder to their own row), so this
 * component additionally gates on ownerId to avoid showing a bidder their single
 * row as if it were the owner's inbox.
 */
export function TenderBids({ locale, tenderId, ownerId }: { locale: Locale; tenderId: string; ownerId: string | null }): JSX.Element | null {
  const [bids, setBids] = useState<BidItem[] | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    let active = true;
    async function load(): Promise<void> {
      const supa = getBrowserSupabase();
      if (!supa || !ownerId) return;
      const { data } = await supa.auth.getUser();
      if (!active || data.user?.id !== ownerId) return;
      setIsOwner(true);
      setBids(await fetchTenderBids(tenderId));
    }
    void load();
    return () => { active = false; };
  }, [tenderId, ownerId]);

  if (!isOwner) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <h2 className="mb-2 text-sm font-semibold text-slate-900">{tr(COPY.heading, locale)}</h2>
      {bids === null ? (
        <div className="h-10" aria-hidden />
      ) : bids.length === 0 ? (
        <p className="text-sm text-slate-500">{tr(COPY.none, locale)}</p>
      ) : (
        <ul className="space-y-2">
          {bids.map((b) => (
            <li key={b.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-brand">
                {b.amount_cve == null ? tr(COPY.noAmount, locale) : formatEur(cveToEur(b.amount_cve))}
              </p>
              {b.message && <p className="mt-0.5 text-sm text-slate-700">{b.message}</p>}
              <p className="mt-1 text-xs text-slate-500">{formatDate(locale, b.created_at)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
