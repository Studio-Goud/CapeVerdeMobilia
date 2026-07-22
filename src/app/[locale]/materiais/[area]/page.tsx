// Building-materials island landing, e.g. /materiais/sao-vicente. Single dynamic
// segment [area]; sibling of the static /materiais/novo. Unknown area → notFound().
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, whatsappLink, quoteMessage, type Locale } from '@/i18n';
import { fetchSuppliers } from '@/lib/data';
import { Card, Pill, EmptyState, SeededBadge, SourceLine, QuoteContact } from '@/components/ui';
import { ClaimBusiness } from '@/components/ClaimBusiness';
import { JsonLd } from '@/components/JsonLd';
import { AREAS, AREA_SLUGS, MATERIALS, materialsLandingMeta } from '@/lib/landings';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/jsonld';

interface Params { locale: Locale; area: string }

export function generateMetadata({ params }: { params: Params }): Metadata {
  return materialsLandingMeta(params.locale, params.area) ?? {};
}

export default async function MaterialsLandingPage({ params }: { params: Params }): Promise<JSX.Element> {
  const { locale } = params;
  const area = AREAS[params.area];
  if (!area) notFound();

  const rows = await fetchSuppliers(area.name);
  const path = `/${locale}/materiais/${area.slug}`;
  const otherAreas = AREA_SLUGS.filter((s) => s !== area.slug);
  const chip = 'rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand hover:text-brand';

  return (
    <div className="space-y-8">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Djarvista', url: `/${locale}` },
        { name: t(locale, 'nav.materials'), url: `/${locale}/materiais` },
        { name: tr(MATERIALS.h1(area.name), locale), url: path },
      ])} />
      <JsonLd data={collectionPageJsonLd({
        path, name: tr(MATERIALS.h1(area.name), locale), description: tr(MATERIALS.desc(area.name), locale), locale,
        items: rows.map((s) => ({ url: `${path}#${s.id}`, name: s.name })),
      })} />

      <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href={`/${locale}/materiais`} className="hover:text-brand">{t(locale, 'nav.materials')}</Link></li>
          <li aria-hidden>›</li>
          <li className="text-slate-700">{area.name}</li>
        </ol>
      </nav>

      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(MATERIALS.h1(area.name), locale)}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{tr(MATERIALS.blurb(area.name), locale)}</p>
      </header>

      <p className="text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>

      {rows.length === 0 ? (
        <EmptyState
          icon="🧱"
          message={tr({ pt: `Ainda não há fornecedores em ${area.name}. É fornecedor? Adicione o seu negócio.`, en: `No suppliers in ${area.name} yet. Are you a supplier? Add your business.`, nl: `Nog geen leveranciers op ${area.name}. Leverancier? Voeg je bedrijf toe.` }, locale)}
          ctaHref={`/${locale}/materiais/novo`}
          ctaLabel={tr({ pt: 'Adicionar negócio', en: 'Add business', nl: 'Bedrijf toevoegen' }, locale)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((s) => (
            <Card key={s.id}>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-slate-900">{s.name}</h2>
                {s.seeded ? <SeededBadge locale={locale} /> : s.verified && <Pill tone="emerald">✓</Pill>}
              </div>
              <p className="mt-1 text-sm text-slate-600">{tr(s.category, locale)}</p>
              <p className="text-xs text-slate-500">{s.island}</p>
              {s.priceFrom && <p className="mt-2 text-sm font-medium text-brand">{tr(s.priceFrom, locale)}</p>}
              {s.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{tr(s.description, locale)}</p>}
              {s.phone && (
                s.seeded ? (
                  <div className="mt-3"><QuoteContact locale={locale} phone={s.phone} businessName={s.name} /></div>
                ) : (
                  <a
                    href={whatsappLink(quoteMessage(locale, s.name), s.phone)}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand"
                  >
                    {t(locale, 'mat.requestQuote')}
                  </a>
                )
              )}
              {s.seeded && (
                <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                  <SourceLine locale={locale} name={s.sourceName} url={s.sourceUrl} date={s.sourcedAt} />
                  <ClaimBusiness locale={locale} profileType="supplier" profileId={s.id} compact />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">{area.name}, Cabo Verde</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{tr(area.intro, locale)}</p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{tr({ pt: 'Noutras ilhas', en: 'On other islands', nl: 'Op andere eilanden' }, locale)}</h2>
        <div className="flex flex-wrap gap-2">
          {otherAreas.map((s) => (
            <Link key={s} href={`/${locale}/materiais/${s}`} className={chip}>{AREAS[s].name}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
