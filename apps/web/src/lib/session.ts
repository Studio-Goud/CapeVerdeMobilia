import 'server-only';
import { cookies } from 'next/headers';
import { prisma, type RoleKey } from '@kavila/database';
import { hashToken } from '@kavila/auth';

export const SESSION_COOKIE = 'kavila_session';

export interface SessionUser {
  userId: string;
  displayName: string | null;
  roles: RoleKey[];
}

/**
 * Resolve the current session from the session cookie, if any.
 * Returns null for anonymous requests. Expired/revoked sessions are treated as
 * anonymous. Route handlers should call `requireSession` when auth is mandatory.
 */
export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: { include: { roles: { include: { role: true } } } },
    },
  });

  if (!session || session.revokedAt || session.expiresAt < new Date()) return null;
  if (session.user.status !== 'ACTIVE') return null;

  return {
    userId: session.user.id,
    displayName: session.user.displayName,
    roles: session.user.roles.map((r) => r.role.key),
  };
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Authentication required');
    this.name = 'UnauthorizedError';
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();
  return session;
}
