# ILHAVISTA — PROJECT CANON (single source of truth)

Every doc/code artifact MUST be consistent with this. Distinguish FACT / ASSUMPTION / HYPOTHESIS / RECOMMENDATION. Never invent laws, rates, market sizes, partners or contacts. Mark unconfirmed items as "To validate", "Legal verification required", "Government confirmation required", or "Market validation required".

## Brand
- Name: **Ilhavista** (code namespace `ilhavista`, packages `@ilhavista/*`). Combines *ilha* (island) + *vista* (view) — “island view”. To validate: trademark, domain, social handles (never present as guaranteed).
- Positioning: **Independent digital infrastructure** connecting citizens, professionals, investors and public bodies for property, building and public information in Cabo Verde. Trust-first — not just a listings site.
- Five value layers: (1) Information (2) Trust (3) Findability (4) Transactions/jobs (5) Process guidance.
- Tagline EN: "The digital gateway to property, building and public information in Cabo Verde." PT: "A porta digital para terra, construção e serviços em Cabo Verde."
- Ambition: pilot on São Vicente → multi-island → national → export to comparable island states.

## Languages
pt (Portuguese, official base), kea (Kabuverdianu/Creole), en, nl, fr. Official source texts always preserved; translations linked to source. Distinguish professional vs machine translation vs official government text vs plain-language summary.

## Tech stack (MVP = modular monolith)
- Frontend: Next.js 14 App Router, React, TypeScript strict, Tailwind CSS, PWA, mobile-first, WCAG 2.1 AA.
- Backend: Next.js Route Handlers / server actions (modular monolith). Rationale: lean, single deploy, end-to-end TS, fastest path to pilot. Future extraction path: NestJS services when scale demands.
- DB: PostgreSQL + PostGIS (geo), Prisma ORM, Redis (cache/queues/rate-limit).
- Search: PostgreSQL full-text + PostGIS for MVP → Meilisearch when catalogue/relevance needs grow.
- Auth: email + phone (OTP) auth, optional social, MFA, RBAC, session mgmt, device monitoring.
- Storage: S3-compatible object storage, malware scan on upload, signed URLs.
- Monorepo: pnpm workspaces + Turborepo.
- Envs: development / test / staging / production. Backups, monitoring, logging, IR, DR.
- Keep MVP simple — no microservices unless proven necessary.

## Monorepo layout
/apps/web (public PWA), /apps/admin (ops/moderation console)
/packages: ui, database, auth, config, types, validation, i18n, analytics
/docs, /infrastructure, /scripts

## Business model (hybrid)
Currency CVE, pegged to EUR at **110.265 CVE = 1 EUR** (fixed peg — high confidence, still verify).
- Professional subscriptions: **Free** / **Pro ≈ 2.500 CVE/mo (~€23)** / **Business ≈ 7.500 CVE/mo (~€68)**.
- Property: free basic listing + **Premium listing ≈ 5.000 CVE (~€45)/30d** + Featured placement (always labelled "Patrocinado/Sponsored").
- Lead fees (optional), verification fees per level, project-management add-on.
- Government: (1) informal information partner (free/subsidised) → (2) official publication partner (SLA licence) → (3) public-private digital partnership (PPP).
- Facilitated-job take rate introduced later (target 5–10%), once escrow exists.
- Paid visibility NEVER buys verification, review scores, or manipulation of official info. Always visibly labelled.

## Verification levels
L0 not verified · L1 identity/contact · L2 business/professional activity · L3 documents (permits, registrations, certificates, title docs) · L4 transaction/project completed · L5 public/institutional partner (gov, bank, notary). Each: required evidence, validity period, re-check, badge, limits, cost, fraud risk, escalation.

## MVP scope (MoSCoW)
MUST: accounts; professional + organization profiles; property/land listings; search/filter/map; contact/lead forms; verified reviews; basic verification (L0–L2, manual L3); government info pages; procedure wizard v1; i18n (pt/en human + machine kea/nl/fr); admin + moderation; email + WhatsApp-oriented notifications.
Concierge (manual first): verification, listing intake, onboarding, matchmaking, procedure guidance, WhatsApp support.
SHOULD: quote/job flow, favorites, comparison, alerts. COULD: project dashboard, materials directory. WON'T (yet): full escrow/payments, public tendering, AI auto-moderation without human, mortgage marketplace.

## Roles
visitor, registered user, buyer, seller, investor, client(opdrachtgever), professional, business admin, agent(makelaar), developer(projectontwikkelaar), gov editor, gov approver, moderator, verification specialist, support, finance admin, platform admin, superadmin. RBAC enforced.

## KEY RESEARCHED FACTS (all accessed 2026-07-20; cite these)
1. **Connectivity (FACT, high):** Internet users 387k = 73.5% penetration; mobile connections 604k = 115% of population; social media 262k = 49.9%. Source: DataReportal "Digital 2025: Cabo Verde" (Jan 2025), datareportal.com/reports/digital-2025-cabo-verde.
2. **Digital government (FACT, high/med):** Unified portal **gov.cv** launched 24 Feb 2026, replacing multiple platforms; legacy citizen portal "Porton di nôs Ilha"; **Chave Móvel Digital (CMDCV)** auth/e-signature via Autentika; **NOSi** operates e-gov backbone; targets 60% of vital public services online by 2026, >80% by 2030. Sources: techafricanews.com (25 Feb 2026), ecofinagency.com, govinsider.asia, portal-autentika.gov.cv, nosi.cv.
3. **Foreign ownership (FACT/med — legal verification required):** Foreigners may buy/own freehold on same terms as nationals (residential, tourism, commercial, development land); agricultural land conditional. Ownership established by registration at **Conservatória do Registo Predial**; final **public deed before a Notary**. **INGT** (Instituto Nacional de Gestão do Território) centralizes land registration; **LMITS** land info/transaction system built under the **MCC compact** cut registration from months to weeks. Sources: caboverdeexpert.com, mcc.gov, judicaregroup.com.
4. **Property tax reform (FACT/med-high — tax verification required):** **IUP** (Imposto Único sobre o Património), acquisition rate 1.5% until 31 Dec 2025, **repealed 1 Jan 2026** and replaced by **cITI** (Imposto sobre Transmissões de Imóveis / transfer) + **cIPI** (Imposto sobre Propriedade de Imóveis / ownership, rate 0.1% on taxable value). Sources: pwc.pt (Inforfisco flash), btoc.com.cv, taxsummaries.pwc.com/cabo-verde.
5. **Transaction costs (ASSUMPTION/med — validate):** total extra ~6% of price; independent lawyer €500–1,500; notary ~€420; registration €200–300; stamp duty 0.8%. Source: caboverdeexpert.com.
6. **Company formation (FACT/med-high):** **"Empresa no Dia"** one-working-day company creation via **Casa do Cidadão** (present per municipality/island), fee ~$100; commercial registry via **EASE** portal (ease.gov.cv); **Cabo Verde TradeInvest** one-stop investor shop with incentives. Sources: caboverde.eregulations.org, trade.gov country commercial guide, state.gov 2025 Investment Climate Statement.
7. **Geography/market (ASSUMPTION/med):** 9 inhabited islands (Santiago, São Vicente, Sal, Boa Vista, Santo Antão, São Nicolau, Fogo, Maio, Brava). Sal, Boa Vista, São Vicente are first-explored by international buyers; **Mindelo (São Vicente)** is the cultural capital. Population est. ~525,000 (validate vs latest census). Sources: capeverdeproperty24.com, bespacegroup.com.
8. **Data protection (ASSUMPTION — legal verification required):** Cabo Verde has a personal-data protection regime (RGPD-aligned) overseen by the data-protection authority (CNPD). Exact obligations to confirm with counsel. Source: vpqadvogados.com guide.

## Reliability labels to use: FACT (confirmed source) / ASSUMPTION (single/indirect source) / HYPOTHESIS (reasoned guess) / RECOMMENDATION (our advice).
