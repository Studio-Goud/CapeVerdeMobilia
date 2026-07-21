// Client-side data access (browser Supabase client). Used by dashboard & favorites.
import { getBrowserSupabase } from './supabase/client';
import type { Listing, TL } from '@/i18n';

const PLACEHOLDER = 'https://placehold.co/1200x800/0e6a91/ffffff?text=Djarvista';
const EMPTY_TL: TL = { pt: '', en: '', nl: '' };

interface Row {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  owner: string | null; status: string;
  published_at: string | null; created_at: string; last_verified_at: string | null; risk_notes: TL | null;
  property: Listing['property']; land: Listing['land'];
}

function toListing(r: Row): Listing {
  return {
    id: r.id, slug: r.slug, kind: r.kind, title: r.title, description: r.description ?? EMPTY_TL,
    priceAmount: r.price_amount, priceOnRequest: r.price_on_request, isFeatured: r.is_featured,
    documentStatus: r.document_status, island: r.island ?? '', municipality: r.municipality ?? '',
    owner: r.owner, thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
    lastVerifiedAt: r.last_verified_at, riskNotes: r.risk_notes, property: r.property, land: r.land,
  };
}

export interface OwnedListing { id: string; slug: string; title: TL; island: string; thumbnail: string; kind: string; status: string }
export interface LeadItem { id: string; name: string; email: string | null; phone: string | null; message: string; source: string; created_at: string; listingTitle: TL | null }
export interface BusinessDashboard { listings: OwnedListing[]; leadsCount: number }

async function uid(): Promise<{ supa: NonNullable<ReturnType<typeof getBrowserSupabase>>; id: string } | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data } = await supa.auth.getUser();
  return data.user ? { supa, id: data.user.id } : null;
}

export async function fetchBusinessDashboard(): Promise<BusinessDashboard | null> {
  const ctx = await uid();
  if (!ctx) return null;
  const { data: rows } = await ctx.supa.from('listings').select('*').eq('owner', ctx.id).order('created_at', { ascending: false });
  const { count } = await ctx.supa.from('leads').select('*', { count: 'exact', head: true }).eq('recipient', ctx.id);
  const listings: OwnedListing[] = ((rows ?? []) as Row[]).map((r) => ({
    id: r.id, slug: r.slug, title: r.title, island: r.island ?? '', thumbnail: r.thumbnail || PLACEHOLDER, kind: r.kind, status: r.status,
  }));
  return { listings, leadsCount: count ?? 0 };
}

export async function fetchLeads(): Promise<LeadItem[] | null> {
  const ctx = await uid();
  if (!ctx) return null;
  const { data } = await ctx.supa
    .from('leads')
    .select('id,name,email,phone,message,source,created_at,listings(title)')
    .eq('recipient', ctx.id)
    .order('created_at', { ascending: false });
  return (data ?? []).map((d) => {
    const rel = (d as unknown as { listings: { title: TL } | { title: TL }[] | null }).listings;
    const listing = Array.isArray(rel) ? rel[0] ?? null : rel;
    const row = d as unknown as LeadItem;
    return {
      id: row.id, name: row.name, email: row.email, phone: row.phone, message: row.message,
      source: row.source, created_at: row.created_at, listingTitle: listing?.title ?? null,
    };
  });
}

export async function setListingStatus(id: string, status: 'published' | 'draft'): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const patch: Record<string, unknown> = { status };
  if (status === 'published') patch.published_at = new Date().toISOString();
  const { error } = await supa.from('listings').update(patch).eq('id', id);
  return error ? error.message : null;
}

export async function deleteListing(id: string): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { error } = await supa.from('listings').delete().eq('id', id);
  return error ? error.message : null;
}

export async function fetchMyFavorites(): Promise<Listing[] | null> {
  const ctx = await uid();
  if (!ctx) return null;
  const { data } = await ctx.supa.from('favorites').select('listings(*)').eq('user_id', ctx.id);
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
  const uidv = auth.user?.id;
  if (!uidv) return 'auth';
  const { error } = await supa.from('favorites').upsert({ user_id: uidv, listing_id: listingId });
  return error ? error.message : 'ok';
}
