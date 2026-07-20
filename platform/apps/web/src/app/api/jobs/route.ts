import { NextResponse } from 'next/server';
import { createJobSchema } from '@djarvista/validation';
import { IS_DEMO } from '@/lib/queries';

/**
 * POST /api/jobs — a client posts a job.
 * In the real app this requires an authenticated user with the `job.create`
 * capability (RBAC) and persists to the database. In the demo build there is no
 * session store, so posting is acknowledged as a demo action.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } }, { status: 400 });
  }

  const parsed = createJobSchema.safeParse(json);
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

  if (IS_DEMO) {
    return NextResponse.json(
      { data: { id: 'demo-job', demo: true, message: 'Demonstração: pedido recebido. Entraremos em contacto.' } },
      { status: 201 },
    );
  }

  return NextResponse.json(
    { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
    { status: 401 },
  );
}
