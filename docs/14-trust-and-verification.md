# Kavíla — Trust & Verification Model

> **Status:** Strategy / design document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> Unconfirmed items are marked *To validate / Legal verification required / Government confirmation required / Market validation required*.
> **Legal note:** Verification touches personal data, ID documents and ownership proofs under a CNPD/RGPD-aligned regime (**ASSUMPTION — legal verification required**, canon fact #8). Costs, cadences and evidence lists below are **RECOMMENDATION** unless marked otherwise.

---

## 1. Purpose

Trust is value layer #2 of Kavíla (canon). The platform is **trust-first, not a listings site**. This document specifies the **L0–L5 verification model**, the **verified-review system**, the **trust signals** surfaced in the UI, and the **human-in-the-loop rules** that constrain automation. Paid visibility **never** buys verification, review scores, or manipulation of official information (canon) — this is a hard invariant.

---

## 2. Verification levels L0–L5

**FACT (canon):** L0 not verified · L1 identity/contact · L2 business/professional activity · L3 documents (permits, registrations, certificates, title docs) · L4 transaction/project completed · L5 public/institutional partner (gov, bank, notary). Each level defines required evidence, validity, re-check, badge, limits, cost, fraud risk, escalation.

Costs below reference the canon currency peg (**110.265 CVE = 1 EUR**, fixed peg — high confidence, still verify) and are **RECOMMENDATION / market validation required**. MVP verifies L0–L2 with manual L3 (canon MoSCoW).

| Level | Meaning | Required evidence | Validity period | Re-check cadence | Badge | Limits (what it does NOT unlock) | Cost (RECOMMENDATION) | Fraud risk | Escalation |
|-------|---------|-------------------|-----------------|------------------|-------|----------------------------------|------------------------|-----------|-----------|
| **L0** | Not verified | None (email present) | n/a | n/a | *(none / "Unverified")* | No trust badge; limited visibility; cannot receive "verified" leads; reviews weighted low | Free | High (anonymous) | Auto-throttle; prompt to verify |
| **L1** | Identity & contact | Verified email **and** phone (OTP); one government ID (passport/BI/residence permit) matched to name | ID validity or ~24 months, whichever first (*to validate*) | On expiry, on risk flag, on major profile change | "Identity verified" | Does **not** confirm business, licence, ownership, or competence | Free (baseline) | Med (forged/borrowed ID) | To verification specialist; suspend on mismatch |
| **L2** | Business / professional activity | L1 + proof of active business or profession: registry extract (EASE/registry), tax ID, "Empresa no Dia"/Casa do Cidadão reference, or professional-body membership | ~12 months | Annual; on complaint spike | "Business verified" | Does **not** certify quality, specific permits, or ownership of any listed property | Free–Pro tier context; verification fee *to validate* | Med (shell/inactive entity) | Verification specialist; downgrade to L1 on lapse |
| **L3** | Documents (permits, registrations, certificates, title docs) | L2 + the specific document(s): building permit, professional certificate, or property **ownership proof** — Conservatória do Registo Predial extract, notarial deed reference, INGT/LMITS reference | Tied to document validity; else ~12 months | On document expiry; on dispute; periodic sample re-check | "Documents verified" *(scoped to the specific document/claim)* | Confirms **only the specific document sighted**, not general trustworthiness or a permit guarantee | Per-level verification fee *to validate* | **High** (document forgery, stale registry data) | **Manual specialist review**; legal escalation for suspected forgery |
| **L4** | Transaction / project completed | Evidence of a completed platform-facilitated transaction/project: both-party confirmation, invoice/payment proof, project ID | Per transaction (event-based) | n/a (historical fact) | "Completed on Kavíla" (count/history) | Confirms **that** a job/deal completed, not its quality (quality = reviews) | Included / take-rate context (later phase) | Med (collusive fake transactions) | Fraud scoring + specialist; revoke on collusion |
| **L5** | Public / institutional partner | Formal agreement with a public body, bank, or notary; official contact + signed partnership/SLA | Duration of agreement | Per agreement / annual | "Official partner" (distinct styling) | Confers institutional status **only within scope of the agreement**; not a blanket endorsement | Contractual (PPP/SLA context) | Low–Med (impersonation of officials) | **Dual-control grant**; platform admin + superadmin; **Government confirmation required** |

**Escalation path (RECOMMENDATION):** automated checks → verification specialist → moderator/platform admin → (for L5 / legal-forgery / registry conflicts) legal + institutional contact. Suspected document forgery at L3 or official impersonation at L5 is treated as a security incident (doc 13 §7).

**Cross-cutting rules:**
- A higher level **presupposes** the level below (L3 requires L2 requires L1).
- Levels are **scoped**: L3 "documents verified" attaches to the specific document/claim, never the whole person.
- **Paid tiers never raise verification level** (canon invariant).
- Verification stores the **result + reference**, not the raw document long-term (doc 13 §2, §3.3).

---

## 3. Verified review system

### 3.1 What makes a review "Verified"

A review's status reflects **how strongly the underlying interaction is evidenced**. A review qualifies as **Verified** when at least one strong proof-of-interaction condition is met and it passes fraud scoring:

| Proof-of-interaction signal | Strength | Notes |
|-----------------------------|----------|-------|
| Platform booking / job created on Kavíla | Strong | Native record of the interaction |
| Accepted quote (quote/job flow) | Strong | Reviewer accepted the reviewed party's quote |
| Invoice check | Strong | Invoice matching both parties + service |
| Payment proof | Strong | Uploaded/native payment evidence |
| Project ID | Strong | Links review to a tracked project |
| Document confirmation | Medium | Supporting doc confirms the engagement |
| **Both-party confirmation** | Strong | Both sides confirm the interaction happened |
| Manual check | Medium | Specialist confirms out-of-band interaction |
| Controlled invitation | Medium | Review left via a controlled post-interaction invite link, not open solicitation |

- **Verified** = strong evidence (or medium + manual check) **and** fraud score below threshold.
- **Unverified** = review allowed but clearly labelled; weighted lower; may be shown separately.
- Reviews are **never bought**: paid visibility cannot create, alter, or up-weight reviews (canon).

### 3.2 Review dimensions

Reviewers rate applicable dimensions (RECOMMENDATION set):

| Dimension | Meaning |
|-----------|---------|
| **Quality** | Standard of the delivered work/product |
| **Communication** | Responsiveness, clarity |
| **Reliability** | Kept commitments, showed up |
| **Planning** | Scheduling, sequencing, deadlines |
| **Value-for-money** | Outcome relative to price |
| **Professionalism** | Conduct, courtesy, ethics |
| **Aftercare** | Follow-up, warranty, snag resolution |

Not all dimensions apply to every interaction type; UI shows only relevant ones. An overall score is derived from completed dimensions.

### 3.3 Protection against review abuse

| Abuse vector | Control (RECOMMENDATION) |
|--------------|--------------------------|
| **Fake reviews** | Proof-of-interaction gating (§3.1); fraud scoring; only Verified reviews carry full weight |
| **Review trading** ("I review you, you review me") | Reciprocity-graph detection; flag mutual-review clusters |
| **Blackmail** ("pay or I 1-star you") | Report path; freeze disputed review; evidence review; treat extortion as ToS + possible legal escalation |
| **Duplicate accounts** | Device/IP/contact correlation; phone-OTP; one verified identity per person (doc 13 §6) |
| **Conflicts of interest** | Block self-review and reviews between linked accounts/same org; disclose relationships |
| **Competitor sabotage** | Anomaly detection on sudden negative bursts; require proof-of-interaction; hold suspicious reviews pending check |
| **Paid positive reviews** | Detect incentivized-review patterns; controlled-invitation only; penalize solicitation; canon invariant that visibility ≠ scores |

### 3.4 Review statuses & lifecycle

| Status | Meaning |
|--------|---------|
| **Draft** | Started, not submitted |
| **Pending** | Submitted, awaiting evidence/fraud check |
| **Verified** | Passed proof-of-interaction + fraud check; full weight |
| **Unverified** | Published but not evidence-backed; low weight, labelled |
| **Under review** | Flagged/disputed; human moderation in progress |
| **Held** | Temporarily hidden pending investigation (e.g. blackmail/sabotage) |
| **Rejected** | Failed checks / ToS violation; not published |
| **Removed** | Taken down after human review (reason logged) |
| **Replied** | Reviewed party exercised right of reply (thread visible) |

### 3.5 Fraud scoring

**RECOMMENDATION / HYPOTHESIS:** each review gets a fraud score from signals — account age/verification level, device/IP correlation, reciprocity graph, timing bursts, text similarity, rating outliers vs history, proof-of-interaction strength. Thresholds route reviews to Verified, Pending, or Under review. **AI may score and route but may not autonomously delete** (see §8).

### 3.6 Dispute, appeal, moderation & right of reply

1. **Report/dispute:** either party (or a third party) flags a review → status `Under review`.
2. **Evidence upload:** both parties may upload evidence (invoices, messages, project IDs); stored as C3 where sensitive (doc 13).
3. **Moderation:** a human **moderator** assesses against policy; verification specialist consulted for evidence authenticity.
4. **Decision:** keep / label / hold / remove — **always with a logged human reason** (doc 13 §5).
5. **Right of reply:** reviewed party may post one public reply per review regardless of outcome.
6. **Appeal:** a decision may be appealed once to a senior moderator/platform admin.
7. **Removal** requires human review; **AI cannot delete a review autonomously** (§8).

---

## 4. Trust signals surfaced in the UI

| Signal | Source | Displayed as |
|--------|--------|--------------|
| Verification level (L0–L5) | Verification model (§2) | Scoped badge with tooltip explaining exactly what is verified |
| Verified-review status | Review system (§3) | "Verified" tag on qualifying reviews; unverified shown separately/labelled |
| Dimension scores | Reviews (§3.2) | Per-dimension breakdown + overall |
| Completed-on-Kavíla history | L4 | Count / history of completed jobs |
| Official-partner status | L5 | Distinct "Official partner" styling |
| Sponsored/Featured | Business model | Always labelled **"Patrocinado/Sponsored"** (canon) |
| Official vs commercial info | Data model | Visual distinction (see §7) |
| Reliability labels | Content model | FACT / ASSUMPTION / official-text / plain-language markers where relevant |

**Invariant:** a badge states **what was checked and when**; it never implies more than its scope. Sponsored placement is visually separated from trust badges so buyers never confuse "paid" with "verified" (canon).

---

## 5. Official vs commercial / indicative information

**RECOMMENDATION** — enforce a consistent visual grammar so users can always tell apart:

| Type | Example | Visual treatment |
|------|---------|------------------|
| **Official government text** | gov.cv-sourced procedure/law text | "Official source" marker, source link, version/date, neutral/institutional styling, no edits without gov-approver dual-control (doc 13 §11) |
| **Plain-language summary** | Our explainer of an official procedure | Clearly labelled "Summary — not official", linked to official source |
| **Commercial / indicative** | Listing descriptions, price estimates, professional profiles | Commercial styling; "indicative" labels on estimates |
| **Sponsored** | Featured placement | Explicit "Patrocinado/Sponsored" label |

Machine vs professional vs official translation is also distinguished, with the official source text always preserved and linked (canon Languages).

---

## 6. Concierge & manual-first operations

**FACT (canon):** MVP verification and moderation are **manual-first / concierge** (verification, listing intake, onboarding, matchmaking, procedure guidance, WhatsApp support). Automation augments humans; it does not replace the decisions in §8.

---

## 7. Separation of paid visibility from trust

Hard invariants (canon):
- Paid subscriptions/placements **never** buy verification level, review scores, or better official-info treatment.
- All paid visibility is **visibly labelled**.
- Trust badges and Sponsored labels are **visually distinct** and never co-styled.

---

## 8. Human-in-the-loop rules — what AI may NOT do autonomously

**FACT/RECOMMENDATION (canon: "AI auto-moderation without human" is WON'T-yet).** AI may assist, draft, score, translate, and flag — but the following require a human decision:

| AI may NOT autonomously… | Why | Required human |
|--------------------------|-----|----------------|
| **Confirm legal ownership** of a property | Legal fact tied to Conservatória/INGT registries | Verification specialist + legal escalation |
| **Guarantee a permit** exists or is valid | Official/legal determination | Human + official source; **Government confirmation required** |
| **Give legal advice** | Regulated activity | Not provided; direct to qualified professional |
| **Alter official documents** or official gov text | Integrity of official record | gov editor draft → gov approver (dual-control) |
| **Auto-certify professionals** (grant a verification level) | Trust integrity | Verification specialist / platform admin |
| **Delete reviews** without human review | Due process, anti-abuse | Moderator (logged reason) |
| **Give financial guarantees** (returns, valuations as fact) | Financial-harm risk | Not provided; label estimates as indicative |

AI-assisted outputs in these areas are always **drafts pending human confirmation**, and the human decision is logged (doc 13 §5).

---

## 9. Items requiring validation

| Item | Type | Status |
|------|------|--------|
| Verification validity periods & re-check cadences | Operational | *To validate / market validation* |
| Verification fees per level | Pricing | *Market validation required* |
| Lawful basis for processing ID/ownership docs in verification | Legal | **Legal verification required** (CNPD) |
| Acceptable official evidence for L3 (registry/notary/INGT/LMITS formats) | Legal/operational | **Legal verification required** |
| L5 partnership terms & official contacts | Institutional | **Government confirmation required** |
| Review-dimension set & weighting | Product | *Market validation required* |
