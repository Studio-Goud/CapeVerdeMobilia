import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { LOCALES, isLocale, t, type Locale } from '@/i18n';
import { SiteHeader, SiteFooter } from '@/components/ui';

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}): JSX.Element {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  return (
    <>
      <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-medium text-white">
        {t(locale, 'demo.banner')}
      </div>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
