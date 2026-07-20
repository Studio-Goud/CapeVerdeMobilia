import { notFound } from 'next/navigation';
import { getProcedure, t, tr, type Locale } from '@/i18n';
import { OfficialTag } from '@/components/ui';

export default function ProcedureDetailPage({ params }: { params: { locale: Locale; slug: string } }): JSX.Element {
  const locale = params.locale;
  const proc = getProcedure(params.slug);
  if (!proc) notFound();
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{tr(proc.title, locale)}</h1>
          <OfficialTag variant="summary" locale={locale} />
        </div>
        <p className="mt-2 text-slate-600">{tr(proc.summary, locale)}</p>
        <p className="mt-1 text-xs text-slate-400">{proc.govEntity} · {t(locale, 'proc.estDuration')} ~{proc.estimatedDays} {t(locale, 'proc.days')}</p>
      </header>
      <ol className="space-y-4">
        {proc.steps.map((step) => (
          <li key={step.sortOrder} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-baseline gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{step.sortOrder}</span>
              <div>
                <h2 className="font-semibold">{tr(step.title, locale)}</h2>
                <p className="mt-1 text-sm text-slate-700">{tr(step.description, locale)}</p>
                <dl className="mt-2 space-y-1 text-xs text-slate-500">
                  <div><dt className="inline font-medium">{t(locale, 'proc.entity')}: </dt><dd className="inline">{tr(step.responsibleEntity, locale)}</dd></div>
                  {step.requiredDocuments.length > 0 && <div><dt className="inline font-medium">{t(locale, 'proc.documents')}: </dt><dd className="inline">{step.requiredDocuments.map((d) => tr(d, locale)).join(', ')}</dd></div>}
                  <div><dt className="inline font-medium">{t(locale, 'proc.duration')}: </dt><dd className="inline">~{step.estimatedDays} {t(locale, 'proc.days')}</dd></div>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">{t(locale, 'proc.disclaimer')}</p>
    </article>
  );
}
