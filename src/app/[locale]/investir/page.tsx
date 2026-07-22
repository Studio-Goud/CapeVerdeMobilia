import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/investir');
}
import Link from 'next/link';
import { t, tr, type Locale } from '@/i18n';
import { PageTitle, Card, Pill, Stat, SectionHead } from '@/components/ui';

/** Inline trilingual string literal (PT / EN / NL) - page-specific investor copy. */
type TL = { pt: string; en: string; nl: string };
/** A titled content block rendered as a Card. */
interface Block { h: TL; body: TL }

const COPY = {
  kicker: {
    pt: 'Resumo para investidores · conceito',
    en: 'Investor summary · concept',
    nl: 'Investeerdersoverzicht · concept',
  },
  heroTitle: {
    pt: 'Djarvista - infraestrutura digital independente para Cabo Verde',
    en: 'Djarvista - independent digital infrastructure for Cabo Verde',
    nl: 'Djarvista - onafhankelijke digitale infrastructuur voor Kaapverdië',
  },
  positioning: {
    pt: 'Uma infraestrutura digital independente que liga cidadãos, empreendedores, investidores, profissionais e entidades públicas - a começar por São Vicente.',
    en: 'Independent digital infrastructure connecting citizens, entrepreneurs, investors, professionals and public bodies - starting on São Vicente.',
    nl: 'Onafhankelijke digitale infrastructuur die burgers, ondernemers, investeerders, professionals en overheidsinstanties verbindt - te beginnen op São Vicente.',
  },
  disclaimer: {
    pt: 'Aviso: todos os números, mercados e enquadramentos legais nesta página são indicativos e representam pressupostos a validar. Este é um conceito em fase inicial - nada aqui constitui facto confirmado nem aconselhamento de investimento.',
    en: 'Notice: all figures, markets and legal references on this page are indicative and represent assumptions to be validated. This is an early-stage concept - nothing here is a confirmed fact or investment advice.',
    nl: 'Let op: alle cijfers, markten en juridische verwijzingen op deze pagina zijn indicatief en betreffen aannames die nog gevalideerd moeten worden. Dit is een concept in een vroege fase - niets hier is een bevestigd feit of beleggingsadvies.',
  },
  assumption: { pt: 'pressuposto', en: 'assumption', nl: 'aanname' },
  toValidate: { pt: 'a validar', en: 'to validate', nl: 'te valideren' },
} as const;

const PROBLEM: Block = {
  h: {
    pt: '1. O problema',
    en: '1. The problem',
    nl: '1. Het probleem',
  },
  body: {
    pt: 'Em Cabo Verde, a informação sobre terra, imóveis, licenças de construção e profissionais está fragmentada e é difícil de verificar. Documentos, procedimentos e contactos dispersam-se por fontes informais, o que gera desconfiança, atrasos e risco para quem compra, constrói ou investe - sobretudo para a diáspora e investidores externos.',
    en: 'In Cabo Verde, information on land, property, building permits and professionals is fragmented and hard to verify. Documents, procedures and contacts are scattered across informal sources, creating mistrust, delays and risk for anyone buying, building or investing - especially the diaspora and external investors.',
    nl: 'In Kaapverdië is informatie over grond, vastgoed, bouwvergunningen en professionals versnipperd en moeilijk te verifiëren. Documenten, procedures en contacten liggen verspreid over informele bronnen, wat wantrouwen, vertraging en risico oplevert voor wie koopt, bouwt of investeert - vooral voor de diaspora en buitenlandse investeerders.',
  },
};

const SOLUTION: Block = {
  h: {
    pt: '2. A solução',
    en: '2. The solution',
    nl: '2. De oplossing',
  },
  body: {
    pt: 'Uma plataforma digital única, independente e trilingue (PT/EN/NL) que reúne imóveis, terrenos, construção, profissionais e informação oficial num só ecossistema - com verificação de confiança no centro. O objetivo é tornar a informação encontrável, verificável e acionável.',
    en: 'A single, independent, trilingual (PT/EN/NL) platform bringing property, land, construction, professionals and official information into one ecosystem - with trust verification at its core. The goal is to make information findable, verifiable and actionable.',
    nl: 'Eén onafhankelijk, drietalig (PT/EN/NL) platform dat vastgoed, grond, bouw, professionals en officiële informatie samenbrengt in één ecosysteem - met vertrouwensverificatie als kern. Het doel: informatie vindbaar, verifieerbaar en bruikbaar maken.',
  },
};

const VALUE_LEVELS: Block[] = [
  {
    h: { pt: 'Informação', en: 'Information', nl: 'Informatie' },
    body: {
      pt: 'Centralizar dados sobre imóveis, terra, procedimentos e informação oficial de forma clara e localizada.',
      en: 'Centralise data on property, land, procedures and official information in a clear, localised way.',
      nl: 'Data over vastgoed, grond, procedures en officiële informatie helder en gelokaliseerd centraliseren.',
    },
  },
  {
    h: { pt: 'Confiança', en: 'Trust', nl: 'Vertrouwen' },
    body: {
      pt: 'Verificar identidades, documentos e profissionais por níveis, sinalizando o que é oficial e o que não está confirmado.',
      en: 'Verify identities, documents and professionals in tiers, flagging what is official and what is unconfirmed.',
      nl: 'Identiteiten, documenten en professionals gelaagd verifiëren, met markering van wat officieel is en wat onbevestigd.',
    },
  },
  {
    h: { pt: 'Visibilidade', en: 'Visibility', nl: 'Zichtbaarheid' },
    body: {
      pt: 'Dar a proprietários, profissionais e projetos um lugar credível para serem encontrados.',
      en: 'Give owners, professionals and projects a credible place to be found.',
      nl: 'Eigenaren, professionals en projecten een geloofwaardige plek geven om gevonden te worden.',
    },
  },
  {
    h: { pt: 'Transações', en: 'Transactions', nl: 'Transacties' },
    body: {
      pt: 'Facilitar contactos, pedidos e negócios com registo e acompanhamento estruturados.',
      en: 'Facilitate contacts, requests and deals with structured records and tracking.',
      nl: 'Contacten, aanvragen en deals faciliteren met gestructureerde registratie en opvolging.',
    },
  },
  {
    h: { pt: 'Acompanhamento', en: 'Guidance', nl: 'Begeleiding' },
    body: {
      pt: 'Guiar utilizadores passo a passo em processos de compra, construção e licenciamento.',
      en: 'Guide users step by step through buying, building and permitting processes.',
      nl: 'Gebruikers stap voor stap begeleiden bij koop-, bouw- en vergunningstrajecten.',
    },
  },
];

const MARKET_PHASES: Block[] = [
  {
    h: { pt: 'Fase 1 - Piloto São Vicente', en: 'Phase 1 - São Vicente pilot', nl: 'Fase 1 - Pilot São Vicente' },
    body: {
      pt: 'Validar o modelo numa ilha, com foco em Mindelo, onde o mercado e a comunidade são concentrados.',
      en: 'Validate the model on one island, focused on Mindelo, where the market and community are concentrated.',
      nl: 'Het model valideren op één eiland, gericht op Mindelo, waar markt en gemeenschap geconcentreerd zijn.',
    },
  },
  {
    h: { pt: 'Fase 2 - Outras ilhas', en: 'Phase 2 - Other islands', nl: 'Fase 2 - Andere eilanden' },
    body: {
      pt: 'Expandir para Santiago, Sal e Boa Vista, reaproveitando processos e verificação.',
      en: 'Expand to Santiago, Sal and Boa Vista, reusing processes and verification.',
      nl: 'Uitbreiden naar Santiago, Sal en Boa Vista, met hergebruik van processen en verificatie.',
    },
  },
  {
    h: { pt: 'Fase 3 - Nacional', en: 'Phase 3 - National', nl: 'Fase 3 - Nationaal' },
    body: {
      pt: 'Cobertura nacional e parcerias mais amplas com entidades e associações profissionais.',
      en: 'National coverage and broader partnerships with public bodies and professional associations.',
      nl: 'Landelijke dekking en bredere samenwerkingen met overheden en beroepsverenigingen.',
    },
  },
  {
    h: { pt: 'Fase 4 - Estados-ilha internacionais', en: 'Phase 4 - International island states', nl: 'Fase 4 - Internationale eilandstaten' },
    body: {
      pt: 'Levar o modelo a outros estados-ilha com desafios semelhantes de informação e confiança.',
      en: 'Take the model to other island states facing similar information and trust challenges.',
      nl: 'Het model naar andere eilandstaten brengen met vergelijkbare informatie- en vertrouwensuitdagingen.',
    },
  },
];

const BUSINESS_MODEL: TL[] = [
  {
    pt: 'Subscrições de profissionais e empresas (perfis, ferramentas e destaque).',
    en: 'Subscriptions for professionals and businesses (profiles, tools and prominence).',
    nl: 'Abonnementen voor professionals en bedrijven (profielen, tools en zichtbaarheid).',
  },
  {
    pt: 'Taxas de anúncio e de contacto/lead em imóveis e terrenos.',
    en: 'Listing and contact/lead fees on properties and land.',
    nl: 'Plaatsings- en contact-/leadkosten voor vastgoed en grond.',
  },
  {
    pt: 'Serviços de verificação de identidade, documentos e profissionais.',
    en: 'Identity, document and professional verification services.',
    nl: 'Diensten voor identiteits-, document- en professionalverificatie.',
  },
  {
    pt: 'Comissões sobre transações e serviços intermediados.',
    en: 'Commissions on brokered transactions and services.',
    nl: 'Commissies op bemiddelde transacties en diensten.',
  },
  {
    pt: 'Licenças e serviços para entidades públicas (informação oficial e fluxos digitais).',
    en: 'Licences and services for public bodies (official information and digital workflows).',
    nl: 'Licenties en diensten voor overheidsinstanties (officiële informatie en digitale processen).',
  },
];

const DEFENSIBILITY: Block[] = [
  {
    h: { pt: 'Dados de confiança & verificação', en: 'Trust & verification data', nl: 'Vertrouwens- & verificatiedata' },
    body: {
      pt: 'Cada verificação acumula um histórico difícil de replicar e cria um padrão de confiança próprio.',
      en: 'Every verification builds a history that is hard to replicate and sets a proprietary trust standard.',
      nl: 'Elke verificatie bouwt een moeilijk te repliceren historie op en vormt een eigen vertrouwensstandaard.',
    },
  },
  {
    h: { pt: 'Parcerias de informação oficial', en: 'Official-information partnerships', nl: 'Partnerschappen voor officiële informatie' },
    body: {
      pt: 'Ligações a fontes e entidades oficiais aumentam a credibilidade e elevam a barreira à entrada.',
      en: 'Links to official sources and bodies raise credibility and the barrier to entry.',
      nl: 'Koppelingen met officiële bronnen en instanties verhogen de geloofwaardigheid en de toetredingsdrempel.',
    },
  },
  {
    h: { pt: 'Efeitos de rede', en: 'Network effects', nl: 'Netwerkeffecten' },
    body: {
      pt: 'Mais utilizadores atraem mais profissionais e anúncios, reforçando o valor para todos os lados.',
      en: 'More users attract more professionals and listings, reinforcing value for every side.',
      nl: 'Meer gebruikers trekken meer professionals en advertenties aan, wat de waarde voor alle kanten versterkt.',
    },
  },
];

const TRACTION: Block[] = [
  {
    h: { pt: 'Plataforma trilingue ao vivo', en: 'Live trilingual platform', nl: 'Live drietalig platform' },
    body: {
      pt: 'A plataforma está no ar em PT/EN/NL, com backend real: contas, anúncios, arrendamento, verificação e informação oficial - a começar por São Vicente.',
      en: 'The platform is live in PT/EN/NL on a real backend: accounts, listings, renting, verification and official information - starting on São Vicente.',
      nl: 'Het platform is live in PT/EN/NL op een echte backend: accounts, advertenties, verhuur, verificatie en officiële informatie - te beginnen op São Vicente.',
    },
  },
  {
    h: { pt: 'Piloto concierge', en: 'Concierge pilot', nl: 'Concierge-pilot' },
    body: {
      pt: 'Em São Vicente, operar manualmente os primeiros casos (verificações, anúncios, pedidos) para aprender antes de automatizar.',
      en: 'On São Vicente, run the first cases manually (verifications, listings, requests) to learn before automating.',
      nl: 'Op São Vicente de eerste cases handmatig uitvoeren (verificaties, advertenties, aanvragen) om te leren vóór automatisering.',
    },
  },
];

// Real, verifiable status only - no invented pilot/projection numbers.
const STATS: { label: TL; value: TL; hint: TL }[] = [
  {
    label: { pt: 'Plataforma', en: 'Platform', nl: 'Platform' },
    value: { pt: 'Ao vivo', en: 'Live', nl: 'Live' },
    hint: { pt: 'com backend real', en: 'on a real backend', nl: 'met echte backend' },
  },
  {
    label: { pt: 'Ilha piloto', en: 'Pilot island', nl: 'Pilot-eiland' },
    value: { pt: 'São Vicente', en: 'São Vicente', nl: 'São Vicente' },
    hint: { pt: 'foco em Mindelo', en: 'focused on Mindelo', nl: 'gericht op Mindelo' },
  },
  {
    label: { pt: 'Idiomas', en: 'Languages', nl: 'Talen' },
    value: { pt: '3', en: '3', nl: '3' },
    hint: { pt: 'PT · EN · NL', en: 'PT · EN · NL', nl: 'PT · EN · NL' },
  },
];

const ASK: Block = {
  h: { pt: '8. O pedido', en: '8. The ask', nl: '8. De vraag' },
  body: {
    pt: 'Procuramos uma ronda de financiamento inicial para operar o piloto de São Vicente: equipa reduzida, operação concierge, verificação e desenvolvimento de produto durante os primeiros 12 meses.',
    en: 'We are seeking a seed funding round to run the São Vicente pilot: a small team, concierge operations, verification and product development over the first 12 months.',
    nl: 'Wij zoeken een startfinancieringsronde om de pilot op São Vicente te draaien: een klein team, concierge-operatie, verificatie en productontwikkeling gedurende de eerste 12 maanden.',
  },
};

const CLOSING: TL = {
  pt: 'Documentação de estratégia completa - deck para investidores, análise de mercado e modelo financeiro - disponível a pedido.',
  en: 'A complete set of strategy documents - investor deck, market analysis and financial model - available on request.',
  nl: 'Een volledige set strategiedocumenten - investeerdersdeck, marktanalyse en financieel model - beschikbaar op aanvraag.',
};

export default function InvestirPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;

  return (
    <div className="space-y-10">
      {/* 1. Hero */}
      <section className="overflow-hidden rounded-3xl bg-hero-ocean px-6 py-12 text-white shadow-card sm:px-10">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">{tr(COPY.kicker, locale)}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{tr(COPY.heroTitle, locale)}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90">{tr(COPY.positioning, locale)}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{t(locale, 'nav.investir')}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{t(locale, 'home.forBuyers')}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm">{t(locale, 'home.forGov')}</span>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <div className="mb-1 flex flex-wrap gap-2">
          <Pill tone="amber">{tr(COPY.assumption, locale)}</Pill>
          <Pill tone="amber">{tr(COPY.toValidate, locale)}</Pill>
        </div>
        {tr(COPY.disclaimer, locale)}
      </div>

      {/* Current status - real, verifiable facts only */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {tr({ pt: 'Estado atual', en: 'Current status', nl: 'Huidige status' }, locale)}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {STATS.map((s) => (
            <Stat key={tr(s.label, locale)} label={tr(s.label, locale)} value={tr(s.value, locale)} hint={tr(s.hint, locale)} />
          ))}
        </div>
      </section>

      {/* 2 & 3. Problem + Solution */}
      <section className="grid gap-4 lg:grid-cols-2">
        {[PROBLEM, SOLUTION].map((b) => (
          <Card key={b.h.en} className="rounded-2xl">
            <h2 className="text-lg font-semibold text-brand">{tr(b.h, locale)}</h2>
            <p className="mt-2 text-sm text-slate-600">{tr(b.body, locale)}</p>
          </Card>
        ))}
      </section>

      {/* 3. Five value levels */}
      <section>
        <SectionHead title={tr({ pt: '3. Cinco níveis de valor', en: '3. Five value levels', nl: '3. Vijf waardeniveaus' }, locale)} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {VALUE_LEVELS.map((b, i) => (
            <Card key={b.h.en} className="rounded-2xl">
              <span className="text-xs font-bold text-coral-600">{`0${i + 1}`}</span>
              <h3 className="mt-1 text-sm font-semibold text-slate-900">{tr(b.h, locale)}</h3>
              <p className="mt-1 text-xs text-slate-600">{tr(b.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Market approach */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {tr({ pt: '4. Abordagem ao mercado', en: '4. Market approach', nl: '4. Marktbenadering' }, locale)}
          </h2>
          <Pill tone="amber">{tr(COPY.toValidate, locale)}</Pill>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MARKET_PHASES.map((b) => (
            <Card key={b.h.en} className="rounded-2xl">
              <h3 className="text-sm font-semibold text-brand">{tr(b.h, locale)}</h3>
              <p className="mt-1 text-xs text-slate-600">{tr(b.body, locale)}</p>
              <div className="mt-2"><Pill tone="amber">{tr(COPY.assumption, locale)}</Pill></div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Business model */}
      <section>
        <SectionHead title={tr({ pt: '5. Modelo de negócio', en: '5. Business model', nl: '5. Verdienmodel' }, locale)} />
        <Card className="rounded-2xl">
          <p className="mb-3 text-sm text-slate-500">
            {tr({ pt: 'Modelo híbrido de receitas:', en: 'A hybrid revenue model:', nl: 'Een hybride verdienmodel:' }, locale)}
          </p>
          <ul className="space-y-2">
            {BUSINESS_MODEL.map((item) => (
              <li key={item.en} className="flex gap-2 text-sm text-slate-700">
                <span aria-hidden className="mt-0.5 text-coral-600">•</span>
                <span>{tr(item, locale)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 6. Why now / defensibility */}
      <section>
        <SectionHead title={tr({ pt: '6. Porquê agora & defensabilidade', en: '6. Why now & defensibility', nl: '6. Waarom nu & verdedigbaarheid' }, locale)} />
        <div className="grid gap-3 sm:grid-cols-3">
          {DEFENSIBILITY.map((b) => (
            <Card key={b.h.en} className="rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-900">{tr(b.h, locale)}</h3>
              <p className="mt-1 text-xs text-slate-600">{tr(b.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 7. Traction plan / MVP */}
      <section>
        <SectionHead title={tr({ pt: '7. Plano de tração & MVP', en: '7. Traction plan & MVP', nl: '7. Tractieplan & MVP' }, locale)} />
        <div className="grid gap-3 sm:grid-cols-2">
          {TRACTION.map((b) => (
            <Card key={b.h.en} className="rounded-2xl">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-brand">{tr(b.h, locale)}</h3>
                <Pill tone="emerald">MVP</Pill>
              </div>
              <p className="mt-1 text-sm text-slate-600">{tr(b.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. The ask */}
      <section className="overflow-hidden rounded-3xl bg-hero-ocean px-6 py-10 text-white shadow-card sm:px-10">
        <h2 className="text-2xl font-bold">{tr(ASK.h, locale)}</h2>
        <p className="mt-3 max-w-2xl text-white/90">{tr(ASK.body, locale)}</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-white/10 px-6 py-4">
            <p className="text-xs uppercase tracking-wide text-white/70">
              {tr({ pt: 'Ronda alvo', en: 'Target round', nl: 'Doelronde' }, locale)}
            </p>
            <p className="mt-1 text-3xl font-bold">€ ---</p>
            <p className="mt-1 text-sm text-white/80">
              {tr({ pt: '(indicativo - a definir)', en: '(indicative - to be defined)', nl: '(indicatief - nader te bepalen)' }, locale)}
            </p>
          </div>
          <div className="flex items-center">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">{tr(COPY.toValidate, locale)}</span>
          </div>
        </div>
      </section>

      {/* 9. Closing note */}
      <section>
        <Card className="rounded-2xl border-brand-200 bg-brand-50">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-brand-700">
                {tr({ pt: '9. Documentação completa', en: '9. Full documentation', nl: '9. Volledige documentatie' }, locale)}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-600">{tr(CLOSING, locale)}</p>
            </div>
            <span className="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-brand shadow-card">📄 {tr({ pt: 'A pedido', en: 'On request', nl: 'Op aanvraag' }, locale)}</span>
          </div>
        </Card>
        <p className="mt-4 text-center">
          <Link href={`/${locale}`} className="inline-flex rounded-xl bg-coral-600 px-6 py-3 font-semibold text-white hover:bg-coral-700">
            {t(locale, 'common.viewAll')}
          </Link>
        </p>
      </section>

      {/* Footer disclaimer */}
      <p className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">{tr(COPY.disclaimer, locale)}</p>
    </div>
  );
}
