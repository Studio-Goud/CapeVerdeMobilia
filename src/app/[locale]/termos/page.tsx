import type { Metadata } from 'next';
import { tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card } from '@/components/ui';

// Termos de Utilização / Terms of Service / Gebruiksvoorwaarden.
// Fully trilingual (pt/en/nl) via inline TL objects rendered with tr(obj, locale).
// CONCEPT document - pending legal review. Portuguese is primary.

const TITLE: TL = { pt: 'Termos de Utilização', en: 'Terms of Service', nl: 'Gebruiksvoorwaarden' };

const BANNER: TL = {
  pt: 'Rascunho - verificação jurídica necessária',
  en: 'Draft - pending legal review',
  nl: 'CONCEPT - juridische verificatie vereist',
};

const INTRO: TL = {
  pt: 'Estes Termos de Utilização regulam o acesso e a utilização da plataforma Djarvista (djarvista.com). Ao criar uma conta ou ao utilizar a plataforma, o utilizador aceita estes termos.',
  en: 'These Terms of Service govern access to and use of the Djarvista platform (djarvista.com). By creating an account or using the platform, you accept these terms.',
  nl: 'Deze Gebruiksvoorwaarden regelen de toegang tot en het gebruik van het Djarvista-platform (djarvista.com). Door een account aan te maken of het platform te gebruiken, aanvaardt u deze voorwaarden.',
};

type Block =
  | { kind: 'p'; text: TL }
  | { kind: 'ul'; items: TL[]; strong?: boolean };

interface Section {
  heading: TL;
  blocks: Block[];
}

const SECTIONS: Section[] = [
  {
    heading: { pt: '1. O que é a Djarvista', en: '1. Who we are', nl: '1. Wie we zijn' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'A Djarvista é uma plataforma trilingue (português, inglês e neerlandês) de autosserviço para imóveis, terrenos, construção, profissionais e informação oficial em Cabo Verde. O lançamento inicial centra-se na ilha de São Vicente.',
          en: 'Djarvista is a trilingual (Portuguese, English and Dutch) self-service platform for real estate, land, construction, professionals and official information in Cabo Verde. The initial launch focuses on the island of São Vicente.',
          nl: 'Djarvista is een drietalig (Portugees, Engels en Nederlands) self-serviceplatform voor vastgoed, grond, bouw, professionals en officiële informatie in Kaapverdië. De eerste lancering richt zich op het eiland São Vicente.',
        },
      },
      {
        kind: 'p',
        text: {
          pt: 'A plataforma é operada por [Djarvista - forma jurídica/registo a preencher], com sede em [morada a preencher]. Contacto: info@djarvista.com.',
          en: 'The platform is operated by [Djarvista - legal form/registration to be completed], with registered office at [address to be completed]. Contact: info@djarvista.com.',
          nl: 'Het platform wordt geëxploiteerd door [Djarvista - rechtsvorm/registratie in te vullen], gevestigd te [adres in te vullen]. Contact: info@djarvista.com.',
        },
      },
    ],
  },
  {
    heading: {
      pt: '2. O que a Djarvista é - e o que NÃO é',
      en: '2. What the service is - and what it is NOT',
      nl: '2. Wat de dienst wél en NIET is',
    },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'A Djarvista é exclusivamente uma ferramenta de autosserviço, um marketplace e uma plataforma de informação. Os utilizadores tratam diretamente entre si; a Djarvista não intervém nas negociações nem nas transações.',
          en: 'Djarvista is solely a self-service tool, a marketplace and an information platform. Users deal directly with each other; Djarvista does not take part in negotiations or transactions.',
          nl: 'Djarvista is uitsluitend een self-servicetool, een marktplaats en een informatieplatform. Gebruikers handelen rechtstreeks met elkaar; Djarvista neemt geen deel aan onderhandelingen of transacties.',
        },
      },
      {
        kind: 'ul',
        strong: true,
        items: [
          {
            pt: 'A Djarvista NÃO é mediador imobiliário nem agente imobiliário.',
            en: 'Djarvista is NOT a real-estate broker or agent.',
            nl: 'Djarvista is GEEN makelaar of vastgoedagent.',
          },
          {
            pt: 'A Djarvista NÃO é parte em qualquer contrato de arrendamento ou de compra e venda.',
            en: 'Djarvista is NOT a party to any rental or sale contract.',
            nl: 'Djarvista is GEEN partij bij enig huur- of koopcontract.',
          },
          {
            pt: 'A Djarvista NÃO presta aconselhamento jurídico, fiscal ou de investimento.',
            en: 'Djarvista does NOT provide legal, tax or investment advice.',
            nl: 'Djarvista geeft GEEN juridisch, fiscaal of beleggingsadvies.',
          },
          {
            pt: 'A Djarvista NÃO confirma a propriedade legal de qualquer imóvel ou terreno.',
            en: 'Djarvista does NOT confirm the legal ownership of any property or land.',
            nl: 'Djarvista bevestigt NIET het juridische eigendom van enig pand of perceel.',
          },
          {
            pt: 'A Djarvista NÃO assume qualquer responsabilidade legal pelos anúncios, pelas transações entre utilizadores ou pelo contrato de arrendamento pró-forma (que é apenas uma ferramenta de conveniência).',
            en: 'Djarvista bears NO legal responsibility for listings, for transactions between users, or for the pro-forma rental contract (which is only a convenience tool).',
            nl: 'Djarvista draagt GEEN enkele juridische verantwoordelijkheid voor advertenties, voor transacties tussen gebruikers, of voor het pro-forma huurcontract (dat slechts een hulpmiddel is).',
          },
        ],
      },
      {
        kind: 'p',
        text: {
          pt: 'Em resumo: a Djarvista disponibiliza ferramentas e informação; a responsabilidade pelas decisões, acordos e transações é sempre dos utilizadores.',
          en: 'In short: Djarvista provides tools and information; responsibility for decisions, agreements and transactions always rests with the users.',
          nl: 'Kortom: Djarvista biedt hulpmiddelen en informatie; de verantwoordelijkheid voor beslissingen, afspraken en transacties ligt altijd bij de gebruikers.',
        },
      },
    ],
  },
  {
    heading: {
      pt: '3. Contas e obrigações do utilizador',
      en: '3. Accounts and user obligations',
      nl: '3. Accounts en gebruikersverplichtingen',
    },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'Para publicar conteúdos ou contactar outros utilizadores pode ser necessário criar uma conta. O utilizador é responsável pela confidencialidade das suas credenciais e por toda a atividade realizada na sua conta.',
          en: 'Creating an account may be required to publish content or contact other users. You are responsible for keeping your credentials confidential and for all activity carried out under your account.',
          nl: 'Voor het plaatsen van content of het contacteren van andere gebruikers kan een account nodig zijn. U bent verantwoordelijk voor het vertrouwelijk houden van uw inloggegevens en voor alle activiteit onder uw account.',
        },
      },
      {
        kind: 'ul',
        items: [
          {
            pt: 'Fornecer informação verdadeira, exata e atualizada.',
            en: 'Provide truthful, accurate and up-to-date information.',
            nl: 'Waarheidsgetrouwe, juiste en actuele informatie verstrekken.',
          },
          {
            pt: 'Não cometer fraude, falsificação de identidade ou deturpação de factos.',
            en: 'Not engage in fraud, identity falsification or misrepresentation.',
            nl: 'Geen fraude, identiteitsvervalsing of misleiding plegen.',
          },
          {
            pt: 'Não publicar conteúdo ilegal, enganoso, ofensivo ou que viole direitos de terceiros.',
            en: 'Not publish illegal, misleading or offensive content, or content that infringes third-party rights.',
            nl: 'Geen illegale, misleidende of aanstootgevende content plaatsen, noch content die rechten van derden schendt.',
          },
          {
            pt: 'Respeitar os outros utilizadores e a lei aplicável em Cabo Verde.',
            en: 'Respect other users and the applicable law in Cabo Verde.',
            nl: 'Andere gebruikers en het toepasselijke recht in Kaapverdië respecteren.',
          },
          {
            pt: 'Não utilizar a plataforma para spam, recolha não autorizada de dados ou fins que a possam prejudicar.',
            en: 'Not use the platform for spam, unauthorized data collection or purposes that could harm it.',
            nl: 'Het platform niet gebruiken voor spam, ongeoorloofde gegevensverzameling of doeleinden die het kunnen schaden.',
          },
        ],
      },
    ],
  },
  {
    heading: { pt: '4. Anúncios', en: '4. Listings', nl: '4. Advertenties' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'Os anúncios constituem informação comercial fornecida pelos utilizadores. O utilizador que publica é o único responsável pela exatidão, legalidade e atualização do conteúdo, incluindo preços, características, fotografias e a titularidade do imóvel.',
          en: 'Listings are commercial information provided by users. The user who publishes is solely responsible for the accuracy, legality and timeliness of the content, including prices, features, photographs and ownership of the property.',
          nl: 'Advertenties zijn commerciële informatie die door gebruikers wordt aangeleverd. De plaatsende gebruiker is als enige verantwoordelijk voor de juistheid, rechtmatigheid en actualiteit van de content, waaronder prijzen, kenmerken, foto’s en de eigendom van het pand.',
        },
      },
      {
        kind: 'p',
        text: {
          pt: 'A Djarvista não verifica a propriedade legal dos imóveis anunciados e não garante a veracidade dos anúncios. A Djarvista pode, mas não é obrigada a, moderar, editar ou remover anúncios que violem estes termos ou a lei, sem que tal implique qualquer responsabilidade.',
          en: 'Djarvista does not verify the legal ownership of advertised properties and does not guarantee the truthfulness of listings. Djarvista may, but is not obliged to, moderate, edit or remove listings that violate these terms or the law, without this implying any liability.',
          nl: 'Djarvista verifieert niet het juridische eigendom van geadverteerd vastgoed en garandeert de juistheid van advertenties niet. Djarvista kan, maar is niet verplicht, advertenties die deze voorwaarden of de wet schenden te modereren, aan te passen of te verwijderen, zonder dat dit enige aansprakelijkheid meebrengt.',
        },
      },
    ],
  },
  {
    heading: {
      pt: '5. Contrato de arrendamento pró-forma e verificações',
      en: '5. Pro-forma rental contract and verifications',
      nl: '5. Pro-forma huurcontract en verificaties',
    },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'A Djarvista disponibiliza um gerador de contrato de arrendamento pró-forma como ferramenta de autosserviço e de conveniência. A Djarvista não é parte no contrato, não presta aconselhamento jurídico e não garante a validade, adequação ou conformidade legal do documento. Recomenda-se sempre a validação por advogado ou notário e o cumprimento das obrigações de registo e imposto de selo aplicáveis.',
          en: 'Djarvista provides a pro-forma rental contract generator as a self-service convenience tool. Djarvista is not a party to the contract, gives no legal advice and does not guarantee the validity, suitability or legal compliance of the document. Review by a lawyer or notary and compliance with applicable registration and stamp-duty obligations are always recommended.',
          nl: 'Djarvista biedt een generator voor een pro-forma huurcontract aan als self-service hulpmiddel. Djarvista is geen partij bij het contract, geeft geen juridisch advies en garandeert niet de geldigheid, geschiktheid of juridische conformiteit van het document. Validatie door een advocaat of notaris en naleving van de registratie- en zegelrechtverplichtingen worden altijd aanbevolen.',
        },
      },
      {
        kind: 'p',
        text: {
          pt: 'A verificação de identidade e os níveis de confiança apresentados resultam de uma análise com controlo humano e destinam-se apenas a aumentar a confiança entre utilizadores. Não constituem uma garantia legal de identidade, idoneidade ou titularidade, e não substituem a devida diligência do utilizador.',
          en: 'Identity verification and the trust levels shown result from a human-reviewed assessment and are intended only to increase confidence between users. They do not constitute a legal guarantee of identity, reliability or ownership, and do not replace the user’s own due diligence.',
          nl: 'De identiteitsverificatie en de getoonde vertrouwensniveaus zijn het resultaat van een door mensen gecontroleerde beoordeling en dienen uitsluitend om het vertrouwen tussen gebruikers te vergroten. Zij vormen geen juridische garantie van identiteit, betrouwbaarheid of eigendom en vervangen niet de eigen due diligence van de gebruiker.',
        },
      },
    ],
  },
  {
    heading: {
      pt: '6. Informação oficial: resumo, não aconselhamento jurídico',
      en: '6. Official information: a summary, not legal advice',
      nl: '6. Officiële informatie: samenvatting, geen juridisch advies',
    },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'Os artigos de informação oficial são resumos elaborados pela plataforma a partir de fontes públicas. NÃO constituem informação oficial do Governo nem das entidades públicas, podem estar incompletos ou desatualizados e não constituem aconselhamento jurídico. Confirme sempre junto das entidades competentes antes de tomar decisões.',
          en: 'Official-information articles are summaries prepared by the platform from public sources. They are NOT official government or public-authority information, may be incomplete or outdated, and do not constitute legal advice. Always confirm with the competent authorities before making decisions.',
          nl: 'Artikelen met officiële informatie zijn samenvattingen die het platform op basis van openbare bronnen opstelt. Zij vormen GEEN officiële informatie van de overheid of publieke instanties, kunnen onvolledig of verouderd zijn en vormen geen juridisch advies. Bevestig altijd bij de bevoegde instanties voordat u beslissingen neemt.',
        },
      },
    ],
  },
  {
    heading: { pt: '7. Limitação de responsabilidade', en: '7. Limitation of liability', nl: '7. Aansprakelijkheidsbeperking' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'A plataforma é disponibilizada “tal como está”, sem garantias de disponibilidade contínua, exatidão ou adequação a um fim específico. Na medida máxima permitida pela lei, a Djarvista não é responsável por danos diretos ou indiretos resultantes da utilização da plataforma, dos anúncios, dos contactos entre utilizadores, das transações realizadas ou das decisões tomadas com base na informação disponibilizada.',
          en: 'The platform is provided “as is”, without warranties of continuous availability, accuracy or fitness for a particular purpose. To the maximum extent permitted by law, Djarvista is not liable for direct or indirect damages arising from use of the platform, from listings, from contacts between users, from transactions carried out, or from decisions taken on the basis of the information provided.',
          nl: 'Het platform wordt aangeboden “as is”, zonder garanties van continue beschikbaarheid, juistheid of geschiktheid voor een bepaald doel. Voor zover wettelijk toegestaan is Djarvista niet aansprakelijk voor directe of indirecte schade die voortvloeit uit het gebruik van het platform, uit advertenties, uit contacten tussen gebruikers, uit uitgevoerde transacties of uit beslissingen genomen op basis van de verstrekte informatie.',
        },
      },
    ],
  },
  {
    heading: { pt: '8. Suspensão e cessação', en: '8. Suspension and termination', nl: '8. Beëindiging en verwijdering' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'O utilizador pode encerrar a sua conta a qualquer momento. A Djarvista pode suspender ou encerrar contas e remover conteúdos que violem estes termos, a lei aplicável ou os direitos de terceiros, procurando, sempre que possível e razoável, informar o utilizador.',
          en: 'You may close your account at any time. Djarvista may suspend or close accounts and remove content that violates these terms, the applicable law or third-party rights, seeking, where possible and reasonable, to inform the user.',
          nl: 'U kunt uw account op elk moment sluiten. Djarvista kan accounts opschorten of sluiten en content verwijderen die deze voorwaarden, het toepasselijke recht of rechten van derden schendt, en zal de gebruiker waar mogelijk en redelijk informeren.',
        },
      },
    ],
  },
  {
    heading: { pt: '9. Alterações a estes termos', en: '9. Changes to these terms', nl: '9. Wijzigingen van deze voorwaarden' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'A Djarvista pode alterar estes termos para refletir mudanças legais, técnicas ou do serviço. As alterações entram em vigor com a sua publicação nesta página. A utilização continuada da plataforma após a publicação implica a aceitação da versão atualizada.',
          en: 'Djarvista may amend these terms to reflect legal, technical or service changes. Amendments take effect when published on this page. Continued use of the platform after publication constitutes acceptance of the updated version.',
          nl: 'Djarvista kan deze voorwaarden wijzigen om juridische, technische of dienstgerelateerde veranderingen te weerspiegelen. Wijzigingen worden van kracht zodra ze op deze pagina zijn gepubliceerd. Voortgezet gebruik van het platform na publicatie geldt als aanvaarding van de bijgewerkte versie.',
        },
      },
    ],
  },
  {
    heading: { pt: '10. Lei aplicável e contacto', en: '10. Governing law and contact', nl: '10. Toepasselijk recht en contact' },
    blocks: [
      {
        kind: 'p',
        text: {
          pt: 'Estes termos regem-se pela lei de Cabo Verde (a confirmar). Para quaisquer questões relacionadas com estes termos ou com a plataforma, contacte info@djarvista.com. Entidade responsável: [Djarvista - forma jurídica/registo a preencher], [morada a preencher].',
          en: 'These terms are governed by the law of Cabo Verde (to confirm). For any questions regarding these terms or the platform, contact info@djarvista.com. Responsible entity: [Djarvista - legal form/registration to be completed], [address to be completed].',
          nl: 'Deze voorwaarden worden beheerst door het recht van Kaapverdië (te bevestigen). Voor vragen over deze voorwaarden of het platform kunt u contact opnemen via info@djarvista.com. Verantwoordelijke entiteit: [Djarvista - rechtsvorm/registratie in te vullen], [adres in te vullen].',
        },
      },
    ],
  },
];

const UPDATED_LABEL: TL = { pt: 'Última atualização', en: 'Last updated', nl: 'Laatst bijgewerkt' };
const UPDATED_DATE = '21-07-2026';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const title = tr(TITLE, params.locale);
  const description = tr(INTRO, params.locale).slice(0, 180);
  return { title: `${title} · Djarvista`, description, openGraph: { title, description } };
}

export default function TermsPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border-2 border-amber-400 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900">
        ⚠️ {tr(BANNER, locale)}
      </div>

      <PageTitle title={tr(TITLE, locale)} intro={tr(INTRO, locale)} />

      {SECTIONS.map((section) => (
        <Card key={tr(section.heading, 'pt')} className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">{tr(section.heading, locale)}</h2>
          {section.blocks.map((block, i) => {
            if (block.kind === 'p') {
              return (
                <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {tr(block.text, locale)}
                </p>
              );
            }
            if (block.strong) {
              return (
                <div key={i} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <ul className="ml-5 list-disc space-y-2 text-sm font-medium text-amber-900">
                    {block.items.map((item, j) => (
                      <li key={j}>{tr(item, locale)}</li>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <ul key={i} className="ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-slate-700">
                {block.items.map((item, j) => (
                  <li key={j}>{tr(item, locale)}</li>
                ))}
              </ul>
            );
          })}
        </Card>
      ))}

      <p className="text-xs text-slate-500">
        {tr(UPDATED_LABEL, locale)}: {UPDATED_DATE}
      </p>
    </div>
  );
}
