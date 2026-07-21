-- Djarvista — messaging between parties of a rental request (run in Supabase SQL editor)

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.rental_requests (id) on delete cascade,
  sender_id   uuid not null references auth.users (id) on delete cascade,
  body        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists messages_request_idx on public.messages (request_id, created_at);

alter table public.messages enable row level security;

-- Only the two parties of the underlying rental request can read/write the thread.
drop policy if exists "msg participant read" on public.messages;
create policy "msg participant read" on public.messages
  for select to authenticated using (
    exists (select 1 from public.rental_requests r
            where r.id = request_id and (r.tenant_id = auth.uid() or r.landlord_id = auth.uid()))
  );

drop policy if exists "msg participant insert" on public.messages;
create policy "msg participant insert" on public.messages
  for insert to authenticated with check (
    sender_id = auth.uid() and
    exists (select 1 from public.rental_requests r
            where r.id = request_id and (r.tenant_id = auth.uid() or r.landlord_id = auth.uid()))
  );
