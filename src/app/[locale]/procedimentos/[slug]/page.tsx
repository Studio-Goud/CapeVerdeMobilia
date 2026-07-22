import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProcedure, t, tr, type Locale } from '@/i18n';
import { OfficialTag } from '@/components/ui';
import { altLangs } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Metadata {
  const proc = getProcedure(params.slug);
  const title = proc ? tr(proc.title, params.locale) : 'Djarvista';
  const description = proc ? tr(proc.summary, params.locale).slice(0, 180) : undefined;
  return { title, description, alternates: altLangs(params.locale, `/procedimentos/${params.slug}`) };
}

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

      {/* How it usually goes — narrative overview */}
      {proc.overview && (
        <section className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-700">{t(locale, 'proc.overview')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{tr(proc.overview, locale)}</p>
        </section>
      )}

      {/* What to watch out for in Cabo Verde */}
      {proc.watchOut && proc.watchOut.length > 0 && (
        <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-800">
            <span aria-hidden>⚠️</span>{t(locale, 'proc.watchOut')}
          </h2>
          <ul className="mt-2 space-y-2">
            {proc.watchOut.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span aria-hidden className="mt-0.5 text-amber-600">•</span>
                {tr(w, locale)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Steps */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{t(locale, 'proc.stepsLabel')}</h2>
        <ol className="space-y-4">
          {proc.steps.map((step) => (
            <li key={step.sortOrder} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-baseline gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{step.sortOrder}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{tr(step.title, locale)}</h3>
                  <p className="mt-1 text-sm text-slate-700">{tr(step.description, locale)}</p>
                  {step.detail && <p className="mt-2 text-sm leading-relaxed text-slate-600">{tr(step.detail, locale)}</p>}
                  <dl className="mt-3 space-y-1 text-xs text-slate-500">
                    <div><dt className="inline font-medium">{t(locale, 'proc.entity')}: </dt><dd className="inline">{tr(step.responsibleEntity, locale)}</dd></div>
                    {step.requiredDocuments.length > 0 && <div><dt className="inline font-medium">{t(locale, 'proc.documents')}: </dt><dd className="inline">{step.requiredDocuments.map((d) => tr(d, locale)).join(', ')}</dd></div>}
                    <div><dt className="inline font-medium">{t(locale, 'proc.duration')}: </dt><dd className="inline">~{step.estimatedDays} {t(locale, 'proc.days')}</dd></div>
                  </dl>
                  {step.tip && (
                    <p className="mt-3 rounded-lg border-l-2 border-coral-400 bg-coral-50/60 px-3 py-2 text-xs text-coral-800">
                      <span className="font-semibold">{t(locale, 'proc.stepTip')}: </span>{tr(step.tip, locale)}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">{t(locale, 'proc.disclaimer')}</p>
    </article>
  );
}
