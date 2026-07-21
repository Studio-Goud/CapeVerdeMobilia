-- 0015 — real construction-project portfolio (projetos). Replaces demo PROJECTS.
-- An owner (contractor/developer) showcases projects with progress + milestones.
-- Idempotent. Run after 0014.

create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  owner        uuid not null references public.profiles (id) on delete cascade,
  slug         text unique not null,
  name         jsonb not null default '{}'::jsonb,    -- { pt, en, nl }
  description  jsonb,                                  -- { pt, en, nl } | null
  island       text,
  status       text not null default 'PLANNING' check (status in ('PLANNING', 'IN_PROGRESS', 'REVIEW', 'DONE')),
  progress     int not null default 0 check (progress between 0 and 100),
  budget_cve   bigint,
  contractor   text,
  cover        text,                                   -- image url
  milestones   jsonb not null default '[]'::jsonb,     -- [{ label: {pt,en,nl}, done: bool }]
  visibility   text not null default 'draft' check (visibility in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists projects_visibility_idx on public.projects (visibility);
create index if not exists projects_island_idx on public.projects (island);

alter table public.projects enable row level security;

drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects
  for select using (visibility = 'published' or owner = auth.uid() or public.is_admin());

drop policy if exists "projects owner insert" on public.projects;
create policy "projects owner insert" on public.projects
  for insert to authenticated with check (owner = auth.uid());

drop policy if exists "projects owner update" on public.projects;
create policy "projects owner update" on public.projects
  for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists "projects owner delete" on public.projects;
create policy "projects owner delete" on public.projects
  for delete to authenticated using (owner = auth.uid());

drop policy if exists "projects admin all" on public.projects;
create policy "projects admin all" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_projects_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists projects_touch_updated on public.projects;
create trigger projects_touch_updated
  before update on public.projects
  for each row execute function public.touch_projects_updated_at();
