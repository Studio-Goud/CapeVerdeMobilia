import { NextResponse } from 'next/server';
import { prisma } from '@kavila/database';

/** GET /api/health — liveness + DB connectivity probe for load balancers. */
export async function GET(): Promise<NextResponse> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', time: new Date().toISOString() });
  } catch {
    return NextResponse.json({ status: 'degraded', db: 'unreachable' }, { status: 503 });
  }
}
