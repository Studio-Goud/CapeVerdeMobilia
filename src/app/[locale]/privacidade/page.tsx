import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card, Pill } from '@/components/ui';

// Djarvista — Privacy & Cookie Policy / Política de Privacidade e Cookies.
// Server component, fully trilingual (PT primary / EN / NL). Concept draft:
// the content describes the app's real data practices but is pending legal review.

const TITLE: TL = {
  pt: 'Política de Privacidade e Cookies',
  en: 'Privacy & Cookie Policy',
  nl: 'Privacy- en cookiebeleid',
};

const INTRO: TL = {
  pt: 'Esta política explica que dados pessoais a Djarvista recolhe, para que os utiliza, com quem os partilha e que direitos tem sobre eles. Aplica-se ao serviço disponível em djarvista.com.',
  en: 'This policy explains what personal data Djarvista collects, why we use it, who we share it with and what rights you have. It applies to the service available at djarvista.com.',
  nl: 'Dit beleid legt uit welke persoonsgegevens Djarvista verzamelt, waarvoor we ze gebruiken, met wie we ze delen en welke rechten je hebt. Het geldt voor de dienst op djarvista.com.',
};

const META_DESC: TL = {
  pt: 'Como a Djarvista recolhe, usa e protege os seus dados pessoais — conta, anúncios, mensagens e verificação de identidade.',
  en: 'How Djarvista collects, uses and protects your personal data — account, listings, messages and identity verification.',
  nl: 'Hoe Djarvista je persoonsgegevens verzamelt, gebruikt en beschermt — account, advertenties, berichten en identiteitsverificatie.',
};

const CONCEPT_BANNER: TL = {
  pt: 'Rascunho — verificação jurídica necessária',
  en: 'Draft — pending legal review',
  nl: 'CONCEPT — juridische verificatie vereist',
};

const CONCEPT_SUB: TL = {
  pt: 'Este é um documento preliminar. O conteúdo ainda não foi verificado por um jurista e não constitui aconselhamento jurídico.',
  en: 'This is a preliminary document. Its content has not yet been reviewed by a lawyer and does not constitute legal advice.',
  nl: 'Dit is een voorlopig document. De inhoud is nog niet door een jurist gecontroleerd en vormt geen juridisch advies.',
};

const FLAG_CONFIRM: TL = { pt: 'a confirmar', en: 'to confirm', nl: 'te bevestigen' };
const FLAG_TBD: TL = { pt: 'a definir', en: 'to be set', nl: 'nader te bepalen' };

// --- 1. Controller & contact ------------------------------------------------
const S1_TITLE: TL = {
  pt: 'Responsável pelo tratamento e contacto',
  en: 'Controller and contact',
  nl: 'Verwerkingsverantwoordelijke en contact',
};
const S1_BODY: TL = {
  pt: 'O responsável pelo tratamento dos seus dados pessoais é a Djarvista, que opera a plataforma djarvista.com.',
  en: 'The controller of your personal data is Djarvista, operator of the djarvista.com platform.',
  nl: 'De verwerkingsverantwoordelijke voor je persoonsgegevens is Djarvista, exploitant van het platform djarvista.com.',
};
const LBL_ENTITY: TL = { pt: 'Entidade legal', en: 'Legal entity', nl: 'Rechtspersoon' };
const LBL_ADDRESS: TL = { pt: 'Morada', en: 'Address', nl: 'Adres' };
const LBL_PRIVACY_CONTACT: TL = { pt: 'Contacto para privacidade', en: 'Privacy contact', nl: 'Privacycontact' };
const LBL_GENERAL_CONTACT: TL = { pt: 'Contacto geral', en: 'General contact', nl: 'Algemeen contact' };
const PH_ENTITY: TL = {
  pt: '[Djarvista — forma jurídica/registo a preencher]',
  en: '[Djarvista — legal form/registration to be completed]',
  nl: '[Djarvista — rechtsvorm/registratie in te vullen]',
};
const PH_ADDRESS: TL = {
  pt: '[endereço a preencher]',
  en: '[address to be completed]',
  nl: '[adres]',
};

// --- 2. What data we collect -----------------------------------------------
const S2_TITLE: TL = {
  pt: 'Que dados recolhemos',
  en: 'What data we collect',
  nl: 'Welke gegevens we verzamelen',
};
const S2_INTRO: TL = {
  pt: 'Recolhemos apenas os dados necessários para operar o mercado. Consoante a forma como usa a Djarvista, podemos tratar:',
  en: 'We only collect the data needed to run the marketplace. Depending on how you use Djarvista, we may process:',
  nl: 'We verzamelen alleen de gegevens die nodig zijn om de marktplaats te laten werken. Afhankelijk van hoe je Djarvista gebruikt, verwerken we mogelijk:',
};
const DATA_ITEMS: { label: TL; body: TL }[] = [
  {
    label: { pt: 'Conta', en: 'Account', nl: 'Account' },
    body: {
      pt: 'Nome, email, tipo de conta (particular ou empresarial) e, opcionalmente, o nome da empresa.',
      en: 'Name, email, account role (private or business) and, optionally, a company name.',
      nl: 'Naam, e-mail, accounttype (particulier of zakelijk) en, optioneel, een bedrijfsnaam.',
    },
  },
  {
    label: { pt: 'Anúncios', en: 'Listings', nl: 'Advertenties' },
    body: {
      pt: 'Título e descrição, preço, ilha e concelho, e as fotos que carrega (guardadas num bucket público, visíveis para todos).',
      en: 'Title and description, price, island and municipality, and the photos you upload (stored in a public bucket, visible to everyone).',
      nl: 'Titel en beschrijving, prijs, eiland en gemeente, en de foto’s die je uploadt (opgeslagen in een openbare bucket, zichtbaar voor iedereen).',
    },
  },
  {
    label: { pt: 'Contactos e pedidos', en: 'Contacts and leads', nl: 'Contacten en aanvragen' },
    body: {
      pt: 'Nome, email, telefone e mensagem quando contacta um anúncio ou um profissional.',
      en: 'Name, email, phone and message when you contact a listing or a professional.',
      nl: 'Naam, e-mail, telefoon en bericht wanneer je contact opneemt met een advertentie of een professional.',
    },
  },
  {
    label: {
      pt: 'Pedidos de arrendamento e mensagens',
      en: 'Rental requests and messages',
      nl: 'Huuraanvragen en berichten',
    },
    body: {
      pt: 'Os pedidos de arrendamento e as mensagens trocadas entre inquilino e senhorio.',
      en: 'The rental requests you make and the messages exchanged between tenant and landlord.',
      nl: 'De huuraanvragen die je doet en de berichten die tussen huurder en verhuurder worden uitgewisseld.',
    },
  },
  {
    label: { pt: 'Favoritos', en: 'Favorites', nl: 'Favorieten' },
    body: {
      pt: 'Os anúncios e itens que guarda.',
      en: 'The listings and items you save.',
      nl: 'De advertenties en items die je bewaart.',
    },
  },
  {
    label: {
      pt: 'Verificação de identidade',
      en: 'Identity verification',
      nl: 'Identiteitsverificatie',
    },
    body: {
      pt: 'Uma imagem do documento de identificação ou passaporte e uma selfie, guardadas num bucket privado e analisadas por pessoal autorizado para atribuir um nível de confiança. São dados sensíveis — ver a secção 5.',
      en: 'An image of your ID or passport and a selfie, stored in a private bucket and reviewed by authorized staff to assign a trust level. This is sensitive data — see section 5.',
      nl: 'Een afbeelding van je identiteitsbewijs of paspoort en een selfie, opgeslagen in een privé-bucket en beoordeeld door bevoegd personeel om een vertrouwensniveau toe te kennen. Dit zijn gevoelige gegevens — zie sectie 5.',
    },
  },
];

// --- 3. Purposes ------------------------------------------------------------
const S3_TITLE: TL = {
  pt: 'Para que usamos os dados (finalidades)',
  en: 'Why we use your data (purposes)',
  nl: 'Waarvoor we gegevens gebruiken (doeleinden)',
};
const S3_LIST: TL = {
  pt: '• Operar e manter o mercado (imóveis, terrenos, serviços e profissionais).\n• Ligar as partes — por exemplo, colocar em contacto quem procura e quem anuncia.\n• Permitir a verificação e os níveis de confiança.\n• Garantir a segurança e prevenir fraude e abuso.\n• Melhorar o produto e a experiência de utilização.',
  en: '• Operate and maintain the marketplace (property, land, services and professionals).\n• Connect the parties — for example, putting seekers and advertisers in touch.\n• Enable verification and trust levels.\n• Ensure security and prevent fraud and abuse.\n• Improve the product and the user experience.',
  nl: '• De marktplaats laten werken en onderhouden (vastgoed, grond, diensten en professionals).\n• Partijen met elkaar verbinden — bijvoorbeeld zoekers en adverteerders in contact brengen.\n• Verificatie en vertrouwensniveaus mogelijk maken.\n• Beveiliging waarborgen en fraude en misbruik voorkomen.\n• Het product en de gebruikerservaring verbeteren.',
};

// --- 4. Legal basis ---------------------------------------------------------
const S4_TITLE: TL = { pt: 'Fundamento jurídico', en: 'Legal basis', nl: 'Rechtsgrond' };
const S4_INTRO: TL = {
  pt: 'O enquadramento aplicável é a legislação de proteção de dados de Cabo Verde (a confirmar). Consoante a situação, o tratamento pode basear-se em:',
  en: 'The applicable framework is Cape Verde data-protection law (to confirm). Depending on the situation, processing may rely on:',
  nl: 'Het toepasselijke kader is de gegevensbeschermingswetgeving van Kaapverdië (te bevestigen). Afhankelijk van de situatie kan de verwerking gebaseerd zijn op:',
};
const S4_LIST: TL = {
  pt: '• Execução de um contrato ou diligências a seu pedido — para lhe prestar o serviço (conta, anúncios, pedidos).\n• Consentimento — por exemplo, para a verificação de identidade, que é voluntária.\n• Interesse legítimo — segurança da plataforma e prevenção de fraude.\n• Cumprimento de obrigações legais, quando aplicável.',
  en: '• Performance of a contract or steps at your request — to provide the service (account, listings, requests).\n• Consent — for example, for identity verification, which is voluntary.\n• Legitimate interest — platform security and fraud prevention.\n• Compliance with legal obligations, where applicable.',
  nl: '• Uitvoering van een overeenkomst of stappen op jouw verzoek — om de dienst te leveren (account, advertenties, aanvragen).\n• Toestemming — bijvoorbeeld voor identiteitsverificatie, die vrijwillig is.\n• Gerechtvaardigd belang — beveiliging van het platform en fraudepreventie.\n• Nakoming van wettelijke verplichtingen, waar van toepassing.',
};
const S4_NOTE: TL = {
  pt: 'As bases jurídicas exatas estão ainda a ser confirmadas.',
  en: 'The exact legal bases are still being confirmed.',
  nl: 'De precieze rechtsgronden worden nog bevestigd.',
};

// --- 5. Identity verification: special care ---------------------------------
const S5_TITLE: TL = {
  pt: 'Verificação de identidade: cuidado especial',
  en: 'Identity verification: special care',
  nl: 'Identiteitsverificatie: bijzondere zorg',
};
const S5_INTRO: TL = {
  pt: 'Para aceder a níveis de confiança mais elevados, pode submeter voluntariamente uma imagem do documento de identificação ou passaporte e uma selfie. Por serem dados sensíveis, tratamo-los com cuidado acrescido:',
  en: 'To reach higher trust levels, you may voluntarily submit an image of your ID or passport and a selfie. Because this is sensitive data, we handle it with extra care:',
  nl: 'Om hogere vertrouwensniveaus te bereiken, kun je vrijwillig een afbeelding van je identiteitsbewijs of paspoort en een selfie indienen. Omdat dit gevoelige gegevens zijn, gaan we er met extra zorg mee om:',
};
const S5_LIST: TL = {
  pt: '• Finalidade limitada: os documentos servem apenas para confirmar a sua identidade e atribuir um nível de confiança.\n• Armazenamento privado: ficam num bucket privado, nunca públicos nem associados ao anúncio.\n• Acesso restrito: só pessoal autorizado da Djarvista lhes acede.\n• Controlo humano: a análise é feita por pessoas, nunca apenas por inteligência artificial.\n• Não partilhados: não são partilhados com outros utilizadores nem com terceiros.\n• Conservação mínima: são removidos quando deixam de ser necessários para o nível de confiança (prazo a definir).',
  en: '• Purpose limited: the documents are used only to confirm your identity and assign a trust level.\n• Private storage: they are kept in a private bucket, never public and never attached to a listing.\n• Restricted access: only authorized Djarvista staff can access them.\n• Human control: the review is done by people, never by AI alone.\n• Not shared: they are not shared with other users or with third parties.\n• Minimal retention: they are removed once they are no longer needed for the trust level (period to be set).',
  nl: '• Beperkt doel: de documenten worden alleen gebruikt om je identiteit te bevestigen en een vertrouwensniveau toe te kennen.\n• Privé-opslag: ze worden bewaard in een privé-bucket, nooit openbaar en nooit gekoppeld aan een advertentie.\n• Beperkte toegang: alleen bevoegd personeel van Djarvista heeft er toegang toe.\n• Menselijke controle: de beoordeling gebeurt door mensen, nooit alleen door AI.\n• Niet gedeeld: ze worden niet gedeeld met andere gebruikers of met derden.\n• Minimale bewaring: ze worden verwijderd zodra ze niet langer nodig zijn voor het vertrouwensniveau (termijn nader te bepalen).',
};
const S5_NOTE: TL = {
  pt: 'A verificação é voluntária. Se não a fizer, mantém um nível de confiança inferior, mas pode continuar a usar a plataforma.',
  en: 'Verification is voluntary. If you do not complete it, you keep a lower trust level but can still use the platform.',
  nl: 'Verificatie is vrijwillig. Als je die niet voltooit, houd je een lager vertrouwensniveau, maar je kunt het platform blijven gebruiken.',
};

// --- 6. Sharing & processors ------------------------------------------------
const S6_TITLE: TL = {
  pt: 'Partilha e subcontratantes',
  en: 'Sharing and processors',
  nl: 'Delen en verwerkers',
};
const S6_NOSALE: TL = {
  pt: 'Não vendemos os seus dados pessoais.',
  en: 'We do not sell your personal data.',
  nl: 'We verkopen je persoonsgegevens niet.',
};
const S6_INTRO: TL = {
  pt: 'Partilhamos dados apenas na medida necessária para prestar o serviço — por exemplo, a informação pública de um anúncio fica visível para todos, e uma mensagem que envia é entregue à contraparte. Para operar a plataforma, recorremos a fornecedores de infraestrutura (subcontratantes) que tratam dados por nossa conta e segundo as nossas instruções:',
  en: 'We share data only as far as needed to provide the service — for example, a listing’s public information is visible to everyone, and a message you send is delivered to the counterparty. To run the platform, we use infrastructure providers (processors) that process data on our behalf and under our instructions:',
  nl: 'We delen gegevens alleen voor zover nodig om de dienst te leveren — bijvoorbeeld: de openbare informatie van een advertentie is voor iedereen zichtbaar, en een bericht dat je verstuurt wordt aan de tegenpartij bezorgd. Om het platform te laten draaien, gebruiken we infrastructuuraanbieders (verwerkers) die gegevens namens ons en volgens onze instructies verwerken:',
};
const PROCESSORS: { name: string; body: TL }[] = [
  {
    name: 'Supabase',
    body: {
      pt: 'Base de dados e armazenamento de ficheiros — alojamento de dados de conta, anúncios, fotos e documentos de verificação.',
      en: 'Database and file storage — hosting of account data, listings, photos and verification documents.',
      nl: 'Database en bestandsopslag — hosting van accountgegevens, advertenties, foto’s en verificatiedocumenten.',
    },
  },
  {
    name: 'Resend',
    body: {
      pt: 'Envio de emails transacionais e de marca — por exemplo, confirmação de email e notificações.',
      en: 'Sending transactional and branded emails — for example, email confirmation and notifications.',
      nl: 'Versturen van transactionele en merk-e-mails — bijvoorbeeld e-mailbevestiging en meldingen.',
    },
  },
  {
    name: 'Vercel',
    body: {
      pt: 'Alojamento da aplicação e analítica agregada e respeitadora da privacidade.',
      en: 'Application hosting and privacy-friendly, aggregate analytics.',
      nl: 'Hosting van de applicatie en privacyvriendelijke, geaggregeerde analytics.',
    },
  },
];
const S6_NOTE: TL = {
  pt: 'Estes fornecedores podem processar dados fora de Cabo Verde, na sua própria infraestrutura.',
  en: 'These providers may process data outside Cabo Verde, on their own infrastructure.',
  nl: 'Deze aanbieders kunnen gegevens buiten Kaapverdië verwerken, op hun eigen infrastructuur.',
};

// --- 7. Cookies & analytics -------------------------------------------------
const S7_TITLE: TL = { pt: 'Cookies e analítica', en: 'Cookies and analytics', nl: 'Cookies en analytics' };
const S7_COOKIES: TL = {
  pt: 'Utilizamos apenas cookies essenciais, necessários para iniciar sessão e manter a sua sessão ativa (autenticação). Não usamos cookies de publicidade nem de rastreio entre sites.',
  en: 'We use only essential cookies, needed to log in and keep your session active (authentication). We do not use advertising or cross-site tracking cookies.',
  nl: 'We gebruiken alleen essentiële cookies, nodig om in te loggen en je sessie actief te houden (authenticatie). We gebruiken geen advertentie- of cross-site trackingcookies.',
};
const S7_ANALYTICS: TL = {
  pt: 'Para estatísticas de utilização usamos o Vercel Analytics, uma solução agregada e respeitadora da privacidade: não usa cookies de rastreio nem cria perfis publicitários.',
  en: 'For usage statistics we use Vercel Analytics, a privacy-friendly, aggregate solution: it does not use tracking cookies and does not build advertising profiles.',
  nl: 'Voor gebruiksstatistieken gebruiken we Vercel Analytics, een privacyvriendelijke, geaggregeerde oplossing: die gebruikt geen trackingcookies en bouwt geen advertentieprofielen op.',
};

// --- 8. Retention -----------------------------------------------------------
const S8_TITLE: TL = { pt: 'Prazos de conservação', en: 'Retention periods', nl: 'Bewaartermijnen' };
const S8_BODY: TL = {
  pt: 'Conservamos os seus dados enquanto a sua conta ou anúncio estiver ativo. Quando elimina a conta ou um anúncio, os dados associados são removidos ou anonimizados (pormenores a definir). Os documentos de verificação de identidade são conservados apenas o tempo necessário para estabelecer e manter o seu nível de confiança e depois removidos (prazo exato a definir).',
  en: 'We keep your data while your account or listing is active. When you delete your account or a listing, the associated data is removed or anonymized (details to be set). Identity-verification documents are kept only as long as needed to establish and maintain your trust level, and are then removed (exact period to be set).',
  nl: 'We bewaren je gegevens zolang je account of advertentie actief is. Wanneer je je account of een advertentie verwijdert, worden de bijbehorende gegevens verwijderd of geanonimiseerd (details nader te bepalen). Identiteitsverificatiedocumenten worden alleen bewaard zolang dat nodig is om je vertrouwensniveau vast te stellen en te behouden, en worden daarna verwijderd (exacte termijn nader te bepalen).',
};

// --- 9. Your rights ---------------------------------------------------------
const S9_TITLE: TL = { pt: 'Os seus direitos', en: 'Your rights', nl: 'Jouw rechten' };
const S9_LIST: TL = {
  pt: '• Acesso — saber que dados tratamos sobre si.\n• Retificação — corrigir dados incorretos ou desatualizados.\n• Eliminação — pedir a remoção dos seus dados.\n• Oposição — opor-se a determinado tratamento.',
  en: '• Access — know what data we hold about you.\n• Rectification — correct inaccurate or outdated data.\n• Deletion — request removal of your data.\n• Objection — object to certain processing.',
  nl: '• Inzage — weten welke gegevens we over je verwerken.\n• Rectificatie — onjuiste of verouderde gegevens corrigeren.\n• Verwijdering — verwijdering van je gegevens vragen.\n• Bezwaar — bezwaar maken tegen bepaalde verwerking.',
};
const S9_NOTE: TL = {
  pt: 'Para exercer estes direitos, escreva para privacy@djarvista.com. A autoridade de controlo competente deverá ser a Comissão Nacional de Proteção de Dados (CNPD) de Cabo Verde (a confirmar).',
  en: 'To exercise these rights, email privacy@djarvista.com. The competent supervisory authority is expected to be Cape Verde’s Comissão Nacional de Proteção de Dados (CNPD) (to confirm).',
  nl: 'Om deze rechten uit te oefenen, mail je naar privacy@djarvista.com. De bevoegde toezichthouder is naar verwachting de Comissão Nacional de Proteção de Dados (CNPD) van Kaapverdië (te bevestigen).',
};

// --- 10. Security -----------------------------------------------------------
const S10_TITLE: TL = { pt: 'Segurança', en: 'Security', nl: 'Beveiliging' };
const S10_INTRO: TL = {
  pt: 'Adotamos medidas técnicas e organizativas razoáveis para proteger os seus dados:',
  en: 'We take reasonable technical and organizational measures to protect your data:',
  nl: 'We nemen redelijke technische en organisatorische maatregelen om je gegevens te beschermen:',
};
const S10_LIST: TL = {
  pt: '• Controlo de acessos e autenticação com confirmação de email.\n• Separação entre armazenamento público (fotos de anúncios) e privado (documentos de verificação).\n• Transporte encriptado (HTTPS).',
  en: '• Access controls and authentication with email confirmation.\n• Separation between public storage (listing photos) and private storage (verification documents).\n• Encrypted transport (HTTPS).',
  nl: '• Toegangscontrole en authenticatie met e-mailbevestiging.\n• Scheiding tussen openbare opslag (advertentiefoto’s) en privé-opslag (verificatiedocumenten).\n• Versleuteld transport (HTTPS).',
};
const S10_NOTE: TL = {
  pt: 'Nenhum sistema é totalmente seguro. Em caso de violação de dados que o afete, atuaremos de acordo com a lei aplicável.',
  en: 'No system is completely secure. In the event of a data breach that affects you, we will act in accordance with applicable law.',
  nl: 'Geen enkel systeem is volledig veilig. Bij een datalek dat jou treft, handelen we in overeenstemming met de toepasselijke wetgeving.',
};

// --- 11. Changes & last updated ---------------------------------------------
const S11_TITLE: TL = {
  pt: 'Alterações a esta política',
  en: 'Changes to this policy',
  nl: 'Wijzigingen in dit beleid',
};
const S11_BODY: TL = {
  pt: 'Podemos atualizar esta política à medida que a plataforma evolui. Alterações substanciais serão assinaladas nesta página.',
  en: 'We may update this policy as the platform develops. Substantial changes will be flagged on this page.',
  nl: 'We kunnen dit beleid bijwerken naarmate het platform zich ontwikkelt. Substantiële wijzigingen worden op deze pagina aangegeven.',
};
const LAST_UPDATED: TL = {
  pt: 'Última atualização: 21-07-2026',
  en: 'Last updated: 21-07-2026',
  nl: 'Laatst bijgewerkt: 21-07-2026',
};

const FOOTER_NOTE: TL = {
  pt: 'Documento em fase de conceito — sujeito a verificação jurídica. Não constitui aconselhamento jurídico. · Not legal advice · Geen juridisch advies.',
  en: 'Concept-stage document — subject to legal review. Not legal advice. · Não constitui aconselhamento jurídico · Geen juridisch advies.',
  nl: 'Document in conceptfase — onder voorbehoud van juridische controle. Geen juridisch advies. · Not legal advice · Não constitui aconselhamento jurídico.',
};

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const title = tr(TITLE, params.locale);
  const description = tr(META_DESC, params.locale);
  return { title: `${title} · Djarvista`, description, openGraph: { title, description } };
}

/** Numbered policy section: heading (+ optional to-confirm flag) and a Card body. */
function Section({
  n,
  title,
  locale,
  flag,
  children,
}: {
  n: number;
  title: TL;
  locale: Locale;
  flag?: TL;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-slate-900">
          {n}. {tr(title, locale)}
        </h2>
        {flag && <Pill tone="amber">{tr(flag, locale)}</Pill>}
      </div>
      <Card className="space-y-3 text-sm leading-relaxed text-slate-700">{children}</Card>
    </section>
  );
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const list = 'whitespace-pre-line text-slate-700';

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Prominent concept banner */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-900">
          <span aria-hidden>⚠️</span>
          {tr(CONCEPT_BANNER, locale)}
        </p>
        <p className="mt-1 text-sm text-amber-800">{tr(CONCEPT_SUB, locale)}</p>
      </div>

      <PageTitle title={tr(TITLE, locale)} intro={tr(INTRO, locale)} />

      {/* 1. Controller & contact */}
      <Section n={1} title={S1_TITLE} locale={locale}>
        <p>{tr(S1_BODY, locale)}</p>
        <dl className="space-y-1">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-medium text-slate-900">{tr(LBL_ENTITY, locale)}:</dt>
            <dd className="text-slate-500">{tr(PH_ENTITY, locale)}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-medium text-slate-900">{tr(LBL_ADDRESS, locale)}:</dt>
            <dd className="text-slate-500">{tr(PH_ADDRESS, locale)}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-medium text-slate-900">{tr(LBL_PRIVACY_CONTACT, locale)}:</dt>
            <dd>
              <a href="mailto:privacy@djarvista.com" className="font-medium text-brand hover:underline">
                privacy@djarvista.com
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-medium text-slate-900">{tr(LBL_GENERAL_CONTACT, locale)}:</dt>
            <dd>
              <a href="mailto:info@djarvista.com" className="font-medium text-brand hover:underline">
                info@djarvista.com
              </a>
            </dd>
          </div>
        </dl>
      </Section>

      {/* 2. What data we collect */}
      <Section n={2} title={S2_TITLE} locale={locale}>
        <p>{tr(S2_INTRO, locale)}</p>
        <ul className="space-y-2">
          {DATA_ITEMS.map((item) => (
            <li key={item.label.en} className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-900">{tr(item.label, locale)}</span>
              <span>{tr(item.body, locale)}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Purposes */}
      <Section n={3} title={S3_TITLE} locale={locale}>
        <p className={list}>{tr(S3_LIST, locale)}</p>
      </Section>

      {/* 4. Legal basis */}
      <Section n={4} title={S4_TITLE} locale={locale} flag={FLAG_CONFIRM}>
        <p>{tr(S4_INTRO, locale)}</p>
        <p className={list}>{tr(S4_LIST, locale)}</p>
        <p className="text-slate-500">{tr(S4_NOTE, locale)}</p>
      </Section>

      {/* 5. Identity verification: special care */}
      <Section n={5} title={S5_TITLE} locale={locale}>
        <p>{tr(S5_INTRO, locale)}</p>
        <p className={list}>{tr(S5_LIST, locale)}</p>
        <p className="rounded-lg bg-slate-50 p-3 text-slate-600">{tr(S5_NOTE, locale)}</p>
      </Section>

      {/* 6. Sharing & processors */}
      <Section n={6} title={S6_TITLE} locale={locale}>
        <p className="font-semibold text-slate-900">{tr(S6_NOSALE, locale)}</p>
        <p>{tr(S6_INTRO, locale)}</p>
        <ul className="space-y-2">
          {PROCESSORS.map((p) => (
            <li key={p.name} className="flex flex-col gap-0.5">
              <span className="font-medium text-slate-900">{p.name}</span>
              <span>{tr(p.body, locale)}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-500">{tr(S6_NOTE, locale)}</p>
      </Section>

      {/* 7. Cookies & analytics */}
      <Section n={7} title={S7_TITLE} locale={locale}>
        <p>{tr(S7_COOKIES, locale)}</p>
        <p>{tr(S7_ANALYTICS, locale)}</p>
      </Section>

      {/* 8. Retention */}
      <Section n={8} title={S8_TITLE} locale={locale} flag={FLAG_TBD}>
        <p>{tr(S8_BODY, locale)}</p>
      </Section>

      {/* 9. Your rights */}
      <Section n={9} title={S9_TITLE} locale={locale}>
        <p className={list}>{tr(S9_LIST, locale)}</p>
        <p>{tr(S9_NOTE, locale)}</p>
      </Section>

      {/* 10. Security */}
      <Section n={10} title={S10_TITLE} locale={locale}>
        <p>{tr(S10_INTRO, locale)}</p>
        <p className={list}>{tr(S10_LIST, locale)}</p>
        <p className="text-slate-500">{tr(S10_NOTE, locale)}</p>
      </Section>

      {/* 11. Changes & last updated */}
      <Section n={11} title={S11_TITLE} locale={locale}>
        <p>{tr(S11_BODY, locale)}</p>
        <p className="font-medium text-slate-900">{tr(LAST_UPDATED, locale)}</p>
      </Section>

      <p className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">{tr(FOOTER_NOTE, locale)}</p>
    </div>
  );
}
