# Djarvista — KPI Framework

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> All external claims are cited to the project canon. Sources accessed **2026-07-20**. Unconfirmed items are marked *To validate / Legal verification required / Government confirmation required / Market validation required*.

---

## 0. Purpose and principles

This is the measurement layer for Djarvista. It defines a **KPI tree** across five families — **marketplace, property, trust, financial, public-value** — and gives each metric a definition, a formula (where sensible), a target direction, and a **pilot target (ASSUMPTION)** for the São Vicente Phase-1 pilot.

**Principles (RECOMMENDATION):**

- **Trust is the north star.** Because Djarvista's promise is trust, trust KPIs are treated as leading indicators, not vanity metrics.
- **Pilot targets are hypotheses.** Every numeric pilot target below is **ASSUMPTION** — a planning anchor to be replaced with validated numbers during the pilot (*market validation required*).
- **No metric rewards paid manipulation.** Consistent with the canon guardrail, no KPI is defined in a way that could be gamed by paid visibility (paid visibility never buys verification, review scores, or official-info manipulation).
- **Instrument from day one** (roadmap 0–3 mo). Currency **CVE**, pegged at **110.265 CVE = 1 EUR** (canon).

Companion documents: `16-go-to-market.md`, `17-pilot-sao-vicente.md`, `18-product-roadmap.md`.

---

## 1. KPI tree (overview)

```
NORTH STAR: Trusted matches created
  (a verified user connecting to verified supply through Djarvista)

├── 1. MARKETPLACE KPIs        → is the loop working?
│     activation · listings · leads · matches · match rate · liquidity · retention
├── 2. PROPERTY KPIs           → is inventory real and useful?
│     listing volume · quality · freshness · views · lead-per-listing · time-to-lead
├── 3. TRUST KPIs              → is trust real and growing?
│     verified share · verification throughput · review coverage · fraud rate · time-to-verify
├── 4. FINANCIAL KPIs          → is it a business?
│     paying accounts · MRR/ARPA · conversion · CAC · LTV · take-rate GMV · burn/runway
└── 5. PUBLIC-VALUE KPIs       → is it infrastructure?
      info partners · procedure coverage · procedure completions · language coverage · accessibility
```

**North-star metric — Trusted matches created.** Definition: count of connections where a verified user (L1+) contacts verified supply (professional or listing, L1+) through Djarvista in a period. Formula: `count(leads WHERE demand.verified AND supply.verified)`. Direction: ↑. Pilot target (ASSUMPTION): **30**.

---

## 2. Marketplace KPIs

| KPI | Definition | Formula | Direction | Pilot target (ASSUMPTION) |
|-----|------------|---------|-----------|---------------------------|
| **Activation rate** | Share of new registrants who complete a meaningful first action (profile, listing, or lead) | `activated_users / new_registrants` | ↑ | 50% |
| **Active listings** | Live, non-expired property/land listings | `count(listings WHERE status=active)` | ↑ | 60 |
| **Verified professionals** | Professionals at L1–L3 | `count(pros WHERE level>=L1)` | ↑ | 40 |
| **Leads created** | Contact/lead-form submissions to supply | `count(leads)` | ↑ | 80 |
| **Matches (lead→contact)** | Leads that result in a two-way contact | `count(leads WHERE responded)` | ↑ | 30 |
| **Match rate** | Share of leads that become matches | `matches / leads` | ↑ | 38% |
| **Liquidity (supply side)** | Share of active listings receiving ≥1 lead in 30d | `listings_with_lead / active_listings` | ↑ | 40% |
| **Marketplace retention** | Share of professionals active month-over-month | `active_M / active_M-1` | ↑ | 60% |
| **WhatsApp response SLA** | Median first response on support line | `median(first_response_time)` | ↓ | <2h |

**Reliability:** all ASSUMPTION for targets; metric definitions are RECOMMENDATION.

---

## 3. Property KPIs

| KPI | Definition | Formula | Direction | Pilot target (ASSUMPTION) |
|-----|------------|---------|-----------|---------------------------|
| **New listings / month** | Listings published in the month | `count(listings WHERE created in month)` | ↑ | 20 |
| **Land listings** | Subset that are land/parcels | `count(listings WHERE type=land)` | ↑ | 15 |
| **Listing quality score** | Completeness (photos, description, pt+en, geo/PostGIS pin) | weighted checklist 0–100 | ↑ | ≥80 avg |
| **Listing freshness** | Share updated/confirmed in last 30d | `fresh_listings / active_listings` | ↑ | 85% |
| **Views per listing** | Median listing detail views | `median(views_per_listing)` | ↑ | 40 |
| **Leads per listing** | Mean leads per active listing | `leads / active_listings` | ↑ | 1.3 |
| **Time-to-first-lead** | Median days from publish to first lead | `median(first_lead_date − publish_date)` | ↓ | <14d |
| **Verified-listing share** | Listings with L3 title/document check | `L3_listings / active_listings` | ↑ | 40% *(legal verification required — canon fact 3)* |

---

## 4. Trust KPIs

Trust is the north-star family (canon positioning). Verification levels **L0–L5** are canon.

| KPI | Definition | Formula | Direction | Pilot target (ASSUMPTION) |
|-----|------------|---------|-----------|---------------------------|
| **Verified-supply share** | Share of supply (pros + listings) at L1+ | `verified_supply / total_supply` | ↑ | 80% |
| **Verification depth** | Share of professionals reaching L2+ | `L2plus / verified_pros` | ↑ | 50% |
| **Verification throughput** | Verifications completed per week | `count(verifications) / week` | ↑ | 8/wk |
| **Time-to-verify** | Median hours from request to badge | `median(verify_completed − requested)` | ↓ | <72h |
| **Review coverage** | Share of matched interactions with a verified review | `reviewed_interactions / matches` | ↑ | 60% |
| **Verified reviews (count)** | Reviews tied to a confirmed interaction | `count(reviews WHERE verified)` | ↑ | 25 |
| **Fraud/abuse rate** | Share of listings/profiles flagged and confirmed fraudulent | `confirmed_fraud / total_items` | ↓ | <2% |
| **Moderation SLA** | Median hours to resolve a flagged item (human-in-loop) | `median(resolution_time)` | ↓ | <24h |
| **Re-check compliance** | Share of expiring verifications re-checked on time | `on_time_rechecks / due_rechecks` | ↑ | 90% |

**Guardrail metric (RECOMMENDATION):** track **paid-visibility separation** — verify (by audit) that 0% of verification badges or review scores were influenced by payment. Target: **0 incidents** (canon non-negotiable).

---

## 5. Financial KPIs

Currency CVE (peg 110.265 CVE = 1 EUR). Tiers: **Free / Pro ≈ 2.500 CVE/mo (~€23) / Business ≈ 7.500 CVE/mo (~€68)**; **Premium listing ≈ 5.000 CVE (~€45)/30d** (canon).

| KPI | Definition | Formula | Direction | Pilot target (ASSUMPTION) |
|-----|------------|---------|-----------|---------------------------|
| **Paying accounts** | Businesses on Pro/Business/Premium | `count(accounts WHERE paying)` | ↑ | 8 |
| **Paid conversion** | Share of verified pros who become paying | `paying / verified_pros` | ↑ | 20% |
| **MRR** | Monthly recurring revenue | `Σ subscription_fees/month` | ↑ | ~40.000 CVE (~€363) |
| **ARPA** | Average revenue per paying account | `MRR / paying_accounts` | ↑ | ~5.000 CVE |
| **Premium-listing revenue** | Revenue from premium/featured listings | `Σ premium_fees` | ↑ | ~30.000 CVE/mo |
| **Verification-fee revenue** | Revenue from L1–L5 fees | `Σ verification_fees` | ↑ | tracked (no target yet) |
| **CAC (blended)** | Cost to acquire a paying account | `GTM_spend / new_paying` | ↓ | *market validation required* |
| **Retention (paying)** | Paying accounts retained past first cycle | `retained / cohort` | ↑ | 60% |
| **Take-rate GMV** | GMV through facilitated jobs (Phase 3+) | `Σ facilitated_job_value` | ↑ | n/a in pilot (escrow deferred) |
| **Burn / runway** | Monthly net spend / months of cash | `cash / monthly_burn` | runway ↑ | ≥12 mo maintained |

**Notes:** LTV, CAC and take-rate are meaningful only post-pilot; the pilot's financial job is to **validate willingness to pay**, not to be profitable (canon risk #5; `17-pilot-sao-vicente.md` §3.3 PAUSE-MONETIZATION rule). Facilitated-job take rate (5–10%) is deferred until escrow exists (canon).

---

## 6. Public-value KPIs

These measure whether Djarvista is functioning as **independent digital infrastructure**, not just a marketplace (canon positioning).

| KPI | Definition | Formula | Direction | Pilot target (ASSUMPTION) |
|-----|------------|---------|-----------|---------------------------|
| **Information partners** | Public bodies in an information/publication relationship | `count(info_partners)` | ↑ | ≥1 (*Government confirmation required*) |
| **Procedure-library coverage** | Live, sourced, non-advisory procedure articles | `count(articles WHERE live)` | ↑ | 15 |
| **Procedure-wizard completions** | Users completing a procedure-wizard v1 flow | `count(wizard_completions)` | ↑ | 100 |
| **Source-linkage integrity** | Share of info items with a preserved official source link | `sourced_items / info_items` | ↑ | 100% |
| **Language coverage** | Content available across pt/en (human) + kea/nl/fr (machine) | share of key content per language | ↑ | pt/en 100%; kea/nl/fr key pages |
| **Accessibility conformance** | WCAG 2.1 AA pass rate on audited pages | `passing_pages / audited_pages` | ↑ | ≥95% |
| **Mobile share of use** | Sessions on mobile devices | `mobile_sessions / all_sessions` | ↑ (monitor) | ≥80% *(context: 115% mobile — canon fact 1)* |
| **Citizen-query deflection** | Procedure views that substitute for a repetitive public query | proxy: wizard completions vs support tickets | ↑ | tracked (no target) |

---

## 7. KPI dashboard layout (RECOMMENDATION)

A single mobile-first admin dashboard (in `/apps/admin`), refreshed daily, laid out top-to-bottom so the north star and trust sit first:

```
┌────────────────────────────────────────────────────────────┐
│  DJARVISTA — PILOT DASHBOARD (São Vicente)      as of <date>    │
├────────────────────────────────────────────────────────────┤
│  ★ NORTH STAR                                                │
│    Trusted matches created     [ 18 / 30 ]  ▲   trend ▁▂▃▅▆  │
├──────────────────────────┬─────────────────────────────────┤
│  TRUST (leading)          │  MARKETPLACE                     │
│   Verified supply share   │   Active listings   [ 42 / 60 ]  │
│   Time-to-verify          │   Verified pros     [ 27 / 40 ]  │
│   Verified reviews        │   Match rate                     │
│   Fraud rate  ⚠ if >2%    │   WhatsApp SLA                   │
├──────────────────────────┼─────────────────────────────────┤
│  PROPERTY                 │  FINANCIAL                       │
│   New listings / mo       │   Paying accounts   [ 5 / 8 ]    │
│   Leads per listing       │   Paid conversion                │
│   Time-to-first-lead      │   MRR (CVE)                       │
│   Verified-listing share  │   Retention (paying)             │
├──────────────────────────┴─────────────────────────────────┤
│  PUBLIC VALUE                                                │
│   Info partners  [ 1 ]   Procedure articles [ 11 / 15 ]     │
│   Wizard completions      Accessibility  ≥95%   Mobile ≥80% │
├────────────────────────────────────────────────────────────┤
│  GUARDRAIL: paid-visibility incidents  [ 0 ]  (must be 0)   │
├────────────────────────────────────────────────────────────┤
│  GO/NO-GO TRACKER: 4 canon conditions  [ 2/4 on track ]     │
└────────────────────────────────────────────────────────────┘
```

**Layout rules:**

- **Row 1 — North star** always at the top, with target and a small sparkline trend.
- **Row 2 — Trust (left) before Marketplace (right)**, reflecting that trust is the leading indicator.
- **Rows 3–4 — Property and Financial** with progress-to-pilot-target `[actual / target]` bars.
- **Row 5 — Public value**, the infrastructure signal.
- **Guardrail band** — the paid-visibility incident counter, which must read **0**; any non-zero triggers an alert.
- **Go/No-Go tracker** — maps live metrics onto the four canon exit conditions (`17-pilot-sao-vicente.md` §3.3) so the decision gate is always visible.
- **Colour/alerting:** green on/above target, amber within 20% below, red otherwise; fraud and guardrail have hard alert thresholds. Mobile-first, WCAG 2.1 AA (canon tech).

---

## 8. Measurement notes

- **Segment every KPI** by island (for Phase 2+), by target group (agents, architects, trades, suppliers, landowners, legal, foreign prospects), and by verification level.
- **Cohort financial and retention KPIs** by acquisition month.
- **Data protection:** metrics must respect the CNPD / RGPD-aligned regime; avoid storing unnecessary personal data in analytics (*legal verification required* — canon fact 8).
- **Replace ASSUMPTION targets** with validated numbers at the Week-12 checkpoint and Week-24 Go/No-Go.

---

*This is a strategy artifact, not legal, tax or investment advice. All items marked "verification required" must be confirmed with qualified local professionals before any commitment or public claim.*
