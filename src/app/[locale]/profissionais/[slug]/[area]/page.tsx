// Professional category × island landing, e.g. /profissionais/advogados/sao-vicente.
// Two segments after /profissionais, so it never collides with the single-segment
// professional-detail route /profissionais/[slug]. Unknown category/area → notFound().
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, proCategoryLabel, type Locale } from '@/i18n';
import { fetchProfessionals } from '@/lib/data';
import { Card, TrustBadge, SeededBadge, Pill, EmptyState } from '@/components/ui';
import { JsonLd } from '@/components/JsonLd';
import { AREAS, AREA_SLUGS, PRO_CATEGORIES, PRO_CATEGORY_SLUGS, proLandingMeta } from '@/lib/landings';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/jsonld';

interface Params { locale: Locale; slug: string; area: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  return proLandingMeta(params.locale, params.slug, params.area) ?? {};
}

export default async function ProLandingPage({ params }: { params: Params }): Promise<JSX.Element> {
  const { locale } = params;
  const cat = PRO_CATEGORIES[params.slug];
  const area = AREAS[params.area];
  if (!cat || !area) notFound();

  const rows = (await fetchProfessionals(area.name)).filter((p) => p.category === cat.category);
  const path = `/${locale}/profissionais/${cat.slug}/${area.slug}`;
  const otherCats = PRO_CATEGORY_SLUGS.filter((s) => s !== cat.slug);
  const otherAreas = AREA_SLUGS.filter((s) => s !== area.slug);
  const chip = 'rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand hover:text-brand';

  return (
    <div className="space-y-8">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Djarvista', url: `/${locale}` },
        { name: t(locale, 'nav.profissionais'), url: `/${locale}/profissionais` },
        { name: tr(cat.h1(area.name), locale), url: path },
      ])} />
      <JsonLd data={collectionPageJsonLd({
        path, name: tr(cat.h1(area.name), locale), description: tr(cat.desc(area.name), locale), locale,
        items: rows.map((p) => ({ url: `/${locale}/profissionais/${p.slug}`, name: p.displayName })),
      })} />

      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href={`/${locale}/profissionais`} className="hover:text-brand">{t(locale, 'nav.profissionais')}</Link></li>
          <li aria-hidden>›</li>
          <li className="text-slate-700">{proCategoryLabel(locale, cat.category)} · {area.name}</li>
        </ol>
      </nav>

      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(cat.h1(area.name), locale)}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{tr(cat.blurb(area.name), locale)}</p>
      </header>

      {/* Other professions in this area */}
      <div className="flex flex-wrap gap-2">
        {otherCats.map((s) => (
          <Link key={s} href={`/${locale}/profissionais/${s}/${area.slug}`} className={chip}>{proCategoryLabel(locale, PRO_CATEGORIES[s].category)}</Link>
        ))}
      </div>

      <p className="text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>

      {rows.length === 0 ? (
        <EmptyState
          icon="🧰"
          message={tr({ pt: `Ainda não há registos nesta categoria em ${area.name}. É profissional? Crie ou reclame o seu perfil.`, en: `No listings in this category in ${area.name} yet. Are you a professional? Create or claim your profile.`, nl: `Nog geen vermeldingen in deze categorie op ${area.name}. Ben je professional? Maak of claim je profiel.` }, locale)}
          ctaHref={`/${locale}/profissionais/novo`}
          ctaLabel={tr({ pt: 'Criar perfil', en: 'Create profile', nl: 'Profiel aanmaken' }, locale)}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => (
            <li key={p.id}>
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/${locale}/profissionais/${p.slug}`} className="font-semibold text-slate-900 hover:text-brand">{p.displayName}</Link>
                    <p className="text-sm text-slate-500">{tr(p.headline, locale)}</p>
                  </div>
                  {p.seeded ? <SeededBadge locale={locale} /> : <TrustBadge level={p.verificationLevel} locale={locale} />}
                </div>
                {p.category && <div className="mt-2"><Pill tone="brand">{proCategoryLabel(locale, p.category)}</Pill></div>}
                <p className="mt-3 text-xs text-slate-500">{p.serviceAreas.join(', ')} · {p.ratingAvg ? `★ ${p.ratingAvg.toFixed(1)} (${p.ratingCount})` : t(locale, 'pros.noReviews')}</p>
                {p.priceIndication && <p className="mt-1 text-xs text-slate-400">{tr(p.priceIndication, locale)}</p>}
                <Link href={`/${locale}/profissionais/${p.slug}`} className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand">
                  {t(locale, 'pros.requestQuote')}
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {/* About the area (context) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">{area.name}, Cabo Verde</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{tr(area.intro, locale)}</p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{tr({ pt: 'Noutras ilhas', en: 'On other islands', nl: 'Op andere eilanden' }, locale)}</h2>
        <div className="flex flex-wrap gap-2">
          {otherAreas.map((s) => (
            <Link key={s} href={`/${locale}/profissionais/${cat.slug}/${s}`} className={chip}>{proCategoryLabel(locale, cat.category)} · {AREAS[s].name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
