import { createHash, randomBytes, randomInt, timingSafeEqual } from 'node:crypto';
import { RoleKey } from '@kavila/database';

/**
 * Auth primitives for the MVP. Kept deliberately small and dependency-light.
 *
 * NOTE: password hashing here uses a salted SHA-256 placeholder purely so the
 * scaffold has no native build step. Before any real deployment, replace
 * `hashPassword`/`verifyPassword` with argon2id or bcrypt (see
 * /docs/13-security-and-privacy.md — flagged as a hardening TODO).
 */

const SCRYPT_TODO = 'TODO: replace with argon2id/bcrypt before production';

export function hashPassword(password: string, salt = randomBytes(16).toString('hex')): string {
  const digest = createHash('sha256').update(`${salt}:${password}`).digest('hex');
  return `sha256$${salt}$${digest}`; // ${SCRYPT_TODO}
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'sha256') return false;
  const salt = parts[1] ?? '';
  const expected = parts[2] ?? '';
  const actual = createHash('sha256').update(`${salt}:${password}`).digest('hex');
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Generate a numeric OTP (default 6 digits) and its hash for storage. */
export function generateOtp(digits = 6): { code: string; codeHash: string } {
  const max = 10 ** digits;
  const code = String(randomInt(0, max)).padStart(digits, '0');
  return { code, codeHash: hashToken(code) };
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function newSessionToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString('base64url');
  return { token, tokenHash: hashToken(token) };
}

// --------------------------------------------------------------------------
// RBAC
// --------------------------------------------------------------------------

/**
 * Static capability map used for fast checks in the UI / route guards. The
 * authoritative grants live in the Role/Permission tables; this mirror keeps
 * hot-path checks synchronous. Keep in sync with the seed.
 */
export const ROLE_PERMISSIONS: Partial<Record<RoleKey, string[]>> = {
  [RoleKey.AGENT]: ['listing.create', 'listing.publish'],
  [RoleKey.SELLER]: ['listing.create'],
  [RoleKey.PROFESSIONAL]: ['quote.create'],
  [RoleKey.CLIENT]: ['job.create', 'review.create'],
  [RoleKey.BUYER]: ['review.create'],
  [RoleKey.GOV_EDITOR]: ['gov.publication.create'],
  [RoleKey.GOV_APPROVER]: ['gov.publication.create', 'gov.publication.approve'],
  [RoleKey.MODERATOR]: ['review.moderate', 'listing.moderate'],
  [RoleKey.VERIFICATION_SPECIALIST]: ['verification.review'],
  [RoleKey.PLATFORM_ADMIN]: ['admin.access'],
  [RoleKey.SUPERADMIN]: ['*'],
};

export function can(roles: RoleKey[], permission: string): boolean {
  return roles.some((role) => {
    const perms = ROLE_PERMISSIONS[role] ?? [];
    return perms.includes('*') || perms.includes(permission);
  });
}

/** Throws if the permission is missing — use in route handlers. */
export class ForbiddenError extends Error {
  constructor(permission: string) {
    super(`Missing permission: ${permission}`);
    this.name = 'ForbiddenError';
  }
}

export function assertCan(roles: RoleKey[], permission: string): void {
  if (!can(roles, permission)) throw new ForbiddenError(permission);
}

export { SCRYPT_TODO };
