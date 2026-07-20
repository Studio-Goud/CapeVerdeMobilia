# Djarvista — Product Roadmap

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> All external claims are cited to the project canon. Sources accessed **2026-07-20**. Unconfirmed items are marked *To validate / Legal verification required / Government confirmation required / Market validation required*.

---

## 0. How to read this roadmap

Five horizons — **0–3, 3–6, 6–12, 12–24, 24–36 months** — mapped onto the canon's four-phase ambition. Each horizon is described across nine dimensions: **product, technology, partnerships, supply, user growth, team, revenue, government cooperation, geographic expansion.**

The through-line is the **concierge-to-product curve**: every trust-critical function starts **manual** (concierge MVP) and is productized **only once its pattern is proven and its volume hurts** (canon MVP: "Concierge (manual first)"). The technical base is the canon's **modular monolith** — Next.js 14 App Router, TypeScript strict, PostgreSQL + PostGIS, Prisma, Redis, S3-compatible storage, pnpm + Turborepo — kept simple, no microservices unless proven necessary.

All timeframes and numeric targets are **ASSUMPTION / RECOMMENDATION** unless cited; they anchor planning and are replaced with validated numbers as each horizon closes.

---

## 1. Horizon-to-phase mapping

| Horizon | Canon phase | Theme | Operating mode |
|---------|-------------|-------|----------------|
| **0–3 mo** | Pre-pilot → Phase 1 start | Build MVP, launch São Vicente concierge | Full manual |
| **3–6 mo** | Phase 1 | Run and prove the pilot | Full manual |
| **6–12 mo** | Phase 1 → Phase 2 start | Semi-automate, add 2nd island | Concierge + first automation |
| **12–24 mo** | Phase 2 → Phase 3 | Multi-island, official partnerships, escrow | Automated core, concierge for edge |
| **24–36 mo** | Phase 3 → Phase 4 | National, institutional, prepare export | Product-led, local concierge pods |

---

## 2. Horizon 0–3 months — Build & launch (pre-pilot → Phase 1 start)

| Dimension | Plan |
|-----------|------|
| **Product** | Ship MVP **MUST** scope: accounts (email + phone OTP, MFA, RBAC); professional + org profiles; property/land listings; search/filter/map; contact/lead forms; verified reviews; verification **L0–L2 + manual L3**; government info pages; **procedure wizard v1**; i18n (pt/en human, kea/nl/fr machine); admin + moderation console; email + WhatsApp-oriented notifications. (canon MVP MoSCoW) |
| **Technology** | Modular monolith: Next.js 14, TS strict, Tailwind, **PWA, mobile-first, WCAG 2.1 AA**; PostgreSQL + PostGIS, Prisma, Redis; PG full-text search; S3-compatible storage with malware scan + signed URLs; envs dev/test/staging/prod; backups, monitoring, logging, IR/DR. (canon tech stack) |
| **Partnerships** | Engage legal & tax counsel (*legal/tax verification required*). Initiate municipality conversation. Initiate brand/IP + domain search (*to validate*). |
| **Supply** | Zero → seed. Prepare concierge verification checklists (L1–L3) and listing-intake process. |
| **User growth** | None public yet; recruit first 3 ambassadors from network. |
| **Team** | ~4 FTE (pilot lead, verification/listing specialist, community/content lead, part-time engineer, part-time field associate). |
| **Revenue** | None (build phase). |
| **Government cooperation** | Research public sources (gov.cv, INGT, Conservatória, Casa do Cidadão) for procedure library. gov.cv unified portal launched 24 Feb 2026 (canon fact 2). *Government confirmation required* for any partner status. |
| **Geographic expansion** | São Vicente only. |

**Exit criterion:** MVP MUST-scope live in production; pilot entry Go criteria met (`17-pilot-sao-vicente.md` §3.1).

---

## 3. Horizon 3–6 months — Run the pilot (Phase 1)

| Dimension | Plan |
|-----------|------|
| **Product** | Harden MVP via weekly iterations from user testing. Add **SHOULD** items opportunistically if they unblock the pilot: quote/job flow (light), favorites, comparison, alerts. Procedure library grows to 15 articles. |
| **Technology** | Stability, performance and mobile UX polish; instrumentation for the KPI framework (`20-kpi-framework.md`). No architecture change. |
| **Partnerships** | Secure **≥1 informal information partner**; onboard legal professional to co-author procedure content. |
| **Supply** | Concierge-seed to pilot targets: **40 verified professionals, 60 listings** (ASSUMPTION). |
| **User growth** | Foreign-prospect demand via WhatsApp + community + events; **30 matches, 25 verified reviews** (ASSUMPTION). |
| **Team** | Stable ~4 FTE. |
| **Revenue** | First monetization test: **8 paying businesses** (Pro/Business/Premium) (ASSUMPTION). Verification fees per level. |
| **Government cooperation** | Informal information partner active; explore path to official-publication SLA (later). |
| **Geographic expansion** | São Vicente only. |

**Exit criterion:** Phase-2 Go decision (`17-pilot-sao-vicente.md` §3.3).

---

## 4. Horizon 6–12 months — Semi-automate & second island (Phase 1 → 2)

| Dimension | Plan |
|-----------|------|
| **Product** | Productize proven concierge steps: **self-serve listing intake with concierge QA**, self-serve profiles with **concierge verification queue**, procedure-wizard v1 direct to users. Ship referral + ambassador tooling. Consider **COULD**: materials directory, project dashboard (light). |
| **Technology** | Introduce **Meilisearch** if catalogue/relevance needs grow (canon: PG FTS → Meilisearch). Redis-backed queues for verification/QA workflows. Keep modular monolith. |
| **Partnerships** | Begin **Casa do Cidadão / EASE / TradeInvest** conversations for professional/company onboarding (canon fact 6). |
| **Supply** | Replicate concierge playbook on a **second island** (Sal or Boa Vista — international demand; or Santiago/Praia — largest market). |
| **User growth** | Cross-island referral; ambassador program formalized. |
| **Team** | Grow to **~8–10 FTE**: +field associate per island, +engineer, +verification specialist, +partnerships lead. |
| **Revenue** | Subscription + premium listings scale; watch **cost-to-verify per professional** falling as automation ships. |
| **Government cooperation** | Move best information partner toward **official-publication SLA** conversation (canon government ladder). *Government confirmation required.* |
| **Geographic expansion** | São Vicente → +1 island (start of Phase 2). |

**Exit criterion:** second island reaches 50% of São Vicente's per-capita KPI ramp within 4 months (`16-go-to-market.md` §5.3).

---

## 5. Horizon 12–24 months — Multi-island, escrow, official partners (Phase 2 → 3)

| Dimension | Plan |
|-----------|------|
| **Product** | Automated core with concierge reserved for high-value land/foreign deals. Introduce **quote/job flow (full)** and, once escrow exists, the **facilitated-job take rate (5–10%)** (canon business model — deferred to here). Verification L4 (transaction/project completed) at scale. |
| **Technology** | Escrow/payments infrastructure (canon WON'T-yet lifts here, gated on legal readiness). Evaluate **service extraction** (NestJS) only where scale demands it (canon future path). |
| **Partnerships** | Official-publication SLA(s); explore **CMDCV** (identity/e-signature) and **NOSi** integration where sanctioned (canon fact 2, *Government confirmation required*). Banks/financiers exploratory. |
| **Supply** | 3+ islands; supply self-serve dominant, concierge for edge cases. |
| **User growth** | National demand-side marketing; product-led growth loops (referral, alerts). |
| **Team** | **~15–25 FTE**: dedicated partnerships, compliance, finance functions. |
| **Revenue** | Subscriptions + premium + verification + **take-rate GMV**. Target subscription contribution-positive before PPP spend. |
| **Government cooperation** | ≥1 official-publication SLA signed; PPP mandate explored (canon government ladder step 3). |
| **Geographic expansion** | Multi-island toward national coverage (Phase 2 → 3). |

**Exit criterion:** ≥1 official-publication SLA or credible PPP mandate; automated core stable (`16-go-to-market.md` §6.3).

---

## 6. Horizon 24–36 months — National, institutional, export-ready (Phase 3 → 4)

| Dimension | Plan |
|-----------|------|
| **Product** | Full national platform; **country-agnostic core** extracted from **local-config layer** (laws, taxes, official sources, languages, partners) to enable replication (canon Phase 4). |
| **Technology** | Multi-tenant / multi-country configuration; selective service extraction where proven; hardened compliance tooling. |
| **Partnerships** | Deepen institutional partnerships; pursue **PPP** (public-private digital partnership). Banks/financiers; tourism entrepreneurs (adjacent demand). |
| **Supply** | National coverage across the 9 inhabited islands (canon fact 7). |
| **User growth** | National brand; institutional trust as a growth driver. |
| **Team** | Central platform team + per-country concierge pods (prep for Phase 4). |
| **Revenue** | Diversified: subscriptions, premium, verification, take-rate, official-partner licences; per-market contribution margin tracked. |
| **Government cooperation** | Official-publication partner at national scale; PPP mandate (upside, not precondition — canon risk #4). |
| **Geographic expansion** | National complete; **first international replication pilot** scoped, run as its own bounded Phase-1 concierge pilot (canon Phase 4). |

**Exit criterion:** first replication country clears its own Phase-1 conditions; repeatable per-country launch runbook exists.

---

## 7. Feature timeline (MoSCoW against horizons)

| Feature | 0–3 | 3–6 | 6–12 | 12–24 | 24–36 |
|---------|-----|-----|------|-------|-------|
| Accounts / profiles / listings / search-map / leads (MUST) | ● Build | Harden | — | — | — |
| Verified reviews (MUST) | ● | Scale | — | — | — |
| Verification L0–L2 + manual L3 (MUST) | ● | Run | Queue tooling | L4 at scale | L5 institutional |
| Gov info pages + procedure wizard v1 (MUST) | ● | 15 articles | Self-serve | SLA pipeline | National |
| i18n pt/en human + kea/nl/fr machine (MUST) | ● | — | — | — | +export langs |
| Admin + moderation (MUST) | ● | — | Workflow queues | — | — |
| Quote/job flow, favorites, comparison, alerts (SHOULD) | — | Light | Referral tooling | Full job flow | — |
| Materials directory, project dashboard (COULD) | — | — | Light | Full | — |
| Escrow/payments + take-rate (WON'T yet) | — | — | — | ● Introduce | Scale |
| Country-agnostic core + local config | — | — | — | Prep | ● Extract |
| Meilisearch | — | — | Consider | As needed | — |
| Service extraction (NestJS) | — | — | — | If scale demands | Selective |

Legend: ● = primary build in that horizon.

---

## 8. Architecture evolution (RECOMMENDATION)

| Horizon | Architecture posture |
|---------|----------------------|
| 0–12 mo | Modular monolith; PG full-text search; keep it simple (canon). |
| 6–12 mo | Add Meilisearch and Redis queues if catalogue/workflow volume justifies. |
| 12–24 mo | Escrow/payments module; begin measuring hotspots for extraction. |
| 24–36 mo | Extract services (NestJS) **only where scale demands**; introduce country-config layer for replication. |

The canon rule holds throughout: **no microservices unless proven necessary.**

---

## 9. Cross-horizon dependencies & gates

- **Legal/tax verification** (canon facts 3–5, 8) gates any advisory-looking content and gates escrow.
- **Government confirmation** gates official-partner and CMDCV/NOSi integration claims (canon fact 2).
- **Willingness-to-pay validation** (canon risk #5) gates aggressive monetization beyond the pilot test.
- **Trust cold-start solved** gates public-scale demand marketing (canon risk #2).

Each horizon transition is a decision gate defined in `16-go-to-market.md` (§4.6, §5.3, §6.3) and `17-pilot-sao-vicente.md` (§3).

---

*This is a strategy artifact, not legal, tax or investment advice. All items marked "verification required" must be confirmed with qualified local professionals before any commitment or public claim.*
