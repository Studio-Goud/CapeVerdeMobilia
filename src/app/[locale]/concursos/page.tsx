import { t, tr, formatDate, formatEur, cveToEur, type Locale } from '@/i18n';
import { TENDERS } from '@/content';
import { PageTitle, Card, Pill } from '@/components/ui';

export default function TendersPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div>
      <PageTitle title={t(locale, 'tend.title')} intro={t(locale, 'tend.intro')} />
      <div className="space-y-3">
        {TENDERS.map((td) => (
          <Card key={td.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-900">{tr(td.title, locale)}</h2>
                <Pill tone={td.kind === 'PUBLIC' ? 'brand' : 'slate'}>{t(locale, td.kind === 'PUBLIC' ? 'tend.public' : 'tend.private')}</Pill>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {td.island} · {t(locale, 'tend.deadline')}: {formatDate(locale, td.deadline)} · {td.bids} {t(locale, 'tend.bids')}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {t(locale, 'tend.budget')}: {td.budgetCve == null ? t(locale, 'common.priceOnRequest') : formatEur(cveToEur(td.budgetCve))}
              </p>
            </div>
            <button className="shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
              {t(locale, 'tend.submitBid')}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
