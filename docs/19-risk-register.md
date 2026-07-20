# Kavíla — Risk Register

> **Status:** Strategy document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> All entries are **RECOMMENDATION / ASSUMPTION** risk assessments unless a cited FACT is noted. Items marked *Legal / Government / Market verification required* need local validation.

---

## 1. Scoring method

- **Likelihood:** Low / Medium / High — chance of occurring in the pilot-to-national horizon.
- **Impact:** Low / Medium / High — severity to users, trust, or the business if it occurs.
- **Priority:** derived (High impact + Med/High likelihood → **P1**; else **P2**; low/low → **P3**).
- Controls follow the standard split: **Preventive** (stop it), **Detective** (notice it), **Corrective** (fix it).
- **Owner** references canon roles / functions (platform admin, finance admin, verification specialist, moderator, gov-partnerships, security, product).

This register is **RECOMMENDATION**; likelihood/impact are HYPOTHESIS estimates pending market and legal validation.

---

## 2. Risk register

| # | Risk | Category | Likelihood | Impact | Priority | Preventive control | Detective control | Corrective control | Owner |
|---|------|----------|:-:|:-:|:-:|--------------------|-------------------|--------------------|-------|
| 1 | **No government cooperation** (official-info / L5 partnership fails) | Strategic / Institutional | High | High | **P1** | Start as informal info partner (canon gov path stage 1); independent value first; multiple islands/bodies in parallel; **Government confirmation required** | Track partnership-stage KPIs; monitor gov.cv changes | Pivot to citizen/professional value; use public sources with clear labelling; re-approach via alternate body | Gov-partnerships / platform admin |
| 2 | **Insufficient supply** (too few listings/professionals) | Market / Growth | High | High | **P1** | Concierge listing intake (canon manual-first); free basic tier; seed via agents/developers | Supply KPIs per island; search-with-no-results tracking | Targeted onboarding, incentives, manual matchmaking | Product / growth |
| 3 | **Insufficient users** (too little demand) | Market / Growth | Med | High | **P1** | Sequence foreign buyers first (highest WTP); mobile-first PWA (73.5% internet, 115% mobile — FACT); multilingual | Funnel & retention analytics; DAU/MAU | Reposition messaging; channel focus; WhatsApp-oriented outreach (canon) | Product / growth |
| 4 | **Fake listings** | Trust / Fraud | High | High | **P1** | Verification L1–L3 before "verified" badge; upload validation; human review for high-value | Fraud scoring; duplicate/image checks; user reports | Take down; suspend account; escalate to moderator/security | Verification specialist / moderator |
| 5 | **Property fraud** (selling property one doesn't own / forged title) | Trust / Legal | Med | High | **P1** | L3 ownership proof via Conservatória/INGT/LMITS references (FACT/med — legal verification required); AI may NOT confirm ownership (doc 14 §8) | Registry cross-check; forgery detection; dispute reports | Freeze listing; legal escalation; report to authorities | Verification specialist / legal |
| 6 | **Fake reviews** | Trust / Fraud | High | Med | **P1** | Proof-of-interaction gating; Verified-only full weight (doc 14 §3) | Fraud scoring; reciprocity-graph; anomaly bursts | Human moderation; label/hold/remove with logged reason | Moderator |
| 7 | **Liability** (harm from wrong info / bad intro) | Legal / Reputational | Med | High | **P1** | Clear FACT/ASSUMPTION labels; "not legal advice"; official-vs-commercial distinction; ToS disclaimers | Complaint monitoring; content-accuracy review | Correct/withdraw content; right of reply; legal response | Legal / platform admin |
| 8 | **Outdated government info** | Content / Trust | High | Med | **P1** | Versioned source-linked official content (doc 13 §11); gov.cv monitoring (unified portal launched 24 Feb 2026 — FACT) | Freshness checks; source-diff alerts; user "report outdated" | Re-fetch/update; mark stale; gov-approver re-publish | Gov editor / gov approver |
| 9 | **Slow verification** (backlog harms UX) | Operational | Med | Med | **P2** | Manual-first with clear SLAs; tiered evidence; L0–L2 fast path (canon) | Queue-time metrics; SLA breach alerts | Add specialist capacity; prioritize by risk/value | Verification specialist / ops |
| 10 | **Low willingness to pay** | Financial / Market | Med | High | **P1** | Freemium; value before paywall; Pro ≈2.500 CVE, Business ≈7.500 CVE (canon — market validation required) | Conversion & churn analytics | Adjust pricing/packaging; add lead/verification value | Finance admin / product |
| 11 | **Informal market structure** (deals off-platform, low doc culture) | Market / Structural | High | Med | **P2** | Concierge guidance; procedure wizard; make on-platform easier than informal | Engagement vs drop-off analytics | Education; incentives to formalize; WhatsApp support | Product / growth |
| 12 | **Political sensitivity** (neutrality, gov relations) | Strategic / Reputational | Med | High | **P1** | Position as **independent** neutral infrastructure (canon); no partisan content; transparent labelling | Media/social monitoring; stakeholder feedback | Clarify neutrality; corrective comms; stakeholder engagement | Platform admin / gov-partnerships |
| 13 | **Data privacy** (breach of PII/ID/ownership/payment data) | Security / Legal | Med | High | **P1** | Privacy by design; encryption in transit+at rest; least-privilege RBAC; minimization (doc 13); **CNPD legal verification required** | Access/audit logs; anomaly detection; DPIA | Breach procedure: contain→assess→notify CNPD/users→remediate (doc 13 §3.4) | Security / DPO (to appoint) |
| 14 | **Cyber-attacks** (ATO, DoS, injection, scraping) | Security | Med | High | **P1** | MFA, rate limiting, bot protection, CSP/security headers, dependency scanning, pentest (doc 13) | WAF/IDS logs; alerting; pentest findings | Incident response; patch; rotate secrets/keys; restore from backup | Security / platform admin |
| 15 | **Reputational damage** | Reputational | Med | High | **P1** | Trust-first design; verification & moderation; transparent labelling | Sentiment/review monitoring; complaint trends | Crisis comms; remediate root cause; public correction | Platform admin |
| 16 | **Professional-vs-client disputes** | Operational / Trust | High | Med | **P2** | Clear quote/job terms; both-party confirmation; evidence uploads; right of reply (doc 14) | Dispute-rate metrics; flag repeat offenders | Structured dispute/appeal path; mediation; sanctions | Moderator / support |
| 17 | **Platform disintermediation** (users bypass to avoid fees) | Financial / Product | High | Med | **P2** | Deliver on-platform value (trust, escrow later, verified reviews tied to platform jobs); reasonable fees | Contact-exchange pattern detection; leakage analytics | Feature/pricing adjustment; enforce ToS; incentivize on-platform | Product / finance admin |
| 18 | **Payment problems** (failed/fraudulent payments, PSP issues) | Financial / Security | Med | Med | **P2** | Tokenized PSP; no raw card data; billing validation; escrow deferred (canon) | Payment anomaly monitoring; reconciliation | Retry/refund flow; PSP fallback; finance review | Finance admin |
| 19 | **FX risk** (CVE/EUR exposure, pricing) | Financial | Low | Med | **P3** | Price in CVE; rely on fixed peg 110.265 CVE=1 EUR (FACT high — still verify); EUR references for foreign buyers | Peg/regulatory monitoring | Re-price if peg changes; hedge if material (later) | Finance admin |
| 20 | **Dependence on local partners** (islands, intake, gov liaisons) | Operational / Strategic | Med | High | **P1** | Avoid single-partner lock-in; document processes; multi-island approach (São Vicente pilot → national) | Partner-performance KPIs; concentration tracking | Diversify partners; bring capability in-house; contingency onboarding | Platform admin / ops |

---

## 3. Priority summary

| Priority | Risks |
|----------|-------|
| **P1 (act now)** | 1 No gov cooperation · 2 Insufficient supply · 3 Insufficient users · 4 Fake listings · 5 Property fraud · 6 Fake reviews · 7 Liability · 8 Outdated gov info · 10 Low WTP · 12 Political sensitivity · 13 Data privacy · 14 Cyber-attacks · 15 Reputational · 20 Partner dependence |
| **P2 (plan)** | 9 Slow verification · 11 Informal market · 16 Prof-vs-client disputes · 17 Disintermediation · 18 Payment problems |
| **P3 (monitor)** | 19 FX risk |

---

## 4. Items requiring local validation

| Risk | Validation needed |
|------|-------------------|
| 1, 8, 12 | **Government confirmation required** — partnership scope, official-info licensing, neutrality expectations |
| 5, 7, 13 | **Legal verification required** — ownership/title handling, liability exposure, CNPD data-protection obligations |
| 10, 19 | **Market / financial validation required** — pricing, willingness-to-pay, currency peg confirmation |
| 2, 3, 11, 16, 17 | **Market validation required** — supply/demand, informal-market behavior, disintermediation propensity |

---

## 5. Notes

- Likelihood/Impact are **HYPOTHESIS** estimates; refresh after the São Vicente pilot with real data.
- Cross-references: security/privacy controls in **doc 13**; verification and review-fraud controls in **doc 14**.
- The register should be reviewed at each phase gate (pilot → multi-island → national → export) and after any incident.
