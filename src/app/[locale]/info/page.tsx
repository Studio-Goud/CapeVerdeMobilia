import type { Metadata } from 'next';
import Link from 'next/link';
import { t, tr, formatDate, type Locale, type TL } from '@/i18n';
import { fetchPublications, type InfoItem } from '@/lib/data';
import { PageTitle, Card, Pill } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return pageMeta(params.locale, '/info',
    { pt: 'Informação oficial: arrendamento, impostos e construção em Cabo Verde', en: 'Official information: tenancy, taxes and building in Cabo Verde', nl: 'Officiële informatie: huur, belastingen en bouw in Kaapverdië' },
    { pt: 'Artigos com fonte sobre arrendamento, impostos imobiliários (cITI/cIPI), compra e construção em Cabo Verde. Não é aconselhamento jurídico.', en: 'Sourced articles on tenancy, real-estate taxes (cITI/cIPI), buying and building in Cabo Verde. Not legal advice.', nl: 'Gebronde artikelen over huur, vastgoedbelasting (cITI/cIPI), kopen en bouwen in Kaapverdië. Geen juridisch advies.' });
}

const STATUS_TONE: Record<InfoItem['officialStatus'], 'emerald' | 'slate' | 'amber' | 'coral'> = {
  official: 'emerald',
  summary: 'slate',
  unconfirmed: 'amber',
  in_revision: 'amber',
  outdated: 'coral',
};

// Trilingual labels for the known info-centre pillars. Unknown categories fall
// back to their raw slug so a new category still renders (never a missing key).
const CATEGORY_LABEL: Record<string, TL> = {
  arrendamento: { pt: 'Arrendamento', en: 'Renting', nl: 'Huren' },
  compra: { pt: 'Compra e venda', en: 'Buying & selling', nl: 'Kopen & verkopen' },
  construcao: { pt: 'Construção', en: 'Building', nl: 'Bouwen' },
  impostos: { pt: 'Impostos', en: 'Taxes', nl: 'Belastingen' },
};
const OTHER_LABEL: TL = { pt: 'Outros', en: 'Other', nl: 'Overige' };

function groupByCategory(items: InfoItem[]): { key: string; label: TL; items: InfoItem[] }[] {
  const order: string[] = [];
  const map = new Map<string, InfoItem[]>();
  for (const item of items) {
    const key = item.category && CATEGORY_LABEL[item.category] ? item.category : (item.category ?? '__other');
    if (!map.has(key)) { map.set(key, []); order.push(key); }
    map.get(key)!.push(item);
  }
  return order.map((key) => ({
    key,
    label: CATEGORY_LABEL[key] ?? (key === '__other' ? OTHER_LABEL : { pt: key, en: key, nl: key }),
    items: map.get(key)!,
  }));
}

export default async function InfoCentrePage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const items = await fetchPublications();

  return (
    <div className="space-y-6">
      <PageTitle title={t(locale, 'info.title')} intro={t(locale, 'info.intro')} />

      {groupByCategory(items).map((group) => (
        <section key={group.key} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{tr(group.label, locale)}</h2>
          <ul className="space-y-4">
        {group.items.map((item) => {
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
        </section>
      ))}

      <p className="text-xs text-slate-500">{t(locale, 'proc.disclaimer')}</p>
    </div>
  );
}
