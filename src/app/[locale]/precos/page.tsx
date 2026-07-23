import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/precos');
}
import Link from 'next/link';
import { tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card, Pill, SectionHead } from '@/components/ui';

interface Plan {
  name: TL;
  price: TL;
  features: TL[];
  recommended?: boolean;
}

const INDICATIVE: TL = {
  pt: 'indicativo · a definir',
  en: 'indicative · to be set',
  nl: 'indicatief · nog te bepalen',
};

const RECOMMENDED: TL = {
  pt: 'recomendado',
  en: 'recommended',
  nl: 'aanbevolen',
};

const PLANS: Plan[] = [
  {
    name: { pt: 'Particular', en: 'Individual', nl: 'Particulier' },
    price: { pt: 'Grátis', en: 'Free', nl: 'Gratis' },
    features: [
      {
        pt: 'Anunciar para vender ou arrendar, sem custos',
        en: 'List to sell or rent, at no cost',
        nl: 'Plaats om te verkopen of verhuren, kosteloos',
      },
      {
        pt: 'Procurar imóveis e contactar sem barreiras',
        en: 'Search properties and make contact freely',
        nl: 'Zoek woningen en neem vrij contact op',
      },
      {
        pt: 'Até 3 anúncios ativos com fotos',
        en: 'Up to 3 active listings with photos',
        nl: 'Tot 3 actieve advertenties met foto’s',
      },
      {
        pt: 'Só paga se usar serviços opcionais (ver abaixo)',
        en: 'Only pay if you use optional services (see below)',
        nl: 'Betaal alleen bij optionele diensten (zie onder)',
      },
    ],
  },
  {
    name: { pt: 'Profissional', en: 'Professional', nl: 'Professional' },
    price: { pt: '≈ 1.500 CVE / mês', en: '≈ 1,500 CVE / month', nl: '≈ 1.500 CVE / maand' },
    recommended: true,
    features: [
      {
        pt: 'Perfil com selo verificado e reputação',
        en: 'Profile with verified badge and reputation',
        nl: 'Profiel met geverifieerd label en reputatie',
      },
      {
        pt: 'Anúncios ilimitados e prioridade nas pesquisas',
        en: 'Unlimited listings and search priority',
        nl: 'Onbeperkte advertenties en zoekprioriteit',
      },
      {
        pt: '1 anúncio em destaque por mês (sempre rotulado)',
        en: '1 featured listing per month (always labelled)',
        nl: '1 uitgelichte advertentie per maand (altijd gelabeld)',
      },
      {
        pt: 'Estatísticas de visitas e contactos',
        en: 'Visit and contact analytics',
        nl: 'Statistieken over bezoeken en contacten',
      },
    ],
  },
  {
    name: { pt: 'Empresa · Agência', en: 'Agency · Broker', nl: 'Makelaar · Bedrijf' },
    price: { pt: '≈ 6.000 CVE / mês', en: '≈ 6,000 CVE / month', nl: '≈ 6.000 CVE / maand' },
    features: [
      {
        pt: 'Vários utilizadores e página de empresa',
        en: 'Multiple seats and a company page',
        nl: 'Meerdere gebruikers en een bedrijfspagina',
      },
      {
        pt: 'Destaques incluídos e campanhas patrocinadas',
        en: 'Featured slots included and sponsored campaigns',
        nl: 'Inbegrepen uitlichtingen en gesponsorde campagnes',
      },
      {
        pt: 'Concierge para compradores estrangeiros',
        en: 'Concierge for foreign buyers',
        nl: 'Concierge voor buitenlandse kopers',
      },
      {
        pt: 'Comissão de sucesso reduzida em negócios fechados',
        en: 'Reduced success fee on closed deals',
        nl: 'Verlaagde succesfee bij gesloten deals',
      },
    ],
  },
  {
    name: { pt: 'Instituição · Setor público', en: 'Institution · Government', nl: 'Instelling · Overheid' },
    price: { pt: 'Licença B2G · sob proposta', en: 'B2G licence · on request', nl: 'B2G-licentie · op aanvraag' },
    features: [
      {
        pt: 'Publicação de concursos e procedimentos oficiais',
        en: 'Publish official tenders and procedures',
        nl: 'Publiceer officiële aanbestedingen en procedures',
      },
      {
        pt: 'Selo institucional e dados verificados',
        en: 'Institutional badge and verified data',
        nl: 'Institutioneel label en geverifieerde data',
      },
      {
        pt: 'Integração e relatórios para o setor público',
        en: 'Integration and reporting for the public sector',
        nl: 'Integratie en rapportage voor de publieke sector',
      },
      {
        pt: 'Apoio dedicado e formação de equipas',
        en: 'Dedicated support and team training',
        nl: 'Toegewijde ondersteuning en teamtraining',
      },
    ],
  },
];

interface AlaCarte {
  name: TL;
  price: TL;
  note: TL;
}

const A_LA_CARTE: AlaCarte[] = [
  {
    name: { pt: 'Contrato verificado · e-sign', en: 'Verified contract · e-sign', nl: 'Geverifieerd contract · e-sign' },
    price: { pt: '≈ 500 CVE', en: '≈ 500 CVE', nl: '≈ 500 CVE' },
    note: {
      pt: 'Contrato final e assinatura digital com registo.',
      en: 'Final contract and digital signature with an audit trail.',
      nl: 'Definitief contract en digitale handtekening met logboek.',
    },
  },
  {
    name: { pt: 'Verificação de identidade', en: 'Identity verification', nl: 'Identiteitsverificatie' },
    price: { pt: '≈ 250 CVE', en: '≈ 250 CVE', nl: '≈ 250 CVE' },
    note: {
      pt: 'Confirma quem está do outro lado do negócio.',
      en: 'Confirms who is on the other side of the deal.',
      nl: 'Bevestigt wie er aan de andere kant van de deal zit.',
    },
  },
  {
    name: { pt: 'Anúncio em destaque', en: 'Featured listing', nl: 'Uitgelichte advertentie' },
    price: { pt: '≈ 800 CVE / semana', en: '≈ 800 CVE / week', nl: '≈ 800 CVE / week' },
    note: {
      pt: 'Mais visibilidade na página inicial e no topo, sempre rotulado como patrocinado.',
      en: 'More visibility on the homepage and at the top, always labelled as sponsored.',
      nl: 'Meer zichtbaarheid op de homepage en bovenaan, altijd gelabeld als gesponsord.',
    },
  },
  {
    name: { pt: 'Serviço ligado · instalação', en: 'Linked service · installation', nl: 'Gekoppelde dienst · installatie' },
    price: { pt: '≈ 2.500 CVE / mês', en: '≈ 2,500 CVE / month', nl: '≈ 2.500 CVE / maand' },
    note: {
      pt: 'Seja o instalador sugerido a quem compra o equipamento. Com selo, rotulado e só com consentimento do cliente.',
      en: 'Be the installer suggested to whoever buys the equipment. Badged, labelled and only with the customer’s consent.',
      nl: 'Wees de installateur die wordt voorgesteld aan wie de apparatuur koopt. Met label en alleen met toestemming van de klant.',
    },
  },
];

const COPY = {
  title: { pt: 'Preços e planos', en: 'Pricing and plans', nl: 'Prijzen en pakketten' },
  intro: {
    pt: 'O básico é grátis: qualquer residente pode anunciar para vender ou arrendar e procurar imóveis sem pagar. Só cobramos a quem recebe valor - profissionais, empresas, compradores estrangeiros e instituições.',
    en: 'The basics are free: any resident can list to sell or rent and search properties without paying. We only charge those who receive value - professionals, businesses, foreign buyers and institutions.',
    nl: 'De basis is gratis: elke inwoner kan plaatsen om te verkopen of verhuren en woningen zoeken zonder te betalen. We rekenen alleen bij wie waarde ontvangt - professionals, bedrijven, buitenlandse kopers en instellingen.',
  },
  freeBandTitle: { pt: 'Grátis para sempre', en: 'Free forever', nl: 'Voor altijd gratis' },
  freeBandBody: {
    pt: 'Para residentes: anunciar, procurar e contactar são e continuarão a ser gratuitos. Sem taxas escondidas no serviço básico.',
    en: 'For residents: listing, searching and contacting are and will stay free. No hidden fees on the basic service.',
    nl: 'Voor inwoners: plaatsen, zoeken en contact zijn en blijven gratis. Geen verborgen kosten op de basisdienst.',
  },
  plansHead: { pt: 'Planos', en: 'Plans', nl: 'Pakketten' },
  alaCarteHead: { pt: 'Serviços à la carte', en: 'À la carte services', nl: 'Losse diensten' },
  alaCarteIntro: {
    pt: 'Micro-taxas opcionais para serviços de confiança. Use se precisar - o serviço básico não depende delas.',
    en: 'Optional micro-fees for trust services. Use them if you need them - the basic service does not depend on them.',
    nl: 'Optionele microkosten voor vertrouwensdiensten. Gebruik ze indien nodig - de basisdienst hangt er niet van af.',
  },
  disclaimerTitle: { pt: 'Valores indicativos', en: 'Indicative figures', nl: 'Indicatieve bedragen' },
  disclaimerBody: {
    pt: 'Todos os preços em CVE são indicativos e ajustados ao poder de compra: baixos para residentes, mais altos para clientes internacionais. Serão finalizados antes do lançamento. O serviço básico permanece gratuito.',
    en: 'All prices in CVE are indicative and adjusted to purchasing power: low for residents, higher for international clients. They will be finalised before launch. The basic service stays free.',
    nl: 'Alle prijzen in CVE zijn indicatief en aangepast aan de koopkracht: laag voor inwoners, hoger voor internationale klanten. Ze worden vóór de lancering definitief gemaakt. De basisdienst blijft gratis.',
  },
  cta: { pt: 'Registar gratuitamente', en: 'Register for free', nl: 'Gratis registreren' },
  included: { pt: 'Inclui', en: 'Included', nl: 'Inbegrepen' },
} satisfies Record<string, TL>;

export default function PricingPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const { locale } = params;

  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle title={tr(COPY.title, locale)} intro={tr(COPY.intro, locale)} />

      {/* Free-forever highlight band */}
      <section className="mb-8 rounded-2xl bg-brand-50 p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand sm:text-xl">{tr(COPY.freeBandTitle, locale)}</h2>
              <Pill tone="brand">{tr(COPY.freeBandBody, locale).split(':')[0]}</Pill>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-700">{tr(COPY.freeBandBody, locale)}</p>
          </div>
          <Link
            href={`/${locale}/registar`}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-coral-600 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-coral-700"
          >
            {tr(COPY.cta, locale)}
          </Link>
        </div>
      </section>

      {/* Plans grid */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.plansHead, locale)} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <Card
              key={tr(plan.name, 'pt')}
              className={
                plan.recommended
                  ? 'rounded-2xl border-2 border-brand ring-1 ring-brand/20'
                  : 'rounded-2xl'
              }
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">{tr(plan.name, locale)}</h3>
                {plan.recommended && <Pill tone="brand">{tr(RECOMMENDED, locale)}</Pill>}
              </div>

              <div className="mt-2">
                <p className="text-lg font-semibold text-brand">{tr(plan.price, locale)}</p>
                <div className="mt-1">
                  <Pill tone="amber">{tr(INDICATIVE, locale)}</Pill>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-tightish text-slate-500">
                {tr(COPY.included, locale)}
              </p>
              <ul className="mt-2 space-y-2">
                {plan.features.map((feature) => (
                  <li key={tr(feature, 'pt')} className="flex gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-0.5 text-brand">✓</span>
                    <span>{tr(feature, locale)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* À la carte micro-fees */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.alaCarteHead, locale)} />
        <p className="mb-2 max-w-3xl text-sm text-slate-600">{tr(COPY.alaCarteIntro, locale)}</p>
        <p className="mb-4 text-sm">
          <Link href={`/${locale}/anunciar`} className="font-semibold text-brand hover:underline">
            {tr({ pt: 'Como funciona a publicidade e o que ganha →', en: 'How advertising works and what you get →', nl: 'Hoe adverteren werkt en wat je krijgt →' }, locale)}
          </Link>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {A_LA_CARTE.map((item) => (
            <Card key={tr(item.name, 'pt')} className="rounded-2xl">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{tr(item.name, locale)}</h3>
                <Pill tone="amber">{tr(INDICATIVE, locale)}</Pill>
              </div>
              <p className="mt-2 text-base font-semibold text-brand">{tr(item.price, locale)}</p>
              <p className="mt-1 text-sm text-slate-600">{tr(item.note, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Indicative-pricing disclaimer */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-6">
        <div className="flex items-center gap-2">
          <Pill tone="amber">{tr(INDICATIVE, locale)}</Pill>
          <h2 className="text-base font-bold text-slate-900">{tr(COPY.disclaimerTitle, locale)}</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.disclaimerBody, locale)}</p>
      </section>
    </div>
  );
}
