import Link from 'next/link';
import { t, tr, formatDate, type Locale } from '@/i18n';
import { fetchPublications, type InfoItem } from '@/lib/data';
import { PageTitle, Card, Pill } from '@/components/ui';

const STATUS_TONE: Record<InfoItem['officialStatus'], 'emerald' | 'slate' | 'amber' | 'coral'> = {
  official: 'emerald',
  summary: 'slate',
  unconfirmed: 'amber',
  in_revision: 'amber',
  outdated: 'coral',
};

export default async function InfoCentrePage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const items = await fetchPublications();

  return (
    <div className="space-y-6">
      <PageTitle title={t(locale, 'info.title')} intro={t(locale, 'info.intro')} />

      <ul className="space-y-4">
        {items.map((item) => {
          const statusLabel = t(locale, ('ostatus.' + item.officialStatus) as 'ostatus.official');
          const summary = item.summary ? tr(item.summary, locale) : null;
          return (
            <li key={item.slug}>
              <Card className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <Link
                    href={`/${locale}/info/${item.slug}`}
                    className="font-semibold text-slate-900 hover:text-brand"
                  >
                    {tr(item.title, locale)}
                  </Link>
                  <Pill tone={STATUS_TONE[item.officialStatus]}>{statusLabel}</Pill>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  {item.govEntity && <span>{item.govEntity}</span>}
                  {item.updatedAt && (
                    <span>
                      {t(locale, 'info.updated')} {formatDate(locale, item.updatedAt)}
                    </span>
                  )}
                  <span>
                    {t(locale, 'info.version')} {item.version}
                  </span>
                </div>

                {summary && <p className="line-clamp-3 text-sm text-slate-700">{summary}</p>}

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Link
                    href={`/${locale}/info/${item.slug}`}
                    className="font-medium text-brand hover:underline"
                  >
                    {t(locale, 'info.readMore')}
                  </Link>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-brand hover:underline"
                    >
                      {t(locale, 'info.source')} ↗
                    </a>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-slate-500">{t(locale, 'proc.disclaimer')}</p>
    </div>
  );
}
