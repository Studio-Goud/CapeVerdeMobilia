import type { Metadata } from 'next';
import Link from 'next/link';
import { t, tr, type Locale, type UIKey, type TL } from '@/i18n';
import { fetchListings, fetchProfessionals, fetchServiceListings, fetchSuppliers } from '@/lib/data';
import { ListingGrid, SectionHead, Card, TrustBadge } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMeta(params.locale, '',
    { pt: 'Imóveis, serviços e informação oficial em Cabo Verde', en: 'Property, services and official information in Cabo Verde', nl: 'Vastgoed, diensten en overheidsinformatie in Kaapverdië' },
    { pt: 'A porta digital para imóveis, terra, construção, profissionais e informação oficial em Cabo Verde — São Vicente e além. PT · EN · NL.', en: 'The digital gateway to property, land, building, professionals and official information in Cabo Verde — São Vicente and beyond. PT · EN · NL.', nl: 'De digitale toegangspoort tot vastgoed, grond, bouw, professionals en overheidsinformatie in Kaapverdië — São Vicente en verder. PT · EN · NL.' });
}

interface ModuleCard { icon: string; titleKey: UIKey; href: string }

const FEATURED_TITLE: TL = { pt: 'Negócios em destaque', en: 'Featured businesses', nl: 'Uitgelichte bedrijven' };
const FEATURED_INTRO: TL = {
  pt: 'Empresas locais em destaque na Djarvista — verificadas e prontas a contactar.',
  en: 'Local businesses featured on Djarvista — verified and ready to contact.',
  nl: 'Lokale bedrijven uitgelicht op Djarvista — geverifieerd en direct te contacteren.',
};
const DESTAQUE: TL = { pt: 'Destaque', en: 'Featured', nl: 'Uitgelicht' };

export default async function HomePage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const [listings, professionals, featuredServices, featuredSuppliers] = await Promise.all([
    fetchListings().then((r) => r.slice(0, 6)),
    fetchProfessionals().then((r) => r.slice(0, 4)),
    fetchServiceListings().then((r) => r.filter((s) => s.isFeatured)),
    fetchSuppliers().then((r) => r.filter((s) => s.isFeatured)),
  ]);
  const p = (s: string): string => `/${locale}${s}`;

  // Featured businesses (paid "Destacar" placement) — homepage visibility so
  // advertising delivers real exposure. Only items that have an image are shown.
  const featured = [
    ...featuredServices.map((s) => ({ id: s.id, name: tr(s.title, locale), subtitle: `${s.municipality} · ${s.island}`.trim(), image: (s.photos && s.photos[0]) || s.thumbnail, href: p(`/imoveis/${s.slug}`) })),
    ...featuredSuppliers.map((s) => ({ id: s.id, name: s.name, subtitle: tr(s.category, locale), image: s.thumbnail, href: p('/materiais') })),
  ].filter((f) => Boolean(f.image));

  const modules: ModuleCard[] = [
    { icon: '🏠', titleKey: 'nav.imoveis', href: p('/imoveis') },
    { icon: '📐', titleKey: 'nav.profissionais', href: p('/profissionais') },
    { icon: '🧭', titleKey: 'nav.wizard', href: p('/assistente') },
    { icon: '🏗️', titleKey: 'nav.projects', href: p('/projetos') },
    { icon: '📋', titleKey: 'nav.tenders', href: p('/concursos') },
    { icon: '🧱', titleKey: 'nav.materials', href: p('/materiais') },
    { icon: '🏛️', titleKey: 'nav.info', href: p('/info') },
    { icon: '🛡️', titleKey: 'nav.verification', href: p('/verificacao') },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-hero-ocean px-6 py-12 text-white shadow-card sm:px-10">
        <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{t(locale, 'home.heroTitle')}</h1>
        <p className="mt-3 max-w-2xl text-white/90">{t(locale, 'home.heroSubtitle')}</p>
        <form action={p('/imoveis')} className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
          <input type="search" name="q" placeholder={t(locale, 'home.searchPlaceholder')} className="w-full rounded-xl px-4 py-3 text-slate-900" aria-label={t(locale, 'common.search')} />
          <button className="rounded-xl bg-coral-600 px-6 py-3 font-semibold text-white hover:bg-coral-700">{t(locale, 'common.search')}</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href={p('/imoveis?kind=LAND')} className="underline-offset-2 hover:underline">{t(locale, 'home.land')}</Link>
          <Link href={p('/profissionais')} className="underline-offset-2 hover:underline">{t(locale, 'home.verifiedPros')}</Link>
          <Link href={p('/assistente')} className="underline-offset-2 hover:underline">{t(locale, 'home.howTo')}</Link>
        </div>
      </section>

      {/* Featured businesses — paid "Destacar" placement gets real homepage exposure */}
      {featured.length > 0 && (
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900">{tr(FEATURED_TITLE, locale)}</h2>
            <p className="mt-1 text-sm text-slate-600">{tr(FEATURED_INTRO, locale)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((f) => (
              <Link key={f.id} href={f.href} className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative aspect-[16/10] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.image as string} alt={f.name} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute left-2 top-2 rounded-full bg-coral-600 px-2 py-0.5 text-[11px] font-semibold text-white shadow-card">★ {tr(DESTAQUE, locale)}</span>
                </div>
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-semibold text-slate-900 group-hover:text-brand">{f.name}</p>
                  <p className="line-clamp-1 text-xs text-slate-500">{f.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* List your property (two-sided marketplace entry) */}
      <section className="flex flex-col gap-4 rounded-2xl border border-coral/30 bg-coral-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{t(locale, 'home.listTitle')}</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">{t(locale, 'home.listBody')}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href={p('/imoveis/publicar?kind=PROPERTY_SALE')} className="rounded-lg bg-coral-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-coral-700">
            {t(locale, 'home.listSale')}
          </Link>
          <Link href={p('/imoveis/publicar?kind=PROPERTY_RENT')} className="rounded-lg border border-coral/40 bg-white px-4 py-2.5 text-sm font-semibold text-coral-600 hover:bg-coral-50">
            {t(locale, 'home.listRent')}
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900">{t(locale, 'home.modulesTitle')}</h2>
          <p className="mt-1 text-sm text-slate-600">{t(locale, 'home.modulesIntro')}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {modules.map((m) => (
            <Link key={m.titleKey} href={m.href} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300">
              <span aria-hidden className="text-2xl">{m.icon}</span>
              <p className="mt-2 text-sm font-semibold text-slate-800 group-hover:text-brand">{t(locale, m.titleKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section>
        <SectionHead title={t(locale, 'home.featured')} href={p('/imoveis')} linkLabel={t(locale, 'common.viewAll')} />
        <ListingGrid rows={listings} locale={locale} />
      </section>

      {/* Trust */}
      <section className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">{t(locale, 'home.trustTitle')}</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">{t(locale, 'home.trustBody')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <TrustBadge level="L1_IDENTITY" locale={locale} />
          <TrustBadge level="L3_DOCUMENTS" locale={locale} />
          <TrustBadge level="L4_TRANSACTION" locale={locale} />
          <TrustBadge level="L5_INSTITUTIONAL" locale={locale} />
        </div>
      </section>

      {/* Professionals — only shown when there are real ones */}
      {professionals.length > 0 && (
        <section>
          <SectionHead title={t(locale, 'home.professionals')} href={p('/profissionais')} linkLabel={t(locale, 'common.viewAll')} />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {professionals.map((pro) => (
              <li key={pro.id}>
                <Card>
                  <p className="font-semibold text-slate-900">{pro.displayName}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{tr(pro.headline, locale)}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{pro.ratingAvg ? `★ ${pro.ratingAvg.toFixed(1)} (${pro.ratingCount})` : t(locale, 'pros.noReviews')}</span>
                    <TrustBadge level={pro.verifiedLevel ?? pro.verificationLevel} locale={locale} />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">{t(locale, 'home.ctaTitle')}</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">{t(locale, 'home.ctaBody')}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link href={p('/registar')} className="rounded-lg bg-coral-600 px-5 py-2.5 font-semibold text-white hover:bg-coral-700">{t(locale, 'nav.register')}</Link>
            <Link href={p('/entrar')} className="rounded-lg border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/10">{t(locale, 'nav.login')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
