import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  type Locale, type Listing, type VerificationLevel, type UIKey,
  t, tr, formatPrice, docLabel, verifLabel,
} from '@/i18n';
import { Wordmark } from './Wordmark';

const cn = (...p: Array<string | false | null | undefined>): string => p.filter(Boolean).join(' ');

export function TrustBadge({ level, locale }: { level: VerificationLevel; locale: Locale }): JSX.Element {
  const strong = level === 'L4_TRANSACTION' || level === 'L5_INSTITUTIONAL';
  const mid = level === 'L2_BUSINESS' || level === 'L3_DOCUMENTS';
  const label = verifLabel(locale, level);
  return (
    <span title={label}
      className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        strong && 'bg-emerald-100 text-emerald-800', mid && 'bg-sky-100 text-sky-800',
        !strong && !mid && 'bg-slate-100 text-slate-600')}>
      <span aria-hidden>{level === 'L0_NONE' ? '○' : '✓'}</span>{label}
    </span>
  );
}

export function OfficialTag({ variant, locale }: { variant: 'official' | 'summary' | 'unconfirmed'; locale: Locale }): JSX.Element {
  const map = {
    official: { key: 'official.official', cls: 'bg-emerald-600 text-white' },
    summary: { key: 'official.summary', cls: 'bg-slate-200 text-slate-700' },
    unconfirmed: { key: 'official.unconfirmed', cls: 'bg-amber-100 text-amber-800' },
  } as const;
  const { key, cls } = map[variant];
  return <span className={cn('inline-flex rounded px-2 py-0.5 text-xs font-semibold', cls)}>{t(locale, key)}</span>;
}

/** Section heading with optional "view all" link. */
export function SectionHead({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }): JSX.Element {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {href && linkLabel && <Link href={href} className="shrink-0 text-sm font-medium text-brand hover:underline">{linkLabel}</Link>}
    </div>
  );
}

/** Page title block for interior pages. */
export function PageTitle({ title, intro }: { title: string; intro?: string }): JSX.Element {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      {intro && <p className="mt-2 max-w-3xl text-sm text-slate-600">{intro}</p>}
    </header>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }): JSX.Element {
  return <div className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-card', className)}>{children}</div>;
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }): JSX.Element {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'brand' | 'coral' | 'emerald' | 'amber' }): JSX.Element {
  const tones = {
    slate: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-700',
    coral: 'bg-coral-50 text-coral-700',
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
  } as const;
  return <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', tones[tone])}>{children}</span>;
}

export function ListingCard({ l, locale }: { l: Listing; locale: Locale }): JSX.Element {
  return (
    <Link href={`/${locale}/imoveis/${l.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.thumbnail} alt={tr(l.title, locale)} className="h-full w-full object-cover" loading="lazy" />
        {l.isFeatured && <span className="absolute left-2 top-2 rounded bg-coral px-2 py-0.5 text-xs font-semibold text-white">{t(locale, 'common.sponsored')}</span>}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{tr(l.title, locale)}</h3>
        <p className="text-sm font-bold text-brand">{formatPrice(locale, l.priceAmount, l.priceOnRequest)}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{l.island}</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5">{docLabel(locale, l.documentStatus)}</span>
        </div>
      </div>
    </Link>
  );
}

/** Shared empty-state card for directory/list pages with no content yet. */
export function EmptyState({ icon = '🏝️', message, ctaHref, ctaLabel }: { icon?: string; message: string; ctaHref?: string; ctaLabel?: string }): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
      <span aria-hidden className="text-3xl">{icon}</span>
      <p className="max-w-md text-sm font-medium text-slate-600">{message}</p>
      {ctaHref && ctaLabel && (
        <Link href={ctaHref} className="mt-1 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white hover:bg-coral-600">{ctaLabel}</Link>
      )}
    </div>
  );
}

export function ListingGrid({ rows, locale }: { rows: Listing[]; locale: Locale }): JSX.Element {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
        <span aria-hidden className="text-3xl">🏝️</span>
        <p className="text-sm font-medium text-slate-600">{t(locale, 'common.noListings')}</p>
        <Link href={`/${locale}/imoveis/publicar`} className="mt-1 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white hover:bg-coral-600">
          {t(locale, 'common.beFirst')}
        </Link>
      </div>
    );
  }
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((l) => <ListingCard key={l.id} l={l} locale={locale} />)}</div>;
}

export function SiteFooter({ locale }: { locale: Locale }): JSX.Element {
  const link = (href: string, key: UIKey): JSX.Element => (
    <li><Link href={`/${locale}${href}`} className="hover:text-brand">{t(locale, key)}</Link></li>
  );
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Wordmark className="text-lg" />
          <p className="mt-2 max-w-md text-xs text-slate-500">{t(locale, 'footer.body')}</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{t(locale, 'footer.explore')}</p>
          <ul className="space-y-1 text-sm text-slate-600">
            {link('/imoveis', 'nav.imoveis')}
            {link('/profissionais', 'nav.profissionais')}
            {link('/assistente', 'nav.wizard')}
            {link('/info', 'nav.info')}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{t(locale, 'footer.account')}</p>
          <ul className="space-y-1 text-sm text-slate-600">
            {link('/entrar', 'nav.login')}
            {link('/registar', 'nav.register')}
            {link('/painel', 'nav.dashboard')}
            {link('/precos', 'nav.pricing')}
            {link('/investir', 'nav.investir')}
            {link('/info/editor', 'info.editorLink')}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t(locale, 'footer.demo')}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {link('/termos', 'footer.terms')}
            {link('/privacidade', 'footer.privacy')}
            {link('/info', 'nav.info')}
          </ul>
        </div>
      </div>
    </footer>
  );
}
