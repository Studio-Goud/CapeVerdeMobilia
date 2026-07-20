import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient.
 *
 * In development, Next.js hot-reload would otherwise create a new client on
 * every reload and exhaust the connection pool, so we cache it on globalThis.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Re-export the generated types so consumers depend only on @ilhavista/database.
export * from '@prisma/client';
