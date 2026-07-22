import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/servicos');
}
import Link from 'next/link';
import { fetchServiceListings } from '@/lib/data';
import { t, tr, formatPrice, type Locale } from '@/i18n';
import { PageTitle, Card } from '@/components/ui';

export default async function ServicesPage({ params }: { params: { locale: Locale } }): Promise<JSX.Element> {
  const locale = params.locale;
  const services = await fetchServiceListings();

  return (
    <div>
      <PageTitle title={t(locale, 'services.title')} intro={t(locale, 'services.intro')} />
      <div className="-mt-2 mb-6">
        <Link href={`/${locale}/imoveis/novo?kind=SERVICE`} className="inline-block rounded-lg bg-coral-600 px-4 py-2 text-sm font-semibold text-white hover:bg-coral-700">
          {t(locale, 'services.post')}
        </Link>
      </div>

      {services.length === 0 ? (
        <Card><p className="text-sm text-slate-500">{t(locale, 'services.none')}</p></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.id} href={`/${locale}/imoveis/${s.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative aspect-[4/3] bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.thumbnail} alt={tr(s.title, locale)} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-1 p-3">
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{tr(s.title, locale)}</h3>
                <p className="line-clamp-2 text-xs text-slate-500">{tr(s.description, locale)}</p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-500">{s.island}</span>
                  <span className="font-semibold text-brand">
                    {s.priceOnRequest || s.priceAmount == null
                      ? t(locale, 'common.priceOnRequest')
                      : `${t(locale, 'services.from')} ${formatPrice(locale, s.priceAmount, false)}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
