import { t, type Locale } from '@/i18n';
import { LeadForm } from '@/components/LeadForm';

export default function NewJobPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{t(locale, 'job.title')}</h1>
      <p className="text-sm text-slate-500">{t(locale, 'job.intro')}</p>
      <ol className="grid gap-2 text-sm text-slate-700">
        <li>1. {t(locale, 'job.s1')}</li>
        <li>2. {t(locale, 'job.s2')}</li>
        <li>3. {t(locale, 'job.s3')}</li>
        <li>4. {t(locale, 'job.s4')}</li>
      </ol>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-slate-700">{t(locale, 'job.describe')}</h2>
        <LeadForm locale={locale} />
      </div>
    </div>
  );
}
