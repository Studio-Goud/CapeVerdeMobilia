-- Djarvista — migraties 0012 en 0013 (in volgorde). Plak in Supabase -> SQL Editor -> Run.
-- Idempotent. Vereist 0001-0011 (die zijn al gedraaid).

-- ===================================================================
-- 0012_professionals.sql
-- ===================================================================
-- 0012 — real professionals directory (replaces the demo PROFESSIONALS content).
-- A business user owns exactly one professional profile. Trust level comes from
-- their profile; ratings come from the existing reviews table (keyed by slug).
-- Idempotent. Run after 0011.

create table if not exists public.professionals (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null unique references public.profiles (id) on delete cascade,
  slug              text unique not null,
  display_name      text not null,
  headline          jsonb not null default '{}'::jsonb,   -- { pt, en, nl }
  bio               jsonb not null default '{}'::jsonb,    -- { pt, en, nl }
  category          text,
  service_areas     text[] not null default '{}',
  price_indication  jsonb,                                 -- { pt, en, nl } | null
  phone             text,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists professionals_status_idx on public.professionals (status);
create index if not exists professionals_slug_idx on public.professionals (slug);

alter table public.professionals enable row level security;

-- Anyone may read published profiles; the owner sees their own draft; admins see all.
drop policy if exists "professionals public read" on public.professionals;
create policy "professionals public read" on public.professionals
  for select using (status = 'published' or user_id = auth.uid() or public.is_admin());

-- The owner creates/edits their own profile.
drop policy if exists "professionals owner insert" on public.professionals;
create policy "professionals owner insert" on public.professionals
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "professionals owner update" on public.professionals;
create policy "professionals owner update" on public.professionals
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "professionals owner delete" on public.professionals;
create policy "professionals owner delete" on public.professionals
  for delete to authenticated using (user_id = auth.uid());

-- Admin (trust/ops) moderation.
drop policy if exists "professionals admin update" on public.professionals;
create policy "professionals admin update" on public.professionals
  for update to authenticated using (public.is_admin());

drop policy if exists "professionals admin delete" on public.professionals;
create policy "professionals admin delete" on public.professionals
  for delete to authenticated using (public.is_admin());

-- Keep updated_at fresh on edits.
create or replace function public.touch_professionals_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists professionals_touch_updated on public.professionals;
create trigger professionals_touch_updated
  before update on public.professionals
  for each row execute function public.touch_professionals_updated_at();


-- ===================================================================
-- 0013_suppliers.sql
-- ===================================================================
-- 0013 — real building-materials suppliers directory (replaces demo SUPPLIERS).
-- A business user owns one supplier profile. `verified` is a trust/ops flag that
-- only admins may set (guarded by a trigger, like reviews.verified). Idempotent.
-- Run after 0012.

create table if not exists public.suppliers (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references public.profiles (id) on delete cascade,
  slug         text unique not null,
  name         text not null,
  category     jsonb not null default '{}'::jsonb,  -- { pt, en, nl }
  island       text,
  description  jsonb,                                -- { pt, en, nl } | null
  price_from   jsonb,                                -- { pt, en, nl } | null
  phone        text,
  verified     boolean not null default false,       -- admin-set trust flag
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists suppliers_status_idx on public.suppliers (status);
create index if not exists suppliers_island_idx on public.suppliers (island);

alter table public.suppliers enable row level security;

drop policy if exists "suppliers public read" on public.suppliers;
create policy "suppliers public read" on public.suppliers
  for select using (status = 'published' or user_id = auth.uid() or public.is_admin());

drop policy if exists "suppliers owner insert" on public.suppliers;
create policy "suppliers owner insert" on public.suppliers
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "suppliers owner update" on public.suppliers;
create policy "suppliers owner update" on public.suppliers
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "suppliers owner delete" on public.suppliers;
create policy "suppliers owner delete" on public.suppliers
  for delete to authenticated using (user_id = auth.uid());

drop policy if exists "suppliers admin update" on public.suppliers;
create policy "suppliers admin update" on public.suppliers
  for update to authenticated using (public.is_admin());

drop policy if exists "suppliers admin delete" on public.suppliers;
create policy "suppliers admin delete" on public.suppliers
  for delete to authenticated using (public.is_admin());

-- Only admins may set `verified`; keep updated_at fresh.
create or replace function public.guard_supplier()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.verified := false;
  else
    new.verified := old.verified;
  end if;
  return new;
end $$;

drop trigger if exists guard_supplier on public.suppliers;
create trigger guard_supplier
  before insert or update on public.suppliers
  for each row execute function public.guard_supplier();


