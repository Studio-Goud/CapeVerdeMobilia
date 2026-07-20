# 05 — Business Model (Ilhavista)

> **Scope.** How Ilhavista creates, delivers and captures value. Every figure is
> consistent with the [Project Canon](_canon.md). Reliability
> labels are used throughout: **FACT** (confirmed source) / **ASSUMPTION**
> (single or indirect source) / **HYPOTHESIS** (reasoned guess) /
> **RECOMMENDATION** (our advice).
>
> **Currency.** All prices in **CVE**, converted to **EUR** at the fixed peg
> **110.265 CVE = 1 EUR** (Canon §Business model — FACT/high, still verify).
> EUR figures are rounded for readability.
>
> **Canon anchors.** Positioning = independent trust-first digital
> infrastructure, five value layers (Information, Trust, Findability,
> Transactions/jobs, Process guidance). Pricing tiers and government models are
> taken verbatim from the Canon and extended only where explicitly labelled
> RECOMMENDATION.

---

## 1. Business Model Canvas

| Block | Content |
|---|---|
| **Customer segments** | (1) Individual professionals (builders, architects, surveyors, tradespeople). (2) Small businesses (construction firms, agencies). (3) Medium businesses. (4) Agents/*makelaars*. (5) Developers/*projectontwikkelaars*. (6) Suppliers (materials directory). (7) Property seekers/buyers/investors (incl. diaspora and foreign buyers). (8) Sellers/landowners. (9) Government bodies. (10) Institutional partners (banks, notaries). |
| **Value propositions** | For seekers: findable, trustworthy, plain-language property, building and public information across five layers. For professionals/businesses: verified visibility, qualified leads, tools, credibility badges. For government: makes official information findable, understandable and accessible — does **not** replace government (see `06-government-partnership.md`). For investors/diaspora: reduced uncertainty on ownership, tax and procedures (Canon KEY FACTS 3–6). |
| **Channels** | Public PWA (`apps/web`), WhatsApp-oriented notifications and concierge (Canon MVP), email/OTP, SEO/findability, professional referrals, government publication partnerships, island roadshows (São Vicente pilot → multi-island). |
| **Customer relationships** | Concierge-first (manual verification, onboarding, matchmaking, procedure guidance — Canon MVP), self-service PWA, community trust signals (verified reviews), tiered support by plan. |
| **Revenue streams** | Professional subscriptions (Free/Pro/Business), premium/featured listings, optional lead fees, verification fees, facilitated-job take rate (later), government SLA licences and PPP, ancillary (paid company profiles, quote bundles, market insights, API/data, sponsoring). See §3. |
| **Key resources** | Trust & verification system (L0–L5), curated information corpus (multilingual, source-linked), the technology platform (Next.js modular monolith, PostGIS), the moderation/verification team, brand credibility, government relationships. |
| **Key activities** | Information curation & translation, verification & moderation, matchmaking, product development, government liaison, trust governance, community growth. |
| **Key partnerships** | Government bodies (three models — Canon), NOSi/Autentika ecosystem (integration, to validate), notaries/Conservatória/INGT (data & process — FACT KEY FACTS 3), banks, professional associations, translation providers, payment/escrow providers (later). |
| **Cost structure** | Staff (largest), marketing, technology & hosting, verification, customer service/concierge, legal, local operations (São Vicente base + inter-island travel), payment providers. See financial model. |

---

## 2. Lean Canvas

| Block | Content |
|---|---|
| **Problem** | Property/building/public information in Cabo Verde is fragmented, hard to find, often untranslated and hard to trust; buyers (incl. diaspora/foreign) face uncertainty on ownership, tax and procedures; good professionals are hard to distinguish from bad ones. |
| **Customer segments** | See BMC §1. Early adopters (HYPOTHESIS): São Vicente/Mindelo professionals & agencies; diaspora buyers; foreign buyers on Sal/Boa Vista/São Vicente (Canon KEY FACT 7). |
| **Unique value proposition** | "The digital gateway to property, building and public information in Cabo Verde" — trust-first, independent, multilingual, five value layers. |
| **Solution** | Verified profiles & reviews (L0–L5), findable multilingual listings & info pages, procedure wizard, lead/quote flows, concierge support. |
| **Channels** | PWA, WhatsApp, SEO, government publication partnerships, professional referrals, island roadshows. |
| **Revenue streams** | See §3 (subscriptions, listings, verification, take rate later, gov licences, ancillary). |
| **Cost structure** | Staff, marketing, tech/hosting, verification, support, legal, local ops, payments. |
| **Key metrics** | Registered/active users, paid professionals, conversion, premium listings, leads/quotes, ARPU/ARPPU, MRR/ARR, churn/retention, CAC/LTV, take rate, gross margin, runway. |
| **Unfair advantage** | Trust infrastructure + curated multilingual official-information corpus + government relationships that are hard to replicate; first credible independent player; concierge-built data moat. |

---

## 3. Revenue streams compared

> **Design rule (Canon §Business model & Verification):** paid visibility NEVER
> buys verification, review scores, or manipulation of official information.
> Sponsored content is ALWAYS visibly labelled ("Patrocinado/Sponsored").

Legend for **When**: MVP = at pilot launch; Y2/Y3 = phased in later.

| # | Stream | Fit with model | Pros | Cons | When | Trust risk & mitigation |
|---|---|---|---|---|---|---|
| 1 | **Freemium (Free tier)** | Core acquisition funnel | Low barrier, network effects, fills catalogue | No direct revenue; support cost | MVP | Low. Must keep genuinely useful so trust isn't paywalled. |
| 2 | **Monthly subscriptions (Pro/Business)** | Primary recurring revenue | Predictable MRR, aligns with pro value | Requires ongoing value delivery | MVP | Low. Never bundle verification/review boosts. |
| 3 | **Annual subscriptions** | Retention & cash | Lower churn, upfront cash, discount lever | Discount dilutes ARPU | Y1 | Low. |
| 4 | **Listing fees (per listing)** | Property monetization | Simple, pay-per-use | Can suppress supply if basic listing not free | Basic free MVP; paid tiers Y1 | Medium — keep a free basic listing so catalogue stays complete. |
| 5 | **Premium listings** (5.000 CVE/30d) | Property monetization | High margin, clear value | Only valuable at listing volume | MVP | Low — labelled, does not alter ranking of official info. |
| 6 | **Featured/sponsored placement** | Visibility upsell | High margin | Erodes trust if opaque | Y1 | **High** — MUST be labelled "Patrocinado/Sponsored", capped share of results, never mixed into verified/official info. |
| 7 | **Lead fees (optional)** | Demand monetization | Pay-for-value, scales with activity | Can feel like double-charging subscribers | Y2 | Medium — transparent pricing, cap, credits; never sell the same lead to unlimited pros. |
| 8 | **Commission per job/transaction (take rate)** | Marketplace capture | Aligns with real value; scales | Needs escrow & trust; leakage off-platform | Y3 (after escrow) | Medium — only on facilitated jobs; disclosed; target 5–10% (Canon). |
| 9 | **Success fee** | Transaction capture | Pay only on outcome | Attribution disputes | Y3+ | Medium — clear T&Cs, requires escrow evidence. |
| 10 | **Verification fees (per level)** | Trust monetization | Funds the trust engine | Must NOT look like "buying trust" | MVP (L2/L3) | **High** — fee pays for *checking effort only*; passing is never guaranteed; failed checks still charged for work; criteria public. |
| 11 | **Paid company profiles** | SMB visibility | Simple, upsell | Overlaps with subscriptions | Y2 | Low — labelled, no verification uplift. |
| 12 | **Quote bundles (credits)** | Demand smoothing | Prepaid cash, predictable | Complexity | Y2 | Low. |
| 13 | **Project-management subscription (add-on)** | Pro tooling | Sticky, higher ARPU | Build cost | Y3 | Low. |
| 14 | **Government licences (SLA)** | B2G recurring | Stable, credibility halo | Long sales cycles; political risk | Y2 | Low — see gov doc; independence preserved. |
| 15 | **Public-private digital partnership (PPP)** | B2G strategic | Scale, legitimacy | Governance complexity | Y3+ | Medium — clear governance & independence guarantees. |
| 16 | **White-label** | Platform leverage / export | New markets (island states — Canon ambition) | Distraction from core | Y4+ | Low. |
| 17 | **API access** | Ecosystem monetization | High margin, partnerships | Support/security burden | Y3 | Medium — data governance, rate limits, contracts. |
| 18 | **Data services** | Aggregate insight | High margin | Privacy/consent (CNPD — Canon KEY FACT 8) | Y3 | **High** — only aggregated/consented; never resell personal data; legal verification required. |
| 19 | **Ads / sponsoring** | Ancillary | Fills funnel monetization | Clutter, trust erosion | Y2 | High — labelled, capped, never on official-info pages. |
| 20 | **Market insights / reports** | Ancillary | Diaspora/investor demand | Requires credible data | Y3 | Medium — methodology transparent; label ASSUMPTION vs FACT. |
| 21 | **Escrow / payment fees** | Transaction infra | Enables take rate; trust builder | Regulatory & operational load | Y3 | Medium — regulated handling; legal verification required. |
| 22 | **Referrals (partner commissions)** | Ancillary | Low effort | Conflict of interest | Y2 | High — disclose all referral relationships; never bias verified info. |

**Sequencing logic (RECOMMENDATION).** Start with streams that build trust and
catalogue (1–5, 10), add recurring depth (3, 11–12), then unlock
transaction/marketplace capture (7–9, 21) only once escrow and volume exist,
and layer B2G (14–15) and ecosystem/data (16–20) as credibility compounds.

---

## 4. Recommended price structure per customer type

> Canon-anchored prices are marked **[CANON]**. Extensions consistent with the
> canon are marked **[RECOMMENDATION]** and require **market validation**.
> EUR at 110.265.

| Customer type | Recommended plan | Price (CVE) | Price (EUR) | Notes |
|---|---|---|---|---|
| **Individual professional** | Free | 0 | €0 | **[CANON]** entry tier |
| | Pro | 2.500 /mo | €23 /mo | **[CANON]** |
| | Business | 7.500 /mo | €68 /mo | **[CANON]** |
| | Pro annual | 25.000 /yr | €227 /yr | **[RECOMMENDATION]** ≈2 months free |
| **Small business** | Business | 7.500 /mo | €68 /mo | **[CANON]** |
| | Business annual | 75.000 /yr | €680 /yr | **[RECOMMENDATION]** ≈2 months free |
| **Medium business** | Business+ | 15.000 /mo | €136 /mo | **[RECOMMENDATION]** more seats/listings/tools |
| **Agent (*makelaar*)** | Agent plan (Business + listing bundle) | 12.000 /mo | €109 /mo | **[RECOMMENDATION]** incl. premium-listing credits |
| **Developer (*projectontwikkelaar*)** | Developer plan | 25.000 /mo | €227 /mo | **[RECOMMENDATION]** project showcase + placements; or project-based |
| **Supplier (materials)** | Paid company profile | 5.000 /mo | €45 /mo | **[RECOMMENDATION]** directory listing, labelled |
| **Government body** | (1) Informal information partner | 0 (free/subsidised) | €0 | **[CANON]** model 1 |
| | (2) Official publication partner (SLA licence) | 150.000–250.000 /mo | €1.360–2.267 /mo | **[RECOMMENDATION]** model 2; scope-dependent |
| | (3) Public-private digital partnership (PPP) | custom | custom | **[CANON]** model 3 |
| **Institutional partner (bank/notary)** | API/data licence | from 100.000 /mo | from €907 /mo | **[RECOMMENDATION]** contract-based; L5 partner |

**Transactional / add-on pricing**

| Item | Price (CVE) | Price (EUR) | Label |
|---|---|---|---|
| Premium property listing (30 days) | 5.000 | €45 | **[CANON]** |
| Featured/sponsored placement (per week) | 3.000 | €27 | **[RECOMMENDATION]** always "Patrocinado/Sponsored" |
| Verification L2 (business/professional activity) | 1.500 | €14 | **[RECOMMENDATION]** fee = checking effort only |
| Verification L3 (documents) | 3.500 | €32 | **[RECOMMENDATION]** fee = checking effort only |
| Verification L4 (transaction/project) | via take rate | — | linked to escrow evidence |
| Verification L5 (institutional) | custom | — | partner contract |
| Lead fee (optional, per qualified lead) | 300–450 | €3–4 | **[RECOMMENDATION]** capped, credit-based |
| Quote bundle (10 quote credits) | 5.000 | €45 | **[RECOMMENDATION]** |
| Facilitated-job take rate | 5–10% of job value | — | **[CANON]** Y3+, after escrow |

---

## 5. Trust guardrails (non-negotiable)

Derived directly from Canon §Business model and §Verification levels.

1. **No paid verification.** Verification fees pay for the *effort of checking*
   evidence, never for the outcome. Passing is never guaranteed; failed checks
   are still billable for the work done; criteria are public. Paid tiers or ads
   NEVER raise a verification level.
2. **No paid reviews or score manipulation.** Review scores cannot be bought,
   removed for payment, or boosted. Only verified reviews count.
3. **Sponsored content always labelled.** Featured/sponsored placements carry a
   visible "Patrocinado/Sponsored" label, are capped as a share of any result
   set, and never appear inside official-information pages.
4. **Official information is never for sale.** Ranking, wording, or prominence
   of official/government information can never be altered by payment
   (see `06-government-partnership.md`).
5. **No personal-data resale.** Data services use only aggregated and/or
   consented data (CNPD regime — Canon KEY FACT 8; legal verification required).
6. **Disclosed referrals.** All referral/commission relationships are disclosed
   and never bias verified information or matchmaking.
7. **Free tier stays useful.** Core trust and findability are never fully
   paywalled — trust is the product, not an upsell.

---

## 6. Unit-economics definitions

> These definitions govern the numbers in `15-financial-model.md`. All are
> **ASSUMPTION**-level until pilot data exists (**market validation required**).

| Metric | Definition | Formula |
|---|---|---|
| **CAC** (Customer Acquisition Cost) | Fully-loaded cost to acquire one *paying* customer (primarily a paid professional) | (Attributable sales + marketing spend) ÷ new paying customers in period |
| **ARPU** | Average annual revenue per **active** user | Total revenue ÷ active users |
| **ARPPU** | Average annual revenue per **paying** professional | Subscription + add-on revenue ÷ average paying professionals |
| **LTV** (Lifetime Value) | Gross-margin value of a paying customer over their lifetime | (ARPPU × gross margin) ÷ annual churn rate |
| **LTV / CAC** | Efficiency of acquisition spend | LTV ÷ CAC — target **> 3×** (RECOMMENDATION) |
| **Churn (logo)** | Share of paying customers lost per period | Customers lost ÷ customers at start of period |
| **Gross revenue retention (GRR)** | Recurring revenue kept excluding upsell | (Start MRR − churned − contraction) ÷ start MRR |
| **Net revenue retention (NRR)** | Recurring revenue kept including upsell | (Start MRR − churned − contraction + expansion) ÷ start MRR |
| **Payback period** | Months to recover CAC from gross-margin contribution | CAC ÷ (monthly ARPPU × gross margin) |
| **Conversion** | Free → paid professional conversion | Paid professionals ÷ registered professionals |
| **Take rate** | Platform share of facilitated job value | Take-rate revenue ÷ facilitated GMV (target 5–10%, Canon) |
| **Lead value** | Revenue realised per delivered lead | Lead-fee revenue ÷ delivered leads (and, separately, value to the pro) |
| **Gross margin** | Revenue less direct cost of service | (Revenue − COGS) ÷ revenue, where COGS = hosting + payments + verification + support |
| **EBITDA** | Operating profit before interest, tax, D&A | Revenue − operating costs |
| **Runway** | Months of cash at current burn | Cash on hand ÷ monthly net burn |
| **Break-even** | First period with EBITDA ≥ 0 | — |

---

## 7. Cross-references

- Financial projections and scenario tables: `15-financial-model.md` (+ `15-financial-model.csv`).
- Government revenue model and independence guarantees: `06-government-partnership.md`.
- Verification levels and trust engine: Canon §Verification levels.
