import Link from 'next/link';
import { listPublishedProcedures } from '@/lib/queries';

export const metadata = { title: 'Procedimentos' };

export default async function ProceduresPage(): Promise<JSX.Element> {
  const procedures = await listPublishedProcedures();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Procedimentos passo a passo</h1>
      <p className="max-w-2xl text-sm text-slate-500">
        Guias práticos baseados em informação controlada. Orientam sobre os passos, entidades
        responsáveis e documentos. Não constituem aconselhamento jurídico — confirme sempre com as
        entidades competentes.
      </p>
      <ul className="space-y-3">
        {procedures.map((proc) => (
          <li key={proc.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={`/procedimentos/${proc.slug}`} className="font-semibold text-brand hover:underline">
              {proc.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500">{proc.summary}</p>
            <p className="mt-2 text-xs text-slate-400">
              {proc.steps.length} passos · {proc.govEntity?.name ?? 'Entidade a confirmar'}
              {proc.estimatedDays ? ` · ~${proc.estimatedDays} dias` : ''}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
