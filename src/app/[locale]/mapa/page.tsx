import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/mapa');
}
import { t, tr, formatPrice, type Locale, type TL } from '@/i18n';
import { fetchListings } from '@/lib/data';
import { coordsFor, CV_CENTER, ISLAND_CENTERS } from '@/lib/geo';
import { PageTitle } from '@/components/ui';
import { MapExplorer } from '@/components/MapExplorer';
import type { MapPoint } from '@/components/LeafletMap';

const INTRO: TL = {
  pt: 'Explore os imóveis e terrenos no mapa de Cabo Verde. Clique num ponto para abrir o anúncio.',
  en: 'Explore properties and land on the map of Cape Verde. Click a point to open the listing.',
  nl: 'Verken vastgoed en grond op de kaart van Kaapverdië. Klik op een punt om de advertentie te openen.',
};
const COUNT: TL = { pt: 'no mapa', en: 'on the map', nl: 'op de kaart' };

export default async function MapPage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const listings = await fetchListings();
  const points: MapPoint[] = listings.flatMap((l) => {
    const c = coordsFor(l);
    if (!c) return [];
    return [{
      slug: l.slug, title: tr(l.title, locale), island: l.island,
      price: formatPrice(locale, l.priceAmount, l.priceOnRequest),
      href: `/${locale}/imoveis/${l.slug}`, lat: c.lat, lng: c.lng,
    }];
  });
  const center = points.length ? (ISLAND_CENTERS[points[0].island] ?? CV_CENTER) : CV_CENTER;

  return (
    <div>
      <PageTitle title={t(locale, 'nav.map')} intro={tr(INTRO, locale)} />
      <p className="mb-3 text-sm text-slate-500">{points.length} {tr(COUNT, locale)}</p>
      <MapExplorer points={points} center={center} />
    </div>
  );
}
