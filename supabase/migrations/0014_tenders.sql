-- 0014 — real tenders/bids (concursos). An owner posts a tender; professionals
-- submit bids. Replaces the demo TENDERS content and the dead "submit bid" button.
-- Idempotent. Run after 0013.

create table if not exists public.tenders (
  id           uuid primary key default gen_random_uuid(),
  owner        uuid not null references public.profiles (id) on delete cascade,
  slug         text unique not null,
  title        jsonb not null default '{}'::jsonb,   -- { pt, en, nl }
  description  jsonb,                                 -- { pt, en, nl } | null
  island       text,
  kind         text not null default 'PRIVATE' check (kind in ('PUBLIC', 'PRIVATE')),
  budget_cve   bigint,
  deadline     date,
  status       text not null default 'open' check (status in ('open', 'closed', 'draft')),
  bids_count   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists tenders_status_idx on public.tenders (status);
create index if not exists tenders_island_idx on public.tenders (island);

alter table public.tenders enable row level security;

drop policy if exists "tenders public read" on public.tenders;
create policy "tenders public read" on public.tenders
  for select using (status <> 'draft' or owner = auth.uid() or public.is_admin());

drop policy if exists "tenders owner insert" on public.tenders;
create policy "tenders owner insert" on public.tenders
  for insert to authenticated with check (owner = auth.uid());

drop policy if exists "tenders owner update" on public.tenders;
create policy "tenders owner update" on public.tenders
  for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "tenders owner delete" on public.tenders;
create policy "tenders owner delete" on public.tenders
  for delete to authenticated using (owner = auth.uid());

drop policy if exists "tenders admin all" on public.tenders;
create policy "tenders admin all" on public.tenders
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Bids on a tender.
create table if not exists public.tender_bids (
  id          uuid primary key default gen_random_uuid(),
  tender_id   uuid not null references public.tenders (id) on delete cascade,
  bidder_id   uuid not null references public.profiles (id) on delete cascade,
  amount_cve  bigint,
  message     text,
  created_at  timestamptz not null default now(),
  unique (tender_id, bidder_id)
);

alter table public.tender_bids enable row level security;

-- A bidder inserts their own bid, but only while the tender is open.
drop policy if exists "bids insert own" on public.tender_bids;
create policy "bids insert own" on public.tender_bids
  for insert to authenticated with check (
    bidder_id = auth.uid()
    and exists (select 1 from public.tenders t where t.id = tender_id and t.status = 'open')
  );

drop policy if exists "bids read owner or bidder" on public.tender_bids;
create policy "bids read owner or bidder" on public.tender_bids
  for select to authenticated using (
    bidder_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.tenders t where t.id = tender_id and t.owner = auth.uid())
  );

drop policy if exists "bids update own" on public.tender_bids;
create policy "bids update own" on public.tender_bids
  for update to authenticated using (bidder_id = auth.uid()) with check (bidder_id = auth.uid());

-- A bidder may withdraw their own bid.
drop policy if exists "bids delete own" on public.tender_bids;
create policy "bids delete own" on public.tender_bids
  for delete to authenticated using (bidder_id = auth.uid());

-- Keep tenders.updated_at fresh.
create or replace function public.touch_tenders_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists tenders_touch_updated on public.tenders;
create trigger tenders_touch_updated
  before update on public.tenders
  for each row execute function public.touch_tenders_updated_at();

-- Maintain a public bid count on the tender (bids themselves are RLS-restricted
-- to owner/bidder, so the count is denormalised here for the public list).
create or replace function public.sync_tender_bids_count()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.tenders set bids_count = bids_count + 1 where id = new.tender_id;
  elsif tg_op = 'DELETE' then
    update public.tenders set bids_count = greatest(bids_count - 1, 0) where id = old.tender_id;
  end if;
  return null;
end $$;

drop trigger if exists tender_bids_count on public.tender_bids;
create trigger tender_bids_count
  after insert or delete on public.tender_bids
  for each row execute function public.sync_tender_bids_count();
