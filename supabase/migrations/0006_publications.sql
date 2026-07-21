-- Djarvista — official information centre (publications) + editorial workflow
-- Run in Supabase SQL editor.

create table if not exists public.publications (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  category         text,
  title            jsonb not null,
  gov_entity       text,
  official_status  text not null default 'summary'
                     check (official_status in ('official', 'summary', 'unconfirmed', 'outdated', 'in_revision')),
  version          int not null default 1,
  source_url       text,
  summary          jsonb,
  body             jsonb,
  status           text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id        uuid references auth.users (id) on delete set null,
  published_at     timestamptz,
  updated_at       timestamptz not null default now(),
  created_at       timestamptz not null default now()
);

create index if not exists pub_status_idx on public.publications (status);
create index if not exists pub_category_idx on public.publications (category);

alter table public.publications enable row level security;

drop policy if exists "publications public read" on public.publications;
create policy "publications public read" on public.publications
  for select using (status = 'published' or public.is_admin());

drop policy if exists "publications admin write" on public.publications;
create policy "publications admin write" on public.publications
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Users flag a publication as outdated / needing review
create table if not exists public.publication_flags (
  id              uuid primary key default gen_random_uuid(),
  publication_id  uuid references public.publications (id) on delete cascade,
  reporter_id     uuid references auth.users (id) on delete set null,
  note            text,
  created_at      timestamptz not null default now()
);

alter table public.publication_flags enable row level security;

drop policy if exists "flags anyone insert" on public.publication_flags;
create policy "flags anyone insert" on public.publication_flags
  for insert to anon, authenticated with check (true);

drop policy if exists "flags admin read" on public.publication_flags;
create policy "flags admin read" on public.publication_flags
  for select to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed: a few clearly-labelled platform summaries (NOT official; validate legally)
-- ---------------------------------------------------------------------------
insert into public.publications (slug, category, title, gov_entity, official_status, version, source_url, summary, body, status, published_at)
values
(
  'inquilino-recusa-sair', 'arrendamento',
  '{"pt":"Inquilino que se recusa a sair: o que pode fazer o senhorio","en":"Tenant who refuses to leave: what a landlord can do","nl":"Huurder die weigert te vertrekken: wat kan de verhuurder doen"}'::jsonb,
  'Resumo da plataforma — validacao juridica necessaria', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"Resumo indicativo. O senhorio nao pode despejar pela forca nem por meios proprios. A saida do inquilino resolve-se por via judicial, junto do tribunal competente. Recomenda-se apoio de advogado. As regras aplicaveis sao publicadas no Boletim Oficial.","en":"Indicative summary. A landlord may not evict by force or self-help. Removing a tenant is resolved through the courts. Legal support is recommended. The applicable rules are published in the Official Gazette.","nl":"Indicatieve samenvatting. Een verhuurder mag niet met geweld of eigenmachtig ontruimen. Het vertrek van een huurder verloopt via de rechter. Juridische bijstand wordt aangeraden. De geldende regels staan in het Boletim Oficial."}'::jsonb,
  '{"pt":"Passos gerais (indicativos, nao juridicos): 1) Comunicar por escrito ao inquilino, com prazo razoavel. 2) Se nao houver acordo, procurar aconselhamento juridico. 3) Instaurar a acao adequada (ex.: acao de despejo) no tribunal competente. 4) Nunca trocar fechaduras nem retirar bens por conta propria. 5) Confirmar o procedimento, prazos e requisitos no Boletim Oficial e com um advogado. Este texto e um resumo da plataforma e nao constitui aconselhamento juridico.","en":"General, indicative (non-legal) steps: 1) Notify the tenant in writing, with reasonable notice. 2) If there is no agreement, seek legal advice. 3) Bring the appropriate action (e.g. an eviction claim) before the competent court. 4) Never change locks or remove belongings yourself. 5) Confirm the procedure, deadlines and requirements in the Official Gazette and with a lawyer. This is a platform summary, not legal advice.","nl":"Algemene, indicatieve (niet-juridische) stappen: 1) Informeer de huurder schriftelijk, met een redelijke termijn. 2) Als er geen akkoord is, win juridisch advies in. 3) Start de juiste procedure (bijv. een ontruimingsvordering) bij de bevoegde rechter. 4) Verander nooit zelf de sloten en verwijder geen spullen. 5) Bevestig de procedure, termijnen en vereisten in het Boletim Oficial en bij een advocaat. Dit is een platformsamenvatting, geen juridisch advies."}'::jsonb,
  'published', now()
),
(
  'reforma-fiscal-imobiliaria-2026', 'impostos',
  '{"pt":"Reforma fiscal imobiliaria 2026: cITI e cIPI","en":"2026 real-estate tax reform: cITI and cIPI","nl":"Vastgoedbelastinghervorming 2026: cITI en cIPI"}'::jsonb,
  'Resumo da plataforma — confirmar com as Financas', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"Resumo indicativo. Desde 1 de janeiro de 2026 o IUP foi substituido pelo cITI (transmissao) e pelo cIPI (propriedade). Confirmar taxas e regras com a Autoridade Tributaria e no Boletim Oficial.","en":"Indicative summary. Since 1 January 2026 the IUP has been replaced by cITI (transfer) and cIPI (ownership). Confirm rates and rules with the tax authority and in the Official Gazette.","nl":"Indicatieve samenvatting. Sinds 1 januari 2026 is de IUP vervangen door cITI (overdracht) en cIPI (eigendom). Bevestig tarieven en regels bij de Belastingdienst en in het Boletim Oficial."}'::jsonb,
  '{"pt":"Este resumo e informativo e nao substitui a informacao oficial. Consulte a Autoridade Tributaria e o Boletim Oficial para as taxas, isencoes e prazos em vigor.","en":"This summary is informational and does not replace official information. Consult the tax authority and the Official Gazette for the applicable rates, exemptions and deadlines.","nl":"Deze samenvatting is informatief en vervangt geen officiele informatie. Raadpleeg de Belastingdienst en het Boletim Oficial voor de geldende tarieven, vrijstellingen en termijnen."}'::jsonb,
  'published', now()
)
on conflict (slug) do nothing;
