import type { Metadata } from 'next';
import Link from 'next/link';
import { filterListings, t, type Locale } from '@/i18n';
import { fetchListings } from '@/lib/data';
import { ListingGrid } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMeta(params.locale, '/imoveis',
    { pt: 'Imóveis à venda e para arrendar em Cabo Verde', en: 'Property for sale and rent in Cabo Verde', nl: 'Vastgoed te koop en te huur in Kaapverdië' },
    { pt: 'Casas, apartamentos e terrenos em São Vicente e em todo o Cabo Verde. Pesquise, filtre por ilha e contacte diretamente.', en: 'Houses, apartments and land in São Vicente and across Cabo Verde. Search, filter by island and contact directly.', nl: 'Huizen, appartementen en grond in São Vicente en heel Kaapverdië. Zoek, filter per eiland en neem direct contact op.' });
}

const ISLANDS = [['', 'all'], ['SV', 'São Vicente'], ['ST', 'Santiago'], ['SL', 'Sal'], ['BV', 'Boa Vista']] as const;
const KINDS: [string, Record<Locale, string>][] = [
  ['', { pt: 'Todos', en: 'All', nl: 'Alle' }],
  ['PROPERTY_SALE', { pt: 'Venda', en: 'Sale', nl: 'Koop' }],
  ['PROPERTY_RENT', { pt: 'Arrendamento', en: 'Rent', nl: 'Huur' }],
  ['LAND', { pt: 'Terreno', en: 'Land', nl: 'Grond' }],
  ['NEW_DEVELOPMENT', { pt: 'Novo projeto', en: 'New development', nl: 'Nieuw project' }],
  ['COMMERCIAL', { pt: 'Comercial', en: 'Commercial', nl: 'Commercieel' }],
  ['HOLIDAY_RENT', { pt: 'Férias', en: 'Holiday', nl: 'Vakantie' }],
];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

export default async function ListingsPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  const locale = params.locale;
  const q = one(searchParams.q);
  const kind = one(searchParams.kind);
  const islandCode = one(searchParams.islandCode);
  const all = await fetchListings();
  const rows = filterListings(all, { q, kind, islandCode }, locale);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t(locale, 'nav.imoveis')}</h1>
        <Link href={`/${locale}/imoveis/publicar`} className="rounded-lg bg-coral-600 px-4 py-2 text-sm font-semibold text-white hover:bg-coral-700">{t(locale, 'dash.newListing')}</Link>
      </div>
      <form className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm"><span className="mb-1 text-slate-600">{t(locale, 'common.search')}</span>
          <input name="q" defaultValue={q ?? ''} className="rounded border px-2 py-1.5" /></label>
        <label className="flex flex-col text-sm"><span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="islandCode" defaultValue={islandCode ?? ''} className="rounded border px-2 py-1.5">
            {ISLANDS.map(([v, l]) => <option key={v} value={v}>{l === 'all' ? t(locale, 'common.all') : l}</option>)}</select></label>
        <label className="flex flex-col text-sm"><span className="mb-1 text-slate-600">{t(locale, 'common.type')}</span>
          <select name="kind" defaultValue={kind ?? ''} className="rounded border px-2 py-1.5">
            {KINDS.map(([v, l]) => <option key={v} value={v}>{l[locale]}</option>)}</select></label>
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>
      <p className="text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>
      <ListingGrid rows={rows} locale={locale} />
    </div>
  );
}
