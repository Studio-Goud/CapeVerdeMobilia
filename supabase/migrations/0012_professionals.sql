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
