import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, formatDate, formatEur, cveToEur, type Locale, type TL } from '@/i18n';
import { fetchTenderBySlug, type TenderView } from '@/lib/data';
import { PageTitle, Card, Pill, SectionHead } from '@/components/ui';
import { BidForm } from '@/components/BidForm';
import { TenderBids } from '@/components/TenderBids';

const DETAILS: TL = { pt: 'Detalhes do concurso', en: 'Tender details', nl: 'Details van de aanbesteding' };
const DESCRIPTION: TL = { pt: 'Descrição', en: 'Description', nl: 'Omschrijving' };
const ISLAND: TL = { pt: 'Ilha', en: 'Island', nl: 'Eiland' };
const DISCLAIMER: TL = {
  pt: 'A Djarvista apenas coloca as partes em contacto. Não é responsável pelo concurso, pelas condições anunciadas nem pelas propostas apresentadas. Confirme sempre os detalhes diretamente com a entidade responsável.',
  en: 'Djarvista only connects the parties. It is not responsible for the tender, the advertised conditions or the bids submitted. Always confirm the details directly with the responsible entity.',
  nl: 'Djarvista brengt alleen de partijen met elkaar in contact. Het is niet verantwoordelijk voor de aanbesteding, de vermelde voorwaarden of de ingediende inschrijvingen. Bevestig de details altijd rechtstreeks bij de verantwoordelijke entiteit.',
};

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const tender = await fetchTenderBySlug(params.slug);
  if (!tender) return { title: 'Djarvista' };
  const title = tr(tender.title, params.locale);
  const description = tender.description ? tr(tender.description, params.locale).slice(0, 180) : undefined;
  return { title, description, openGraph: { title, description }, twitter: { card: 'summary', title, description } };
}

export default async function TenderDetailPage({ params }: { params: { locale: Locale; slug: string } }): Promise<JSX.Element> {
  const locale = params.locale;
  const tender: TenderView | undefined = await fetchTenderBySlug(params.slug);
  if (!tender) notFound();

  const budget = tender.budgetCve == null ? t(locale, 'common.priceOnRequest') : formatEur(cveToEur(tender.budgetCve));

  return (
    <div>
      <div className="mb-4">
        <Link href={`/${locale}/concursos`} className="text-sm font-medium text-brand hover:underline">
          ← {t(locale, 'common.back')} · {t(locale, 'nav.tenders')}
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Pill tone={tender.kind === 'PUBLIC' ? 'emerald' : 'slate'}>
              {tender.kind === 'PUBLIC' ? t(locale, 'tend.public') : t(locale, 'tend.private')}
            </Pill>
            {tender.island && <Pill tone="brand">{tender.island}</Pill>}
          </div>

          <PageTitle title={tr(tender.title, locale)} />

          <Card className="mt-2">
            <SectionHead title={tr(DETAILS, locale)} />
            <dl className="grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{tr(ISLAND, locale)}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">{tender.island || '-'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{t(locale, 'tend.deadline')}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">{formatDate(locale, tender.deadline)}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{t(locale, 'tend.budget')}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">{budget}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-slate-500">{tender.bids} {t(locale, 'tend.bids')}</p>
          </Card>

          {tender.description && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold text-slate-900">{tr(DESCRIPTION, locale)}</h2>
              <p className="mt-2 whitespace-pre-line text-slate-700">{tr(tender.description, locale)}</p>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <Card>
            {tender.status === 'open' ? (
              <BidForm locale={locale} tenderId={tender.id} />
            ) : (
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                {tr({ pt: 'Este concurso está fechado - já não aceita propostas.', en: 'This tender is closed - no longer accepting bids.', nl: 'Deze aanbesteding is gesloten - geen inschrijvingen meer mogelijk.' }, locale)}
              </p>
            )}
          </Card>
          <TenderBids locale={locale} tenderId={tender.id} ownerId={tender.ownerId} />
          <p className="px-1 text-xs text-slate-500">{tr(DISCLAIMER, locale)}</p>
        </aside>
      </div>
    </div>
  );
}
