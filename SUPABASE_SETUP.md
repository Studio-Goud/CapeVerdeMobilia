# Djarvista — connect the real backend (Supabase)

The app runs in **demo mode** until you connect a database. Connecting takes ~5 minutes,
after which every future `git push` deploys the **real** app (accounts, listings, leads,
reviews all stored). Nothing else in the code needs to change.

## 1. Create a Supabase project
1. Go to <https://supabase.com> → **New project** (the free tier is enough to start).
2. Choose a name and a strong database password. Pick a region close to Cabo Verde
   (e.g. `West EU (London/Paris)`).

## 2. Create the database schema
1. In the project, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) and click **Run**.
   This creates the tables (`profiles`, `listings`, `leads`, `favorites`, `reviews`),
   the row-level-security policies, and the trigger that creates a profile on signup.

## 3. (Pilot only) email confirmation
By default Supabase emails a confirmation link on signup. For quick pilot testing you can
turn it off: **Authentication → Sign In / Providers → Email → uncheck “Confirm email”**.
For production, leave it on.

## 4. Copy your keys
**Settings → API**:
- **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
- **Project API keys → `anon` `public`** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

(The `service_role` key is secret and is **not** needed by this app — never expose it.)

## 5. Add the keys to Vercel
In the Vercel project: **Settings → Environment Variables**, add both variables for
**Production, Preview and Development**:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon public key |

Then **redeploy** (or just push any commit). The app now uses the real backend.

## 6. Make yourself an admin (optional)
After registering an account, open **SQL Editor** and run:
```sql
update public.profiles set role = 'admin' where id = (
  select id from auth.users order by created_at desc limit 1
);
```

## What works once connected
- Real accounts & login (private / business / admin), sessions persisted via secure cookies.
- Business users publish real listings (`/imoveis/novo`) — stored and shown publicly.
- Contact/lead forms write to the `leads` table (visible to the recipient).
- Favorites and reviews tables are ready (RLS-protected).

## Security notes
- All tables use **row-level security** — users can only read/write what they're allowed to.
- Only the `anon` public key ships to the browser; it is safe to expose (RLS enforces access).
- Sensitive verifications (L3+) are designed for **human review**, never AI-only.
