# Djarvista

**The independent digital gateway to property, land, building and public information in Cabo Verde.**

This repository's **root is the live web app** — the trilingual (PT / EN / NL) Djarvista demo,
a self-contained Next.js 14 app (no database, fictional data). It deploys to Vercel with zero
config: the root is a plain Next.js project, so **Root Directory can stay empty**.

- `/pt`, `/en`, `/nl` with a language switcher (interface **and** content localized)
- Property & land search, professional profiles with verification badges, official-information
  centre and step-by-step procedure guides — all clearly labelled as demo/fictional.

> All content is fictional. Djarvista does not provide legal advice and does not replace public
> authorities. Brand/domain/trademark still require official confirmation.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000  -> redirects to /pt
```

## Deploy (Vercel)
The root of the repo is the Next.js app -> import into Vercel, **Root Directory empty**, Deploy.
The production branch builds automatically on every push.

---

## `platform/` — the full venture

The complete venture blueprint and MVP scaffold live in [`platform/`](platform/):

- `platform/docs/` — 26 strategy / product / technical / GTM documents (+ financial model CSV)
- `platform/apps` + `platform/packages` — the database-backed MVP monorepo (Next.js + Prisma + PostGIS)
- `platform/masterprompt.md` — the original founding brief
- `platform/README.md` — the full monorepo readme

See [`platform/docs/00-executive-summary.md`](platform/docs/00-executive-summary.md) to start.

---

*Djarvista — djar (island, in Kabuverdianu/Creole) + vista (view) -> "island view".*
