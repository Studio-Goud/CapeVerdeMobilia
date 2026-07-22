// Structured-data (schema.org) builders. Feed the results to <JsonLd data=…/>.
// Rich results for Google + machine-readable facts for AI/generative engines
// (GEO): who Djarvista is, each business, and each property listing.
import { tr, type Locale, type Listing, type TL, type Procedure } from '@/i18n';
import type { ProProfile, InfoItem } from '@/lib/data';

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

/** Breadcrumb trail for a landing/detail page (helps Google show a breadcrumb). */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${BASE}${it.url}`,
    })),
  };
}

/** A category/island landing as a CollectionPage whose mainEntity is the list of
 *  results - machine-readable "this page is a list of N things in a place". */
export function collectionPageJsonLd(opts: {
  path: string; name: string; description: string; locale: Locale;
  items: { url: string; name: string }[];
}): Record<string, unknown> {
  const url = `${BASE}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale,
    isPartOf: { '@id': `${BASE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        '@type': 'ListItem', position: i + 1, name: it.name, url: `${BASE}${it.url}`,
      })),
    },
  };
}

/** A step-by-step procedure as a HowTo (rich-result candidate in Google). */
export function howToJsonLd(proc: Procedure, locale: Locale): Record<string, unknown> {
  const url = `${BASE}/${locale}/procedimentos/${proc.slug}`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: tr(proc.title, locale),
    description: tr(proc.summary, locale),
    inLanguage: locale,
    step: proc.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.sortOrder,
      name: tr(s.title, locale),
      text: tr(s.description, locale) + (s.detail ? ` ${tr(s.detail, locale)}` : ''),
    })),
  };
  if (proc.estimatedDays) data.totalTime = `P${proc.estimatedDays}D`;
  return data;
}

/** An official-information article as an Article, published by the Organization. */
export function articleJsonLd(item: InfoItem, locale: Locale): Record<string, unknown> {
  const url = `${BASE}/${locale}/info/${item.slug}`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: tr(item.title, locale),
    inLanguage: locale,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Djarvista', '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    isPartOf: { '@id': `${BASE}/#website` },
  };
  if (item.summary) data.description = tr(item.summary, locale).slice(0, 300);
  if (item.publishedAt) data.datePublished = item.publishedAt;
  if (item.updatedAt) data.dateModified = item.updatedAt;
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
