// Server-side data access. Uses Supabase when configured; otherwise falls back
// to the fictional demo content so the site keeps working during onboarding.
import { LISTINGS, getListing as demoGetListing, type Listing, type TL } from '@/i18n';
import { getServerSupabase } from './supabase/server';

const PLACEHOLDER = 'https://placehold.co/1200x800/0e6a91/ffffff?text=Djarvista';

interface ListingRow {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  owner: string | null;
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
    owner: r.owner, thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
    lastVerifiedAt: r.last_verified_at, riskNotes: r.risk_notes, property: r.property, land: r.land,
  };
}

const demoProperties = (): Listing[] => LISTINGS.filter((l) => l.kind !== 'SERVICE');
const demoServices = (): Listing[] => LISTINGS.filter((l) => l.kind === 'SERVICE');

/** Published property/land listings (services excluded), or demo fallback. */
export async function fetchListings(): Promise<Listing[]> {
  const supabase = getServerSupabase();
  if (!supabase) return demoProperties();
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .neq('kind', 'SERVICE')
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });
  if (error || !data || data.length === 0) return demoProperties();
  return (data as ListingRow[]).map(rowToListing);
}

/** Published service advertisements, or demo fallback. */
export async function fetchServiceListings(): Promise<Listing[]> {
  const supabase = getServerSupabase();
  if (!supabase) return demoServices();
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('status', 'published')
    .eq('kind', 'SERVICE')
    .order('published_at', { ascending: false });
  if (error || !data || data.length === 0) return demoServices();
  return (data as ListingRow[]).map(rowToListing);
}

export async function fetchListingBySlug(slug: string): Promise<Listing | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return demoGetListing(slug);
  const { data, error } = await supabase.from('listings').select('*').eq('slug', slug).maybeSingle();
  if (error || !data) return demoGetListing(slug);
  return rowToListing(data as ListingRow);
}

export interface ReviewView { author: string; rating: number; verified: boolean; date: string; body: string }
interface ReviewRow { author_name: string | null; rating: number; verified: boolean; body: string | null; created_at: string }

/** Reviews for a professional from the DB (empty when not configured). */
export async function fetchReviews(proSlug: string): Promise<ReviewView[]> {
  const supabase = getServerSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reviews')
    .select('author_name,rating,verified,body,created_at')
    .eq('pro_slug', proSlug)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as ReviewRow[]).map((r) => ({
    author: r.author_name || 'Anónimo', rating: r.rating, verified: r.verified,
    date: (r.created_at ?? '').slice(0, 10), body: r.body ?? '',
  }));
}
