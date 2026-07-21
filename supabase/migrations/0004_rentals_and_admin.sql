-- Djarvista — rental requests + admin (trust/ops) access (run in Supabase SQL editor)

-- ---------------------------------------------------------------------------
-- Rental requests: a tenant asks to rent a listing for a period
-- ---------------------------------------------------------------------------
create table if not exists public.rental_requests (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid references public.listings (id) on delete cascade,
  tenant_id    uuid not null references auth.users (id) on delete cascade,
  landlord_id  uuid references auth.users (id) on delete set null,
  start_date   date,
  end_date     date,
  message      text,
  status       text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'withdrawn')),
  created_at   timestamptz not null default now()
);

create index if not exists rr_tenant_idx on public.rental_requests (tenant_id);
create index if not exists rr_landlord_idx on public.rental_requests (landlord_id);

alter table public.rental_requests enable row level security;

drop policy if exists "rr tenant insert" on public.rental_requests;
create policy "rr tenant insert" on public.rental_requests
  for insert to authenticated with check (tenant_id = auth.uid());

drop policy if exists "rr read own" on public.rental_requests;
create policy "rr read own" on public.rental_requests
  for select to authenticated using (tenant_id = auth.uid() or landlord_id = auth.uid());

drop policy if exists "rr landlord or tenant update" on public.rental_requests;
create policy "rr landlord or tenant update" on public.rental_requests
  for update to authenticated using (landlord_id = auth.uid() or tenant_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Admin (role = 'admin') access for trust/ops moderation
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Admins can read/update all verification requests (in addition to owners)
drop policy if exists "vr admin read" on public.verification_requests;
create policy "vr admin read" on public.verification_requests
  for select to authenticated using (public.is_admin());

drop policy if exists "vr admin update" on public.verification_requests;
create policy "vr admin update" on public.verification_requests
  for update to authenticated using (public.is_admin());

-- Admins can read all profiles' verification docs (private bucket)
drop policy if exists "verif docs admin read" on storage.objects;
create policy "verif docs admin read" on storage.objects
  for select to authenticated using (bucket_id = 'verification-docs' and public.is_admin());

-- Admins can see and moderate all listings (incl. drafts of others)
drop policy if exists "listings admin read" on public.listings;
create policy "listings admin read" on public.listings
  for select to authenticated using (public.is_admin());

drop policy if exists "listings admin update" on public.listings;
create policy "listings admin update" on public.listings
  for update to authenticated using (public.is_admin());

-- Admins can update any profile's verification level
drop policy if exists "profiles admin update" on public.profiles;
create policy "profiles admin update" on public.profiles
  for update to authenticated using (public.is_admin());
