import { prisma } from '@ilhavista/database';

/**
 * Minimal operations dashboard: verification queue, moderation cases and review
 * status counts. Access is restricted to staff roles at the gateway (RBAC:
 * `admin.access`) — wired to real auth before any deployment.
 */
export default async function AdminHome(): Promise<JSX.Element> {
  const [pendingVerifications, openModeration, reviewsUnderReview, fraudSignals] = await Promise.all([
    prisma.verification.count({ where: { status: { in: ['PENDING', 'IN_REVIEW'] } } }),
    prisma.moderationCase.count({ where: { status: { in: ['OPEN', 'IN_REVIEW'] } } }),
    prisma.review.count({ where: { status: 'UNDER_REVIEW' } }),
    prisma.fraudSignal.count({ where: { resolved: false } }),
  ]);

  const stats = [
    { label: 'Verifications pending', value: pendingVerifications },
    { label: 'Moderation cases open', value: openModeration },
    { label: 'Reviews under review', value: reviewsUnderReview },
    { label: 'Unresolved fraud signals', value: fraudSignals },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Operations dashboard</h1>
      <p style={{ color: '#475569' }}>Concierge-MVP queues for the São Vicente pilot.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginTop: 16 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
