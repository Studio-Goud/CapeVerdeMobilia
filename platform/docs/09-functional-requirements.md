# Djarvista — Functional & Non-Functional Requirements

**Document:** 09 — Functional Requirements
**Status:** Draft for validation
**Last updated:** 2026-07-20
**Owner:** Product / Engineering
**Canonical source:** `docs/canon.md`. Must remain consistent with the canon, `docs/07-product-requirements.md` and `docs/08-user-journeys.md`.

> Reliability labels: **FACT / ASSUMPTION / HYPOTHESIS / RECOMMENDATION**. Legal/tax/government items flagged "verification required". IDs: functional `FR-<Module>-<n>`, cross-cutting `FR-X-<n>`, non-functional `NFR-<Area>-<n>`. **Priority** uses MoSCoW from the canon.

---

## 1. Functional requirements by module

### Module A — Property & land

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-A-1 | Create/edit/delete a property or land listing with the Module A fields. | MUST | Owner can save a listing with all required fields; land is a first-class kind. |
| FR-A-2 | Submit listing to moderation before it is public. | MUST | New/edited listing enters `pending-review`; not publicly visible until approved. |
| FR-A-3 | Upload photos and documents with malware scan and signed URLs. | MUST | Uploads are scanned; only signed URLs served; unscanned files are not public. |
| FR-A-4 | Search, filter and map listings (PostgreSQL FTS + PostGIS). | MUST | Filtering by island, price (CVE), kind returns matching results and map pins. |
| FR-A-5 | Contact / lead form on a listing. | MUST | Visitor can send a lead; owner receives it via email + WhatsApp-oriented notification. |
| FR-A-6 | Premium listing + featured placement, always labelled "Patrocinado/Sponsored". | MUST (label) / SHOULD (billing) | Sponsored items render with a visible label everywhere they appear. |
| FR-A-7 | Show listing/owner verification level on cards and detail. | MUST | Verification badge reflects current level (L0–L5). |
| FR-A-8 | Favorites, saved-search alerts and listing comparison. | SHOULD | User can favorite, save a search that triggers alerts, and compare listings. |
| FR-A-9 | Display prices in CVE with EUR equivalent at fixed peg 110.265. | SHOULD | EUR value = CVE / 110.265, labelled as indicative. |

### Module B — Professionals & businesses

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-B-1 | Create/edit a professional profile (Module B fields). | MUST | Professional can complete and submit a profile. |
| FR-B-2 | Create/manage an organization profile with staff and org roles. | MUST | Business admin can add/remove staff and manage org listings/profiles. |
| FR-B-3 | Subscription tier selection (Free / Pro / Business). | MUST (selection) / SHOULD (billing) | Tier stored on profile; Pro ≈2.500 CVE/mo, Business ≈7.500 CVE/mo. |
| FR-B-4 | Directory search/filter by trade, service area, language, verification. | MUST | Filters return matching professionals/orgs. |
| FR-B-5 | Show verification badges and rating summary on profiles. | MUST | Badge + rating reflect current verification and verified reviews. |
| FR-B-6 | Professional can respond once to a review. | MUST | One response per review; visible under the review. |

### Module C — Reviews & trust

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-C-1 | Allow a verified review only for a completed job/lead. | MUST | Review creation blocked unless linked job is `completed`. |
| FR-C-2 | Route submitted reviews through moderation before publish. | MUST | Reviews are not public until approved. |
| FR-C-3 | Publish approved reviews labelled "Verified" and linked to the job (L4 signal). | MUST | Published review shows Verified label + job link; updates rating summary. |
| FR-C-4 | Anti-abuse checks (duplicate, spam, conflict-of-interest). | MUST | Flagged reviews held for moderator decision. |
| FR-C-5 | Paid visibility must never alter review scores. | MUST | No code path lets subscription/premium change ratings. |

### Module D — Government information

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-D-1 | Gov editor creates/edits draft procedure topics. | MUST | Editor can draft; drafts not public. |
| FR-D-2 | Attach official source text/document with preserved provenance. | MUST | Source text stored unaltered and linked; provenance recorded. |
| FR-D-3 | Enforce separation of duties: editor drafts, gov approver publishes. | MUST | Same user cannot both submit and approve; approval required to publish. |
| FR-D-4 | Version published content; retain prior versions. | MUST | Each publish gets a version; history retained and accessible. |
| FR-D-5 | Distinguish official text vs plain-language summary vs machine vs human translation. | MUST | Each content block is labelled with its type/provenance. |

### Module E — Procedure wizard

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-E-1 | Guided intake (island, goal, actor type). | MUST | Wizard collects intake and validates inputs. |
| FR-E-2 | Generate a plan with 8 outputs: steps, authorities, documents, professionals, risks, costs, timeline, checklist. | MUST | Plan renders all eight sections for a valid intake. |
| FR-E-3 | Reference verified professionals from Module B in the plan. | MUST | Suggested professionals are drawn from the directory (L2–L3 where relevant). |
| FR-E-4 | Label every legal/tax/cost item with reliability + "verification required" where unconfirmed. | MUST | No unlabelled legal/financial claim appears; sources cited. |
| FR-E-5 | Produce a downloadable/printable checklist and concierge hand-off. | MUST | User can export checklist and request concierge (WhatsApp-oriented). |

### Module F — Construction project management

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-F-1 | Project dashboard: milestones, documents, participants, status. | COULD | Client/pro can track a project (later phase). |

### Module G — Tenders & jobs

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-G-1 | Client posts a job with scope, budget (CVE), timeline, photos. | SHOULD | Job is created and discoverable/invited to pros. |
| FR-G-2 | Professionals submit quotes to a job. | SHOULD | Pro can submit a quote; client is notified. |
| FR-G-3 | Client compares quotes side-by-side with verification + rating. | SHOULD | Comparison view shows quotes with pro trust signals. |
| FR-G-4 | Completion unlocks verified review and L4 signal. | SHOULD | Marking a job completed enables Module C review flow. |
| FR-G-5 | Public tendering and facilitated-job take rate/escrow. | WON'T yet | Explicitly out of MVP; documented as later (needs escrow). |

### Module H — Building materials & suppliers

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-H-1 | Supplier directory with material categories and contact. | COULD | Users can browse suppliers by category and contact them. |
| FR-H-2 | Product pricing/availability. | WON'T yet (MVP) | Later; not required for pilot. |

---

## 2. Cross-cutting functional requirements

### 2.1 Accounts, auth & RBAC

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-X-1 | Registration/login via email + phone (OTP), optional social. | MUST | User can register/login with OTP. |
| FR-X-2 | MFA available; session management; device monitoring. | MUST | MFA can be enabled; sessions listed/revocable; new-device events recorded. |
| FR-X-3 | RBAC enforced across all canon roles and permissions. | MUST | Actions are permitted only per the role→permission matrix (PRD §8). |
| FR-X-4 | Separation of duties for gov editor/approver and moderation. | MUST | Enforced at permission layer (see FR-D-3). |

### 2.2 Trust & verification

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-V-1 | Support verification levels L0–L5 with evidence, validity, re-check, badge, limits, cost, escalation. | MUST (L0–L2, manual L3) / later (L4–L5) | Verification specialist can set/adjust a level with recorded evidence. |
| FR-V-2 | Verification is independent of payment. | MUST | No subscription/premium purchase changes a verification level. |
| FR-V-3 | Badges recompute when verification or completed-work status changes. | MUST | Badge updates on level change / L4 event. |
| FR-V-4 | Re-check/expiry handling per level. | SHOULD | Expired evidence downgrades the badge and flags re-check. |
| FR-V-5 | Fraud-risk flags and escalation path per level. | SHOULD | Suspicious evidence routes to verification specialist/moderator. |

### 2.3 Moderation

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-M-1 | Moderation queue for listings, profiles, reviews, reported content. | MUST | Moderators can approve/reject/hide with reason. |
| FR-M-2 | Human-in-the-loop; no AI auto-moderation without human. | MUST (WON'T-yet for auto) | Automated flags only assist; a human decides. |
| FR-M-3 | User reporting of listings, profiles, reviews. | MUST | Any user can report; report enters queue. |
| FR-M-4 | Audit trail of moderation actions. | MUST | Each action logs actor, target, reason, timestamp. |

### 2.4 Notifications

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-N-1 | Email notifications for key events (lead, quote, review invite, approval, verification). | MUST | Relevant events send an email to the right recipient. |
| FR-N-2 | WhatsApp-oriented messaging for the same key events. | MUST | WhatsApp-oriented channel supported (concierge/manual acceptable first). |
| FR-N-3 | Localized notifications in the user's language (pt/kea/en/nl/fr). | MUST | Notification content matches user language preference. |
| FR-N-4 | User notification preferences/opt-out where lawful. | SHOULD | User can manage channels; transactional messages exempt. |

### 2.5 Internationalization & content provenance

| ID | Requirement | Priority | Acceptance criterion |
|----|-------------|----------|----------------------|
| FR-I-1 | Full UI + content in pt (base), kea, en, nl, fr. | MUST | Language switcher changes UI and available content. |
| FR-I-2 | Preserve official source texts; link translations to source. | MUST | Official text never overwritten by a translation; link retained. |
| FR-I-3 | Label translation type: professional vs machine vs official vs plain-language. | MUST | Each translated block shows its provenance label. |
| FR-I-4 | Human pt/en + machine kea/nl/fr baseline for MVP. | MUST | MVP content meets this coverage; machine clearly labelled. |

---

## 3. Non-functional requirements (NFR)

### 3.1 Performance (slow connections)

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-PERF-1 | Usable on 3G / low-end phones. | Key pages interactive on emulated 3G ≤ 5 s (HYPOTHESIS — validate in pilot). |
| NFR-PERF-2 | Lean initial payload. | Initial route JS budget ≤ ~200 KB gzip (HYPOTHESIS — to tune); server-render key content. |
| NFR-PERF-3 | Efficient media. | Responsive/lazy-loaded images; modern formats; no full-res on list views. |
| NFR-PERF-4 | Caching. | Redis cache for hot reads; CDN for static assets. |

### 3.2 Scalability

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-SCALE-1 | Modular monolith scales for pilot→multi-island. | Handle pilot load with headroom; extraction path to NestJS documented (canon). |
| NFR-SCALE-2 | Search scales with catalogue. | Move PostgreSQL FTS → Meilisearch when relevance/volume require (canon). |

### 3.3 Security

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-SEC-1 | Secure auth. | OTP, MFA, session mgmt, device monitoring (canon). |
| NFR-SEC-2 | Safe uploads. | Malware scan on upload; signed URLs; no public unscanned objects. |
| NFR-SEC-3 | Least privilege / RBAC. | Enforced server-side, not just UI. |
| NFR-SEC-4 | Transport & secrets. | TLS everywhere; secrets managed; rate-limiting (Redis). |
| NFR-SEC-5 | Anti-abuse. | Rate-limit lead/review/job endpoints to deter spam/fraud. |

### 3.4 Privacy

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-PRIV-1 | RGPD-aligned handling under CNPD regime. | Data minimisation, purpose limitation, consent, retention (ASSUMPTION — canon fact #8; legal verification required). |
| NFR-PRIV-2 | Data-subject rights. | Support access/rectification/erasure requests (confirm scope with counsel). |
| NFR-PRIV-3 | Contact-data protection in informal market. | Allow approximate location / hidden address on listings. |

### 3.5 Internationalization

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-I18N-1 | Five languages, provenance-aware. | pt/kea/en/nl/fr; source-vs-translation labelling (see FR-I-*). |

### 3.6 Accessibility

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-A11Y-1 | WCAG 2.1 AA. | Meets AA: contrast, keyboard nav, focus, labels, alt text, semantic structure (FACT — canon). |
| NFR-A11Y-2 | Low-literacy / plain-language friendliness. | Plain-language summaries; icons + text; simple flows (RECOMMENDATION). |

### 3.7 Availability & resilience

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-AVAIL-1 | Environments + operations. | dev/test/staging/prod; backups, monitoring, logging, IR, DR (canon). |
| NFR-AVAIL-2 | Uptime. | Pilot availability ≥ 99.5% (HYPOTHESIS — set SLA). |
| NFR-AVAIL-3 | Backups/restore tested. | Regular backups; restore drills. |

### 3.8 Observability

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-OBS-1 | Structured logging + metrics + error tracking. | Key flows emit logs/metrics; errors captured (RECOMMENDATION, aligned to canon). |
| NFR-OBS-2 | Audit logging. | Moderation, verification, gov-publish, role changes audited. |

### 3.9 Mobile / offline tolerance

| ID | Requirement | Target / criterion |
|----|-------------|--------------------|
| NFR-MOB-1 | PWA, mobile-first. | Installable PWA; mobile-first layouts (canon). |
| NFR-MOB-2 | Offline-tolerant reads. | Recently viewed content/pages readable offline; graceful degradation on intermittent connectivity. |
| NFR-MOB-3 | Resilient forms. | Draft state preserved on connection loss for listing/job/review forms. |

---

## 4. Traceability (requirements → flows)

| Flow (doc 08) | Primary FRs |
|---------------|-------------|
| 1. Professional registers & publishes | FR-X-1, FR-B-1, FR-V-1, FR-M-1, FR-N-1/2 |
| 2. Publish property/land listing | FR-A-1..A-7, FR-M-1, FR-N-1/2 |
| 3. Post a job & compare quotes | FR-G-1..G-4, FR-N-1/2 |
| 4. Verified review after job | FR-C-1..C-5, FR-V-3, FR-M-1 |
| 5. Gov editor publishes procedure | FR-D-1..D-5, FR-X-4, FR-I-2/3 |
| Foreign buyer search & contact | FR-A-4/5/9, FR-I-1..4, FR-E-* |
| Procedure wizard (worked example) | FR-E-1..E-5, FR-B-4, FR-I-3 |

---

## 5. Open items requiring validation

| # | Item | Label | Owner action |
|---|------|-------|--------------|
| 1 | Performance budgets and availability SLA numbers. | HYPOTHESIS | Baseline in São Vicente pilot. |
| 2 | CNPD/data-protection obligations. | ASSUMPTION | Legal verification required (canon fact #8). |
| 3 | Government publishing partnership + SLA (Module D). | HYPOTHESIS | Government confirmation required. |
| 4 | Tax/cost figures used in wizard (cITI/cIPI, ~6% costs). | FACT/med-high + ASSUMPTION | Tax verification required (canon facts #4/#5). |
| 5 | WhatsApp-oriented channel implementation vs concierge-manual. | RECOMMENDATION | Decide MVP delivery mechanism. |

---

*End of functional & non-functional requirements.*
