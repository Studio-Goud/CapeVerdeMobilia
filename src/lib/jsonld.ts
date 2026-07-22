// Structured-data (schema.org) builders. Feed the results to <JsonLd data=…/>.
// Rich results for Google + machine-readable facts for AI/generative engines
// (GEO): who Djarvista is, each business, and each property listing.
import { tr, type Locale, type Listing, type TL } from '@/i18n';
import type { ProProfile } from '@/lib/data';

const BASE = 'https://www.djarvista.com';

const TAGLINE: TL = {
  pt: 'A porta digital para imóveis, terra, construção e informação oficial em Cabo Verde.',
  en: 'The digital gateway to property, land, building and official information in Cabo Verde.',
  nl: 'De digitale toegangspoort tot vastgoed, grond, bouw en overheidsinformatie in Kaapverdië.',
};

/** Site-wide Organization + WebSite (with a sitelinks search box). */
export function orgWebsiteGraph(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE}/#organization`,
        name: 'Djarvista',
        url: BASE,
        logo: `${BASE}/icons/icon-512.png`,
        image: `${BASE}/icons/icon-512.png`,
        description: tr(TAGLINE, locale),
        areaServed: { '@type': 'Country', name: 'Cabo Verde' },
        knowsLanguage: ['pt', 'en', 'nl'],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: 'Djarvista',
        inLanguage: locale,
        publisher: { '@id': `${BASE}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/${locale}/imoveis?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

/** A directory business (professional profile) as a LocalBusiness. */
export function professionalJsonLd(pro: ProProfile, locale: Locale): Record<string, unknown> {
  const url = `${BASE}/${locale}/profissionais/${pro.slug}`;
  const region = pro.serviceAreas[0];
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: pro.displayName,
    url,
    description: tr(pro.bio ?? pro.headline, locale),
    address: { '@type': 'PostalAddress', ...(region ? { addressRegion: region } : {}), addressCountry: 'CV' },
    areaServed: pro.serviceAreas.length
      ? pro.serviceAreas.map((a) => ({ '@type': 'Place', name: a }))
      : { '@type': 'Country', name: 'Cabo Verde' },
  };
  if (pro.phone) data.telephone = pro.phone;
  if (pro.category) data.knowsAbout = pro.category;
  if (pro.ratingAvg && pro.ratingCount) {
    data.aggregateRating = { '@type': 'AggregateRating', ratingValue: pro.ratingAvg.toFixed(1), reviewCount: pro.ratingCount };
  }
  return data;
}

/** A property advert as a RealEstateListing. */
export function listingJsonLd(l: Listing, locale: Locale): Record<string, unknown> {
  const url = `${BASE}/${locale}/imoveis/${l.slug}`;
  const image = (l.photos && l.photos[0]) || l.thumbnail;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${url}#listing`,
    url,
    name: tr(l.title, locale),
    description: tr(l.description, locale).slice(0, 300),
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      ...(l.municipality ? { addressLocality: l.municipality } : {}),
      ...(l.island ? { addressRegion: l.island } : {}),
      addressCountry: 'CV',
    },
  };
  if (image) data.image = [image];
  if (l.latitude != null && l.longitude != null) {
    data.geo = { '@type': 'GeoCoordinates', latitude: l.latitude, longitude: l.longitude };
  }
  if (!l.priceOnRequest && l.priceAmount != null) {
    data.offers = { '@type': 'Offer', price: l.priceAmount, priceCurrency: 'CVE', availability: 'https://schema.org/InStock' };
  }
  return data;
}
