import { notFound } from 'next/navigation';
import { t, tr, formatPrice, formatDate, docLabel, type Locale, type TL } from '@/i18n';
import { fetchListingBySlug, fetchListings } from '@/lib/data';
import { OfficialTag, ListingCard, SectionHead } from '@/components/ui';
import { LeadForm } from '@/components/LeadForm';
import { SaveButton } from '@/components/SaveButton';
import { MapExplorer } from '@/components/MapExplorer';
import { coordsFor } from '@/lib/geo';

const SIMILAR: TL = { pt: 'Imóveis semelhantes', en: 'Similar properties', nl: 'Vergelijkbaar aanbod' };
const LOCATION: TL = { pt: 'Localização', en: 'Location', nl: 'Locatie' };
const MAP_SOON: TL = { pt: 'Localização aproximada', en: 'Approximate location', nl: 'Locatie bij benadering' };

export default async function ListingDetailPage({ params }: { params: { locale: Locale; slug: string } }): Promise<JSX.Element> {
  const locale = params.locale;
  const l = await fetchListingBySlug(params.slug);
  if (!l) notFound();
  const similar = (await fetchListings()).filter((o) => o.island === l.island && o.slug !== l.slug).slice(0, 3);
  const loc = coordsFor(l);
  const gallery = l.photos && l.photos.length > 0 ? l.photos : [l.thumbnail];

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {l.isFeatured && <span className="mb-2 inline-block rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">{t(locale, 'common.sponsored')}</span>}
        <h1 className="text-2xl font-bold">{tr(l.title, locale)}</h1>
        <p className="mt-1 text-slate-500">{l.municipality} · {l.island}</p>
        <p className="mt-3 text-2xl font-bold text-brand">{formatPrice(locale, l.priceAmount, l.priceOnRequest)}</p>
        <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[0]} alt={tr(l.title, locale)} className="h-full w-full object-cover" />
        </div>
        {gallery.length > 1 && (
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {gallery.slice(1).map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}
        <section className="mt-6"><h2 className="text-lg font-semibold">{t(locale, 'listing.description')}</h2>
          <p className="mt-2 whitespace-pre-line text-slate-700">{tr(l.description, locale)}</p></section>

        {l.property && (
          <section className="mt-6"><h2 className="text-lg font-semibold">{t(locale, 'listing.features')}</h2>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <li>{t(locale, 'common.type')}: {l.property.type}</li>
              {l.property.bedrooms != null && <li>{t(locale, 'listing.bedrooms')}: {l.property.bedrooms}</li>}
              {l.property.bathrooms != null && <li>{t(locale, 'listing.bathrooms')}: {l.property.bathrooms}</li>}
              {l.property.builtAreaSqm != null && <li>{t(locale, 'listing.builtArea')}: {l.property.builtAreaSqm} m²</li>}
              {l.property.plotAreaSqm != null && <li>{t(locale, 'listing.plot')}: {l.property.plotAreaSqm} m²</li>}
            </ul></section>
        )}
        {l.land && (
          <section className="mt-6"><h2 className="text-lg font-semibold">{t(locale, 'listing.terrain')}</h2>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <li>{t(locale, 'common.type')}: {l.land.type}</li>
              {l.land.areaSqm != null && <li>{t(locale, 'listing.area')}: {l.land.areaSqm} m²</li>}
              {l.land.zoning && <li>{t(locale, 'listing.zoning')}: {tr(l.land.zoning, locale)}</li>}
              <li>{t(locale, 'listing.buildable')}: {l.land.buildable ? t(locale, 'listing.yesToConfirm') : t(locale, 'listing.toConfirm')}</li>
            </ul></section>
        )}

        <section className="mt-8">
          <SectionHead title={tr(SIMILAR, locale)} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((o) => (
              <ListingCard key={o.id} l={o} locale={locale} />
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        <SaveButton listingId={l.id} locale={locale} />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">{tr(LOCATION, locale)}</h2>
          {loc ? (
            <div className="mt-2">
              <MapExplorer
                points={[{ slug: l.slug, title: tr(l.title, locale), island: l.island, price: formatPrice(locale, l.priceAmount, l.priceOnRequest), href: `/${locale}/imoveis/${l.slug}`, lat: loc.lat, lng: loc.lng }]}
                center={loc} height="190px" zoom={13}
              />
              <p className="mt-1.5 text-xs text-slate-500">📍 {l.municipality}, {l.island} · {tr(MAP_SOON, locale)}</p>
            </div>
          ) : (
            <div className="mt-2 flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-brand-50 to-sand-100 text-center text-xs text-slate-500">
              <span>📍 {l.municipality}, {l.island}</span>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">{t(locale, 'listing.trust')}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <OfficialTag variant={l.documentStatus === 'VERIFIED' ? 'official' : 'unconfirmed'} locale={locale} />
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">{docLabel(locale, l.documentStatus)}</span>
          </div>
          <dl className="mt-3 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between"><dt>{t(locale, 'listing.lastVerified')}</dt><dd>{formatDate(locale, l.lastVerifiedAt)}</dd></div>
            <div className="flex justify-between"><dt>{t(locale, 'listing.published')}</dt><dd>{formatDate(locale, l.publishedAt)}</dd></div>
          </dl>
          {l.riskNotes && <p className="mt-3 rounded bg-amber-50 p-2 text-xs text-amber-800">{tr(l.riskNotes, locale)}</p>}
          <p className="mt-3 text-[11px] text-slate-400">{t(locale, 'listing.commercialNote')}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">{t(locale, 'listing.contactVisit')}</h2>
          <LeadForm locale={locale} listingId={l.id} recipient={l.owner} source="listing" />
        </div>
      </aside>
    </div>
  );
}
