import { listingSearchSchema } from '@kavila/validation';
import { searchListings } from '@/lib/queries';
import { ListingGrid } from '@/components/ListingGrid';

export const metadata = { title: 'Imóveis e terrenos' };

const ISLANDS = [
  ['', 'Todas as ilhas'],
  ['SV', 'São Vicente'],
  ['ST', 'Santiago'],
  ['SL', 'Sal'],
  ['BV', 'Boa Vista'],
] as const;

const KINDS = [
  ['', 'Todos'],
  ['PROPERTY_SALE', 'Venda'],
  ['PROPERTY_RENT', 'Arrendamento'],
  ['LAND', 'Terreno'],
  ['NEW_DEVELOPMENT', 'Novo projeto'],
] as const;

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  // Validate & coerce the query string; invalid params fall back to defaults.
  const parsed = listingSearchSchema.safeParse(searchParams);
  const input = parsed.success ? parsed.data : listingSearchSchema.parse({});
  const result = await searchListings(input);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Imóveis e terrenos</h1>

      <form className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">Pesquisar</span>
          <input name="q" defaultValue={input.q ?? ''} className="rounded border px-2 py-1.5" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">Ilha</span>
          <select name="islandCode" defaultValue={input.islandCode ?? ''} className="rounded border px-2 py-1.5">
            {ISLANDS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">Tipo</span>
          <select name="kind" defaultValue={input.kind ?? ''} className="rounded border px-2 py-1.5">
            {KINDS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">Filtrar</button>
      </form>

      <p className="text-sm text-slate-500">{result.total} resultado(s)</p>
      <ListingGrid rows={result.rows} />
    </div>
  );
}
