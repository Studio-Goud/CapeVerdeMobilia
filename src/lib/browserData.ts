// Client-side data access (browser Supabase client). Used by dashboard & favorites.
import { getBrowserSupabase } from './supabase/client';
import type { Listing, TL } from '@/i18n';

const PLACEHOLDER = 'https://placehold.co/1200x800/0e6a91/ffffff?text=Djarvista';
const EMPTY_TL: TL = { pt: '', en: '', nl: '' };

interface Row {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  published_at: string | null; created_at: string; last_verified_at: string | null; risk_notes: TL | null;
  property: Listing['property']; land: Listing['land'];
}

function toListing(r: Row): Listing {
  return {
    id: r.id, slug: r.slug, kind: r.kind, title: r.title, description: r.description ?? EMPTY_TL,
    priceAmount: r.price_amount, priceOnRequest: r.price_on_request, isFeatured: r.is_featured,
    documentStatus: r.document_status, island: r.island ?? '', municipality: r.municipality ?? '',
    thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
    lastVerifiedAt: r.last_verified_at, riskNotes: r.risk_notes, property: r.property, land: r.land,
  };
}

export interface BusinessDashboard { listings: Listing[]; leadsCount: number }

export async function fetchBusinessDashboard(): Promise<BusinessDashboard | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data: auth } = await supa.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return null;
  const { data: rows } = await supa.from('listings').select('*').eq('owner', uid).order('created_at', { ascending: false });
  const { count } = await supa.from('leads').select('*', { count: 'exact', head: true }).eq('recipient', uid);
  return { listings: ((rows ?? []) as Row[]).map(toListing), leadsCount: count ?? 0 };
}

export async function fetchMyFavorites(): Promise<Listing[] | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data: auth } = await supa.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return null;
  const { data } = await supa.from('favorites').select('listings(*)').eq('user_id', uid);
  const rows: Row[] = [];
  for (const d of data ?? []) {
    const rel = (d as unknown as { listings: Row | Row[] | null }).listings;
    if (Array.isArray(rel)) rows.push(...rel);
    else if (rel) rows.push(rel);
  }
  return rows.map(toListing);
}

/** Adds a favorite. Returns 'ok', 'demo' (not configured), 'auth' (not logged in), or an error string. */
export async function saveFavorite(listingId: string): Promise<'ok' | 'demo' | 'auth' | string> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { data: auth } = await supa.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return 'auth';
  const { error } = await supa.from('favorites').upsert({ user_id: uid, listing_id: listingId });
  return error ? error.message : 'ok';
}
