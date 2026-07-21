-- 0007 — allow admins to delete any listing (trust/ops moderation).
-- Owners can already delete their own listings (0001). This adds an admin
-- override so moderators can remove policy-violating or fraudulent listings.
-- Idempotent: safe to re-run.

drop policy if exists "listings admin delete" on public.listings;
create policy "listings admin delete" on public.listings
  for delete to authenticated using (public.is_admin());
