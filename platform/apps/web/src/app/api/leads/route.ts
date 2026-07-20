import { NextResponse } from 'next/server';
import { createLeadSchema } from '@djarvista/validation';
import { track } from '@djarvista/analytics';
import { IS_DEMO } from '@/lib/queries';

/**
 * POST /api/leads — create a lead against a listing.
 * In the demo deployment leads are validated and acknowledged but NOT persisted
 * (there is no database). The database-backed version lives in packages/database.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } }, { status: 400 });
  }

  const parsed = createLeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: parsed.error.flatten().fieldErrors,
        },
      },
      { status: 422 },
    );
  }

  await track({ name: 'listing_lead', props: { listingId: parsed.data.listingId } });

  if (IS_DEMO) {
    return NextResponse.json(
      { data: { id: 'demo-lead', demo: true, message: 'Demonstração: pedido recebido (não guardado).' } },
      { status: 201 },
    );
  }

  // Real deployment: persist via packages/database. Intentionally not imported in
  // the demo build so no database client is bundled.
  return NextResponse.json(
    { error: { code: 'NOT_CONFIGURED', message: 'Database not configured' } },
    { status: 503 },
  );
}
