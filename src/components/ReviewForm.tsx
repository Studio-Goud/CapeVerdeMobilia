'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, type Locale } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';

/** Submit a review for a professional (real backend only). */
export function ReviewForm({ proSlug, locale }: { proSlug: string; locale: Locale }): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        {t(locale, 'review.loginTo')}{' '}
        <Link href={`/${locale}/entrar`} className="font-medium text-brand hover:underline">{t(locale, 'nav.login')}</Link>
      </p>
    );
  }
  if (done) {
    return <p className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{t(locale, 'review.thanks')}</p>;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setBusy(true);
    const supabase = getBrowserSupabase();
    if (!supabase) { setBusy(false); return; }
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id;
    if (!uid) { setBusy(false); setError('auth'); return; }
    const { error: err } = await supabase.from('reviews').insert({
      pro_slug: proSlug, author_id: uid, author_name: user?.name ?? '', rating, body, verified: false,
    });
    setBusy(false);
    if (err) { setError(err.message); return; }
    setDone(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="mb-2 text-sm font-semibold text-slate-900">{t(locale, 'review.write')}</p>
      <label className="block text-sm">
        <span className="text-slate-600">{t(locale, 'review.rating')}</span>
        <div className="mt-1 flex gap-1" role="radiogroup" aria-label={t(locale, 'review.rating')}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} aria-checked={rating === n} role="radio"
              className={`text-2xl leading-none ${n <= rating ? 'text-amber-500' : 'text-slate-300'}`}>★</button>
          ))}
        </div>
      </label>
      <label className="mt-3 block text-sm">
        <span className="text-slate-600">{t(locale, 'review.text')}</span>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      {error && <p className="mt-2 rounded bg-red-50 px-2 py-1.5 text-xs text-red-700">{error}</p>}
      <button disabled={busy} className="mt-3 w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
        {t(locale, 'review.submit')}
      </button>
    </form>
  );
}
