// Category × island landing-page definitions (SEO/GEO). Two-segment routes such as
// /imoveis/venda/sao-vicente and /profissionais/advogados/sao-vicente target the
// high-intent, place-specific searches that the generic list pages cannot rank for.
// Titles keep "Cabo Verde" for disambiguation; copy is trilingual (PT/EN/NL).
import type { Metadata } from 'next';
import { tr, proCategoryLabel, type Locale, type TL } from '@/i18n';
import { altLangs } from '@/lib/seo';
import { ISLAND_GUIDES, type IslandGuide } from '@/content/islands';

/** area slug -> island guide (name/code/copy). Drives every landing page. */
export const AREAS: Record<string, IslandGuide> = Object.fromEntries(ISLAND_GUIDES.map((g): [string, IslandGuide] => [g.slug, g]));
export const AREA_SLUGS: string[] = ISLAND_GUIDES.map((g) => g.slug);
export const getArea = (slug: string): IslandGuide | undefined => AREAS[slug];

type Copy = (area: string) => TL;

// ---------------------------------------------------------------------------
// Property landings - /imoveis/<deal>/<area>. `kind` matches the listing kind.
// ---------------------------------------------------------------------------
export interface DealDef { slug: string; kind: string; label: TL; title: Copy; h1: Copy; desc: Copy; blurb: Copy }

export const PROPERTY_DEALS: Record<string, DealDef> = {
  venda: {
    slug: 'venda', kind: 'PROPERTY_SALE',
    label: { pt: 'Venda', en: 'For sale', nl: 'Te koop' },
    title: (a) => ({ pt: `Casas à venda em ${a}, Cabo Verde`, en: `Houses for sale in ${a}, Cape Verde`, nl: `Huizen te koop op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Casas à venda em ${a}`, en: `Houses for sale in ${a}`, nl: `Huizen te koop op ${a}` }),
    desc: (a) => ({ pt: `Veja casas e apartamentos à venda em ${a}, Cabo Verde. Cada anúncio indica o estado dos documentos. Peça visita pelo Djarvista.`, en: `Browse houses and apartments for sale in ${a}, Cape Verde. Every listing shows its document status. Request a viewing via Djarvista.`, nl: `Bekijk huizen en appartementen te koop op ${a}, Kaapverdië. Elke advertentie toont de documentstatus. Vraag een bezichtiging via Djarvista.` }),
    blurb: (a) => ({ pt: `Encontre casas e apartamentos à venda em ${a}, Cabo Verde. No Djarvista cada anúncio mostra o estado dos documentos e liga-o diretamente a quem vende - sem intermediários escondidos.`, en: `Find houses and apartments for sale in ${a}, Cabo Verde. On Djarvista every listing shows its document status and connects you directly to the seller - no hidden middlemen.`, nl: `Vind huizen en appartementen te koop op ${a}, Kaapverdië. Op Djarvista toont elke advertentie de documentstatus en verbindt je direct met de verkoper - zonder verborgen tussenpersonen.` }),
  },
  terrenos: {
    slug: 'terrenos', kind: 'LAND',
    label: { pt: 'Terrenos', en: 'Land', nl: 'Grond' },
    title: (a) => ({ pt: `Terrenos à venda em ${a}, Cabo Verde`, en: `Land for sale in ${a}, Cape Verde`, nl: `Grond te koop op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Terrenos à venda em ${a}`, en: `Land for sale in ${a}`, nl: `Bouwgrond te koop op ${a}` }),
    desc: (a) => ({ pt: `Terrenos e lotes para construção à venda em ${a}, Cabo Verde. Veja área, zonamento e viabilidade antes de comprar.`, en: `Building plots and land for sale in ${a}, Cape Verde. Check area, zoning and buildability before you buy.`, nl: `Bouwgrond en kavels te koop op ${a}, Kaapverdië. Controleer oppervlakte, bestemming en bebouwbaarheid vóór je koopt.` }),
    blurb: (a) => ({ pt: `Procura terreno em ${a}, Cabo Verde? Confirme sempre a titularidade, o zonamento e a viabilidade de construção junto da Câmara Municipal e de um notário antes de qualquer sinal.`, en: `Looking for land in ${a}, Cabo Verde? Always confirm ownership, zoning and buildability with the municipality and a notary before paying any deposit.`, nl: `Op zoek naar grond op ${a}, Kaapverdië? Bevestig altijd eigendom, bestemming en bebouwbaarheid bij de gemeente en een notaris vóór je een aanbetaling doet.` }),
  },
  arrendar: {
    slug: 'arrendar', kind: 'PROPERTY_RENT',
    label: { pt: 'Arrendar', en: 'To rent', nl: 'Te huur' },
    title: (a) => ({ pt: `Casas para arrendar em ${a}, Cabo Verde`, en: `Homes to rent in ${a}, Cape Verde`, nl: `Huizen te huur op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Casas e apartamentos para arrendar em ${a}`, en: `Homes and apartments to rent in ${a}`, nl: `Huizen en appartementen te huur op ${a}` }),
    desc: (a) => ({ pt: `Apartamentos e casas para arrendar em ${a}, Cabo Verde - arrendamento de longa duração, T1, T2 e T3.`, en: `Apartments and houses to rent long-term in ${a}, Cape Verde - T1, T2 and T3.`, nl: `Appartementen en huizen voor langere termijn te huur op ${a}, Kaapverdië - T1, T2 en T3.` }),
    blurb: (a) => ({ pt: `Casas e apartamentos para arrendar em ${a}, Cabo Verde. A Djarvista dá-lhe também o gerador de contrato de arrendamento e a verificação de identidade para arrendar com confiança.`, en: `Houses and apartments to rent in ${a}, Cabo Verde. Djarvista also gives you the rental-contract generator and identity verification to rent with confidence.`, nl: `Huizen en appartementen te huur op ${a}, Kaapverdië. Djarvista biedt ook de huurcontract-generator en identiteitsverificatie om met vertrouwen te huren.` }),
  },
  ferias: {
    slug: 'ferias', kind: 'HOLIDAY_RENT',
    label: { pt: 'Férias', en: 'Holiday', nl: 'Vakantie' },
    title: (a) => ({ pt: `Casas de férias em ${a}, Cabo Verde`, en: `Holiday rentals in ${a}, Cape Verde`, nl: `Vakantiehuizen op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Casas de férias em ${a}`, en: `Holiday rentals in ${a}`, nl: `Vakantiehuizen op ${a}` }),
    desc: (a) => ({ pt: `Casas, apartamentos e villas de férias em ${a}, Cabo Verde. Reserve a sua estadia com anfitriões locais.`, en: `Holiday homes, apartments and villas in ${a}, Cape Verde. Book your stay with local hosts.`, nl: `Vakantiewoningen, appartementen en villa’s op ${a}, Kaapverdië. Boek je verblijf bij lokale hosts.` }),
    blurb: (a) => ({ pt: `Casas de férias em ${a}, Cabo Verde, para alugar por temporada. Contacte diretamente os anfitriões locais pelo Djarvista.`, en: `Holiday homes in ${a}, Cabo Verde for seasonal stays. Contact local hosts directly through Djarvista.`, nl: `Vakantiehuizen op ${a}, Kaapverdië voor verblijf per seizoen. Neem direct contact op met lokale hosts via Djarvista.` }),
  },
  'novos-projetos': {
    slug: 'novos-projetos', kind: 'NEW_DEVELOPMENT',
    label: { pt: 'Novos projetos', en: 'New builds', nl: 'Nieuwbouw' },
    title: (a) => ({ pt: `Novos projetos em ${a}, Cabo Verde`, en: `New developments in ${a}, Cape Verde`, nl: `Nieuwbouw op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Novos projetos e empreendimentos em ${a}`, en: `New developments in ${a}`, nl: `Nieuwbouwprojecten op ${a}` }),
    desc: (a) => ({ pt: `Novos empreendimentos e imóveis em planta em ${a}, Cabo Verde. Veja projetos em construção e oportunidades de investimento.`, en: `New developments and off-plan property in ${a}, Cape Verde. See projects under construction and investment opportunities.`, nl: `Nieuwbouwprojecten en vastgoed op plan op ${a}, Kaapverdië. Bekijk projecten in aanbouw en investeringskansen.` }),
    blurb: (a) => ({ pt: `Novos empreendimentos em ${a}, Cabo Verde. Confirme licenças, prazos e o estado do registo do empreendimento antes de reservar em planta.`, en: `New developments in ${a}, Cabo Verde. Confirm permits, timelines and the development’s registration status before reserving off-plan.`, nl: `Nieuwbouwprojecten op ${a}, Kaapverdië. Bevestig vergunningen, opleverdata en de registratiestatus van het project vóór je op plan reserveert.` }),
  },
  comercial: {
    slug: 'comercial', kind: 'COMMERCIAL',
    label: { pt: 'Comercial', en: 'Commercial', nl: 'Commercieel' },
    title: (a) => ({ pt: `Imóveis comerciais em ${a}, Cabo Verde`, en: `Commercial property in ${a}, Cape Verde`, nl: `Bedrijfsvastgoed op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Imóveis comerciais em ${a}`, en: `Commercial property in ${a}`, nl: `Bedrijfsvastgoed op ${a}` }),
    desc: (a) => ({ pt: `Lojas, escritórios e espaços comerciais para comprar ou arrendar em ${a}, Cabo Verde.`, en: `Shops, offices and commercial space to buy or rent in ${a}, Cape Verde.`, nl: `Winkels, kantoren en bedrijfsruimte te koop of te huur op ${a}, Kaapverdië.` }),
    blurb: (a) => ({ pt: `Espaços comerciais em ${a}, Cabo Verde - lojas, escritórios e armazéns para comprar ou arrendar. Contacte diretamente pelo Djarvista.`, en: `Commercial space in ${a}, Cabo Verde - shops, offices and warehouses to buy or rent. Contact directly through Djarvista.`, nl: `Bedrijfsruimte op ${a}, Kaapverdië - winkels, kantoren en loodsen te koop of te huur. Neem direct contact op via Djarvista.` }),
  },
};
export const PROPERTY_DEAL_SLUGS: string[] = Object.keys(PROPERTY_DEALS);

// ---------------------------------------------------------------------------
// Professional landings - /profissionais/<category>/<area>.
// `category` must match the DB `professionals.category` value exactly.
// ---------------------------------------------------------------------------
const CLAIM_NOTE: TL = {
  pt: ' Perfis a partir de fontes públicas, prontos a serem reclamados e verificados pelo próprio negócio.',
  en: ' Profiles compiled from public sources, ready to be claimed and verified by the business itself.',
  nl: ' Profielen samengesteld uit openbare bronnen, klaar om door het bedrijf zelf te worden geclaimd en geverifieerd.',
};
const withClaim = (lead: TL): TL => ({ pt: lead.pt + CLAIM_NOTE.pt, en: lead.en + CLAIM_NOTE.en, nl: lead.nl + CLAIM_NOTE.nl });

export interface CatDef { slug: string; category: string; title: Copy; h1: Copy; desc: Copy; blurb: Copy }

export const PRO_CATEGORIES: Record<string, CatDef> = {
  advogados: {
    slug: 'advogados', category: 'Advogados',
    title: (a) => ({ pt: `Advogados em ${a}, Cabo Verde`, en: `Lawyers in ${a}, Cape Verde`, nl: `Advocaten op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Advogados em ${a}`, en: `Lawyers in ${a}`, nl: `Advocaten op ${a}` }),
    desc: (a) => ({ pt: `Encontre advogados em ${a}, Cabo Verde: compra de imóveis, escrituras e direito imobiliário. Contacte via Djarvista.`, en: `Find lawyers in ${a}, Cape Verde for property purchases, deeds and real-estate law. Contact via Djarvista.`, nl: `Vind advocaten op ${a}, Kaapverdië voor vastgoedaankoop, aktes en vastgoedrecht. Contact via Djarvista.` }),
    blurb: (a) => withClaim({ pt: `Advogados e escritórios de advogados em ${a}, Cabo Verde, para compra de imóveis, escrituras e direito imobiliário.`, en: `Lawyers and law firms in ${a}, Cabo Verde for property purchases, deeds and real-estate law.`, nl: `Advocaten en advocatenkantoren op ${a}, Kaapverdië voor vastgoedaankoop, aktes en vastgoedrecht.` }),
  },
  'ar-condicionado': {
    slug: 'ar-condicionado', category: 'Climatização',
    title: (a) => ({ pt: `Ar condicionado em ${a}, Cabo Verde`, en: `Air conditioning in ${a}, Cape Verde`, nl: `Airco op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Ar condicionado e climatização em ${a}`, en: `Air conditioning in ${a}`, nl: `Airco en klimaatbeheersing op ${a}` }),
    desc: (a) => ({ pt: `Instalação, manutenção e reparação de ar condicionado em ${a}, Cabo Verde. Peça orçamento a técnicos locais.`, en: `Air-conditioning install, service and repair in ${a}, Cape Verde. Get quotes from local technicians.`, nl: `Airco installeren, onderhouden en repareren op ${a}, Kaapverdië. Vraag offertes bij lokale monteurs.` }),
    blurb: (a) => withClaim({ pt: `Instalação, manutenção e reparação de ar condicionado em ${a}, Cabo Verde.`, en: `Air-conditioning installation, service and repair in ${a}, Cabo Verde.`, nl: `Airco installeren, onderhouden en repareren op ${a}, Kaapverdië.` }),
  },
  'construcao-civil': {
    slug: 'construcao-civil', category: 'Construção civil',
    title: (a) => ({ pt: `Construção civil em ${a}, Cabo Verde`, en: `Construction firms in ${a}, Cape Verde`, nl: `Bouwbedrijven op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Construção civil em ${a}`, en: `Construction and builders in ${a}`, nl: `Bouw en aannemers op ${a}` }),
    desc: (a) => ({ pt: `Empreiteiros e empresas de construção civil em ${a}, Cabo Verde - obras novas e remodelações.`, en: `Builders and construction companies in ${a}, Cape Verde - new builds and renovations.`, nl: `Aannemers en bouwbedrijven op ${a}, Kaapverdië - nieuwbouw en renovatie.` }),
    blurb: (a) => withClaim({ pt: `Empreiteiros e empresas de construção civil em ${a}, Cabo Verde, para obras novas e remodelações.`, en: `Builders and construction companies in ${a}, Cabo Verde for new builds and renovations.`, nl: `Aannemers en bouwbedrijven op ${a}, Kaapverdië voor nieuwbouw en renovatie.` }),
  },
  arquitetura: {
    slug: 'arquitetura', category: 'Arquitetura',
    title: (a) => ({ pt: `Arquitetos em ${a}, Cabo Verde`, en: `Architects in ${a}, Cape Verde`, nl: `Architecten op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Arquitetura e projeto em ${a}`, en: `Architecture and design in ${a}`, nl: `Architectuur en ontwerp op ${a}` }),
    desc: (a) => ({ pt: `Arquitetos e ateliers em ${a}, Cabo Verde para o seu projeto de construção e licenciamento.`, en: `Architects and studios in ${a}, Cape Verde for your building project and permit.`, nl: `Architecten en bureaus op ${a}, Kaapverdië voor je bouwproject en vergunning.` }),
    blurb: (a) => withClaim({ pt: `Arquitetos e ateliers de arquitetura em ${a}, Cabo Verde, para projeto e licenciamento.`, en: `Architects and design studios in ${a}, Cabo Verde for design and permits.`, nl: `Architecten en ontwerpbureaus op ${a}, Kaapverdië voor ontwerp en vergunningen.` }),
  },
  serralharia: {
    slug: 'serralharia', category: 'Serralharia',
    title: (a) => ({ pt: `Serralharia em ${a}, Cabo Verde`, en: `Metalwork in ${a}, Cape Verde`, nl: `Metaalbouw op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Serralharia em ${a}`, en: `Metalwork in ${a}`, nl: `Metaalbouw op ${a}` }),
    desc: (a) => ({ pt: `Serralheiros em ${a}, Cabo Verde: portões, gradeamentos, estruturas e alumínios.`, en: `Metalworkers in ${a}, Cape Verde: gates, railings, structures and aluminium.`, nl: `Metaalbewerkers op ${a}, Kaapverdië: poorten, hekwerk, constructies en aluminium.` }),
    blurb: (a) => withClaim({ pt: `Serralheiros e oficinas de serralharia em ${a}, Cabo Verde: portões, gradeamentos, estruturas e alumínios.`, en: `Metalworkers and workshops in ${a}, Cabo Verde: gates, railings, structures and aluminium.`, nl: `Metaalbewerkers en werkplaatsen op ${a}, Kaapverdië: poorten, hekwerk, constructies en aluminium.` }),
  },
  despachante: {
    slug: 'despachante', category: 'Despachante oficial',
    title: (a) => ({ pt: `Despachantes em ${a}, Cabo Verde`, en: `Customs brokers in ${a}, Cape Verde`, nl: `Douaneagenten op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Despachantes oficiais em ${a}`, en: `Customs brokers in ${a}`, nl: `Douaneagenten op ${a}` }),
    desc: (a) => ({ pt: `Despachantes oficiais em ${a}, Cabo Verde para desalfandegamento e importação de bens e materiais.`, en: `Licensed customs brokers in ${a}, Cape Verde for customs clearance and imports.`, nl: `Officiële douaneagenten op ${a}, Kaapverdië voor inklaring en import.` }),
    blurb: (a) => withClaim({ pt: `Despachantes oficiais em ${a}, Cabo Verde, para desalfandegamento e importação de bens e materiais.`, en: `Licensed customs brokers in ${a}, Cabo Verde for customs clearance and importing goods and materials.`, nl: `Officiële douaneagenten op ${a}, Kaapverdië voor inklaring en import van goederen en materialen.` }),
  },
  limpeza: {
    slug: 'limpeza', category: 'Limpeza',
    title: (a) => ({ pt: `Serviços de limpeza em ${a}, Cabo Verde`, en: `Cleaning services in ${a}, Cape Verde`, nl: `Schoonmaakdiensten op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Serviços de limpeza em ${a}`, en: `Cleaning services in ${a}`, nl: `Schoonmaakdiensten op ${a}` }),
    desc: (a) => ({ pt: `Empresas e serviços de limpeza em ${a}, Cabo Verde - doméstica, comercial e pós-obra.`, en: `Cleaning companies and services in ${a}, Cape Verde - domestic, commercial and post-construction.`, nl: `Schoonmaakbedrijven en -diensten op ${a}, Kaapverdië - huishoudelijk, commercieel en na de bouw.` }),
    blurb: (a) => withClaim({ pt: `Empresas e serviços de limpeza em ${a}, Cabo Verde - limpeza doméstica, comercial e pós-obra.`, en: `Cleaning companies and services in ${a}, Cabo Verde - domestic, commercial and post-construction.`, nl: `Schoonmaakbedrijven en -diensten op ${a}, Kaapverdië - huishoudelijk, commercieel en na de bouw.` }),
  },
  gas: {
    slug: 'gas', category: 'Gás',
    title: (a) => ({ pt: `Gás em ${a}, Cabo Verde`, en: `Gas supply in ${a}, Cape Verde`, nl: `Gas op ${a}, Kaapverdië` }),
    h1: (a) => ({ pt: `Distribuição de gás em ${a}`, en: `Gas supply in ${a}`, nl: `Gasdistributie op ${a}` }),
    desc: (a) => ({ pt: `Distribuição e botijas de gás em ${a}, Cabo Verde. Contacte fornecedores locais.`, en: `Gas supply and bottled gas in ${a}, Cape Verde. Contact local suppliers.`, nl: `Gasdistributie en gasflessen op ${a}, Kaapverdië. Neem contact op met lokale leveranciers.` }),
    blurb: (a) => withClaim({ pt: `Distribuição e botijas de gás em ${a}, Cabo Verde.`, en: `Gas distribution and bottled gas in ${a}, Cabo Verde.`, nl: `Gasdistributie en gasflessen op ${a}, Kaapverdië.` }),
  },
};
export const PRO_CATEGORY_SLUGS: string[] = Object.keys(PRO_CATEGORIES);

// ---------------------------------------------------------------------------
// Materials landing - /materiais/<area> (suppliers filtered by island name).
// ---------------------------------------------------------------------------
export const MATERIALS = {
  title: (a: string): TL => ({ pt: `Materiais de construção em ${a}, Cabo Verde`, en: `Building materials in ${a}, Cape Verde`, nl: `Bouwmaterialen op ${a}, Kaapverdië` }),
  h1: (a: string): TL => ({ pt: `Materiais de construção em ${a}`, en: `Building materials in ${a}`, nl: `Bouwmaterialen op ${a}` }),
  desc: (a: string): TL => ({ pt: `Lojas e fornecedores de materiais de construção em ${a}, Cabo Verde - cimento, agregados e ferragens.`, en: `Building-material suppliers and shops in ${a}, Cape Verde - cement, aggregates and hardware.`, nl: `Leveranciers en winkels voor bouwmaterialen op ${a}, Kaapverdië - cement, granulaat en ijzerwaren.` }),
  blurb: (a: string): TL => ({ pt: `Fornecedores de materiais de construção em ${a}, Cabo Verde. Perfis a partir de fontes públicas, prontos a serem reclamados pelo negócio.`, en: `Building-material suppliers in ${a}, Cabo Verde. Profiles from public sources, ready to be claimed by the business.`, nl: `Leveranciers van bouwmaterialen op ${a}, Kaapverdië. Profielen uit openbare bronnen, klaar om door het bedrijf te worden geclaimd.` }),
};

// ---------------------------------------------------------------------------
// Metadata helpers (return null for unknown combos → the page calls notFound()).
// ---------------------------------------------------------------------------
export function propertyLandingMeta(locale: Locale, dealSlug: string, areaSlug: string): Metadata | null {
  const deal = PROPERTY_DEALS[dealSlug]; const area = AREAS[areaSlug];
  if (!deal || !area) return null;
  return { title: tr(deal.title(area.name), locale), description: tr(deal.desc(area.name), locale), alternates: altLangs(locale, `/imoveis/${dealSlug}/${areaSlug}`) };
}
export function proLandingMeta(locale: Locale, catSlug: string, areaSlug: string): Metadata | null {
  const cat = PRO_CATEGORIES[catSlug]; const area = AREAS[areaSlug];
  if (!cat || !area) return null;
  return { title: tr(cat.title(area.name), locale), description: tr(cat.desc(area.name), locale), alternates: altLangs(locale, `/profissionais/${catSlug}/${areaSlug}`) };
}
export function materialsLandingMeta(locale: Locale, areaSlug: string): Metadata | null {
  const area = AREAS[areaSlug];
  if (!area) return null;
  return { title: tr(MATERIALS.title(area.name), locale), description: tr(MATERIALS.desc(area.name), locale), alternates: altLangs(locale, `/materiais/${areaSlug}`) };
}

/** All landing sub-paths (no locale prefix) for the sitemap. Property landings
 *  cover every island; directory landings start on São Vicente, where the
 *  verified businesses are, to avoid advertising empty pages. */
export function landingPaths(): string[] {
  const out: string[] = [];
  for (const d of PROPERTY_DEAL_SLUGS) for (const a of AREA_SLUGS) out.push(`/imoveis/${d}/${a}`);
  for (const c of PRO_CATEGORY_SLUGS) out.push(`/profissionais/${c}/sao-vicente`);
  out.push('/materiais/sao-vicente');
  return out;
}

/** Compact, site-wide "popular searches" links for the footer (São Vicente). */
export function popularLandings(locale: Locale): { href: string; label: string }[] {
  const sv = AREAS['sao-vicente'].name;
  return [
    { href: '/imoveis/venda/sao-vicente', label: tr(PROPERTY_DEALS.venda.h1(sv), locale) },
    { href: '/imoveis/terrenos/sao-vicente', label: tr(PROPERTY_DEALS.terrenos.h1(sv), locale) },
    { href: '/imoveis/arrendar/sao-vicente', label: tr({ pt: `Arrendar em ${sv}`, en: `To rent in ${sv}`, nl: `Huren op ${sv}` }, locale) },
    { href: '/profissionais/advogados/sao-vicente', label: `${proCategoryLabel(locale, 'Advogados')} · ${sv}` },
    { href: '/profissionais/ar-condicionado/sao-vicente', label: `${proCategoryLabel(locale, 'Climatização')} · ${sv}` },
    { href: '/profissionais/construcao-civil/sao-vicente', label: `${proCategoryLabel(locale, 'Construção civil')} · ${sv}` },
    { href: '/materiais/sao-vicente', label: tr(MATERIALS.h1(sv), locale) },
  ];
}
