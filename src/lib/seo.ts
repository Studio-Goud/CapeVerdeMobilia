import type { Metadata } from 'next';
import { tr, type Locale, type TL } from '@/i18n';

const BASE = 'https://www.djarvista.com';

/** Correct per-page canonical + hreflang alternates. `path` is the sub-path
 *  WITHOUT the locale prefix — '' for the locale home, '/imoveis', '/imoveis/x'. */
export function altLangs(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      pt: `${BASE}/pt${path}`,
      en: `${BASE}/en${path}`,
      nl: `${BASE}/nl${path}`,
      'x-default': `${BASE}/pt${path}`,
    },
  };
}

/** Keyword-targeted, trilingual title + description + correct hreflang for a page. */
export function pageMeta(locale: Locale, path: string, title: TL, description: TL): Metadata {
  return { title: tr(title, locale), description: tr(description, locale), alternates: altLangs(locale, path) };
}
