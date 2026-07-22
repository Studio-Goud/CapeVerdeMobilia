-- 0023 — Bomclima: mark the seeded professional as operator-verified ("Verificado
-- pela Djarvista") and publish a service advertisement (kind SERVICE) for it.
--
-- Bomclima has no account yet, so:
--  * professionals gains `verified_level` — an operator trust level for vouched
--    businesses. The profile shows a verification badge but stays claimable.
--  * listings gains a nullable owner + provenance columns (mirrors 0019) so the
--    operator can post a claimable advert. Photos are site-hosted assets under
--    /public/listings/bomclima (shipped with the app).
-- Idempotent. Run after 0021 (any order vs other seeds).

begin;

-- 1) Operator verification for seeded professionals ---------------------------
alter table public.professionals add column if not exists verified_level text;

update public.professionals
   set verified_level = 'L2_BUSINESS'
 where slug = 'bomclima' and user_id is null and claimed_at is null;

-- 2) Allow operator-posted (seeded) adverts with provenance -------------------
alter table public.listings alter column owner drop not null;
alter table public.listings add column if not exists source_name text;
alter table public.listings add column if not exists source_url  text;
alter table public.listings add column if not exists sourced_at   date;

-- 3) Bomclima service advertisement ------------------------------------------
insert into public.listings
  (owner, slug, kind, title, description, price_on_request,
   island, municipality, thumbnail, photos, status, published_at,
   source_name, source_url, sourced_at)
values
  (null, 'bomclima-ar-condicionado-sao-vicente', 'SERVICE',
   '{"pt":"Bomclima — Ar condicionado e refrigeração em Mindelo","en":"Bomclima — Air conditioning and refrigeration in Mindelo","nl":"Bomclima — Airco en koeltechniek in Mindelo"}'::jsonb,
   '{"pt":"Instalação, manutenção e reparação de ar condicionado e sistemas de refrigeração em Mindelo, São Vicente. Split, inverter e frio comercial. Atendimento local — Fonte Inês, Mindelo. Peça orçamento pela Djarvista.","en":"Installation, maintenance and repair of air conditioning and refrigeration systems in Mindelo, São Vicente. Split, inverter and commercial cooling. Local service — Fonte Inês, Mindelo. Request a quote via Djarvista.","nl":"Installatie, onderhoud en reparatie van airconditioning en koelsystemen in Mindelo, São Vicente. Split, inverter en commerciële koeling. Lokale service — Fonte Inês, Mindelo. Vraag een offerte aan via Djarvista."}'::jsonb,
   true, 'São Vicente', 'Mindelo',
   'https://www.djarvista.com/listings/bomclima/van.jpg',
   array[
     'https://www.djarvista.com/listings/bomclima/van.jpg',
     'https://www.djarvista.com/listings/bomclima/split-lg.jpg',
     'https://www.djarvista.com/listings/bomclima/split-westpoint.jpg',
     'https://www.djarvista.com/listings/bomclima/condenser-mindelo.jpg'
   ]::text[],
   'published', now(),
   'Página de Facebook oficial (bomclima84)', 'https://www.facebook.com/bomclima84', '2026-07-22'::date)
on conflict (slug) do update set
  title            = excluded.title,
  description      = excluded.description,
  thumbnail        = excluded.thumbnail,
  photos           = excluded.photos,
  island           = excluded.island,
  municipality     = excluded.municipality,
  price_on_request = excluded.price_on_request,
  status           = excluded.status,
  source_name      = excluded.source_name,
  source_url       = excluded.source_url,
  sourced_at       = excluded.sourced_at
where listings.owner is null;

commit;
