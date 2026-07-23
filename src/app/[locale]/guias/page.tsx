import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/guias');
}
import Link from 'next/link';
import { tr, type Locale, type TL } from '@/i18n';
import { JsonLd } from '@/components/JsonLd';
import { collectionPageJsonLd } from '@/lib/jsonld';
import { PageTitle, Card, Pill, SectionHead } from '@/components/ui';
import { KB_TOPICS, KB_SLUGS } from '@/content/kb';

const COPY = {
  title: { pt: 'Guias de Cabo Verde', en: 'Cabo Verde guides', nl: 'Kaapverdië-gidsen' },
  intro: {
    pt: 'Guias claros e com fonte sobre construção, imóveis, impostos e serviços públicos em Cabo Verde. Cada facto tem a sua fonte e data; a informação legal é indicativa e nunca substitui a confirmação com a autoridade competente.',
    en: 'Clear, sourced guides on building, property, taxes and public services in Cabo Verde. Every fact shows its source and date; legal information is indicative and never replaces confirmation with the competent authority.',
    nl: 'Heldere, gebronde gidsen over bouwen, vastgoed, belasting en overheidsdiensten in Kaapverdië. Elk feit toont zijn bron en datum; juridische informatie is indicatief en vervangt nooit de bevestiging bij de bevoegde instantie.',
  },
  principle: {
    pt: 'Nada é inventado: o que não conseguimos confirmar numa fonte oficial não é publicado como facto.',
    en: 'Nothing is invented: what we cannot confirm in an official source is not published as fact.',
    nl: 'Niets is verzonnen: wat we niet in een officiële bron kunnen bevestigen, publiceren we niet als feit.',
  },
  available: { pt: 'Disponível', en: 'Available', nl: 'Beschikbaar' },
  soon: { pt: 'Em preparação', en: 'In preparation', nl: 'In voorbereiding' },
  soonNote: {
    pt: 'A ser preparados a partir de fontes oficiais (Boletim Oficial, câmaras, portais do Estado):',
    en: 'Being prepared from official sources (Boletim Oficial, municipalities, State portals):',
    nl: 'In voorbereiding op basis van officiële bronnen (Boletim Oficial, gemeenten, overheidsportalen):',
  },
} satisfies Record<string, TL>;

// All researched topics are now published; new topics will queue here as prepared.
const SOON: TL[] = [];

export default function GuidesHubPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const { locale } = params;
  const topics = KB_SLUGS.map((s) => KB_TOPICS[s]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={collectionPageJsonLd({
        path: `/${locale}/guias`,
        name: tr(COPY.title, locale),
        description: tr(COPY.intro, locale),
        locale,
        items: topics.map((tp) => ({ url: `/${locale}/guias/${tp.slug}`, name: tr(tp.title, locale) })),
      })} />

      <PageTitle title={tr(COPY.title, locale)} intro={tr(COPY.intro, locale)} />

      <p className="mb-6 rounded-xl border border-brand/20 bg-brand-50 px-4 py-3 text-sm text-brand">{tr(COPY.principle, locale)}</p>

      <SectionHead title={tr(COPY.available, locale)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {topics.map((tp) => (
          <Link key={tp.slug} href={`/${locale}/guias/${tp.slug}`}>
            <Card className="h-full rounded-2xl transition hover:border-brand hover:shadow-md">
              <h2 className="text-base font-semibold text-slate-900">{tr(tp.title, locale)}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-slate-600">{tr(tp.intro, locale)}</p>
              <span className="mt-2 inline-block text-xs text-slate-400">{tr(COPY.available, locale)} · {tp.updated}</span>
            </Card>
          </Link>
        ))}
      </div>

      {SOON.length > 0 && (
        <div className="mt-10">
          <SectionHead title={tr(COPY.soon, locale)} />
          <p className="mb-3 text-sm text-slate-600">{tr(COPY.soonNote, locale)}</p>
          <ul className="flex flex-wrap gap-2">
            {SOON.map((s) => (
              <li key={tr(s, 'pt')}>
                <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                  <Pill tone="slate">{tr(COPY.soon, locale)}</Pill>{tr(s, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
