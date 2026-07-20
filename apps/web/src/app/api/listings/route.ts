import { NextResponse } from 'next/server';
import { listingSearchSchema } from '@kavila/validation';
import { searchListings } from '@/lib/queries';
import { track } from '@kavila/analytics';

/**
 * GET /api/listings — paginated, filterable listing search.
 * Returns a standard paginated envelope. Featured listings are ordered first
 * but flagged so clients can label them "Sponsored".
 */
export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const parsed = listingSearchSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid query', details: parsed.error.flatten().fieldErrors } },
      { status: 422 },
    );
  }

  const result = await searchListings(parsed.data);
  await track({
    name: 'search',
    props: { islandCode: parsed.data.islandCode, kind: parsed.data.kind, results: result.total },
  });

  return NextResponse.json({
    data: result.rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      kind: r.kind,
      title: r.title,
      priceAmount: r.priceAmount == null ? null : Number(r.priceAmount),
      priceCurrency: r.priceCurrency,
      priceOnRequest: r.priceOnRequest,
      island: r.location?.island?.name ?? null,
      isFeatured: r.isFeatured,
      documentStatus: r.documentStatus,
      thumbnailUrl: r.media[0]?.url ?? null,
    })),
    page: result.page,
    pageSize: result.pageSize,
    total: result.total,
    totalPages: result.totalPages,
  });
}
