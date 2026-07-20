import { z } from 'zod';

/**
 * Input validation schemas for the MVP flows. These are the single source of
 * truth for request validation in route handlers and server actions, and are
 * reused to derive OpenAPI (see /docs/12-api-design.md).
 */

export const localeSchema = z.enum(['pt', 'kea', 'en', 'nl', 'fr']);

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{7,20}$/, 'Invalid phone number');

// --- Auth ---
export const registerSchema = z
  .object({
    email: z.string().email().optional(),
    phone: phoneSchema.optional(),
    password: z.string().min(10, 'Use at least 10 characters').max(200),
    displayName: z.string().trim().min(2).max(120),
    preferredLocale: localeSchema.default('pt'),
  })
  .refine((v) => v.email || v.phone, { message: 'Provide an email or a phone number' });
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identifier: z.string().min(3), // email or phone
  password: z.string().min(1),
});

export const otpVerifySchema = z.object({
  userId: z.string().cuid(),
  code: z.string().regex(/^[0-9]{6}$/, 'Enter the 6-digit code'),
});

// --- Listings ---
export const listingKindSchema = z.enum([
  'PROPERTY_SALE',
  'PROPERTY_RENT',
  'HOLIDAY_RENT',
  'COMMERCIAL',
  'LAND',
  'NEW_DEVELOPMENT',
  'INVESTMENT_PROJECT',
  'OFF_MARKET',
]);

export const createListingSchema = z.object({
  kind: listingKindSchema,
  title: z.string().trim().min(6).max(160),
  description: z.string().trim().max(8000).optional(),
  priceAmount: z.number().nonnegative().max(1_000_000_000).optional(),
  priceCurrency: z.enum(['CVE', 'EUR', 'USD']).default('CVE'),
  priceOnRequest: z.boolean().default(false),
  islandCode: z.string().min(2).max(2),
  municipalityName: z.string().min(2).max(120).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  documentStatus: z
    .enum(['UNKNOWN', 'DECLARED', 'UPLOADED', 'VERIFIED', 'DISPUTED'])
    .default('DECLARED'),
});
export type CreateListingInput = z.infer<typeof createListingSchema>;

export const listingSearchSchema = z.object({
  q: z.string().trim().max(160).optional(),
  kind: listingKindSchema.optional(),
  islandCode: z.string().length(2).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(20),
});
export type ListingSearchInput = z.infer<typeof listingSearchSchema>;

// --- Leads ---
export const createLeadSchema = z.object({
  listingId: z.string().cuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().email().optional(),
  phone: phoneSchema.optional(),
  message: z.string().trim().min(3).max(2000),
  locale: localeSchema.default('pt'),
});

// --- Jobs & quotes ---
export const createJobSchema = z.object({
  title: z.string().trim().min(6).max(160),
  description: z.string().trim().min(10).max(8000),
  categoryKey: z.string().optional(),
  islandCode: z.string().length(2).optional(),
  budgetAmount: z.number().nonnegative().optional(),
  budgetCurrency: z.enum(['CVE', 'EUR', 'USD']).default('CVE'),
  deadline: z.coerce.date().optional(),
});

export const createQuoteSchema = z.object({
  jobId: z.string().cuid(),
  amount: z.number().positive(),
  currency: z.enum(['CVE', 'EUR', 'USD']).default('CVE'),
  message: z.string().trim().max(2000).optional(),
  estimatedDays: z.number().int().positive().max(3650).optional(),
});

// --- Reviews ---
const score = z.number().int().min(1).max(5);
export const createReviewSchema = z.object({
  professionalId: z.string().cuid(),
  contractId: z.string().cuid().optional(),
  overall: score,
  scoreQuality: score.optional(),
  scoreCommunication: score.optional(),
  scoreReliability: score.optional(),
  scorePlanning: score.optional(),
  scoreValue: score.optional(),
  scoreProfessionalism: score.optional(),
  scoreAftercare: score.optional(),
  comment: z.string().trim().max(4000).optional(),
});
export type CreateReviewInput = z.infer<typeof createReviewSchema>;

// --- Government procedures ---
export const createProcedureSchema = z.object({
  title: z.string().trim().min(6).max(200),
  summary: z.string().trim().max(2000).optional(),
  govEntityId: z.string().cuid().optional(),
  estimatedDays: z.number().int().positive().optional(),
  steps: z
    .array(
      z.object({
        title: z.string().trim().min(3).max(200),
        description: z.string().trim().max(4000).optional(),
        responsibleEntity: z.string().trim().max(200).optional(),
        requiredDocuments: z.array(z.string().trim().max(200)).default([]),
        estimatedDays: z.number().int().positive().optional(),
      }),
    )
    .min(1),
});
