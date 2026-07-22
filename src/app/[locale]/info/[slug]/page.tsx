import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, formatDate, type Locale } from '@/i18n';
import { fetchPublicationBySlug, type InfoItem } from '@/lib/data';
import { altLangs } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const item = await fetchPublicationBySlug(params.slug);
  if (!item) return { title: 'Djarvista' };
  const title = tr(item.title, params.locale);
  const description = item.summary ? tr(item.summary, params.locale).slice(0, 180) : undefined;
  return { title, description, alternates: altLangs(params.locale, `/info/${params.slug}`), openGraph: { title, description } };
}
import { PageTitle, Card, Pill } from '@/components/ui';
import { ReportOutdated } from '@/components/ReportOutdated';

const STATUS_TONE: Record<InfoItem['officialStatus'], 'emerald' | 'slate' | 'amber' | 'coral'> = {
  official: 'emerald',
  summary: 'slate',
  unconfirmed: 'amber',
  in_revision: 'amber',
  outdated: 'coral',
};

export default async function InfoDetailPage({ params }: { params: { locale: Locale; slug: string } }): Promise<JSX.Element> {
  const { locale } = params;
  const item = await fetchPublicationBySlug(params.slug);
  if (!item) notFound();

  const bodyText = item.body ? tr(item.body, locale) : item.summary ? tr(item.summary, locale) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href={`/${locale}/info`} className="text-sm font-medium text-brand hover:underline">
        {`← ${t(locale, 'nav.info')}`}
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <PageTitle title={tr(item.title, locale)} />
        <Pill tone={STATUS_TONE[item.officialStatus]}>
          {t(locale, ('ostatus.' + item.officialStatus) as 'ostatus.official')}
        </Pill>
      </div>

      <Card className="mt-2 space-y-2 text-sm text-slate-700">
        {item.govEntity && <p className="font-medium text-slate-900">{item.govEntity}</p>}
        <p>{`${t(locale, 'info.version')} ${item.version}`}</p>
        <p>{`${t(locale, 'info.updated')} ${formatDate(locale, item.updatedAt)}`}</p>
        {item.sourceUrl && (
          <p>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:underline"
            >
              {t(locale, 'info.source')}
            </a>
          </p>
        )}
      </Card>

      {bodyText && (
        <p className="mt-6 whitespace-pre-line text-slate-700 leading-relaxed">{bodyText}</p>
      )}

      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 leading-relaxed">
        {t(locale, 'proc.disclaimer')}
      </p>

      <div className="mt-6">
        <ReportOutdated publicationId={item.id} locale={locale} />
      </div>
    </div>
  );
}
