-- 0025 — add 3 AS – Importação, Venda a Grosso e a Retalho, Lda (São Vicente).
-- Electrical-materials importer / wholesaler-retailer (lighting, renewable energy,
-- electronics, AC systems). Locally confirmed from its official invoice (NIF
-- 275341100) and website www.3as.cv. Seeded (unclaimed) + operator-verified,
-- published, claimable by the owner. Idempotent (refreshes only while unclaimed).
-- Note: in the SQL editor auth.uid() is null, so guard_supplier() leaves
-- `verified` as given. Run after 0020.

insert into public.suppliers
  (user_id, slug, name, category, island, description, phone, verified, status,
   source_name, source_url, sourced_at)
values
  (null, '3as', '3 AS – Importação, Venda a Grosso e a Retalho, Lda',
   '{"pt":"Material elétrico e climatização","en":"Electrical & AC materials","nl":"Elektrisch materiaal & airco"}'::jsonb,
   'São Vicente',
   '{"pt":"Importador e grossista/retalhista de material elétrico, iluminação, energias renováveis, eletrónica e produtos técnicos — incluindo sistemas de ar condicionado. Alto Mira-Mar, Mindelo. Sócio da Câmara de Comércio.","en":"Importer and wholesaler/retailer of electrical materials, lighting, renewable energy, electronics and technical products — including air-conditioning systems. Alto Mira-Mar, Mindelo. Chamber of Commerce member.","nl":"Importeur en groothandel/detailhandel in elektrisch materiaal, verlichting, hernieuwbare energie, elektronica en technische producten — inclusief airconditioningsystemen. Alto Mira-Mar, Mindelo. Lid van de Kamer van Koophandel."}'::jsonb,
   '+238 231 33 20', true, 'published',
   'Website oficial (3as.cv) + fatura (NIF 275341100)', 'https://www.3as.cv', '2026-07-22'::date)
on conflict (slug) do update set
  name        = excluded.name,
  category    = excluded.category,
  island      = excluded.island,
  description = excluded.description,
  phone       = excluded.phone,
  verified    = excluded.verified,
  status      = excluded.status,
  source_name = excluded.source_name,
  source_url  = excluded.source_url,
  sourced_at  = excluded.sourced_at
where suppliers.user_id is null and suppliers.claimed_at is null;
