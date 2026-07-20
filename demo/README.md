# Djarvista — public demo (PT / EN / NL)

Self-contained Next.js 14 demo of the Djarvista platform, with **no database**
(fictional in-memory data). Trilingual via a `/[locale]` segment (`/pt`, `/en`, `/nl`)
and a language switcher. It mirrors the seed data of the full monorepo in the repo root.

## Run locally
```bash
cd demo
npm install
npm run dev   # http://localhost:3000  → redirects to /pt
```

## Deploy on Vercel (git-connected, auto-deploys on push)
Vercel → Add New… → Project → import `Studio-Goud/CapeVerdeMobilia` →
**Root Directory = `demo`** → Deploy. Framework (Next.js) is auto-detected.

All content is fictional. Djarvista does not provide legal advice.

<!-- deploy: trigger production build for djarvista.com -->
