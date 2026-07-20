#!/usr/bin/env bash
# One-shot local setup for Kavíla. Requires Docker + Node 20 + pnpm 9.
set -euo pipefail

echo "▸ Copying .env.example -> .env (if missing)"
[ -f .env ] || cp .env.example .env

echo "▸ Starting local infrastructure (postgres, redis, minio)"
docker compose up -d postgres redis minio

echo "▸ Installing dependencies"
pnpm install

echo "▸ Generating Prisma client"
pnpm db:generate

echo "▸ Running migrations"
pnpm db:migrate

echo "▸ Seeding fictional demo data"
pnpm db:seed

echo "✓ Done. Start the web app with: pnpm --filter @kavila/web dev"
