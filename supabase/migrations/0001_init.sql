-- Djarvista — initial schema (Supabase / PostgreSQL)
-- Run in the Supabase SQL editor (or `supabase db push`).
-- Multilingual text (title/description/…) is stored as JSONB: { "pt": "...", "en": "...", "nl": "..." }.

-- ---------------------------------------------------------------------------
-- Profiles (one row per auth user) + role for RBAC
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  name               text not null default '',
  role               text not null default 'private' check (role in ('private', 'business', 'admin')),
  company            text,
  verification_level text not null default 'L0_NONE',
  created_at         timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles readable by all" on public.profiles;
create policy "profiles readable by all" on public.profiles
  for select using (true);

drop policy if exists "users insert own profile" on public.profiles;
create policy "users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create a profile automatically on signup, copying metadata from the signup call.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, role, company)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(nullif(new.raw_user_meta_data->>'role', ''), 'private'),
    new.raw_user_meta_data->>'company'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Listings (properties & land)
-- ---------------------------------------------------------------------------
create table if not exists public.listings (
  id                uuid primary key default gen_random_uuid(),
  owner             uuid not null references auth.users (id) on delete cascade,
  slug              text unique not null,
  kind              text not null,
  title             jsonb not null,
  description       jsonb not null default '{}'::jsonb,
  price_amount      bigint,
  price_on_request  boolean not null default false,
  is_featured       boolean not null default false,
  document_status   text not null default 'DECLARED',
  island            text,
  municipality      text,
  thumbnail         text,
  latitude          double precision,
  longitude         double precision,
  property          jsonb,
  land              jsonb,
  status            text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  risk_notes        jsonb,
  last_verified_at  timestamptz,
  published_at      timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists listings_status_idx on public.listings (status);
create index if not exists listings_owner_idx  on public.listings (owner);
create index if not exists listings_island_idx on public.listings (island);

alter table public.listings enable row level security;

drop policy if exists "published listings are public" on public.listings;
create policy "published listings are public" on public.listings
  for select using (status = 'published' or owner = auth.uid());

drop policy if exists "owners insert listings" on public.listings;
create policy "owners insert listings" on public.listings
  for insert with check (owner = auth.uid());

drop policy if exists "owners update listings" on public.listings;
create policy "owners update listings" on public.listings
  for update using (owner = auth.uid());

drop policy if exists "owners delete listings" on public.listings;
create policy "owners delete listings" on public.listings
  for delete using (owner = auth.uid());

-- ---------------------------------------------------------------------------
-- Leads (contact / job requests) — anyone may submit; only the recipient reads
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid references public.listings (id) on delete set null,
  pro_slug     text,
  recipient    uuid references auth.users (id) on delete set null,
  name         text not null,
  email        text,
  phone        text,
  message      text not null,
  source       text not null default 'contact',
  created_at   timestamptz not null default now()
);

create index if not exists leads_recipient_idx on public.leads (recipient);

alter table public.leads enable row level security;

drop policy if exists "anyone submits leads" on public.leads;
create policy "anyone submits leads" on public.leads
  for insert with check (true);

drop policy if exists "recipient reads leads" on public.leads;
create policy "recipient reads leads" on public.leads
  for select using (recipient = auth.uid());

-- ---------------------------------------------------------------------------
-- Favorites (private users save listings)
-- ---------------------------------------------------------------------------
create table if not exists public.favorites (
  user_id    uuid not null references auth.users (id) on delete cascade,
  listing_id uuid not null references public.listings (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

alter table public.favorites enable row level security;

drop policy if exists "users manage own favorites" on public.favorites;
create policy "users manage own favorites" on public.favorites
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Reviews (verified flag set by trust ops / evidence, never by AI alone)
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  pro_slug     text not null,
  author_id    uuid not null references auth.users (id) on delete cascade,
  author_name  text not null default '',
  rating       int not null check (rating between 1 and 5),
  body         text not null default '',
  verified     boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists reviews_pro_idx on public.reviews (pro_slug);

alter table public.reviews enable row level security;

drop policy if exists "reviews are public" on public.reviews;
create policy "reviews are public" on public.reviews
  for select using (true);

drop policy if exists "authenticated insert reviews" on public.reviews;
create policy "authenticated insert reviews" on public.reviews
  for insert with check (author_id = auth.uid());

drop policy if exists "authors update own reviews" on public.reviews;
create policy "authors update own reviews" on public.reviews
  for update using (author_id = auth.uid());
