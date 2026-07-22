import type { Metadata } from 'next';
import Link from 'next/link';
import { t, tr, whatsappLink, quoteMessage, type Locale, type TL } from '@/i18n';
import { fetchSuppliers, type SupplierView } from '@/lib/data';
import { PageTitle, Card, Pill, EmptyState, SeededBadge, SourceLine, QuoteContact } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMeta(params.locale, '/materiais',
    { pt: 'Materiais de construção e fornecedores em Cabo Verde', en: 'Building materials and suppliers in Cabo Verde', nl: 'Bouwmaterialen en leveranciers in Kaapverdië' },
    { pt: 'Fornecedores de materiais de construção, ferragens e tintas em São Vicente e Cabo Verde. Peça orçamento diretamente.', en: 'Building-materials, hardware and paint suppliers in São Vicente and Cabo Verde. Request a quote directly.', nl: 'Leveranciers van bouwmaterialen, ijzerwaren en verf in São Vicente en Kaapverdië. Vraag direct een offerte aan.' });
}
import { ClaimBusiness } from '@/components/ClaimBusiness';

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
  const cat = one(searchParams.cat) ?? '';
  const q = (one(searchParams.q) ?? '').trim();
  const rows = await fetchSuppliers(island);

  // Distinct categories present (keyed on the PT value), most common first.
  const counts = new Map<string, { tl: TL; n: number }>();
  for (const s of rows) {
    const k = s.category.pt;
    const e = counts.get(k);
    if (e) e.n += 1; else counts.set(k, { tl: s.category, n: 1 });
  }
  const cats = [...counts.entries()].sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0]));
  let shown = cat ? rows.filter((s) => s.category.pt === cat) : rows;
  if (q) {
    const needle = q.toLowerCase();
    shown = shown.filter((s) =>
      `${s.name} ${tr(s.category, locale)} ${s.description ? tr(s.description, locale) : ''}`
        .toLowerCase().includes(needle));
  }

  const hrefFor = (c: string): string => {
    const qs = new URLSearchParams();
    if (island) qs.set('island', island);
    if (c) qs.set('cat', c);
    if (q) qs.set('q', q);
    const s = qs.toString();
    return `/${locale}/materiais${s ? `?${s}` : ''}`;
  };
  const chip = (active: boolean): string =>
    ['rounded-full px-3 py-1.5 text-sm font-medium transition',
      active ? 'bg-brand text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand',
    ].join(' ');

  return (
    <div>
      <PageTitle title={t(locale, 'mat.title')} intro={t(locale, 'mat.intro')} />

      <Link
        href={`/${locale}/materiais/novo`}
        className="mb-5 inline-block rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand"
      >
        {tr(SUPPLIER_CTA, locale)}
      </Link>

      <form className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.search')}</span>
          <input name="q" defaultValue={q} placeholder={t(locale, 'dir.searchPlaceholder')} className="rounded-lg border border-slate-300 px-3 py-1.5" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="island" defaultValue={island} className="rounded-lg border border-slate-300 px-3 py-1.5">
            {ISLANDS.map((i) => <option key={i} value={i}>{i || t(locale, 'common.all')}</option>)}
          </select>
        </label>
        {cat && <input type="hidden" name="cat" value={cat} />}
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>

      {cats.length > 1 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{t(locale, 'common.category')}</p>
          <div className="flex flex-wrap gap-2">
            <Link href={hrefFor('')} className={chip(!cat)}>{t(locale, 'common.all')}</Link>
            {cats.map(([k, v]) => (
              <Link key={k} href={hrefFor(k)} className={chip(cat === k)}>
                {tr(v.tl, locale)} <span className={cat === k ? 'text-white/70' : 'text-slate-400'}>{v.n}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mb-3 text-sm text-slate-500">{shown.length} {t(locale, 'common.results')}</p>

      {shown.length === 0 && (
        <EmptyState
          icon="🧱"
          message={tr({ pt: 'Ainda não há fornecedores aqui. É fornecedor? Adicione o seu negócio.', en: 'No suppliers here yet. Are you a supplier? Add your business.', nl: 'Nog geen leveranciers hier. Leverancier? Voeg je bedrijf toe.' }, locale)}
          ctaHref={`/${locale}/materiais/novo`}
          ctaLabel={tr({ pt: 'Adicionar negócio', en: 'Add business', nl: 'Bedrijf toevoegen' }, locale)}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s: SupplierView) => (
          <Card key={s.id}>
            {s.thumbnail && (
              <div className="-mx-4 -mt-4 mb-3 aspect-[16/10] overflow-hidden rounded-t-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.thumbnail} alt={s.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-slate-900">{s.name}</h2>
              {s.verified
                ? <Pill tone="emerald">✓ {tr({ pt: 'Verificado', en: 'Verified', nl: 'Geverifieerd' }, locale)}</Pill>
                : s.seeded ? <SeededBadge locale={locale} /> : null}
            </div>
            <p className="mt-1 text-sm text-slate-600">{tr(s.category, locale)}</p>
            <p className="text-xs text-slate-500">{s.island}</p>
            {s.priceFrom && <p className="mt-2 text-sm font-medium text-brand">{tr(s.priceFrom, locale)}</p>}
            {s.description && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{tr(s.description, locale)}</p>}
            {s.phone && (
              s.seeded ? (
                <div className="mt-3"><QuoteContact locale={locale} phone={s.phone} businessName={s.name} /></div>
              ) : (
                <a
                  href={whatsappLink(quoteMessage(locale, s.name), s.phone)}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand"
                >
                  {t(locale, 'mat.requestQuote')}
                </a>
              )
            )}
            {s.seeded && (
              <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                <SourceLine locale={locale} name={s.sourceName} url={s.sourceUrl} date={s.sourcedAt} />
                <ClaimBusiness locale={locale} profileType="supplier" profileId={s.id} compact />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
