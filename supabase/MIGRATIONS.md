# Djarvista — database migrations (run in order)

Run each file's SQL once in **Supabase → SQL Editor**. They are idempotent
(safe to re-run). The app degrades gracefully (demo fallback) for anything not
yet migrated, so the live site never breaks while you catch up.

| # | File | Adds | Status |
|---|------|------|--------|
| 0001 | `migrations/0001_init.sql` | profiles (+ signup trigger), listings, leads, favorites, reviews + RLS | ✅ done |
| 0002 | `migrations/0002_storage_verification.sql` | storage buckets (`listing-photos` public, `verification-docs` private), `verification_requests` | ✅ done |
| 0003 | `migrations/0003_listing_photos.sql` | `listings.photos` (photo gallery) | ✅ done |
| 0004 | `migrations/0004_rentals_and_admin.sql` | `rental_requests`, `is_admin()`, admin/trust RLS | ✅ done |
| 0005 | `migrations/0005_messages.sql` | `messages` (chat between rental parties) | ✅ done |
| 0006 | `migrations/0006_publications.sql` | `publications` + `publication_flags` (official info centre) + seeds | ✅ done |
| 0007 | `migrations/0007_admin_delete_listings.sql` | admin delete policy on `listings` (moderators can remove listings) | ✅ done |
| 0008 | `migrations/0008_publications_seed.sql` | refresh + expand info-centre seeds (sourced tenancy/tax/buying summaries) | ✅ done |
| 0009 | `migrations/0009_security_hardening.sql` | **security**: block self-promote to admin, self-verify reviews, rental-request injection | ✅ done |
| 0010 | `migrations/0010_publications_construction.sql` | building-permit info article (RNOTPU / DL 57/2015 / PDM) | ✅ done |
| 0011 | `migrations/0011_publications_tenancy_rights.sql` | rent/deposit/updates rights-and-duties article (RGAU / INE) | ✅ done |
| 0012 | `migrations/0012_professionals.sql` | real professionals directory (business users own a profile) + RLS | ✅ done |
| 0013 | `migrations/0013_suppliers.sql` | real materials-suppliers directory (+ admin-only `verified`) + RLS | ✅ done |
| 0014 | `migrations/0014_tenders.sql` | real tenders + bids (concursos), public bid count | ✅ done |
| 0015 | `migrations/0015_projects.sql` | real construction-project portfolio (projetos) | ✅ done |
| 0016 | `migrations/0016_tender_bid_guards.sql` | only bid on open tenders; bidders can withdraw (patch to 0014) | ✅ done |
| 0017 | `migrations/0017_boost_requests.sql` | boost/feature-listing requests (revenue loop) + RLS | ✅ done |
| 0018 | `migrations/0018_featured_guard.sql` | **security**: only admins set is_featured; dedup pending boosts | ✅ done |
| 0019 | `migrations/0019_claimable_profiles.sql` | claimable "phone-book" directory profiles (seeded from public sources, owner can claim; admin approves via `approve_claim`) | ⏳ **to run** |
| 0020 | `migrations/0020_seed_sao_vicente.sql` | seed: 25 real São Vicente businesses (20 professionals + 5 suppliers), unclaimed + sourced. Sources in `SEED_0020_SOURCES.md`. Run **after** 0019 | ⏳ **to run** |
| 0021 | `migrations/0021_seed_bomclima.sql` | add Bomclima, Lda (AC/refrigeration, São Vicente) — locally confirmed, sourced from its Facebook page. Run **after** 0020 | ⏳ **to run** |

## Roles
- Make yourself admin (trust/ops + info editor):
  ```sql
  update public.profiles set role = 'admin'
  where id = (select id from auth.users where email = 'you@example.com');
  ```

## Email (branded auth mails)
See `EMAIL_SETUP.md` — custom SMTP (Resend) is configured; templates live in
`email-templates/`.
