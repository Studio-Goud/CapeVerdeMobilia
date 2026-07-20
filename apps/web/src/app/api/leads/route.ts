import { NextResponse } from 'next/server';
import { prisma } from '@kavila/database';
import { createLeadSchema } from '@kavila/validation';
import { track } from '@kavila/analytics';

/**
 * POST /api/leads — create a lead against a published listing.
 * Public endpoint (unauthenticated buyers can enquire). Rate limiting and bot
 * protection are applied at the edge/middleware layer (see docs 13).
 */
export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
      { status: 400 },
    );
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

  const input = parsed.data;

  const listing = await prisma.listing.findFirst({
    where: { id: input.listingId, status: 'PUBLISHED', deletedAt: null },
    select: { id: true },
  });
  if (!listing) {
    return NextResponse.json(
      { error: { code: 'NOT_FOUND', message: 'Listing not found' } },
      { status: 404 },
    );
  }

  const lead = await prisma.lead.create({
    data: {
      listingId: input.listingId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      locale: input.locale,
    },
    select: { id: true, createdAt: true },
  });

  await track({ name: 'listing_lead', props: { listingId: input.listingId } });

  return NextResponse.json({ data: { id: lead.id } }, { status: 201 });
}
