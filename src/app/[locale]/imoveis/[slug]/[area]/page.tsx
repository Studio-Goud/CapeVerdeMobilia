// Property category × island landing, e.g. /imoveis/venda/sao-vicente.
// Two segments after /imoveis, so it never collides with the single-segment
// listing-detail route /imoveis/[slug]. Unknown deal/area → notFound().
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { filterListings, t, tr, type Locale } from '@/i18n';
import { fetchListings } from '@/lib/data';
import { ListingGrid } from '@/components/ui';
import { JsonLd } from '@/components/JsonLd';
import { AREAS, AREA_SLUGS, PROPERTY_DEALS, PROPERTY_DEAL_SLUGS, propertyLandingMeta } from '@/lib/landings';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/jsonld';

interface Params { locale: Locale; slug: string; area: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  return propertyLandingMeta(params.locale, params.slug, params.area) ?? {};
}

export default async function PropertyLandingPage({ params }: { params: Params }): Promise<JSX.Element> {
  const { locale } = params;
  const deal = PROPERTY_DEALS[params.slug];
  const area = AREAS[params.area];
  if (!deal || !area) notFound();

  const rows = filterListings(await fetchListings(), { kind: deal.kind, islandCode: area.code }, locale);
  const path = `/${locale}/imoveis/${deal.slug}/${area.slug}`;
  const guideParas = tr(area.body, locale).split('\n\n');
  const otherDeals = PROPERTY_DEAL_SLUGS.filter((s) => s !== deal.slug);
  const otherAreas = AREA_SLUGS.filter((s) => s !== area.slug);
  const chip = 'rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand hover:text-brand';

  return (
    <div className="space-y-8">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Djarvista', url: `/${locale}` },
        { name: t(locale, 'nav.imoveis'), url: `/${locale}/imoveis` },
        { name: tr(deal.h1(area.name), locale), url: path },
      ])} />
      <JsonLd data={collectionPageJsonLd({
        path, name: tr(deal.h1(area.name), locale), description: tr(deal.desc(area.name), locale), locale,
        items: rows.map((l) => ({ url: `/${locale}/imoveis/${l.slug}`, name: tr(l.title, locale) })),
      })} />

      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href={`/${locale}/imoveis`} className="hover:text-brand">{t(locale, 'nav.imoveis')}</Link></li>
          <li aria-hidden>›</li>
          <li className="text-slate-700">{tr(deal.label, locale)} · {area.name}</li>
        </ol>
      </nav>

      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(deal.h1(area.name), locale)}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{tr(deal.blurb(area.name), locale)}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {otherDeals.map((s) => (
          <Link key={s} href={`/${locale}/imoveis/${s}/${area.slug}`} className={chip}>{tr(PROPERTY_DEALS[s].label, locale)}</Link>
        ))}
        <Link href={`/${locale}/imoveis?kind=${deal.kind}&islandCode=${area.code}`} className={chip}>{t(locale, 'common.filter')} ⚙</Link>
      </div>

      <div>
        <p className="mb-3 text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>
        <ListingGrid rows={rows} locale={locale} />
      </div>

      {/* Island buyer's guide — unique long-form content (not thin) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">{tr({ pt: `Comprar em ${area.name}`, en: `Buying in ${area.name}`, nl: `Kopen op ${area.name}` }, locale)}</h2>
        <p className="mt-2 text-sm text-slate-600">{tr(area.intro, locale)}</p>
        {guideParas.map((para, i) => <p key={i} className="mt-3 text-sm leading-relaxed text-slate-600">{para}</p>)}
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">{t(locale, 'proc.disclaimer')}</p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{tr({ pt: 'Noutras ilhas', en: 'On other islands', nl: 'Op andere eilanden' }, locale)}</h2>
        <div className="flex flex-wrap gap-2">
          {otherAreas.map((s) => (
            <Link key={s} href={`/${locale}/imoveis/${deal.slug}/${s}`} className={chip}>{tr(deal.label, locale)} · {AREAS[s].name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
