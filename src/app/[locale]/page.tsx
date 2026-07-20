import Link from 'next/link';
import { PROFESSIONALS, t, tr, type Locale, type UIKey } from '@/i18n';
import { fetchListings } from '@/lib/data';
import { ListingGrid, SectionHead, Card, TrustBadge } from '@/components/ui';

interface ModuleCard { icon: string; titleKey: UIKey; href: string }

export default async function HomePage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const listings = (await fetchListings()).slice(0, 6);
  const professionals = PROFESSIONALS.slice(0, 4);
  const p = (s: string): string => `/${locale}${s}`;

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
          <button className="rounded-xl bg-coral px-6 py-3 font-semibold text-white hover:bg-coral-600">{t(locale, 'common.search')}</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href={p('/imoveis?kind=LAND')} className="underline-offset-2 hover:underline">{t(locale, 'home.land')}</Link>
          <Link href={p('/profissionais')} className="underline-offset-2 hover:underline">{t(locale, 'home.verifiedPros')}</Link>
          <Link href={p('/assistente')} className="underline-offset-2 hover:underline">{t(locale, 'home.howTo')}</Link>
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

      {/* Professionals */}
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
                  <TrustBadge level={pro.verificationLevel} locale={locale} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">{t(locale, 'home.ctaTitle')}</h2>
            <p className="mt-1 max-w-xl text-sm text-white/80">{t(locale, 'home.ctaBody')}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link href={p('/registar')} className="rounded-lg bg-coral px-5 py-2.5 font-semibold text-white hover:bg-coral-600">{t(locale, 'nav.register')}</Link>
            <Link href={p('/entrar')} className="rounded-lg border border-white/30 px-5 py-2.5 font-semibold text-white hover:bg-white/10">{t(locale, 'nav.login')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
