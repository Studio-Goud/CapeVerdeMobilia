import type { Metadata } from 'next';
import { tr, type Locale, type TL } from '@/i18n';

const BASE = 'https://www.djarvista.com';

/** Correct per-page canonical + hreflang alternates. `path` is the sub-path
 *  WITHOUT the locale prefix - '' for the locale home, '/imoveis', '/imoveis/x'. */
export function altLangs(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      pt: `${BASE}/pt${path}`,
      en: `${BASE}/en${path}`,
      nl: `${BASE}/nl${path}`,
      'x-default': `${BASE}/pt${path}`,
    },
  };
}

/** Keyword-targeted, trilingual title + description + correct hreflang for a page. */
export function pageMeta(locale: Locale, path: string, title: TL, description: TL): Metadata {
  return { title: tr(title, locale), description: tr(description, locale), alternates: altLangs(locale, path) };
}

/** Trilingual title + description for the remaining public pages, keyed by path. */
const PAGES: Record<string, { title: TL; description: TL }> = {
  '/mapa': {
    title: { pt: 'Mapa de imóveis em Cabo Verde', en: 'Property map of Cabo Verde', nl: 'Vastgoedkaart van Kaapverdië' },
    description: { pt: 'Explore casas, apartamentos e terrenos num mapa de São Vicente e de todo o Cabo Verde. Encontre imóveis por localização.', en: 'Explore houses, apartments and land on a map of São Vicente and all of Cabo Verde. Find property by location.', nl: 'Verken huizen, appartementen en grond op een kaart van São Vicente en heel Kaapverdië. Vind vastgoed op locatie.' },
  },
  '/servicos': {
    title: { pt: 'Serviços em Cabo Verde', en: 'Services in Cabo Verde', nl: 'Diensten in Kaapverdië' },
    description: { pt: 'Anúncios de serviços em São Vicente e Cabo Verde. Encontre e contacte prestadores de serviços locais no Djarvista.', en: 'Service listings in São Vicente and Cabo Verde. Find and contact local service providers on Djarvista.', nl: 'Diensten-advertenties in São Vicente en Kaapverdië. Vind en contacteer lokale dienstverleners op Djarvista.' },
  },
  '/arrendar': {
    title: { pt: 'Arrende a sua casa em Cabo Verde', en: 'Rent out your home in Cabo Verde', nl: 'Verhuur je woning in Kaapverdië' },
    description: { pt: 'Publique a sua casa para arrendar em São Vicente e Cabo Verde: receba pedidos e formalize o contrato com confiança. Comece grátis.', en: 'List your home to rent in São Vicente and Cabo Verde: receive requests and formalise the contract with confidence. Start free.', nl: 'Plaats je woning te huur op São Vicente en Kaapverdië: ontvang aanvragen en sluit het contract met vertrouwen. Start gratis.' },
  },
  '/contrato': {
    title: { pt: 'Gerador de contrato de arrendamento (Cabo Verde)', en: 'Rental contract generator (Cabo Verde)', nl: 'Huurcontract-generator (Kaapverdië)' },
    description: { pt: 'Gere um contrato de arrendamento pro-forma para Cabo Verde, com ligações aos artigos da lei. Self-service, indicativo - não é aconselhamento jurídico.', en: 'Generate a pro-forma tenancy contract for Cabo Verde, with links to the law. Self-service, indicative - not legal advice.', nl: 'Genereer een pro-forma huurcontract voor Kaapverdië, met verwijzingen naar de wet. Self-service, indicatief - geen juridisch advies.' },
  },
  '/assistente': {
    title: { pt: 'Assistente de construção em Cabo Verde', en: 'Building assistant for Cabo Verde', nl: 'Bouw-assistent voor Kaapverdië' },
    description: { pt: 'Planeie a sua construção em Cabo Verde passo a passo: do terreno à licença. Encontre profissionais e materiais no Djarvista.', en: 'Plan your build in Cabo Verde step by step: from land to permit. Find professionals and materials on Djarvista.', nl: 'Plan je bouwproject in Kaapverdië stap voor stap: van grond tot vergunning. Vind professionals en materialen op Djarvista.' },
  },
  '/projetos': {
    title: { pt: 'Projetos de construção em Cabo Verde', en: 'Construction projects in Cabo Verde', nl: 'Bouwprojecten in Kaapverdië' },
    description: { pt: 'Portefólio de projetos de construção em São Vicente e Cabo Verde, com progresso e milestones. Veja o trabalho de empresas locais.', en: 'Portfolio of construction projects in São Vicente and Cabo Verde, with progress and milestones. See the work of local firms.', nl: 'Portfolio van bouwprojecten in São Vicente en Kaapverdië, met voortgang en mijlpalen. Bekijk het werk van lokale bedrijven.' },
  },
  '/concursos': {
    title: { pt: 'Concursos e adjudicações em Cabo Verde', en: 'Tenders and bids in Cabo Verde', nl: 'Aanbestedingen in Kaapverdië' },
    description: { pt: 'Concursos de construção e serviços em São Vicente e Cabo Verde. Publique um concurso ou apresente a sua proposta no Djarvista.', en: 'Construction and service tenders in São Vicente and Cabo Verde. Post a tender or submit your bid on Djarvista.', nl: 'Aanbestedingen voor bouw en diensten in São Vicente en Kaapverdië. Plaats een aanbesteding of dien je bod in op Djarvista.' },
  },
  '/governo': {
    title: { pt: 'Djarvista para organismos públicos', en: 'Djarvista for public bodies', nl: 'Djarvista voor overheidsinstanties' },
    description: { pt: 'Como a Djarvista torna a informação oficial mais fácil de encontrar e consultar, em benefício dos organismos públicos de Cabo Verde.', en: 'How Djarvista makes official information easier to find and access, for the benefit of public bodies in Cabo Verde.', nl: 'Hoe Djarvista officiële informatie makkelijker vindbaar maakt, ten dienste van overheidsinstanties in Kaapverdië.' },
  },
  '/investir': {
    title: { pt: 'Investir em imóveis em Cabo Verde', en: 'Investing in property in Cabo Verde', nl: 'Investeren in vastgoed in Kaapverdië' },
    description: { pt: 'Investir em imóveis em Cabo Verde e São Vicente: tipos, custos, impostos (cITI/cIPI) e passos, para a diáspora e investidores. Guia indicativo.', en: 'Investing in property in Cabo Verde and São Vicente: types, costs, taxes (cITI/cIPI) and steps - for the diaspora and investors. Indicative.', nl: 'Investeren in vastgoed in Kaapverdië en São Vicente: soorten, kosten, belasting (cITI/cIPI) en stappen - voor de diaspora en investeerders. Indicatief.' },
  },
  '/precos': {
    title: { pt: 'Preços e planos - Djarvista', en: 'Pricing and plans - Djarvista', nl: 'Prijzen en abonnementen - Djarvista' },
    description: { pt: 'Preços da Djarvista: base gratuita e planos justos para anunciar imóveis e serviços em Cabo Verde. Sem custos escondidos.', en: 'Djarvista pricing: a free base and fair plans to list property and services in Cabo Verde. No hidden costs.', nl: 'Djarvista-prijzen: gratis basis en eerlijke abonnementen om vastgoed en diensten in Kaapverdië te adverteren. Geen verborgen kosten.' },
  },
  '/verificacao': {
    title: { pt: 'Confiança e verificação em Cabo Verde', en: 'Trust and verification in Cabo Verde', nl: 'Vertrouwen en verificatie in Kaapverdië' },
    description: { pt: 'Como a Djarvista verifica pessoas e empresas: seis níveis de confiança, com controlo humano. Verificações sensíveis nunca só por IA.', en: 'How Djarvista verifies people and businesses: six trust levels, with human control. Sensitive checks are never AI-only.', nl: 'Hoe Djarvista mensen en bedrijven verifieert: zes vertrouwensniveaus, met menselijke controle. Gevoelige checks nooit alleen door AI.' },
  },
};

/** Full metadata (title/description/hreflang) for a public page by path. */
export function pageMetaFor(locale: Locale, path: string): Metadata {
  const p = PAGES[path];
  return p ? pageMeta(locale, path, p.title, p.description) : { alternates: altLangs(locale, path) };
}

/** Metadata for private / utility pages that should not be indexed (login, forms,
 *  dashboards). Screaming Frog reads this as an intentional directive, not an error. */
export function metaNoindex(title: string): Metadata {
  return { title, robots: { index: false, follow: true } };
}
