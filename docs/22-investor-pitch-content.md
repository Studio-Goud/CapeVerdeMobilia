# Kavíla — Investor Pitch Content

> **Status:** Investor narrative + slide content, v0.1 · **Date:** 2026-07-20
> **Audience:** Angels, early-stage / impact / frontier-market VCs, strategic investors.
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> This is the **investor** narrative. The **government** narrative is a separate document (`23-government-pitch-content.md`) and must not be mixed in. All financials are **illustrative planning figures / HYPOTHESES to validate**, not forecasts. CVE pegged to EUR at **110.265 CVE = 1 EUR** (fixed peg — high confidence, still verify).

---

## 1. The narrative (read-through)

Cabo Verde is a **digital, mobile, diaspora-connected** nation — internet penetration ~73.5% and mobile connections ~115% of population (**FACT/high**, DataReportal 2025) — but its **property and building market still runs on personal networks and scattered, hard-to-trust information.** Foreign buyers can't navigate ownership, tax and procedure from abroad; locals lose time and money to opacity; professionals have no trusted place to be found and verified; and the rules just changed (the **IUP** acquisition tax was repealed 1 Jan 2026 and replaced by **cITI + cIPI** — **FACT/med-high, tax verification required**), so everyone is re-learning the market at once.

**Kavíla is the trust layer that market lacks.** Not "just a listings site" — **independent digital infrastructure** that brings five things into one mobile-first place: reliable **information**, verifiable **trust** (L0–L5 verification), **findability**, a path to **transactions/jobs**, and **process guidance** through opaque procedures. Trust compounds: verified professionals attract buyers; buyers attract listings; usage generates the information and reviews that make the next user trust the platform more. We monetise through a **hybrid model** — professional subscriptions, premium/featured listings (always labelled), verification and lead services, and later a facilitated-job take rate once escrow exists — while **paid visibility never buys trust or manipulates official information.**

We start with a **concierge-led pilot on São Vicente (Mindelo)**, prove the trust loop and willingness to pay, expand **multi-island → national**, and design for **export to comparable island states**. We are raising to fund the pilot-to-multi-island journey.

---

## 2. Slide-by-slide content

### Slide 1 — Title / one-liner
- **Kavíla** — the digital gateway to property, building and public information in Cabo Verde.
- Independent, trust-first digital infrastructure. Mobile-first. Multilingual.
- [Raise stage · location · date · contact]

### Slide 2 — Problem
- Property & building in Cabo Verde is **fragmented, informal and network-dependent.** (**ASSUMPTION/med.**)
- **Information is scattered and hard to trust** — no neutral, consolidated source.
- **Foreign buyers face uncertainty:** freehold is allowed on the same terms as nationals, ownership via **Conservatória do Registo Predial** and a final **public deed before a Notary**, **INGT** centralises land registration — but it's hard to navigate from abroad. (**FACT/med — legal verification required.**)
- **Procedures are opaque;** costs, counterparties and steps are unclear. Estimated ~6% total transaction add-ons (**ASSUMPTION/med — validate**).
- **Rules just changed:** IUP repealed 1 Jan 2026 → cITI + cIPI. (**FACT/med-high — tax verification required.**)

### Slide 3 — Why now
- **Digital adoption is there:** 387k internet users (73.5%), 604k mobile connections (115%), 262k social media (49.9%). (**FACT/high**, DataReportal 2025.)
- **Government is digitising fast:** unified portal **gov.cv** launched 24 Feb 2026; **Chave Móvel Digital** e-ID/e-signature; **NOSi** runs the e-gov backbone; target **60% of vital public services online by 2026**, >80% by 2030. (**FACT/high-med.**) A digitising state makes an information/trust partner timely.
- **Registration modernised:** **LMITS** (built under the **MCC compact**) cut land registration from months to weeks. (**FACT/med.**)
- **Tax reset (2026)** forces the whole market to re-learn the rules — a wedge for an authoritative information layer.

### Slide 4 — Market
- **Geography:** 9 inhabited islands; population est. **~525,000** (**ASSUMPTION/med — validate vs latest census**). Sal, Boa Vista, São Vicente are first-explored by international buyers; **Mindelo (São Vicente)** is the cultural capital. (**ASSUMPTION/med.**)
- **Segments we serve:** local buyers/sellers, diaspora, foreign buyers, agents, architects, contractors, tradespeople, landowners, banks, lawyers, notaries, materials suppliers, and public bodies.
- **Sizing (HYPOTHESIS — to validate):** we deliberately present TAM/SAM/SOM as ranges built bottom-up from professional counts × subscription price and listing volumes × premium rate, **not** top-down guesses. See Appendix A. **Market validation required.**

### Slide 5 — Solution
- **Five value layers in one trusted place:** (1) Information (2) Trust (3) Findability (4) Transactions/jobs (5) Process guidance.
- **Verification system L0–L5** turns "who you know" into "what's verified": identity → business → documents → completed transactions → institutional partners.
- **Concierge-first** (manual before automated): verification, listing intake, onboarding, matchmaking, procedure guidance, WhatsApp support.
- **Not an agency, not a party to deals** — neutral infrastructure.

### Slide 6 — Product
- **Mobile-first PWA** (Next.js 14, TypeScript, PWA, WCAG 2.1 AA), multilingual (pt/kea/en/nl/fr; official texts preserved, translations linked to source).
- **MVP MUSTs:** accounts; professional/org profiles; property & land listings; search/filter/map (PostGIS); contact/lead forms; **verified reviews**; verification L0–L2 (+ manual L3); government info pages; **procedure wizard v1**; admin + moderation; email/WhatsApp-oriented notifications.
- **Trust UX:** verification badges, "Patrocinado/Sponsored" labels, source-and-provenance line on info pages.

### Slide 7 — Business model
- **Hybrid, multi-stream** (all CVE, ~€ at 110.265 peg):
  - **Professional subscriptions:** Free / **Pro ≈ 2.500 CVE/mo (~€23)** / **Business ≈ 7.500 CVE/mo (~€68)**.
  - **Property:** free basic listing + **Premium ≈ 5.000 CVE (~€45)/30d** + Featured placement (always labelled).
  - **Verification fees** per level; **lead fees** (optional); **project-management add-on**.
  - **Facilitated-job take rate** (target **5–10%**) introduced later, once escrow exists.
  - **Government** partnerships (separate deck) as a later, complementary revenue/impact line.
- **Guardrail:** paid visibility NEVER buys verification, review scores, or manipulation of official info — always labelled. (This is a durability asset, not a constraint.)

### Slide 8 — Scalability
- **Concierge → software:** manual playbooks first, automate the proven steps. Marginal cost falls as verification/onboarding/matchmaking productise.
- **Geographic:** São Vicente pilot → multi-island → national → **export to comparable island states** (SIDS with diaspora-driven property demand). (**RECOMMENDATION/HYPOTHESIS.**)
- **Architecture built to scale:** modular monolith now (fast to pilot), documented extraction path to services when scale demands.

### Slide 9 — Network effects & moat
- **Two-sided trust loop:** verified professionals → buyer confidence → more buyers → more listings → more data/reviews → higher trust for the next user.
- **Data compounding:** verified profiles, completed-transaction history (L4), reviews and procedure content get better with use and are hard to replicate.
- **Defensibility (Slide 10 detail):**
  - **Trust brand + verification corpus** — reputation is slow to copy.
  - **Local operational depth** — concierge, language (kea), on-island relationships.
  - **Provenance/neutrality stance** — credibility with public bodies a pure-classifieds rival can't easily claim.
  - **Switching costs** — professionals' verified history and reviews live on Kavíla.

### Slide 10 — Defensibility (why we win / stay won)
- Incumbent listings sites are thin, foreign-run or generic; none combine **verification + procedure guidance + neutrality**. (**ASSUMPTION/med.**)
- Moat = **trust data + local ops + institutional credibility**, not features alone.
- Guardrails (unbuyable trust) make us the **safe** choice for buyers, professionals and, later, public bodies.

### Slide 11 — Go-to-market & growth
- **Beachhead:** Mindelo/São Vicente — cultural capital, manageable, high engagement. (**ASSUMPTION/med.**)
- **Supply-first:** onboard & verify professionals via concierge, seed quality listings, then pull demand (diaspora + foreign buyers via targeted channels; locals via WhatsApp/social).
- **Channels:** WhatsApp Business (primary), social (49.9% penetration), professional partnerships, diaspora communities.
- **Expansion trigger:** move to next island once pilot hits the trust-loop and WTP thresholds (Appendix B).

### Slide 12 — Unit economics (illustrative — HYPOTHESIS)
- Revenue per pro (blended Pro/Business) and per premium listing drive contribution; concierge cost per onboarding falls as playbooks productise.
- Target: **positive contribution margin per active professional** within the pilot; CAC recovered within an acceptable payback window. **All figures illustrative — to validate** (Appendix A/C).

### Slide 13 — Traction & pilot plan
- **Stage:** pre-launch / early build (modular monolith MVP per canon scope).
- **Pilot plan (São Vicente):**
  1. Concierge-onboard & verify an initial cohort of professionals (agents, architects, contractors, tradespeople).
  2. Seed quality property/land listings; stand up government **info pages** + **procedure wizard v1**.
  3. Run **behavioural validation interviews** (see `24-validation-interviews.md`) to confirm severity/frequency/WTP.
  4. Measure the **trust loop** and **willingness to pay**; iterate.
- **Traction to show (as available):** verified professionals, active listings, leads generated, procedure-wizard completions, WhatsApp support engagements, paying conversions. (Report actuals only — no fabricated metrics.)

### Slide 14 — Team
- [Founder(s) — names/roles], with a plan to cover: local operations & concierge, product/engineering (Next.js/TS), verification & moderation, partnerships (professionals + public bodies), multilingual content (pt/kea).
- **Advisory to build:** local legal/notary, real-estate, and public-sector advisors. (**RECOMMENDATION** — do not name people until confirmed.)

### Slide 15 — The ask & use of funds
- **Raising:** [€ amount] to fund **pilot → multi-island** over [N] months of runway.
- **Illustrative use of funds (RECOMMENDATION — to finalise):**

| Area | Share (illustrative) | What it buys |
|------|----------------------|--------------|
| Product & engineering | ~35% | MVP build/hardening, procedure wizard, PWA, i18n |
| Concierge & operations | ~25% | Verification, onboarding, matchmaking, WhatsApp support |
| Go-to-market & partnerships | ~20% | Supply onboarding, diaspora/foreign-buyer channels, professional partnerships |
| Trust, legal & compliance | ~10% | Trademark clearance, data-protection (CNPD), tax/legal verification |
| G&A & contingency | ~10% | Buffer, tooling, reserve |

- **Milestones this funds:** verified-professional cohort live; trust loop demonstrated; WTP validated; ready-to-replicate playbook for island #2.

### Slide 16 — Vision / close
- From a São Vicente pilot to national infrastructure, then to comparable island states.
- **Kavíla:** if it's on Kavíla, you can act on it.

---

## 3. Risks & mitigations (investor Q&A backup)

| Risk | Mitigation |
|------|------------|
| Small national market | Multi-stream revenue per user; export path to other island states; diaspora + foreign-buyer demand beyond residents. (**HYPOTHESIS.**) |
| Trust / fraud | L0–L5 verification, human moderation, provenance labels, escalation paths. |
| Regulatory/tax change (cITI/cIPI) | Being the authoritative info layer turns change into a wedge; content updated with cited sources. (**Tax verification required.**) |
| Data protection | RGPD-aligned regime under CNPD; obligations confirmed with counsel. (**Legal verification required.**) |
| Government dependency | Gov is a *separate, later* line; core model stands alone on private revenue. |
| Availability of name/domain/TM | Clearance before spend; alternates identified. (See brand doc — **to validate**.) |

---

## Appendix A — Key metrics (illustrative planning figures)

> **All values illustrative HYPOTHESES for planning — Market validation required. Not forecasts.** CVE at 110.265/EUR.

**Pricing (from canon — fixed inputs):**

| Item | CVE | ≈ EUR |
|------|-----|-------|
| Pro subscription / mo | 2.500 | ~€23 |
| Business subscription / mo | 7.500 | ~€68 |
| Premium listing / 30 days | 5.000 | ~€45 |
| Facilitated-job take rate (later) | — | 5–10% |

**Bottom-up sizing method (to populate with validated data):**
- Serviceable professionals = agents + architects + contractors + tradespeople + suppliers per island (source: to validate).
- Revenue potential = (paying pros × blended subscription) + (active listings × premium attach rate × price) + verification/lead fees + later take-rate on facilitated jobs.
- Present as **SOM (pilot island) → SAM (national) → TAM (island-states export)** ranges, each with its assumptions stated.

## Appendix B — Pilot success thresholds (to set with the team)

| Metric | Definition | Target (to set) |
|--------|------------|-----------------|
| Verified professionals | L1–L3 active pros | [ ] |
| Active listings | live property/land listings | [ ] |
| Trust-loop signal | leads per verified pro / month | [ ] |
| WTP conversion | free → Pro/Business conversion | [ ] |
| Procedure engagement | wizard completions / month | [ ] |
| Retention | month-2 active pros | [ ] |

## Appendix C — Unit-economics skeleton (to validate)

| Line | Driver | Note |
|------|--------|------|
| ARPU (pro) | blended Pro/Business + attach (premium, verification, leads) | validate mix |
| Gross margin | revenue − concierge/ops cost per active pro | concierge cost falls as productised |
| CAC | supply + demand acquisition cost | channel-dependent |
| Payback | CAC / monthly contribution | target within acceptable window |
| LTV | contribution × expected lifetime | requires retention data |

---

*This investor narrative is intentionally distinct from the government pitch. For the public-sector value story, transparency/inclusion framing and the three collaboration models, see `23-government-pitch-content.md`.*
