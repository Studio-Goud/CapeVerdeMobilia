import { prisma, type Prisma } from './index';
import type { ListingSearchInput } from '@djarvista/validation';

/**
 * Database-backed data access (real implementation).
 *
 * The public demo deployment of apps/web runs without a database and uses an
 * in-memory provider instead (see apps/web/src/lib/queries.ts). Wire these
 * functions in when DATABASE_URL is configured. All reads exclude soft-deleted
 * rows and only expose PUBLISHED listings publicly.
 */

export async function searchListings(input: ListingSearchInput) {
  const where: Prisma.ListingWhereInput = { deletedAt: null, status: 'PUBLISHED' };

  if (input.kind) where.kind = input.kind;
  if (input.islandCode) where.location = { island: { code: input.islandCode } };
  if (input.minPrice != null || input.maxPrice != null) {
    where.priceAmount = {
      ...(input.minPrice != null ? { gte: input.minPrice } : {}),
      ...(input.maxPrice != null ? { lte: input.maxPrice } : {}),
    };
  }
  if (input.q) {
    where.OR = [
      { title: { contains: input.q, mode: 'insensitive' } },
      { description: { contains: input.q, mode: 'insensitive' } },
    ];
  }

  const [total, rows] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
      skip: (input.page - 1) * input.pageSize,
      take: input.pageSize,
      include: {
        location: { include: { island: true, municipality: true } },
        media: { take: 1, orderBy: { sortOrder: 'asc' } },
      },
    }),
  ]);

  return {
    total,
    page: input.page,
    pageSize: input.pageSize,
    totalPages: Math.max(1, Math.ceil(total / input.pageSize)),
    rows,
  };
}

export async function getListingBySlug(slug: string) {
  return prisma.listing.findFirst({
    where: { slug, deletedAt: null, status: 'PUBLISHED' },
    include: {
      location: { include: { island: true, municipality: true } },
      media: { orderBy: { sortOrder: 'asc' } },
      property: true,
      landParcel: true,
      organization: true,
    },
  });
}

export async function listProfessionals(limit = 24) {
  return prisma.professional.findMany({
    where: { deletedAt: null },
    orderBy: [{ verificationLevel: 'desc' }, { ratingAvg: 'desc' }],
    take: limit,
    include: { organization: true },
  });
}

export async function listPublishedProcedures() {
  return prisma.procedure.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { updatedAt: 'desc' },
    include: { govEntity: true, steps: { orderBy: { sortOrder: 'asc' } } },
  });
}

export async function getProcedureBySlug(slug: string) {
  return prisma.procedure.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: { govEntity: true, steps: { orderBy: { sortOrder: 'asc' } }, translations: true },
  });
}

export async function listOfficialPublications() {
  return prisma.officialPublication.findMany({
    where: { status: { in: ['PUBLISHED', 'UPDATED'] } },
    orderBy: { publishedAt: 'desc' },
    include: { govEntity: true },
  });
}
