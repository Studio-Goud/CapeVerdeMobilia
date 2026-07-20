import { PROFESSIONALS, t, tr, type Locale } from '@/i18n';
import { TrustBadge } from '@/components/ui';

export default function ProfessionalsPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t(locale, 'pros.title')}</h1>
      <p className="text-sm text-slate-500">{t(locale, 'pros.intro')}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROFESSIONALS.map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div><p className="font-semibold">{p.displayName}</p><p className="text-sm text-slate-500">{tr(p.headline, locale)}</p></div>
              <TrustBadge level={p.verificationLevel} locale={locale} />
            </div>
            <p className="mt-3 text-xs text-slate-500">{p.serviceAreas.join(', ')} · {p.ratingAvg ? `★ ${p.ratingAvg.toFixed(1)} (${p.ratingCount})` : t(locale, 'pros.noReviews')}</p>
            {p.priceIndication && <p className="mt-1 text-xs text-slate-400">{tr(p.priceIndication, locale)}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
