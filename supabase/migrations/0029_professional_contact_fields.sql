-- 0029 — richer professional profiles: specialization + public contact fields.
-- Lets a service business present itself fully: the branch is `category`, plus
-- an optional specialization, a street address, a WhatsApp number and a public
-- email. All optional and nullable. Idempotent — safe to run more than once.

alter table public.professionals add column if not exists specialization text;
alter table public.professionals add column if not exists address        text;
alter table public.professionals add column if not exists whatsapp        text;
alter table public.professionals add column if not exists email           text;
