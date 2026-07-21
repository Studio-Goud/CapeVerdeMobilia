-- Djarvista — add a photo gallery to listings (run in Supabase SQL editor)
alter table public.listings
  add column if not exists photos text[] not null default '{}';
