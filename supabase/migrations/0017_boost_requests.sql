-- 0017 — "boost/feature listing" requests: the first monetizable loop.
-- An owner requests to feature a listing; an admin approves (payment handled
-- off-platform for now — see PAYMENTS.md) and the listing's is_featured is set.
-- Mirrors the verification flow (request → human review → grant). Idempotent.

create table if not exists public.boost_requests (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid not null references public.listings (id) on delete cascade,
  requester    uuid not null references public.profiles (id) on delete cascade,
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  note         text,
  created_at   timestamptz not null default now()
);

create index if not exists boost_status_idx on public.boost_requests (status);

alter table public.boost_requests enable row level security;

-- Owner requests a boost for their own listing.
drop policy if exists "boost requester insert" on public.boost_requests;
create policy "boost requester insert" on public.boost_requests
  for insert to authenticated with check (
    requester = auth.uid()
    and exists (select 1 from public.listings l where l.id = listing_id and l.owner = auth.uid())
  );

-- Requester reads their own; admins read all.
drop policy if exists "boost read own or admin" on public.boost_requests;
create policy "boost read own or admin" on public.boost_requests
  for select to authenticated using (requester = auth.uid() or public.is_admin());

-- Only admins resolve (approve/reject).
drop policy if exists "boost admin update" on public.boost_requests;
create policy "boost admin update" on public.boost_requests
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
