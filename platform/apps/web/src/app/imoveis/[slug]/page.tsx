import { notFound } from 'next/navigation';
import { OfficialTag } from '@djarvista/ui';
import { getListingBySlug } from '@/lib/queries';
import { formatPrice, formatDate, documentStatusLabel } from '@/lib/format';
import { LeadForm } from '@/components/LeadForm';

export default async function ListingDetailPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) notFound();

  const price = formatPrice(
    listing.priceAmount == null ? null : Number(listing.priceAmount),
    listing.priceCurrency,
    listing.priceOnRequest,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {listing.isFeatured && (
          <span className="mb-2 inline-block rounded bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
            Patrocinado
          </span>
        )}
        <h1 className="text-2xl font-bold">{listing.title}</h1>
        <p className="mt-1 text-slate-500">
          {listing.location?.municipality?.name ?? ''} {listing.location?.island?.name ?? ''}
        </p>
        <p className="mt-3 text-2xl font-bold text-brand">{price}</p>

        <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
          {listing.media[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.media[0].url} alt={listing.title} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Descrição</h2>
          <p className="mt-2 whitespace-pre-line text-slate-700">{listing.description ?? '—'}</p>
        </section>

        {listing.property && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Características</h2>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <li>Tipo: {listing.property.type}</li>
              {listing.property.bedrooms != null && <li>Quartos: {listing.property.bedrooms}</li>}
              {listing.property.bathrooms != null && <li>WC: {listing.property.bathrooms}</li>}
              {listing.property.builtAreaSqm != null && (
                <li>Área const.: {Number(listing.property.builtAreaSqm)} m²</li>
              )}
              {listing.property.plotAreaSqm != null && (
                <li>Terreno: {Number(listing.property.plotAreaSqm)} m²</li>
              )}
            </ul>
          </section>
        )}

        {listing.landParcel && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Terreno</h2>
            <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <li>Tipo: {listing.landParcel.type}</li>
              {listing.landParcel.areaSqm != null && <li>Área: {Number(listing.landParcel.areaSqm)} m²</li>}
              {listing.landParcel.zoning && <li>Zonamento: {listing.landParcel.zoning}</li>}
              <li>Construível: {listing.landParcel.buildable ? 'Sim (a confirmar)' : 'Por confirmar'}</li>
            </ul>
          </section>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Confiança & documentos</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <OfficialTag
              variant={listing.documentStatus === 'VERIFIED' ? 'official' : 'unconfirmed'}
            />
            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">
              {documentStatusLabel(listing.documentStatus)}
            </span>
          </div>
          <dl className="mt-3 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <dt>Última verificação</dt>
              <dd>{formatDate(listing.lastVerifiedAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Publicado</dt>
              <dd>{formatDate(listing.publishedAt)}</dd>
            </div>
          </dl>
          {listing.riskNotes && (
            <p className="mt-3 rounded bg-amber-50 p-2 text-xs text-amber-800">{listing.riskNotes}</p>
          )}
          <p className="mt-3 text-[11px] text-slate-400">
            Informação comercial indicativa. Djarvista não confirma a propriedade legal nem substitui a
            devida diligência jurídica.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Contactar / agendar visita</h2>
          <LeadForm listingId={listing.id} />
        </div>
      </aside>
    </div>
  );
}
