/**
 * Djarvista — development seed data.
 *
 * ALL data below is FICTIONAL. No real persons, companies, contacts, permits
 * or property records are used. Real island/municipality names are public
 * geographic facts; everything attached to them is invented for demos/tests.
 *
 * Run: pnpm db:seed
 */
import {
  PrismaClient,
  RoleKey,
  OrganizationType,
  ListingKind,
  ListingStatus,
  PropertyType,
  LandType,
  DocumentStatus,
  VerificationLevel,
  ReviewStatus,
  ReviewEvidenceKind,
  PublicationStatus,
  TranslationKind,
  JobStatus,
  QuoteStatus,
  Locale,
} from '@prisma/client';

const prisma = new PrismaClient();

const ROLE_DEFS: { key: RoleKey; name: string }[] = [
  { key: RoleKey.VISITOR, name: 'Visitor' },
  { key: RoleKey.USER, name: 'Registered user' },
  { key: RoleKey.BUYER, name: 'Buyer' },
  { key: RoleKey.SELLER, name: 'Seller' },
  { key: RoleKey.INVESTOR, name: 'Investor' },
  { key: RoleKey.CLIENT, name: 'Client (opdrachtgever)' },
  { key: RoleKey.PROFESSIONAL, name: 'Professional' },
  { key: RoleKey.BUSINESS_ADMIN, name: 'Business admin' },
  { key: RoleKey.AGENT, name: 'Real-estate agent' },
  { key: RoleKey.DEVELOPER, name: 'Project developer' },
  { key: RoleKey.GOV_EDITOR, name: 'Government editor' },
  { key: RoleKey.GOV_APPROVER, name: 'Government approver' },
  { key: RoleKey.MODERATOR, name: 'Moderator' },
  { key: RoleKey.VERIFICATION_SPECIALIST, name: 'Verification specialist' },
  { key: RoleKey.SUPPORT, name: 'Support agent' },
  { key: RoleKey.FINANCE_ADMIN, name: 'Finance admin' },
  { key: RoleKey.PLATFORM_ADMIN, name: 'Platform admin' },
  { key: RoleKey.SUPERADMIN, name: 'Superadmin' },
];

const PERMISSIONS = [
  'listing.create',
  'listing.publish',
  'listing.moderate',
  'review.create',
  'review.moderate',
  'verification.review',
  'gov.publication.create',
  'gov.publication.approve',
  'job.create',
  'quote.create',
  'admin.access',
];

const ISLANDS = [
  { code: 'ST', name: 'Santiago', municipalities: ['Praia', 'Santa Catarina', 'Tarrafal'] },
  { code: 'SV', name: 'São Vicente', municipalities: ['São Vicente'] },
  { code: 'SL', name: 'Sal', municipalities: ['Sal'] },
  { code: 'BV', name: 'Boa Vista', municipalities: ['Boa Vista'] },
  { code: 'SA', name: 'Santo Antão', municipalities: ['Ribeira Grande', 'Porto Novo', 'Paul'] },
  { code: 'SN', name: 'São Nicolau', municipalities: ['Ribeira Brava', 'Tarrafal de São Nicolau'] },
  { code: 'FG', name: 'Fogo', municipalities: ['São Filipe', 'Santa Catarina do Fogo', 'Mosteiros'] },
  { code: 'MA', name: 'Maio', municipalities: ['Maio'] },
  { code: 'BR', name: 'Brava', municipalities: ['Brava'] },
];

const CATEGORY_TREE: { key: string; name: string; children: { key: string; name: string }[] }[] = [
  {
    key: 'construction',
    name: 'Construction & building',
    children: [
      { key: 'general-contractor', name: 'General contractor' },
      { key: 'masonry', name: 'Masonry' },
      { key: 'plumbing', name: 'Plumbing' },
      { key: 'electrical', name: 'Electrical' },
      { key: 'painting', name: 'Painting' },
      { key: 'tiling', name: 'Tiling' },
    ],
  },
  {
    key: 'design',
    name: 'Design & engineering',
    children: [
      { key: 'architect', name: 'Architect' },
      { key: 'structural-engineer', name: 'Structural engineer' },
      { key: 'surveyor', name: 'Land surveyor' },
    ],
  },
  {
    key: 'legal-finance',
    name: 'Legal & finance',
    children: [
      { key: 'lawyer', name: 'Lawyer' },
      { key: 'notary', name: 'Notary' },
      { key: 'valuer', name: 'Property valuer' },
    ],
  },
];

async function main(): Promise<void> {
  console.info('Seeding Djarvista development data (fictional)…');

  // --- Roles & permissions ---
  const permissionByKey = new Map<string, string>();
  for (const key of PERMISSIONS) {
    const p = await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, description: `Permission to ${key}` },
    });
    permissionByKey.set(key, p.id);
  }

  const roleByKey = new Map<RoleKey, string>();
  for (const def of ROLE_DEFS) {
    const r = await prisma.role.upsert({
      where: { key: def.key },
      update: { name: def.name },
      create: { key: def.key, name: def.name },
    });
    roleByKey.set(def.key, r.id);
  }

  // Grant a broad permission set to SUPERADMIN for demo purposes.
  const superadminId = roleByKey.get(RoleKey.SUPERADMIN)!;
  for (const permId of permissionByKey.values()) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: superadminId, permissionId: permId } },
      update: {},
      create: { roleId: superadminId, permissionId: permId },
    });
  }

  // --- Geography ---
  const islandByCode = new Map<string, string>();
  const municipalityByName = new Map<string, string>();
  for (const isl of ISLANDS) {
    const island = await prisma.island.upsert({
      where: { code: isl.code },
      update: {},
      create: { code: isl.code, name: isl.name },
    });
    islandByCode.set(isl.code, island.id);
    for (const m of isl.municipalities) {
      const mun = await prisma.municipality.upsert({
        where: { islandId_name: { islandId: island.id, name: m } },
        update: {},
        create: { name: m, islandId: island.id },
      });
      municipalityByName.set(m, mun.id);
    }
  }

  const svIsland = islandByCode.get('SV')!;
  const mindelo = municipalityByName.get('São Vicente')!;

  // A couple of Location anchors on São Vicente (fictional coordinates near Mindelo).
  const locMindeloCentro = await prisma.location.create({
    data: {
      islandId: svIsland,
      municipalityId: mindelo,
      label: 'Mindelo — Centro',
      addressLine: 'Rua de Lisboa (exemplo)',
      latitude: 16.886,
      longitude: -24.988,
    },
  });
  const locMonteSossego = await prisma.location.create({
    data: {
      islandId: svIsland,
      municipalityId: mindelo,
      label: 'Monte Sossego (exemplo)',
      latitude: 16.871,
      longitude: -24.996,
    },
  });

  // --- Categories & services ---
  const serviceByKey = new Map<string, string>();
  for (const parent of CATEGORY_TREE) {
    const parentCat = await prisma.category.upsert({
      where: { key: parent.key },
      update: {},
      create: { key: parent.key, name: parent.name },
    });
    for (const child of parent.children) {
      const childCat = await prisma.category.upsert({
        where: { key: child.key },
        update: {},
        create: { key: child.key, name: child.name, parentId: parentCat.id },
      });
      const service = await prisma.service.create({
        data: { categoryId: childCat.id, name: child.name },
      });
      serviceByKey.set(child.key, service.id);
    }
  }

  // --- Users (fictional) ---
  const agentUser = await prisma.user.create({
    data: {
      email: 'agent.demo@example.test',
      displayName: 'Ana (Demo Agent)',
      emailVerified: new Date(),
      status: 'ACTIVE',
      preferredLocale: Locale.pt,
      profile: { create: { fullName: 'Ana Demo', languages: [Locale.pt, Locale.en] } },
    },
  });
  const clientUser = await prisma.user.create({
    data: {
      email: 'buyer.demo@example.test',
      displayName: 'Koen (Demo Buyer)',
      emailVerified: new Date(),
      status: 'ACTIVE',
      preferredLocale: Locale.nl,
      profile: { create: { fullName: 'Koen Demo', languages: [Locale.nl, Locale.en] } },
    },
  });
  const proUser = await prisma.user.create({
    data: {
      email: 'pro.demo@example.test',
      displayName: 'Jorge (Demo Builder)',
      emailVerified: new Date(),
      status: 'ACTIVE',
      preferredLocale: Locale.pt,
      profile: { create: { fullName: 'Jorge Demo', languages: [Locale.pt, Locale.kea] } },
    },
  });

  await prisma.userRole.create({
    data: { userId: agentUser.id, roleId: roleByKey.get(RoleKey.AGENT)! },
  });
  await prisma.userRole.create({
    data: { userId: proUser.id, roleId: roleByKey.get(RoleKey.PROFESSIONAL)! },
  });

  // --- Organizations & professionals ---
  const agency = await prisma.organization.create({
    data: {
      name: 'Mindelo Imóveis (Demo)',
      type: OrganizationType.AGENCY,
      description: 'Fictional demo real-estate agency on São Vicente.',
      locationId: locMindeloCentro.id,
      verificationLevel: VerificationLevel.L2_BUSINESS,
      members: { create: { userId: agentUser.id, isAdmin: true } },
    },
  });

  const buildCo = await prisma.organization.create({
    data: {
      name: 'Construções Djar (Demo)',
      type: OrganizationType.CONSTRUCTION,
      description: 'Fictional demo construction company.',
      verificationLevel: VerificationLevel.L3_DOCUMENTS,
      members: { create: { userId: proUser.id, isAdmin: true } },
    },
  });

  const professional = await prisma.professional.create({
    data: {
      organizationId: buildCo.id,
      displayName: 'Construções Djar',
      slug: 'construcoes-djar-demo',
      headline: 'General contractor — new build & renovation (demo)',
      bio: 'Fictional profile used for demos and tests.',
      languages: [Locale.pt, Locale.kea, Locale.en],
      serviceAreas: ['São Vicente'],
      priceIndication: 'From 45.000 CVE / project (indicative, demo)',
      avgResponseMinutes: 180,
      completedJobs: 12,
      ratingAvg: 4.6,
      ratingCount: 8,
      verificationLevel: VerificationLevel.L3_DOCUMENTS,
      services: {
        create: [
          { serviceId: serviceByKey.get('general-contractor')! },
          { serviceId: serviceByKey.get('masonry')! },
        ],
      },
      portfolios: {
        create: [
          {
            title: 'Villa renovation, Mindelo (demo)',
            description: 'Full renovation of a colonial townhouse (fictional).',
            mediaUrls: [],
            completedAt: new Date('2025-11-01'),
          },
        ],
      },
    },
  });

  // --- Property + Land + Listings ---
  const property = await prisma.property.create({
    data: {
      type: PropertyType.VILLA,
      title: 'Villa com vista mar (Demo)',
      description: 'Fictional 3-bedroom villa used for demos.',
      builtAreaSqm: 180,
      plotAreaSqm: 420,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2019,
      locationId: locMonteSossego.id,
      utilities: ['water', 'electricity', 'internet'],
    },
  });

  const land = await prisma.landParcel.create({
    data: {
      type: LandType.BUILDING_LAND,
      reference: 'DEMO-LOTE-001',
      areaSqm: 600,
      zoning: 'Residential (demo — zoning to be confirmed with município)',
      buildable: true,
      buildRatio: 0.4,
      locationId: locMonteSossego.id,
      registryStatus: DocumentStatus.DECLARED,
    },
  });

  const villaListing = await prisma.listing.create({
    data: {
      kind: ListingKind.PROPERTY_SALE,
      status: ListingStatus.PUBLISHED,
      title: 'Villa com vista mar — Monte Sossego (Demo)',
      slug: 'villa-vista-mar-monte-sossego-demo',
      description: 'Fictional listing. 3 bed / 2 bath villa. Documents declared, pending verification.',
      priceAmount: 18500000,
      priceCurrency: 'CVE',
      propertyId: property.id,
      locationId: locMonteSossego.id,
      ownerUserId: agentUser.id,
      organizationId: agency.id,
      documentStatus: DocumentStatus.DECLARED,
      permitStatus: DocumentStatus.UNKNOWN,
      isPremium: true,
      publishedAt: new Date(),
      lastVerifiedAt: null,
      media: {
        create: [
          { type: 'PHOTO', url: 'https://placehold.co/1200x800?text=Villa+Demo', sortOrder: 0 },
        ],
      },
    },
  });

  const landListing = await prisma.listing.create({
    data: {
      kind: ListingKind.LAND,
      status: ListingStatus.PUBLISHED,
      title: 'Building land 600 m² — Monte Sossego (Demo)',
      slug: 'building-land-600-monte-sossego-demo',
      description: 'Fictional building land listing. Buildable, zoning to be confirmed.',
      priceAmount: 4200000,
      priceCurrency: 'CVE',
      landParcelId: land.id,
      locationId: locMonteSossego.id,
      ownerUserId: agentUser.id,
      organizationId: agency.id,
      documentStatus: DocumentStatus.DECLARED,
      permitStatus: DocumentStatus.UNKNOWN,
      riskNotes: 'Zoning and buildability require municipal confirmation (demo).',
      publishedAt: new Date(),
    },
  });

  await prisma.favorite.create({ data: { userId: clientUser.id, listingId: villaListing.id } });
  await prisma.lead.create({
    data: {
      listingId: villaListing.id,
      fromUserId: clientUser.id,
      name: 'Koen Demo',
      email: 'buyer.demo@example.test',
      message: 'Interested in a viewing next month (demo lead).',
      locale: Locale.nl,
    },
  });

  // --- Flow 3 & 4: Job -> Quote -> Contract -> Verified review ---
  const job = await prisma.job.create({
    data: {
      clientUserId: clientUser.id,
      title: 'Renovate bathroom and kitchen (Demo)',
      description: 'Fictional job: renovate one bathroom and a small kitchen in Mindelo.',
      status: JobStatus.AWARDED,
      budgetAmount: 350000,
      budgetCurrency: 'CVE',
    },
  });
  const quote = await prisma.quote.create({
    data: {
      jobId: job.id,
      professionalId: professional.id,
      amount: 320000,
      currency: 'CVE',
      message: 'Includes materials and labour (demo quote).',
      estimatedDays: 21,
      status: QuoteStatus.ACCEPTED,
      submittedAt: new Date(),
    },
  });
  const contract = await prisma.contract.create({
    data: {
      jobId: job.id,
      acceptedQuoteId: quote.id,
      amount: 320000,
      currency: 'CVE',
      status: 'COMPLETED',
      startedAt: new Date('2026-01-10'),
      completedAt: new Date('2026-02-05'),
    },
  });
  await prisma.review.create({
    data: {
      authorUserId: clientUser.id,
      professionalId: professional.id,
      contractId: contract.id,
      status: ReviewStatus.VERIFIED, // corroborated by an accepted quote + completed contract
      overall: 5,
      scoreQuality: 5,
      scoreCommunication: 4,
      scoreReliability: 5,
      scorePlanning: 4,
      scoreValue: 5,
      scoreProfessionalism: 5,
      scoreAftercare: 4,
      comment: 'Great work, on time (demo verified review).',
      evidence: {
        create: [
          { kind: ReviewEvidenceKind.ACCEPTED_QUOTE, reference: quote.id },
          { kind: ReviewEvidenceKind.MUTUAL_CONFIRMATION, reference: contract.id },
        ],
      },
    },
  });

  // --- Flow 5: Government entity -> Procedure + Official publication (versioned) ---
  const municipioSV = await prisma.governmentEntity.create({
    data: {
      name: 'Câmara Municipal de São Vicente (Demo)',
      shortName: 'CMSV (Demo)',
      level: 'municipality',
      islandId: svIsland,
    },
  });

  const procedure = await prisma.procedure.create({
    data: {
      slug: 'buy-building-land-and-build-holiday-home-sv-demo',
      title: 'Buy building land and build a holiday home on São Vicente (Demo)',
      summary:
        'Illustrative, non-legal overview. Steps and requirements must be confirmed with the competent authorities.',
      govEntityId: municipioSV.id,
      estimatedDays: 120,
      estimatedCost: 'Indicative only — verify with authorities',
      status: PublicationStatus.PUBLISHED,
      steps: {
        create: [
          {
            sortOrder: 1,
            title: 'Verify title & encumbrances',
            description:
              'Request a Certidão de Registo Predial from the Conservatória do Registo Predial. Engage an independent lawyer.',
            responsibleEntity: 'Conservatória do Registo Predial',
            requiredDocuments: ['Property registration certificate', 'Seller ID / company docs'],
            estimatedDays: 14,
          },
          {
            sortOrder: 2,
            title: 'Confirm zoning & buildability',
            description: 'Confirm zoning and permitted use with the município (demo).',
            responsibleEntity: 'Câmara Municipal',
            requiredDocuments: ['Cadastral reference', 'Site plan'],
            estimatedDays: 21,
          },
          {
            sortOrder: 3,
            title: 'Sign public deed before a Notary & register',
            description: 'Sign the escritura pública and register the transfer.',
            responsibleEntity: 'Notary + Conservatória',
            requiredDocuments: ['Draft deed', 'Proof of funds', 'Tax reference'],
            estimatedDays: 30,
          },
          {
            sortOrder: 4,
            title: 'Apply for building permit',
            description: 'Submit the architectural project for the building permit (demo).',
            responsibleEntity: 'Câmara Municipal',
            requiredDocuments: ['Architectural project', 'Engineer sign-off'],
            estimatedDays: 45,
          },
        ],
      },
      translations: {
        create: [
          {
            locale: Locale.pt,
            kind: TranslationKind.OFFICIAL,
            title: 'Comprar terreno e construir casa de férias em São Vicente (Demo)',
          },
          {
            locale: Locale.nl,
            kind: TranslationKind.MACHINE,
            title: 'Bouwgrond kopen en een vakantiewoning bouwen op São Vicente (Demo)',
          },
        ],
      },
    },
  });

  const publication = await prisma.officialPublication.create({
    data: {
      slug: 'building-permit-requirements-sv-demo',
      title: 'Building permit requirements — São Vicente (Demo)',
      govEntityId: municipioSV.id,
      status: PublicationStatus.PUBLISHED,
      officialStatus: false, // demo content is NOT officially confirmed
      version: 1,
      publishedAt: new Date(),
      validFrom: new Date(),
      bodyMarkdown:
        '## Building permit (demo)\n\nThis is illustrative demo content, **not** an official publication. Confirm all requirements with the competent authority.',
      plainSummary: 'Plain-language demo summary of building-permit steps.',
      versions: {
        create: [{ version: 1, bodyMarkdown: 'Initial demo version.', changeNote: 'Seed' }],
      },
    },
  });

  console.info('Seed complete:', {
    islands: ISLANDS.length,
    listings: [villaListing.slug, landListing.slug],
    procedure: procedure.slug,
    publication: publication.slug,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
