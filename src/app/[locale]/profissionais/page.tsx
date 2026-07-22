import type { Metadata } from 'next';
import Link from 'next/link';
import { t, tr, proCategoryLabel, type Locale, type TL } from '@/i18n';
import { fetchProfessionals, type ProProfile } from '@/lib/data';
import { PageTitle, TrustBadge, Card, EmptyState, Pill, SeededBadge } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMeta(params.locale, '/profissionais',
    { pt: 'Profissionais e empresas em São Vicente, Cabo Verde', en: 'Professionals and businesses in São Vicente, Cabo Verde', nl: 'Professionals en bedrijven in São Vicente, Kaapverdië' },
    { pt: 'Advogados, construção civil, ar condicionado, limpeza, gás e mais em São Vicente. Contacte diretamente ou reclame o seu negócio.', en: 'Lawyers, construction, air conditioning, cleaning, gas and more in São Vicente. Contact directly or claim your business.', nl: 'Advocaten, bouw, airco, schoonmaak, gas en meer in São Vicente. Neem direct contact op of claim je bedrijf.' });
}

const AREAS = ['', 'São Vicente', 'Santiago', 'Sal', 'Santo Antão'];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

const PRO_CTA: TL = {
  pt: 'É profissional? Crie o seu perfil',
  en: 'Are you a professional? Create your profile',
  nl: 'Ben je professional? Maak je profiel aan',
};

export default async function ProfessionalsPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<JSX.Element> {
  const locale = params.locale;
  const area = one(searchParams.area) ?? '';
  const cat = one(searchParams.cat) ?? '';
  const q = (one(searchParams.q) ?? '').trim();
  const rows = await fetchProfessionals(area);

  // Distinct professions present (within the current island), most common first.
  const counts = new Map<string, number>();
  for (const p of rows) if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const cats = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([c]) => c);

  let shown = cat ? rows.filter((p) => p.category === cat) : rows;
  if (q) {
    const needle = q.toLowerCase();
    shown = shown.filter((p) =>
      `${p.displayName} ${tr(p.headline, locale)} ${p.category ?? ''} ${p.bio ? tr(p.bio, locale) : ''}`
        .toLowerCase().includes(needle));
  }

  // Build a filter href that keeps the island + search and sets the profession.
  const hrefFor = (c: string): string => {
    const qs = new URLSearchParams();
    if (area) qs.set('area', area);
    if (c) qs.set('cat', c);
    if (q) qs.set('q', q);
    const s = qs.toString();
    return `/${locale}/profissionais${s ? `?${s}` : ''}`;
  };
  const chip = (active: boolean): string =>
    ['rounded-full px-3 py-1.5 text-sm font-medium transition',
      active ? 'bg-brand text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand',
    ].join(' ');

  return (
    <div>
      <PageTitle title={t(locale, 'pros.title')} intro={t(locale, 'pros.intro')} />

      <Link
        href={`/${locale}/profissionais/novo`}
        className="mb-5 inline-block rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand"
      >
        {tr(PRO_CTA, locale)}
      </Link>

      <form className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.search')}</span>
          <input name="q" defaultValue={q} placeholder={t(locale, 'dir.searchPlaceholder')} className="rounded-lg border border-slate-300 px-3 py-1.5" />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="area" defaultValue={area} className="rounded-lg border border-slate-300 px-3 py-1.5">
            {AREAS.map((a) => <option key={a} value={a}>{a || t(locale, 'common.all')}</option>)}
          </select>
        </label>
        {/* keep the chosen profession when switching island / searching */}
        {cat && <input type="hidden" name="cat" value={cat} />}
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>

      {/* Profession filter */}
      {cats.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{t(locale, 'pros.profession')}</p>
          <div className="flex flex-wrap gap-2">
            <Link href={hrefFor('')} className={chip(!cat)}>{t(locale, 'common.all')}</Link>
            {cats.map((c) => (
              <Link key={c} href={hrefFor(c)} className={chip(cat === c)}>
                {proCategoryLabel(locale, c)} <span className={cat === c ? 'text-white/70' : 'text-slate-400'}>{counts.get(c)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mb-3 text-sm text-slate-500">{shown.length} {t(locale, 'common.results')}</p>

      {shown.length === 0 && (
        <EmptyState
          icon="🧰"
          message={tr({ pt: 'Ainda não há profissionais aqui. Seja o primeiro a criar o seu perfil.', en: 'No professionals here yet. Be the first to create your profile.', nl: 'Nog geen professionals hier. Wees de eerste met een profiel.' }, locale)}
          ctaHref={`/${locale}/profissionais/novo`}
          ctaLabel={tr({ pt: 'Criar perfil', en: 'Create profile', nl: 'Profiel aanmaken' }, locale)}
        />
      )}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p: ProProfile) => (
          <li key={p.id}>
            <Card>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/${locale}/profissionais/${p.slug}`} className="font-semibold text-slate-900 hover:text-brand">{p.displayName}</Link>
                  <p className="text-sm text-slate-500">{tr(p.headline, locale)}</p>
                </div>
                {p.verifiedLevel
                  ? <TrustBadge level={p.verifiedLevel} locale={locale} />
                  : p.seeded ? <SeededBadge locale={locale} /> : <TrustBadge level={p.verificationLevel} locale={locale} />}
              </div>
              {p.category && <div className="mt-2"><Pill tone="brand">{proCategoryLabel(locale, p.category)}</Pill></div>}
              <p className="mt-3 text-xs text-slate-500">{p.serviceAreas.join(', ')} · {p.ratingAvg ? `★ ${p.ratingAvg.toFixed(1)} (${p.ratingCount})` : t(locale, 'pros.noReviews')}</p>
              {p.priceIndication && <p className="mt-1 text-xs text-slate-400">{tr(p.priceIndication, locale)}</p>}
              <Link href={`/${locale}/profissionais/${p.slug}`} className="mt-3 inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand">
                {t(locale, 'pros.requestQuote')}
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
