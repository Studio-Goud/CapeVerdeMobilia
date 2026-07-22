import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/concursos');
}
import Link from 'next/link';
import { t, tr, formatDate, formatEur, cveToEur, type Locale, type TL } from '@/i18n';
import { fetchTenders, type TenderView } from '@/lib/data';
import { PageTitle, Card, Pill, EmptyState } from '@/components/ui';

const ISLANDS = ['', 'São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

const TENDER_CTA: TL = {
  pt: 'Publicar um concurso',
  en: 'Post a tender',
  nl: 'Plaats een aanbesteding',
};

export default async function TendersPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  const locale = params.locale;
  const island = one(searchParams.island) ?? '';
  const rows = await fetchTenders(island);

  return (
    <div>
      <PageTitle title={t(locale, 'tend.title')} intro={t(locale, 'tend.intro')} />

      <Link
        href={`/${locale}/concursos/novo`}
        className="mb-5 inline-block rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand"
      >
        {tr(TENDER_CTA, locale)}
      </Link>

      <form className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="island" defaultValue={island} className="rounded-lg border border-slate-300 px-3 py-1.5">
            {ISLANDS.map((i) => <option key={i} value={i}>{i || t(locale, 'common.all')}</option>)}
          </select>
        </label>
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>

      <p className="mb-3 text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>

      {rows.length === 0 && (
        <EmptyState
          icon="📋"
          message={tr({ pt: 'Ainda não há concursos abertos. Precisa de um serviço? Publique um concurso.', en: 'No open tenders yet. Need a service? Post a tender.', nl: 'Nog geen open aanbestedingen. Dienst nodig? Plaats een aanbesteding.' }, locale)}
          ctaHref={`/${locale}/concursos/novo`}
          ctaLabel={tr({ pt: 'Publicar concurso', en: 'Post a tender', nl: 'Aanbesteding plaatsen' }, locale)}
        />
      )}

      <div className="space-y-3">
        {rows.map((td: TenderView) => (
          <Card key={td.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">{tr(td.title, locale)}</h2>
                <Pill tone={td.kind === 'PUBLIC' ? 'brand' : 'slate'}>{t(locale, td.kind === 'PUBLIC' ? 'tend.public' : 'tend.private')}</Pill>
                {td.status !== 'open' && <Pill tone="coral">{t(locale, `tend.state.${td.status}` as 'tend.state.closed')}</Pill>}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {td.island} · {t(locale, 'tend.deadline')}: {formatDate(locale, td.deadline)} · {td.bids} {t(locale, 'tend.bids')}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {t(locale, 'tend.budget')}: {td.budgetCve == null ? t(locale, 'common.priceOnRequest') : formatEur(cveToEur(td.budgetCve))}
              </p>
            </div>
            {td.slug && (
              <Link
                href={`/${locale}/concursos/${td.slug}`}
                className={
                  td.status === 'open'
                    ? 'shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark'
                    : 'shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-brand'
                }
              >
                {t(locale, td.status === 'open' ? 'tend.submitBid' : 'common.viewAll')}
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
