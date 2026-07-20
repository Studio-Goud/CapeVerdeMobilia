import { NextResponse } from 'next/server';
import { IS_DEMO } from '@/lib/queries';

/** GET /api/health — liveness probe. In demo mode there is no database to check. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    mode: IS_DEMO ? 'demo' : 'database',
    time: new Date().toISOString(),
  });
}
