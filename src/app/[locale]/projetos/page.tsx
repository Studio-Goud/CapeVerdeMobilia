import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/projetos');
}
import Link from 'next/link';
import { t, tr, formatEur, cveToEur, type Locale, type TL } from '@/i18n';
import { fetchProjects, type ProjectView } from '@/lib/data';
import { PageTitle, Card, Pill, EmptyState } from '@/components/ui';

const ISLANDS = ['', 'São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

const ADD_PROJECT_CTA: TL = {
  pt: 'Adicionar um projeto',
  en: 'Add a project',
  nl: 'Project toevoegen',
};

export default async function ProjectsPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  const locale = params.locale;
  const island = one(searchParams.island) ?? '';
  const rows = await fetchProjects(island);

  return (
    <div>
      <PageTitle title={t(locale, 'proj.title')} intro={t(locale, 'proj.intro')} />

      <Link
        href={`/${locale}/projetos/novo`}
        className="mb-5 inline-block rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand"
      >
        {tr(ADD_PROJECT_CTA, locale)}
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
          icon="🏗️"
          message={tr({ pt: 'Ainda não há projetos aqui. Mostre o seu trabalho: adicione um projeto.', en: 'No projects here yet. Show your work: add a project.', nl: 'Nog geen projecten hier. Laat je werk zien: voeg een project toe.' }, locale)}
          ctaHref={`/${locale}/projetos/novo`}
          ctaLabel={tr({ pt: 'Adicionar projeto', en: 'Add project', nl: 'Project toevoegen' }, locale)}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((p: ProjectView) => (
          <Card key={p.id}>
            {p.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover} alt={tr(p.name, locale)} className="mb-3 h-40 w-full rounded object-cover" />
            )}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-slate-900">{tr(p.name, locale)}</h2>
                <p className="text-xs text-slate-500">{p.island} · {p.contractor}</p>
              </div>
              <Pill tone={p.status === 'DONE' ? 'emerald' : p.status === 'IN_PROGRESS' ? 'brand' : 'amber'}>
                {t(locale, ('proj.status.' + p.status) as 'proj.status.PLANNING')}
              </Pill>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{t(locale, 'proj.progress')}</span><span>{p.progress}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold uppercase text-slate-400">{t(locale, 'proj.milestones')}</p>
            <ul className="mt-1 space-y-1">
              {p.milestones.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <span aria-hidden className={m.done ? 'text-emerald-600' : 'text-slate-300'}>{m.done ? '✓' : '○'}</span>
                  <span className={m.done ? '' : 'text-slate-500'}>{tr(m.label, locale)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm font-semibold text-brand">
              {t(locale, 'proj.budget')}: {p.budgetCve != null ? formatEur(cveToEur(p.budgetCve)) : t(locale, 'common.priceOnRequest')}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
