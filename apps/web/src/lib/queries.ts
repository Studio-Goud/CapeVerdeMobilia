import type { ListingSearchInput } from '@ilhavista/validation';
import type { VerificationLevel } from '@ilhavista/ui';

/**
 * DEMO DATA PROVIDER.
 *
 * For the public demo deployment the web app runs WITHOUT a database: all reads
 * are served from the fictional in-memory dataset below (mirrors the Prisma
 * seed). The real database-backed implementation lives in
 * `packages/database` (see `packages/database/src/queries.ts`) and is wired in
 * when `DATABASE_URL` is configured. Everything here is FICTIONAL demo content.
 */

export const IS_DEMO = !process.env.DATABASE_URL;

export interface DemoListingRow {
  id: string;
  slug: string;
  kind: string;
  title: string;
  description: string | null;
  priceAmount: number | null;
  priceCurrency: string;
  priceOnRequest: boolean;
  isFeatured: boolean;
  documentStatus: string;
  publishedAt: Date | null;
  lastVerifiedAt: Date | null;
  riskNotes: string | null;
  location: { island: { name: string } | null; municipality: { name: string } | null } | null;
  media: { url: string }[];
  property: {
    type: string;
    bedrooms: number | null;
    bathrooms: number | null;
    builtAreaSqm: number | null;
    plotAreaSqm: number | null;
  } | null;
  landParcel: {
    type: string;
    areaSqm: number | null;
    zoning: string | null;
    buildable: boolean | null;
  } | null;
}

export interface DemoProfessional {
  id: string;
  slug: string;
  displayName: string;
  headline: string | null;
  ratingAvg: number | null;
  ratingCount: number;
  verificationLevel: VerificationLevel;
  serviceAreas: string[];
  priceIndication: string | null;
}

export interface DemoProcedureStep {
  id: string;
  sortOrder: number;
  title: string;
  description: string | null;
  responsibleEntity: string | null;
  requiredDocuments: string[];
  estimatedDays: number | null;
}

export interface DemoProcedure {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  estimatedDays: number | null;
  govEntity: { name: string } | null;
  steps: DemoProcedureStep[];
}

export interface DemoPublication {
  id: string;
  title: string;
  govEntity: { name: string };
  officialStatus: boolean;
  version: number;
  updatedAt: Date;
  validFrom: Date | null;
  plainSummary: string | null;
}

const img = (label: string): string => `https://placehold.co/1200x800/0e7490/ffffff?text=${encodeURIComponent(label)}`;

const LISTINGS: DemoListingRow[] = [
  {
    id: 'demo-l1',
    slug: 'villa-vista-mar-monte-sossego',
    kind: 'PROPERTY_SALE',
    title: 'Villa com vista mar — Monte Sossego, Mindelo',
    description:
      'Villa de 3 quartos com vista para a baía de Mindelo. Documentos declarados, verificação pendente. (Dados fictícios de demonstração.)',
    priceAmount: 18500000,
    priceCurrency: 'CVE',
    priceOnRequest: false,
    isFeatured: true,
    documentStatus: 'DECLARED',
    publishedAt: new Date('2026-06-10'),
    lastVerifiedAt: null,
    riskNotes: null,
    location: { island: { name: 'São Vicente' }, municipality: { name: 'São Vicente' } },
    media: [{ url: img('Villa Mindelo') }],
    property: { type: 'VILLA', bedrooms: 3, bathrooms: 2, builtAreaSqm: 180, plotAreaSqm: 420 },
    landParcel: null,
  },
  {
    id: 'demo-l2',
    slug: 'terreno-600m2-monte-sossego',
    kind: 'LAND',
    title: 'Terreno para construção 600 m² — Monte Sossego',
    description:
      'Terreno construível com boa exposição. Zonamento e viabilidade a confirmar com a Câmara Municipal. (Dados fictícios.)',
    priceAmount: 4200000,
    priceCurrency: 'CVE',
    priceOnRequest: false,
    isFeatured: false,
    documentStatus: 'DECLARED',
    publishedAt: new Date('2026-06-14'),
    lastVerifiedAt: null,
    riskNotes: 'Zonamento e viabilidade de construção requerem confirmação municipal.',
    location: { island: { name: 'São Vicente' }, municipality: { name: 'São Vicente' } },
    media: [{ url: img('Terreno Sossego') }],
    property: null,
    landParcel: { type: 'BUILDING_LAND', areaSqm: 600, zoning: 'Residencial (a confirmar)', buildable: true },
  },
  {
    id: 'demo-l3',
    slug: 'apartamento-t2-centro-mindelo',
    kind: 'PROPERTY_RENT',
    title: 'Apartamento T2 no centro histórico de Mindelo',
    description: 'Apartamento renovado perto do Mercado Municipal. Documentos verificados. (Dados fictícios.)',
    priceAmount: 65000,
    priceCurrency: 'CVE',
    priceOnRequest: false,
    isFeatured: false,
    documentStatus: 'VERIFIED',
    publishedAt: new Date('2026-06-20'),
    lastVerifiedAt: new Date('2026-06-22'),
    riskNotes: null,
    location: { island: { name: 'São Vicente' }, municipality: { name: 'São Vicente' } },
    media: [{ url: img('T2 Centro') }],
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 1, builtAreaSqm: 85, plotAreaSqm: null },
    landParcel: null,
  },
  {
    id: 'demo-l4',
    slug: 'moradia-santa-maria-sal',
    kind: 'HOLIDAY_RENT',
    title: 'Moradia de férias — Santa Maria, Sal',
    description: 'Moradia T3 a 300 m da praia. Ideal para arrendamento turístico. (Dados fictícios.)',
    priceAmount: 120000,
    priceCurrency: 'CVE',
    priceOnRequest: false,
    isFeatured: true,
    documentStatus: 'UPLOADED',
    publishedAt: new Date('2026-06-25'),
    lastVerifiedAt: null,
    riskNotes: null,
    location: { island: { name: 'Sal' }, municipality: { name: 'Sal' } },
    media: [{ url: img('Santa Maria') }],
    property: { type: 'HOUSE', bedrooms: 3, bathrooms: 2, builtAreaSqm: 140, plotAreaSqm: 300 },
    landParcel: null,
  },
  {
    id: 'demo-l5',
    slug: 'edificio-comercial-praia',
    kind: 'COMMERCIAL',
    title: 'Espaço comercial — Plateau, Praia',
    description: 'Loja de rés-do-chão na zona do Plateau. Preço sob consulta. (Dados fictícios.)',
    priceAmount: null,
    priceCurrency: 'CVE',
    priceOnRequest: true,
    isFeatured: false,
    documentStatus: 'DECLARED',
    publishedAt: new Date('2026-05-30'),
    lastVerifiedAt: null,
    riskNotes: null,
    location: { island: { name: 'Santiago' }, municipality: { name: 'Praia' } },
    media: [{ url: img('Plateau Praia') }],
    property: { type: 'COMMERCIAL', bedrooms: null, bathrooms: 1, builtAreaSqm: 110, plotAreaSqm: null },
    landParcel: null,
  },
  {
    id: 'demo-l6',
    slug: 'projeto-novo-baia-das-gatas',
    kind: 'NEW_DEVELOPMENT',
    title: 'Novo projeto — condomínio Baía das Gatas',
    description: 'Projeto de 8 apartamentos em fase de pré-venda. (Dados fictícios de demonstração.)',
    priceAmount: 9800000,
    priceCurrency: 'CVE',
    priceOnRequest: false,
    isFeatured: false,
    documentStatus: 'DECLARED',
    publishedAt: new Date('2026-07-01'),
    lastVerifiedAt: null,
    riskNotes: null,
    location: { island: { name: 'São Vicente' }, municipality: { name: 'São Vicente' } },
    media: [{ url: img('Baia das Gatas') }],
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 2, builtAreaSqm: 95, plotAreaSqm: null },
    landParcel: null,
  },
];

const PROFESSIONALS: DemoProfessional[] = [
  {
    id: 'demo-p1',
    slug: 'construcoes-djar',
    displayName: 'Construções Djar',
    headline: 'Empreiteiro geral — construção nova e renovação',
    ratingAvg: 4.6,
    ratingCount: 8,
    verificationLevel: 'L3_DOCUMENTS',
    serviceAreas: ['São Vicente'],
    priceIndication: 'A partir de 45.000 CVE / projeto (indicativo)',
  },
  {
    id: 'demo-p2',
    slug: 'atelier-morabeza',
    displayName: 'Atelier Morabeza',
    headline: 'Arquitetura e licenciamento',
    ratingAvg: 4.9,
    ratingCount: 12,
    verificationLevel: 'L4_TRANSACTION',
    serviceAreas: ['São Vicente', 'Santo Antão'],
    priceIndication: 'Projeto de arquitetura sob orçamento',
  },
  {
    id: 'demo-p3',
    slug: 'eletrica-mindelo',
    displayName: 'Elétrica Mindelo',
    headline: 'Instalações elétricas certificadas',
    ratingAvg: 4.3,
    ratingCount: 5,
    verificationLevel: 'L2_BUSINESS',
    serviceAreas: ['São Vicente'],
    priceIndication: null,
  },
  {
    id: 'demo-p4',
    slug: 'canalizacoes-oceano',
    displayName: 'Canalizações Oceano',
    headline: 'Canalização e sistemas de água',
    ratingAvg: 4.1,
    ratingCount: 3,
    verificationLevel: 'L1_IDENTITY',
    serviceAreas: ['São Vicente', 'Sal'],
    priceIndication: null,
  },
  {
    id: 'demo-p5',
    slug: 'topografia-cabo-verde',
    displayName: 'Topografia Cabo Verde',
    headline: 'Levantamentos topográficos e cadastro',
    ratingAvg: 4.7,
    ratingCount: 9,
    verificationLevel: 'L3_DOCUMENTS',
    serviceAreas: ['São Vicente', 'Santiago', 'Sal'],
    priceIndication: 'Levantamento a partir de 30.000 CVE',
  },
  {
    id: 'demo-p6',
    slug: 'advocacia-atlantico',
    displayName: 'Advocacia Atlântico',
    headline: 'Apoio jurídico em compra e registo de imóveis',
    ratingAvg: 4.8,
    ratingCount: 14,
    verificationLevel: 'L5_INSTITUTIONAL',
    serviceAreas: ['São Vicente', 'Santiago'],
    priceIndication: 'Due diligence a partir de 55.000 CVE',
  },
];

const PROCEDURES: DemoProcedure[] = [
  {
    id: 'demo-proc1',
    slug: 'comprar-terreno-e-construir-casa-ferias-sv',
    title: 'Comprar terreno e construir uma casa de férias em São Vicente',
    summary:
      'Visão geral ilustrativa e não jurídica. Os passos e requisitos devem ser confirmados com as entidades competentes.',
    estimatedDays: 120,
    govEntity: { name: 'Câmara Municipal de São Vicente (demo)' },
    steps: [
      {
        id: 's1',
        sortOrder: 1,
        title: 'Verificar título e ónus',
        description:
          'Solicitar a Certidão de Registo Predial na Conservatória do Registo Predial. Contratar um advogado independente.',
        responsibleEntity: 'Conservatória do Registo Predial',
        requiredDocuments: ['Certidão de registo predial', 'Identificação do vendedor / documentos da empresa'],
        estimatedDays: 14,
      },
      {
        id: 's2',
        sortOrder: 2,
        title: 'Confirmar zonamento e viabilidade',
        description: 'Confirmar o zonamento e o uso permitido junto do município.',
        responsibleEntity: 'Câmara Municipal',
        requiredDocuments: ['Referência cadastral', 'Planta de localização'],
        estimatedDays: 21,
      },
      {
        id: 's3',
        sortOrder: 3,
        title: 'Assinar a escritura pública perante notário e registar',
        description: 'Assinar a escritura pública e registar a transmissão.',
        responsibleEntity: 'Notário + Conservatória',
        requiredDocuments: ['Minuta da escritura', 'Prova de fundos', 'Referência fiscal'],
        estimatedDays: 30,
      },
      {
        id: 's4',
        sortOrder: 4,
        title: 'Pedido de licença de construção',
        description: 'Submeter o projeto de arquitetura para a licença de construção.',
        responsibleEntity: 'Câmara Municipal',
        requiredDocuments: ['Projeto de arquitetura', 'Termo de responsabilidade do engenheiro'],
        estimatedDays: 45,
      },
    ],
  },
  {
    id: 'demo-proc2',
    slug: 'registar-empresa-empresa-no-dia',
    title: 'Registar uma empresa ("Empresa no Dia")',
    summary: 'Como constituir uma empresa através da Casa do Cidadão. Informação indicativa.',
    estimatedDays: 1,
    govEntity: { name: 'Casa do Cidadão (demo)' },
    steps: [
      {
        id: 's1',
        sortOrder: 1,
        title: 'Reservar o nome / obter o CAF',
        description: 'Solicitar o certificado de admissibilidade da firma.',
        responsibleEntity: 'Casa do Cidadão',
        requiredDocuments: ['Documento de identificação'],
        estimatedDays: 1,
      },
      {
        id: 's2',
        sortOrder: 2,
        title: 'Constituir a empresa no balcão',
        description: 'Entregar a documentação e constituir a empresa no mesmo dia.',
        responsibleEntity: 'Casa do Cidadão',
        requiredDocuments: ['Identificação dos sócios', 'Comprovativo de capital'],
        estimatedDays: 1,
      },
    ],
  },
];

const PUBLICATIONS: DemoPublication[] = [
  {
    id: 'demo-pub1',
    title: 'Requisitos da licença de construção — São Vicente (demo)',
    govEntity: { name: 'Câmara Municipal de São Vicente (demo)' },
    officialStatus: false,
    version: 1,
    updatedAt: new Date('2026-07-01'),
    validFrom: new Date('2026-07-01'),
    plainSummary: 'Resumo em linguagem simples dos passos para a licença de construção (demonstração).',
  },
  {
    id: 'demo-pub2',
    title: 'Reforma fiscal imobiliária 2026: cITI e cIPI (demo)',
    govEntity: { name: 'Portal informativo Ilhavista' },
    officialStatus: false,
    version: 2,
    updatedAt: new Date('2026-06-15'),
    validFrom: new Date('2026-01-01'),
    plainSummary:
      'Desde 1 de janeiro de 2026 o IUP foi substituído pelo cITI (transmissão) e cIPI (propriedade). Resumo indicativo — confirmar com as Finanças.',
  },
];

// --- Provider functions (same signatures the pages consume) ---

export async function searchListings(input: ListingSearchInput): Promise<{
  rows: DemoListingRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  let rows = LISTINGS.slice();
  if (input.kind) rows = rows.filter((r) => r.kind === input.kind);
  if (input.islandCode) {
    const nameByCode: Record<string, string> = { SV: 'São Vicente', ST: 'Santiago', SL: 'Sal', BV: 'Boa Vista' };
    const island = nameByCode[input.islandCode];
    if (island) rows = rows.filter((r) => r.location?.island?.name === island);
  }
  if (input.minPrice != null) rows = rows.filter((r) => (r.priceAmount ?? 0) >= input.minPrice!);
  if (input.maxPrice != null) rows = rows.filter((r) => (r.priceAmount ?? 0) <= input.maxPrice!);
  if (input.q) {
    const q = input.q.toLowerCase();
    rows = rows.filter(
      (r) => r.title.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q),
    );
  }
  rows.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  const total = rows.length;
  const start = (input.page - 1) * input.pageSize;
  return {
    rows: rows.slice(start, start + input.pageSize),
    total,
    page: input.page,
    pageSize: input.pageSize,
    totalPages: Math.max(1, Math.ceil(total / input.pageSize)),
  };
}

export async function getListingBySlug(slug: string): Promise<DemoListingRow | null> {
  return LISTINGS.find((l) => l.slug === slug) ?? null;
}

export async function listProfessionals(limit = 24): Promise<DemoProfessional[]> {
  return PROFESSIONALS.slice(0, limit);
}

export async function listPublishedProcedures(): Promise<DemoProcedure[]> {
  return PROCEDURES;
}

export async function getProcedureBySlug(slug: string): Promise<DemoProcedure | null> {
  return PROCEDURES.find((p) => p.slug === slug) ?? null;
}

export async function listOfficialPublications(): Promise<DemoPublication[]> {
  return PUBLICATIONS;
}
