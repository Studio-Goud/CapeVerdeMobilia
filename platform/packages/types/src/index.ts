/**
 * Shared domain types used across web, admin and services.
 * Enum-like domain values are re-exported from the database package to keep a
 * single source of truth; these types are hand-authored view/DTO shapes.
 */

export type Locale = 'pt' | 'kea' | 'en' | 'nl' | 'fr';

export const VERIFICATION_LEVELS = [
  'L0_NONE',
  'L1_IDENTITY',
  'L2_BUSINESS',
  'L3_DOCUMENTS',
  'L4_TRANSACTION',
  'L5_INSTITUTIONAL',
] as const;
export type VerificationLevel = (typeof VERIFICATION_LEVELS)[number];

/** A trust badge as surfaced in the UI. */
export interface TrustBadge {
  level: VerificationLevel;
  label: string;
  official: boolean;
}

/** Standard paginated API envelope. */
export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Standard API error envelope. */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/** Money is always an amount + currency (never a bare number). */
export interface Money {
  amount: number;
  currency: 'CVE' | 'EUR' | 'USD';
}

export interface ListingSummary {
  id: string;
  slug: string;
  kind: string;
  title: string;
  price: Money | null;
  priceOnRequest: boolean;
  island: string | null;
  municipality: string | null;
  thumbnailUrl: string | null;
  isFeatured: boolean;
  documentStatus: string;
  lastVerifiedAt: string | null;
}

export interface ProfessionalSummary {
  id: string;
  slug: string;
  displayName: string;
  headline: string | null;
  ratingAvg: number | null;
  ratingCount: number;
  verificationLevel: VerificationLevel;
  serviceAreas: string[];
}
