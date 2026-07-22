import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/verificacao');
}
import Link from 'next/link';
import { t, tr, verifLabel, type Locale, type TL } from '@/i18n';
import { VERIFICATION_LEVELS } from '@/content';
import { PageTitle } from '@/components/ui';

const CTA: TL = { pt: 'Verificar a minha identidade', en: 'Verify my identity', nl: 'Mijn identiteit verifiëren' };

export default function VerificationPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div>
      <PageTitle title={t(locale, 'veri.title')} intro={t(locale, 'veri.intro')} />
      <div className="-mt-2 mb-6">
        <Link href={`/${locale}/verificar`} className="inline-block rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          {tr(CTA, locale)}
        </Link>
      </div>
      <ol className="space-y-3">
        {VERIFICATION_LEVELS.map((v, i) => {
          const strong = v.code === 'L4' || v.code === 'L5';
          const mid = v.code === 'L2' || v.code === 'L3';
          const dot = strong ? 'bg-emerald-500' : mid ? 'bg-sky-500' : 'bg-slate-300';
          return (
            <li key={v.code} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <div className="flex flex-col items-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${dot}`}>{i}</span>
                {i < VERIFICATION_LEVELS.length - 1 && <span className="mt-1 w-px flex-1 bg-slate-200" aria-hidden />}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{v.code} · {verifLabel(locale, v.level)}</p>
                <p className="mt-1 text-sm text-slate-600"><span className="font-medium text-slate-500">{t(locale, 'veri.proof')}:</span> {tr(v.proof, locale)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
