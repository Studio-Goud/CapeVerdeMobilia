import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/anunciar');
}
import Link from 'next/link';
import { tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card, Pill, SectionHead } from '@/components/ui';

const INDICATIVE: TL = {
  pt: 'indicativo · a definir',
  en: 'indicative · to be set',
  nl: 'indicatief · nog te bepalen',
};

/* --- The tariff ladder: free base, then trust, then paid visibility --- */
interface Rung {
  step: string;
  name: TL;
  what: TL;
  price: TL;
  tone: 'slate' | 'brand' | 'amber' | 'coral';
  free?: boolean;
}

const LADDER: Rung[] = [
  {
    step: '0',
    name: { pt: 'Anúncio', en: 'Listing', nl: 'Vermelding' },
    what: {
      pt: 'Qualquer residente ou empresa publica um imóvel, terreno, serviço ou material. Aparece nas pesquisas e no mapa.',
      en: 'Any resident or business lists a property, plot, service or material. It appears in search and on the map.',
      nl: 'Elke inwoner of bedrijf plaatst een woning, kavel, dienst of materiaal. Het verschijnt in de zoekresultaten en op de kaart.',
    },
    price: { pt: 'Grátis, para sempre', en: 'Free, forever', nl: 'Gratis, voor altijd' },
    tone: 'slate',
    free: true,
  },
  {
    step: '1',
    name: { pt: 'Perfil reclamado', en: 'Claimed profile', nl: 'Geclaimd profiel' },
    what: {
      pt: 'Assume o seu perfil e acrescenta logótipo, fotos, horários e contacto. Ganha o formulário de contacto direto.',
      en: 'Claim your profile and add a logo, photos, opening hours and contact. You unlock the direct contact form.',
      nl: 'Neem je profiel over en voeg logo, foto’s, openingstijden en contact toe. Je krijgt het directe contactformulier.',
    },
    price: { pt: 'Grátis', en: 'Free', nl: 'Gratis' },
    tone: 'slate',
    free: true,
  },
  {
    step: '2',
    name: { pt: 'Verificado', en: 'Verified', nl: 'Geverifieerd' },
    what: {
      pt: 'Verificação local (NIF, registo comercial, identidade e morada) com controlo humano. Recebe o selo Verificado e o acesso à publicidade.',
      en: 'Local verification (tax number, business registry, identity and address) with human review. You earn the Verified badge and access to advertising.',
      nl: 'Lokale verificatie (NIF, handelsregister, identiteit en adres) met menselijke controle. Je krijgt het label Geverifieerd en toegang tot adverteren.',
    },
    price: { pt: '≈ 250 CVE (uma vez)', en: '≈ 250 CVE (one-off)', nl: '≈ 250 CVE (eenmalig)' },
    tone: 'brand',
  },
  {
    step: '3',
    name: { pt: 'Destaque · publicidade', en: 'Featured · advertising', nl: 'Destaque · adverteren' },
    what: {
      pt: 'O seu anúncio aparece na página inicial e no topo das pesquisas, com cartão maior, mais fotos e o selo Destaque. Sempre rotulado como patrocinado.',
      en: 'Your listing appears on the homepage and at the top of search, with a larger card, more photos and the Featured badge. Always labelled as sponsored.',
      nl: 'Je advertentie verschijnt op de homepage en bovenaan de zoekresultaten, met een grotere kaart, meer foto’s en het Destaque-label. Altijd gelabeld als gesponsord.',
    },
    price: { pt: '≈ 800 CVE / semana · ou ≈ 2.500 CVE / mês', en: '≈ 800 CVE / week · or ≈ 2,500 CVE / month', nl: '≈ 800 CVE / week · of ≈ 2.500 CVE / maand' },
    tone: 'amber',
  },
  {
    step: '4',
    name: { pt: 'Serviço ligado · instalação', en: 'Linked service · installation', nl: 'Gekoppelde dienst · installatie' },
    what: {
      pt: 'Quem contacta um vendedor (por ex. de ar condicionado) pode pedir também um instalador certificado perto de si. Um lugar patrocinado, com selo e com consentimento do cliente.',
      en: 'A buyer who contacts a seller (for example of air conditioning) can also ask for a certified installer nearby. A sponsored slot, badged and with the buyer’s consent.',
      nl: 'Wie contact zoekt met een verkoper (bijv. van airco) kan ook een gecertificeerde installateur in de buurt vragen. Een gesponsorde plek, met label en met toestemming van de klant.',
    },
    price: { pt: '≈ 2.500 CVE / mês por ilha', en: '≈ 2,500 CVE / month per island', nl: '≈ 2.500 CVE / maand per eiland' },
    tone: 'coral',
  },
];

/* --- What advertising actually gets you --- */
interface Benefit { icon: string; title: TL; body: TL }
const BENEFITS: Benefit[] = [
  {
    icon: '★',
    title: { pt: 'Página inicial', en: 'Homepage', nl: 'Homepage' },
    body: {
      pt: 'Aparece na secção “Negócios em destaque” da página inicial. Não paga para ficar invisível.',
      en: 'You appear in the “Featured businesses” section on the homepage. You do not pay to stay invisible.',
      nl: 'Je verschijnt in de sectie “Uitgelichte bedrijven” op de homepage. Je betaalt niet om onzichtbaar te blijven.',
    },
  },
  {
    icon: '↑',
    title: { pt: 'Topo das pesquisas', en: 'Top of search', nl: 'Bovenaan het zoeken' },
    body: {
      pt: 'Um lugar reservado no topo dos resultados relevantes, com cartão maior e mais fotos.',
      en: 'A reserved slot at the top of the relevant results, with a larger card and more photos.',
      nl: 'Een gereserveerde plek bovenaan de relevante resultaten, met een grotere kaart en meer foto’s.',
    },
  },
  {
    icon: '✓',
    title: { pt: 'Selo de confiança', en: 'Trust badge', nl: 'Vertrouwenslabel' },
    body: {
      pt: 'O selo Verificado ao lado do seu nome. Em Cabo Verde, a confiança é o que faz o cliente ligar.',
      en: 'The Verified badge next to your name. In Cabo Verde, trust is what makes the customer call.',
      nl: 'Het label Geverifieerd naast je naam. In Kaapverdië is vertrouwen wat de klant doet bellen.',
    },
  },
  {
    icon: '☑',
    title: { pt: 'Caixa de entrada', en: 'Managed inbox', nl: 'Beheerde inbox' },
    body: {
      pt: 'Chat no próprio site, com etiqueta “Responde rápido” e histórico de orçamentos, para membros verificados.',
      en: 'On-site chat, a “Responds fast” tag and quote history, for verified members.',
      nl: 'Chat op de site zelf, met een “Reageert snel”-label en offertegeschiedenis, voor geverifieerde leden.',
    },
  },
  {
    icon: '⤳',
    title: { pt: 'Serviço ligado', en: 'Linked service', nl: 'Gekoppelde dienst' },
    body: {
      pt: 'Seja o instalador sugerido a quem compra o equipamento. Complementar, não concorrente.',
      en: 'Be the installer suggested to whoever buys the equipment. Complementary, not competing.',
      nl: 'Wees de installateur die wordt voorgesteld aan wie de apparatuur koopt. Aanvullend, geen concurrent.',
    },
  },
  {
    icon: '▤',
    title: { pt: 'Estatísticas', en: 'Analytics', nl: 'Statistieken' },
    body: {
      pt: 'Vê quantas pessoas viram e contactaram. Números honestos, sem promessas inventadas.',
      en: 'See how many people viewed and contacted you. Honest numbers, no invented promises.',
      nl: 'Zie hoeveel mensen je zagen en contact opnamen. Eerlijke cijfers, geen verzonnen beloften.',
    },
  },
];

const COPY = {
  title: { pt: 'Anunciar no Djarvista', en: 'Advertise on Djarvista', nl: 'Adverteren op Djarvista' },
  intro: {
    pt: 'A marketplace é e continua gratuita para procurar, publicar e contactar. Anunciar é opcional: paga por semana ou por mês e fica logo visível na página inicial e no topo das pesquisas. Aqui explicamos exatamente o que ganha, os passos e os preços indicativos.',
    en: 'The marketplace is and stays free to search, list and contact. Advertising is optional: you pay per week or per month and become visible right away on the homepage and at the top of search. Here we explain exactly what you get, the steps and the indicative prices.',
    nl: 'De marktplaats is en blijft gratis om te zoeken, plaatsen en contact op te nemen. Adverteren is optioneel: je betaalt per week of per maand en bent meteen zichtbaar op de homepage en bovenaan de zoekresultaten. Hier leggen we precies uit wat je krijgt, de stappen en de indicatieve prijzen.',
  },
  freeTitle: { pt: 'A marketplace é gratuita', en: 'The marketplace is free', nl: 'De marktplaats is gratis' },
  freeBody: {
    pt: 'Procurar, publicar e contactar não custa nada e nunca vai custar. Só cobramos a visibilidade extra, nunca o acesso.',
    en: 'Searching, listing and contacting cost nothing and never will. We only charge for extra visibility, never for access.',
    nl: 'Zoeken, plaatsen en contact opnemen kost niets en zal dat nooit doen. We rekenen alleen voor extra zichtbaarheid, nooit voor toegang.',
  },
  ladderHead: { pt: 'Do grátis ao destaque, passo a passo', en: 'From free to featured, step by step', nl: 'Van gratis tot uitgelicht, stap voor stap' },
  ladderIntro: {
    pt: 'Cada degrau acrescenta valor sem nunca travar quem só quer publicar. A verificação é a porta de entrada para a publicidade: protege quem procura de anúncios pagos mas falsos.',
    en: 'Each rung adds value without ever blocking someone who just wants to list. Verification is the gateway to advertising: it protects searchers from paid but fake ads.',
    nl: 'Elke trede voegt waarde toe zonder ooit iemand te blokkeren die enkel wil plaatsen. Verificatie is de toegangspoort tot adverteren: het beschermt zoekers tegen betaalde maar nep-advertenties.',
  },
  benefitsHead: { pt: 'O que ganha ao anunciar', en: 'What you get by advertising', nl: 'Wat je krijgt door te adverteren' },
  gateTitle: { pt: 'Verificar primeiro, anunciar depois', en: 'Verify first, advertise next', nl: 'Eerst verifiëren, dan adverteren' },
  gateBody: {
    pt: 'Publicar é livre para todos. Para pagar por visibilidade, é preciso estar verificado. Assim, tudo o que aparece em destaque na página inicial é um negócio real e conferido, e a verificação passa a valer a pena.',
    en: 'Listing is open to everyone. To pay for visibility, you need to be verified. That way everything featured on the homepage is a real, checked business, and verification becomes worth it.',
    nl: 'Plaatsen staat open voor iedereen. Om voor zichtbaarheid te betalen, moet je geverifieerd zijn. Zo is alles wat uitgelicht op de homepage staat een echt, gecontroleerd bedrijf, en wordt verifiëren de moeite waard.',
  },
  chatTitle: { pt: 'Comunicação: acessível para todos, melhor para os verificados', en: 'Communication: open to all, better for the verified', nl: 'Communicatie: toegankelijk voor iedereen, beter voor geverifieerden' },
  chatUniversal: {
    pt: 'Qualquer negócio pode ser contactado (botão de contacto, WhatsApp ou telefone). Nunca escondemos o contacto atrás de um pagamento: isso mataria o que torna a plataforma útil.',
    en: 'Any business can be contacted (contact button, WhatsApp or phone). We never hide contact behind a payment: that would kill what makes the platform useful.',
    nl: 'Elk bedrijf kan gecontacteerd worden (contactknop, WhatsApp of telefoon). We verbergen contact nooit achter een betaling: dat zou kapotmaken wat het platform nuttig maakt.',
  },
  chatVerified: {
    pt: 'Os membros verificados recebem, além disso, uma caixa de entrada no site, a etiqueta “Responde rápido” e o histórico de orçamentos. A verificação dá melhores ferramentas e mais credibilidade, não o acesso.',
    en: 'Verified members additionally get an on-site inbox, the “Responds fast” tag and quote history. Verification gives better tools and more credibility, not access.',
    nl: 'Geverifieerde leden krijgen daarbovenop een inbox op de site, het “Reageert snel”-label en offertegeschiedenis. Verificatie geeft betere gereedschappen en meer geloofwaardigheid, niet de toegang.',
  },
  crossTitle: { pt: 'Serviço ligado: “Precisa de instalação?”', en: 'Linked service: “Need it installed?”', nl: 'Gekoppelde dienst: “Laten installeren?”' },
  crossBody: {
    pt: 'Quem contacta um vendedor de ar condicionado pode ver, se quiser, instaladores certificados perto de si. É a versão “compra e instalação” do comércio, feita com cuidado.',
    en: 'A buyer who contacts an air-conditioning seller can, if they wish, see certified installers nearby. It is the “buy and install” pattern of retail, done with care.',
    nl: 'Wie contact zoekt met een airco-verkoper kan, als die dat wil, gecertificeerde installateurs in de buurt zien. Het is het “kopen en installeren”-patroon uit de retail, zorgvuldig gedaan.',
  },
  guardHead: { pt: 'As regras que protegem quem procura', en: 'The rules that protect searchers', nl: 'De regels die zoekers beschermen' },
  guards: [
    { pt: 'É o cliente que decide ver ou pedir. Nunca passamos os seus dados sem consentimento.', en: 'The customer chooses to view or ask. We never pass on their details without consent.', nl: 'De klant kiest om te bekijken of te vragen. We geven zijn gegevens nooit door zonder toestemming.' },
    { pt: 'No máximo 1 a 3 instaladores, da mesma ilha e categoria. Nunca uma lista de leilão.', en: 'At most 1 to 3 installers, same island and category. Never an auction list.', nl: 'Hoogstens 1 tot 3 installateurs, zelfde eiland en categorie. Nooit een veilinglijst.' },
    { pt: 'Sempre com a etiqueta “Patrocinado” e o selo Verificado. Nunca disfarçado de recomendação neutra.', en: 'Always with the “Sponsored” tag and the Verified badge. Never disguised as a neutral recommendation.', nl: 'Altijd met het “Gesponsord”-label en het Geverifieerd-label. Nooit vermomd als neutrale aanbeveling.' },
    { pt: 'Nunca vendemos o mesmo cliente a uma multidão de empresas. Sem spam, sem leads revendidas.', en: 'We never sell the same customer to a crowd of firms. No spam, no resold leads.', nl: 'We verkopen dezelfde klant nooit aan een menigte bedrijven. Geen spam, geen doorverkochte leads.' },
  ] as TL[],
  moreHead: { pt: 'Também para imóveis, terrenos e pedidos', en: 'Also for property, land and job requests', nl: 'Ook voor vastgoed, grond en opdrachten' },
  moreProperty: {
    pt: 'Imóveis e terrenos: os particulares anunciam sempre grátis. O Destaque por semana ou mês dá o mesmo lugar na página inicial e no topo. As poucas agências podem ter um plano simples e fixo.',
    en: 'Property and land: private sellers always list free. The Featured upgrade per week or month gives the same homepage and top-of-search spot. The few agencies can have a simple flat plan.',
    nl: 'Vastgoed en grond: particulieren plaatsen altijd gratis. De Destaque per week of maand geeft dezelfde plek op de homepage en bovenaan. De paar makelaars kunnen een eenvoudig, vast plan krijgen.',
  },
  morePedidos: {
    pt: 'Pedidos: descreva um trabalho (“preciso de instalação de ar condicionado em Mindelo”) e profissionais verificados respondem. O profissional só paga quando é mesmo escolhido, não a cada contacto.',
    en: 'Job requests: describe a job (“I need air-conditioning installed in Mindelo”) and verified professionals respond. The professional only pays when actually shortlisted, not on every contact.',
    nl: 'Opdrachten: beschrijf een klus (“ik heb airco-installatie nodig in Mindelo”) en geverifieerde vakmensen reageren. De vakman betaalt pas als die echt gekozen wordt, niet bij elk contact.',
  },
  disclaimerTitle: { pt: 'Valores indicativos', en: 'Indicative figures', nl: 'Indicatieve bedragen' },
  disclaimerBody: {
    pt: 'Todos os preços em CVE são indicativos e ajustados ao poder de compra local. Serão finalizados antes do lançamento. A base gratuita nunca muda. A informação oficial é sempre distinta da publicidade.',
    en: 'All prices in CVE are indicative and adjusted to local purchasing power. They will be finalised before launch. The free base never changes. Official information is always kept distinct from advertising.',
    nl: 'Alle prijzen in CVE zijn indicatief en aangepast aan de lokale koopkracht. Ze worden vóór de lancering definitief gemaakt. De gratis basis verandert nooit. Officiële informatie blijft altijd los van reclame.',
  },
  ctaVerify: { pt: 'Verificar o meu negócio', en: 'Verify my business', nl: 'Mijn bedrijf verifiëren' },
  ctaPricing: { pt: 'Ver todos os preços', en: 'See all prices', nl: 'Alle prijzen bekijken' },
  gatewayPill: { pt: 'Porta de entrada', en: 'Gateway', nl: 'Toegangspoort' },
} satisfies Record<string, unknown>;

export default function AdvertisePage({ params }: { params: { locale: Locale } }): JSX.Element {
  const { locale } = params;

  return (
    <div className="mx-auto max-w-5xl">
      <PageTitle title={tr(COPY.title as TL, locale)} intro={tr(COPY.intro as TL, locale)} />

      {/* Free-marketplace band */}
      <section className="mb-8 rounded-2xl bg-brand-50 p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-brand sm:text-xl">{tr(COPY.freeTitle as TL, locale)}</h2>
              <Pill tone="brand">{tr({ pt: 'Grátis', en: 'Free', nl: 'Gratis' }, locale)}</Pill>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-slate-700">{tr(COPY.freeBody as TL, locale)}</p>
          </div>
          <Link
            href={`/${locale}/registar`}
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-coral-600 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-coral-700"
          >
            {tr({ pt: 'Registar gratuitamente', en: 'Register for free', nl: 'Gratis registreren' }, locale)}
          </Link>
        </div>
      </section>

      {/* The tariff ladder */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.ladderHead as TL, locale)} />
        <p className="mb-4 max-w-3xl text-sm text-slate-600">{tr(COPY.ladderIntro as TL, locale)}</p>
        <ol className="space-y-3">
          {LADDER.map((rung) => (
            <li key={rung.step}>
              <Card className={rung.tone === 'brand' ? 'rounded-2xl border-2 border-brand ring-1 ring-brand/20' : 'rounded-2xl'}>
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden
                    className={
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ' +
                      (rung.free ? 'bg-slate-100 text-slate-500' : 'bg-brand text-white')
                    }
                  >
                    {rung.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{tr(rung.name, locale)}</h3>
                      {rung.tone === 'brand' && <Pill tone="brand">{tr(COPY.gatewayPill as TL, locale)}</Pill>}
                      {!rung.free && <Pill tone="amber">{tr(INDICATIVE, locale)}</Pill>}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{tr(rung.what, locale)}</p>
                    <p className={'mt-2 text-sm font-semibold ' + (rung.free ? 'text-emerald-700' : 'text-brand')}>
                      {tr(rung.price, locale)}
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Benefits grid */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.benefitsHead as TL, locale)} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <Card key={tr(b.title, 'pt')} className="rounded-2xl">
              <div className="flex items-center gap-2">
                <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand">{b.icon}</span>
                <h3 className="text-sm font-semibold text-slate-900">{tr(b.title, locale)}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">{tr(b.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Verification gateway */}
      <section className="mb-10 rounded-2xl border-2 border-brand/30 bg-white p-5 shadow-card sm:p-6">
        <div className="flex items-center gap-2">
          <Pill tone="brand">{tr(COPY.gatewayPill as TL, locale)}</Pill>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">{tr(COPY.gateTitle as TL, locale)}</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.gateBody as TL, locale)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/${locale}/verificacao`} className="inline-flex items-center rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
            {tr(COPY.ctaVerify as TL, locale)}
          </Link>
          <Link href={`/${locale}/precos`} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
            {tr(COPY.ctaPricing as TL, locale)}
          </Link>
          <Link href={`/${locale}/como-pagar`} className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
            {tr({ pt: 'Como pagar', en: 'How to pay', nl: 'Hoe betalen' }, locale)}
          </Link>
        </div>
      </section>

      {/* Communication / chat */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.chatTitle as TL, locale)} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl">
            <div className="flex items-center gap-2">
              <span aria-hidden className="text-brand">●</span>
              <h3 className="text-sm font-semibold text-slate-900">{tr({ pt: 'Para todos', en: 'For everyone', nl: 'Voor iedereen' }, locale)}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{tr(COPY.chatUniversal as TL, locale)}</p>
          </Card>
          <Card className="rounded-2xl border-2 border-brand/20">
            <div className="flex items-center gap-2">
              <Pill tone="brand">{tr({ pt: 'Verificado', en: 'Verified', nl: 'Geverifieerd' }, locale)}</Pill>
              <h3 className="text-sm font-semibold text-slate-900">{tr({ pt: 'Ferramentas extra', en: 'Extra tools', nl: 'Extra gereedschap' }, locale)}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{tr(COPY.chatVerified as TL, locale)}</p>
          </Card>
        </div>
      </section>

      {/* Cross-referral / linked service */}
      <section className="mb-10 rounded-2xl bg-sand-50 p-5 shadow-card sm:p-6">
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">{tr(COPY.crossTitle as TL, locale)}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.crossBody as TL, locale)}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{tr(COPY.guardHead as TL, locale)}</p>
        <ul className="mt-2 space-y-2">
          {(COPY.guards as TL[]).map((g) => (
            <li key={tr(g, 'pt')} className="flex gap-2 text-sm text-slate-700">
              <span aria-hidden className="mt-0.5 text-brand">✓</span>
              <span>{tr(g, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Property + pedidos */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.moreHead as TL, locale)} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="rounded-2xl">
            <h3 className="text-sm font-semibold text-slate-900">{tr({ pt: 'Imóveis & terrenos', en: 'Property & land', nl: 'Vastgoed & grond' }, locale)}</h3>
            <p className="mt-2 text-sm text-slate-600">{tr(COPY.moreProperty as TL, locale)}</p>
            <Link href={`/${locale}/imoveis`} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              {tr({ pt: 'Ver imóveis', en: 'View property', nl: 'Bekijk vastgoed' }, locale)}
            </Link>
          </Card>
          <Card className="rounded-2xl">
            <h3 className="text-sm font-semibold text-slate-900">{tr({ pt: 'Pedidos de orçamento', en: 'Job requests', nl: 'Opdrachten' }, locale)}</h3>
            <p className="mt-2 text-sm text-slate-600">{tr(COPY.morePedidos as TL, locale)}</p>
            <Link href={`/${locale}/pedidos/novo`} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
              {tr({ pt: 'Publicar um pedido', en: 'Post a job', nl: 'Opdracht plaatsen' }, locale)}
            </Link>
          </Card>
        </div>
      </section>

      {/* Indicative disclaimer */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-6">
        <div className="flex items-center gap-2">
          <Pill tone="amber">{tr(INDICATIVE, locale)}</Pill>
          <h2 className="text-base font-bold text-slate-900">{tr(COPY.disclaimerTitle as TL, locale)}</h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.disclaimerBody as TL, locale)}</p>
      </section>
    </div>
  );
}
