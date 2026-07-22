/** Renders a JSON-LD structured-data block. Escapes "<" so business names or
 *  descriptions can never break out of the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }): JSX.Element {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
