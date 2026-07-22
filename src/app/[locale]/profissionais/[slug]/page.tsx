import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { t, tr, type Locale, type TL, verifLabel } from '@/i18n';
import { REVIEWS } from '@/content';
import { fetchProfessionalBySlug, fetchReviews, type ProProfile, type ReviewView } from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase/env';
import { PageTitle, Card, Pill, TrustBadge, SectionHead, SeededBadge, SourceLine } from '@/components/ui';
import { LeadForm } from '@/components/LeadForm';
import { ReviewForm } from '@/components/ReviewForm';
import { ClaimBusiness } from '@/components/ClaimBusiness';

const ABOUT: TL = { pt: 'Sobre', en: 'About', nl: 'Over' };
const SERVICES: TL = { pt: 'Serviços', en: 'Services', nl: 'Diensten' };
const REVIEWS_HEAD: TL = { pt: 'Avaliações', en: 'Reviews', nl: 'Beoordelingen' };
const AREAS: TL = { pt: 'Áreas de serviço', en: 'Service areas', nl: 'Werkgebieden' };
const VERIFIED: TL = { pt: 'Verificado', en: 'Verified', nl: 'Geverifieerd' };
const TRUST: TL = { pt: 'Confiança e verificação', en: 'Trust & verification', nl: 'Vertrouwen en verificatie' };
const CONTACT_PHONE: TL = { pt: 'Ligar diretamente', en: 'Call directly', nl: 'Direct bellen' };

const TRUST_BODY: TL = {
  pt: 'O nível de verificação indica quais os passos de validação de identidade, empresa e documentos que este profissional já concluiu.',
  en: 'The verification level indicates which identity, business and document checks this professional has completed.',
  nl: 'Het verificatieniveau geeft aan welke identiteits-, bedrijfs- en documentcontroles deze professional heeft afgerond.',
};

// Shown only when the professional has no real bio yet — generic, no fictional claims.
const ABOUT_FALLBACK: TL = {
  pt: 'Profissional disponível para projetos residenciais e comerciais em Cabo Verde. Entre em contacto para conhecer os serviços, a disponibilidade e receber um orçamento sem compromisso.',
  en: 'Professional available for residential and commercial projects across Cape Verde. Get in touch to learn about services, availability and to receive a no-obligation quote.',
  nl: 'Professional beschikbaar voor residentiële en commerciële projecten in Kaapverdië. Neem contact op voor informatie over diensten, beschikbaarheid en een vrijblijvende offerte.',
};

// Generic "what to expect" guide — not claimed as this professional's specific offering.
const SERVICES_INTRO: TL = {
  pt: 'O que geralmente esperar ao entrar em contacto:',
  en: 'What to generally expect when you get in touch:',
  nl: 'Wat u doorgaans kunt verwachten bij contact:',
};

const SERVICE_ITEMS: ReadonlyArray<TL> = [
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
    pt: 'Acompanhamento e gestão do projeto do início ao fim',
    en: 'Project supervision and management from start to finish',
    nl: 'Begeleiding en beheer van het project van begin tot eind',
  },
  {
    pt: 'Apoio na documentação e licenciamento junto das entidades',
    en: 'Support with documentation and permits with the authorities',
    nl: 'Ondersteuning bij documentatie en vergunningen bij de instanties',
  },
];

/** Real bio when the professional has written one; otherwise a generic fallback line. */
function aboutText(pro: ProProfile, locale: Locale): string {
  const bio = pro.bio ? tr(pro.bio, locale).trim() : '';
  return bio || tr(ABOUT_FALLBACK, locale);
}

function Stars({ rating }: { rating: number }): JSX.Element {
  const rounded = Math.round(rating);
  return (
    <span className="text-amber-500" aria-label={`${rating} / 5`}>
      {'★★★★★'.slice(0, rounded)}
      <span className="text-slate-300">{'★★★★★'.slice(rounded)}</span>
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const pro = await fetchProfessionalBySlug(params.slug);
  if (!pro) return { title: 'Djarvista' };
  const title = `${pro.displayName} · Djarvista`;
  const description = tr(pro.headline, params.locale).slice(0, 180);
  return { title, description, openGraph: { title, description } };
}

export default async function ProfessionalDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<JSX.Element> {
  const locale = params.locale;
  const pro = await fetchProfessionalBySlug(params.slug);
  if (!pro) notFound();

  const configured = isSupabaseConfigured;
  const demoReviews: ReviewView[] = (REVIEWS[pro.id] ?? []).map((r) => ({
    author: r.author, rating: r.rating, verified: r.verified, date: r.date, body: tr(r.body, locale),
  }));
  const reviews: ReviewView[] = configured ? await fetchReviews(pro.slug) : demoReviews;
  const reviewAvg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;

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
            <div className="flex flex-wrap items-center gap-2">
              {pro.seeded && <SeededBadge locale={locale} />}
              <TrustBadge level={pro.verificationLevel} locale={locale} />
            </div>
          </div>

          {pro.seeded && (
            <div className="-mt-2 mb-5 space-y-1 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2">
              <p className="text-xs text-slate-600">{t(locale, 'claim.seededNote')}</p>
              <SourceLine locale={locale} name={pro.sourceName} url={pro.sourceUrl} date={pro.sourcedAt} />
            </div>
          )}

          <p className="-mt-2 mb-5 text-sm text-slate-600">
            {reviews.length > 0
              ? `★ ${(reviewAvg ?? 0).toFixed(1)} (${reviews.length})`
              : !configured && pro.ratingAvg !== null
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
            <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-slate-600">{aboutText(pro, locale)}</p>
            {pro.priceIndication && (
              <p className="mt-3 text-sm font-medium text-slate-700">{tr(pro.priceIndication, locale)}</p>
            )}
          </section>

          <section className="mb-8">
            <SectionHead title={tr(SERVICES, locale)} />
            <p className="mb-3 text-sm text-slate-600">{tr(SERVICES_INTRO, locale)}</p>
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
                {t(locale, configured ? 'review.none' : 'pros.noReviews')}
              </p>
            ) : (
              <ul className="space-y-4">
                {reviews.map((r, i) => (
                  <li key={`${r.author}-${i}`}>
                    <Card>
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{r.author}</span>
                          {r.verified
                            ? <Pill tone="emerald">✓ {tr(VERIFIED, locale)}</Pill>
                            : <Pill tone="amber">{t(locale, 'review.pending')}</Pill>}
                        </div>
                        <span className="text-xs text-slate-400">{r.date}</span>
                      </div>
                      <div className="mb-1 text-sm"><Stars rating={r.rating} /></div>
                      <p className="text-sm leading-relaxed text-slate-600">{r.body}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-slate-400">{t(locale, 'review.verifiedNote')}</p>
            {configured && (
              <div className="mt-4">
                <ReviewForm proSlug={pro.slug} locale={locale} />
              </div>
            )}
          </section>

          <p className="mt-6 text-xs text-slate-400">{t(locale, 'proc.disclaimer')}</p>
        </div>

        <aside className="space-y-6">
          <Card>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">{t(locale, 'listing.contactVisit')}</h2>
            {pro.phone && (
              <p className="mb-3 text-sm text-slate-600">
                {pro.seeded ? t(locale, 'claim.contactDirect') : tr(CONTACT_PHONE, locale)}:{' '}
                <a href={`tel:${pro.phone}`} className="font-medium text-brand hover:underline">{pro.phone}</a>
              </p>
            )}
            {pro.seeded
              ? <p className="text-xs text-slate-400">{t(locale, 'claim.leadsAfterClaim')}</p>
              : <LeadForm locale={locale} proSlug={pro.slug} recipient={pro.userId} source="pro" />}
          </Card>

          {pro.seeded && (
            <Card className="border-brand-100 bg-brand-50/40">
              <ClaimBusiness locale={locale} profileType="professional" profileId={pro.id} />
            </Card>
          )}

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
