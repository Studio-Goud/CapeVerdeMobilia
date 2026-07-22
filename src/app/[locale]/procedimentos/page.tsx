import Link from 'next/link';
import { PROCEDURES, t, tr, type Locale, type TL } from '@/i18n';
import { OfficialTag } from '@/components/ui';

// Official São Vicente offices that the procedures point to. Verified public
// bodies — kept visually distinct from the commercial directory (a government
// office is not a business to claim). Contacts are indicative; confirm hours.
const OFFICES: { name: TL; role: TL; address: TL; phone?: string }[] = [
  {
    name: { pt: 'Casa do Cidadão — Mindelo', en: 'Casa do Cidadão — Mindelo', nl: 'Casa do Cidadão — Mindelo' },
    role: { pt: 'Certidões, criação de empresa (Empresa no Dia), NIF e registos.', en: 'Certificates, company creation (Empresa no Dia), NIF and registrations.', nl: 'Uittreksels, bedrijf oprichten (Empresa no Dia), NIF en registraties.' },
    address: { pt: 'Rua Senador Vera-Cruz, Mindelo', en: 'Rua Senador Vera-Cruz, Mindelo', nl: 'Rua Senador Vera-Cruz, Mindelo' },
    phone: '+238 231 79 17',
  },
  {
    name: { pt: 'Conservatória dos Registos de São Vicente', en: 'São Vicente Registry Office', nl: 'Kadaster/registers São Vicente' },
    role: { pt: 'Registo predial, comercial e automóvel (certidão de registo predial).', en: 'Property, commercial and vehicle registry (land registry certificate).', nl: 'Kadaster, handels- en voertuigregister (kadastraal uittreksel).' },
    address: { pt: 'Edifício da antiga TACV, centro do Mindelo', en: 'Former TACV building, central Mindelo', nl: 'Voormalig TACV-gebouw, centrum Mindelo' },
  },
  {
    name: { pt: '1.º Cartório Notarial de São Vicente', en: '1st Notary Office of São Vicente', nl: '1e notariskantoor São Vicente' },
    role: { pt: 'Escrituras públicas e atos notariais.', en: 'Public deeds and notarial acts.', nl: 'Notariële aktes en handelingen.' },
    address: { pt: 'Edifício da antiga TACV, centro do Mindelo', en: 'Former TACV building, central Mindelo', nl: 'Voormalig TACV-gebouw, centrum Mindelo' },
  },
  {
    name: { pt: '2.º Cartório Notarial de São Vicente', en: '2nd Notary Office of São Vicente', nl: '2e notariskantoor São Vicente' },
    role: { pt: 'Escrituras públicas e atos notariais.', en: 'Public deeds and notarial acts.', nl: 'Notariële aktes en handelingen.' },
    address: { pt: 'Monte Sossego, Mindelo', en: 'Monte Sossego, Mindelo', nl: 'Monte Sossego, Mindelo' },
  },
  {
    name: { pt: 'Ordem dos Advogados — Delegação de São Vicente', en: 'Bar Association — São Vicente delegation', nl: 'Orde van Advocaten — afdeling São Vicente' },
    role: { pt: 'Confirmar a inscrição de um advogado.', en: 'Confirm a lawyer’s registration.', nl: 'De inschrijving van een advocaat bevestigen.' },
    address: { pt: 'Rua Senador Vera-Cruz, Mindelo', en: 'Rua Senador Vera-Cruz, Mindelo', nl: 'Rua Senador Vera-Cruz, Mindelo' },
    phone: '+238 232 27 72',
  },
];

const OFFICES_HEAD: TL = { pt: 'Onde tratar (São Vicente)', en: 'Where to go (São Vicente)', nl: 'Waar te regelen (São Vicente)' };
const OFFICES_INTRO: TL = {
  pt: 'Serviços oficiais que os procedimentos acima referem. Informação indicativa — confirme sempre horários e requisitos junto da entidade.',
  en: 'Official services referenced by the procedures above. Indicative information — always confirm hours and requirements with the office.',
  nl: 'Officiële diensten waarnaar de procedures hierboven verwijzen. Indicatieve informatie — bevestig openingstijden en vereisten altijd bij de instantie.',
};

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

      {/* Official offices — verified public bodies, distinct from the commercial directory */}
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">{tr(OFFICES_HEAD, locale)}</h2>
          <OfficialTag variant="official" locale={locale} />
        </div>
        <p className="mb-4 max-w-2xl text-sm text-slate-600">{tr(OFFICES_INTRO, locale)}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {OFFICES.map((o, i) => (
            <div key={i} className="rounded-xl border border-emerald-100 bg-white p-3">
              <h3 className="text-sm font-semibold text-slate-900">{tr(o.name, locale)}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr(o.role, locale)}</p>
              <p className="mt-2 text-xs text-slate-500">{tr(o.address, locale)}</p>
              {o.phone && (
                <a href={`tel:${o.phone}`} className="mt-1 inline-block text-sm font-medium text-brand hover:underline">{o.phone}</a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
