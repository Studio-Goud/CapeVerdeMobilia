# Kavíla — Problem Analysis per Stakeholder

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** · **ASSUMPTION** · **HYPOTHESIS** · **RECOMMENDATION**. External claims cite the project canon (sources accessed **2026-07-20**). Unconfirmed items marked *to validate / verification required*.

---

## 0. Grounding facts (apply to every group)

- **Fragmented information & personal-network dependency.** No neutral, consolidated source for property, land, professional and public-procedure information; access runs through who-you-know. (**ASSUMPTION/med.**)
- **Foreign-buyer uncertainty.** Foreigners may buy freehold on national terms; ownership via **Conservatória do Registo Predial** and **public deed before a Notary**; **INGT** centralizes land registration; **LMITS** (built under the **MCC** compact) cut registration from months to weeks. (**FACT/med — legal verification required.**)
- **Informal market.** Much activity is undocumented and relationship-driven. (**ASSUMPTION/med.**)
- **Mobile-first audience.** **73.5%** internet penetration (387k), **115%** mobile connections (604k), 49.9% social media. (**FACT/high.** DataReportal, Jan 2025.)
- **Tax reform.** **IUP** repealed 1 Jan 2026 → **cITI** (transfer) + **cIPI** (ownership, 0.1%). (**FACT/med-high — tax verification required.**)
- **Digital government momentum.** **gov.cv** launched 24 Feb 2026; **CMDCV** e-signature; **NOSi** backbone; **Empresa no Dia** via **Casa do Cidadão**; **Cabo Verde TradeInvest** one-stop investor shop. (**FACT/high-med.**)

Each analysis below uses ten dimensions: *Current way of working · Frustrations · Risks · Time lost · Financial loss · Information need · Trust problems · Possible platform solution · Willingness to pay · Expected adoption barriers.* Time-lost and financial-loss figures are **HYPOTHESIS/ASSUMPTION unless a canon fact is cited** and require *market validation*.

---

## 1. Foreign buyer

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Searches from abroad via scattered agency sites, expat forums and word-of-mouth; relies on a single agent or contact for everything (**ASSUMPTION/med**) |
| **Frustrations** | Cannot tell which listings/agents are legitimate; unclear process, costs and counterparties; language barrier |
| **Risks** | Fraud, overpaying, buying land with title/registration defects; misunderstanding post-2026 tax (cITI/cIPI) |
| **Time lost** | Months of remote diligence and repeated trips (**HYPOTHESIS**); registration itself now weeks not months thanks to LMITS (**FACT/med**) |
| **Financial loss** | Deposits to non-genuine parties; ~6% transaction costs poorly understood (lawyer €500–1,500; notary ~€420; registration €200–300; stamp duty 0.8% — **ASSUMPTION/med, validate**) |
| **Information need** | Verified listings/agents; real process, cost and tax breakdown; freehold rules; translated official texts |
| **Trust problems** | No way to verify counterparties remotely; no neutral reference |
| **Possible platform solution** | Verified listings/professionals (L1–L3), multilingual sourced info, procedure wizard, concierge support |
| **Willingness to pay** | **High** — premium on de-risking and guidance (**HYPOTHESIS**) |
| **Expected adoption barriers** | Trust in a new brand; preference for a known personal contact; needs seeded verified inventory |

---

## 2. Local buyer

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Relies on family/community networks, drive-by "vende-se" signs, informal referrals (**ASSUMPTION/med**) |
| **Frustrations** | Limited visibility of what's available; opaque pricing; procedure confusion |
| **Risks** | Title/registration defects; informal deals without documentation; tax-rule changes |
| **Time lost** | Weeks of asking around; repeated trips to offices (**HYPOTHESIS**) |
| **Financial loss** | Overpaying without comparables; avoidable procedural costs (**HYPOTHESIS**) |
| **Information need** | Available listings, fair pricing signals, step-by-step buying procedure |
| **Trust problems** | Trusts people, not platforms; wary of scams |
| **Possible platform solution** | Findable verified listings, price context, procedure wizard, verified reviews |
| **Willingness to pay** | **Low-Med** — expects free access; may pay for premium/leads indirectly (**HYPOTHESIS**) |
| **Expected adoption barriers** | Habit of personal networks; low trust in online transactions; *market validation required* |

---

## 3. Seller

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Word-of-mouth, signage, one or more agents on informal terms (**ASSUMPTION/med**) |
| **Frustrations** | Limited reach beyond personal circle; hard to reach foreign buyers; no credible way to signal legitimacy |
| **Risks** | Time-wasting/unqualified enquiries; deals falling through on documentation |
| **Time lost** | Prolonged time-on-market; fielding unserious contacts (**HYPOTHESIS**) |
| **Financial loss** | Lower sale price from limited buyer pool; carrying costs while unsold (**HYPOTHESIS**) |
| **Information need** | How to reach qualified/foreign buyers; what documents/verification build buyer confidence |
| **Trust problems** | Buyers can't verify the seller or the property is genuine |
| **Possible platform solution** | Listings with verification badges, map/findability, qualified lead routing |
| **Willingness to pay** | **Med** — premium listing (~5.000 CVE/30d) if it demonstrably reaches buyers (**HYPOTHESIS**) |
| **Expected adoption barriers** | Reluctance to document/verify; skepticism until reach is proven; *market validation required* |

---

## 4. Landowner

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Holds land often with informal/incomplete registration; sells via local contacts (**ASSUMPTION/med**) |
| **Frustrations** | Registration and boundary uncertainty; hard to prove clean title; conditional rules on agricultural land |
| **Risks** | Disputed boundaries/title; inability to transact until INGT registration resolved; agricultural-land restrictions |
| **Time lost** | Lengthy registration/clarification at Conservatória/INGT (LMITS has shortened this — **FACT/med**) |
| **Financial loss** | Depressed value or unsellable parcels due to title defects (**HYPOTHESIS**) |
| **Information need** | Registration status, how to formalize title, what land types foreigners may buy |
| **Trust problems** | Buyers fear unregistered/disputed land |
| **Possible platform solution** | Document verification (L3), procedure wizard for registration, PostGIS mapping of parcels |
| **Willingness to pay** | **Low-Med** — may pay for verification/premium on a specific sale (**HYPOTHESIS**) |
| **Expected adoption barriers** | Sensitivity around informal/unregistered holdings; reluctance to expose title status |

---

## 5. Real-estate agent (makelaar)

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Own contacts, social media, personal website or none; overlapping informal mandates (**ASSUMPTION/med**) |
| **Frustrations** | Hard to stand out; reputation not portable; competes with unverified operators |
| **Risks** | Association with scams damages credibility; lead leakage; disputed commissions |
| **Time lost** | Chasing unqualified leads; duplicating listing effort across channels (**HYPOTHESIS**) |
| **Financial loss** | Lost deals to better-connected competitors; marketing spend with weak return (**HYPOTHESIS**) |
| **Information need** | Qualified leads, credible profile, verification to differentiate |
| **Trust problems** | Buyers can't distinguish reputable agents from opportunists |
| **Possible platform solution** | Verified professional profile (L2), verified reviews, lead routing, Pro/Business subscription tools |
| **Willingness to pay** | **Med-High** — core subscriber; Pro (~€23) / Business (~€68) if leads/reputation deliver (**HYPOTHESIS**) |
| **Expected adoption barriers** | Fear the platform disintermediates them; subscription cost before proven ROI |

---

## 6. Project developer (projectontwikkelaar)

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Markets developments through agents, own channels and investor networks (**ASSUMPTION/med**) |
| **Frustrations** | Reaching credible domestic and foreign investors; conveying project legitimacy and permits |
| **Risks** | Slow sales/pre-sales; permit and title scrutiny; reputational risk if associated with unverified market |
| **Time lost** | Long marketing/sales cycles for units and phases (**HYPOTHESIS**) |
| **Financial loss** | Carrying costs on unsold inventory; financing pressure (**HYPOTHESIS**) |
| **Information need** | Investor demand signals; how to showcase permits/verification; buyer procedure clarity |
| **Trust problems** | Investors wary of off-plan risk and undocumented projects |
| **Possible platform solution** | Verified organization profile (L2–L3), project listings, document verification, (later) project dashboard |
| **Willingness to pay** | **High** — Business tier, premium/featured placement, verification (**HYPOTHESIS**) |
| **Expected adoption barriers** | Prefers established investor relationships; wants proof of qualified reach first |

---

## 7. Architect

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Commissions via referral and reputation; limited online presence (**ASSUMPTION/med**) |
| **Frustrations** | Reputation not visible to newcomers/foreign clients; hard to be discovered |
| **Risks** | Under-utilization; association with unqualified builders undermines outcomes |
| **Time lost** | Business development through personal networks (**HYPOTHESIS**) |
| **Financial loss** | Missed commissions from clients who couldn't find/verify them (**HYPOTHESIS**) |
| **Information need** | Qualified client leads; credible credential display |
| **Trust problems** | Clients (esp. foreign) can't verify qualifications/portfolio |
| **Possible platform solution** | Verified professional profile (L2–L3 credentials), portfolio, reviews, lead routing |
| **Willingness to pay** | **Med** — Pro tier for visibility and credibility (**HYPOTHESIS**) |
| **Expected adoption barriers** | Views referral as sufficient; skeptical of platform value until leads arrive |

---

## 8. Contractor

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Wins work by word-of-mouth; quotes informally; coordinates trades personally (**ASSUMPTION/med**) |
| **Frustrations** | Hard to prove reliability to distant/foreign clients; payment and scope disputes |
| **Risks** | Non-payment; scope creep; reputational damage from disputes |
| **Time lost** | Bidding, site visits, chasing materials and trades (**HYPOTHESIS**) |
| **Financial loss** | Unpaid work; underbidding without cost transparency (**HYPOTHESIS**) |
| **Information need** | Qualified project leads; clear scope/quote tools; reputation building |
| **Trust problems** | Clients fear unreliable builders; contractors fear non-paying clients |
| **Possible platform solution** | Verified profile (L2), verified reviews, quote/job flow, (later) escrow + take rate |
| **Willingness to pay** | **Med** — Pro/Business; take-rate acceptable once escrow protects payment (**HYPOTHESIS**) |
| **Expected adoption barriers** | Cash/informal habits; distrust of platform fees; needs payment protection first |

---

## 9. Tradesperson (electrician, plumber, mason, etc.)

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Local reputation, phone/WhatsApp, cash jobs (**ASSUMPTION/med**) |
| **Frustrations** | Feast-or-famine workflow; no way to show reliability beyond immediate area |
| **Risks** | Non-payment; irregular income; no formal record of work quality |
| **Time lost** | Idle gaps between jobs; travel to unqualified enquiries (**HYPOTHESIS**) |
| **Financial loss** | Lost income in slow periods; unpaid small jobs (**HYPOTHESIS**) |
| **Information need** | Nearby job leads; simple reputation/verification |
| **Trust problems** | Clients can't verify skill/reliability; no review history |
| **Possible platform solution** | Verified profile (L1–L2), reviews, job matching, WhatsApp-oriented notifications |
| **Willingness to pay** | **Low-Med** — Free/Pro; sensitive to any fee (**HYPOTHESIS**) |
| **Expected adoption barriers** | Low digital/admin appetite; cash-first culture; smartphone-only workflows — mobile-first essential |

---

## 10. Building-materials supplier

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Physical shop, phone orders, repeat local customers (**ASSUMPTION/med**) |
| **Frustrations** | Limited discovery by out-of-area projects; price/stock opacity |
| **Risks** | Missed demand from developers/contractors who can't find them |
| **Time lost** | Manual quoting and order-taking by phone (**HYPOTHESIS**) |
| **Financial loss** | Lost sales to better-known suppliers (**HYPOTHESIS**) |
| **Information need** | Reach to active projects; way to advertise catalogue/availability |
| **Trust problems** | Buyers unsure of stock, pricing and reliability |
| **Possible platform solution** | Verified business profile (L2), materials directory (COULD), lead routing |
| **Willingness to pay** | **Med** — directory listing/subscription if it drives project demand (**HYPOTHESIS**) |
| **Expected adoption barriers** | Directory is COULD-scope, not MVP; needs project-side critical mass first |

---

## 11. Municipality

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Handles permits, land and local info via in-person offices and (increasingly) gov.cv (**FACT/high-med** on gov.cv) |
| **Frustrations** | Repetitive citizen queries; information scattered; limited digital reach to citizens/investors |
| **Risks** | Misinformation circulating unofficially; uneven service; capacity constraints |
| **Time lost** | Staff time on repeat questions and manual guidance (**HYPOTHESIS**) |
| **Financial loss** | Administrative inefficiency (not a direct P&L loss) (**HYPOTHESIS**) |
| **Information need** | A neutral channel to publish accurate local procedure/permit information |
| **Trust problems** | Citizens rely on rumor when official info is hard to find |
| **Possible platform solution** | Government info pages, procedure wizard, informal → official information partnership |
| **Willingness to pay** | **Low** initially — free/subsidised info partner; SLA licence later (**HYPOTHESIS**) |
| **Expected adoption barriers** | Procurement/governance rules; caution partnering with a private platform; *government confirmation required* |

---

## 12. National government

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Driving digitization via gov.cv (launched 24 Feb 2026), CMDCV e-signature, NOSi backbone; targets 60% of vital services online by 2026, >80% by 2030 (**FACT/high-med**) |
| **Frustrations** | Last-mile citizen reach; consistent multilingual information; private-sector formalization |
| **Risks** | Adoption gaps; informal market outside official visibility; misinformation |
| **Time lost** | (Institutional) slow digitization of the long tail of services (**HYPOTHESIS**) |
| **Financial loss** | Untaxed/informal transactions; inefficiency (**HYPOTHESIS**) |
| **Information need** | A complementary, aligned private channel that preserves official texts and drives citizens toward formal processes |
| **Trust problems** | Must ensure any partner preserves official-source integrity |
| **Possible platform solution** | Aligned info pages, procedure guidance funneling to gov.cv/CMDCV; PPP pathway (informal → official → PPP) |
| **Willingness to pay** | **Med (later)** — SLA licence / PPP once value proven (**HYPOTHESIS**) |
| **Expected adoption barriers** | Political/procurement complexity; neutrality and data-governance scrutiny; *government confirmation required* |

---

## 13. Notary / lawyer

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Executes public deeds and legal diligence; client acquisition via referral (**FACT/med** on deed role; **ASSUMPTION** on acquisition) |
| **Frustrations** | Clients arrive with incomplete documents/understanding; foreign clients hard to reach |
| **Risks** | Deals collapsing on defective title/documents; reputational exposure |
| **Time lost** | Correcting client misunderstandings; incomplete files (**HYPOTHESIS**) |
| **Financial loss** | Lost/aborted engagements; inefficient intake (**HYPOTHESIS**) |
| **Information need** | Better-prepared, verified clients; a channel to reach foreign buyers |
| **Trust problems** | Clients unsure how to find a reputable notary/lawyer; verify independence |
| **Possible platform solution** | Verified professional profile (L2), procedure wizard that prepares clients, L5 institutional partner path |
| **Willingness to pay** | **Med** — professional listing/verification for qualified referrals (**HYPOTHESIS**) |
| **Expected adoption barriers** | Professional-conduct/advertising norms; caution about platform association; *legal verification required* |

---

## 14. Bank / financier

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Assesses property finance via branch relationships and manual diligence (**ASSUMPTION/med**) |
| **Frustrations** | Property/title data quality; verifying collateral and counterparties; reaching qualified borrowers |
| **Risks** | Collateral/title defects; fraud; poor origination pipeline |
| **Time lost** | Manual verification of documents and property status (**HYPOTHESIS**) |
| **Financial loss** | Bad loans; missed lending to under-served buyers (**HYPOTHESIS**) |
| **Information need** | Reliable property/verification data; qualified borrower/buyer flow |
| **Trust problems** | Data reliability and counterparty verification |
| **Possible platform solution** | Verified listings/documents as a data signal; L5 institutional partner; (later) mortgage marketplace — WON'T yet |
| **Willingness to pay** | **Med-High (later)** — data/partnership/origination value (**HYPOTHESIS**) |
| **Expected adoption barriers** | Regulatory/compliance rigor; mortgage marketplace explicitly out of MVP; data-governance scrutiny |

---

## 15. Tourism entrepreneur

| Dimension | Detail |
|-----------|--------|
| **Current way of working** | Acquires/develops property for hospitality via agents and personal networks (**ASSUMPTION/med**) |
| **Frustrations** | Finding suitable tourism/commercial property; understanding foreign-ownership and incentives; assembling a trades team |
| **Risks** | Buying unsuitable/defective property; misjudging permits and tax (cITI/cIPI); build quality |
| **Time lost** | Sourcing property, professionals and suppliers across fragmented channels (**HYPOTHESIS**) |
| **Financial loss** | Overpayment; project delays; procedural costs (**HYPOTHESIS**) |
| **Information need** | Tourism/commercial listings, foreign-ownership & incentive rules (TradeInvest), verified professionals/suppliers |
| **Trust problems** | Verifying property, professionals and processes from a distance |
| **Possible platform solution** | Verified listings, professional/supplier discovery, procedure wizard, concierge for investors |
| **Willingness to pay** | **High** — willing to pay for de-risking and end-to-end guidance (**HYPOTHESIS**) |
| **Expected adoption barriers** | Prefers trusted advisors; needs proven verified inventory and professional depth |

---

## 16. Cross-cutting problems Kavíla solves

The fifteen analyses converge on a small set of systemic problems. These are what the platform is fundamentally built to address:

1. **Fragmentation of information.** No neutral, consolidated, multilingual source for property, land, professional and public-procedure information. → **Value Layer 1 (Information):** government info pages, sourced multilingual content.
2. **Dependence on personal networks.** Access to deals, work and reliable counterparties runs through who-you-know, excluding outsiders (especially foreign buyers) and limiting reach for sellers/professionals. → **Layers 3–4 (Findability, Transactions/jobs):** search/map, verified profiles, lead routing.
3. **Absence of verifiable trust.** No systematic way to know which listings, professionals, documents or counterparties are genuine. → **Layer 2 (Trust):** verification L0–L5 and verified reviews, with paid visibility never buying trust.
4. **Foreign-buyer uncertainty.** High-value, high-willingness-to-pay buyers are blocked by unclear process, cost, tax and counterparty legitimacy. → **Layers 2 + 5 (Trust + Process guidance):** verified counterparties, procedure wizard, concierge.
5. **Opaque administrative procedures.** Buying, building and registering involve steps that are hard to discover and sequence. → **Layer 5 (Process guidance):** procedure wizard aligned to gov.cv/INGT/Conservatória/Casa do Cidadão.
6. **Informality and weak documentation.** Undocumented land/title, cash jobs and informal mandates create risk and depress value. → **Layers 2 + 4:** document verification (L3), quotes/jobs, and later escrow to formalize.
7. **A mobile audience underserved by desktop-era channels.** With 73.5% internet and 115% mobile penetration (**FACT/high**), the market is reachable — but only through a mobile-first, low-bandwidth, WhatsApp-oriented experience. → **Product principle:** mobile-first PWA, WCAG 2.1 AA.

**Net thesis (RECOMMENDATION):** Kavíla's defensible value is the combination of **consolidated information + explicit trust + process guidance** delivered mobile-first and independently. Any single layer already exists somewhere in weak form; the **integration under a neutral, trust-first brand** is the opportunity — and the reason the São Vicente pilot must prove the full information → trust → findability → lead loop before scaling.

---

*This document is a strategy artifact, not legal, tax or investment advice. All willingness-to-pay, time-lost and financial-loss estimates are hypotheses requiring market validation. Items marked "verification required" must be confirmed with qualified local professionals before any public claim or commitment.*
