import * as React from 'react';
import { cn } from './cn';

/**
 * Distinguishes information provenance. Official government content must always
 * be visually separable from platform summaries and commercial/indicative info
 * (see /docs/14-trust-and-verification.md).
 */
export function OfficialTag({
  variant,
  className,
}: {
  variant: 'official' | 'platform-summary' | 'unconfirmed' | 'outdated' | 'under-revision';
  className?: string;
}): React.JSX.Element {
  const map = {
    official: { label: 'Official', cls: 'bg-emerald-600 text-white' },
    'platform-summary': { label: 'Platform summary', cls: 'bg-slate-200 text-slate-700' },
    unconfirmed: { label: 'Not officially confirmed', cls: 'bg-amber-100 text-amber-800' },
    outdated: { label: 'Outdated', cls: 'bg-rose-100 text-rose-800' },
    'under-revision': { label: 'Under revision', cls: 'bg-violet-100 text-violet-800' },
  } as const;
  const { label, cls } = map[variant];
  return (
    <span className={cn('inline-flex rounded px-2 py-0.5 text-xs font-semibold', cls, className)}>
      {label}
    </span>
  );
}
