-- 0026 — homepage "Negócios em destaque" (paid placement) + supplier images.
--  * suppliers.thumbnail (card image) and suppliers.is_featured (paid feature),
--    with is_featured guarded like `verified` (owners can't self-feature).
--  * Feature Bomclima's service advert (listings.is_featured, guarded by 0018)
--    and 3 AS (supplier), and set 3 AS's card image (site-hosted, from 3as.cv).
-- The featured items with an image show on the homepage. Idempotent. Run after 0025.

begin;

alter table public.suppliers add column if not exists thumbnail   text;
alter table public.suppliers add column if not exists is_featured boolean not null default false;

-- Extend the supplier guard so is_featured is admin/operator-only, like `verified`.
create or replace function public.guard_supplier()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.verified := false;
    new.is_featured := false;
  else
    new.verified := old.verified;
    new.is_featured := old.is_featured;
  end if;
  return new;
end $$;

drop trigger if exists guard_supplier on public.suppliers;
create trigger guard_supplier
  before insert or update on public.suppliers
  for each row execute function public.guard_supplier();

-- Feature 3 AS + give it a card image (official storefront photo, site-hosted).
update public.suppliers
   set thumbnail   = 'https://www.djarvista.com/suppliers/3as/loja.jpg',
       is_featured = true
 where slug = '3as' and user_id is null;

-- Feature Bomclima's service advert on the homepage.
update public.listings
   set is_featured = true
 where slug = 'bomclima-ar-condicionado-sao-vicente' and owner is null;

commit;
