import { pt } from './messages/pt';
import { en } from './messages/en';

export type Locale = 'pt' | 'kea' | 'en' | 'nl' | 'fr';
export type Messages = typeof pt;

export const DEFAULT_LOCALE: Locale = 'pt';
export const LOCALES: Locale[] = ['pt', 'kea', 'en', 'nl', 'fr'];

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: 'Português',
  kea: 'Kabuverdianu',
  en: 'English',
  nl: 'Nederlands',
  fr: 'Français',
};

/**
 * Message catalogues. Only pt/en are fully authored in the MVP; kea/nl/fr fall
 * back to pt with a machine-translation pass (see /docs/10-technical-architecture.md).
 * Official government texts are NEVER machine-overwritten — they carry their own
 * translation provenance in the Translation table.
 */
const catalogues: Record<Locale, Messages> = {
  pt,
  en,
  kea: pt,
  nl: pt,
  fr: pt,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return catalogues[locale] ?? pt;
}

/** Simple dotted-key lookup with `{var}` interpolation. */
export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const msgs = getMessages(locale) as Record<string, unknown>;
  const raw = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, msgs);
  let str = typeof raw === 'string' ? raw : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}
