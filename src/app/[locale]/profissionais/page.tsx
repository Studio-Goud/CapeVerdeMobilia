import Link from 'next/link';
import { PROFESSIONALS, t, tr, type Locale } from '@/i18n';
import { PageTitle, TrustBadge, Card } from '@/components/ui';

const AREAS = ['', 'São Vicente', 'Santiago', 'Sal', 'Santo Antão'];
const one = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

export default function ProfessionalsPage({
  params, searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}): JSX.Element {
  const locale = params.locale;
  const area = one(searchParams.area) ?? '';
  const rows = area ? PROFESSIONALS.filter((p) => p.serviceAreas.includes(area)) : PROFESSIONALS;

  return (
    <div>
      <PageTitle title={t(locale, 'pros.title')} intro={t(locale, 'pros.intro')} />

      <form className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-slate-600">{t(locale, 'common.island')}</span>
          <select name="area" defaultValue={area} className="rounded-lg border border-slate-300 px-3 py-1.5">
            {AREAS.map((a) => <option key={a} value={a}>{a || t(locale, 'common.all')}</option>)}
          </select>
        </label>
        <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'common.filter')}</button>
      </form>

      <p className="mb-3 text-sm text-slate-500">{rows.length} {t(locale, 'common.results')}</p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((p) => (
          <li key={p.id}>
            <Card>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Link href={`/${locale}/profissionais/${p.slug}`} className="font-semibold text-slate-900 hover:text-brand">{p.displayName}</Link>
                  <p className="text-sm text-slate-500">{tr(p.headline, locale)}</p>
                </div>
                <TrustBadge level={p.verificationLevel} locale={locale} />
              </div>
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
