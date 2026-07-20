import { notFound } from 'next/navigation';
import { OfficialTag } from '@ilhavista/ui';
import { getProcedureBySlug } from '@/lib/queries';

export default async function ProcedureDetailPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const proc = await getProcedureBySlug(params.slug);
  if (!proc) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{proc.title}</h1>
          <OfficialTag variant="platform-summary" />
        </div>
        <p className="mt-2 text-slate-600">{proc.summary}</p>
        <p className="mt-1 text-xs text-slate-400">
          {proc.govEntity?.name ?? 'Entidade a confirmar'}
          {proc.estimatedDays ? ` · duração estimada ~${proc.estimatedDays} dias` : ''}
        </p>
      </header>

      <ol className="space-y-4">
        {proc.steps.map((step) => (
          <li key={step.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-baseline gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {step.sortOrder}
              </span>
              <div>
                <h2 className="font-semibold">{step.title}</h2>
                {step.description && <p className="mt-1 text-sm text-slate-700">{step.description}</p>}
                <dl className="mt-2 space-y-1 text-xs text-slate-500">
                  {step.responsibleEntity && (
                    <div>
                      <dt className="inline font-medium">Entidade: </dt>
                      <dd className="inline">{step.responsibleEntity}</dd>
                    </div>
                  )}
                  {step.requiredDocuments.length > 0 && (
                    <div>
                      <dt className="inline font-medium">Documentos: </dt>
                      <dd className="inline">{step.requiredDocuments.join(', ')}</dd>
                    </div>
                  )}
                  {step.estimatedDays != null && (
                    <div>
                      <dt className="inline font-medium">Duração: </dt>
                      <dd className="inline">~{step.estimatedDays} dias</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
        Esta informação é indicativa e pode estar desatualizada. Confirme sempre com as entidades
        competentes. Ilhavista não presta aconselhamento jurídico.
      </p>
    </article>
  );
}
