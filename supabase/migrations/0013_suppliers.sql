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
