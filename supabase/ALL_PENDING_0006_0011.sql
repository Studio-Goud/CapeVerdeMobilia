-- Djarvista — alle openstaande migraties (0006 t/m 0011), in volgorde.
-- Plak dit hele bestand in Supabase → SQL Editor en klik Run.
-- Idempotent: veilig om opnieuw te draaien. 0009 = beveiligingsfix.
-- Vereist dat 0001–0005 al gedraaid zijn (dat is het geval).

-- ===================================================================
-- 0006_publications.sql
-- ===================================================================
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


-- ===================================================================
-- 0007_admin_delete_listings.sql
-- ===================================================================
-- 0007 — allow admins to delete any listing (trust/ops moderation).
-- Owners can already delete their own listings (0001). This adds an admin
-- override so moderators can remove policy-violating or fraudulent listings.
-- Idempotent: safe to re-run.

drop policy if exists "listings admin delete" on public.listings;
create policy "listings admin delete" on public.listings
  for delete to authenticated using (public.is_admin());


-- ===================================================================
-- 0008_publications_seed.sql
-- ===================================================================
-- 0008 — refresh + expand official info-centre seeds.
-- Upserts richer, sourced summaries for the two 0006 items and adds two new
-- topics (tenancy basics, buying steps). Idempotent: on conflict updates in place.
-- All content is a PLATFORM SUMMARY, not official info — reliability is marked
-- inline and legal verification is required. Run after 0006.

insert into public.publications (slug, category, title, gov_entity, official_status, version, source_url, summary, body, status, published_at)
values
(
  'inquilino-recusa-sair', 'arrendamento',
  '{"pt":"Inquilino que se recusa a sair: o que pode fazer o senhorio","en":"Tenant who refuses to leave: what a landlord can do","nl":"Huurder die weigert te vertrekken: wat kan de verhuurder doen"}'::jsonb,
  'Resumo da plataforma — validacao juridica necessaria', 'summary', 2, 'https://boe.incv.cv/',
  '{"pt":"Resumo indicativo. O senhorio nao pode despejar pela forca nem por meios proprios: a saida resolve-se por via judicial (acao de despejo). O arrendamento urbano rege-se pela Lei n.o 101/VIII/2016 (Regime Geral do Arrendamento Urbano) e pelo Codigo Civil. Recomenda-se advogado.","en":"Indicative summary. A landlord may not evict by force or self-help: removal is resolved through the courts (eviction claim). Urban tenancy is governed by Law 101/VIII/2016 (General Urban Tenancy Regime) and the Civil Code. A lawyer is recommended.","nl":"Indicatieve samenvatting. Een verhuurder mag niet met geweld of eigenmachtig ontruimen: vertrek verloopt via de rechter (ontruimingsvordering). Stedelijke huur valt onder Wet 101/VIII/2016 en het Burgerlijk Wetboek. Een advocaat wordt aangeraden."}'::jsonb,
  '{"pt":"Passos gerais e indicativos (nao constituem aconselhamento juridico):\n\n1) Comunicar por escrito ao inquilino a cessacao do contrato, respeitando os prazos legais.\n2) Se o inquilino nao sair no prazo, procurar aconselhamento juridico.\n3) Instaurar a acao de despejo no tribunal competente, pedindo a entrega do imovel.\n4) NUNCA trocar fechaduras, cortar agua/luz ou retirar bens por conta propria — e ilegal.\n5) Confirmar procedimento, prazos e requisitos no Boletim Oficial e com um advogado.\n\nBase legal citada (FACTO, a confirmar): Lei n.o 101/VIII/2016, de 6 de janeiro; Codigo Civil. Verificacao juridica necessaria.","en":"General, indicative steps (not legal advice):\n\n1) Notify the tenant in writing of the termination, respecting statutory notice periods.\n2) If the tenant does not leave in time, seek legal advice.\n3) Bring an eviction claim before the competent court, requesting return of the property.\n4) NEVER change locks, cut water/power or remove belongings yourself — it is unlawful.\n5) Confirm procedure, deadlines and requirements in the Official Gazette and with a lawyer.\n\nCited legal basis (FACT, to be confirmed): Law 101/VIII/2016 of 6 January; Civil Code. Legal verification required.","nl":"Algemene, indicatieve stappen (geen juridisch advies):\n\n1) Informeer de huurder schriftelijk over de beeindiging, met inachtneming van de wettelijke termijnen.\n2) Vertrekt de huurder niet op tijd, win dan juridisch advies in.\n3) Start een ontruimingsvordering bij de bevoegde rechter en vorder teruggave van het pand.\n4) Verander NOOIT zelf de sloten, sluit geen water/stroom af en verwijder geen spullen — dat is onwettig.\n5) Bevestig procedure, termijnen en vereisten in het Boletim Oficial en bij een advocaat.\n\nAangehaalde rechtsgrond (FEIT, te bevestigen): Wet 101/VIII/2016 van 6 januari; Burgerlijk Wetboek. Juridische verificatie vereist."}'::jsonb,
  'published', now()
),
(
  'reforma-fiscal-imobiliaria-2026', 'impostos',
  '{"pt":"Reforma fiscal imobiliaria 2026: fim do IUP, entram o ITI e o IPI","en":"2026 real-estate tax reform: IUP ends, ITI and IPI begin","nl":"Vastgoedbelastinghervorming 2026: einde IUP, komst ITI en IPI"}'::jsonb,
  'Resumo da plataforma — confirmar com a Autoridade Tributaria', 'summary', 2, 'https://boe.incv.cv/',
  '{"pt":"Desde 1 de janeiro de 2026 o IUP foi substituido por dois impostos: o ITI (Imposto sobre a Transmissao de Imoveis) e o IPI (Imposto sobre a Propriedade de Imoveis). Confirmar taxas e isencoes com a Autoridade Tributaria.","en":"Since 1 January 2026 the IUP has been replaced by two taxes: ITI (property Transfer tax) and IPI (property Ownership tax). Confirm rates and exemptions with the tax authority.","nl":"Sinds 1 januari 2026 is de IUP vervangen door twee belastingen: de ITI (overdrachtsbelasting) en de IPI (eigendomsbelasting). Bevestig tarieven en vrijstellingen bij de Belastingdienst."}'::jsonb,
  '{"pt":"O que mudou (FACTO, fontes abaixo):\n\n• ITI — Imposto sobre a Transmissao de Imoveis (codigo cITI), aprovado pela Lei n.o 54/X/2025, publicada em 6 de junho de 2025. Taxa geral indicada: 1%, subindo para 3% quando uma das partes beneficia de tratamento fiscal privilegiado.\n• IPI — Imposto sobre a Propriedade de Imoveis (codigo cIPI), aprovado pela Lei n.o 55/X/2025. Taxa geral indicada: 0,1%; terrenos 0,15%; taxas mais altas para predios devolutos, em ruina ou urbanizacao incompleta.\n• Entrada em vigor: 1 de janeiro de 2026.\n\nEstas taxas sao indicativas e podem ter isencoes ou atualizacoes. Confirme os valores em vigor com a Autoridade Tributaria e no Boletim Oficial. Resumo informativo — nao substitui informacao oficial.\n\nFontes: PwC (flash fiscal Cabo Verde, 2025); Boletim Oficial. Verificacao necessaria.","en":"What changed (FACT, sources below):\n\n• ITI — property Transfer tax (code cITI), approved by Law 54/X/2025, published 6 June 2025. Indicated standard rate: 1%, rising to 3% when a party benefits from privileged tax treatment.\n• IPI — property Ownership tax (code cIPI), approved by Law 55/X/2025. Indicated general rate: 0.1%; land 0.15%; higher rates for vacant, ruined or incomplete-development buildings.\n• Entry into force: 1 January 2026.\n\nThese rates are indicative and may carry exemptions or updates. Confirm the rates in force with the tax authority and in the Official Gazette. Informational summary — does not replace official information.\n\nSources: PwC (Cape Verde tax flash, 2025); Official Gazette. Verification required.","nl":"Wat er veranderde (FEIT, bronnen hieronder):\n\n• ITI — overdrachtsbelasting (code cITI), goedgekeurd bij Wet 54/X/2025, gepubliceerd op 6 juni 2025. Aangegeven algemeen tarief: 1%, oplopend tot 3% als een partij een fiscaal voordeel geniet.\n• IPI — eigendomsbelasting (code cIPI), goedgekeurd bij Wet 55/X/2025. Aangegeven algemeen tarief: 0,1%; grond 0,15%; hogere tarieven voor leegstaande, vervallen of onvoltooide gebouwen.\n• Inwerkingtreding: 1 januari 2026.\n\nDeze tarieven zijn indicatief en kunnen vrijstellingen of updates kennen. Bevestig de geldende tarieven bij de Belastingdienst en in het Boletim Oficial. Informatieve samenvatting — vervangt geen officiele informatie.\n\nBronnen: PwC (fiscale flash Kaapverdie, 2025); Boletim Oficial. Verificatie vereist."}'::jsonb,
  'published', now()
),
(
  'arrendamento-regras-basicas', 'arrendamento',
  '{"pt":"Arrendamento urbano: regras basicas do contrato","en":"Urban tenancy: basic contract rules","nl":"Stedelijke huur: basisregels van het contract"}'::jsonb,
  'Resumo da plataforma — validacao juridica necessaria', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"O arrendamento urbano rege-se pela Lei n.o 101/VIII/2016 (RGAU). Pontos indicados: contrato por escrito em tres vias, duracao supletiva de 6 meses e contratos de duracao limitada nao inferiores a 3 anos na habitacao. Confirmar antes de assinar.","en":"Urban tenancy is governed by Law 101/VIII/2016 (RGAU). Indicated points: written contract in three copies, a default term of 6 months, and limited-term residential contracts of not less than 3 years. Confirm before signing.","nl":"Stedelijke huur valt onder Wet 101/VIII/2016 (RGAU). Aangegeven punten: schriftelijk contract in drie exemplaren, standaardduur van 6 maanden en huurcontracten van bepaalde duur van minimaal 3 jaar voor bewoning. Bevestig voor ondertekening."}'::jsonb,
  '{"pt":"Pontos indicativos do Regime Geral do Arrendamento Urbano (FACTO, a confirmar no Boletim Oficial):\n\n• O contrato deve ser celebrado por escrito e, segundo as fontes, elaborado em tres vias.\n• Na falta de prazo estipulado, aplica-se uma duracao supletiva de 6 meses.\n• E permitida a antecipacao de rendas.\n• Nos arrendamentos habitacionais sao possiveis contratos de duracao limitada nao inferior a 3 anos.\n• A cessacao pode ocorrer por acordo, resolucao, caducidade ou denuncia, nos termos da lei.\n\nO contrato pro-forma gerado pela Djarvista e apenas uma ferramenta de apoio (self-service). A Djarvista nao e parte, advogado nem controlador juridico do contrato. Confirme sempre com um advogado e no Boletim Oficial.\n\nFonte citada: Lei n.o 101/VIII/2016, de 6 de janeiro. Verificacao juridica necessaria.","en":"Indicative points of the General Urban Tenancy Regime (FACT, to confirm in the Official Gazette):\n\n• The contract must be made in writing and, per the sources, drawn up in three copies.\n• Absent a stipulated term, a default duration of 6 months applies.\n• Advance payment of rent is permitted.\n• For residential lets, limited-term contracts of not less than 3 years are possible.\n• Termination may occur by agreement, resolution, lapse or notice, under the law.\n\nThe pro-forma contract generated by Djarvista is only a self-service support tool. Djarvista is not a party, lawyer or legal controller of the contract. Always confirm with a lawyer and in the Official Gazette.\n\nCited source: Law 101/VIII/2016 of 6 January. Legal verification required.","nl":"Indicatieve punten van het Algemeen Regime Stedelijke Huur (FEIT, te bevestigen in het Boletim Oficial):\n\n• Het contract moet schriftelijk zijn en, volgens de bronnen, in drie exemplaren worden opgesteld.\n• Zonder afgesproken termijn geldt een standaardduur van 6 maanden.\n• Vooruitbetaling van huur is toegestaan.\n• Voor bewoning zijn contracten van bepaalde duur van minimaal 3 jaar mogelijk.\n• Beeindiging kan via overeenkomst, ontbinding, verval of opzegging, volgens de wet.\n\nHet pro-forma contract van Djarvista is slechts een self-service hulpmiddel. Djarvista is geen partij, advocaat of juridisch controleur van het contract. Bevestig altijd bij een advocaat en in het Boletim Oficial.\n\nAangehaalde bron: Wet 101/VIII/2016 van 6 januari. Juridische verificatie vereist."}'::jsonb,
  'published', now()
),
(
  'comprar-imovel-passos', 'compra',
  '{"pt":"Comprar um imovel em Cabo Verde: passos principais","en":"Buying a property in Cape Verde: the main steps","nl":"Een woning kopen in Kaapverdie: de belangrijkste stappen"}'::jsonb,
  'Resumo da plataforma — fontes comerciais, nao oficiais', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"Passos habituais: obter NIF, verificar a certidao de registo predial, assinar o contrato-promessa, celebrar a escritura publica perante notario e registar a propriedade. Ha custos de imposto de transmissao (ITI), notario e registo. Nao e aconselhamento juridico.","en":"Typical steps: obtain a tax number (NIF), check the land-registry certificate, sign the promissory contract, execute the public deed before a notary, and register the property. There are transfer-tax (ITI), notary and registration costs. Not legal advice.","nl":"Gebruikelijke stappen: verkrijg een fiscaal nummer (NIF), controleer het kadastrale uittreksel, teken het voorlopige koopcontract, verlijd de notariele akte en schrijf de eigendom in. Er zijn kosten voor overdrachtsbelasting (ITI), notaris en inschrijving. Geen juridisch advies."}'::jsonb,
  '{"pt":"Sequencia indicativa (ASSUNCAO com base em guias comerciais — confirmar):\n\n1) Obter o NIF (Numero de Identificacao Fiscal) nas Financas. Estrangeiros podem comprar imoveis em Cabo Verde.\n2) Pedir a Certidao de Registo Predial na Conservatoria para verificar a descricao do imovel e eventuais onus/hipotecas.\n3) Recomendavel: constituir procuracao a um advogado cabo-verdiano.\n4) Assinar o Contrato-Promessa de Compra e Venda (sinal habitual de 10–30%).\n5) Celebrar a Escritura Publica perante notario e pagar o remanescente.\n6) Registar a propriedade em seu nome no Registo Predial.\n\nCustos aproximados (INDICATIVO): transmissao — agora ITI, taxa geral indicada de 1% (3% em casos privilegiados); notario ~1–2%; registo ~2%. Guias antigos referem ~3% (regra IUP, anterior a 2026) — confirme os valores atuais.\n\nFontes: guias comerciais e eRegulations Cabo Verde. Nao oficial; verificacao necessaria.","en":"Indicative sequence (ASSUMPTION based on commercial guides — confirm):\n\n1) Obtain the NIF (tax number) at the tax office. Foreigners may buy property in Cape Verde.\n2) Request the Land-Registry Certificate to verify the description and any charges/mortgages.\n3) Recommended: grant power of attorney to a Cape Verdean lawyer.\n4) Sign the Promissory Purchase Contract (typical deposit 10–30%).\n5) Execute the Public Deed before a notary and pay the balance.\n6) Register the property in your name at the Land Registry.\n\nApproximate costs (INDICATIVE): transfer — now ITI, indicated standard rate 1% (3% in privileged cases); notary ~1–2%; registration ~2%. Older guides quote ~3% (the pre-2026 IUP rule) — confirm current figures.\n\nSources: commercial guides and eRegulations Cape Verde. Unofficial; verification required.","nl":"Indicatieve volgorde (AANNAME op basis van commerciele gidsen — bevestigen):\n\n1) Verkrijg het NIF (fiscaal nummer) bij het belastingkantoor. Buitenlanders mogen vastgoed kopen in Kaapverdie.\n2) Vraag het kadastrale uittreksel op om de omschrijving en eventuele lasten/hypotheken te controleren.\n3) Aanbevolen: geef een Kaapverdische advocaat volmacht.\n4) Teken het voorlopige koopcontract (gebruikelijke aanbetaling 10–30%).\n5) Verlijd de notariele akte en betaal het restant.\n6) Schrijf de eigendom op uw naam in bij het kadaster.\n\nGeschatte kosten (INDICATIEF): overdracht — nu ITI, aangegeven tarief 1% (3% in bevoorrechte gevallen); notaris ~1–2%; inschrijving ~2%. Oudere gidsen noemen ~3% (IUP-regel van voor 2026) — bevestig de actuele cijfers.\n\nBronnen: commerciele gidsen en eRegulations Kaapverdie. Niet officieel; verificatie vereist."}'::jsonb,
  'published', now()
)
on conflict (slug) do update set
  category = excluded.category,
  title = excluded.title,
  gov_entity = excluded.gov_entity,
  official_status = excluded.official_status,
  version = excluded.version,
  source_url = excluded.source_url,
  summary = excluded.summary,
  body = excluded.body,
  status = excluded.status,
  updated_at = now();


-- ===================================================================
-- 0009_security_hardening.sql
-- ===================================================================
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


-- ===================================================================
-- 0010_publications_construction.sql
-- ===================================================================
-- 0010 — add the building-permit info article (construction pillar).
-- Sourced from Cape Verde references (RNOTPU; Decreto-Lei 57/2015; national
-- planning policy). PLATFORM SUMMARY, not official — reliability marked inline,
-- verification required. Idempotent. Run after 0008.

insert into public.publications (slug, category, title, gov_entity, official_status, version, source_url, summary, body, status, published_at)
values
(
  'licenca-de-construcao', 'construcao',
  '{"pt":"Licenca de construcao: construir dentro da lei","en":"Building permit: building within the law","nl":"Bouwvergunning: bouwen binnen de wet"}'::jsonb,
  'Resumo da plataforma — confirmar na Camara Municipal', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"Para construir precisa de licenca de construcao da Camara Municipal. Construir sem licenca e construcao clandestina (Decreto-Lei n.o 57/2015). O uso do solo segue o PDM e o regime nacional de ordenamento (RNOTPU). Confirme sempre na sua Camara.","en":"To build you need a construction permit from the Municipal Council. Building without one is illegal (clandestine) construction (Decree-Law 57/2015). Land use follows the municipal master plan (PDM) and the national planning regime (RNOTPU). Always confirm with your council.","nl":"Om te bouwen heeft u een bouwvergunning van de gemeente nodig. Bouwen zonder vergunning is illegale bouw (Decreet-Wet 57/2015). Grondgebruik volgt het gemeentelijke bestemmingsplan (PDM) en het nationale ordeningsregime (RNOTPU). Bevestig altijd bij uw gemeente."}'::jsonb,
  '{"pt":"Pontos indicativos (FACTO onde ha referencia legal; passos concretos sao ASSUNCAO — confirmar na Camara Municipal):\n\n• A licenca de construcao e emitida pela Camara Municipal do concelho onde fica o terreno.\n• Construir sem licenca e construcao clandestina. O Decreto-Lei n.o 57/2015 estabelece o regime das Areas Urbanas de Genese Ilegal (AUGI).\n• O que pode construir depende do Plano Diretor Municipal (PDM) e do Regime Nacional do Ordenamento do Territorio e Planeamento Urbanistico (RNOTPU).\n• Passos habituais: pedido de informacao previa, projeto de arquitetura por tecnico habilitado, projetos de especialidades, apreciacao e emissao da licenca.\n• Zonas especiais: em faixas costeiras pode ser exigido parecer da Autoridade Maritima; no centro historico do Mindelo (Patrimonio Nacional desde 2012) aplicam-se regras de salvaguarda.\n\nResumo informativo da plataforma, nao e aconselhamento tecnico nem juridico. Confirme requisitos, taxas e prazos na Camara Municipal e no Boletim Oficial.\n\nFontes: Boletim Oficial (RNOTPU; Decreto-Lei n.o 57/2015); Politica Nacional de Ordenamento do Territorio e Urbanismo. Verificacao necessaria.","en":"Indicative points (FACT where a legal reference exists; concrete steps are ASSUMPTION — confirm with the council):\n\n• The building permit is issued by the Municipal Council of the district where the land sits.\n• Building without a permit is illegal (clandestine) construction. Decree-Law 57/2015 sets the regime for Areas of Illegal Urban Origin (AUGI).\n• What you may build depends on the Municipal Master Plan (PDM) and the National Regime for Territorial Planning and Urbanism (RNOTPU).\n• Typical steps: prior-information request, architecture project by a qualified professional, specialty projects, assessment and permit issuance.\n• Special zones: coastal strips may require an opinion from the Maritime Authority; in Mindelo historic centre (National Heritage since 2012) safeguarding rules apply.\n\nInformational platform summary, not technical or legal advice. Confirm requirements, fees and deadlines with the Municipal Council and in the Official Gazette.\n\nSources: Official Gazette (RNOTPU; Decree-Law 57/2015); National Territorial Planning and Urbanism Policy. Verification required.","nl":"Indicatieve punten (FEIT waar er een wettelijke verwijzing is; concrete stappen zijn AANNAME — bevestig bij de gemeente):\n\n• De bouwvergunning wordt afgegeven door de gemeente waar de grond ligt.\n• Bouwen zonder vergunning is illegale bouw. Decreet-Wet 57/2015 regelt het regime voor gebieden van illegale stedelijke oorsprong (AUGI).\n• Wat u mag bouwen hangt af van het gemeentelijk bestemmingsplan (PDM) en het nationale ordeningsregime (RNOTPU).\n• Gebruikelijke stappen: verzoek om voorinformatie, architectuurproject door een bevoegde professional, specialiteitenprojecten, beoordeling en afgifte van de vergunning.\n• Bijzondere zones: in kuststroken kan een advies van de Maritieme Autoriteit nodig zijn; in het historische centrum van Mindelo (Nationaal Erfgoed sinds 2012) gelden beschermingsregels.\n\nInformatieve platformsamenvatting, geen technisch of juridisch advies. Bevestig vereisten, kosten en termijnen bij de gemeente en in het Boletim Oficial.\n\nBronnen: Boletim Oficial (RNOTPU; Decreet-Wet 57/2015); Nationaal Beleid Ruimtelijke Ordening en Urbanisme. Verificatie vereist."}'::jsonb,
  'published', now()
)
on conflict (slug) do update set
  category = excluded.category, title = excluded.title, gov_entity = excluded.gov_entity,
  official_status = excluded.official_status, version = excluded.version, source_url = excluded.source_url,
  summary = excluded.summary, body = excluded.body, status = excluded.status, updated_at = now();


-- ===================================================================
-- 0011_publications_tenancy_rights.sql
-- ===================================================================
-- 0011 — add the rent/deposit/updates rights-and-duties info article.
-- Sourced from the RGAU (Lei 101/VIII/2016) + INE. PLATFORM SUMMARY, not
-- official; reliability marked inline, verification required. Run after 0008.

insert into public.publications (slug, category, title, gov_entity, official_status, version, source_url, summary, body, status, published_at)
values
(
  'direitos-deveres-arrendamento', 'arrendamento',
  '{"pt":"Renda, caucao e atualizacao: direitos e deveres","en":"Rent, deposit and updates: rights and duties","nl":"Huur, borg en indexering: rechten en plichten"}'::jsonb,
  'Resumo da plataforma — validacao juridica necessaria', 'summary', 1, 'https://boe.incv.cv/',
  '{"pt":"A renda fixa-se em escudos (CVE). A atualizacao segue a inflacao publicada pelo INE. A caucao acorda-se por escrito no contrato. Regras no RGAU (Lei n.o 101/VIII/2016). Confirme sempre com um advogado.","en":"Rent is set in escudos (CVE). Updates follow the inflation published by INE. The deposit is agreed in writing in the contract. Rules are in the RGAU (Law 101/VIII/2016). Always confirm with a lawyer.","nl":"Huur wordt vastgesteld in escudo''s (CVE). Indexering volgt de door INE gepubliceerde inflatie. De borg wordt schriftelijk in het contract afgesproken. Regels staan in de RGAU (Wet 101/VIII/2016). Bevestig altijd bij een advocaat."}'::jsonb,
  '{"pt":"Pontos indicativos (FACTO onde citado; a caucao e ASSUNCAO — confirmar):\n\n• A renda deve ser fixada em moeda nacional (escudos cabo-verdianos).\n• A atualizacao da renda pode seguir o acumulado das taxas de inflacao entre a fixacao (ou ultima atualizacao) e a nova data, consultaveis no site do INE (Instituto Nacional de Estatistica).\n• O contrato e por escrito, em tres vias — a terceira destina-se as autoridades fiscais.\n• E permitida a antecipacao de rendas.\n• Nos contratos de habitacao de duracao limitada, o prazo nao deve ser inferior a 3 anos.\n• A conservacao/obras a cargo do senhorio tem regras proprias no RGAU.\n• Caucao: nao confirmamos um limite legal especifico em Cabo Verde — o valor e a devolucao devem ficar claros e por escrito no contrato. (Verificacao necessaria.)\n\nBase legal citada (FACTO): Lei n.o 101/VIII/2016, de 6 de janeiro (RGAU), em vigor desde 5 de fevereiro de 2016, que revogou a antiga Lei do Inquilinato de 1961. Resumo informativo — nao e aconselhamento juridico.\n\nFontes: Boletim Oficial; Portal do Comercio (texto da Lei 101/VIII/2016); INE. Verificacao necessaria.","en":"Indicative points (FACT where cited; the deposit is ASSUMPTION — confirm):\n\n• Rent must be set in national currency (Cape Verdean escudos).\n• Rent updates may follow the cumulative inflation rates between the setting (or last update) and the new date, available on the INE (national statistics institute) website.\n• The contract is in writing, in three copies — the third goes to the tax authorities.\n• Advance payment of rent is permitted.\n• For limited-term residential contracts, the term should not be under 3 years.\n• Landlord conservation/works have specific rules in the RGAU.\n• Deposit: we did not confirm a specific statutory cap in Cape Verde — the amount and its return should be clear and in writing in the contract. (Verification required.)\n\nCited legal basis (FACT): Law 101/VIII/2016 of 6 January (RGAU), in force since 5 February 2016, which repealed the old 1961 tenancy law. Informational summary — not legal advice.\n\nSources: Official Gazette; Portal do Comercio (text of Law 101/VIII/2016); INE. Verification required.","nl":"Indicatieve punten (FEIT waar aangehaald; de borg is AANNAME — bevestigen):\n\n• Huur moet in nationale valuta (Kaapverdische escudo''s) worden vastgesteld.\n• Huurindexering kan de cumulatieve inflatie volgen tussen de vaststelling (of laatste indexering) en de nieuwe datum, te raadplegen op de website van INE.\n• Het contract is schriftelijk, in drie exemplaren — het derde gaat naar de belastingdienst.\n• Vooruitbetaling van huur is toegestaan.\n• Voor huurcontracten van bepaalde duur voor bewoning geldt een termijn van minimaal 3 jaar.\n• Onderhoud/werken voor rekening van de verhuurder kennen eigen regels in de RGAU.\n• Borg: we hebben geen specifiek wettelijk maximum in Kaapverdie bevestigd — het bedrag en de teruggave moeten duidelijk en schriftelijk in het contract staan. (Verificatie vereist.)\n\nAangehaalde rechtsgrond (FEIT): Wet 101/VIII/2016 van 6 januari (RGAU), van kracht sinds 5 februari 2016, die de oude huurwet van 1961 introk. Informatieve samenvatting — geen juridisch advies.\n\nBronnen: Boletim Oficial; Portal do Comercio (tekst van Wet 101/VIII/2016); INE. Verificatie vereist."}'::jsonb,
  'published', now()
)
on conflict (slug) do update set
  category = excluded.category, title = excluded.title, gov_entity = excluded.gov_entity,
  official_status = excluded.official_status, version = excluded.version, source_url = excluded.source_url,
  summary = excluded.summary, body = excluded.body, status = excluded.status, updated_at = now();


