import { OfficialTag } from '@djarvista/ui';
import { listOfficialPublications } from '@/lib/queries';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Informação oficial' };

export default async function GovInfoPage(): Promise<JSX.Element> {
  const publications = await listOfficialPublications();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Centro de informação oficial</h1>
      <p className="max-w-2xl text-sm text-slate-500">
        Informação publicada por, ou resumida a partir de, fontes oficiais. Cada página indica a
        entidade responsável, o estado oficial e a data da última atualização. Djarvista não substitui
        as entidades públicas nem presta aconselhamento jurídico.
      </p>

      {publications.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-slate-500">
          Ainda sem publicações.
        </p>
      ) : (
        <ul className="space-y-3">
          {publications.map((pub) => (
            <li key={pub.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{pub.title}</h2>
                <OfficialTag variant={pub.officialStatus ? 'official' : 'platform-summary'} />
              </div>
              <p className="mt-1 text-sm text-slate-500">{pub.govEntity.name}</p>
              <div className="mt-2 flex gap-4 text-xs text-slate-400">
                <span>Versão {pub.version}</span>
                <span>Atualizado: {formatDate(pub.updatedAt)}</span>
                {pub.validFrom && <span>Válido desde: {formatDate(pub.validFrom)}</span>}
              </div>
              {pub.plainSummary && <p className="mt-2 text-sm text-slate-700">{pub.plainSummary}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
