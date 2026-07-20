import * as React from 'react';
import { cn } from './cn';

export type VerificationLevel =
  | 'L0_NONE'
  | 'L1_IDENTITY'
  | 'L2_BUSINESS'
  | 'L3_DOCUMENTS'
  | 'L4_TRANSACTION'
  | 'L5_INSTITUTIONAL';

const LABELS: Record<VerificationLevel, string> = {
  L0_NONE: 'Not verified',
  L1_IDENTITY: 'Identity verified',
  L2_BUSINESS: 'Business verified',
  L3_DOCUMENTS: 'Documents verified',
  L4_TRANSACTION: 'Transaction verified',
  L5_INSTITUTIONAL: 'Institutional partner',
};

/**
 * Trust badge. Higher levels are visually stronger. Never render a level the
 * subject has not actually attained — trust signals must be truthful.
 */
export function TrustBadge({
  level,
  className,
}: {
  level: VerificationLevel;
  className?: string;
}): React.JSX.Element {
  const strong = level === 'L4_TRANSACTION' || level === 'L5_INSTITUTIONAL';
  const mid = level === 'L2_BUSINESS' || level === 'L3_DOCUMENTS';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        strong && 'bg-emerald-100 text-emerald-800',
        mid && 'bg-sky-100 text-sky-800',
        !strong && !mid && 'bg-slate-100 text-slate-600',
        className,
      )}
      aria-label={LABELS[level]}
      title={LABELS[level]}
    >
      <span aria-hidden>{level === 'L0_NONE' ? '○' : '✓'}</span>
      {LABELS[level]}
    </span>
  );
}
