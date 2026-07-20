import { ListingCard } from '@ilhavista/ui';
import { formatPrice, documentStatusLabel } from '@/lib/format';

type Row = {
  id: string;
  slug: string;
  title: string;
  priceAmount: unknown;
  priceCurrency: string;
  priceOnRequest: boolean;
  isFeatured: boolean;
  documentStatus: string;
  location: { island: { name: string } | null } | null;
  media: { url: string }[];
};

export function ListingGrid({ rows }: { rows: Row[] }): JSX.Element {
  if (rows.length === 0) {
    return <p className="rounded-lg border border-dashed border-slate-300 p-6 text-slate-500">Sem resultados.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((r) => (
        <ListingCard
          key={r.id}
          slug={r.slug}
          title={r.title}
          priceLabel={formatPrice(
            r.priceAmount == null ? null : Number(r.priceAmount),
            r.priceCurrency,
            r.priceOnRequest,
          )}
          island={r.location?.island?.name ?? null}
          thumbnailUrl={r.media[0]?.url ?? null}
          isFeatured={r.isFeatured}
          documentStatusLabel={documentStatusLabel(r.documentStatus)}
        />
      ))}
    </div>
  );
}
