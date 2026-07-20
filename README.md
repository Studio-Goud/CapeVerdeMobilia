# Kavíla

**The independent digital gateway to property, land, building and public information in Cabo Verde.**

Kavíla connects citizens, professionals, investors and public bodies on one trust-first platform.
It combines a property & land marketplace, a verified professionals & construction marketplace, a
review/trust layer, and an official government-information centre with step-by-step procedure
guides — starting with a pilot on **São Vicente**.

> **Status:** early-stage venture blueprint + MVP scaffold. This repository contains the full
> business/product/technical documentation **and** a runnable monorepo skeleton for the MVP.
> All market figures, procedures and legal/tax details are **grounded in cited public sources or
> explicitly labelled as assumptions** — see [`/docs/25-open-questions.md`](docs/25-open-questions.md).
> Kavíla does not provide legal advice and does not replace public authorities.

---

## Why this exists

On São Vicente there is land, building potential and international interest — but information about
plots, ownership, zoning, permits, procedures, agents, contractors and trustworthy professionals is
fragmented, hard to find, and dependent on personal networks. Cabo Verde has strong connectivity
(internet penetration **~73.5%**, mobile connections **~115%** of population — DataReportal, Jan 2025)
and an accelerating digital-government programme (**gov.cv** launched Feb 2026; target 60% of public
services online by 2026). Kavíla turns that fragmentation into a transparent, mobile-first,
multilingual platform. See [`/docs/00-executive-summary.md`](docs/00-executive-summary.md).

## The five value layers

1. **Information** — official + indicative, clearly distinguished
2. **Trust** — L0–L5 verification, verified reviews, fraud protection
3. **Findability** — search, filters, map, multilingual
4. **Transactions & jobs** — leads, quotes, projects
5. **Process guidance** — procedure wizard and step-by-step guides

---

## Repository layout

```text
/apps
  /web        Next.js 14 public PWA (mobile-first, pt/kea/en/nl/fr)
  /admin      Ops & moderation console
/packages
  /ui         Shared React components (trust badges, official tags, cards)
  /database   Prisma schema (PostgreSQL + PostGIS), client, seed
  /auth       Password/OTP/session helpers + RBAC
  /config     Validated environment config (zod) + CVE↔EUR helpers
  /types      Shared domain/DTO types
  /validation Zod input schemas (single source of truth for API validation)
  /i18n       Message catalogues + translation provenance
  /analytics  Typed, privacy-conscious event facade
/docs         26 strategy/product/tech/GTM documents (see index below)
/infrastructure  Postgres init / deployment assets
/scripts      Dev tooling (setup.sh)
```

## Tech stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript **strict**, Tailwind CSS, PWA, WCAG 2.1 AA
- **Backend:** Modular monolith via Next route handlers / server actions (extraction to NestJS later)
- **Data:** PostgreSQL + **PostGIS**, Prisma ORM, Redis (cache/queues); Postgres FTS → Meilisearch later
- **Auth:** email + phone (OTP), MFA, RBAC, session management
- **Storage:** S3-compatible object storage (malware-scanned uploads, signed URLs)
- **Monorepo:** pnpm workspaces + Turborepo

Rationale and the "when to split the monolith" triggers are in
[`/docs/10-technical-architecture.md`](docs/10-technical-architecture.md).

---

## Quick start (local)

**Prerequisites:** Node 20+, pnpm 9+, Docker.

```bash
# 1. Boot infra, install, migrate, seed (fictional data only)
bash scripts/setup.sh

# — or manually —
cp .env.example .env
docker compose up -d postgres redis minio
pnpm install
pnpm db:generate
pnpm db:migrate                 # creates the initial migration
psql "$DATABASE_URL" -f packages/database/prisma/sql/search_and_geo.sql   # PostGIS + FTS
pnpm db:seed

# 2. Run the web app
pnpm --filter @kavila/web dev   # http://localhost:3000
pnpm --filter @kavila/admin dev # http://localhost:3001
```

### Common scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run all apps in dev (Turborepo) |
| `pnpm build` | Build everything |
| `pnpm typecheck` | Strict TS across the monorepo |
| `pnpm lint` | ESLint (flat config) |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm --filter @kavila/web test:e2e` | Playwright smoke tests (needs seed + server) |
| `pnpm db:seed` / `pnpm db:reset` | Seed / reset the database |

> **Security note:** the scaffold's password hashing is a salted-SHA-256 **placeholder** so the repo
> builds with no native step. Replace with argon2id/bcrypt before any real deployment
> (flagged in [`/docs/13-security-and-privacy.md`](docs/13-security-and-privacy.md)). No real
> personal data is used anywhere; all seed data is fictional.

---

## Working MVP flows (implemented or scaffolded)

1. **Search & contact** — home → `/imoveis` search/filter → listing detail → lead form (`POST /api/leads`)
2. **Professionals** — `/profissionais` with verification badges and verified-review counts
3. **Post a job** — `/pedidos/novo` → `POST /api/jobs` (RBAC-guarded: `job.create`)
4. **Verified reviews** — seeded job → accepted quote → completed contract → verified review with evidence
5. **Official procedures** — `/procedimentos` and `/info` with provenance tags (official vs platform summary)

See [`/docs/08-user-journeys.md`](docs/08-user-journeys.md) for all flows and acceptance criteria.

---

## Documentation index

| # | Document |
| --- | --- |
| — | [Project canon (single source of truth)](docs/_canon.md) |
| 00 | [Executive summary](docs/00-executive-summary.md) |
| 01 | [Vision & mission](docs/01-vision-and-mission.md) |
| 02 | [Problem analysis](docs/02-problem-analysis.md) |
| 03 | [Market analysis](docs/03-market-analysis.md) |
| 04 | [Competitor analysis](docs/04-competitor-analysis.md) |
| 05 | [Business model](docs/05-business-model.md) |
| 06 | [Government partnership](docs/06-government-partnership.md) |
| 07 | [Product requirements](docs/07-product-requirements.md) |
| 08 | [User journeys](docs/08-user-journeys.md) |
| 09 | [Functional requirements](docs/09-functional-requirements.md) |
| 10 | [Technical architecture](docs/10-technical-architecture.md) |
| 11 | [Data model](docs/11-data-model.md) |
| 12 | [API design](docs/12-api-design.md) |
| 13 | [Security & privacy](docs/13-security-and-privacy.md) |
| 14 | [Trust & verification](docs/14-trust-and-verification.md) |
| 15 | [Financial model](docs/15-financial-model.md) · [CSV](docs/15-financial-model.csv) |
| 16 | [Go-to-market](docs/16-go-to-market.md) |
| 17 | [Pilot — São Vicente](docs/17-pilot-sao-vicente.md) |
| 18 | [Product roadmap](docs/18-product-roadmap.md) |
| 19 | [Risk register](docs/19-risk-register.md) |
| 20 | [KPI framework](docs/20-kpi-framework.md) |
| 21 | [Brand strategy](docs/21-brand-strategy.md) |
| 22 | [Investor pitch content](docs/22-investor-pitch-content.md) |
| 23 | [Government pitch content](docs/23-government-pitch-content.md) |
| 24 | [Validation & interviews](docs/24-validation-interviews.md) |
| 25 | [Open questions & sources register](docs/25-open-questions.md) |

## Evidence & honesty policy

Every external claim in the docs carries a **source, an accessed date (2026-07-20) and a reliability
label** (FACT / ASSUMPTION / HYPOTHESIS / RECOMMENDATION). Items requiring local confirmation are
marked *"Legal verification required"*, *"Government confirmation required"* or *"Market validation
required"*. No laws, tax rates, market sizes, partners or contacts are invented.

## License

MIT — see [LICENSE](LICENSE).
