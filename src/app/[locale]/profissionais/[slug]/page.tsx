import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, type Locale, getProfessional, verifLabel } from '@/i18n';
import { REVIEWS } from '@/content';
import { PageTitle, Card, Pill, TrustBadge, SectionHead } from '@/components/ui';
import { LeadForm } from '@/components/LeadForm';

const ABOUT = { pt: 'Sobre', en: 'About', nl: 'Over' };
const SERVICES = { pt: 'Serviços', en: 'Services', nl: 'Diensten' };
const REVIEWS_HEAD = { pt: 'Avaliações', en: 'Reviews', nl: 'Beoordelingen' };
const AREAS = { pt: 'Áreas de serviço', en: 'Service areas', nl: 'Werkgebieden' };
const VERIFIED = { pt: 'Verificado', en: 'Verified', nl: 'Geverifieerd' };
const TRUST = { pt: 'Confiança e verificação', en: 'Trust & verification', nl: 'Vertrouwen en verificatie' };
const TRUST_BODY = {
  pt: 'O nível de verificação indica que passos de validação de identidade, empresa e documentos foram concluídos nesta plataforma de demonstração.',
  en: 'The verification level indicates which identity, business and document checks have been completed on this demo platform.',
  nl: 'Het verificatieniveau geeft aan welke identiteits-, bedrijfs- en documentcontroles op dit demoplatform zijn afgerond.',
};
const ABOUT_BODY = {
  pt: 'Equipa sediada em São Vicente com mais de uma década de experiência em projetos residenciais e comerciais nas ilhas de Cabo Verde. Trabalhamos com clientes locais e da diáspora, prezando por prazos claros, orçamentos transparentes e comunicação em português, crioulo e inglês. Este é um perfil fictício para fins de demonstração.',
  en: 'A São Vicente-based team with over a decade of experience on residential and commercial projects across the islands of Cape Verde. We serve both local and diaspora clients, with a focus on clear timelines, transparent budgets and communication in Portuguese, Creole and English. This is a fictional profile for demonstration purposes.',
  nl: 'Een team gevestigd op São Vicente met meer dan tien jaar ervaring in residentiële en commerciële projecten op de eilanden van Kaapverdië. Wij bedienen zowel lokale klanten als de diaspora, met aandacht voor duidelijke planningen, transparante budgetten en communicatie in het Portugees, Creools en Engels. Dit is een fictief profiel voor demonstratiedoeleinden.',
};

const SERVICE_ITEMS: ReadonlyArray<{ pt: string; en: string; nl: string }> = [
  {
    pt: 'Consulta inicial e visita ao local sem compromisso',
    en: 'Initial consultation and no-obligation site visit',
    nl: 'Eerste consult en vrijblijvend bezoek ter plaatse',
  },
  {
    pt: 'Orçamento detalhado com materiais e prazos',
    en: 'Detailed quote covering materials and timelines',
    nl: 'Gedetailleerde offerte met materialen en planning',
  },
  {
    pt: 'Acompanhamento e gestão da obra do início ao fim',
    en: 'Project supervision and management from start to finish',
    nl: 'Begeleiding en beheer van het project van begin tot eind',
  },
  {
    pt: 'Apoio na documentação e licenciamento junto das entidades',
    en: 'Support with documentation and permits with the authorities',
    nl: 'Ondersteuning bij documentatie en vergunningen bij de instanties',
  },
];

function Stars({ rating }: { rating: number }): JSX.Element {
  const rounded = Math.round(rating);
  return (
    <span className="text-amber-500" aria-label={`${rating} / 5`}>
      {'★★★★★'.slice(0, rounded)}
      <span className="text-slate-300">{'★★★★★'.slice(rounded)}</span>
    </span>
  );
}

export default function ProfessionalDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}): JSX.Element {
  const locale = params.locale;
  const pro = getProfessional(params.slug);
  if (!pro) notFound();

  const reviews = REVIEWS[pro.id] ?? [];

  return (
    <div>
      <div className="mb-4">
        <Link href={`/${locale}/profissionais`} className="text-sm font-medium text-brand hover:underline">
          ← {t(locale, 'common.back')} · {t(locale, 'nav.profissionais')}
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <PageTitle title={pro.displayName} intro={tr(pro.headline, locale)} />
            <TrustBadge level={pro.verificationLevel} locale={locale} />
          </div>

          <p className="-mt-2 mb-5 text-sm text-slate-600">
            {pro.ratingAvg !== null
              ? `★ ${pro.ratingAvg.toFixed(1)} (${pro.ratingCount})`
              : t(locale, 'pros.noReviews')}
          </p>

          {pro.serviceAreas.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{tr(AREAS, locale)}</p>
              <div className="flex flex-wrap gap-2">
                {pro.serviceAreas.map((a) => (
                  <Pill key={a} tone="brand">{a}</Pill>
                ))}
              </div>
            </div>
          )}

          <section className="mb-8">
            <SectionHead title={tr(ABOUT, locale)} />
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{tr(ABOUT_BODY, locale)}</p>
            {pro.priceIndication && (
              <p className="mt-3 text-sm font-medium text-slate-700">{tr(pro.priceIndication, locale)}</p>
            )}
          </section>

          <section className="mb-8">
            <SectionHead title={tr(SERVICES, locale)} />
            <ul className="space-y-2">
              {SERVICE_ITEMS.map((s) => (
                <li key={s.en} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                  <span>{tr(s, locale)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <SectionHead title={tr(REVIEWS_HEAD, locale)} />
            {reviews.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                {t(locale, 'pros.noReviews')}
              </p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((r, i) => (
                  <li key={`${r.author}-${i}`}>
                    <Card>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{r.author}</span>
                          {r.verified && <Pill tone="emerald">✓ {tr(VERIFIED, locale)}</Pill>}
                        </div>
                        <span className="text-xs text-slate-400">{r.date}</span>
                      </div>
                      <div className="mb-1 text-sm"><Stars rating={r.rating} /></div>
                      <p className="text-sm leading-relaxed text-slate-600">{tr(r.body, locale)}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-6 text-xs text-slate-400">{t(locale, 'proc.disclaimer')}</p>
        </div>

        <aside className="space-y-6">
          <Card>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{t(locale, 'listing.contactVisit')}</h2>
            <LeadForm locale={locale} />
          </Card>

          <Card>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">{tr(TRUST, locale)}</h2>
              <TrustBadge level={pro.verificationLevel} locale={locale} />
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-700">{verifLabel(locale, pro.verificationLevel)}</span>
              {' — '}
              {tr(TRUST_BODY, locale)}
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
