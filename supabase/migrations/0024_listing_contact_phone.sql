-- 0024 — direct contact phone on listings (for seeded/service adverts with no
-- owner account). The listing detail page shows a "Peça orçamento" WhatsApp/call
-- button (attributed via Djarvista) when a phone is present; otherwise it keeps
-- the lead form to the owner. Sets Bomclima's advert phone. Idempotent.
-- Run after 0023.

alter table public.listings add column if not exists phone text;

update public.listings
   set phone = '+238 987 27 43'
 where slug = 'bomclima-ar-condicionado-sao-vicente' and owner is null;
