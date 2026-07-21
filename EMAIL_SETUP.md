# Djarvista — branded auth emails (custom SMTP)

Goal: confirmation / login / reset emails that come **from Djarvista**, are branded,
land in the inbox, and whose links work (no more `localhost`). Do these once.

App side is ready: the `/auth/callback` route handles the confirmation/login/reset
links, and the branded templates live in [`supabase/email-templates/`](supabase/email-templates/).

---

## Step 1 — Fix the link target (kills the localhost error)
Supabase → **Authentication → URL Configuration**:
- **Site URL**: `https://www.djarvista.com`
- **Redirect URLs** → add: `https://www.djarvista.com/auth/callback`

## Step 2 — Choose an email provider
**Recommended: [Resend](https://resend.com)** — free tier (3,000 emails/month), simple domain
verification. (Alternative: your SiteGround mailbox SMTP — see bottom.)

## Step 3 — Verify the domain `djarvista.com` in Resend
1. Resend → **Domains → Add Domain** → `djarvista.com`.
2. Resend shows a few DNS records (SPF/`TXT`, DKIM `CNAME`s, and a return-path).
3. Add those records in **SiteGround → Domain → DNS Zone Editor** exactly as shown.
4. Wait for Resend to show the domain as **Verified** (usually minutes).

## Step 4 — Get SMTP credentials
Resend → **API Keys → Create** (or the SMTP tab). You'll use:
- Host: `smtp.resend.com`
- Port: `465` (SSL) — or `587` (TLS)
- Username: `resend`
- Password: **your Resend API key**

## Step 5 — Enable custom SMTP in Supabase
Supabase → **Authentication → Emails → SMTP Settings** → enable **Custom SMTP**:

| Field | Value |
| --- | --- |
| Sender email | `no-reply@djarvista.com` (must be on the verified domain) |
| Sender name | `Djarvista` |
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | your Resend API key |

This fixes the **"Supabase Auth"** sender name → it becomes **Djarvista**, and lifts the
tiny built-in rate limit.

## Step 6 — Paste the branded templates
Supabase → **Authentication → Emails → Templates**. For each, paste the matching file
and set a subject:

| Template | File | Suggested subject |
| --- | --- | --- |
| Confirm signup | `supabase/email-templates/confirm-signup.html` | `Confirme o seu email · Confirm your email — Djarvista` |
| Magic Link | `supabase/email-templates/magic-link.html` | `O seu link de acesso · Your login link — Djarvista` |
| Reset Password | `supabase/email-templates/reset-password.html` | `Repor a palavra-passe · Reset your password — Djarvista` |

The templates build the link as
`{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=…&next=/pt/painel`,
which the app's `/auth/callback` route verifies and then sends the user to their dashboard.

## Step 7 — Test
Register a new account on `https://www.djarvista.com` → you get a **branded email from
Djarvista** → click → you land logged in on `/pt/painel`. 🎉

---

### Alternative: SiteGround mailbox SMTP
If you'd rather use a `@djarvista.com` mailbox you already host at SiteGround:
create a mailbox (e.g. `no-reply@djarvista.com`), then in Supabase custom SMTP use
SiteGround's outgoing server (shown in **Site Tools → Email → Accounts → Mail
Configuration**), port `465`, the full email as username and its password. Note SiteGround
has stricter sending limits than a transactional provider like Resend.
