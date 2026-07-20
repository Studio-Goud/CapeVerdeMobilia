'use client';

import { useState } from 'react';
import Link from 'next/link';
import { t, type Locale } from '@/i18n';
import { saveFavorite } from '@/lib/browserData';

/** Save-to-favorites button. Writes to Supabase when logged in; guides otherwise. */
export function SaveButton({ listingId, locale }: { listingId: string; locale: Locale }): JSX.Element {
  const [state, setState] = useState<'idle' | 'saved' | 'auth' | 'demo' | 'err'>('idle');

  async function onClick(): Promise<void> {
    const r = await saveFavorite(listingId);
    setState(r === 'ok' ? 'saved' : r === 'auth' ? 'auth' : r === 'demo' ? 'demo' : 'err');
  }

  if (state === 'saved') {
    return <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">♥ {t(locale, 'listing.saved')}</p>;
  }
  return (
    <div>
      <button onClick={() => void onClick()} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand">
        ♡ {t(locale, 'listing.save')}
      </button>
      {state === 'auth' && (
        <p className="mt-1 text-xs text-slate-500">
          <Link href={`/${locale}/entrar`} className="text-brand hover:underline">{t(locale, 'nav.login')}</Link>
        </p>
      )}
      {state === 'demo' && <p className="mt-1 text-xs text-slate-400">{t(locale, 'common.demoAction')}</p>}
      {state === 'err' && <p className="mt-1 text-xs text-red-600">{t(locale, 'common.demoAction')}</p>}
    </div>
  );
}
