import { describe, expect, it } from 'vitest';
import { RoleKey } from '@ilhavista/database';
import { hashPassword, verifyPassword, generateOtp, can, assertCan, ForbiddenError } from './index';

describe('password hashing', () => {
  it('verifies a correct password and rejects a wrong one', () => {
    const stored = hashPassword('correct horse battery');
    expect(verifyPassword('correct horse battery', stored)).toBe(true);
    expect(verifyPassword('wrong password', stored)).toBe(false);
  });

  it('produces different hashes for the same password (salted)', () => {
    expect(hashPassword('same')).not.toBe(hashPassword('same'));
  });
});

describe('otp', () => {
  it('generates a 6-digit code', () => {
    const { code } = generateOtp();
    expect(code).toMatch(/^[0-9]{6}$/);
  });
});

describe('RBAC', () => {
  it('grants capabilities to the right roles', () => {
    expect(can([RoleKey.AGENT], 'listing.publish')).toBe(true);
    expect(can([RoleKey.CLIENT], 'job.create')).toBe(true);
    expect(can([RoleKey.SUPERADMIN], 'anything.at.all')).toBe(true);
  });

  it('denies capabilities the role does not have (abuse guard)', () => {
    // A buyer must not be able to publish government content.
    expect(can([RoleKey.BUYER], 'gov.publication.approve')).toBe(false);
    // A seller cannot moderate reviews.
    expect(can([RoleKey.SELLER], 'review.moderate')).toBe(false);
    expect(() => assertCan([RoleKey.BUYER], 'admin.access')).toThrow(ForbiddenError);
  });
});
