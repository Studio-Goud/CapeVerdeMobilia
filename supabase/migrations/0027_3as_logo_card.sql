-- 0027 — use the official 3 AS logo (on a clean banner) as the supplier card
-- image instead of the storefront photo. Site-hosted. Idempotent. Run after 0026.

update public.suppliers
   set thumbnail = 'https://www.djarvista.com/suppliers/3as/logo-card.jpg'
 where slug = '3as' and user_id is null;
