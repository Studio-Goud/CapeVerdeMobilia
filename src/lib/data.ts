// Server-side data access. Uses Supabase when configured; otherwise falls back
// to the fictional demo content so the site keeps working during onboarding.
import { LISTINGS, getListing as demoGetListing, type Listing, type TL } from '@/i18n';
import { getServerSupabase } from './supabase/server';

const PLACEHOLDER = 'https://placehold.co/1200x800/003893/ffffff?text=Djarvista';

interface ListingRow {
  id: string; slug: string; kind: string; title: TL; description: TL | null;
  price_amount: number | null; price_on_request: boolean; is_featured: boolean;
  document_status: string; island: string | null; municipality: string | null; thumbnail: string | null;
  owner: string | null; latitude: number | null; longitude: number | null; photos: string[] | null;
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
    owner: r.owner, latitude: r.latitude, longitude: r.longitude, photos: r.photos,
    thumbnail: r.thumbnail || PLACEHOLDER, publishedAt: r.published_at ?? r.created_at,
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

// --- Official information centre (publications) ---
export type OfficialStatus = 'official' | 'summary' | 'unconfirmed' | 'outdated' | 'in_revision';
export interface InfoItem {
  id: string | null; slug: string; category: string | null; title: TL;
  govEntity: string | null; officialStatus: OfficialStatus; version: number;
  sourceUrl: string | null; summary: TL | null; body: TL | null;
  publishedAt: string | null; updatedAt: string | null;
}
interface PubRow {
  id: string; slug: string; category: string | null; title: TL; gov_entity: string | null;
  official_status: OfficialStatus; version: number; source_url: string | null;
  summary: TL | null; body: TL | null; published_at: string | null; updated_at: string | null;
}
function pubRowToItem(r: PubRow): InfoItem {
  return {
    id: r.id, slug: r.slug, category: r.category, title: r.title, govEntity: r.gov_entity,
    officialStatus: r.official_status, version: r.version, sourceUrl: r.source_url,
    summary: r.summary, body: r.body, publishedAt: r.published_at, updatedAt: r.updated_at,
  };
}

const DEMO_INFO: InfoItem[] = [
  { id: null, slug: 'inquilino-recusa-sair', category: 'arrendamento',
    title: { pt: 'Inquilino que se recusa a sair: o que pode fazer o senhorio', en: 'Tenant who refuses to leave: what a landlord can do', nl: 'Huurder die weigert te vertrekken: wat kan de verhuurder doen' },
    govEntity: 'Resumo da plataforma — validação jurídica necessária', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Resumo indicativo. O senhorio não pode despejar pela força. A saída resolve-se por via judicial; recomenda-se advogado. As regras são publicadas no Boletim Oficial.', en: 'Indicative summary. A landlord may not evict by force. Removal is resolved through the courts; a lawyer is recommended. The rules are published in the Official Gazette.', nl: 'Indicatieve samenvatting. Een verhuurder mag niet met geweld ontruimen. Vertrek verloopt via de rechter; een advocaat wordt aangeraden. De regels staan in het Boletim Oficial.' },
    body: null, publishedAt: '2026-07-01', updatedAt: '2026-07-01' },
  { id: null, slug: 'reforma-fiscal-imobiliaria-2026', category: 'impostos',
    title: { pt: 'Reforma fiscal imobiliária 2026: cITI e cIPI', en: '2026 real-estate tax reform: cITI and cIPI', nl: 'Vastgoedbelastinghervorming 2026: cITI en cIPI' },
    govEntity: 'Resumo da plataforma — confirmar com as Finanças', officialStatus: 'summary', version: 1, sourceUrl: 'https://boe.incv.cv/',
    summary: { pt: 'Desde 1 de janeiro de 2026 o IUP foi substituído pelo cITI (transmissão) e cIPI (propriedade). Confirmar com a Autoridade Tributária.', en: 'Since 1 January 2026 the IUP was replaced by cITI (transfer) and cIPI (ownership). Confirm with the tax authority.', nl: 'Sinds 1 januari 2026 is de IUP vervangen door cITI (overdracht) en cIPI (eigendom). Bevestig bij de Belastingdienst.' },
    body: null, publishedAt: '2026-06-15', updatedAt: '2026-06-15' },
];

export async function fetchPublications(): Promise<InfoItem[]> {
  const supabase = getServerSupabase();
  if (!supabase) return DEMO_INFO;
  const { data, error } = await supabase.from('publications').select('*').eq('status', 'published').order('updated_at', { ascending: false });
  if (error || !data || data.length === 0) return DEMO_INFO;
  return (data as PubRow[]).map(pubRowToItem);
}

export async function fetchPublicationBySlug(slug: string): Promise<InfoItem | undefined> {
  const supabase = getServerSupabase();
  if (!supabase) return DEMO_INFO.find((p) => p.slug === slug);
  const { data, error } = await supabase.from('publications').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (error || !data) return DEMO_INFO.find((p) => p.slug === slug);
  return pubRowToItem(data as PubRow);
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
