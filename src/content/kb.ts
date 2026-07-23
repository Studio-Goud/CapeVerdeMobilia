import type { TL } from '@/i18n';

/**
 * Djarvista knowledge base ("Guias"). Curated, SOURCED reference content about
 * building, property, tax and government in Cabo Verde.
 *
 * Editorial rules (this is what makes us a trustworthy, citable source):
 *  - Every factual claim carries a source. `status: 'fact'` = attributable to a
 *    primary source (Boletim Oficial / official portal) or a reliable named source;
 *    `status: 'verify'` = secondary/uncertain, shown with an explicit "a confirmar" flag.
 *  - Nothing is invented. Figures we could not source are omitted, not approximated.
 *  - Legal/tax content is indicative, not advice; each page tells the reader which
 *    authority to confirm with.
 *  Full sourced corpus: scratchpad/kb-corpus.md + kb-terrenos.md.
 */

export interface KbSource { label: string; url: string; date: string; primary?: boolean }

export interface KbEntry {
  q: TL;
  a: TL;
  status: 'fact' | 'verify';
  authority?: TL;
  sources: KbSource[];
}

export interface KbDirItem { name: string; island: string; website?: string; contact?: string; status: 'fact' | 'verify' }

export interface KbTopic {
  slug: string;
  title: TL;
  intro: TL;
  updated: string;
  seoTitle: TL;
  seoDesc: TL;
  entries: KbEntry[];
  directory?: { caption: TL; items: KbDirItem[] };
}

// --- Shared sources -----------------------------------------------------------
const BOE_TAX: KbSource = { label: 'Boletim Oficial n.º 46, I Série (Leis 54/X/2025 e 55/X/2025)', url: 'https://boe.incv.cv/Bulletins/Download/23602', date: '2025-06-06', primary: true };
const MCT_IPI: KbSource = { label: 'Ministério competente – explicador IPI', url: 'https://mct.gov.cv/download/imposto-sobre-propriedade-de-imoveis-ipi/', date: '2026-07-23' };
const PWC: KbSource = { label: 'PwC Worldwide Tax Summaries – Cabo Verde', url: 'https://taxsummaries.pwc.com/cabo-verde/individual/other-taxes', date: '2026-05-29' };
const RJOU: KbSource = { label: 'Lei n.º 60/VIII/2014 (Regime Jurídico das Operações Urbanísticas), Boletim Oficial I Série n.º 28', url: 'https://faolex.fao.org/docs/pdf/cvi132933.pdf', date: '2014-04-23', primary: true };
const AUGI: KbSource = { label: 'Decreto-Lei n.º 57/2015 (legalização AUGI), Boletim Oficial I Série n.º 64', url: 'https://faolex.fao.org/docs/pdf/cvi149231.pdf', date: '2015-10-20', primary: true };
const CMP_LOJA: KbSource = { label: 'Câmara Municipal da Praia – Loja CMP (documentos)', url: 'https://lojacmp.com/suporte/knowledgebase.php', date: '2026-07-23' };
const COASTAL: KbSource = { label: 'Lei n.º 44/VI/2004 (domínio público marítimo)', url: 'https://faolex.fao.org/docs/pdf/cvi46959.pdf', date: '2004-07-12', primary: true };
const DNRE_NIF: KbSource = { label: 'DNRE / Ministério das Finanças – Solicitar NIF', url: 'https://www.mf.gov.cv/web/dnre/solicitar-nif', date: '2026-07-23', primary: true };
const GREENCARD: KbSource = { label: 'Ministério das Finanças – Estatuto Green Card (Lei 30/IX/2018)', url: 'https://www.mf.gov.cv/web/mf/-/estatuto-diferenciado-para-titular-de-segunda-residencia-em-cabo-verde-atraves-da-emissao-do-cartao-green-card', date: '2026-07-23', primary: true };
const EMIGRANTE: KbSource = { label: 'Ministério das Finanças – Estatuto do Investidor Emigrante', url: 'https://www.mf.gov.cv/-/estatuto-do-investidor-emigrante', date: '2020-01-09', primary: true };
const CONSCV: KbSource = { label: 'Consulado-Geral de Cabo Verde (guia de compra de imóvel)', url: 'https://www.conscv.nl/pt/negocios/buying-property', date: '2026-07-23' };
const REGPREDIAL: KbSource = { label: 'Código do Registo Predial – Decreto-Lei n.º 10/2010, Boletim Oficial n.º 12', url: 'https://boe.incv.cv/Bulletins/View?id=7141', date: '2010-03-29', primary: true };
const INGT: KbSource = { label: 'INGT – Cadastro Predial', url: 'https://ingt.gov.cv/ingt/Servi%C3%A7os/cadastro-predial/', date: '2026-07-23', primary: true };
const DGRNI: KbSource = { label: 'DGRNI – Registo Predial e Notariado (Ministério da Justiça)', url: 'https://justica.gov.cv/en/dgrni', date: '2026-07-23', primary: true };
const PORTON: KbSource = { label: 'Porton di Nôs Ilha / Casa do Cidadão', url: 'https://portondinosilhas.gov.cv/', date: '2026-07-23', primary: true };
const END: KbSource = { label: 'Governo de Cabo Verde – Casa do Cidadão (Empresa no Dia, DL 9/2008)', url: 'https://www.governo.cv/casa-do-cidadao-um-ano-depois/', date: '2009-07-22' };
const INPS: KbSource = { label: 'INPS – Inscrição', url: 'https://inps.cv/inscricao/', date: '2026-07-23', primary: true };
const COMERCIO: KbSource = { label: 'Portal do Comércio – Licenciamento comercial', url: 'https://portaldocomercio.gov.cv/web/portal/licenciamento-comercial', date: '2026-07-23', primary: true };

const AT_MUNI: TL = {
  pt: 'Autoridade Tributária e Aduaneira (DNRE) e a Câmara Municipal onde se situa o imóvel.',
  en: 'The Tax Authority (DNRE) and the Municipal Council where the property is located.',
  nl: 'De belastingdienst (DNRE) en de gemeente (Câmara Municipal) waar het pand ligt.',
};
const CAMARA: TL = { pt: 'A Câmara Municipal competente.', en: 'The competent Municipal Council.', nl: 'De bevoegde gemeente (Câmara Municipal).' };
const NOTARIO: TL = { pt: 'Um notário/advogado cabo-verdiano e a Conservatória do Registo Predial.', en: 'A Cabo Verdean notary/lawyer and the Land Registry.', nl: 'Een Kaapverdiaanse notaris/advocaat en het kadaster.' };

// ============================================================================
// 1. Property taxes 2026 (flagship)
// ============================================================================
const impostos: KbTopic = {
  slug: 'impostos-imobiliarios',
  title: { pt: 'Impostos imobiliários em Cabo Verde (reforma de 2026)', en: 'Property taxes in Cabo Verde (2026 reform)', nl: 'Vastgoedbelasting in Kaapverdië (hervorming 2026)' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Impostos imobiliários em Cabo Verde 2026: ITI e IPI (fim do IUP)', en: 'Property taxes in Cabo Verde 2026: ITI and IPI (end of IUP)', nl: 'Vastgoedbelasting Kaapverdië 2026: ITI en IPI (einde IUP)' },
  seoDesc: {
    pt: 'Desde 1 de janeiro de 2026, o IUP foi substituído pelo ITI (1% na compra) e pelo IPI (0,1% anual). Fonte: Boletim Oficial, Leis 54 e 55/X/2025. Informação indicativa, não é aconselhamento jurídico.',
    en: 'Since 1 January 2026, IUP was replaced by ITI (1% on purchase) and IPI (0.1% yearly). Source: Boletim Oficial, Laws 54 and 55/X/2025. Indicative, not legal advice.',
    nl: 'Sinds 1 januari 2026 verving ITI (1% bij koop) en IPI (0,1% per jaar) de oude IUP. Bron: Boletim Oficial, wetten 54 en 55/X/2025. Indicatief, geen juridisch advies.',
  },
  intro: {
    pt: 'A 1 de janeiro de 2026 entrou em vigor uma reforma da tributação do património: o antigo IUP foi revogado e substituído por dois impostos, o ITI (na transmissão) e o IPI (anual). As taxas abaixo são citadas diretamente do texto da lei no Boletim Oficial.',
    en: 'On 1 January 2026 a property-tax reform took effect: the old IUP was repealed and replaced by two taxes, ITI (on transfer) and IPI (annual). The rates below are quoted directly from the law in the Boletim Oficial.',
    nl: 'Op 1 januari 2026 trad een hervorming van de vastgoedbelasting in werking: de oude IUP werd ingetrokken en vervangen door ITI (bij overdracht) en IPI (jaarlijks). De tarieven hieronder zijn rechtstreeks uit de wet in de Boletim Oficial geciteerd.',
  },
  entries: [
    {
      q: { pt: 'O que mudou em 2026?', en: 'What changed in 2026?', nl: 'Wat is er in 2026 veranderd?' },
      a: {
        pt: 'A partir de 1 de janeiro de 2026, o Imposto Único sobre o Património (IUP) foi revogado e substituído por dois impostos: o ITI, pago na compra/transmissão, e o IPI, pago anualmente por quem é dono. Base legal: Leis n.º 54/X/2025 e 55/X/2025.',
        en: 'From 1 January 2026 the single property tax (IUP) was repealed and replaced by two taxes: ITI, paid on purchase/transfer, and IPI, paid yearly by the owner. Legal basis: Laws 54/X/2025 and 55/X/2025.',
        nl: 'Vanaf 1 januari 2026 is de oude vermogensbelasting (IUP) ingetrokken en vervangen door twee belastingen: ITI, betaald bij koop/overdracht, en IPI, jaarlijks betaald door de eigenaar. Wettelijke basis: wetten 54/X/2025 en 55/X/2025.',
      },
      status: 'fact', authority: AT_MUNI, sources: [BOE_TAX, MCT_IPI],
    },
    {
      q: { pt: 'Quanto pago de imposto ao comprar (ITI)?', en: 'How much tax do I pay when buying (ITI)?', nl: 'Hoeveel belasting betaal ik bij koop (ITI)?' },
      a: {
        pt: 'A taxa do ITI é de 1% do valor tributável (Código do ITI, art. 11.º). Sobe para 3% quando o comprador ou o vendedor beneficia de um regime de tributação privilegiada. É um imposto municipal, normalmente pago pelo comprador. Nota: alguns anúncios ainda citam "1,5%", que era um valor da era do antigo IUP, não a taxa atual.',
        en: 'The ITI rate is 1% of the taxable value (ITI Code, art. 11). It rises to 3% where the buyer or seller enjoys a privileged tax regime. It is a municipal tax, usually paid by the buyer. Note: some ads still quote "1.5%", an old IUP-era figure, not the current rate.',
        nl: 'Het ITI-tarief is 1% van de belastbare waarde (ITI-wetboek, art. 11). Het stijgt naar 3% als koper of verkoper een bevoorrecht belastingregime geniet. Het is een gemeentelijke belasting, meestal door de koper betaald. Let op: sommige advertenties noemen nog "1,5%", een oud IUP-cijfer.',
      },
      status: 'fact', authority: AT_MUNI, sources: [BOE_TAX, PWC],
    },
    {
      q: { pt: 'Quanto pago por ano por ser dono (IPI)?', en: 'How much do I pay yearly to own (IPI)?', nl: 'Hoeveel betaal ik jaarlijks voor bezit (IPI)?' },
      a: {
        pt: 'O IPI é de 0,1% do valor tributável por ano (art. 28.º); para terrenos para construção a taxa é de 0,15% (art. 23.º, n.º 2). Há agravamentos para prédios devolutos, em ruína ou com fachada por acabar. É devido por quem for dono a 31 de dezembro. Uma norma transitória limita a subida anual a 10%.',
        en: 'IPI is 0.1% of the taxable value per year (art. 28); for construction land the rate is 0.15% (art. 23(2)). There are surcharges for vacant, ruined or unfinished-façade buildings. It is owed by whoever owns the property on 31 December. A transitional rule caps the yearly increase at 10%.',
        nl: 'IPI is 0,1% van de belastbare waarde per jaar (art. 28); voor bouwgrond 0,15% (art. 23 lid 2). Er zijn verhogingen voor leegstaande, vervallen of onafgewerkte panden. Verschuldigd door wie op 31 december eigenaar is. Een overgangsregel maximeert de jaarlijkse stijging op 10%.',
      },
      status: 'fact', authority: AT_MUNI, sources: [BOE_TAX, MCT_IPI],
    },
    {
      q: { pt: 'E quando vendo, pago imposto sobre o lucro?', en: 'And when I sell, is the gain taxed?', nl: 'En bij verkoop, wordt de winst belast?' },
      a: {
        pt: 'As mais-valias de particulares na venda de imóveis são tributadas a uma taxa autónoma de 1% (em IRPS). Não encontrámos em fonte oficial uma isenção confirmada para habitação própria ou reinvestimento, pelo que não se deve assumir que exista.',
        en: 'Individuals’ capital gains on selling property are taxed at a 1% autonomous rate (under IRPS). We did not find a confirmed exemption for a main home or reinvestment in an official source, so do not assume one exists.',
        nl: 'Meerwaarde van particulieren bij verkoop wordt belast tegen een autonoom tarief van 1% (via IRPS). We vonden geen bevestigde vrijstelling voor eigen woning of herinvestering, dus ga daar niet van uit.',
      },
      status: 'fact', authority: AT_MUNI, sources: [PWC],
    },
    {
      q: { pt: 'Quais são os custos de notário e registo?', en: 'What are the notary and registration costs?', nl: 'Wat zijn de notaris- en registratiekosten?' },
      a: {
        pt: 'Além dos impostos, há emolumentos do notário (escritura) e do registo predial. Não conseguimos obter a tabela oficial de emolumentos, por isso não publicamos valores estimados como se fossem certos. Peça a tabela atual à Casa do Cidadão, ao cartório notarial e à conservatória.',
        en: 'Besides taxes there are notary (deed) and land-registry fees. We could not obtain the official fee schedule, so we do not publish estimates as if certain. Ask Casa do Cidadão, the notary and the land registry for the current table.',
        nl: 'Naast belastingen zijn er notaris- (akte) en kadasterkosten. We konden de officiële tarieventabel niet verkrijgen, dus publiceren we geen schattingen alsof ze zeker zijn. Vraag de actuele tabel op bij Casa do Cidadão, de notaris en het kadaster.',
      },
      status: 'verify', authority: NOTARIO, sources: [PORTON],
    },
  ],
};

// ============================================================================
// 2. Building permits
// ============================================================================
const construcao: KbTopic = {
  slug: 'licencas-de-construcao',
  title: { pt: 'Licenças de construção em Cabo Verde', en: 'Building permits in Cabo Verde', nl: 'Bouwvergunningen in Kaapverdië' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Licença de construção em Cabo Verde: processo, prazos e multas', en: 'Building permit in Cabo Verde: process, deadlines and fines', nl: 'Bouwvergunning in Kaapverdië: proces, termijnen en boetes' },
  seoDesc: {
    pt: 'Como obter a licença de construção em Cabo Verde: o que precisa de licença, prazos legais, a Câmara Municipal competente e as multas por construir sem licença. Base: Lei 60/VIII/2014. Não é aconselhamento jurídico.',
    en: 'How to get a building permit in Cabo Verde: what needs a permit, legal deadlines, the competent Municipal Council and fines for building without one. Basis: Law 60/VIII/2014. Not legal advice.',
    nl: 'Hoe krijg je een bouwvergunning in Kaapverdië: wat vergunningsplichtig is, wettelijke termijnen, de bevoegde gemeente en boetes voor bouwen zonder vergunning. Basis: wet 60/VIII/2014. Geen juridisch advies.',
  },
  intro: {
    pt: 'Construir em Cabo Verde é regulado pelo Regime Jurídico das Operações Urbanísticas (Lei n.º 60/VIII/2014). A licença é concedida pela Câmara Municipal. Abaixo, o essencial com base no texto da lei.',
    en: 'Building in Cabo Verde is governed by the Regime for Urban Operations (Law 60/VIII/2014). The permit is granted by the Municipal Council. Below, the essentials based on the law text.',
    nl: 'Bouwen in Kaapverdië valt onder het Regime voor Stedelijke Operaties (wet 60/VIII/2014). De vergunning wordt verleend door de gemeente. Hieronder het essentiële, op basis van de wettekst.',
  },
  entries: [
    {
      q: { pt: 'Que obras precisam de licença?', en: 'Which works need a permit?', nl: 'Welke werken hebben een vergunning nodig?' },
      a: {
        pt: 'Precisam de licença municipal, entre outras, as obras de construção, ampliação ou alteração fora de um plano de pormenor ou loteamento, o loteamento e as obras de urbanização (art. 4.º). Obras interiores que não afetem a estrutura, fachada ou telhado podem ser isentas ou sujeitas apenas a comunicação prévia (arts. 7.º, 9.º). A isenção não dispensa o cumprimento dos planos e normas técnicas.',
        en: 'A municipal permit is needed for, among others, construction, extension or alteration works outside a detailed plan or subdivision, plus subdivision and urbanisation works (art. 4). Interior works not affecting structure, façade or roof may be exempt or need only prior notification (arts. 7, 9). Exemption does not waive planning and technical rules.',
        nl: 'Een gemeentelijke vergunning is nodig voor o.a. bouw, uitbreiding of wijziging buiten een detailplan of verkaveling, plus verkaveling en urbanisatiewerken (art. 4). Inwendige werken die structuur, gevel of dak niet raken kunnen vrijgesteld zijn of enkel een voorafgaande melding vereisen (art. 7, 9). Vrijstelling ontslaat niet van plannen en technische normen.',
      },
      status: 'fact', authority: CAMARA, sources: [RJOU],
    },
    {
      q: { pt: 'Quem concede a licença e quanto tempo demora?', en: 'Who grants the permit and how long does it take?', nl: 'Wie verleent de vergunning en hoe lang duurt het?' },
      a: {
        pt: 'A licença é concedida pela Câmara Municipal. Os prazos legais máximos: decisão sobre o projeto de arquitetura em 30 dias (art. 21.º); decisão final da licença em 45 dias para obras de construção/loteamento/urbanização (art. 23.º); as entidades consultadas têm 20 dias, valendo o silêncio como acordo (art. 20.º). Uma informação prévia favorável vincula a Câmara durante 1 ano (arts. 17.º-18.º).',
        en: 'The permit is granted by the Municipal Council. Legal maximum deadlines: decision on the architecture project in 30 days (art. 21); final permit decision in 45 days for construction/subdivision/urbanisation (art. 23); consulted bodies have 20 days, silence counting as agreement (art. 20). A favourable prior opinion binds the Council for 1 year (arts. 17-18).',
        nl: 'De vergunning wordt verleend door de gemeente. Wettelijke maximumtermijnen: beslissing over het architectuurproject binnen 30 dagen (art. 21); eindbeslissing binnen 45 dagen voor bouw/verkaveling/urbanisatie (art. 23); geraadpleegde instanties hebben 20 dagen, stilte geldt als akkoord (art. 20). Een gunstig voorafgaand advies bindt de gemeente 1 jaar (art. 17-18).',
      },
      status: 'fact', authority: CAMARA, sources: [RJOU],
    },
    {
      q: { pt: 'Quanto custa a licença?', en: 'How much does the permit cost?', nl: 'Wat kost de vergunning?' },
      a: {
        pt: 'As taxas são fixadas por regulamento de cada Câmara Municipal (arts. 105.º-110.º), pelo que o valor varia de município para município e não é fixado a nível nacional. Peça a tabela de taxas à Câmara onde vai construir. A Câmara Municipal da Praia publica as listas de documentos exigidos na sua Loja online.',
        en: 'Fees are set by each Municipal Council’s regulation (arts. 105-110), so the amount varies by municipality and is not fixed nationally. Ask your Council for its fee table. The Praia Council publishes the required-document lists in its online store.',
        nl: 'De tarieven worden per gemeente bij verordening vastgesteld (art. 105-110), dus het bedrag verschilt per gemeente en is niet nationaal vastgelegd. Vraag de tarieventabel op bij je gemeente. De gemeente Praia publiceert de vereiste documentenlijsten in haar online loket.',
      },
      status: 'verify', authority: CAMARA, sources: [RJOU, CMP_LOJA],
    },
    {
      q: { pt: 'Posso começar a obra depois da licença?', en: 'Can I start work once licensed?', nl: 'Mag ik beginnen zodra ik de vergunning heb?' },
      a: {
        pt: 'A obra só pode começar após a emissão do alvará (art. 70.º), que deve ser pedido no prazo de 1 ano após a decisão e é emitido em 30 dias após o pagamento das taxas (art. 64.º). No fim da obra é necessária uma licença/autorização de utilização (art. 52.º). A licença caduca, por exemplo, se a obra não começar em 9 meses após o alvará (art. 61.º).',
        en: 'Work may only start after the alvará is issued (art. 70), which must be requested within 1 year of the decision and is issued within 30 days of paying the fees (art. 64). A use/occupancy licence is needed once finished (art. 52). The permit lapses if, for example, work does not start within 9 months of the alvará (art. 61).',
        nl: 'Werk mag pas beginnen na afgifte van het alvará (art. 70), aan te vragen binnen 1 jaar na de beslissing en afgegeven binnen 30 dagen na betaling van de taxas (art. 64). Na afronding is een gebruiksvergunning nodig (art. 52). De vergunning vervalt bijv. als het werk niet binnen 9 maanden na het alvará start (art. 61).',
      },
      status: 'fact', authority: CAMARA, sources: [RJOU],
    },
    {
      q: { pt: 'O que acontece se construir sem licença?', en: 'What happens if I build without a permit?', nl: 'Wat gebeurt er bij bouwen zonder vergunning?' },
      a: {
        pt: 'Construir sem o alvará exigido é uma contra-ordenação punível com multa de 50.000$00 a 10.000.000$00 para pessoa singular, e até 30.000.000$00 para pessoa coletiva (art. 88.º). O Presidente da Câmara pode ainda embargar a obra e cortar o fornecimento de água, gás e eletricidade (art. 92.º), e ordenar a demolição (art. 95.º). Ignorar as medidas pode constituir crime de desobediência (art. 90.º).',
        en: 'Building without the required alvará is an offence punishable by a fine of 50,000 to 10,000,000 CVE for an individual, and up to 30,000,000 CVE for a company (art. 88). The Council President can also stop the works and cut off water, gas and electricity (art. 92), and order demolition (art. 95). Ignoring the measures can be a crime of disobedience (art. 90).',
        nl: 'Bouwen zonder het vereiste alvará is een overtreding met een boete van 50.000 tot 10.000.000 CVE voor een persoon, en tot 30.000.000 CVE voor een bedrijf (art. 88). De burgemeester kan het werk stilleggen en water, gas en elektra afsluiten (art. 92), en sloop bevelen (art. 95). Het negeren ervan kan een misdrijf van ongehoorzaamheid zijn (art. 90).',
      },
      status: 'fact', authority: CAMARA, sources: [RJOU],
    },
    {
      q: { pt: 'É possível legalizar uma construção já feita?', en: 'Can an already-built construction be legalised?', nl: 'Kan een reeds gebouwde constructie gelegaliseerd worden?' },
      a: {
        pt: 'Sim, através do regime excecional de reconversão e legalização das Áreas Urbanas de Génese Ilegal (AUGI), Decreto-Lei n.º 57/2015. A Câmara Municipal decide o pedido em 90 dias. Este regime cobre construções edificadas sem a licença municipal exigida; as "barracas" (material não permanente) estão excluídas e sujeitas a demolição.',
        en: 'Yes, through the special regime for legalising Illegal-Origin Urban Areas (AUGI), Decree-Law 57/2015. The Municipal Council decides within 90 days. It covers buildings put up without the required municipal licence; "barracas" (non-permanent shacks) are excluded and subject to demolition.',
        nl: 'Ja, via het bijzondere regime voor legalisatie van illegaal-ontstane stedelijke gebieden (AUGI), Decreto-Lei 57/2015. De gemeente beslist binnen 90 dagen. Het dekt bouwwerken zonder de vereiste gemeentevergunning; "barracas" (niet-permanent) zijn uitgesloten en worden gesloopt.',
      },
      status: 'fact', authority: CAMARA, sources: [AUGI],
    },
  ],
};

// ============================================================================
// 3. Buying property + foreigners/diaspora
// ============================================================================
const comprar: KbTopic = {
  slug: 'comprar-imovel',
  title: { pt: 'Comprar imóvel em Cabo Verde (processo e estrangeiros)', en: 'Buying property in Cabo Verde (process and foreigners)', nl: 'Vastgoed kopen in Kaapverdië (proces en buitenlanders)' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Comprar imóvel em Cabo Verde: processo, NIF, estrangeiros e diáspora', en: 'Buying property in Cabo Verde: process, NIF, foreigners and diaspora', nl: 'Vastgoed kopen in Kaapverdië: proces, NIF, buitenlanders en diaspora' },
  seoDesc: {
    pt: 'O processo legal de comprar imóvel em Cabo Verde (CPCV, escritura, registo), o NIF, a regra dos 80 m de costa, o Green Card e o estatuto de investidor emigrante. Informação indicativa, não é aconselhamento jurídico.',
    en: 'The legal process of buying property in Cabo Verde (promissory contract, deed, registration), the NIF, the 80 m coastal rule, the Green Card and emigrant-investor status. Indicative, not legal advice.',
    nl: 'Het juridische koopproces in Kaapverdië (voorlopig contract, akte, registratie), de NIF, de 80m-kustregel, de Green Card en de emigrant-investeerdersstatus. Indicatief, geen juridisch advies.',
  },
  intro: {
    pt: 'Comprar um imóvel em Cabo Verde segue a tradição jurídica portuguesa: contrato-promessa, escritura pública perante notário e registo predial. Estrangeiros e a diáspora podem comprar, com pontos de atenção importantes (costa e impostos).',
    en: 'Buying property in Cabo Verde follows the Portuguese legal tradition: promissory contract, public deed before a notary, and land registration. Foreigners and the diaspora can buy, with important caveats (coast and taxes).',
    nl: 'Vastgoed kopen in Kaapverdië volgt de Portugese juridische traditie: voorlopig contract, notariële akte en kadasterregistratie. Buitenlanders en de diaspora kunnen kopen, met belangrijke aandachtspunten (kust en belasting).',
  },
  entries: [
    {
      q: { pt: 'Quais são os passos legais da compra?', en: 'What are the legal steps to buy?', nl: 'Wat zijn de juridische koopstappen?' },
      a: {
        pt: 'São três atos: (1) o contrato-promessa de compra e venda (CPCV), que vincula as partes, normalmente com sinal; (2) a escritura pública, assinada perante um notário, que transfere a propriedade; (3) o registo predial na Conservatória, que torna a propriedade oponível a terceiros. Ambas as partes precisam de NIF.',
        en: 'Three acts: (1) the promissory purchase contract (CPCV), binding the parties, usually with a deposit; (2) the public deed, signed before a notary, which transfers ownership; (3) registration at the Land Registry, which makes ownership enforceable against third parties. Both parties need a NIF.',
        nl: 'Drie akten: (1) het voorlopige koopcontract (CPCV), dat de partijen bindt, meestal met aanbetaling; (2) de notariële akte, die eigendom overdraagt; (3) registratie bij het kadaster, waardoor eigendom tegenwerpbaar wordt aan derden. Beide partijen hebben een NIF nodig.',
      },
      status: 'fact', authority: NOTARIO, sources: [CONSCV],
    },
    {
      q: { pt: 'O que é o NIF e como o obtenho?', en: 'What is the NIF and how do I get one?', nl: 'Wat is de NIF en hoe krijg ik die?' },
      a: {
        pt: 'O NIF (Número de Identificação Fiscal) é obrigatório para as transações e o registo. É gratuito, pedido presencialmente nas Repartições de Finanças ou na Casa do Cidadão, com o modelo 110. Não residentes apresentam cópia do passaporte. A página oficial não indica a obrigatoriedade de um representante fiscal para não residentes (fontes secundárias dizem que sim, a confirmar).',
        en: 'The NIF (tax number) is required for the transactions and registration. It is free, requested in person at Finance offices or Casa do Cidadão, using form 110. Non-residents present a passport copy. The official page does not state that non-residents must appoint a fiscal representative (secondary sources say so, to confirm).',
        nl: 'De NIF (belastingnummer) is verplicht voor de transacties en registratie. Gratis, in persoon aan te vragen bij Finanças of Casa do Cidadão, met formulier 110. Niet-ingezetenen tonen een paspoortkopie. De officiële pagina noemt geen verplichte fiscale vertegenwoordiger voor niet-ingezetenen (secundaire bronnen wel, te bevestigen).',
      },
      status: 'fact', authority: { pt: 'DNRE (Autoridade Tributária) e Casa do Cidadão.', en: 'DNRE (Tax Authority) and Casa do Cidadão.', nl: 'DNRE (belastingdienst) en Casa do Cidadão.' }, sources: [DNRE_NIF],
    },
    {
      q: { pt: 'Um estrangeiro pode comprar? E junto ao mar?', en: 'Can a foreigner buy? And near the sea?', nl: 'Mag een buitenlander kopen? En aan zee?' },
      a: {
        pt: 'Não encontrámos uma lei que imponha uma restrição geral à compra por estrangeiros de imóvel urbano (a afirmação "mesmos direitos que os nacionais" é comum mas não foi localizada em lei; a confirmar). A restrição legal confirmada é a costa: uma faixa de 80 m a partir da linha de costa é domínio público marítimo, inalienável, não podendo ser propriedade privada (Lei 44/VI/2004). Junto ao mar, confirme com a Câmara e o INGT se o terreno está dentro dessa faixa e se vende propriedade ou apenas concessão.',
        en: 'We did not find a law imposing a general restriction on foreigners buying urban property (the "same rights as nationals" claim is common but not located in law; to confirm). The confirmed legal restriction is the coast: an 80 m strip from the shoreline is maritime public domain, inalienable and cannot be private property (Law 44/VI/2004). Near the sea, confirm with the Council and INGT whether the plot is within that strip and whether ownership or only a concession is being sold.',
        nl: 'We vonden geen wet met een algemene beperking op koop door buitenlanders van stedelijk vastgoed (de bewering "gelijke rechten als burgers" is gangbaar maar niet in wet gevonden; te bevestigen). De bevestigde wettelijke beperking is de kust: een strook van 80 m vanaf de kustlijn is onvervreemdbaar publiek zeedomein en kan geen privé-eigendom zijn (wet 44/VI/2004). Bevestig aan zee bij de gemeente en INGT of het perceel binnen die strook ligt en of eigendom of alleen concessie wordt verkocht.',
      },
      status: 'fact', authority: NOTARIO, sources: [COASTAL],
    },
    {
      q: { pt: 'Existe residência para investidores (Green Card)?', en: 'Is there residence for investors (Green Card)?', nl: 'Is er verblijf voor investeerders (Green Card)?' },
      a: {
        pt: 'Sim. A Lei n.º 30/IX/2018 cria um estatuto de segunda residência ("Green Card") para estrangeiros que investem em imóveis, com residência permanente sem obrigação de residir, incluindo cônjuge e filhos. Anúncios do Governo referem limiares de investimento de €80.000 e €120.000 conforme a ilha (a confirmar os valores atuais). Atenção: os benefícios fiscais foram escritos sobre o IUP, revogado em 2026, pelo que a sua aplicação ao ITI/IPI deve ser confirmada.',
        en: 'Yes. Law 30/IX/2018 creates a second-residence "Green Card" status for foreigners who invest in property, granting permanent residence with no obligation to live there, including spouse and children. Government announcements cite investment thresholds of €80,000 and €120,000 depending on the island (confirm current amounts). Note: the tax benefits were written against IUP, repealed in 2026, so their application to ITI/IPI must be confirmed.',
        nl: 'Ja. Wet 30/IX/2018 creëert een tweede-verblijfsstatus ("Green Card") voor buitenlanders die in vastgoed investeren, met permanent verblijf zonder verblijfsplicht, inclusief partner en kinderen. Regeringsaankondigingen noemen investeringsdrempels van €80.000 en €120.000 afhankelijk van het eiland (actuele bedragen te bevestigen). Let op: de belastingvoordelen zijn geschreven tegen de in 2026 ingetrokken IUP, dus toepassing op ITI/IPI moet bevestigd worden.',
      },
      status: 'verify', authority: { pt: 'Casa do Cidadão e o Ministério das Finanças.', en: 'Casa do Cidadão and the Ministry of Finance.', nl: 'Casa do Cidadão en het ministerie van Financiën.' }, sources: [GREENCARD],
    },
    {
      q: { pt: 'E para a diáspora cabo-verdiana?', en: 'And for the Cabo Verdean diaspora?', nl: 'En voor de Kaapverdiaanse diaspora?' },
      a: {
        pt: 'Existe o Estatuto do Investidor Emigrante: um emigrante cabo-verdiano com residência permanente no estrangeiro pode obter um certificado válido por 5 anos, depois de o investimento ser qualificado pela Cabo Verde TradeInvest, através do Balcão Único aos Emigrantes. Inclui incentivos fiscais e aduaneiros (confirme os valores atuais junto da entidade).',
        en: 'There is the Emigrant Investor Status: a Cabo Verdean emigrant with permanent residence abroad can obtain a 5-year certificate once the investment is qualified by Cabo Verde TradeInvest, via the Emigrants’ Single Window. It includes tax and customs incentives (confirm current figures with the authority).',
        nl: 'Er is de Emigrant-Investeerdersstatus: een Kaapverdiaanse emigrant met permanent verblijf in het buitenland kan een 5-jarig certificaat krijgen zodra de investering is gekwalificeerd door Cabo Verde TradeInvest, via het Emigranten-loket. Inclusief fiscale en douanevoordelen (bevestig actuele cijfers bij de instantie).',
      },
      status: 'fact', authority: { pt: 'Cabo Verde TradeInvest e o Ministério das Finanças.', en: 'Cabo Verde TradeInvest and the Ministry of Finance.', nl: 'Cabo Verde TradeInvest en het ministerie van Financiën.' }, sources: [EMIGRANTE],
    },
  ],
};

// ============================================================================
// 4. Land & registration
// ============================================================================
const terrenos: KbTopic = {
  slug: 'comprar-terreno',
  title: { pt: 'Comprar terreno e registo predial em Cabo Verde', en: 'Buying land and property registration in Cabo Verde', nl: 'Grond kopen en kadasterregistratie in Kaapverdië' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Comprar terreno em Cabo Verde: registo predial, cadastro e cuidados', en: 'Buying land in Cabo Verde: registry, cadastre and due diligence', nl: 'Grond kopen in Kaapverdië: kadaster, cadastro en checks' },
  seoDesc: {
    pt: 'Antes de comprar terreno em Cabo Verde: certidão do registo predial, cadastro do INGT, a regra dos 80 m de costa e a diferença entre propriedade plena e direito de superfície. Informação indicativa, não é aconselhamento jurídico.',
    en: 'Before buying land in Cabo Verde: land-registry certificate, INGT cadastre, the 80 m coastal rule and full ownership vs surface right. Indicative, not legal advice.',
    nl: 'Voordat je grond koopt in Kaapverdië: kadasteruittreksel, INGT-cadastro, de 80m-kustregel en volledig eigendom vs opstalrecht. Indicatief, geen juridisch advies.',
  },
  intro: {
    pt: 'Comprar terreno exige verificar quem é o dono legal e o que exatamente se compra. Em Cabo Verde, a propriedade prova-se pelo registo predial (Conservatória) e o terreno é identificado pelo cadastro (INGT).',
    en: 'Buying land means checking who the legal owner is and exactly what you are buying. In Cabo Verde, ownership is proven by the land registry (Conservatória) and the plot is identified by the cadastre (INGT).',
    nl: 'Grond kopen betekent nagaan wie de wettelijke eigenaar is en wat je precies koopt. In Kaapverdië wordt eigendom bewezen door het kadaster (Conservatória) en wordt het perceel geïdentificeerd door het cadastro (INGT).',
  },
  entries: [
    {
      q: { pt: 'Como confirmo quem é o dono legal?', en: 'How do I confirm the legal owner?', nl: 'Hoe bevestig ik de wettelijke eigenaar?' },
      a: {
        pt: 'Peça uma Certidão de Registo Predial atualizada na Conservatória: mostra o dono registado e quaisquer ónus (hipotecas, penhoras). É o registo que confere a presunção de propriedade, e o registo é atualmente obrigatório (Código do Registo Predial, DL 10/2010). Confirme que o vendedor é mesmo o dono registado.',
        en: 'Ask for an up-to-date Land Registry Certificate at the Conservatória: it shows the registered owner and any charges (mortgages, liens). Registration confers the presumption of ownership and is now mandatory (Land Registry Code, DL 10/2010). Confirm the seller is the registered owner.',
        nl: 'Vraag een actueel kadasteruittreksel (Certidão de Registo Predial) bij de Conservatória: het toont de geregistreerde eigenaar en eventuele lasten (hypotheken, beslagen). Registratie geeft het vermoeden van eigendom en is nu verplicht (kadasterwet, DL 10/2010). Bevestig dat de verkoper de geregistreerde eigenaar is.',
      },
      status: 'fact', authority: { pt: 'A Conservatória do Registo Predial (DGRNI).', en: 'The Land Registry (DGRNI).', nl: 'Het kadaster (DGRNI).' }, sources: [REGPREDIAL, DGRNI],
    },
    {
      q: { pt: 'O que é o cadastro do INGT?', en: 'What is the INGT cadastre?', nl: 'Wat is het INGT-cadastro?' },
      a: {
        pt: 'O cadastro predial, gerido pelo INGT, é o registo administrativo que identifica e mapeia fisicamente cada parcela. É diferente do registo predial: o cadastro caracteriza o terreno; o registo estabelece a propriedade. Confirme que os limites no terreno coincidem com o mapa cadastral. Um novo regime do cadastro está em vigor desde 2024.',
        en: 'The property cadastre, run by INGT, is the administrative record that identifies and physically maps each parcel. It differs from the land registry: the cadastre characterises the plot; the registry establishes ownership. Confirm the on-the-ground boundaries match the cadastral map. A new cadastre regime has been in force since 2024.',
        nl: 'Het cadastro predial, beheerd door INGT, is het administratieve register dat elk perceel fysiek identificeert en in kaart brengt. Het verschilt van het kadaster: het cadastro karakteriseert het perceel; het kadaster vestigt eigendom. Bevestig dat de grenzen ter plaatse overeenkomen met de cadastrale kaart. Sinds 2024 geldt een nieuw cadastro-regime.',
      },
      status: 'fact', authority: { pt: 'O INGT.', en: 'INGT.', nl: 'INGT.' }, sources: [INGT],
    },
    {
      q: { pt: 'Cuidado especial junto ao mar?', en: 'Special care near the sea?', nl: 'Speciale voorzichtigheid aan zee?' },
      a: {
        pt: 'Sim. Uma faixa de 80 m a partir da linha de costa é domínio público marítimo, inalienável e imprescritível, não podendo ser propriedade privada; o uso é apenas por concessão (Lei 44/VI/2004 e Constituição). Existem construções costeiras vendidas como "privadas" que legalmente só podem ser concessão. Confirme sempre por escrito com a Câmara e o INGT.',
        en: 'Yes. An 80 m strip from the shoreline is maritime public domain, inalienable and imprescriptible, and cannot be private property; use is only by concession (Law 44/VI/2004 and the Constitution). Some coastal buildings are sold as "private" when legally they can only be a concession. Always confirm in writing with the Council and INGT.',
        nl: 'Ja. Een strook van 80 m vanaf de kustlijn is onvervreemdbaar en onverjaarbaar publiek zeedomein en kan geen privé-eigendom zijn; gebruik enkel via concessie (wet 44/VI/2004 en Grondwet). Sommige kustgebouwen worden als "privé" verkocht terwijl ze wettelijk alleen concessie kunnen zijn. Bevestig altijd schriftelijk bij de gemeente en INGT.',
      },
      status: 'fact', authority: { pt: 'A Câmara Municipal e o INGT.', en: 'The Municipal Council and INGT.', nl: 'De gemeente en INGT.' }, sources: [COASTAL],
    },
    {
      q: { pt: 'Compro propriedade plena ou direito de superfície?', en: 'Am I buying full ownership or a surface right?', nl: 'Koop ik vol eigendom of een opstalrecht?' },
      a: {
        pt: 'Confirme sempre. A propriedade plena inclui o solo e a construção; o direito de superfície é apenas o direito de construir/manter uma obra em terreno alheio, muitas vezes por prazo limitado, ficando o solo com o proprietário. É uma fonte comum de confusão, sobretudo em terrenos do Estado/município e na costa. Peça ao notário/advogado para verificar o título.',
        en: 'Always confirm. Full ownership includes the soil and the building; a surface right is only the right to build/keep a construction on someone else’s land, often time-limited, with the soil staying with the owner. It is a common source of confusion, especially on State/municipal and coastal land. Have the notary/lawyer check the title.',
        nl: 'Bevestig altijd. Vol eigendom omvat grond en gebouw; een opstalrecht is enkel het recht om op andermans grond te bouwen/behouden, vaak tijdelijk, waarbij de grond bij de eigenaar blijft. Een veelvoorkomende verwarring, vooral bij staats-/gemeentegrond en aan de kust. Laat de notaris/advocaat de titel controleren.',
      },
      status: 'verify', authority: NOTARIO, sources: [CONSCV],
    },
  ],
};

// ============================================================================
// 5. Municipalities & e-government (with directory)
// ============================================================================
const camaras: KbTopic = {
  slug: 'camaras-e-servicos-publicos',
  title: { pt: 'Câmaras municipais e serviços do Estado', en: 'Municipalities and State services', nl: 'Gemeenten en overheidsdiensten' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Câmaras municipais de Cabo Verde e serviços do Estado (Casa do Cidadão)', en: 'Cabo Verde municipalities and State services (Casa do Cidadão)', nl: 'Gemeenten van Kaapverdië en overheidsdiensten (Casa do Cidadão)' },
  seoDesc: {
    pt: 'Contactos oficiais das câmaras municipais de Cabo Verde e como aceder aos serviços do Estado através da Casa do Cidadão e do portal Porton di Nôs Ilha.',
    en: 'Official contacts of Cabo Verde’s municipalities and how to access State services via Casa do Cidadão and the Porton di Nôs Ilha portal.',
    nl: 'Officiële contacten van de gemeenten van Kaapverdië en toegang tot overheidsdiensten via Casa do Cidadão en het portaal Porton di Nôs Ilha.',
  },
  intro: {
    pt: 'Muitos serviços públicos passam pela câmara municipal (licenças, valor patrimonial) ou pela Casa do Cidadão (NIF, certidões, empresas). Abaixo, os pontos de acesso nacionais e os contactos oficiais das câmaras.',
    en: 'Many public services go through the municipal council (licences, property value) or Casa do Cidadão (NIF, certificates, companies). Below, the national access points and official council contacts.',
    nl: 'Veel overheidsdiensten lopen via de gemeente (vergunningen, waarde) of via Casa do Cidadão (NIF, certificaten, bedrijven). Hieronder de nationale toegangspunten en officiële gemeentecontacten.',
  },
  entries: [
    {
      q: { pt: 'Como acedo aos serviços do Estado online?', en: 'How do I access State services online?', nl: 'Hoe krijg ik online toegang tot overheidsdiensten?' },
      a: {
        pt: 'Através da Casa do Cidadão e do portal Porton di Nôs Ilha, com atendimento presencial (balcões na Praia, Sal e São Vicente, e na diáspora, incluindo Roterdão), por telefone (linha 800 20 08) e online. Serviços: certidões online, declaração de NIF, Empresa no Dia, certificado de admissibilidade de firma, registo criminal.',
        en: 'Through Casa do Cidadão and the Porton di Nôs Ilha portal, with in-person desks (Praia, Sal, São Vicente, and diaspora including Rotterdam), by phone (line 800 20 08) and online. Services: online certificates, NIF declaration, same-day company (Empresa no Dia), company-name certificate, criminal record.',
        nl: 'Via Casa do Cidadão en het portaal Porton di Nôs Ilha, met loketten (Praia, Sal, São Vicente, en diaspora waaronder Rotterdam), telefonisch (lijn 800 20 08) en online. Diensten: online certificaten, NIF-aangifte, bedrijf-op-één-dag (Empresa no Dia), bedrijfsnaamcertificaat, strafblad.',
      },
      status: 'fact', authority: { pt: 'Casa do Cidadão.', en: 'Casa do Cidadão.', nl: 'Casa do Cidadão.' }, sources: [PORTON],
    },
    {
      q: { pt: 'Que licenças trata a câmara municipal?', en: 'Which licences does the municipality handle?', nl: 'Welke vergunningen behandelt de gemeente?' },
      a: {
        pt: 'A câmara municipal licencia, entre outros, as obras de construção e o comércio a retalho (regime simplificado). O comércio por grosso e a importação/exportação são licenciados pelas Câmaras de Comércio. Cada câmara publica os seus próprios formulários, taxas e prazos.',
        en: 'The municipality licenses, among others, construction works and retail commerce (simplified regime). Wholesale commerce and import/export are licensed by the Chambers of Commerce. Each council publishes its own forms, fees and deadlines.',
        nl: 'De gemeente vergunt o.a. bouwwerken en detailhandel (vereenvoudigd regime). Groothandel en import/export worden vergund door de Kamers van Koophandel. Elke gemeente publiceert eigen formulieren, tarieven en termijnen.',
      },
      status: 'fact', authority: CAMARA, sources: [COMERCIO],
    },
  ],
  directory: {
    caption: { pt: 'Contactos oficiais das câmaras municipais (confirme antes de usar; alguns sites estavam indisponíveis).', en: 'Official municipal contacts (confirm before use; some sites were unavailable).', nl: 'Officiële gemeentecontacten (bevestig voor gebruik; sommige sites waren onbereikbaar).' },
    items: [
      { name: 'CM São Vicente', island: 'São Vicente', website: 'cmsv.cv', contact: '+238 232 52 10 · cmsv@cmsv.cv', status: 'fact' },
      { name: 'CM Praia', island: 'Santiago', website: 'cmpraia.cv', contact: '+238 534 7000 · lojacmp.com', status: 'fact' },
      { name: 'CM Sal', island: 'Sal', website: 'camaramunicipaldosal.com', contact: '+238 333 4008', status: 'fact' },
      { name: 'CM São Filipe', island: 'Fogo', website: 'cmsf.cv', contact: '+238 281 1313 · cmsf@cmsf.cv', status: 'fact' },
      { name: 'CM Mosteiros', island: 'Fogo', website: 'cmmost.cv', contact: '+238 283 1038', status: 'fact' },
      { name: 'CM Porto Novo', island: 'Santo Antão', website: 'cmportonovo.cv', contact: 'Linha Verde 800 00 44', status: 'verify' },
      { name: 'CM Ribeira Grande', island: 'Santo Antão', contact: '+238 225 1169', status: 'verify' },
      { name: 'CM Paúl', island: 'Santo Antão', contact: '+238 223 1482', status: 'verify' },
      { name: 'CM Boa Vista', island: 'Boa Vista', website: 'municipiodaboavista.com', contact: '+238 251 1116', status: 'verify' },
      { name: 'CM Maio', island: 'Maio', website: 'municipiodomaio.cv', contact: '+238 255 1760', status: 'verify' },
      { name: 'CM Ribeira Brava', island: 'São Nicolau', website: 'cmrb.cv', contact: 'geral@cmrb.cv', status: 'verify' },
      { name: 'CM Tarrafal de São Nicolau', island: 'São Nicolau', website: 'cmtsn.cv', contact: '+238 938 5631', status: 'verify' },
      { name: 'CM Brava', island: 'Brava', contact: '+238 285 1295', status: 'verify' },
      { name: 'CM Santa Catarina', island: 'Santiago', website: 'cmscst.cv', status: 'verify' },
      { name: 'CM Santa Cruz', island: 'Santiago', website: 'cmscz.cv', status: 'verify' },
      { name: 'CM São Domingos', island: 'Santiago', website: 'cmsd.cv', status: 'verify' },
      { name: 'CM Tarrafal', island: 'Santiago', website: 'cmt.cv', contact: '+238 266 1155', status: 'verify' },
      { name: 'CM Ribeira Grande de Santiago', island: 'Santiago', website: 'cmrgs.cv', contact: '+238 267 1140', status: 'verify' },
      { name: 'CM Santa Catarina do Fogo', island: 'Fogo', website: 'santacatarinafogo.cv', status: 'verify' },
    ],
  },
};

// ============================================================================
// 6. Starting & licensing a business
// ============================================================================
const empresas: KbTopic = {
  slug: 'abrir-empresa',
  title: { pt: 'Abrir e licenciar uma empresa em Cabo Verde', en: 'Starting and licensing a business in Cabo Verde', nl: 'Een bedrijf oprichten en licentiëren in Kaapverdië' },
  updated: '2026-07-23',
  seoTitle: { pt: 'Abrir empresa em Cabo Verde: NIF, Empresa no Dia e licenças', en: 'Start a business in Cabo Verde: NIF, Empresa no Dia and licences', nl: 'Bedrijf starten in Kaapverdië: NIF, Empresa no Dia en licenties' },
  seoDesc: {
    pt: 'Como abrir uma empresa em Cabo Verde: obter o NIF (gratuito), constituir a sociedade com a Empresa no Dia, inscrever no INPS e licenciar o comércio. Informação indicativa, confirme com a Casa do Cidadão.',
    en: 'How to start a business in Cabo Verde: get the NIF (free), incorporate via Empresa no Dia, register with INPS and license the trade. Indicative, confirm with Casa do Cidadão.',
    nl: 'Hoe start je een bedrijf in Kaapverdië: NIF (gratis), oprichten via Empresa no Dia, inschrijven bij INPS en de handel licentiëren. Indicatief, bevestig bij Casa do Cidadão.',
  },
  intro: {
    pt: 'Abrir uma empresa em Cabo Verde é rápido: com o regime Empresa no Dia, a sociedade pode ser constituída em menos de 24 horas na Casa do Cidadão. Seguem os passos essenciais, com as respetivas fontes oficiais.',
    en: 'Starting a company in Cabo Verde is fast: with the Empresa no Dia regime, a company can be incorporated in under 24 hours at Casa do Cidadão. Here are the essential steps with their official sources.',
    nl: 'Een bedrijf starten in Kaapverdië gaat snel: met het Empresa no Dia-regime kan een vennootschap in minder dan 24 uur worden opgericht bij Casa do Cidadão. Hier de essentiële stappen met officiële bronnen.',
  },
  entries: [
    {
      q: { pt: 'Como obtenho o NIF da empresa?', en: 'How do I get the company NIF?', nl: 'Hoe krijg ik de bedrijfs-NIF?' },
      a: {
        pt: 'O NIF é gratuito e pedido presencialmente nas Repartições de Finanças ou na Casa do Cidadão, com o modelo 110. Para uma sociedade é necessário o certificado de admissibilidade da firma e documentos que provem a existência legal. Entidades não residentes juntam prova de existência autenticada por cônsul, com tradução em português se necessário.',
        en: 'The NIF is free, requested in person at Finance offices or Casa do Cidadão, using form 110. For a company you need the company-name certificate and documents proving legal existence. Non-resident entities add proof of existence authenticated by a consul, translated into Portuguese if needed.',
        nl: 'De NIF is gratis, in persoon aan te vragen bij Finanças of Casa do Cidadão, met formulier 110. Voor een vennootschap heb je het bedrijfsnaamcertificaat en bewijs van rechtsbestaan nodig. Niet-ingezeten entiteiten voegen een door een consul gewaarmerkt bewijs toe, met Portugese vertaling indien nodig.',
      },
      status: 'fact', authority: { pt: 'DNRE e Casa do Cidadão.', en: 'DNRE and Casa do Cidadão.', nl: 'DNRE en Casa do Cidadão.' }, sources: [DNRE_NIF],
    },
    {
      q: { pt: 'O que é a Empresa no Dia?', en: 'What is Empresa no Dia?', nl: 'Wat is Empresa no Dia?' },
      a: {
        pt: 'É um regime que permite constituir e pôr a funcionar uma sociedade (Lda., Unipessoal, SA) de forma imediata, na Casa do Cidadão, com base no Decreto-Lei n.º 9/2008. Empresas cujo capital é realizado com bens em espécie (por exemplo, imóveis) ou atividades que exigem autorização prévia seguem pela Conservatória do Registo Comercial.',
        en: 'A regime allowing you to incorporate and start operating a company (Lda., single-member, SA) immediately, at Casa do Cidadão, based on Decree-Law 9/2008. Companies whose capital is contributed in kind (e.g. real estate) or activities requiring prior authorisation go through the Commercial Registry instead.',
        nl: 'Een regime om onmiddellijk een vennootschap (Lda., eenmans, SA) op te richten en te laten draaien, bij Casa do Cidadão, op basis van Decreto-Lei 9/2008. Bedrijven met inbreng in natura (bijv. vastgoed) of activiteiten die voorafgaande toestemming vereisen lopen via het handelsregister.',
      },
      status: 'fact', authority: { pt: 'Casa do Cidadão.', en: 'Casa do Cidadão.', nl: 'Casa do Cidadão.' }, sources: [END, PORTON],
    },
    {
      q: { pt: 'Tenho de inscrever-me na segurança social (INPS)?', en: 'Must I register for social security (INPS)?', nl: 'Moet ik me inschrijven voor sociale zekerheid (INPS)?' },
      a: {
        pt: 'Sim. A entidade patronal deve inscrever-se como contribuinte no INPS no prazo de 15 dias após o início da atividade, e inscrever cada trabalhador no prazo de 30 dias. Documentos incluem o boletim de inscrição, cópia do alvará, a publicação da constituição no Boletim Oficial e o NIF.',
        en: 'Yes. The employer must register as a contributor with INPS within 15 days of starting activity, and register each worker within 30 days. Documents include the registration form, a copy of the licence, the Boletim Oficial publication of incorporation and the NIF.',
        nl: 'Ja. De werkgever moet zich binnen 15 dagen na de start als bijdrager bij INPS inschrijven, en elke werknemer binnen 30 dagen. Documenten omvatten het inschrijfformulier, een kopie van de licentie, de Boletim Oficial-publicatie en de NIF.',
      },
      status: 'fact', authority: { pt: 'O INPS.', en: 'INPS.', nl: 'INPS.' }, sources: [INPS],
    },
    {
      q: { pt: 'Como licencio o meu comércio?', en: 'How do I license my trade?', nl: 'Hoe licentieer ik mijn handel?' },
      a: {
        pt: 'O comércio a retalho é licenciado pela Câmara Municipal (regime simplificado). O comércio por grosso e a importação/exportação são licenciados pelas Câmaras de Comércio, com taxas oficiais publicadas no Portal do Comércio (por exemplo, licença de importador 20.000 CVE mais taxa de inspeção 10.000 CVE; taxa de exportador 20.000 CVE). Atividades específicas (turismo, indústria, alimentar) exigem autorizações setoriais.',
        en: 'Retail trade is licensed by the Municipal Council (simplified regime). Wholesale and import/export are licensed by the Chambers of Commerce, with official fees published on the Portal do Comércio (e.g. importer licence 20,000 CVE plus 10,000 CVE inspection fee; exporter fee 20,000 CVE). Specific activities (tourism, industry, food) need sector authorisations.',
        nl: 'Detailhandel wordt vergund door de gemeente (vereenvoudigd regime). Groothandel en import/export door de Kamers van Koophandel, met officiële tarieven op het Portal do Comércio (bijv. importeurslicentie 20.000 CVE plus inspectietaxe 10.000 CVE; exporteurtaxe 20.000 CVE). Specifieke activiteiten (toerisme, industrie, voeding) vereisen sectorvergunningen.',
      },
      status: 'fact', authority: { pt: 'A Câmara Municipal e a Câmara de Comércio.', en: 'The Municipal Council and the Chamber of Commerce.', nl: 'De gemeente en de Kamer van Koophandel.' }, sources: [COMERCIO],
    },
  ],
};

export const KB_TOPICS: Record<string, KbTopic> = {
  [impostos.slug]: impostos,
  [construcao.slug]: construcao,
  [comprar.slug]: comprar,
  [terrenos.slug]: terrenos,
  [camaras.slug]: camaras,
  [empresas.slug]: empresas,
};

export const KB_SLUGS: string[] = Object.keys(KB_TOPICS);
