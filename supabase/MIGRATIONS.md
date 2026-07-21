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

## Roles
- Make yourself admin (trust/ops + info editor):
  ```sql
  update public.profiles set role = 'admin'
  where id = (select id from auth.users where email = 'you@example.com');
  ```

## Email (branded auth mails)
See `EMAIL_SETUP.md` — custom SMTP (Resend) is configured; templates live in
`email-templates/`.
