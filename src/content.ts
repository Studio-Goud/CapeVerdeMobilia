// Fictional demo content for the extended modules. No PII.
import type { TL, VerificationLevel } from '@/i18n';

export interface Project {
  id: string; name: TL; island: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  progress: number; budgetCve: number; contractor: string;
  milestones: { label: TL; done: boolean }[];
}

export const PROJECTS: Project[] = [
  { id: 'pr1', name: { pt: 'Villa Monte Sossego — construção nova', en: 'Villa Monte Sossego — new build', nl: 'Villa Monte Sossego — nieuwbouw' },
    island: 'São Vicente', status: 'IN_PROGRESS', progress: 45, budgetCve: 12500000, contractor: 'Construções Djar',
    milestones: [
      { label: { pt: 'Fundações', en: 'Foundations', nl: 'Fundering' }, done: true },
      { label: { pt: 'Estrutura', en: 'Structure', nl: 'Ruwbouw' }, done: true },
      { label: { pt: 'Cobertura', en: 'Roof', nl: 'Dak' }, done: false },
      { label: { pt: 'Acabamentos', en: 'Finishing', nl: 'Afwerking' }, done: false },
    ] },
  { id: 'pr2', name: { pt: 'Renovação apartamento centro Mindelo', en: 'Apartment renovation, Mindelo centre', nl: 'Renovatie appartement centrum Mindelo' },
    island: 'São Vicente', status: 'PLANNING', progress: 10, budgetCve: 3200000, contractor: 'Atelier Morabeza',
    milestones: [
      { label: { pt: 'Orçamentos', en: 'Quotes', nl: 'Offertes' }, done: true },
      { label: { pt: 'Licença', en: 'Permit', nl: 'Vergunning' }, done: false },
      { label: { pt: 'Obra', en: 'Works', nl: 'Uitvoering' }, done: false },
    ] },
  { id: 'pr3', name: { pt: 'Moradia Santa Maria — piscina', en: 'Santa Maria house — pool', nl: 'Woning Santa Maria — zwembad' },
    island: 'Sal', status: 'REVIEW', progress: 85, budgetCve: 2100000, contractor: 'Canalizações Oceano',
    milestones: [
      { label: { pt: 'Escavação', en: 'Excavation', nl: 'Uitgraven' }, done: true },
      { label: { pt: 'Estrutura', en: 'Structure', nl: 'Constructie' }, done: true },
      { label: { pt: 'Sistemas de água', en: 'Water systems', nl: 'Watersystemen' }, done: true },
      { label: { pt: 'Inspeção final', en: 'Final inspection', nl: 'Eindkeuring' }, done: false },
    ] },
];

export interface Tender {
  id: string; title: TL; island: string; kind: 'PUBLIC' | 'PRIVATE';
  deadline: string; budgetCve: number | null; bids: number;
}

export const TENDERS: Tender[] = [
  { id: 't1', title: { pt: 'Instalação elétrica — moradia T3', en: 'Electrical installation — 3-bed house', nl: 'Elektra-installatie — woning 3 slk' },
    island: 'São Vicente', kind: 'PRIVATE', deadline: '2026-08-05', budgetCve: 450000, bids: 4 },
  { id: 't2', title: { pt: 'Reabilitação de espaço público (demo)', en: 'Public space refurbishment (demo)', nl: 'Renovatie openbare ruimte (demo)' },
    island: 'São Vicente', kind: 'PUBLIC', deadline: '2026-08-20', budgetCve: 8500000, bids: 2 },
  { id: 't3', title: { pt: 'Projeto de arquitetura — villa vista mar', en: 'Architecture project — sea-view villa', nl: 'Architectuurproject — villa met zeezicht' },
    island: 'São Vicente', kind: 'PRIVATE', deadline: '2026-07-30', budgetCve: null, bids: 6 },
  { id: 't4', title: { pt: 'Fornecimento de cimento e agregados', en: 'Supply of cement and aggregates', nl: 'Levering cement en toeslagmaterialen' },
    island: 'Sal', kind: 'PRIVATE', deadline: '2026-08-12', budgetCve: 1200000, bids: 3 },
];

export interface Supplier {
  id: string; name: string; category: TL; island: string;
  verified: boolean; priceFrom: TL | null;
}

export const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Cimentos Barlavento', category: { pt: 'Cimento & agregados', en: 'Cement & aggregates', nl: 'Cement & toeslagmaterialen' },
    island: 'São Vicente', verified: true, priceFrom: { pt: 'Saco 42,5R desde 780 CVE', en: 'Bag 42.5R from 780 CVE', nl: 'Zak 42,5R vanaf 780 CVE' } },
  { id: 's2', name: 'Ferro & Aço Mindelo', category: { pt: 'Ferro & estrutura', en: 'Steel & structure', nl: 'Staal & constructie' },
    island: 'São Vicente', verified: true, priceFrom: null },
  { id: 's3', name: 'Cerâmicas Atlântico', category: { pt: 'Azulejos & sanitários', en: 'Tiles & sanitary', nl: 'Tegels & sanitair' },
    island: 'Santiago', verified: false, priceFrom: { pt: 'Azulejo desde 950 CVE/m²', en: 'Tiles from 950 CVE/m²', nl: 'Tegels vanaf 950 CVE/m²' } },
  { id: 's4', name: 'Madeiras do Porto', category: { pt: 'Madeira & carpintaria', en: 'Wood & carpentry', nl: 'Hout & timmerwerk' },
    island: 'São Vicente', verified: true, priceFrom: null },
  { id: 's5', name: 'Elétrica Sal Lda', category: { pt: 'Material elétrico', en: 'Electrical material', nl: 'Elektramateriaal' },
    island: 'Sal', verified: false, priceFrom: null },
  { id: 's6', name: 'Aluguer Máquinas CV', category: { pt: 'Aluguer de máquinas', en: 'Machine rental', nl: 'Machineverhuur' },
    island: 'São Vicente', verified: true, priceFrom: { pt: 'Retroescavadora desde 18.000 CVE/dia', en: 'Excavator from 18,000 CVE/day', nl: 'Graafmachine vanaf 18.000 CVE/dag' } },
];

export interface Review { author: string; rating: number; verified: boolean; date: string; body: TL }
/** Fictional reviews keyed by professional id (p1..p6). */
export const REVIEWS: Record<string, Review[]> = {
  p1: [
    { author: 'M. Tavares', rating: 5, verified: true, date: '2026-05-18',
      body: { pt: 'Obra entregue no prazo e dentro do orçamento. Boa comunicação.', en: 'Delivered on time and on budget. Good communication.', nl: 'Op tijd en binnen budget opgeleverd. Goede communicatie.' } },
    { author: 'J. Andrade', rating: 4, verified: true, date: '2026-04-02',
      body: { pt: 'Bom trabalho, pequenos atrasos nos acabamentos.', en: 'Good work, minor delays in the finishing.', nl: 'Goed werk, kleine vertraging bij de afwerking.' } },
  ],
  p2: [
    { author: 'S. Lopes', rating: 5, verified: true, date: '2026-06-01',
      body: { pt: 'Projeto de arquitetura excelente e licenciamento sem problemas.', en: 'Excellent architecture project and smooth permitting.', nl: 'Uitstekend architectuurontwerp en vlotte vergunning.' } },
  ],
  p5: [
    { author: 'R. Monteiro', rating: 5, verified: true, date: '2026-03-22',
      body: { pt: 'Levantamento topográfico rigoroso, entregue rápido.', en: 'Precise topographic survey, delivered quickly.', nl: 'Nauwkeurige opmeting, snel geleverd.' } },
  ],
  p6: [
    { author: 'K. Fortes', rating: 5, verified: true, date: '2026-05-30',
      body: { pt: 'Due diligence muito completa antes da escritura.', en: 'Very thorough due diligence before the deed.', nl: 'Zeer grondige due diligence vóór de akte.' } },
  ],
};

// Verification levels with the proof each requires (fictional/indicative).
export const VERIFICATION_LEVELS: { code: string; level: VerificationLevel; proof: TL }[] = [
  { code: 'L0', level: 'L0_NONE', proof: { pt: 'Apenas conta base, email confirmado.', en: 'Basic account only, email confirmed.', nl: 'Alleen basisaccount, e-mail bevestigd.' } },
  { code: 'L1', level: 'L1_IDENTITY', proof: { pt: 'Documento de identidade ou contacto profissional verificado.', en: 'ID document or professional contact verified.', nl: 'Identiteitsdocument of zakelijk contact geverifieerd.' } },
  { code: 'L2', level: 'L2_BUSINESS', proof: { pt: 'Registo comercial / NIF da empresa validado.', en: 'Company registration / tax number validated.', nl: 'Bedrijfsregistratie / fiscaal nummer gevalideerd.' } },
  { code: 'L3', level: 'L3_DOCUMENTS', proof: { pt: 'Licenças, seguros ou certificados relevantes revistos manualmente.', en: 'Relevant licences, insurance or certificates reviewed manually.', nl: 'Relevante vergunningen, verzekeringen of certificaten handmatig gecontroleerd.' } },
  { code: 'L4', level: 'L4_TRANSACTION', proof: { pt: 'Transação ou projeto concluído comprovado por ambas as partes.', en: 'Completed transaction or project confirmed by both parties.', nl: 'Afgeronde transactie of project bevestigd door beide partijen.' } },
  { code: 'L5', level: 'L5_INSTITUTIONAL', proof: { pt: 'Entidade pública, banco, notário ou parceiro estratégico aprovado.', en: 'Approved public body, bank, notary or strategic partner.', nl: 'Goedgekeurde overheidsinstantie, bank, notaris of strategische partner.' } },
];

// Indicative wizard plans keyed by goal. Fictional; not legal advice.
export interface WizardPlan { steps: TL[]; risks: TL[]; costCve: [number, number]; days: [number, number] }
export const WIZARD_PLANS: Record<string, WizardPlan> = {
  buyLand: {
    steps: [
      { pt: 'Verificar título e ónus na Conservatória', en: 'Verify title and encumbrances at the Land Registry', nl: 'Titel en lasten controleren bij het kadaster' },
      { pt: 'Confirmar zonamento junto da Câmara Municipal', en: 'Confirm zoning with the municipality', nl: 'Bestemming bevestigen bij de gemeente' },
      { pt: 'Contratar advogado para due diligence', en: 'Hire a lawyer for due diligence', nl: 'Advocaat inschakelen voor due diligence' },
      { pt: 'Escritura pública e registo da transmissão', en: 'Public deed and transfer registration', nl: 'Notariële akte en registratie van de overdracht' },
    ],
    risks: [
      { pt: 'Título pouco claro ou registo desatualizado', en: 'Unclear title or outdated registration', nl: 'Onduidelijke titel of verouderde registratie' },
      { pt: 'Zonamento não permite construção', en: 'Zoning does not allow building', nl: 'Bestemming staat bouwen niet toe' },
    ],
    costCve: [90000, 250000], days: [30, 75],
  },
  build: {
    steps: [
      { pt: 'Projeto de arquitetura com atelier licenciado', en: 'Architecture project with a licensed studio', nl: 'Architectenontwerp met een erkend bureau' },
      { pt: 'Pedido de licença de construção na Câmara', en: 'Building-permit application at the municipality', nl: 'Bouwvergunning aanvragen bij de gemeente' },
      { pt: 'Selecionar empreiteiro verificado e orçamentar', en: 'Select a verified contractor and budget', nl: 'Geverifieerde aannemer kiezen en begroten' },
      { pt: 'Acompanhar a obra por marcos e inspeções', en: 'Track works by milestones and inspections', nl: 'Werk volgen via mijlpalen en keuringen' },
    ],
    risks: [
      { pt: 'Licença atrasada ou incompleta', en: 'Delayed or incomplete permit', nl: 'Vertraagde of onvolledige vergunning' },
      { pt: 'Derrapagem de custos e prazos', en: 'Cost and schedule overruns', nl: 'Kosten- en planningsoverschrijding' },
    ],
    costCve: [250000, 900000], days: [90, 240],
  },
  buyHome: {
    steps: [
      { pt: 'Selecionar imóvel e pedir documentos', en: 'Select a property and request documents', nl: 'Woning kiezen en documenten opvragen' },
      { pt: 'Due diligence jurídica e avaliação', en: 'Legal due diligence and valuation', nl: 'Juridische due diligence en taxatie' },
      { pt: 'Reserva / contrato-promessa', en: 'Reservation / promissory contract', nl: 'Reservering / voorlopig koopcontract' },
      { pt: 'Escritura, registo e impostos (cITI/cIPI)', en: 'Deed, registration and taxes (cITI/cIPI)', nl: 'Akte, registratie en belastingen (cITI/cIPI)' },
    ],
    risks: [
      { pt: 'Documentação em falta ou dívidas associadas', en: 'Missing documents or attached debts', nl: 'Ontbrekende documenten of gekoppelde schulden' },
      { pt: 'Custos de transmissão subestimados', en: 'Underestimated transfer costs', nl: 'Onderschatte overdrachtskosten' },
    ],
    costCve: [120000, 400000], days: [30, 90],
  },
  business: {
    steps: [
      { pt: 'Reservar nome / obter CAF na Casa do Cidadão', en: 'Reserve name / obtain CAF at Casa do Cidadão', nl: 'Naam reserveren / CAF bij Casa do Cidadão' },
      { pt: 'Constituir a empresa (“Empresa no Dia”)', en: 'Incorporate the company (“Empresa no Dia”)', nl: 'Bedrijf oprichten (“Empresa no Dia”)' },
      { pt: 'Registo fiscal e segurança social', en: 'Tax and social-security registration', nl: 'Fiscale en sociale registratie' },
      { pt: 'Licenças de atividade, se aplicável', en: 'Activity licences, if applicable', nl: 'Activiteitsvergunningen, indien van toepassing' },
    ],
    risks: [
      { pt: 'Atividade requer licença específica', en: 'Activity needs a specific licence', nl: 'Activiteit vereist een specifieke vergunning' },
      { pt: 'Obrigações fiscais contínuas subestimadas', en: 'Underestimated ongoing tax duties', nl: 'Onderschatte doorlopende fiscale verplichtingen' },
    ],
    costCve: [20000, 80000], days: [1, 15],
  },
};
