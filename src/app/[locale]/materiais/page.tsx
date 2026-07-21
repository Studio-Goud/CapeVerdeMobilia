import Link from 'next/link';
import { t, tr, whatsappLink, type Locale, type TL } from '@/i18n';
import { fetchSuppliers, type SupplierView } from '@/lib/data';
import { PageTitle, Card, Pill } from '@/components/ui';

const ISLANDS = ['', 'São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

const SUPPLIER_CTA: TL = {
  pt: 'Fornecedor? Adicione o seu negócio',
  en: 'Supplier? Add your business',
  nl: 'Leverancier? Voeg je bedrijf toe',
};

export default async function MaterialsPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  const locale = params.locale;
  const island = one(searchParams.island) ?? '';
  const rows = await fetchSuppliers(island);

  return (
    <div>
      <PageTitle title={t(locale, 'mat.title')} intro={t(locale, 'mat.intro')} />

      <Link
        href={`/${locale}/materiais/novo`}
        className="mb-5 inline-block rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand"
      >
        {tr(SUPPLIER_CTA, locale)}
      </Link>

      <form className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="island" defaultValue={island} className="rounded-lg border border-slate-300 px-3 py-1.5">
            {ISLANDS.map((i) => <option key={i} value={i}>{i || t(locale, 'common.all')}</option>)}
          </select>
        </label>
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>

      <p className="mb-3 text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((s: SupplierView) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-slate-900">{s.name}</h2>
              {s.verified && <Pill tone="emerald">✓</Pill>}
            </div>
            <p className="mt-1 text-sm text-slate-600">{tr(s.category, locale)}</p>
            <p className="text-xs text-slate-500">{s.island}</p>
            {s.priceFrom && <p className="mt-2 text-sm font-medium text-brand">{tr(s.priceFrom, locale)}</p>}
            {s.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{tr(s.description, locale)}</p>}
            <a
              href={whatsappLink(`${tr(s.category, locale)} — ${s.name}`, s.phone ?? undefined)}
              target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand"
            >
              {t(locale, 'mat.requestQuote')}
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
