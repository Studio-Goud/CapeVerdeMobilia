// Server-side data access. Uses Supabase when configured; otherwise falls back
// to the fictional demo content so the site keeps working during onboarding.
import {
  LISTINGS, getListing as demoGetListing, PROFESSIONALS, getProfessional as demoGetProfessional,
  type Listing, type TL, type VerificationLevel,
} from '@/i18n';
import { SUPPLIERS, TENDERS, PROJECTS } from '@/content';
import { getServerSupabase } from './supabase/server';
import { PLACEHOLDER_IMAGE as PLACEHOLDER } from './placeholder';

interface ListingRow {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  owner: string | null; latitude: number | null; longitude: number | null; photos: string[] | null;
  published_at: string | null; created_at: string; last_verified_at: string | null; risk_notes: TL | null;
  property: Listing['property']; land: Listing['land'];
}

const EMPTY_TL: TL = { pt: '', en: '', nl: '' };

function rowToListing(r: ListingRow): Listing {
  return {
    id: r.id, slug: r.slug, kind: r.kind,
    title: r.title, description: r.description ?? EMPTY_TL,
    priceAmount: r.price_amount, priceOnRequest: r.price_on_request, isFeatured: r.is_featured,
    documentStatus: r.document_status, island: r.island ?? '', municipality: r.municipality ?? '',
    owner: r.owner, latitude: r.latitude, longitude: r.longitude, photos: r.photos,
    thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
    lastVerifiedAt: r.last_verified_at, riskNotes: r.risk_notes, property: r.property, land: r.land,
  };
}

const demoProperties = (): Listing[] => LISTINGS.filter((l) => l.kind !== 'SERVICE');
const demoServices = (): Listing[] => LISTINGS.filter((l) => l.kind === 'SERVICE');

/** Published property/land listings (services excluded), or demo fallback. */
export async function fetchListings(): Promise<Listing[]> {
  const supabase = getServerSupabase();
  if (!supabase) return demoProperties();
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .neq('kind', 'SERVICE')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });
  // Demo content only when there is no backend. On a configured site an empty
  // result is a real empty state — never show fictional listings as if live.
  if (error || !data) return [];
  return (data as ListingRow[]).map(rowToListing);
}

/** Published service advertisements, or demo fallback. */
export async function fetchServiceListings(): Promise<Listing[]> {
  const supabase = getServerSupabase();
  if (!supabase) return demoServices();
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .eq('kind', 'SERVICE')
    .order('published_at', { ascending: false });
  if (error || !data) return [];
  return (data as ListingRow[]).map(rowToListing);
}

export async function fetchListingBySlug(slug: string): Promise<Listing | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return demoGetListing(slug);
  const { data, error } = await supabase.from('listings').select('*').eq('slug', slug).maybeSingle();
  if (error || !data) return undefined;
  return rowToListing(data as ListingRow);
}

// --- Official information centre (publications) ---
export type OfficialStatus = 'official' | 'summary' | 'unconfirmed' | 'outdated' | 'in_revision';
export interface InfoItem {
  id: string | null; slug: string; category: string | null; title: TL;
  govEntity: string | null; officialStatus: OfficialStatus; version: number;
  sourceUrl: string | null; summary: TL | null; body: TL | null;
  publishedAt: string | null; updatedAt: string | null;
}
interface PubRow {
  id: string; slug: string; category: string | null; title: TL; gov_entity: string | null;
  official_status: OfficialStatus; version: number; source_url: string | null;
  summary: TL | null; body: TL | null; published_at: string | null; updated_at: string | null;
}
function pubRowToItem(r: PubRow): InfoItem {
  return {
    id: r.id, slug: r.slug, category: r.category, title: r.title, govEntity: r.gov_entity,
    officialStatus: r.official_status, version: r.version, sourceUrl: r.source_url,
    summary: r.summary, body: r.body, publishedAt: r.published_at, updatedAt: r.updated_at,
  };
}

const DEMO_INFO: InfoItem[] = [
  { id: null, slug: 'inquilino-recusa-sair', category: 'arrendamento',
    title: { pt: 'Inquilino que se recusa a sair: o que pode fazer o senhorio', en: 'Tenant who refuses to leave: what a landlord can do', nl: 'Huurder die weigert te vertrekken: wat kan de verhuurder doen' },
    govEntity: 'Resumo da plataforma — validação jurídica necessária', officialStatus: 'summary', version: 2, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Resumo indicativo. O senhorio não pode despejar pela força nem por meios próprios: a saída resolve-se por via judicial (ação de despejo). O arrendamento urbano rege-se pela Lei n.º 101/VIII/2016 (Regime Geral do Arrendamento Urbano) e pelo Código Civil. Recomenda-se advogado.', en: 'Indicative summary. A landlord may not evict by force or self-help: removal is resolved through the courts (eviction claim). Urban tenancy is governed by Law 101/VIII/2016 (General Urban Tenancy Regime) and the Civil Code. A lawyer is recommended.', nl: 'Indicatieve samenvatting. Een verhuurder mag niet met geweld of eigenmachtig ontruimen: vertrek verloopt via de rechter (ontruimingsvordering). Stedelijke huur valt onder Wet 101/VIII/2016 (Algemeen Regime Stedelijke Huur) en het Burgerlijk Wetboek. Een advocaat wordt aangeraden.' },
    body: { pt: 'Passos gerais e indicativos (não constituem aconselhamento jurídico):\n\n1) Comunicar por escrito ao inquilino a cessação do contrato, respeitando os prazos legais.\n2) Se o inquilino não sair no prazo, procurar aconselhamento jurídico.\n3) Instaurar a ação de despejo no tribunal competente, pedindo a entrega do imóvel.\n4) NUNCA trocar fechaduras, cortar água/luz ou retirar bens por conta própria — é ilegal.\n5) Confirmar procedimento, prazos e requisitos no Boletim Oficial e com um advogado.\n\nBase legal citada (FACTO, a confirmar): Lei n.º 101/VIII/2016, de 6 de janeiro — Regime Geral do Arrendamento Urbano; Código Civil. Verificação jurídica necessária.', en: 'General, indicative steps (not legal advice):\n\n1) Notify the tenant in writing of the contract termination, respecting statutory notice periods.\n2) If the tenant does not leave in time, seek legal advice.\n3) Bring an eviction claim (ação de despejo) before the competent court, requesting return of the property.\n4) NEVER change locks, cut water/power or remove belongings yourself — it is unlawful.\n5) Confirm procedure, deadlines and requirements in the Official Gazette and with a lawyer.\n\nCited legal basis (FACT, to be confirmed): Law 101/VIII/2016 of 6 January — General Urban Tenancy Regime; Civil Code. Legal verification required.', nl: 'Algemene, indicatieve stappen (geen juridisch advies):\n\n1) Informeer de huurder schriftelijk over de beëindiging van het contract, met inachtneming van de wettelijke termijnen.\n2) Vertrekt de huurder niet op tijd, win dan juridisch advies in.\n3) Start een ontruimingsvordering (ação de despejo) bij de bevoegde rechter en vorder teruggave van het pand.\n4) Verander NOOIT zelf de sloten, sluit geen water/stroom af en verwijder geen spullen — dat is onwettig.\n5) Bevestig procedure, termijnen en vereisten in het Boletim Oficial en bij een advocaat.\n\nAangehaalde rechtsgrond (FEIT, te bevestigen): Wet 101/VIII/2016 van 6 januari — Algemeen Regime Stedelijke Huur; Burgerlijk Wetboek. Juridische verificatie vereist.' },
    publishedAt: '2026-07-01', updatedAt: '2026-07-21' },
  { id: null, slug: 'reforma-fiscal-imobiliaria-2026', category: 'impostos',
    title: { pt: 'Reforma fiscal imobiliária 2026: fim do IUP, entram o ITI e o IPI', en: '2026 real-estate tax reform: IUP ends, ITI and IPI begin', nl: 'Vastgoedbelastinghervorming 2026: einde IUP, komst ITI en IPI' },
    govEntity: 'Resumo da plataforma — confirmar com a Autoridade Tributária', officialStatus: 'summary', version: 2, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Desde 1 de janeiro de 2026 o IUP foi substituído por dois impostos: o ITI (Imposto sobre a Transmissão de Imóveis) e o IPI (Imposto sobre a Propriedade de Imóveis). Confirmar taxas e isenções com a Autoridade Tributária.', en: 'Since 1 January 2026 the IUP has been replaced by two taxes: ITI (property Transfer tax) and IPI (property Ownership tax). Confirm rates and exemptions with the tax authority.', nl: 'Sinds 1 januari 2026 is de IUP vervangen door twee belastingen: de ITI (overdrachtsbelasting) en de IPI (eigendomsbelasting). Bevestig tarieven en vrijstellingen bij de Belastingdienst.' },
    body: { pt: 'O que mudou (FACTO, fontes indicadas abaixo):\n\n• ITI — Imposto sobre a Transmissão de Imóveis (código cITI), aprovado pela Lei n.º 54/X/2025, publicada em 6 de junho de 2025. Taxa geral indicada: 1%, subindo para 3% quando uma das partes beneficia de tratamento fiscal privilegiado.\n• IPI — Imposto sobre a Propriedade de Imóveis (código cIPI), aprovado pela Lei n.º 55/X/2025. Taxa geral indicada: 0,1%; terrenos 0,15%; taxas mais altas para prédios devolutos, em ruína ou urbanização incompleta.\n• Entrada em vigor: 1 de janeiro de 2026.\n\nEstas taxas são indicativas e podem ter isenções, escalões ou atualizações. Antes de comprar, vender ou declarar, confirme os valores em vigor com a Autoridade Tributária e no Boletim Oficial. Este texto é um resumo informativo da plataforma e não substitui informação oficial.\n\nFontes: PwC (flash fiscal Cabo Verde, 2025); Boletim Oficial. Verificação necessária.', en: 'What changed (FACT, sources below):\n\n• ITI — property Transfer tax (code cITI), approved by Law 54/X/2025, published 6 June 2025. Indicated standard rate: 1%, rising to 3% when a party benefits from privileged tax treatment.\n• IPI — property Ownership tax (code cIPI), approved by Law 55/X/2025. Indicated general rate: 0.1%; land 0.15%; higher rates for vacant, ruined or incomplete-development buildings.\n• Entry into force: 1 January 2026.\n\nThese rates are indicative and may carry exemptions, brackets or updates. Before buying, selling or filing, confirm the rates in force with the tax authority and in the Official Gazette. This is an informational platform summary and does not replace official information.\n\nSources: PwC (Cape Verde tax flash, 2025); Official Gazette. Verification required.', nl: 'Wat er veranderde (FEIT, bronnen hieronder):\n\n• ITI — overdrachtsbelasting (code cITI), goedgekeurd bij Wet 54/X/2025, gepubliceerd op 6 juni 2025. Aangegeven algemeen tarief: 1%, oplopend tot 3% als een partij een fiscaal voordeel geniet.\n• IPI — eigendomsbelasting (code cIPI), goedgekeurd bij Wet 55/X/2025. Aangegeven algemeen tarief: 0,1%; grond 0,15%; hogere tarieven voor leegstaande, vervallen of onvoltooide gebouwen.\n• Inwerkingtreding: 1 januari 2026.\n\nDeze tarieven zijn indicatief en kunnen vrijstellingen, schijven of updates kennen. Bevestig vóór aan- of verkoop of aangifte de geldende tarieven bij de Belastingdienst en in het Boletim Oficial. Dit is een informatieve platformsamenvatting en vervangt geen officiële informatie.\n\nBronnen: PwC (fiscale flash Kaapverdië, 2025); Boletim Oficial. Verificatie vereist.' },
    publishedAt: '2026-06-15', updatedAt: '2026-07-21' },
  { id: null, slug: 'arrendamento-regras-basicas', category: 'arrendamento',
    title: { pt: 'Arrendamento urbano: regras básicas do contrato', en: 'Urban tenancy: basic contract rules', nl: 'Stedelijke huur: basisregels van het contract' },
    govEntity: 'Resumo da plataforma — validação jurídica necessária', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'O arrendamento urbano rege-se pela Lei n.º 101/VIII/2016 (RGAU). Pontos indicados: contrato por escrito em três vias, duração supletiva de 6 meses e contratos de duração limitada não inferiores a 3 anos na habitação. Confirmar antes de assinar.', en: 'Urban tenancy is governed by Law 101/VIII/2016 (RGAU). Indicated points: written contract in three copies, a default term of 6 months, and limited-term residential contracts of not less than 3 years. Confirm before signing.', nl: 'Stedelijke huur valt onder Wet 101/VIII/2016 (RGAU). Aangegeven punten: schriftelijk contract in drie exemplaren, standaardduur van 6 maanden en huurcontracten van bepaalde duur van minimaal 3 jaar voor bewoning. Bevestig vóór ondertekening.' },
    body: { pt: 'Pontos indicativos do Regime Geral do Arrendamento Urbano (FACTO, a confirmar no Boletim Oficial):\n\n• O contrato deve ser celebrado por escrito e, segundo as fontes, elaborado em três vias.\n• Na falta de prazo estipulado, aplica-se uma duração supletiva de 6 meses.\n• É permitida a antecipação de rendas.\n• Nos arrendamentos habitacionais são possíveis contratos de duração limitada não inferior a 3 anos.\n• A cessação pode ocorrer por acordo (revogação), resolução, caducidade ou denúncia, nos termos da lei.\n\nO contrato pró-forma gerado pela Djarvista é apenas uma ferramenta de apoio (self-service). A Djarvista não é parte, advogado nem controlador jurídico do contrato. Confirme sempre com um advogado e no Boletim Oficial.\n\nFonte citada: Lei n.º 101/VIII/2016, de 6 de janeiro (via agregadores jurídicos). Verificação jurídica necessária.', en: 'Indicative points of the General Urban Tenancy Regime (FACT, to confirm in the Official Gazette):\n\n• The contract must be made in writing and, per the sources, drawn up in three copies.\n• Absent a stipulated term, a default duration of 6 months applies.\n• Advance payment of rent is permitted.\n• For residential lets, limited-term contracts of not less than 3 years are possible.\n• Termination may occur by agreement (revocation), resolution, lapse or notice, under the law.\n\nThe pro-forma contract generated by Djarvista is only a self-service support tool. Djarvista is not a party, lawyer or legal controller of the contract. Always confirm with a lawyer and in the Official Gazette.\n\nCited source: Law 101/VIII/2016 of 6 January (via legal aggregators). Legal verification required.', nl: 'Indicatieve punten van het Algemeen Regime Stedelijke Huur (FEIT, te bevestigen in het Boletim Oficial):\n\n• Het contract moet schriftelijk zijn en, volgens de bronnen, in drie exemplaren worden opgesteld.\n• Zonder afgesproken termijn geldt een standaardduur van 6 maanden.\n• Vooruitbetaling van huur is toegestaan.\n• Voor bewoning zijn contracten van bepaalde duur van minimaal 3 jaar mogelijk.\n• Beëindiging kan via overeenkomst (herroeping), ontbinding, verval of opzegging, volgens de wet.\n\nHet pro-forma contract van Djarvista is slechts een self-service hulpmiddel. Djarvista is geen partij, advocaat of juridisch controleur van het contract. Bevestig altijd bij een advocaat en in het Boletim Oficial.\n\nAangehaalde bron: Wet 101/VIII/2016 van 6 januari (via juridische aggregators). Juridische verificatie vereist.' },
    publishedAt: '2026-07-21', updatedAt: '2026-07-21' },
  { id: null, slug: 'direitos-deveres-arrendamento', category: 'arrendamento',
    title: { pt: 'Renda, caução e atualização: direitos e deveres', en: 'Rent, deposit and updates: rights and duties', nl: 'Huur, borg en indexering: rechten en plichten' },
    govEntity: 'Resumo da plataforma — validação jurídica necessária', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'A renda fixa-se em escudos (CVE). A atualização segue a inflação publicada pelo INE. A caução acorda-se por escrito no contrato. Regras no RGAU (Lei n.º 101/VIII/2016). Confirme sempre com um advogado.', en: 'Rent is set in escudos (CVE). Updates follow the inflation published by INE. The deposit is agreed in writing in the contract. Rules are in the RGAU (Law 101/VIII/2016). Always confirm with a lawyer.', nl: 'Huur wordt vastgesteld in escudo’s (CVE). Indexering volgt de door INE gepubliceerde inflatie. De borg wordt schriftelijk in het contract afgesproken. Regels staan in de RGAU (Wet 101/VIII/2016). Bevestig altijd bij een advocaat.' },
    body: { pt: 'Pontos indicativos (FACTO onde citado; a caução é ASSUNÇÃO — confirmar):\n\n• A renda deve ser fixada em moeda nacional (escudos cabo-verdianos).\n• A atualização da renda pode seguir o acumulado das taxas de inflação entre a fixação (ou última atualização) e a nova data, consultáveis no site do INE (Instituto Nacional de Estatística).\n• O contrato é por escrito, em três vias — a terceira destina-se às autoridades fiscais.\n• É permitida a antecipação de rendas.\n• Nos contratos de habitação de duração limitada, o prazo não deve ser inferior a 3 anos.\n• A conservação/obras a cargo do senhorio têm regras próprias no RGAU.\n• Caução: não confirmámos um limite legal específico em Cabo Verde — o valor e a devolução devem ficar claros e por escrito no contrato. (Verificação necessária.)\n\nBase legal citada (FACTO): Lei n.º 101/VIII/2016, de 6 de janeiro (RGAU), em vigor desde 5 de fevereiro de 2016, que revogou a antiga Lei do Inquilinato de 1961. Resumo informativo — não é aconselhamento jurídico.\n\nFontes: Boletim Oficial; Portal do Comércio (texto da Lei 101/VIII/2016); INE. Verificação necessária.', en: 'Indicative points (FACT where cited; the deposit is ASSUMPTION — confirm):\n\n• Rent must be set in national currency (Cape Verdean escudos).\n• Rent updates may follow the cumulative inflation rates between the setting (or last update) and the new date, available on the INE (national statistics institute) website.\n• The contract is in writing, in three copies — the third goes to the tax authorities.\n• Advance payment of rent is permitted.\n• For limited-term residential contracts, the term should not be under 3 years.\n• Landlord conservation/works have specific rules in the RGAU.\n• Deposit: we did not confirm a specific statutory cap in Cape Verde — the amount and its return should be clear and in writing in the contract. (Verification required.)\n\nCited legal basis (FACT): Law 101/VIII/2016 of 6 January (RGAU), in force since 5 February 2016, which repealed the old 1961 tenancy law. Informational summary — not legal advice.\n\nSources: Official Gazette; Portal do Comércio (text of Law 101/VIII/2016); INE. Verification required.', nl: 'Indicatieve punten (FEIT waar aangehaald; de borg is AANNAME — bevestigen):\n\n• Huur moet in nationale valuta (Kaapverdische escudo’s) worden vastgesteld.\n• Huurindexering kan de cumulatieve inflatie volgen tussen de vaststelling (of laatste indexering) en de nieuwe datum, te raadplegen op de website van INE (nationaal statistiekinstituut).\n• Het contract is schriftelijk, in drie exemplaren — het derde gaat naar de belastingdienst.\n• Vooruitbetaling van huur is toegestaan.\n• Voor huurcontracten van bepaalde duur voor bewoning geldt een termijn van minimaal 3 jaar.\n• Onderhoud/werken voor rekening van de verhuurder kennen eigen regels in de RGAU.\n• Borg: we hebben geen specifiek wettelijk maximum in Kaapverdië bevestigd — het bedrag en de teruggave moeten duidelijk en schriftelijk in het contract staan. (Verificatie vereist.)\n\nAangehaalde rechtsgrond (FEIT): Wet 101/VIII/2016 van 6 januari (RGAU), van kracht sinds 5 februari 2016, die de oude huurwet van 1961 introk. Informatieve samenvatting — geen juridisch advies.\n\nBronnen: Boletim Oficial; Portal do Comércio (tekst van Wet 101/VIII/2016); INE. Verificatie vereist.' },
    publishedAt: '2026-07-21', updatedAt: '2026-07-21' },
  { id: null, slug: 'licenca-de-construcao', category: 'construcao',
    title: { pt: 'Licença de construção: construir dentro da lei', en: 'Building permit: building within the law', nl: 'Bouwvergunning: bouwen binnen de wet' },
    govEntity: 'Resumo da plataforma — confirmar na Câmara Municipal', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Para construir precisa de licença de construção da Câmara Municipal. Construir sem licença é construção clandestina (Decreto-Lei n.º 57/2015). O uso do solo segue o PDM e o regime nacional de ordenamento (RNOTPU). Confirme sempre na sua Câmara.', en: 'To build you need a construction permit from the Municipal Council. Building without one is illegal (clandestine) construction (Decree-Law 57/2015). Land use follows the municipal master plan (PDM) and the national planning regime (RNOTPU). Always confirm with your council.', nl: 'Om te bouwen heeft u een bouwvergunning van de gemeente (Câmara Municipal) nodig. Bouwen zonder vergunning is illegale (clandestiene) bouw (Decreet-Wet 57/2015). Grondgebruik volgt het gemeentelijke bestemmingsplan (PDM) en het nationale ordeningsregime (RNOTPU). Bevestig altijd bij uw gemeente.' },
    body: { pt: 'Pontos indicativos (FACTO onde há referência legal; passos concretos são ASSUNÇÃO — confirmar na Câmara Municipal):\n\n• A licença de construção é emitida pela Câmara Municipal do concelho onde fica o terreno.\n• Construir sem licença é construção clandestina. O Decreto-Lei n.º 57/2015 estabelece o regime das Áreas Urbanas de Génese Ilegal (AUGI).\n• O que pode construir depende do Plano Diretor Municipal (PDM) e do Regime Nacional do Ordenamento do Território e Planeamento Urbanístico (RNOTPU).\n• Passos habituais: pedido de informação prévia → projeto de arquitetura por técnico habilitado → projetos de especialidades → apreciação e emissão da licença.\n• Zonas especiais: em faixas costeiras pode ser exigido parecer da Autoridade Marítima; no centro histórico do Mindelo (Património Nacional desde 2012) aplicam-se regras de salvaguarda.\n\nEste é um resumo informativo da plataforma, não é aconselhamento técnico nem jurídico. Confirme requisitos, taxas e prazos na Câmara Municipal e no Boletim Oficial.\n\nFontes citadas: Boletim Oficial (RNOTPU; Decreto-Lei n.º 57/2015); Política Nacional de Ordenamento do Território e Urbanismo. Verificação necessária.', en: 'Indicative points (FACT where a legal reference exists; the concrete steps are ASSUMPTION — confirm with the council):\n\n• The building permit is issued by the Municipal Council of the district where the land sits.\n• Building without a permit is illegal (clandestine) construction. Decree-Law 57/2015 sets the regime for Areas of Illegal Urban Origin (AUGI).\n• What you may build depends on the Municipal Master Plan (PDM) and the National Regime for Territorial Planning and Urbanism (RNOTPU).\n• Typical steps: prior-information request → architecture project by a qualified professional → specialty projects → assessment and permit issuance.\n• Special zones: coastal strips may require an opinion from the Maritime Authority; in Mindelo’s historic centre (National Heritage since 2012) safeguarding rules apply.\n\nThis is an informational platform summary, not technical or legal advice. Confirm requirements, fees and deadlines with the Municipal Council and in the Official Gazette.\n\nCited sources: Official Gazette (RNOTPU; Decree-Law 57/2015); National Territorial Planning and Urbanism Policy. Verification required.', nl: 'Indicatieve punten (FEIT waar er een wettelijke verwijzing is; de concrete stappen zijn AANNAME — bevestig bij de gemeente):\n\n• De bouwvergunning wordt afgegeven door de gemeente (Câmara Municipal) waar de grond ligt.\n• Bouwen zonder vergunning is illegale bouw. Decreet-Wet 57/2015 regelt het regime voor gebieden van illegale stedelijke oorsprong (AUGI).\n• Wat u mag bouwen hangt af van het gemeentelijk bestemmingsplan (PDM) en het nationale ordeningsregime (RNOTPU).\n• Gebruikelijke stappen: verzoek om voorinformatie → architectuurproject door een bevoegde professional → specialiteitenprojecten → beoordeling en afgifte van de vergunning.\n• Bijzondere zones: in kuststroken kan een advies van de Maritieme Autoriteit nodig zijn; in het historische centrum van Mindelo (Nationaal Erfgoed sinds 2012) gelden beschermingsregels.\n\nDit is een informatieve platformsamenvatting, geen technisch of juridisch advies. Bevestig vereisten, kosten en termijnen bij de gemeente en in het Boletim Oficial.\n\nAangehaalde bronnen: Boletim Oficial (RNOTPU; Decreet-Wet 57/2015); Nationaal Beleid Ruimtelijke Ordening en Urbanisme. Verificatie vereist.' },
    publishedAt: '2026-07-21', updatedAt: '2026-07-21' },
  { id: null, slug: 'comprar-imovel-passos', category: 'compra',
    title: { pt: 'Comprar um imóvel em Cabo Verde: passos principais', en: 'Buying a property in Cape Verde: the main steps', nl: 'Een woning kopen in Kaapverdië: de belangrijkste stappen' },
    govEntity: 'Resumo da plataforma — fontes comerciais, não oficiais', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Passos habituais: obter NIF, verificar a certidão de registo predial, assinar o contrato-promessa, celebrar a escritura pública perante notário e registar a propriedade. Há custos de imposto de transmissão (ITI), notário e registo. Não é aconselhamento jurídico.', en: 'Typical steps: obtain a tax number (NIF), check the land-registry certificate, sign the promissory contract, execute the public deed before a notary, and register the property. There are transfer-tax (ITI), notary and registration costs. Not legal advice.', nl: 'Gebruikelijke stappen: verkrijg een fiscaal nummer (NIF), controleer het kadastrale uittreksel, teken het voorlopige koopcontract, verlijd de notariële akte en schrijf de eigendom in. Er zijn kosten voor overdrachtsbelasting (ITI), notaris en inschrijving. Geen juridisch advies.' },
    body: { pt: 'Sequência indicativa (ASSUNÇÃO com base em guias comerciais — confirmar):\n\n1) Obter o NIF (Número de Identificação Fiscal) na repartição de Finanças. Estrangeiros podem comprar imóveis em Cabo Verde.\n2) Pedir a Certidão de Registo Predial na Conservatória para verificar a descrição do imóvel e eventuais ónus/hipotecas.\n3) Recomendável: constituir procuração a um advogado cabo-verdiano para acompanhar o processo.\n4) Assinar o Contrato-Promessa de Compra e Venda (define preço, prazos; sinal habitual de 10–30%).\n5) Celebrar a Escritura Pública perante notário e pagar o remanescente.\n6) Registar a propriedade em seu nome no Registo Predial.\n\nCustos aproximados (INDICATIVO): imposto de transmissão — agora ITI, taxa geral indicada de 1% (3% em casos privilegiados); notário ~1–2%; registo ~2%. Nota: guias mais antigos referem ~3% de transmissão (regra IUP, anterior a 2026) — confirme sempre os valores atuais.\n\nFontes: guias comerciais (capeverdeproperty24, consultoria.cv) e eRegulations Cabo Verde. Não oficial; verificação necessária.', en: 'Indicative sequence (ASSUMPTION based on commercial guides — confirm):\n\n1) Obtain the NIF (tax identification number) at the tax office. Foreigners may buy property in Cape Verde.\n2) Request the Land-Registry Certificate (Certidão de Registo Predial) to verify the property description and any charges/mortgages.\n3) Recommended: grant power of attorney to a Cape Verdean lawyer to handle the process.\n4) Sign the Promissory Purchase Contract (sets price, timeline; typical deposit 10–30%).\n5) Execute the Public Deed (Escritura Pública) before a notary and pay the balance.\n6) Register the property in your name at the Land Registry.\n\nApproximate costs (INDICATIVE): transfer tax — now ITI, indicated standard rate 1% (3% in privileged cases); notary ~1–2%; registration ~2%. Note: older guides quote ~3% transfer (the pre-2026 IUP rule) — always confirm current figures.\n\nSources: commercial guides (capeverdeproperty24, consultoria.cv) and eRegulations Cape Verde. Unofficial; verification required.', nl: 'Indicatieve volgorde (AANNAME op basis van commerciële gidsen — bevestigen):\n\n1) Verkrijg het NIF (fiscaal identificatienummer) bij het belastingkantoor. Buitenlanders mogen vastgoed kopen in Kaapverdië.\n2) Vraag het kadastrale uittreksel (Certidão de Registo Predial) op om de omschrijving en eventuele lasten/hypotheken te controleren.\n3) Aanbevolen: geef een Kaapverdische advocaat volmacht om het proces te begeleiden.\n4) Teken het voorlopige koopcontract (legt prijs en termijnen vast; gebruikelijke aanbetaling 10–30%).\n5) Verlijd de notariële akte (Escritura Pública) en betaal het restant.\n6) Schrijf de eigendom op uw naam in bij het kadaster.\n\nGeschatte kosten (INDICATIEF): overdrachtsbelasting — nu ITI, aangegeven tarief 1% (3% in bevoorrechte gevallen); notaris ~1–2%; inschrijving ~2%. Let op: oudere gidsen noemen ~3% overdracht (de IUP-regel van vóór 2026) — bevestig altijd de actuele cijfers.\n\nBronnen: commerciële gidsen (capeverdeproperty24, consultoria.cv) en eRegulations Kaapverdië. Niet officieel; verificatie vereist.' },
    publishedAt: '2026-07-21', updatedAt: '2026-07-21' },
];

export async function fetchPublications(): Promise<InfoItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return DEMO_INFO;
  const { data, error } = await supabase.from('publications').select('*').eq('status', 'published').order('updated_at', { ascending: false });
  if (error || !data || data.length === 0) return DEMO_INFO;
  return (data as PubRow[]).map(pubRowToItem);
}

export async function fetchPublicationBySlug(slug: string): Promise<InfoItem | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return DEMO_INFO.find((p) => p.slug === slug);
  const { data, error } = await supabase.from('publications').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error || !data) return DEMO_INFO.find((p) => p.slug === slug);
  return pubRowToItem(data as PubRow);
}

export interface ReviewView { author: string; rating: number; verified: boolean; date: string; body: string }
interface ReviewRow { author_name: string | null; rating: number; verified: boolean; body: string | null; created_at: string }

/** Reviews for a professional from the DB (empty when not configured). */
export async function fetchReviews(proSlug: string): Promise<ReviewView[]> {
  const supabase = getServerSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reviews')
    .select('author_name,rating,verified,body,created_at')
    .eq('pro_slug', proSlug)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as ReviewRow[]).map((r) => ({
    author: r.author_name || 'Anónimo', rating: r.rating, verified: r.verified,
    date: (r.created_at ?? '').slice(0, 10), body: r.body ?? '',
  }));
}

// ---------------------------------------------------------------------------
// Professionals directory (real when configured; demo fallback otherwise).
// ---------------------------------------------------------------------------
export interface ProProfile {
  id: string; userId: string | null; slug: string; displayName: string;
  headline: TL; bio: TL | null; category: string | null;
  serviceAreas: string[]; priceIndication: TL | null; phone: string | null;
  verificationLevel: VerificationLevel; ratingAvg: number | null; ratingCount: number;
}
interface ProRow {
  id: string; user_id: string; slug: string; display_name: string;
  headline: TL; bio: TL | null; category: string | null; service_areas: string[] | null;
  price_indication: TL | null; phone: string | null;
  profiles: { verification_level: VerificationLevel } | { verification_level: VerificationLevel }[] | null;
}

/** Map the demo Professional shape to ProProfile so pages share one type. */
function demoToProProfile(p: (typeof PROFESSIONALS)[number]): ProProfile {
  return {
    id: p.id, userId: null, slug: p.slug, displayName: p.displayName, headline: p.headline,
    bio: null, category: null, serviceAreas: p.serviceAreas, priceIndication: p.priceIndication,
    phone: null, verificationLevel: p.verificationLevel, ratingAvg: p.ratingAvg, ratingCount: p.ratingCount,
  };
}

function verifOf(row: ProRow): VerificationLevel {
  const rel = row.profiles;
  const obj = Array.isArray(rel) ? rel[0] : rel;
  return obj?.verification_level ?? 'L0_NONE';
}

/** Aggregate review stats (avg + count) for a set of slugs in one query. */
async function ratingsFor(
  supabase: NonNullable<ReturnType<typeof getServerSupabase>>, slugs: string[],
): Promise<Map<string, { avg: number; count: number }>> {
  const map = new Map<string, { avg: number; count: number }>();
  if (slugs.length === 0) return map;
  const { data } = await supabase.from('reviews').select('pro_slug,rating').in('pro_slug', slugs);
  const acc = new Map<string, { sum: number; count: number }>();
  for (const r of (data ?? []) as { pro_slug: string; rating: number }[]) {
    const a = acc.get(r.pro_slug) ?? { sum: 0, count: 0 };
    a.sum += r.rating; a.count += 1; acc.set(r.pro_slug, a);
  }
  for (const [slug, a] of acc) map.set(slug, { avg: a.sum / a.count, count: a.count });
  return map;
}

/** Published professionals, optionally filtered by service area. */
export async function fetchProfessionals(area?: string): Promise<ProProfile[]> {
  const supabase = getServerSupabase();
  if (!supabase) {
    const demo = PROFESSIONALS.map(demoToProProfile);
    return area ? demo.filter((p) => p.serviceAreas.includes(area)) : demo;
  }
  let query = supabase.from('professionals').select('*, profiles(verification_level)').eq('status', 'published');
  if (area) query = query.contains('service_areas', [area]);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error || !data) return [];
  const rows = data as unknown as ProRow[];
  const stats = await ratingsFor(supabase, rows.map((r) => r.slug));
  return rows.map((r) => {
    const s = stats.get(r.slug);
    return {
      id: r.id, userId: r.user_id, slug: r.slug, displayName: r.display_name, headline: r.headline,
      bio: r.bio, category: r.category, serviceAreas: r.service_areas ?? [], priceIndication: r.price_indication,
      phone: r.phone, verificationLevel: verifOf(r), ratingAvg: s ? s.avg : null, ratingCount: s ? s.count : 0,
    };
  });
}

/** A single published professional by slug (demo fallback when not configured). */
export async function fetchProfessionalBySlug(slug: string): Promise<ProProfile | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) {
    const p = demoGetProfessional(slug);
    return p ? demoToProProfile(p) : undefined;
  }
  const { data, error } = await supabase
    .from('professionals').select('*, profiles(verification_level)').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error || !data) return undefined;
  const r = data as unknown as ProRow;
  const stats = await ratingsFor(supabase, [r.slug]);
  const s = stats.get(r.slug);
  return {
    id: r.id, userId: r.user_id, slug: r.slug, displayName: r.display_name, headline: r.headline,
    bio: r.bio, category: r.category, serviceAreas: r.service_areas ?? [], priceIndication: r.price_indication,
    phone: r.phone, verificationLevel: verifOf(r), ratingAvg: s ? s.avg : null, ratingCount: s ? s.count : 0,
  };
}

// ---------------------------------------------------------------------------
// Building-materials suppliers directory (real when configured; demo fallback).
// ---------------------------------------------------------------------------
export interface SupplierView {
  id: string; userId: string | null; slug: string | null; name: string; category: TL;
  island: string; description: TL | null; priceFrom: TL | null; phone: string | null; verified: boolean;
}
interface SupplierRow {
  id: string; user_id: string; slug: string; name: string; category: TL; island: string | null;
  description: TL | null; price_from: TL | null; phone: string | null; verified: boolean;
}

function demoToSupplier(s: (typeof SUPPLIERS)[number]): SupplierView {
  return {
    id: s.id, userId: null, slug: null, name: s.name, category: s.category, island: s.island,
    description: null, priceFrom: s.priceFrom, phone: null, verified: s.verified,
  };
}

/** Published suppliers, optionally filtered by island. */
export async function fetchSuppliers(island?: string): Promise<SupplierView[]> {
  const supabase = getServerSupabase();
  if (!supabase) {
    const demo = SUPPLIERS.map(demoToSupplier);
    return island ? demo.filter((s) => s.island === island) : demo;
  }
  let query = supabase.from('suppliers').select('*').eq('status', 'published');
  if (island) query = query.eq('island', island);
  const { data, error } = await query.order('verified', { ascending: false }).order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as SupplierRow[]).map((r) => ({
    id: r.id, userId: r.user_id, slug: r.slug, name: r.name, category: r.category, island: r.island ?? '',
    description: r.description, priceFrom: r.price_from, phone: r.phone, verified: r.verified,
  }));
}

// ---------------------------------------------------------------------------
// Tenders (concursos) — real when configured; demo fallback otherwise.
// ---------------------------------------------------------------------------
export interface TenderView {
  id: string; slug: string | null; title: TL; description: TL | null; island: string;
  kind: 'PUBLIC' | 'PRIVATE'; budgetCve: number | null; deadline: string | null; bids: number; ownerId: string | null;
}
interface TenderRow {
  id: string; owner: string; slug: string; title: TL; description: TL | null; island: string | null;
  kind: 'PUBLIC' | 'PRIVATE'; budget_cve: number | null; deadline: string | null; bids_count: number;
}
function demoToTender(t: (typeof TENDERS)[number]): TenderView {
  return {
    id: t.id, slug: null, title: t.title, description: null, island: t.island, kind: t.kind,
    budgetCve: t.budgetCve, deadline: t.deadline, bids: t.bids, ownerId: null,
  };
}
function tenderRowToView(r: TenderRow): TenderView {
  return {
    id: r.id, slug: r.slug, title: r.title, description: r.description, island: r.island ?? '',
    kind: r.kind, budgetCve: r.budget_cve, deadline: r.deadline, bids: r.bids_count, ownerId: r.owner,
  };
}
export async function fetchTenders(island?: string): Promise<TenderView[]> {
  const supabase = getServerSupabase();
  if (!supabase) {
    const demo = TENDERS.map(demoToTender);
    return island ? demo.filter((t) => t.island === island) : demo;
  }
  let query = supabase.from('tenders').select('*').neq('status', 'draft');
  if (island) query = query.eq('island', island);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as TenderRow[]).map(tenderRowToView);
}
export async function fetchTenderBySlug(slug: string): Promise<TenderView | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return undefined;
  const { data, error } = await supabase.from('tenders').select('*').eq('slug', slug).neq('status', 'draft').maybeSingle();
  if (error || !data) return undefined;
  return tenderRowToView(data as TenderRow);
}

// ---------------------------------------------------------------------------
// Projects portfolio (projetos) — real when configured; demo fallback otherwise.
// ---------------------------------------------------------------------------
export interface Milestone { label: TL; done: boolean }
export interface ProjectView {
  id: string; slug: string | null; name: TL; description: TL | null; island: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'; progress: number; budgetCve: number | null;
  contractor: string; cover: string | null; milestones: Milestone[];
}
interface ProjectRow {
  id: string; slug: string; name: TL; description: TL | null; island: string | null;
  status: ProjectView['status']; progress: number; budget_cve: number | null;
  contractor: string | null; cover: string | null; milestones: Milestone[] | null;
}
function demoToProject(p: (typeof PROJECTS)[number]): ProjectView {
  return {
    id: p.id, slug: null, name: p.name, description: null, island: p.island, status: p.status,
    progress: p.progress, budgetCve: p.budgetCve, contractor: p.contractor, cover: null, milestones: p.milestones,
  };
}
function projectRowToView(r: ProjectRow): ProjectView {
  return {
    id: r.id, slug: r.slug, name: r.name, description: r.description, island: r.island ?? '',
    status: r.status, progress: r.progress, budgetCve: r.budget_cve, contractor: r.contractor ?? '',
    cover: r.cover, milestones: Array.isArray(r.milestones) ? r.milestones : [],
  };
}
export async function fetchProjects(island?: string): Promise<ProjectView[]> {
  const supabase = getServerSupabase();
  if (!supabase) {
    const demo = PROJECTS.map(demoToProject);
    return island ? demo.filter((p) => p.island === island) : demo;
  }
  let query = supabase.from('projects').select('*').eq('visibility', 'published');
  if (island) query = query.eq('island', island);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as ProjectRow[]).map(projectRowToView);
}
export async function fetchProjectBySlug(slug: string): Promise<ProjectView | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return undefined;
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).eq('visibility', 'published').maybeSingle();
  if (error || !data) return undefined;
  return projectRowToView(data as ProjectRow);
}
