'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { t, type Locale } from '@/i18n';
import { useAuth } from './Auth';
import { submitClaim, type ClaimProfileType } from '@/lib/browserData';

/** "Is this your business? Claim it" — on seeded (unclaimed) directory profiles.
 *  Files a claim request that the trust & ops team reviews manually. */
export function ClaimBusiness({ locale, profileType, profileId, compact = false }: {
  locale: Locale; profileType: ClaimProfileType; profileId: string; compact?: boolean;
}): JSX.Element {
  const { ready, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');

  if (!ready) return <span aria-hidden />;

  if (sent) {
    return <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">{t(locale, 'claim.sent')}</p>;
  }

  if (!user) {
    return (
      <p className={compact ? 'text-xs text-slate-500' : 'text-sm text-slate-600'}>
        <Link href={`/${locale}/entrar`} className="font-semibold text-brand hover:underline">{t(locale, 'claim.cta')}</Link>
        {' — '}{t(locale, 'claim.loginFirst')}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand transition hover:bg-brand-50"
      >
        {t(locale, 'claim.cta')}
      </button>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setBusy(true); setError(null);
    const err = await submitClaim(profileType, profileId, message.trim(), phone.trim());
    setBusy(false);
    if (err === 'duplicate') { setError(t(locale, 'claim.already')); return; }
    if (err) { setError(err); return; }
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 text-sm">
      <p className="text-xs text-slate-500">{t(locale, 'claim.explain')}</p>
      <textarea
        required value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
        aria-label={t(locale, 'claim.message')} placeholder={t(locale, 'claim.message')}
        className="w-full rounded border px-2 py-1.5"
      />
      <input
        required value={phone} onChange={(e) => setPhone(e.target.value)}
        aria-label={t(locale, 'claim.phone')} placeholder={t(locale, 'claim.phone')}
        className="w-full rounded border px-2 py-1.5"
      />
      {error && <p className="rounded bg-red-50 px-2 py-1.5 text-xs text-red-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white disabled:opacity-60">
        {busy ? '…' : t(locale, 'claim.submit')}
      </button>
    </form>
  );
}
