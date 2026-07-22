-- 0028 — replace the em dash (—) with a normal hyphen (-) in stored content, so
-- the live site matches the code (em dashes removed as an "AI tell"). Touches only
-- rows that contain "—"; safe to re-run. Run after 0027.

begin;

-- Official-information articles (publications).
update public.publications set
  title   = replace(title::text,   '—', '-')::jsonb,
  summary = replace(summary::text, '—', '-')::jsonb,
  body    = replace(body::text,    '—', '-')::jsonb
where title::text like '%—%' or summary::text like '%—%' or body::text like '%—%';
update public.publications set gov_entity = replace(gov_entity, '—', '-') where gov_entity like '%—%';

-- Professionals directory.
update public.professionals set
  headline = replace(headline::text, '—', '-')::jsonb,
  bio      = replace(bio::text,      '—', '-')::jsonb
where headline::text like '%—%' or bio::text like '%—%';
update public.professionals set source_name = replace(source_name, '—', '-') where source_name like '%—%';

-- Suppliers directory.
update public.suppliers set
  category    = replace(category::text,    '—', '-')::jsonb,
  description = replace(description::text, '—', '-')::jsonb
where category::text like '%—%' or description::text like '%—%';
update public.suppliers set source_name = replace(source_name, '—', '-') where source_name like '%—%';

-- Listings (property + service adverts).
update public.listings set
  title       = replace(title::text,       '—', '-')::jsonb,
  description = replace(description::text, '—', '-')::jsonb
where title::text like '%—%' or description::text like '%—%';
update public.listings set source_name = replace(source_name, '—', '-') where source_name like '%—%';

commit;
