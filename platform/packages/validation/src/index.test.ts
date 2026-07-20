import { describe, expect, it } from 'vitest';
import {
  registerSchema,
  createListingSchema,
  createReviewSchema,
  createLeadSchema,
  listingSearchSchema,
} from './index';

describe('registerSchema', () => {
  it('requires email or phone', () => {
    const res = registerSchema.safeParse({ password: 'longenough1', displayName: 'Ana' });
    expect(res.success).toBe(false);
  });

  it('accepts a valid email registration', () => {
    const res = registerSchema.safeParse({
      email: 'a@b.test',
      password: 'longenough1',
      displayName: 'Ana',
    });
    expect(res.success).toBe(true);
  });

  it('rejects short passwords', () => {
    const res = registerSchema.safeParse({ email: 'a@b.test', password: 'short', displayName: 'Ana' });
    expect(res.success).toBe(false);
  });
});

describe('createListingSchema', () => {
  it('defaults currency to CVE and status DECLARED', () => {
    const res = createListingSchema.parse({
      kind: 'LAND',
      title: 'Building land in Mindelo',
      islandCode: 'SV',
    });
    expect(res.priceCurrency).toBe('CVE');
    expect(res.documentStatus).toBe('DECLARED');
  });

  it('rejects an invalid island code length', () => {
    const res = createListingSchema.safeParse({ kind: 'LAND', title: 'Valid title here', islandCode: 'SVX' });
    expect(res.success).toBe(false);
  });
});

describe('createReviewSchema', () => {
  it('bounds scores to 1..5', () => {
    expect(createReviewSchema.safeParse({ professionalId: 'c'.repeat(25), overall: 6 }).success).toBe(false);
    expect(
      createReviewSchema.safeParse({ professionalId: 'clh1234567890abcdef01234', overall: 5 }).success,
    ).toBe(true);
  });
});

describe('createLeadSchema', () => {
  it('requires a message', () => {
    const res = createLeadSchema.safeParse({ listingId: 'clh1234567890abcdef01234', name: 'Ana' });
    expect(res.success).toBe(false);
  });
});

describe('listingSearchSchema', () => {
  it('coerces string pagination to numbers', () => {
    const res = listingSearchSchema.parse({ page: '2', pageSize: '20' });
    expect(res.page).toBe(2);
    expect(res.pageSize).toBe(20);
  });

  it('rejects a pageSize above the maximum', () => {
    expect(listingSearchSchema.safeParse({ pageSize: '999' }).success).toBe(false);
  });
});
