import { NextResponse } from 'next/server';
import { prisma } from '@kavila/database';
import { createJobSchema } from '@kavila/validation';
import { assertCan, ForbiddenError } from '@kavila/auth';
import { track } from '@kavila/analytics';
import { getSession } from '@/lib/session';

/**
 * POST /api/jobs — a client posts a job. Requires an authenticated user with the
 * `job.create` capability (BUYER/CLIENT). Demonstrates the RBAC guard pattern.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' } },
      { status: 400 },
    );
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

  try {
    assertCan(session.roles, 'job.create');
  } catch (err) {
    if (err instanceof ForbiddenError) {
      return NextResponse.json({ error: { code: 'FORBIDDEN', message: err.message } }, { status: 403 });
    }
    throw err;
  }

  const input = parsed.data;
  const job = await prisma.job.create({
    data: {
      clientUserId: session.userId,
      title: input.title,
      description: input.description,
      budgetAmount: input.budgetAmount,
      budgetCurrency: input.budgetCurrency,
      deadline: input.deadline,
      status: 'OPEN',
    },
    select: { id: true },
  });

  await track({ name: 'job_posted', props: { categoryKey: input.categoryKey } });

  return NextResponse.json({ data: { id: job.id } }, { status: 201 });
}
