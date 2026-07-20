import Link from 'next/link';
import { searchListings, PROFESSIONALS, t, tr, type Locale } from '@/i18n';
import { ListingGrid } from '@/components/ui';

export default function HomePage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const listings = searchListings({}, locale).slice(0, 6);
  const professionals = PROFESSIONALS.slice(0, 4);
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand px-6 py-10 text-white">
        <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">{t(locale, 'home.heroTitle')}</h1>
        <p className="mt-3 max-w-2xl text-white/90">{t(locale, 'home.heroSubtitle')}</p>
        <form action={`/${locale}/imoveis`} className="mt-6 flex max-w-xl gap-2">
          <input type="search" name="q" placeholder={t(locale, 'home.searchPlaceholder')} className="w-full rounded-lg px-3 py-2 text-slate-900" aria-label={t(locale, 'common.search')} />
          <button className="rounded-lg bg-white px-4 py-2 font-semibold text-brand">{t(locale, 'common.search')}</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href={`/${locale}/imoveis?kind=LAND`} className="underline">{t(locale, 'home.land')}</Link>
          <Link href={`/${locale}/profissionais`} className="underline">{t(locale, 'home.verifiedPros')}</Link>
          <Link href={`/${locale}/procedimentos`} className="underline">{t(locale, 'home.howTo')}</Link>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t(locale, 'home.featured')}</h2>
          <Link href={`/${locale}/imoveis`} className="text-sm text-brand hover:underline">{t(locale, 'common.viewAll')}</Link>
        </div>
        <ListingGrid rows={listings} locale={locale} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t(locale, 'home.professionals')}</h2>
          <Link href={`/${locale}/profissionais`} className="text-sm text-brand hover:underline">{t(locale, 'common.viewAll')}</Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((p) => (
            <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-semibold">{p.displayName}</p>
              <p className="text-sm text-slate-500">{tr(p.headline, locale)}</p>
              <p className="mt-2 text-xs text-slate-500">{p.ratingAvg ? `★ ${p.ratingAvg.toFixed(1)} (${p.ratingCount})` : t(locale, 'pros.noReviews')}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
