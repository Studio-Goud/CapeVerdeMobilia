/** Djarvista wordmark — concept 01. The dot on the "i" is a rising coral sun.
 *  Uses a dotless "ı" (U+0131) so the sun can sit precisely as the tittle. */
export function Wordmark({ className }: { className?: string }): JSX.Element {
  return (
    <span
      aria-label="Djarvista"
      className={['inline-flex items-center font-extrabold tracking-tightish text-brand whitespace-nowrap', className].filter(Boolean).join(' ')}
    >
      <span aria-hidden>Djarv</span>
      <span aria-hidden className="relative">
        ı
        <span
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-coral"
          style={{ top: '-0.30em', width: '0.17em', height: '0.17em' }}
        />
      </span>
      <span aria-hidden>sta</span>
    </span>
  );
}
