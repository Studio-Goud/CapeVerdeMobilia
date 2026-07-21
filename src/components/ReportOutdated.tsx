'use client';

import { useState } from 'react';
import { t, type Locale } from '@/i18n';
import { reportPublicationOutdated } from '@/lib/browserData';

export function ReportOutdated({ publicationId, locale }: { publicationId: string | null; locale: Locale }): JSX.Element {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-xs font-medium text-emerald-600">{t(locale, 'info.reportSent')}</p>;
  }

  const handleClick = async (): Promise<void> => {
    // Soft-fail: report is best-effort; never scare the user on error.
    try {
      await reportPublicationOutdated(publicationId, '');
    } catch {
      /* ignore */
    }
    setSent(true);
  };

  return (
    <button
      type="button"
      onClick={() => { void handleClick(); }}
      className="text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-coral"
    >
      {t(locale, 'info.reportOutdated')}
    </button>
  );
}
