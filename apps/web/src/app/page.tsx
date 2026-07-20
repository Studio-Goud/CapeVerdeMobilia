import Link from 'next/link';
import { searchListings, listProfessionals } from '@/lib/queries';
import { ListingGrid } from '@/components/ListingGrid';

export default async function HomePage(): Promise<JSX.Element> {
  const [listings, professionals] = await Promise.all([
    searchListings({ page: 1, pageSize: 6 }),
    listProfessionals(4),
  ]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-brand px-6 py-10 text-white">
        <h1 className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Terra, imóveis, construção e informação oficial num só lugar
        </h1>
        <p className="mt-3 max-w-2xl text-white/90">
          Encontre, verifique e contacte com confiança — a começar por São Vicente.
        </p>
        <form action="/imoveis" className="mt-6 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            placeholder="Pesquisar imóveis, terrenos, zonas…"
            className="w-full rounded-lg px-3 py-2 text-slate-900"
            aria-label="Pesquisar"
          />
          <button className="rounded-lg bg-white px-4 py-2 font-semibold text-brand">Pesquisar</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/imoveis?kind=LAND" className="underline">
            Terrenos
          </Link>
          <Link href="/profissionais" className="underline">
            Profissionais verificados
          </Link>
          <Link href="/procedimentos" className="underline">
            Como comprar e construir
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Imóveis em destaque</h2>
          <Link href="/imoveis" className="text-sm text-brand hover:underline">
            Ver todos
          </Link>
        </div>
        <ListingGrid rows={listings.rows} />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Profissionais</h2>
          <Link href="/profissionais" className="text-sm text-brand hover:underline">
            Ver todos
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((p) => (
            <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-semibold">{p.displayName}</p>
              <p className="text-sm text-slate-500">{p.headline}</p>
              <p className="mt-2 text-xs text-slate-500">
                {p.ratingAvg ? `★ ${Number(p.ratingAvg).toFixed(1)} (${p.ratingCount})` : 'Sem avaliações'}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
