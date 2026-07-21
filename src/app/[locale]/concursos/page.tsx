import Link from 'next/link';
import { t, tr, formatDate, formatEur, cveToEur, type Locale, type TL } from '@/i18n';
import { fetchTenders, type TenderView } from '@/lib/data';
import { PageTitle, Card, Pill } from '@/components/ui';

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

      <div className="space-y-3">
        {rows.map((td: TenderView) => (
          <Card key={td.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900">{tr(td.title, locale)}</h2>
                <Pill tone={td.kind === 'PUBLIC' ? 'brand' : 'slate'}>{t(locale, td.kind === 'PUBLIC' ? 'tend.public' : 'tend.private')}</Pill>
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
                className="shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                {t(locale, 'tend.submitBid')}
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
