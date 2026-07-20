# Djarvista — Vision & Mission

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** · **ASSUMPTION** · **HYPOTHESIS** · **RECOMMENDATION**. External claims cite the project canon (sources accessed **2026-07-20**). Unconfirmed items marked *to validate / verification required*.

---

## 1. Mission

**Make property, building and public information in Cabo Verde transparent, trustworthy and accessible to everyone — citizens, professionals, investors and public bodies alike — regardless of who they know.**

Djarvista exists to replace dependence on personal networks and scattered, unverifiable information with **neutral digital infrastructure** where information is consolidated, sources are preserved, trust is explicit, and administrative procedures are navigable.

---

## 2. Vision

**A Cabo Verde where finding, verifying, buying, building and servicing property is as clear and reliable online as any comparable service in the world — starting on São Vicente and extending to comparable island states.**

We envision Djarvista as the **default, independent digital gateway** for property, land, building and public information across the archipelago — a shared utility that public bodies, professionals and citizens can all trust because it belongs to none of them exclusively and serves all of them equally.

---

## 3. Core values

| Value | What it means in practice |
|-------|---------------------------|
| **Independence** | Djarvista is neutral infrastructure, not an agency or a broker. It never sells its neutrality. |
| **Transparency** | Sources are cited and preserved; sponsored content is always labelled; nothing hidden buys advantage. |
| **Trust** | Trust is earned and shown (verification L0–L5), never assumed or purchased. |
| **Local applicability** | Built for Cabo Verde's languages, procedures, currency and market realities — not a foreign template dropped in. |
| **Accessibility** | Mobile-first, multilingual, WCAG 2.1 AA — usable by the whole population, not just the connected few. |
| **Scalability** | Lean architecture and repeatable operations so success on one island extends to many. |

---

## 4. Brand promise

**"We show you what is true, who is trustworthy, and how to proceed — independently."**

Djarvista promises every user three things:

1. **Truthful, sourced information** — including official government text preserved alongside plain-language summaries and translations.
2. **Explicit, earned trust** — verified identities, professionals, documents and reviews, with the basis of each badge visible.
3. **A clear path forward** — process guidance through procedures that are otherwise opaque.

**What Djarvista will never do:** let paid visibility buy verification, review scores, or manipulation of official information. (Canon guardrail.)

---

## 5. Tone of voice

**RECOMMENDATION:** Djarvista speaks like a **trusted, plain-spoken local guide** — competent, calm, and honest about uncertainty.

- **Clear, not clever.** Plain language over jargon; short sentences; concrete nouns.
- **Honest about certainty.** Distinguish confirmed facts from things still being verified. Never present *legal/tax verification required* items as advice.
- **Multilingual and respectful.** Portuguese as the official base, Kabuverdianu (kea) as the language of everyday belonging, plus en/nl/fr for reach. Official source texts are always preserved and linked; translations are labelled by type (professional / machine / official government text / plain-language summary).
- **Neutral, never salesy.** Sponsored content is labelled; the platform's voice never pressures.
- **Human and local.** Warm, grounded in Cabo Verdean reality, never corporate boilerplate.

---

## 6. Positioning statement

> **For** citizens, professionals, investors and public bodies in Cabo Verde
> **who** struggle with fragmented information, informal markets and opaque procedures,
> **Djarvista is** independent digital infrastructure
> **that** consolidates property, building and public information and makes trust explicit and procedures navigable,
> **unlike** classifieds sites, individual agencies, or personal-network word-of-mouth,
> **because** it is neutral, trust-first, source-transparent, mobile-first and built specifically for Cabo Verde.

Djarvista is **trust-first infrastructure, not a listings site.**

---

## 7. The five value layers explained

| # | Layer | Problem it addresses | What Djarvista provides | MVP presence |
|---|-------|----------------------|----------------------|--------------|
| 1 | **Information** | Scattered, unverifiable, single-language information | Consolidated, source-linked, multilingual property/land/building/public-procedure information; official texts preserved | Government info pages; multilingual content (pt/en human; kea/nl/fr machine) |
| 2 | **Trust** | No neutral way to know who or what to believe | Verification system L0–L5 for identities, professionals, documents, completed work, and institutional partners; verified reviews | L0–L2 + manual L3; verified reviews |
| 3 | **Findability** | Hard to discover relevant property or the right professional | Search, filter and map (PostGIS) across listings and professionals | Search / filter / map |
| 4 | **Transactions/jobs** | Deals and work flow through personal networks | Contact/lead flows now; quotes and job matching next; escrow/take-rate later | Contact/lead forms (MUST); quote/job flow (SHOULD) |
| 5 | **Process guidance** | Administrative procedures are opaque | Procedure wizard guiding buying, building and registering steps | Procedure wizard v1 |

**Design principle:** the layers are **sequential in value.** Information earns attention, trust earns confidence, findability earns engagement, and only then do transactions/jobs and deeper process guidance become credible. The MVP proves layers 1–3 before leaning on 4–5.

---

## 8. Strategic principles

- **Transparency.** Every external claim is sourced; every sponsored placement is labelled; the difference between official text, translation and summary is always visible. Nothing hidden confers advantage.
- **Trust.** Trust is a system, not a slogan: L0 (not verified) · L1 (identity/contact) · L2 (business/professional activity) · L3 (documents) · L4 (transaction/project completed) · L5 (public/institutional partner). Each level has defined evidence, validity, re-check, badge, limits, cost and fraud handling. Paid visibility never buys a badge.
- **Local applicability.** Built for Cabo Verde's currency (CVE, pegged 110.265 = 1 EUR — **FACT/high, still verify**), languages, islands and procedures, aligned to national digital-government direction (**gov.cv** launched 24 Feb 2026; **CMDCV** e-signature; **NOSi** backbone — **FACT/high-med**). *Government confirmation required* for any official integration.
- **Accessibility.** Mobile-first because the market is mobile — **73.5% internet penetration, 115% mobile connections** (**FACT/high**, DataReportal "Digital 2025: Cabo Verde", Jan 2025). PWA, WCAG 2.1 AA, low-bandwidth-aware, WhatsApp-oriented notifications.
- **Scalability.** A lean modular monolith and repeatable concierge operations mean island #2 costs far less than island #1. Architecture extraction (to services) happens only when scale demands it, never speculatively.
- **Independence.** Djarvista is neutral infrastructure. It partners with government, banks, notaries and agencies but is owned by none of them and favours none of them. Independence is the product; it is never for sale.

---

## 9. The four-phase ambition

| Phase | Scope | Focus | Key gates before advancing |
|-------|-------|-------|----------------------------|
| **1. Pilot — São Vicente** | Single island (Mindelo) | Prove the trust loop (information → trust → findability → lead) with concierge-seeded verified inventory | Verified inventory seeded; foreign-buyer leads converting; willingness to pay validated; legal/tax items cleared |
| **2. Multi-island** | São Vicente + early international-buyer islands (Sal, Boa Vista) then others | Replicate playbook; harden verification and operations for multiple jurisdictions of practice | Repeatable onboarding; per-island content coverage; unit economics holding |
| **3. National** | All 9 inhabited islands (Santiago, São Vicente, Sal, Boa Vista, Santo Antão, São Nicolau, Fogo, Maio, Brava) | Become the default national gateway; pursue official-publication partnership → PPP with public bodies | Government partnership (informal → official); nationwide professional base; sustainable revenue mix |
| **4. International** | Export to comparable island states | Package the model as reusable infrastructure for similar small-island property/govtech markets | Proven, portable operating model; localization framework validated |

**ASSUMPTION/med** — island list and international-buyer sequencing per canon geography/market note (sources: capeverdeproperty24.com, bespacegroup.com). Population estimate ~525,000 *to validate against latest census.* Each phase advances only on evidence, never on schedule alone.

---

*This document is a strategy artifact, not legal, tax or investment advice. Items marked "verification required" must be confirmed with qualified local professionals before any public claim or commitment.*
