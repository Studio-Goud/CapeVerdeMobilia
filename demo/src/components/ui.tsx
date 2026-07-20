import Link from 'next/link';
import {
  type Locale, type Listing, type VerificationLevel,
  t, tr, formatPrice, docLabel, verifLabel,
} from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

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

export function ListingCard({ l, locale }: { l: Listing; locale: Locale }): JSX.Element {
  return (
    <Link href={`/${locale}/imoveis/${l.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md">
      <div className="relative aspect-[4/3] bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.thumbnail} alt={tr(l.title, locale)} className="h-full w-full object-cover" loading="lazy" />
        {l.isFeatured && <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">{t(locale, 'common.sponsored')}</span>}
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{tr(l.title, locale)}</h3>
        <p className="text-sm font-bold text-slate-900">{formatPrice(locale, l.priceAmount, l.priceOnRequest)}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{l.island}</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5">{docLabel(locale, l.documentStatus)}</span>
        </div>
      </div>
    </Link>
  );
}

export function ListingGrid({ rows, locale }: { rows: Listing[]; locale: Locale }): JSX.Element {
  if (rows.length === 0) return <p className="rounded-lg border border-dashed border-slate-300 p-6 text-slate-500">—</p>;
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((l) => <ListingCard key={l.id} l={l} locale={locale} />)}</div>;
}

export function SiteHeader({ locale }: { locale: Locale }): JSX.Element {
  const nav = [
    { href: `/${locale}/imoveis`, label: t(locale, 'nav.imoveis') },
    { href: `/${locale}/profissionais`, label: t(locale, 'nav.profissionais') },
    { href: `/${locale}/info`, label: t(locale, 'nav.info') },
    { href: `/${locale}/procedimentos`, label: t(locale, 'nav.procedimentos') },
  ];
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="text-lg font-bold text-brand">Djarvista</Link>
        <nav aria-label="Primary" className="hidden gap-4 text-sm font-medium text-slate-600 md:flex">
          {nav.map((i) => <Link key={i.href} href={i.href} className="hover:text-brand">{i.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link href={`/${locale}/pedidos/novo`} className="hidden rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark sm:inline-block">{t(locale, 'nav.postJob')}</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }): JSX.Element {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">Djarvista</p>
        <p className="mt-1 max-w-2xl">{t(locale, 'footer.body')}</p>
        <p className="mt-2">{t(locale, 'footer.demo')}</p>
      </div>
    </footer>
  );
}
