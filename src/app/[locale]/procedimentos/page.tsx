import Link from 'next/link';
import { PROCEDURES, t, tr, type Locale } from '@/i18n';

export default function ProceduresPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t(locale, 'proc.title')}</h1>
      <p className="max-w-2xl text-sm text-slate-500">{t(locale, 'proc.intro')}</p>
      <ul className="space-y-3">
        {PROCEDURES.map((proc) => (
          <li key={proc.slug} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={`/${locale}/procedimentos/${proc.slug}`} className="font-semibold text-brand hover:underline">{tr(proc.title, locale)}</Link>
            <p className="mt-1 text-sm text-slate-500">{tr(proc.summary, locale)}</p>
            <p className="mt-2 text-xs text-slate-400">{proc.steps.length} {t(locale, 'proc.steps')} · {proc.govEntity} · ~{proc.estimatedDays} {t(locale, 'proc.days')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
