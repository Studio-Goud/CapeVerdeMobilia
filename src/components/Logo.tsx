/** Djarvista mark — a sun over Atlantic waves (island view). Inherits text color where needed. */
export function Logo({ size = 28, withWordmark = false }: { size?: number; withWordmark?: boolean }): JSX.Element {
  const mark = (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden role="img">
      <rect width="32" height="32" rx="8" fill="#0e6a91" />
      <circle cx="16" cy="13" r="5" fill="#f2612a" />
      <path d="M5 21c2.2 0 2.2 1.6 4.4 1.6S11.6 21 13.8 21s2.2 1.6 4.4 1.6S20.4 21 22.6 21s2.2 1.6 4.4 1.6" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 25.4c2.2 0 2.2 1.6 4.4 1.6s2.2-1.6 4.4-1.6 2.2 1.6 4.4 1.6 2.2-1.6 4.4-1.6 2.2 1.6 4.4 1.6" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
  if (!withWordmark) return mark;
  return (
    <span className="flex items-center gap-2 font-bold text-brand">
      {mark}
      <span className="tracking-tightish">Djarvista</span>
    </span>
  );
}
