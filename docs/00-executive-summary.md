# Ilhavista — Executive Summary

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> All external claims are cited to the project canon. Sources accessed **2026-07-20**. Unconfirmed items are marked *To validate / Legal verification required / Government confirmation required / Market validation required*.

---

## 1. Concept in one paragraph

**Ilhavista** is proposed as **independent digital infrastructure** connecting citizens, professionals, investors and public bodies around property, building and public information in Cabo Verde. It is deliberately **not "just a listings site."** It is a trust-first layer that combines five things most Cabo Verdean property and building interactions lack in one place: reliable **information**, verifiable **trust**, **findability**, a path to **transactions/jobs**, and **process guidance** through opaque administrative procedures. The name combines *ilha* (island) + *vista* (view) — “island view” (**RECOMMENDATION** — trademark, domain and social handles *to validate*).

---

## 2. Core problem

The Cabo Verdean property and building market is **fragmented, informal, and dependent on personal networks.** Concretely:

- **Information is scattered and hard to trust.** There is no neutral, consolidated place for property, land, professional and public-procedure information. (**ASSUMPTION/med** — informal-market and fragmentation premise, canon geography/market note.)
- **Foreign buyers face uncertainty.** Foreigners may buy freehold on the same terms as nationals (residential, tourism, commercial, development land; agricultural conditional), with ownership established by registration at the **Conservatória do Registo Predial** and a final **public deed before a Notary** — but the process, costs and counterparties are hard to navigate from abroad. (**FACT/med — legal verification required.** Sources: caboverdeexpert.com, mcc.gov, judicaregroup.com.)
- **The market is personal-network-driven.** Deals, trades and recommendations flow through who-you-know rather than transparent, verifiable channels. (**ASSUMPTION/med.**)
- **Regulatory change adds confusion.** The acquisition tax **IUP** (1.5% until 31 Dec 2025) was **repealed 1 Jan 2026** and replaced by **cITI** (transfer) + **cIPI** (ownership, 0.1% on taxable value). Market participants must re-learn the rules. (**FACT/med-high — tax verification required.** Sources: pwc.pt, btoc.com.cv, taxsummaries.pwc.com/cabo-verde.)
- **The audience is mobile, not desktop.** Internet penetration is **73.5%** (387k users) and mobile connections are **115%** of population (604k). Any solution must be mobile-first. (**FACT/high.** Source: DataReportal "Digital 2025: Cabo Verde", Jan 2025.)

---

## 3. Recommended solution & positioning

**RECOMMENDATION:** Build Ilhavista as an **independent, trust-first digital platform** — neutral infrastructure rather than an agency or a pure classifieds board.

**Positioning statement:** *Independent digital infrastructure connecting citizens, professionals, investors and public bodies for property, building and public information in Cabo Verde.*

- **Tagline (EN):** "The digital gateway to property, building and public information in Cabo Verde."
- **Tagline (PT):** "A porta digital para terra, construção e serviços em Cabo Verde."

The differentiator is **trust and process guidance**, delivered through a **verification system (L0–L5)** and human-assisted **concierge** operations, not through volume of listings.

### The five value layers

| # | Layer | What it delivers |
|---|-------|------------------|
| 1 | **Information** | Neutral, multilingual, source-linked property/land/building/public-procedure information |
| 2 | **Trust** | Verified identities, professionals, documents and reviews via L0–L5 verification |
| 3 | **Findability** | Search, filter and map (PostGIS) across listings and professionals |
| 4 | **Transactions/jobs** | Lead/contact flows, quotes and job matching (escrow deferred) |
| 5 | **Process guidance** | Procedure wizard for administrative steps (buying, building, registering) |

---

## 4. Primary target groups

**RECOMMENDATION** — sequence engagement roughly in this order:

1. **Foreign buyers/investors** — highest uncertainty, highest willingness to pay for trust and guidance.
2. **Sellers & landowners** — need reach beyond their personal network.
3. **Real-estate agents & professionals** (architects, contractors, tradespeople, developers) — core subscription base.
4. **Building-materials suppliers** — directory and lead value.
5. **Public bodies** (municipality, national government, notary/lawyer) — information and, later, official-publication partnership.
6. **Banks/financiers & tourism entrepreneurs** — adjacent demand, later phases.

---

## 5. Key value propositions

- **For foreign buyers:** a trustworthy, multilingual gateway that de-risks a cross-border purchase and explains the actual procedure, costs and counterparties.
- **For sellers/landowners:** reach beyond personal networks with credibility signals that make listings believable.
- **For professionals:** verified profiles, reviews and qualified leads — a reputation asset that compounds.
- **For public bodies:** a neutral channel to publish accurate information and reduce repetitive citizen queries.
- **Across all groups:** one place where information is consolidated, sources are preserved, and trust is explicit rather than assumed.

---

## 6. First business model summary (hybrid)

Currency **CVE**, pegged to EUR at **110.265 CVE = 1 EUR** (**FACT/high — still verify**).

| Stream | Detail |
|--------|--------|
| **Professional subscriptions** | Free / **Pro ≈ 2.500 CVE/mo (~€23)** / **Business ≈ 7.500 CVE/mo (~€68)** |
| **Property listings** | Free basic listing + **Premium ≈ 5.000 CVE (~€45)/30d** + Featured placement (always labelled "Patrocinado/Sponsored") |
| **Verification fees** | Per level (L1–L5), tied to evidence and re-check burden |
| **Lead fees** | Optional |
| **Project-management add-on** | Upsell for building/renovation coordination |
| **Government** | (1) informal info partner (free/subsidised) → (2) official-publication partner (SLA licence) → (3) PPP |
| **Facilitated-job take rate** | 5–10%, **introduced later, once escrow exists** |

**Guardrail (non-negotiable):** paid visibility **never** buys verification, review scores, or manipulation of official information; sponsored content is always visibly labelled.

---

## 7. Recommended MVP scope

**MVP = modular monolith** (Next.js 14 App Router, TypeScript strict, PostgreSQL + PostGIS, Prisma, Redis). Mobile-first PWA, WCAG 2.1 AA. No microservices unless proven necessary.

**MUST (build for pilot):**

- Accounts (email + phone OTP, MFA, RBAC)
- Professional + organization profiles
- Property/land listings
- Search / filter / map
- Contact / lead forms
- Verified reviews
- Basic verification **L0–L2**, manual **L3**
- Government information pages
- Procedure wizard v1
- i18n: **pt/en human**; machine **kea/nl/fr**
- Admin + moderation console
- Email + WhatsApp-oriented notifications

**Concierge (manual first):** verification, listing intake, onboarding, matchmaking, procedure guidance, WhatsApp support.

**SHOULD:** quote/job flow, favorites, comparison, alerts.
**COULD:** project dashboard, materials directory.
**WON'T (yet):** full escrow/payments, public tendering, AI auto-moderation without a human, mortgage marketplace.

---

## 8. Top risks

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | **Legal/tax assumptions wrong** (foreign ownership, cITI/cIPI, transaction costs) | High | Engage local counsel; mark all as *legal/tax verification required*; do not present as advice |
| 2 | **Trust cold-start** — a trust platform with no verified inventory is not trusted | High | Concierge-seed verified listings and professionals on São Vicente before public launch |
| 3 | **Informal-market resistance** — participants prefer opaque personal networks | High | Lead with foreign buyers (who lack networks) and clear seller reach benefits |
| 4 | **Government dependency** — official-info partnership is not guaranteed | Medium | Start as informal info partner using public sources; PPP is an upside, not a precondition |
| 5 | **Low willingness to pay** among small local professionals | Medium | Free tier + demonstrable lead value before paywall; *market validation required* |
| 6 | **Data-protection compliance** (CNPD / RGPD-aligned regime) | Medium | Counsel review; privacy-by-design; *legal verification required* |
| 7 | **Content/verification fraud** at scale | Medium | Human-in-the-loop moderation; L0–L5 with re-checks; no AI-only moderation yet |
| 8 | **Brand/IP** — name, domain, handles unconfirmed | Low-Med | Trademark/domain search before spend; *to validate* |

---

## 9. Pilot strategy — São Vicente (Mindelo)

**RECOMMENDATION:** Pilot on **São Vicente**, whose capital **Mindelo** is Cabo Verde's cultural capital and among the islands first explored by international buyers (with Sal and Boa Vista). (**ASSUMPTION/med.** Sources: capeverdeproperty24.com, bespacegroup.com.)

**Why São Vicente first:**

- Concentrated, walkable market — concierge operations are feasible with a small team.
- International-buyer interest exists, matching the highest-willingness-to-pay segment.
- A single island bounds legal, verification and content scope while patterns are proven.

**Pilot playbook:**

1. **Seed trust manually.** Concierge-verify a starter set of professionals and listings (L1–L3) before public launch.
2. **Recruit foreign-buyer demand** alongside seller/agent supply to avoid an empty marketplace.
3. **Publish neutral information + procedure wizard v1** from public sources (gov.cv, INGT, Conservatória, Casa do Cidadão) — clearly sourced, non-advisory.
4. **Instrument everything.** Measure lead quality, verification throughput, and willingness to pay.
5. **Prove the loop** (information → trust → findability → lead) before adding transaction/job features.

**Pilot success signals (HYPOTHESIS — set real targets during planning):** a critical mass of verified listings/professionals; qualified foreign-buyer leads converting to contact; measurable willingness to pay for Pro/Premium; at least one public body willing to act as an informal information partner.

---

## 10. Verdict: **Conditional Go**

**RECOMMENDATION: Conditional Go.**

**Why Go:**

- The problem (fragmentation, informality, foreign-buyer uncertainty) is real and grounded in cited facts.
- The audience is demonstrably reachable — **73.5% internet, 115% mobile** (**FACT/high**) — and the mobile-first PWA approach fits.
- Government is actively digitizing (**gov.cv** launched 24 Feb 2026; CMDCV e-signature; NOSi backbone; 60% of vital services online targeted by 2026), creating tailwind and future partnership surface. (**FACT/high-med.**)
- A lean modular monolith plus concierge operations keeps the path to a São Vicente pilot short and cheap.

**Conditions that must clear before/through the pilot:**

1. **Legal & tax verification** of foreign-ownership process, cITI/cIPI, transaction costs, and CNPD/data-protection obligations with local counsel.
2. **Market validation** of willingness to pay (Pro/Business/Premium) and of foreign-buyer demand on São Vicente.
3. **Trust cold-start solved** via concierge-seeded verified inventory.
4. **Brand/IP clearance** (name, domain, handles).

**Why not full Go:** the model's core promise is trust, and the legal/tax facts underpinning that promise are still marked *verification required*. **Why not No-Go:** every open item is a validation task, not a structural flaw. Proceed into a **bounded São Vicente pilot** designed to close the four conditions.

---

## 11. What fills the rest of `/docs`

| File | Purpose |
|------|---------|
| `00-executive-summary.md` | This document — concept, problem, solution, model, MVP, risks, pilot, verdict |
| `01-vision-and-mission.md` | Mission, vision, values, brand promise, tone, positioning, five value layers, strategic principles, four-phase ambition |
| `02-problem-analysis.md` | Per-stakeholder problem analysis (15 groups) + cross-cutting problems the platform solves |

*Further documents (business model detail, verification design, technical architecture, go-to-market, legal/compliance workplan) to be added as the project progresses.*

---

*This summary is a strategy artifact, not legal, tax or investment advice. All items marked "verification required" must be confirmed with qualified local professionals before any commitment or public claim.*
