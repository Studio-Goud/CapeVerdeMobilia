-- Djarvista — storage buckets + identity verification (run in Supabase SQL editor)

-- ---------------------------------------------------------------------------
-- Buckets
--   listing-photos    : PUBLIC read (property photos)
--   verification-docs : PRIVATE (ID / passport / selfie) — sensitive
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('verification-docs', 'verification-docs', false)
on conflict (id) do nothing;

-- listing-photos: anyone can read; owners write into their own <uid>/ folder
drop policy if exists "listing photos public read" on storage.objects;
create policy "listing photos public read" on storage.objects
  for select using (bucket_id = 'listing-photos');

drop policy if exists "listing photos owner write" on storage.objects;
create policy "listing photos owner write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "listing photos owner modify" on storage.objects;
create policy "listing photos owner modify" on storage.objects
  for update to authenticated
  using (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "listing photos owner delete" on storage.objects;
create policy "listing photos owner delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- verification-docs: ONLY the owner may read/write their own <uid>/ folder.
-- (Trust/ops review these via the dashboard using the service role.)
drop policy if exists "verif docs owner read" on storage.objects;
create policy "verif docs owner read" on storage.objects
  for select to authenticated
  using (bucket_id = 'verification-docs' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "verif docs owner write" on storage.objects;
create policy "verif docs owner write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'verification-docs' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "verif docs owner delete" on storage.objects;
create policy "verif docs owner delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'verification-docs' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------------
-- Verification requests (human-reviewed; never approved by AI alone)
-- ---------------------------------------------------------------------------
create table if not exists public.verification_requests (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  level_requested  text not null default 'L1_IDENTITY',
  doc_type         text,
  doc_path         text,
  selfie_path      text,
  status           text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  note             text,
  created_at       timestamptz not null default now()
);

create index if not exists vr_user_idx on public.verification_requests (user_id);

alter table public.verification_requests enable row level security;

drop policy if exists "vr insert own" on public.verification_requests;
create policy "vr insert own" on public.verification_requests
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "vr read own" on public.verification_requests;
create policy "vr read own" on public.verification_requests
  for select to authenticated using (user_id = auth.uid());

-- Review workflow (approve → raise the profile's verification level) is done by
-- trust/ops in the dashboard, e.g.:
--   update public.profiles set verification_level = 'L1_IDENTITY' where id = '<user>';
--   update public.verification_requests set status = 'approved' where id = '<req>';
