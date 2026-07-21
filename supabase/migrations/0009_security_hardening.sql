-- 0009 — security hardening (privilege escalation + data-integrity guards).
-- Fixes issues found in QA review. Idempotent: safe to re-run.
-- All guards use BEFORE triggers that (a) allow the service-role / SQL-editor
-- context (no JWT → auth.uid() is null) and (b) allow admins, so the documented
-- `update profiles set role='admin'` grant still works from the SQL editor.

-- ---------------------------------------------------------------------------
-- (1) profiles — block self-service escalation of role / verification_level.
--     The "users update own profile" policy (0001) has no WITH CHECK, so
--     without this a user could `update profiles set role='admin'` on their own
--     row and gain full admin (incl. reading everyone's verification documents).
-- ---------------------------------------------------------------------------
create or replace function public.guard_profile_privileged()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  new.role := old.role;
  new.verification_level := old.verification_level;
  return new;
end $$;

drop trigger if exists guard_profile_privileged on public.profiles;
create trigger guard_profile_privileged
  before update on public.profiles
  for each row execute function public.guard_profile_privileged();

-- ---------------------------------------------------------------------------
-- (2) reviews — only trust/ops (admin) may set `verified`. Guard insert & update
--     so authors cannot self-award the "verified" trust badge.
-- ---------------------------------------------------------------------------
create or replace function public.guard_review_verified()
returns trigger language plpgsql security definer set search_path = public as $$
begin
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

drop trigger if exists guard_review_verified on public.reviews;
create trigger guard_review_verified
  before insert or update on public.reviews
  for each row execute function public.guard_review_verified();

-- ---------------------------------------------------------------------------
-- (3) rental_requests — integrity guards.
--     (a) On insert, force landlord_id to the listing's real owner so a tenant
--         cannot inject a request into an arbitrary victim's inbox/calendar.
--     (b) On update, keep identity columns immutable and restrict status
--         transitions: only the landlord may accept/decline; the tenant may
--         only withdraw.
-- ---------------------------------------------------------------------------
create or replace function public.rr_set_landlord()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- Derive landlord_id from the listing so a tenant can't target a victim.
  -- With no listing_id there is no owner to point to; force null rather than
  -- trusting the client-supplied value.
  if new.listing_id is not null then
    new.landlord_id := (select owner from public.listings where id = new.listing_id);
  else
    new.landlord_id := null;
  end if;
  return new;
end $$;

drop trigger if exists rr_set_landlord on public.rental_requests;
create trigger rr_set_landlord
  before insert on public.rental_requests
  for each row execute function public.rr_set_landlord();

create or replace function public.rr_guard_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  new.listing_id  := old.listing_id;
  new.tenant_id   := old.tenant_id;
  new.landlord_id := old.landlord_id;
  if new.status is distinct from old.status then
    if auth.uid() = old.landlord_id then
      null; -- landlord may change status (accept/decline/pending)
    elsif auth.uid() = old.tenant_id then
      if new.status <> 'withdrawn' then
        new.status := old.status; -- tenant may only withdraw
      end if;
    else
      new.status := old.status;
    end if;
  end if;
  return new;
end $$;

drop trigger if exists rr_guard_update on public.rental_requests;
create trigger rr_guard_update
  before update on public.rental_requests
  for each row execute function public.rr_guard_update();
