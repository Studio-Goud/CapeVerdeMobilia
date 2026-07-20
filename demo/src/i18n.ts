// Ilhavista demo — trilingual (PT / EN / NL) strings + fictional content.
// No database, no PII. UI strings and demo content are both localized.

export type Locale = 'pt' | 'en' | 'nl';
export const LOCALES: Locale[] = ['pt', 'en', 'nl'];
export const DEFAULT_LOCALE: Locale = 'pt';
export const LOCALE_NAMES: Record<Locale, string> = { pt: 'PT', en: 'EN', nl: 'NL' };
export const isLocale = (v: string): v is Locale => (LOCALES as string[]).includes(v);

/** A translatable string in the three demo languages. */
export type TL = Record<Locale, string>;
export const tr = (v: TL, l: Locale): string => v[l] ?? v.pt;

// --- UI dictionary (interface chrome) ---
type UIKey =
  | 'brand.tagline' | 'nav.imoveis' | 'nav.profissionais' | 'nav.info' | 'nav.procedimentos' | 'nav.postJob'
  | 'common.search' | 'common.filter' | 'common.viewAll' | 'common.results' | 'common.send'
  | 'common.priceOnRequest' | 'common.sponsored' | 'common.back' | 'common.island' | 'common.type' | 'common.all'
  | 'demo.banner'
  | 'home.heroTitle' | 'home.heroSubtitle' | 'home.searchPlaceholder' | 'home.land' | 'home.verifiedPros'
  | 'home.howTo' | 'home.featured' | 'home.professionals'
  | 'listing.description' | 'listing.features' | 'listing.terrain' | 'listing.bedrooms' | 'listing.bathrooms'
  | 'listing.builtArea' | 'listing.plot' | 'listing.area' | 'listing.zoning' | 'listing.buildable'
  | 'listing.yesToConfirm' | 'listing.toConfirm' | 'listing.trust' | 'listing.lastVerified' | 'listing.published'
  | 'listing.commercialNote' | 'listing.contactVisit'
  | 'pros.title' | 'pros.intro' | 'pros.noReviews'
  | 'info.title' | 'info.intro' | 'info.version' | 'info.updated' | 'info.validFrom'
  | 'proc.title' | 'proc.intro' | 'proc.steps' | 'proc.entity' | 'proc.documents' | 'proc.duration'
  | 'proc.days' | 'proc.estDuration' | 'proc.disclaimer'
  | 'job.title' | 'job.intro' | 'job.s1' | 'job.s2' | 'job.s3' | 'job.s4' | 'job.describe' | 'job.whatsapp'
  | 'lead.name' | 'lead.email' | 'lead.phone' | 'lead.message' | 'lead.ok'
  | 'footer.body' | 'footer.demo'
  | 'notfound.title' | 'notfound.body' | 'notfound.home'
  | 'official.official' | 'official.summary' | 'official.unconfirmed'
  | 'doc.VERIFIED' | 'doc.UPLOADED' | 'doc.DECLARED' | 'doc.DISPUTED' | 'doc.UNKNOWN'
  | 'verif.L0' | 'verif.L1' | 'verif.L2' | 'verif.L3' | 'verif.L4' | 'verif.L5';

const UI: Record<UIKey, TL> = {
  'brand.tagline': { pt: 'A porta digital para terra, construção e serviços em Cabo Verde', en: 'The digital gateway to property, building and public information in Cabo Verde', nl: 'De digitale toegangspoort tot vastgoed, bouw en overheidsinformatie in Kaapverdië' },
  'nav.imoveis': { pt: 'Imóveis', en: 'Properties', nl: 'Vastgoed' },
  'nav.profissionais': { pt: 'Profissionais', en: 'Professionals', nl: 'Professionals' },
  'nav.info': { pt: 'Informação oficial', en: 'Official information', nl: 'Officiële info' },
  'nav.procedimentos': { pt: 'Procedimentos', en: 'Procedures', nl: 'Procedures' },
  'nav.postJob': { pt: 'Publicar pedido', en: 'Post a job', nl: 'Opdracht plaatsen' },
  'common.search': { pt: 'Pesquisar', en: 'Search', nl: 'Zoeken' },
  'common.filter': { pt: 'Filtrar', en: 'Filter', nl: 'Filteren' },
  'common.viewAll': { pt: 'Ver todos', en: 'View all', nl: 'Bekijk alles' },
  'common.results': { pt: 'resultado(s)', en: 'result(s)', nl: 'resulta(a)t(en)' },
  'common.send': { pt: 'Enviar', en: 'Send', nl: 'Versturen' },
  'common.priceOnRequest': { pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' },
  'common.sponsored': { pt: 'Patrocinado', en: 'Sponsored', nl: 'Gesponsord' },
  'common.back': { pt: 'Voltar', en: 'Back', nl: 'Terug' },
  'common.island': { pt: 'Ilha', en: 'Island', nl: 'Eiland' },
  'common.type': { pt: 'Tipo', en: 'Type', nl: 'Type' },
  'common.all': { pt: 'Todos', en: 'All', nl: 'Alle' },
  'demo.banner': { pt: 'Demonstração · dados fictícios — não é um serviço real.', en: 'Demo · fictional data — not a real service.', nl: 'Demo · fictieve data — geen echte dienst.' },
  'home.heroTitle': { pt: 'Terra, imóveis, construção e informação oficial num só lugar', en: 'Land, property, building and official information in one place', nl: 'Grond, vastgoed, bouw en officiële informatie op één plek' },
  'home.heroSubtitle': { pt: 'Encontre, verifique e contacte com confiança — a começar por São Vicente.', en: 'Find, verify and contact with confidence — starting on São Vicente.', nl: 'Vind, verifieer en neem met vertrouwen contact op — te beginnen op São Vicente.' },
  'home.searchPlaceholder': { pt: 'Pesquisar imóveis, terrenos, zonas…', en: 'Search properties, land, areas…', nl: 'Zoek vastgoed, grond, gebieden…' },
  'home.land': { pt: 'Terrenos', en: 'Land', nl: 'Bouwgrond' },
  'home.verifiedPros': { pt: 'Profissionais verificados', en: 'Verified professionals', nl: 'Geverifieerde professionals' },
  'home.howTo': { pt: 'Como comprar e construir', en: 'How to buy and build', nl: 'Zo koop en bouw je' },
  'home.featured': { pt: 'Imóveis em destaque', en: 'Featured properties', nl: 'Uitgelicht vastgoed' },
  'home.professionals': { pt: 'Profissionais', en: 'Professionals', nl: 'Professionals' },
  'listing.description': { pt: 'Descrição', en: 'Description', nl: 'Omschrijving' },
  'listing.features': { pt: 'Características', en: 'Features', nl: 'Kenmerken' },
  'listing.terrain': { pt: 'Terreno', en: 'Land', nl: 'Grond' },
  'listing.bedrooms': { pt: 'Quartos', en: 'Bedrooms', nl: 'Slaapkamers' },
  'listing.bathrooms': { pt: 'WC', en: 'Bathrooms', nl: 'Badkamers' },
  'listing.builtArea': { pt: 'Área const.', en: 'Built area', nl: 'Woonopp.' },
  'listing.plot': { pt: 'Terreno', en: 'Plot', nl: 'Perceel' },
  'listing.area': { pt: 'Área', en: 'Area', nl: 'Oppervlakte' },
  'listing.zoning': { pt: 'Zonamento', en: 'Zoning', nl: 'Bestemming' },
  'listing.buildable': { pt: 'Construível', en: 'Buildable', nl: 'Bebouwbaar' },
  'listing.yesToConfirm': { pt: 'Sim (a confirmar)', en: 'Yes (to confirm)', nl: 'Ja (te bevestigen)' },
  'listing.toConfirm': { pt: 'Por confirmar', en: 'To confirm', nl: 'Te bevestigen' },
  'listing.trust': { pt: 'Confiança & documentos', en: 'Trust & documents', nl: 'Vertrouwen & documenten' },
  'listing.lastVerified': { pt: 'Última verificação', en: 'Last verified', nl: 'Laatst geverifieerd' },
  'listing.published': { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  'listing.commercialNote': { pt: 'Informação comercial indicativa. A Ilhavista não confirma a propriedade legal nem substitui a devida diligência jurídica.', en: 'Indicative commercial information. Ilhavista does not confirm legal ownership and does not replace proper legal due diligence.', nl: 'Indicatieve commerciële informatie. Ilhavista bevestigt geen juridisch eigendom en vervangt geen juridische due diligence.' },
  'listing.contactVisit': { pt: 'Contactar / agendar visita', en: 'Contact / schedule a viewing', nl: 'Contact / bezichtiging plannen' },
  'pros.title': { pt: 'Profissionais e empresas', en: 'Professionals and businesses', nl: 'Professionals en bedrijven' },
  'pros.intro': { pt: 'Encontre profissionais verificados para construção, renovação e serviços. As avaliações “verificadas” têm prova de uma transação ou projeto real.', en: 'Find verified professionals for construction, renovation and services. “Verified” reviews have proof of a real transaction or project.', nl: 'Vind geverifieerde professionals voor bouw, renovatie en diensten. “Geverifieerde” reviews hebben bewijs van een echte transactie of project.' },
  'pros.noReviews': { pt: 'Sem avaliações', en: 'No reviews', nl: 'Geen reviews' },
  'info.title': { pt: 'Centro de informação oficial', en: 'Official information centre', nl: 'Centrum voor officiële informatie' },
  'info.intro': { pt: 'Informação publicada por, ou resumida a partir de, fontes oficiais. Cada página indica a entidade responsável, o estado oficial e a data de atualização. A Ilhavista não substitui as entidades públicas nem presta aconselhamento jurídico.', en: 'Information published by, or summarized from, official sources. Each page states the responsible authority, the official status and the update date. Ilhavista does not replace public bodies and does not give legal advice.', nl: 'Informatie gepubliceerd door, of samengevat uit, officiële bronnen. Elke pagina vermeldt de verantwoordelijke instantie, de officiële status en de bijwerkdatum. Ilhavista vervangt geen overheidsinstanties en geeft geen juridisch advies.' },
  'info.version': { pt: 'Versão', en: 'Version', nl: 'Versie' },
  'info.updated': { pt: 'Atualizado', en: 'Updated', nl: 'Bijgewerkt' },
  'info.validFrom': { pt: 'Válido desde', en: 'Valid from', nl: 'Geldig vanaf' },
  'proc.title': { pt: 'Procedimentos passo a passo', en: 'Step-by-step procedures', nl: 'Procedures stap voor stap' },
  'proc.intro': { pt: 'Guias práticos baseados em informação controlada. Não constituem aconselhamento jurídico — confirme sempre com as entidades competentes.', en: 'Practical guides based on controlled information. They are not legal advice — always confirm with the competent authorities.', nl: 'Praktische gidsen op basis van gecontroleerde informatie. Dit is geen juridisch advies — bevestig altijd bij de bevoegde instanties.' },
  'proc.steps': { pt: 'passos', en: 'steps', nl: 'stappen' },
  'proc.entity': { pt: 'Entidade', en: 'Authority', nl: 'Instantie' },
  'proc.documents': { pt: 'Documentos', en: 'Documents', nl: 'Documenten' },
  'proc.duration': { pt: 'Duração', en: 'Duration', nl: 'Duur' },
  'proc.days': { pt: 'dias', en: 'days', nl: 'dagen' },
  'proc.estDuration': { pt: 'duração estimada', en: 'estimated duration', nl: 'geschatte duur' },
  'proc.disclaimer': { pt: 'Esta informação é indicativa e pode estar desatualizada. Confirme sempre com as entidades competentes. A Ilhavista não presta aconselhamento jurídico.', en: 'This information is indicative and may be outdated. Always confirm with the competent authorities. Ilhavista does not provide legal advice.', nl: 'Deze informatie is indicatief en kan verouderd zijn. Bevestig altijd bij de bevoegde instanties. Ilhavista geeft geen juridisch advies.' },
  'job.title': { pt: 'Publicar um pedido', en: 'Post a job', nl: 'Een opdracht plaatsen' },
  'job.intro': { pt: 'Descreva o trabalho e receba orçamentos de profissionais verificados. No piloto de São Vicente, a nossa equipa acompanha cada pedido pessoalmente (modelo concierge).', en: 'Describe the work and receive quotes from verified professionals. In the São Vicente pilot our team supports each request personally (concierge model).', nl: 'Beschrijf het werk en ontvang offertes van geverifieerde professionals. In de São Vicente-pilot begeleidt ons team elke aanvraag persoonlijk (concierge-model).' },
  'job.s1': { pt: 'Descreva o trabalho, categoria e localização', en: 'Describe the work, category and location', nl: 'Beschrijf het werk, de categorie en locatie' },
  'job.s2': { pt: 'Adicione fotos e um orçamento indicativo', en: 'Add photos and an indicative budget', nl: 'Voeg foto’s en een indicatief budget toe' },
  'job.s3': { pt: 'Convide profissionais e compare orçamentos', en: 'Invite professionals and compare quotes', nl: 'Nodig professionals uit en vergelijk offertes' },
  'job.s4': { pt: 'Selecione um profissional e acompanhe o projeto', en: 'Select a professional and follow the project', nl: 'Kies een professional en volg het project' },
  'job.describe': { pt: 'Descreva o seu pedido', en: 'Describe your request', nl: 'Beschrijf je aanvraag' },
  'job.whatsapp': { pt: 'Prefere WhatsApp? Fale connosco', en: 'Prefer WhatsApp? Talk to us', nl: 'Liever WhatsApp? Neem contact op' },
  'lead.name': { pt: 'Nome', en: 'Name', nl: 'Naam' },
  'lead.email': { pt: 'Email (opcional)', en: 'Email (optional)', nl: 'E-mail (optioneel)' },
  'lead.phone': { pt: 'Telefone / WhatsApp (opcional)', en: 'Phone / WhatsApp (optional)', nl: 'Telefoon / WhatsApp (optioneel)' },
  'lead.message': { pt: 'A sua mensagem', en: 'Your message', nl: 'Je bericht' },
  'lead.ok': { pt: 'Demonstração: mensagem recebida. Numa versão real seria contactado em breve.', en: 'Demo: message received. In a real version you would be contacted shortly.', nl: 'Demo: bericht ontvangen. In een echte versie word je binnenkort gecontacteerd.' },
  'footer.body': { pt: 'Infraestrutura digital independente para imóveis, construção e informação pública em Cabo Verde. A informação comercial é indicativa; a informação oficial é claramente identificada. A Ilhavista não presta aconselhamento jurídico.', en: 'Independent digital infrastructure for property, building and public information in Cabo Verde. Commercial information is indicative; official information is clearly identified. Ilhavista does not provide legal advice.', nl: 'Onafhankelijke digitale infrastructuur voor vastgoed, bouw en overheidsinformatie in Kaapverdië. Commerciële informatie is indicatief; officiële informatie is duidelijk herkenbaar. Ilhavista geeft geen juridisch advies.' },
  'footer.demo': { pt: 'Demonstração · dados fictícios · piloto conceptual São Vicente', en: 'Demo · fictional data · conceptual São Vicente pilot', nl: 'Demo · fictieve data · conceptuele São Vicente-pilot' },
  'notfound.title': { pt: 'Página não encontrada', en: 'Page not found', nl: 'Pagina niet gevonden' },
  'notfound.body': { pt: 'O conteúdo que procura não existe ou foi removido.', en: 'The content you are looking for does not exist or was removed.', nl: 'De pagina die je zoekt bestaat niet of is verwijderd.' },
  'notfound.home': { pt: 'Voltar ao início', en: 'Back to home', nl: 'Terug naar start' },
  'official.official': { pt: 'Oficial', en: 'Official', nl: 'Officieel' },
  'official.summary': { pt: 'Resumo da plataforma', en: 'Platform summary', nl: 'Platformsamenvatting' },
  'official.unconfirmed': { pt: 'Não confirmado oficialmente', en: 'Not officially confirmed', nl: 'Niet officieel bevestigd' },
  'doc.VERIFIED': { pt: 'Documentos verificados', en: 'Documents verified', nl: 'Documenten geverifieerd' },
  'doc.UPLOADED': { pt: 'Documentos carregados', en: 'Documents uploaded', nl: 'Documenten geüpload' },
  'doc.DECLARED': { pt: 'Documentos declarados', en: 'Documents declared', nl: 'Documenten opgegeven' },
  'doc.DISPUTED': { pt: 'Em disputa', en: 'Disputed', nl: 'In geschil' },
  'doc.UNKNOWN': { pt: 'Documentos por confirmar', en: 'Documents to confirm', nl: 'Documenten te bevestigen' },
  'verif.L0': { pt: 'Não verificado', en: 'Not verified', nl: 'Niet geverifieerd' },
  'verif.L1': { pt: 'Identidade verificada', en: 'Identity verified', nl: 'Identiteit geverifieerd' },
  'verif.L2': { pt: 'Empresa verificada', en: 'Business verified', nl: 'Bedrijf geverifieerd' },
  'verif.L3': { pt: 'Documentos verificados', en: 'Documents verified', nl: 'Documenten geverifieerd' },
  'verif.L4': { pt: 'Transação verificada', en: 'Transaction verified', nl: 'Transactie geverifieerd' },
  'verif.L5': { pt: 'Parceiro institucional', en: 'Institutional partner', nl: 'Institutionele partner' },
};

export const t = (l: Locale, key: UIKey): string => tr(UI[key], l);

// --- Content types ---
export type VerificationLevel = 'L0_NONE' | 'L1_IDENTITY' | 'L2_BUSINESS' | 'L3_DOCUMENTS' | 'L4_TRANSACTION' | 'L5_INSTITUTIONAL';

export interface Listing {
  id: string; slug: string; kind: string; title: TL; description: TL;
  priceAmount: number | null; priceOnRequest: boolean; isFeatured: boolean;
  documentStatus: string; island: string; municipality: string; thumbnail: string;
  publishedAt: string; lastVerifiedAt: string | null; riskNotes: TL | null;
  property: { type: string; bedrooms: number | null; bathrooms: number | null; builtAreaSqm: number | null; plotAreaSqm: number | null } | null;
  land: { type: string; areaSqm: number | null; zoning: TL | null; buildable: boolean } | null;
}
export interface Professional {
  id: string; slug: string; displayName: string; headline: TL;
  ratingAvg: number | null; ratingCount: number; verificationLevel: VerificationLevel;
  serviceAreas: string[]; priceIndication: TL | null;
}
export interface ProcedureStep { sortOrder: number; title: TL; description: TL; responsibleEntity: TL; requiredDocuments: TL[]; estimatedDays: number }
export interface Procedure { slug: string; title: TL; summary: TL; govEntity: string; estimatedDays: number; steps: ProcedureStep[] }
export interface Publication { title: TL; govEntity: string; officialStatus: boolean; version: number; updatedAt: string; validFrom: string | null; plainSummary: TL }

// --- Helpers ---
const CVE_PER_EUR = 110.265;
export const cveToEur = (cve: number): number => Math.round((cve / CVE_PER_EUR) * 100) / 100;
export function formatPrice(l: Locale, amount: number | null, onRequest: boolean): string {
  if (onRequest || amount == null) return t(l, 'common.priceOnRequest');
  const cve = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(amount);
  const eur = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(cveToEur(amount));
  return `${cve} CVE (~€${eur})`;
}
export function formatDate(l: Locale, d: string | null): string {
  if (!d) return '—';
  const loc = l === 'nl' ? 'nl-NL' : l === 'en' ? 'en-GB' : 'pt-PT';
  return new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(d));
}
export const docLabel = (l: Locale, s: string): string => t(l, (`doc.${s}` as UIKey) in UI ? (`doc.${s}` as UIKey) : 'doc.UNKNOWN');
export const verifLabel = (l: Locale, v: VerificationLevel): string =>
  t(l, ({ L0_NONE: 'verif.L0', L1_IDENTITY: 'verif.L1', L2_BUSINESS: 'verif.L2', L3_DOCUMENTS: 'verif.L3', L4_TRANSACTION: 'verif.L4', L5_INSTITUTIONAL: 'verif.L5' } as Record<VerificationLevel, UIKey>)[v]);
export function whatsappLink(message: string, to = '2389000000'): string {
  return `https://wa.me/${to.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
const img = (label: string): string => `https://placehold.co/1200x800/0e7490/ffffff?text=${encodeURIComponent(label)}`;

// --- Content data (fictional) ---
export const LISTINGS: Listing[] = [
  { id: 'l1', slug: 'villa-vista-mar-monte-sossego', kind: 'PROPERTY_SALE',
    title: { pt: 'Villa com vista mar — Monte Sossego, Mindelo', en: 'Sea-view villa — Monte Sossego, Mindelo', nl: 'Villa met zeezicht — Monte Sossego, Mindelo' },
    description: { pt: 'Villa de 3 quartos com vista para a baía de Mindelo. Documentos declarados, verificação pendente. (Dados fictícios.)', en: '3-bedroom villa overlooking Mindelo bay. Documents declared, verification pending. (Fictional data.)', nl: 'Villa met 3 slaapkamers en uitzicht op de baai van Mindelo. Documenten opgegeven, verificatie in behandeling. (Fictieve data.)' },
    priceAmount: 18500000, priceOnRequest: false, isFeatured: true, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Villa Mindelo'), publishedAt: '2026-06-10', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'VILLA', bedrooms: 3, bathrooms: 2, builtAreaSqm: 180, plotAreaSqm: 420 }, land: null },
  { id: 'l2', slug: 'terreno-600m2-monte-sossego', kind: 'LAND',
    title: { pt: 'Terreno para construção 600 m² — Monte Sossego', en: 'Building land 600 m² — Monte Sossego', nl: 'Bouwgrond 600 m² — Monte Sossego' },
    description: { pt: 'Terreno construível com boa exposição. Zonamento e viabilidade a confirmar com a Câmara Municipal. (Dados fictícios.)', en: 'Buildable plot with good aspect. Zoning and feasibility to be confirmed with the municipality. (Fictional data.)', nl: 'Bebouwbaar perceel met goede ligging. Bestemming en haalbaarheid te bevestigen bij de gemeente. (Fictieve data.)' },
    priceAmount: 4200000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Terreno Sossego'), publishedAt: '2026-06-14', lastVerifiedAt: null,
    riskNotes: { pt: 'Zonamento e viabilidade de construção requerem confirmação municipal.', en: 'Zoning and buildability require municipal confirmation.', nl: 'Bestemming en bebouwbaarheid vereisen bevestiging door de gemeente.' },
    property: null, land: { type: 'BUILDING_LAND', areaSqm: 600, zoning: { pt: 'Residencial (a confirmar)', en: 'Residential (to confirm)', nl: 'Residentieel (te bevestigen)' }, buildable: true } },
  { id: 'l3', slug: 'apartamento-t2-centro-mindelo', kind: 'PROPERTY_RENT',
    title: { pt: 'Apartamento T2 no centro histórico de Mindelo', en: '2-bed apartment in Mindelo old town', nl: 'Appartement (2 slk) in het oude centrum van Mindelo' },
    description: { pt: 'Apartamento renovado perto do Mercado Municipal. Documentos verificados. (Dados fictícios.)', en: 'Renovated apartment near the Municipal Market. Documents verified. (Fictional data.)', nl: 'Gerenoveerd appartement vlak bij de gemeentelijke markt. Documenten geverifieerd. (Fictieve data.)' },
    priceAmount: 65000, priceOnRequest: false, isFeatured: false, documentStatus: 'VERIFIED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('T2 Centro'), publishedAt: '2026-06-20', lastVerifiedAt: '2026-06-22', riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 1, builtAreaSqm: 85, plotAreaSqm: null }, land: null },
  { id: 'l4', slug: 'moradia-santa-maria-sal', kind: 'HOLIDAY_RENT',
    title: { pt: 'Moradia de férias — Santa Maria, Sal', en: 'Holiday home — Santa Maria, Sal', nl: 'Vakantiewoning — Santa Maria, Sal' },
    description: { pt: 'Moradia T3 a 300 m da praia. Ideal para arrendamento turístico. (Dados fictícios.)', en: '3-bedroom house 300 m from the beach. Ideal for holiday rental. (Fictional data.)', nl: 'Woning met 3 slaapkamers op 300 m van het strand. Ideaal voor vakantieverhuur. (Fictieve data.)' },
    priceAmount: 120000, priceOnRequest: false, isFeatured: true, documentStatus: 'UPLOADED', island: 'Sal', municipality: 'Sal',
    thumbnail: img('Santa Maria'), publishedAt: '2026-06-25', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'HOUSE', bedrooms: 3, bathrooms: 2, builtAreaSqm: 140, plotAreaSqm: 300 }, land: null },
  { id: 'l5', slug: 'espaco-comercial-plateau-praia', kind: 'COMMERCIAL',
    title: { pt: 'Espaço comercial — Plateau, Praia', en: 'Commercial space — Plateau, Praia', nl: 'Commerciële ruimte — Plateau, Praia' },
    description: { pt: 'Loja de rés-do-chão na zona do Plateau. Preço sob consulta. (Dados fictícios.)', en: 'Ground-floor shop in the Plateau area. Price on request. (Fictional data.)', nl: 'Winkel op de begane grond in de Plateau-wijk. Prijs op aanvraag. (Fictieve data.)' },
    priceAmount: null, priceOnRequest: true, isFeatured: false, documentStatus: 'DECLARED', island: 'Santiago', municipality: 'Praia',
    thumbnail: img('Plateau Praia'), publishedAt: '2026-05-30', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'COMMERCIAL', bedrooms: null, bathrooms: 1, builtAreaSqm: 110, plotAreaSqm: null }, land: null },
  { id: 'l6', slug: 'projeto-novo-baia-das-gatas', kind: 'NEW_DEVELOPMENT',
    title: { pt: 'Novo projeto — condomínio Baía das Gatas', en: 'New development — Baía das Gatas condominium', nl: 'Nieuw project — condominium Baía das Gatas' },
    description: { pt: 'Projeto de 8 apartamentos em fase de pré-venda. (Dados fictícios.)', en: '8-apartment project in pre-sale phase. (Fictional data.)', nl: 'Project van 8 appartementen in de voorverkoopfase. (Fictieve data.)' },
    priceAmount: 9800000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Baia das Gatas'), publishedAt: '2026-07-01', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 2, builtAreaSqm: 95, plotAreaSqm: null }, land: null },
];

export const PROFESSIONALS: Professional[] = [
  { id: 'p1', slug: 'construcoes-djar', displayName: 'Construções Djar',
    headline: { pt: 'Empreiteiro geral — construção nova e renovação', en: 'General contractor — new build and renovation', nl: 'Hoofdaannemer — nieuwbouw en renovatie' },
    ratingAvg: 4.6, ratingCount: 8, verificationLevel: 'L3_DOCUMENTS', serviceAreas: ['São Vicente'],
    priceIndication: { pt: 'A partir de 45.000 CVE / projeto (indicativo)', en: 'From 45,000 CVE / project (indicative)', nl: 'Vanaf 45.000 CVE / project (indicatief)' } },
  { id: 'p2', slug: 'atelier-morabeza', displayName: 'Atelier Morabeza',
    headline: { pt: 'Arquitetura e licenciamento', en: 'Architecture and permits', nl: 'Architectuur en vergunningen' },
    ratingAvg: 4.9, ratingCount: 12, verificationLevel: 'L4_TRANSACTION', serviceAreas: ['São Vicente', 'Santo Antão'],
    priceIndication: { pt: 'Projeto de arquitetura sob orçamento', en: 'Architecture project on quotation', nl: 'Architectuurproject op offerte' } },
  { id: 'p3', slug: 'eletrica-mindelo', displayName: 'Elétrica Mindelo',
    headline: { pt: 'Instalações elétricas certificadas', en: 'Certified electrical installations', nl: 'Gecertificeerde elektra-installaties' },
    ratingAvg: 4.3, ratingCount: 5, verificationLevel: 'L2_BUSINESS', serviceAreas: ['São Vicente'], priceIndication: null },
  { id: 'p4', slug: 'canalizacoes-oceano', displayName: 'Canalizações Oceano',
    headline: { pt: 'Canalização e sistemas de água', en: 'Plumbing and water systems', nl: 'Loodgieterswerk en watersystemen' },
    ratingAvg: 4.1, ratingCount: 3, verificationLevel: 'L1_IDENTITY', serviceAreas: ['São Vicente', 'Sal'], priceIndication: null },
  { id: 'p5', slug: 'topografia-cabo-verde', displayName: 'Topografia Cabo Verde',
    headline: { pt: 'Levantamentos topográficos e cadastro', en: 'Topographic surveys and cadastre', nl: 'Topografische opmetingen en kadaster' },
    ratingAvg: 4.7, ratingCount: 9, verificationLevel: 'L3_DOCUMENTS', serviceAreas: ['São Vicente', 'Santiago', 'Sal'],
    priceIndication: { pt: 'Levantamento a partir de 30.000 CVE', en: 'Survey from 30,000 CVE', nl: 'Opmeting vanaf 30.000 CVE' } },
  { id: 'p6', slug: 'advocacia-atlantico', displayName: 'Advocacia Atlântico',
    headline: { pt: 'Apoio jurídico em compra e registo de imóveis', en: 'Legal support for property purchase and registration', nl: 'Juridische ondersteuning bij aankoop en registratie van vastgoed' },
    ratingAvg: 4.8, ratingCount: 14, verificationLevel: 'L5_INSTITUTIONAL', serviceAreas: ['São Vicente', 'Santiago'],
    priceIndication: { pt: 'Due diligence a partir de 55.000 CVE', en: 'Due diligence from 55,000 CVE', nl: 'Due diligence vanaf 55.000 CVE' } },
];

export const PROCEDURES: Procedure[] = [
  { slug: 'comprar-terreno-e-construir-casa-ferias-sv',
    title: { pt: 'Comprar terreno e construir uma casa de férias em São Vicente', en: 'Buy land and build a holiday home on São Vicente', nl: 'Bouwgrond kopen en een vakantiewoning bouwen op São Vicente' },
    summary: { pt: 'Visão geral ilustrativa e não jurídica. Os passos e requisitos devem ser confirmados com as entidades competentes.', en: 'Illustrative, non-legal overview. Steps and requirements must be confirmed with the competent authorities.', nl: 'Illustratief, niet-juridisch overzicht. Stappen en vereisten moeten bij de bevoegde instanties worden bevestigd.' },
    govEntity: 'Câmara Municipal de São Vicente (demo)', estimatedDays: 120, steps: [
      { sortOrder: 1, title: { pt: 'Verificar título e ónus', en: 'Verify title and encumbrances', nl: 'Titel en lasten controleren' },
        description: { pt: 'Solicitar a Certidão de Registo Predial na Conservatória do Registo Predial. Contratar um advogado independente.', en: 'Request the Land Registry Certificate from the Conservatória do Registo Predial. Hire an independent lawyer.', nl: 'Vraag het uittreksel bij de Conservatória do Registo Predial (kadaster) op. Schakel een onafhankelijke advocaat in.' },
        responsibleEntity: { pt: 'Conservatória do Registo Predial', en: 'Land Registry (Conservatória do Registo Predial)', nl: 'Kadaster (Conservatória do Registo Predial)' },
        requiredDocuments: [{ pt: 'Certidão de registo predial', en: 'Land registry certificate', nl: 'Kadastraal uittreksel' }, { pt: 'Identificação do vendedor', en: 'Seller identification', nl: 'Identificatie van de verkoper' }], estimatedDays: 14 },
      { sortOrder: 2, title: { pt: 'Confirmar zonamento e viabilidade', en: 'Confirm zoning and feasibility', nl: 'Bestemming en haalbaarheid bevestigen' },
        description: { pt: 'Confirmar o zonamento e o uso permitido junto do município.', en: 'Confirm zoning and permitted use with the municipality.', nl: 'Bevestig de bestemming en het toegestane gebruik bij de gemeente.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Referência cadastral', en: 'Cadastral reference', nl: 'Kadastrale referentie' }, { pt: 'Planta de localização', en: 'Site plan', nl: 'Situatietekening' }], estimatedDays: 21 },
      { sortOrder: 3, title: { pt: 'Assinar a escritura pública e registar', en: 'Sign the public deed and register', nl: 'De notariële akte tekenen en registreren' },
        description: { pt: 'Assinar a escritura pública perante notário e registar a transmissão.', en: 'Sign the public deed before a notary and register the transfer.', nl: 'Onderteken de notariële akte bij een notaris en registreer de overdracht.' },
        responsibleEntity: { pt: 'Notário + Conservatória', en: 'Notary + Land Registry', nl: 'Notaris + kadaster' },
        requiredDocuments: [{ pt: 'Minuta da escritura', en: 'Draft deed', nl: 'Concept-akte' }, { pt: 'Prova de fundos', en: 'Proof of funds', nl: 'Bewijs van financiering' }], estimatedDays: 30 },
      { sortOrder: 4, title: { pt: 'Pedido de licença de construção', en: 'Apply for a building permit', nl: 'Bouwvergunning aanvragen' },
        description: { pt: 'Submeter o projeto de arquitetura para a licença de construção.', en: 'Submit the architectural project for the building permit.', nl: 'Dien het architectenontwerp in voor de bouwvergunning.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Projeto de arquitetura', en: 'Architectural project', nl: 'Architectenontwerp' }, { pt: 'Termo de responsabilidade do engenheiro', en: 'Engineer sign-off', nl: 'Verklaring van de ingenieur' }], estimatedDays: 45 },
    ] },
  { slug: 'registar-empresa-empresa-no-dia',
    title: { pt: 'Registar uma empresa (“Empresa no Dia”)', en: 'Register a company (“Empresa no Dia”)', nl: 'Een bedrijf registreren (“Empresa no Dia”)' },
    summary: { pt: 'Como constituir uma empresa através da Casa do Cidadão. Informação indicativa.', en: 'How to set up a company through the Casa do Cidadão. Indicative information.', nl: 'Hoe je een bedrijf opricht via de Casa do Cidadão. Indicatieve informatie.' },
    govEntity: 'Casa do Cidadão (demo)', estimatedDays: 1, steps: [
      { sortOrder: 1, title: { pt: 'Reservar o nome / obter o CAF', en: 'Reserve the name / obtain the CAF', nl: 'Naam reserveren / CAF verkrijgen' },
        description: { pt: 'Solicitar o certificado de admissibilidade da firma.', en: 'Request the company name admissibility certificate.', nl: 'Vraag het toelaatbaarheidscertificaat voor de bedrijfsnaam aan.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Documento de identificação', en: 'ID document', nl: 'Identiteitsdocument' }], estimatedDays: 1 },
      { sortOrder: 2, title: { pt: 'Constituir a empresa no balcão', en: 'Incorporate the company at the counter', nl: 'Het bedrijf aan de balie oprichten' },
        description: { pt: 'Entregar a documentação e constituir a empresa no mesmo dia.', en: 'Submit the documents and incorporate the company the same day.', nl: 'Lever de documenten in en richt het bedrijf dezelfde dag op.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Identificação dos sócios', en: 'Partners identification', nl: 'Identificatie van de vennoten' }, { pt: 'Comprovativo de capital', en: 'Proof of capital', nl: 'Bewijs van kapitaal' }], estimatedDays: 1 },
    ] },
];

export const PUBLICATIONS: Publication[] = [
  { title: { pt: 'Requisitos da licença de construção — São Vicente (demo)', en: 'Building permit requirements — São Vicente (demo)', nl: 'Vereisten bouwvergunning — São Vicente (demo)' },
    govEntity: 'Câmara Municipal de São Vicente (demo)', officialStatus: false, version: 1, updatedAt: '2026-07-01', validFrom: '2026-07-01',
    plainSummary: { pt: 'Resumo em linguagem simples dos passos para a licença de construção (demonstração).', en: 'Plain-language summary of the building-permit steps (demo).', nl: 'Samenvatting in eenvoudige taal van de stappen voor de bouwvergunning (demo).' } },
  { title: { pt: 'Reforma fiscal imobiliária 2026: cITI e cIPI (demo)', en: '2026 real-estate tax reform: cITI and cIPI (demo)', nl: 'Vastgoedbelastinghervorming 2026: cITI en cIPI (demo)' },
    govEntity: 'Portal informativo Ilhavista', officialStatus: false, version: 2, updatedAt: '2026-06-15', validFrom: '2026-01-01',
    plainSummary: { pt: 'Desde 1 de janeiro de 2026 o IUP foi substituído pelo cITI (transmissão) e cIPI (propriedade). Resumo indicativo — confirmar com as Finanças.', en: 'Since 1 January 2026 the IUP has been replaced by cITI (transfer) and cIPI (ownership). Indicative summary — confirm with the tax authority.', nl: 'Sinds 1 januari 2026 is de IUP vervangen door cITI (overdracht) en cIPI (eigendom). Indicatieve samenvatting — bevestig bij de Belastingdienst.' } },
];

export function searchListings(opts: { q?: string; kind?: string; islandCode?: string }, l: Locale): Listing[] {
  const nameByCode: Record<string, string> = { SV: 'São Vicente', ST: 'Santiago', SL: 'Sal', BV: 'Boa Vista' };
  let rows = LISTINGS.slice();
  if (opts.kind) rows = rows.filter((r) => r.kind === opts.kind);
  const island = opts.islandCode ? nameByCode[opts.islandCode] : undefined;
  if (island) rows = rows.filter((r) => r.island === island);
  if (opts.q) { const q = opts.q.toLowerCase(); rows = rows.filter((r) => tr(r.title, l).toLowerCase().includes(q) || tr(r.description, l).toLowerCase().includes(q)); }
  return rows.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}
export const getListing = (slug: string): Listing | undefined => LISTINGS.find((l) => l.slug === slug);
export const getProcedure = (slug: string): Procedure | undefined => PROCEDURES.find((p) => p.slug === slug);
