import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { JsonLd } from '@/components/JsonLd';
import { guideJsonLd, faqPageJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { altLangs } from '@/lib/seo';
import { PageTitle, Card, Pill } from '@/components/ui';
import { KB_TOPICS, KB_SLUGS, type KbEntry } from '@/content/kb';

export function generateStaticParams(): { slug: string }[] {
  return KB_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Metadata {
  const topic = KB_TOPICS[params.slug];
  if (!topic) return { title: 'Djarvista' };
  const title = tr(topic.seoTitle, params.locale);
  const description = tr(topic.seoDesc, params.locale);
  return { title, description, alternates: altLangs(params.locale, `/guias/${params.slug}`), openGraph: { title, description } };
}

const L = {
  back: { pt: 'Guias', en: 'Guides', nl: 'Gidsen' },
  updated: { pt: 'Última atualização', en: 'Last updated', nl: 'Laatst bijgewerkt' },
  disclaimer: {
    pt: 'Informação indicativa, com fonte e data. Não é aconselhamento jurídico ou fiscal: confirme sempre com a autoridade indicada antes de agir.',
    en: 'Indicative information, with source and date. Not legal or tax advice: always confirm with the named authority before acting.',
    nl: 'Indicatieve informatie, met bron en datum. Geen juridisch of fiscaal advies: bevestig altijd bij de genoemde instantie voordat je handelt.',
  },
  fact: { pt: 'Facto com fonte', en: 'Sourced fact', nl: 'Gebrond feit' },
  verify: { pt: 'A confirmar', en: 'To confirm', nl: 'Te bevestigen' },
  confirmWith: { pt: 'Confirme com', en: 'Confirm with', nl: 'Bevestig bij' },
  sources: { pt: 'Fontes', en: 'Sources', nl: 'Bronnen' },
  official: { pt: 'oficial', en: 'official', nl: 'officieel' },
} satisfies Record<string, TL>;

function Entry({ e, locale }: { e: KbEntry; locale: Locale }): JSX.Element {
  return (
    <section className="border-t border-slate-100 pt-6">
      <h2 className="text-lg font-semibold text-slate-900">{tr(e.q, locale)}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{tr(e.a, locale)}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Pill tone={e.status === 'fact' ? 'emerald' : 'amber'}>{tr(e.status === 'fact' ? L.fact : L.verify, locale)}</Pill>
        {e.authority && (
          <span className="text-xs text-slate-500">{tr(L.confirmWith, locale)}: {tr(e.authority, locale)}</span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{tr(L.sources, locale)}</p>
        <ul className="mt-1 space-y-1">
          {e.sources.map((s) => (
            <li key={s.url} className="text-xs text-slate-600">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">{s.label}</a>
              {' · '}{s.date}
              {s.primary && <span className="ml-1 rounded bg-emerald-50 px-1 text-[10px] font-semibold uppercase text-emerald-700">{tr(L.official, locale)}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function GuideTopicPage({ params }: { params: { locale: Locale; slug: string } }): JSX.Element {
  const { locale } = params;
  const topic = KB_TOPICS[params.slug];
  if (!topic) notFound();

  const path = `/${locale}/guias/${topic.slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Djarvista', url: `/${locale}` },
        { name: tr(L.back, locale), url: `/${locale}/guias` },
        { name: tr(topic.title, locale), url: path },
      ])} />
      <JsonLd data={guideJsonLd({ path, headline: tr(topic.title, locale), description: tr(topic.seoDesc, locale), updated: topic.updated, locale })} />
      <JsonLd data={faqPageJsonLd(path, topic.entries.map((e) => ({ question: tr(e.q, locale), answer: tr(e.a, locale) })))} />

      <Link href={`/${locale}/guias`} className="text-sm font-medium text-brand hover:underline">{`← ${tr(L.back, locale)}`}</Link>

      <PageTitle title={tr(topic.title, locale)} intro={tr(topic.intro, locale)} />

      <Card className="mb-6 border-amber-200 bg-amber-50">
        <p className="text-sm text-amber-900">{tr(L.disclaimer, locale)}</p>
        <p className="mt-1 text-xs text-amber-700">{tr(L.updated, locale)}: {topic.updated}</p>
      </Card>

      <div className="space-y-6">
        {topic.entries.map((e, i) => <Entry key={i} e={e} locale={locale} />)}
      </div>
    </div>
  );
}
