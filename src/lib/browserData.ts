// Client-side data access (browser Supabase client). Used by dashboard & favorites.
import { getBrowserSupabase } from './supabase/client';
import { isSupabaseConfigured } from './supabase/env';
import type { Listing, TL } from '@/i18n';

const PLACEHOLDER = 'https://placehold.co/1200x800/003893/ffffff?text=Djarvista';
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

// ---------------------------------------------------------------------------
// Listing edit
// ---------------------------------------------------------------------------
export async function updateListing(id: string, patch: Record<string, unknown>): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { error } = await supa.from('listings').update(patch).eq('id', id);
  return error ? error.message : null;
}

// ---------------------------------------------------------------------------
// Rental requests
// ---------------------------------------------------------------------------
export interface RentalRequestItem {
  id: string; listing_id: string | null; tenant_id: string; landlord_id: string | null;
  start_date: string | null; end_date: string | null; message: string | null; status: string; created_at: string;
  listingTitle: TL | null;
}

export async function createRentalRequest(input: { listingId: string; landlordId: string | null; start: string; end: string; message: string }): Promise<string | null> {
  const ctx = await uid();
  // No backend → demo notice. Backend present but no session → ask to re-login.
  if (!ctx) return isSupabaseConfigured ? 'auth' : 'demo';
  const { error } = await ctx.supa.from('rental_requests').insert({
    listing_id: input.listingId, tenant_id: ctx.id, landlord_id: input.landlordId,
    start_date: input.start || null, end_date: input.end || null, message: input.message || null, status: 'pending',
  });
  return error ? error.message : null;
}

async function fetchRentalRequests(column: 'tenant_id' | 'landlord_id'): Promise<RentalRequestItem[] | null> {
  const ctx = await uid();
  if (!ctx) return null;
  const { data } = await ctx.supa
    .from('rental_requests')
    .select('id,listing_id,tenant_id,landlord_id,start_date,end_date,message,status,created_at,listings(title)')
    .eq(column, ctx.id)
    .order('created_at', { ascending: false });
  return (data ?? []).map((d) => {
    const rel = (d as unknown as { listings: { title: TL } | { title: TL }[] | null }).listings;
    const listing = Array.isArray(rel) ? rel[0] ?? null : rel;
    const row = d as unknown as RentalRequestItem;
    return { ...row, listingTitle: listing?.title ?? null };
  });
}
export const fetchIncomingRentalRequests = (): Promise<RentalRequestItem[] | null> => fetchRentalRequests('landlord_id');
export const fetchMyRentalRequests = (): Promise<RentalRequestItem[] | null> => fetchRentalRequests('tenant_id');

export async function setRentalRequestStatus(id: string, status: 'accepted' | 'declined' | 'withdrawn'): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { error } = await supa.from('rental_requests').update({ status }).eq('id', id);
  return error ? error.message : null;
}

export async function currentUserId(): Promise<string | null> {
  const ctx = await uid();
  return ctx?.id ?? null;
}

// ---------------------------------------------------------------------------
// Messaging (between the two parties of a rental request)
// ---------------------------------------------------------------------------
export interface Message { id: string; sender_id: string; body: string; created_at: string }

export async function fetchMessages(requestId: string): Promise<Message[] | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data, error } = await supa.from('messages').select('id,sender_id,body,created_at').eq('request_id', requestId).order('created_at', { ascending: true });
  if (error) return null;
  return (data ?? []) as Message[];
}

export async function sendMessage(requestId: string, body: string): Promise<string | null> {
  const ctx = await uid();
  if (!ctx) return 'auth';
  const { error } = await ctx.supa.from('messages').insert({ request_id: requestId, sender_id: ctx.id, body });
  return error ? error.message : null;
}

// ---------------------------------------------------------------------------
// Bookings (accepted rental requests) for the availability calendar
// ---------------------------------------------------------------------------
export interface Booking { start: string | null; end: string | null; listingTitle: TL | null }

export async function fetchMyBookings(): Promise<Booking[] | null> {
  const ctx = await uid();
  if (!ctx) return null;
  const { data } = await ctx.supa.from('rental_requests').select('start_date,end_date,listings(title)').eq('landlord_id', ctx.id).eq('status', 'accepted');
  return (data ?? []).map((d) => {
    const rel = (d as unknown as { listings: { title: TL } | { title: TL }[] | null }).listings;
    const listing = Array.isArray(rel) ? rel[0] ?? null : rel;
    const row = d as unknown as { start_date: string | null; end_date: string | null };
    return { start: row.start_date, end: row.end_date, listingTitle: listing?.title ?? null };
  });
}

// ---------------------------------------------------------------------------
// Admin (trust/ops) — requires the caller's profile.role = 'admin'
// ---------------------------------------------------------------------------
export interface AdminVerification { id: string; user_id: string; doc_type: string | null; doc_path: string | null; selfie_path: string | null; level_requested: string; status: string; created_at: string }
export interface AdminListing { id: string; slug: string; title: TL; status: string; island: string | null; owner: string | null; created_at: string }

export async function fetchPendingVerifications(): Promise<AdminVerification[] | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data, error } = await supa.from('verification_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false });
  if (error) return null;
  return (data ?? []) as AdminVerification[];
}

/** Approve or reject a verification request; on approval, raise the user's level. */
export async function reviewVerification(reqId: string, userId: string, approve: boolean, level = 'L1_IDENTITY'): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { error: e1 } = await supa.from('verification_requests').update({ status: approve ? 'approved' : 'rejected' }).eq('id', reqId);
  if (e1) return e1.message;
  if (approve) {
    const { error: e2 } = await supa.from('profiles').update({ verification_level: level }).eq('id', userId);
    if (e2) return e2.message;
  }
  return null;
}

export async function fetchAllListingsForMod(): Promise<AdminListing[] | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  const { data, error } = await supa.from('listings').select('id,slug,title,status,island,owner,created_at').order('created_at', { ascending: false }).limit(100);
  if (error) return null;
  return (data ?? []) as AdminListing[];
}

// ---------------------------------------------------------------------------
// Official information centre — editor (admin) + report outdated
// ---------------------------------------------------------------------------
export interface EditablePublication {
  id?: string; slug: string; category: string; title: TL; gov_entity: string;
  official_status: string; version: number; source_url: string; summary: TL; body: TL; status: string;
}
export interface AdminPublication {
  id: string; slug: string; title: TL; category: string | null; official_status: string; status: string; version: number; updated_at: string;
  gov_entity: string | null; source_url: string | null; summary: TL | null; body: TL | null;
}

export async function fetchAllPublicationsForEditor(): Promise<AdminPublication[] | null> {
  const supa = getBrowserSupabase();
  if (!supa) return null;
  // select('*') so editing loads the full row (summary/body/entity/source) and never wipes it on save
  const { data, error } = await supa.from('publications').select('*').order('updated_at', { ascending: false });
  if (error) return null;
  return (data ?? []) as AdminPublication[];
}

export async function savePublication(pub: EditablePublication): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const row = {
    slug: pub.slug, category: pub.category, title: pub.title, gov_entity: pub.gov_entity,
    official_status: pub.official_status, version: pub.version, source_url: pub.source_url || null,
    summary: pub.summary, body: pub.body, status: pub.status,
    published_at: pub.status === 'published' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  if (pub.id) {
    const { error } = await supa.from('publications').update(row).eq('id', pub.id);
    return error ? error.message : null;
  }
  const { error } = await supa.from('publications').insert(row);
  return error ? error.message : null;
}

export async function deletePublication(id: string): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { error } = await supa.from('publications').delete().eq('id', id);
  return error ? error.message : null;
}

/** Report a publication as outdated (anyone, incl. anonymous). */
export async function reportPublicationOutdated(publicationId: string | null, note: string): Promise<string | null> {
  const supa = getBrowserSupabase();
  if (!supa) return 'demo';
  const { data: auth } = await supa.auth.getUser();
  const { error } = await supa.from('publication_flags').insert({ publication_id: publicationId, reporter_id: auth.user?.id ?? null, note });
  return error ? error.message : null;
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
