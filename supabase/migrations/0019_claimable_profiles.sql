-- 0019 — claimable ("telefoonboek") directory profiles.
-- Seeded entries come from public sources (directories, business pages) and have
-- no owner yet (user_id null). The real owner can file a claim request; an admin
-- reviews it (human control, like verifications/boosts) and approval assigns the
-- profile to that user. Provenance (source + date) is stored per seeded row and
-- shown in the UI. Idempotent. Run after 0018.

-- 1) Allow ownerless (seeded) profiles + provenance columns -------------------
alter table public.professionals alter column user_id drop not null;
alter table public.professionals
  add column if not exists source_name text,
  add column if not exists source_url  text,
  add column if not exists sourced_at  date,
  add column if not exists claimed_at  timestamptz;

alter table public.suppliers alter column user_id drop not null;
alter table public.suppliers
  add column if not exists source_name text,
  add column if not exists source_url  text,
  add column if not exists sourced_at  date,
  add column if not exists claimed_at  timestamptz;

-- Admins may insert seeded rows from the console (seed SQL itself runs as the
-- service role and bypasses RLS; this keeps the in-app path open too).
drop policy if exists "professionals admin insert" on public.professionals;
create policy "professionals admin insert" on public.professionals
  for insert to authenticated with check (public.is_admin());

drop policy if exists "suppliers admin insert" on public.suppliers;
create policy "suppliers admin insert" on public.suppliers
  for insert to authenticated with check (public.is_admin());

-- 2) Claim requests (request → human review → grant) --------------------------
create table if not exists public.claim_requests (
  id            uuid primary key default gen_random_uuid(),
  profile_type  text not null check (profile_type in ('professional', 'supplier')),
  profile_id    uuid not null,
  requester     uuid not null references public.profiles (id) on delete cascade,
  message       text,          -- who they are / proof they own the business
  contact_phone text,          -- number our team can call to verify
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at    timestamptz not null default now()
);

create index if not exists claim_requests_status_idx on public.claim_requests (status);

-- One open claim per user per profile.
create unique index if not exists claim_requests_pending_unique
  on public.claim_requests (profile_type, profile_id, requester)
  where status = 'pending';

alter table public.claim_requests enable row level security;

-- The target must exist and be unclaimed (user_id is null).
create or replace function public.claim_target_is_open(p_type text, p_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select case p_type
    when 'professional' then exists (select 1 from public.professionals where id = p_id and user_id is null)
    when 'supplier'     then exists (select 1 from public.suppliers     where id = p_id and user_id is null)
    else false
  end
$$;

drop policy if exists "claims requester insert" on public.claim_requests;
create policy "claims requester insert" on public.claim_requests
  for insert to authenticated with check (
    requester = auth.uid()
    and public.claim_target_is_open(profile_type, profile_id)
  );

drop policy if exists "claims read own or admin" on public.claim_requests;
create policy "claims read own or admin" on public.claim_requests
  for select to authenticated using (requester = auth.uid() or public.is_admin());

drop policy if exists "claims admin update" on public.claim_requests;
create policy "claims admin update" on public.claim_requests
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- 3) Atomic approval ----------------------------------------------------------
-- Assigns the profile to the requester, stamps claimed_at, backfills stored
-- leads (sent while the profile was unclaimed) and marks the request approved.
create or replace function public.approve_claim(req_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  req  public.claim_requests%rowtype;
  slug text;
begin
  if not public.is_admin() then
    raise exception 'only admins may approve claims';
  end if;

  select * into req from public.claim_requests where id = req_id for update;
  if not found then raise exception 'claim request not found'; end if;
  if req.status <> 'pending' then raise exception 'claim request already resolved'; end if;

  if req.profile_type = 'professional' then
    if exists (select 1 from public.professionals p where p.user_id = req.requester) then
      raise exception 'requester already owns a professional profile';
    end if;
    update public.professionals
      set user_id = req.requester, claimed_at = now()
      where id = req.profile_id and user_id is null
      returning professionals.slug into slug;
    if not found then raise exception 'profile already claimed or missing'; end if;
    -- Leads sent while unclaimed were stored with the slug but no recipient.
    update public.leads set recipient = req.requester
      where pro_slug = slug and recipient is null;
  else
    if exists (select 1 from public.suppliers s where s.user_id = req.requester) then
      raise exception 'requester already owns a supplier profile';
    end if;
    update public.suppliers
      set user_id = req.requester, claimed_at = now()
      where id = req.profile_id and user_id is null;
    if not found then raise exception 'profile already claimed or missing'; end if;
  end if;

  update public.claim_requests set status = 'approved' where id = req_id;
end $$;

revoke all on function public.approve_claim(uuid) from public;
grant execute on function public.approve_claim(uuid) to authenticated;
