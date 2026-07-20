import { TrustBadge } from '@djarvista/ui';
import { listProfessionals } from '@/lib/queries';

export const metadata = { title: 'Profissionais e empresas' };

export default async function ProfessionalsPage(): Promise<JSX.Element> {
  const professionals = await listProfessionals(48);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profissionais e empresas</h1>
      <p className="text-sm text-slate-500">
        Encontre profissionais verificados para construção, renovação e serviços. As avaliações
        marcadas como “verificadas” têm prova de uma transação ou projeto real.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {professionals.map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{p.displayName}</p>
                <p className="text-sm text-slate-500">{p.headline}</p>
              </div>
              <TrustBadge level={p.verificationLevel} />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {p.serviceAreas.join(', ') || '—'} ·{' '}
              {p.ratingAvg ? `★ ${Number(p.ratingAvg).toFixed(1)} (${p.ratingCount})` : 'Sem avaliações'}
            </p>
            {p.priceIndication && <p className="mt-1 text-xs text-slate-400">{p.priceIndication}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
