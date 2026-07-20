import { t, tr, formatEur, cveToEur, type Locale } from '@/i18n';
import { PROJECTS } from '@/content';
import { PageTitle, Card, Pill } from '@/components/ui';

export default function ProjectsPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div>
      <PageTitle title={t(locale, 'proj.title')} intro={t(locale, 'proj.intro')} />
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-semibold text-slate-900">{tr(p.name, locale)}</h2>
                <p className="text-xs text-slate-500">{p.island} · {p.contractor}</p>
              </div>
              <Pill tone={p.status === 'DONE' ? 'emerald' : p.status === 'IN_PROGRESS' ? 'brand' : 'amber'}>
                {t(locale, `proj.status.${p.status}` as 'proj.status.PLANNING')}
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

            <p className="mt-3 text-sm font-semibold text-brand">{t(locale, 'proj.budget')}: {formatEur(cveToEur(p.budgetCve))}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
