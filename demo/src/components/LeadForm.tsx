'use client';

import { useState, type FormEvent } from 'react';
import { t, type Locale } from '@/i18n';

/** Demo contact form — no backend; acknowledges client-side. */
export function LeadForm({ locale }: { locale: Locale }): JSX.Element {
  const [sent, setSent] = useState(false);
  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setSent(true);
  }
  if (sent) {
    return <p className="mt-2 rounded bg-emerald-50 p-3 text-sm text-emerald-800">{t(locale, 'lead.ok')}</p>;
  }
  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-2 text-sm">
      <input required placeholder={t(locale, 'lead.name')} className="w-full rounded border px-2 py-1.5" />
      <input type="email" placeholder={t(locale, 'lead.email')} className="w-full rounded border px-2 py-1.5" />
      <input placeholder={t(locale, 'lead.phone')} className="w-full rounded border px-2 py-1.5" />
      <textarea required rows={3} placeholder={t(locale, 'lead.message')} className="w-full rounded border px-2 py-1.5" />
      <button className="w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white">{t(locale, 'common.send')}</button>
    </form>
  );
}
