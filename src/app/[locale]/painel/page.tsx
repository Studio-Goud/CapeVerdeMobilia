'use client';

import Link from 'next/link';
import { t, tr, formatEur, cveToEur, LISTINGS, type Locale } from '@/i18n';
import { PROJECTS } from '@/content';
import { useAuth } from '@/components/Auth';
import { Card, Stat, Pill, TrustBadge } from '@/components/ui';

export default function DashboardPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { ready, user } = useAuth();

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-slate-600">{t(locale, 'dash.needLogin')}</p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/${locale}/entrar`} className="rounded-lg bg-brand px-4 py-2 font-semibold text-white">{t(locale, 'nav.login')}</Link>
          <Link href={`/${locale}/registar`} className="rounded-lg bg-coral px-4 py-2 font-semibold text-white">{t(locale, 'nav.register')}</Link>
        </div>
      </div>
    );
  }

  const isBiz = user.role === 'business';

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-hero-ocean px-6 py-6 text-white">
        <div>
          <p className="text-sm text-white/80">{t(locale, isBiz ? 'dash.business' : 'dash.private')}</p>
          <h1 className="text-2xl font-bold">{t(locale, 'dash.hello')}, {user.name} 👋</h1>
        </div>
        {isBiz && (
          <div className="rounded-xl bg-white/10 px-4 py-2">
            <p className="text-xs text-white/70">{t(locale, 'dash.verification')}</p>
            <div className="mt-1"><TrustBadge level="L2_BUSINESS" locale={locale} /></div>
          </div>
        )}
      </header>

      {isBiz ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={t(locale, 'dash.myListings')} value="3" hint={`2 ${t(locale, 'dash.active')}`} />
            <Stat label={t(locale, 'dash.incomingLeads')} value="7" hint={`3 ${t(locale, 'dash.pending')}`} />
            <Stat label={t(locale, 'dash.quotes')} value="4" />
            <Stat label={t(locale, 'dash.reviews')} value="★ 4.6" hint="8" />
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t(locale, 'dash.projects')}</h2>
              <Link href={`/${locale}/projetos`} className="text-sm font-medium text-brand hover:underline">{t(locale, 'common.viewAll')}</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p) => (
                <Card key={p.id}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{tr(p.name, locale)}</p>
                    <Pill tone={p.status === 'DONE' ? 'emerald' : p.status === 'IN_PROGRESS' ? 'brand' : 'amber'}>{t(locale, `proj.status.${p.status}` as 'proj.status.PLANNING')}</Pill>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{p.progress}% · {formatEur(cveToEur(p.budgetCve))}</p>
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <Link href={`/${locale}/pedidos/novo`} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'dash.newListing')}</Link>
            <Link href={`/${locale}/concursos`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.openTenders')}</Link>
            <Link href={`/${locale}/verificacao`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.raiseLevel')}</Link>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label={t(locale, 'dash.favorites')} value="2" />
            <Stat label={t(locale, 'dash.savedSearches')} value="1" />
            <Stat label={t(locale, 'dash.myRequests')} value="1" hint={`1 ${t(locale, 'dash.pending')}`} />
          </div>

          <section>
            <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.favorites')}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {LISTINGS.slice(0, 2).map((l) => (
                <Link key={l.id} href={`/${locale}/imoveis/${l.slug}`} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.thumbnail} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                  <div>
                    <p className="line-clamp-2 text-sm font-medium text-slate-900">{tr(l.title, locale)}</p>
                    <p className="text-xs text-slate-500">{l.island}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-2">
            <Link href={`/${locale}/imoveis`} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'dash.browseProps')}</Link>
            <Link href={`/${locale}/assistente`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.startWizard')}</Link>
          </div>
        </>
      )}
    </div>
  );
}
