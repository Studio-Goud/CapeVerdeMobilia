-- 0018 — protect listings.is_featured + dedup boost requests (QA fixes).
-- (a) Only admins (or the service-role / SQL editor) may set is_featured, so an
--     owner cannot self-feature and bypass the boost approval/payment loop.
-- (b) At most one PENDING boost request per listing.
-- Idempotent. Run after 0017.

create or replace function public.guard_listing_featured()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.is_featured := false;
  else
    new.is_featured := old.is_featured;
  end if;
  return new;
end $$;

drop trigger if exists guard_listing_featured on public.listings;
create trigger guard_listing_featured
  before insert or update on public.listings
  for each row execute function public.guard_listing_featured();

create unique index if not exists boost_one_pending_per_listing
  on public.boost_requests (listing_id) where status = 'pending';
