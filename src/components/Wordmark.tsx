/** Djarvista wordmark - concept 01. The dot on the "i" is a rising coral sun.
 *  Uses a dotless "ı" (U+0131) so the sun can sit precisely as the tittle.
 *  The sun is anchored with `bottom` (relative to the line box) so it hugs the
 *  x-height "ı" across font stacks; anchoring with a negative `top` made it
 *  float near the ascender line, visibly detached from the letter. */
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
          style={{ bottom: '0.76em', width: '0.18em', height: '0.18em' }}
        />
      </span>
      <span aria-hidden>sta</span>
    </span>
  );
}
