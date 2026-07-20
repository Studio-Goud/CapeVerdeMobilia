import { t, tr, whatsappLink, type Locale } from '@/i18n';
import { SUPPLIERS } from '@/content';
import { PageTitle, Card, Pill } from '@/components/ui';

export default function MaterialsPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div>
      <PageTitle title={t(locale, 'mat.title')} intro={t(locale, 'mat.intro')} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUPPLIERS.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-semibold text-slate-900">{s.name}</h2>
              {s.verified && <Pill tone="emerald">✓</Pill>}
            </div>
            <p className="mt-1 text-sm text-slate-600">{tr(s.category, locale)}</p>
            <p className="text-xs text-slate-500">{s.island}</p>
            {s.priceFrom && <p className="mt-2 text-sm font-medium text-brand">{tr(s.priceFrom, locale)}</p>}
            <a
              href={whatsappLink(`${tr(s.category, locale)} — ${s.name}`)}
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
