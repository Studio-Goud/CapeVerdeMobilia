-- 0021 — add Bomclima, Lda (air conditioning / refrigeration, São Vicente).
-- Follow-up to the 0020 phone-book seed: a real, locally-confirmed AC & cooling
-- business, sourced from its own Facebook page. Seeded (unclaimed), published,
-- claimable by the owner. Idempotent; refreshes only while still unclaimed.
-- Run after 0020.

insert into public.professionals
  (user_id, slug, display_name, headline, bio, category, service_areas, status, phone, source_name, source_url, sourced_at)
values
  (null, 'bomclima', 'Bomclima, Lda',
   '{"pt":"Climatização e refrigeração em Mindelo","en":"Air conditioning and refrigeration in Mindelo","nl":"Airco en koeltechniek in Mindelo"}'::jsonb,
   '{"pt":"Sistema de climatização e refrigeração: instalação e manutenção de ar condicionado e frio. Fonte Inês, Mindelo, São Vicente. E-mail: bomclima84@hotmail.com.","en":"Air-conditioning and refrigeration systems: installation and maintenance of AC and cooling. Fonte Inês, Mindelo, São Vicente. Email: bomclima84@hotmail.com.","nl":"Airco- en koelsystemen: installatie en onderhoud van airconditioning en koeltechniek. Fonte Inês, Mindelo, São Vicente. E-mail: bomclima84@hotmail.com."}'::jsonb,
   'Climatização', '{"São Vicente"}', 'published', '+238 987 27 43',
   'Página de Facebook oficial (bomclima84)', 'https://www.facebook.com/bomclima84', '2026-07-22'::date)
on conflict (slug) do update set
  display_name = excluded.display_name, headline = excluded.headline, bio = excluded.bio,
  category = excluded.category, phone = excluded.phone, service_areas = excluded.service_areas,
  status = excluded.status, source_name = excluded.source_name, source_url = excluded.source_url,
  sourced_at = excluded.sourced_at
where professionals.user_id is null and professionals.claimed_at is null;
