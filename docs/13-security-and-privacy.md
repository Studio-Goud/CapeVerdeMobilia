# Djarvista — Security & Privacy

> **Status:** Strategy / design document, v0.1 · **Date:** 2026-07-20
> **Classification legend:** **FACT** (confirmed source) · **ASSUMPTION** (single/indirect source) · **HYPOTHESIS** (reasoned guess) · **RECOMMENDATION** (our advice)
> Unconfirmed items are marked *To validate / Legal verification required / Government confirmation required / Market validation required*.
> **Legal note:** Cabo Verde has a personal-data protection regime (RGPD-aligned) overseen by the data-protection authority **CNPD**; exact obligations must be confirmed with local counsel. (**ASSUMPTION — legal verification required.** Source: vpqadvogados.com guide, canon fact #8.) This document is engineering/operational guidance, **not legal advice**.

---

## 1. Scope & principles

This document defines how Djarvista protects data and systems across the five value layers (Information, Trust, Findability, Transactions/jobs, Process guidance). It covers the MVP modular monolith (Next.js 14 App Router, PostgreSQL + PostGIS, Prisma, Redis, S3-compatible storage) described in the project canon.

**Core principles (RECOMMENDATION):**

1. **Privacy by design & by default** — minimum data collected, least-privilege access, private defaults.
2. **Data minimization** — collect only what a value layer needs; prefer derived/aggregate over raw.
3. **Separation of official vs commercial data** — official government information is never silently mutated (see §11 and doc 14).
4. **Human-in-the-loop for high-impact decisions** — AI never autonomously certifies, deletes, or guarantees (see doc 14 §8).
5. **Defense in depth** — controls layered so no single failure is catastrophic.
6. **Auditability** — sensitive actions are logged immutably.

---

## 2. Data inventory & classification

Classification tiers used below:

- **C0 Public** — intended for open display (published listings, public professional profiles, official gov info pages).
- **C1 Internal** — operational data, low sensitivity if exposed.
- **C2 Confidential** — personal data; exposure harms an individual or business.
- **C3 Restricted** — special-category / high-risk identity, ID documents, ownership proofs, payment data; exposure is severe.

| # | Data category | Examples | Classification | Contains personal data? | Primary store | Retention (RECOMMENDATION — legal verification required) |
|---|---------------|----------|----------------|-------------------------|---------------|----------------------------------------------------------|
| 1 | **Account / personal data** | Name, email, phone, language, hashed password, MFA secrets, session/device metadata | C2 (MFA secrets C3) | Yes | PostgreSQL | Life of account + 30–90d grace after deletion request |
| 2 | **ID documents** | Passport, BI/national ID, residence permit scans (L1) | **C3** | Yes (special-risk) | S3 (encrypted, signed URLs) | Keep only until verification decision + minimal legal-hold window; store **verification result**, not raw doc, long-term |
| 3 | **Business documents** | Company registration (EASE/registry extracts), tax IDs, licences (L2) | C3 | Yes (natural-person owners) | S3 + PostgreSQL metadata | Duration of professional relationship + statutory period |
| 4 | **Property / land documents** | Listing docs, floor plans, energy/technical docs | C1–C2 | Sometimes | S3 | Life of listing + audit window |
| 5 | **Ownership proofs** | Conservatória do Registo Predial extracts, notarial deed references, INGT/LMITS references (L3) | **C3** | Yes | S3 + metadata | Until verification decision + legal-hold; store result + reference, not full copy, long-term |
| 6 | **Payment data** | Subscription/billing records, invoices, payment-proof uploads | **C3** | Yes | PSP (tokenized) + PostgreSQL refs | Statutory accounting period (**tax/legal verification required**) |
| 7 | **Messages** | In-platform chat, lead/contact forms, quote threads | C2 | Yes | PostgreSQL | Life of thread + dispute window; deletable on request subject to legal hold |
| 8 | **Location data** | Property coordinates (PostGIS), coarse user location for search | C1 (property) / C2 (user) | User loc: yes | PostgreSQL + PostGIS | Property: life of listing. User: session/short-lived |
| 9 | **Reviews** | Ratings, text, evidence uploads, review status, fraud score | C2 (evidence C3) | Yes (authorship) | PostgreSQL + S3 (evidence) | Life of review; see doc 14 for status lifecycle |
| 10 | **Government / official info** | gov.cv-sourced pages, procedure content, official texts | C0 | No | PostgreSQL (versioned) | Versioned indefinitely with source link |
| 11 | **Audit & access logs** | Who did what/when, admin actions, verification decisions | C2 | Yes (actor identity) | Append-only log store | Longer than operational data (see §5) |
| 12 | **Analytics / telemetry** | Pseudonymized usage events, performance metrics | C1 | Pseudonymized | Analytics store | Aggregate long-term; raw short window |

**FACT (canon):** ID documents, business docs, ownership proofs and payment data are inherent to the L1–L5 verification model and the hybrid business model — they are unavoidable and therefore must be treated as the highest-sensitivity assets.

---

## 3. Controls overview

| Control | What we do | Classification driver | Status |
|---------|-----------|-----------------------|--------|
| **Privacy by design** | Private defaults, minimal fields, purpose-bound collection, DPIA per feature touching C2/C3 | C2/C3 | RECOMMENDATION |
| **Data minimization** | Store verification *result* + reference instead of retaining raw ID/ownership docs long-term | C3 | RECOMMENDATION |
| **Encryption in transit** | TLS 1.2+ everywhere (HSTS), signed URLs for object access | All | RECOMMENDATION |
| **Encryption at rest** | DB volume encryption; S3 server-side encryption; app-level envelope encryption for C3 fields (MFA secrets, doc keys) | C2/C3 | RECOMMENDATION |
| **Secure file uploads** | Type/size allowlist, content-type sniffing, image re-encode, filename normalization, no execution path, quarantine bucket until scanned | C1–C3 | RECOMMENDATION (canon: malware scan on upload) |
| **Malware scanning** | Scan every upload before it leaves quarantine; block/flag on hit; log result | C1–C3 | FACT (canon) |
| **Access logs** | Log reads of C3 objects (ID/ownership/payment) with actor, purpose, timestamp | C3 | RECOMMENDATION |
| **Audit logs** | Append-only record of sensitive actions (verification, moderation, role change, deletion) | C2 | RECOMMENDATION |
| **Data retention** | Per-category schedule (§2); automated purge jobs; legal-hold override | All | RECOMMENDATION — legal verification required |
| **Account deletion** | Self-service request → soft delete + grace window → hard delete/anonymize | C2/C3 | RECOMMENDATION |
| **Breach procedure** | Detect → contain → assess → notify (CNPD + affected users where required) → remediate → post-mortem | All | RECOMMENDATION — legal verification required |
| **Backups** | Automated encrypted backups, tested restores, geo-separated copies | All | RECOMMENDATION (canon: backups/DR) |
| **Key management** | Managed KMS, envelope encryption, rotation policy, no keys in code | C3 | RECOMMENDATION |
| **Secrets management** | Vault/secret manager, per-env secrets, no secrets in repo, rotation on exposure | All | RECOMMENDATION |
| **Rate limiting** | Redis-backed per-IP/per-user/per-route limits on auth, uploads, messaging, search | All | RECOMMENDATION (canon: Redis rate-limit) |
| **Bot protection** | Challenge on signup/login/contact; velocity checks; disposable-email blocking | C1 | RECOMMENDATION |
| **Fraud prevention** | Duplicate-account detection, device/IP correlation, listing/review fraud scoring (see doc 14) | C2 | RECOMMENDATION |
| **Pentesting** | Pre-launch external pentest; annual + on major change | All | RECOMMENDATION |
| **Dependency scanning** | SCA in CI, lockfile audit, automated update PRs, SBOM | All | RECOMMENDATION |
| **Security headers** | HSTS, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy | All | RECOMMENDATION |
| **CSP** | Strict Content-Security-Policy, nonce-based scripts, no inline eval | All | RECOMMENDATION |

### 3.1 Encryption detail
- **In transit:** TLS 1.2+ with HSTS preload candidate; all object downloads via short-lived signed URLs (canon).
- **At rest:** storage-level encryption plus **application-level envelope encryption** for C3 fields; data keys wrapped by a KMS master key.

### 3.2 Secure uploads & malware scanning (canon requirement)
1. Client uploads to a **quarantine** bucket via signed URL.
2. Validate MIME/type/size against allowlist; images are re-encoded to strip metadata/payloads.
3. **Malware scan**; on clean → move to serving bucket; on hit → block, alert, log.
4. C3 documents (ID, ownership proof) are never publicly served — access only through RBAC-checked signed URLs, and every access is logged (§5).

### 3.3 Retention & deletion
- Each category has a retention clock (§2). **Store verification outcomes, not raw evidence,** wherever the outcome (a badge/decision) is what the platform actually needs.
- **Account deletion:** request → soft delete (login disabled, profile hidden) → grace window (30–90d, *to validate*) → hard delete or irreversible anonymization. Some records (invoices, audit logs, dispute evidence) may be retained under **legal hold** — this must be confirmed with counsel. (*Legal verification required.*)

### 3.4 Breach procedure (RECOMMENDATION — legal verification required)
`Detect → Contain → Assess severity & scope → Notify → Remediate → Post-mortem`
- Notification duties to **CNPD** and to affected data subjects, and any statutory deadline, **must be confirmed with local counsel**. For EU data subjects, GDPR-style expectations (e.g. 72-hour authority notification) should be treated as the planning baseline (§10).

---

## 4. RBAC matrix (roles × sensitive actions)

Roles per canon: `visitor, registered user, buyer, seller, investor, client (opdrachtgever), professional, business admin, agent (makelaar), developer (projectontwikkelaar), gov editor, gov approver, moderator, verification specialist, support, finance admin, platform admin, superadmin`.

Legend: ✅ allowed · 👁 read-only · ⚠ own-records only · ❌ denied · 🔴 dual-control (two-person). RBAC is enforced (canon).

| Sensitive action | visitor | registered/buyer/seller/investor/client | professional / business admin / agent / developer | gov editor | gov approver | moderator | verification specialist | support | finance admin | platform admin | superadmin |
|------------------|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| View public listings/info | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create/manage own listing | ❌ | ⚠ | ⚠ | ❌ | ❌ | ❌ | ❌ | ⚠(assist) | ❌ | ✅ | ✅ |
| Upload ID/ownership docs (C3) | ❌ | ⚠ | ⚠ | ❌ | ❌ | ❌ | ⚠(intake) | ⚠(assist) | ❌ | ⚠ | ⚠ |
| **View C3 verification evidence** | ❌ | ⚠(own) | ⚠(own) | ❌ | ❌ | ❌ | ✅(logged) | 👁(logged, scoped) | ❌ | 👁(logged) | 👁(logged) |
| **Approve/deny verification (L1–L4)** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Grant L5 institutional partner** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | 🔴 | ❌ | ❌ | 🔴 | ✅ |
| Publish/edit official gov info | ❌ | ❌ | ❌ | ✅(draft) | 🔴(approve/publish) | ❌ | ❌ | ❌ | ❌ | ⚠ | ✅ |
| Moderate/hide review or listing | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠ | 👁 | ❌ | ✅ | ✅ |
| **Delete review** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅(human, logged) | ❌ | ❌ | ❌ | ✅ | ✅ |
| Reply to review (right of reply) | ❌ | ⚠(own thread) | ⚠(own thread) | ❌ | ❌ | 👁 | 👁 | ⚠(assist) | ❌ | ✅ | ✅ |
| View another user's PII (C2) | ❌ | ❌ | ⚠(counterparty in active deal) | ❌ | ❌ | 👁(case) | 👁(case) | 👁(ticket) | 👁(billing) | 👁(logged) | ✅ |
| Change a user's role | ❌ | ❌ | ⚠(within own org) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| View/manage billing & payments | ❌ | ⚠(own) | ⚠(own/org) | ❌ | ❌ | ❌ | ❌ | 👁(ticket) | ✅ | 👁 | ✅ |
| Issue refund / adjust invoice | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ⚠ | ✅ |
| Export/bulk-download personal data | ❌ | ⚠(own DSAR) | ⚠(own DSAR) | ❌ | ❌ | ❌ | ⚠(case) | ⚠(ticket) | ⚠(billing) | 🔴 | 🔴 |
| Access audit logs | ❌ | ❌ | ❌ | ❌ | ❌ | 👁(scope) | 👁(scope) | 👁(scope) | 👁(billing) | ✅ | ✅ |
| Manage secrets/keys/infra | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠ | 🔴 |
| Hard-delete/anonymize account | ❌ | ⚠(request own) | ⚠(request own) | ❌ | ❌ | ❌ | ❌ | ⚠(initiate) | ❌ | ✅ | ✅ |

**Notes:** Bulk personal-data export, L5 grants, and infra/key management are **dual-control (🔴)** to prevent single-actor abuse. Every C3 access is logged (§5). `superadmin` is a break-glass role — access alerted and reviewed.

---

## 5. Access logs & audit logs

| Aspect | Access logs | Audit logs |
|--------|-------------|-----------|
| **Purpose** | Who *read* sensitive data (C3 docs, PII) | Who *changed* sensitive state (verification, moderation, roles, deletion, billing) |
| **Captured** | Actor, object, purpose, timestamp, request context | Actor, action, before/after, reason, timestamp |
| **Storage** | Append-only, tamper-evident | Append-only, tamper-evident |
| **Access** | platform admin / superadmin; scoped read for support/moderation/verification | Same |
| **Retention** | Longer than operational data (**legal verification required** for exact term) | Same |

**RECOMMENDATION:** audit entries are immutable and hash-chained so tampering is detectable; verification and moderation decisions always record a human reason (supports doc 14 human-in-the-loop rules).

---

## 6. Fraud prevention (security surface)

Detailed trust/verification and review-fraud logic lives in **doc 14**. Security-layer controls:

- **Duplicate / sockpuppet accounts:** device + IP + contact correlation; phone-OTP gating; velocity limits.
- **Listing fraud:** upload provenance checks, image reverse-similarity (HYPOTHESIS — later phase), L3 document verification before "verified" badges, human review for high-value listings.
- **Review fraud:** fraud scoring + status lifecycle (doc 14).
- **Payment/lead fraud:** anomaly checks on subscription/lead activity; finance-admin review.
- **Platform bypass/disintermediation:** pattern detection on contact exchange (see risk register, doc 19).

---

## 7. Threat model (STRIDE-style summary)

| STRIDE category | Representative threat | Primary controls |
|-----------------|-----------------------|------------------|
| **Spoofing** | Account takeover; fake professional/gov identity | Email+phone OTP, MFA, session/device monitoring, RBAC, verification L1–L5, bot protection |
| **Tampering** | Altering listings, ownership docs, official gov info, reviews | Input validation, audit logs, versioned official content + gov approver dual-control, immutable evidence store, RBAC |
| **Repudiation** | User/admin denies a sensitive action | Append-only hash-chained audit + access logs, signed actions, human-reason capture |
| **Information disclosure** | Leak of ID docs, ownership proofs, payment data, PII | Encryption in transit + at rest, envelope encryption for C3, signed URLs, least-privilege RBAC, access logging, quarantine for uploads |
| **Denial of service** | Flooding auth/search/upload; scraping | Rate limiting (Redis), bot protection, CDN/WAF (RECOMMENDATION), pagination limits |
| **Elevation of privilege** | User gains admin/gov/verification rights | Strict RBAC, dual-control for high-impact grants, secrets isolation, dependency scanning, security headers/CSP to blunt XSS→privilege chains |

**Trust-boundary hotspots (RECOMMENDATION):** (a) file-upload pipeline (C3 documents), (b) verification decision path, (c) official-gov-info publishing path, (d) payment/billing path, (e) admin console (`/apps/admin`). Each warrants focused review and monitoring.

---

## 8. Secure SDLC

- TypeScript strict, server-side validation (canon `@djarvista/validation`), no trust in client input.
- **Dependency scanning** (SCA) and **secret scanning** in CI; SBOM generated per build.
- **Security headers + strict CSP** enforced at the edge / Next.js middleware.
- Pre-launch **pentest**; then annual and on major change.
- Environment separation (development/test/staging/production per canon) with independent secrets.

---

## 9. Items requiring local legal validation (Cabo Verde / CNPD)

| Item | Why it needs validation | Status |
|------|-------------------------|--------|
| Lawful basis & consent model for each data category | CNPD/RGPD-aligned regime; exact obligations unconfirmed | **Legal verification required** |
| Retention periods (esp. ID docs, ownership proofs, invoices) | Statutory minimums/maximums unknown | **Legal verification required** |
| Breach-notification deadlines & recipients (CNPD, users) | Exact duty/timeline unconfirmed | **Legal verification required** |
| Cross-border transfer rules (S3 region, EU users, third-country PSP) | Transfer safeguards unconfirmed | **Legal verification required** |
| Handling of ID/ownership documents (registro predial, INGT/LMITS references) | Special-risk data; interaction with official registries | **Legal verification required** |
| DSAR / access-deletion rights & timelines | Data-subject rights under local regime unconfirmed | **Legal verification required** |
| DPO appointment & CNPD registration/notification duties | Obligation unknown | **Legal verification required** |

**FACT/ASSUMPTION basis:** the existence of a CNPD-overseen, RGPD-aligned regime is an **ASSUMPTION** from a single source (canon fact #8); every specific obligation above is therefore unconfirmed.

---

## 10. GDPR-alignment note for EU users

**RECOMMENDATION (HYPOTHESIS on applicability — legal verification required):** Djarvista targets foreign buyers/investors, many EU-based; EU GDPR may apply to processing of EU data subjects. Treat GDPR as the **planning baseline** and align with the local CNPD regime where stricter:

- Lawful basis per purpose; granular consent for optional processing.
- Data-subject rights: access, rectification, erasure, portability, objection — served via self-service DSAR + support.
- Records of processing (RoPA); DPIA for high-risk features (verification, C3 documents).
- Breach notification baseline: authority within ~72h where required; affected users without undue delay.
- International-transfer safeguards for storage/PSP outside the EEA.

This alignment is a **RECOMMENDATION**; actual GDPR applicability and the interaction with Cabo Verdean law **must be confirmed with counsel**.

---

## 11. Official vs commercial data integrity

Official government information (C0, sourced from **gov.cv** / legacy portals, canon fact #2) is **versioned and source-linked** and never silently altered. Editing follows the `gov editor → gov approver` dual-control path (§4). Commercial/indicative content is visually and structurally distinguished from official content in the UI (see doc 14 §7). **AI may not alter official documents or guarantee permits/ownership** (doc 14 §8).

---

## 12. Open items

- Choice of KMS/secret manager, malware-scanning engine, WAF/CDN provider — **RECOMMENDATION, to select**.
- Exact backup RPO/RTO targets — **to define** with DR plan.
- PSP selection and its data-residency implications — **to validate** (interacts with §9 transfer rules).
