'use client';

import { useState, type FormEvent } from 'react';
import { t, type Locale } from '@/i18n';
import { getBrowserSupabase } from '@/lib/supabase/client';

const isUuid = (v: string | undefined): v is string => !!v && /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(v);

/** Contact / lead form. Writes to Supabase when configured; otherwise acknowledges (demo). */
export function LeadForm({ locale, listingId, proSlug, source = 'contact' }: {
  locale: Locale; listingId?: string; proSlug?: string; source?: string;
}): JSX.Element {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }): void => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    const supabase = getBrowserSupabase();
    if (supabase) {
      setBusy(true);
      const { error: err } = await supabase.from('leads').insert({
        name: form.name, email: form.email || null, phone: form.phone || null, message: form.message,
        listing_id: isUuid(listingId) ? listingId : null, pro_slug: proSlug ?? null, source,
      });
      setBusy(false);
      if (err) { setError(err.message); return; }
    }
    setSent(true);
  }

  if (sent) {
    return <p className="mt-2 rounded bg-emerald-50 p-3 text-sm text-emerald-800">{t(locale, 'lead.ok')}</p>;
  }
  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-2 text-sm">
      <input required value={form.name} onChange={set('name')} placeholder={t(locale, 'lead.name')} className="w-full rounded border px-2 py-1.5" />
      <input type="email" value={form.email} onChange={set('email')} placeholder={t(locale, 'lead.email')} className="w-full rounded border px-2 py-1.5" />
      <input value={form.phone} onChange={set('phone')} placeholder={t(locale, 'lead.phone')} className="w-full rounded border px-2 py-1.5" />
      <textarea required value={form.message} onChange={set('message')} rows={3} placeholder={t(locale, 'lead.message')} className="w-full rounded border px-2 py-1.5" />
      {error && <p className="rounded bg-red-50 px-2 py-1.5 text-xs text-red-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white disabled:opacity-60">{t(locale, 'common.send')}</button>
    </form>
  );
}
