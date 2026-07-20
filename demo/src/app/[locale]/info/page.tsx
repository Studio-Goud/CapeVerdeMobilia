import { PUBLICATIONS, t, tr, formatDate, type Locale } from '@/i18n';
import { OfficialTag } from '@/components/ui';

export default function GovInfoPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t(locale, 'info.title')}</h1>
      <p className="max-w-2xl text-sm text-slate-500">{t(locale, 'info.intro')}</p>
      <ul className="space-y-3">
        {PUBLICATIONS.map((pub, i) => (
          <li key={i} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold">{tr(pub.title, locale)}</h2>
              <OfficialTag variant={pub.officialStatus ? 'official' : 'summary'} locale={locale} />
            </div>
            <p className="mt-1 text-sm text-slate-500">{pub.govEntity}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span>{t(locale, 'info.version')} {pub.version}</span>
              <span>{t(locale, 'info.updated')}: {formatDate(locale, pub.updatedAt)}</span>
              {pub.validFrom && <span>{t(locale, 'info.validFrom')}: {formatDate(locale, pub.validFrom)}</span>}
            </div>
            <p className="mt-2 text-sm text-slate-700">{tr(pub.plainSummary, locale)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
