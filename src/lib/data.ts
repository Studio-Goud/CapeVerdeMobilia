// Server-side data access. Uses Supabase when configured; otherwise falls back
// to the fictional demo content so the site keeps working during onboarding.
import { LISTINGS, getListing as demoGetListing, type Listing, type TL } from '@/i18n';
import { getServerSupabase } from './supabase/server';

const PLACEHOLDER = 'https://placehold.co/1200x800/0e6a91/ffffff?text=Djarvista';

interface ListingRow {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  published_at: string | null; created_at: string; last_verified_at: string | null; risk_notes: TL | null;
  property: Listing['property']; land: Listing['land'];
}

const EMPTY_TL: TL = { pt: '', en: '', nl: '' };

function rowToListing(r: ListingRow): Listing {
  return {
    id: r.id, slug: r.slug, kind: r.kind,
    title: r.title, description: r.description ?? EMPTY_TL,
    priceAmount: r.price_amount, priceOnRequest: r.price_on_request, isFeatured: r.is_featured,
    documentStatus: r.document_status, island: r.island ?? '', municipality: r.municipality ?? '',
    thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
    lastVerifiedAt: r.last_verified_at, riskNotes: r.risk_notes, property: r.property, land: r.land,
  };
}

/** Published listings from the DB, or demo listings when none/not configured. */
export async function fetchListings(): Promise<Listing[]> {
  const supabase = getServerSupabase();
  if (!supabase) return LISTINGS;
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });
  if (error || !data || data.length === 0) return LISTINGS;
  return (data as ListingRow[]).map(rowToListing);
}

export async function fetchListingBySlug(slug: string): Promise<Listing | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return demoGetListing(slug);
  const { data, error } = await supabase.from('listings').select('*').eq('slug', slug).maybeSingle();
  if (error || !data) return demoGetListing(slug);
  return rowToListing(data as ListingRow);
}
