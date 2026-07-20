'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, isLocale, type Locale } from '@/i18n';

/** Swaps the leading /{locale} segment of the current path, preserving the page. */
export function LanguageSwitcher({ current }: { current: Locale }): JSX.Element {
  const pathname = usePathname() || `/${current}`;
  const parts = pathname.split('/');
  const rest = isLocale(parts[1] ?? '') ? '/' + parts.slice(2).join('/') : pathname;
  const restClean = rest === '/' ? '' : rest;
  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${restClean}`}
          aria-current={l === current ? 'true' : undefined}
          className={
            l === current
              ? 'rounded bg-brand px-2 py-1 text-white'
              : 'rounded px-2 py-1 text-slate-500 hover:bg-slate-100'
          }
        >
          {LOCALE_NAMES[l]}
        </Link>
      ))}
    </div>
  );
}
