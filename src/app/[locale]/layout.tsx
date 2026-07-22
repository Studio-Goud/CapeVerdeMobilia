import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, isLocale, t, type Locale } from '@/i18n';
import { SiteFooter } from '@/components/ui';
import { SiteHeader } from '@/components/SiteHeader';
import { AuthProvider } from '@/components/Auth';
import { HtmlLang } from '@/components/HtmlLang';
import { JsonLd } from '@/components/JsonLd';
import { orgWebsiteGraph } from '@/lib/jsonld';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const l = isLocale(params.locale) ? params.locale : 'pt';
  const ogLocale = l === 'pt' ? 'pt_PT' : l === 'en' ? 'en_GB' : 'nl_NL';
  return {
    openGraph: { locale: ogLocale },
    alternates: { languages: { pt: '/pt', en: '/en', nl: '/nl' } },
  };
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
    <AuthProvider>
      <HtmlLang locale={locale} />
      <JsonLd data={orgWebsiteGraph(locale)} />
      {!isSupabaseConfigured && (
        <div className="bg-coral-600 px-4 py-1.5 text-center text-xs font-medium text-white">
          {t(locale, 'demo.banner')}
        </div>
      )}
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
      <SiteFooter locale={locale} />
    </AuthProvider>
  );
}
