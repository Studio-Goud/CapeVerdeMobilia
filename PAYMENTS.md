# Djarvista — verdienmodel & betalingen

Hoe het verdienmodel technisch is aangesloten, en wat er nodig is voor
geautomatiseerde betalingen. Uitgangspunt (`/precos`): **basis gratis** voor
inwoners; we verdienen aan wie waarde ontvangt (profissionais, empresas,
buitenlandse kopers, instellingen) via kleine, koopkracht-aangepaste tarieven.

## ✅ Wat er nu werkt (zonder betaalprovider)
**"Destacar / Feature listing"** — de eerste echte monetiseerbare lus, volledig
werkend zonder gateway (betaling voorlopig buiten het platform / handmatig):
1. Eigenaar klikt **Destacar** bij een advertentie (dashboard).
2. Dat maakt een `boost_requests`-rij (migratie **0017**).
3. Admin ziet de aanvraag onder **/admin → Destaques** en keurt goed.
4. Bij goedkeuring wordt `listings.is_featured = true` → de advertentie krijgt
   voorrang in de zoekresultaten (de query sorteert al op `is_featured`).

Dit is bewust een **request → mens keurt goed → voordeel**-lus (zoals verificatie):
je kunt zo nú al geld vragen (bijv. via overboeking/Vinti4/contant) en daarna
goedkeuren, zonder een betaal-integratie te hoeven bouwen.

## 🔜 Volledige, geautomatiseerde betalingen
Voor "klik → betaal → automatisch actief" is een **betaalprovider** nodig. Opties
voor Cabo Verde:

| Optie | Voor | Tegen |
|-------|------|-------|
| **Stripe** (of Mollie) | Makkelijk te integreren (Checkout), kaarten/Apple Pay | Werkt niet direct met CVE / geen CV-entiteit; je hebt een EU-bedrijf nodig, afrekening in EUR |
| **Vinti4** (nationaal kaartnetwerk CV) | Lokaal vertrouwd, in CVE | Vereist lokale acquirer/bank-partnerschap; geen kant-en-klare web-API |
| **Mobile money / overboeking + handmatig** | Nu al te doen, geen integratie | Handmatige goedkeuring (de boost-lus hierboch) |

**Aanbevolen route:** begin met de handmatige boost-lus (werkt vandaag). Zodra
er volume is, integreer **Stripe Checkout** (als er een EU-entiteit is) voor
kaartbetalingen van buitenlandse kopers/agencies, en houd een handmatige/lokale
route voor inwoners.

### Stripe-integratie (schets, wanneer je zover bent)
1. `npm i stripe` (server) — nooit de secret key client-side.
2. Server-route (bijv. `src/app/api/checkout/route.ts`) maakt een Stripe
   Checkout Session voor het product (featured-week, Pro-maand, …).
3. **Webhook** (`/api/stripe/webhook`) verifieert `checkout.session.completed` en
   zet dan `is_featured`/`plan` in Supabase (via de service-role, server-side).
4. Bewaar `stripe_customer_id` op `profiles`; modelleer abonnementen in een
   `subscriptions`-tabel met `status` + `current_period_end`.
5. Secrets als env-vars (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).

### Abonnementen (Pro / Empresa) — nog te bouwen
Nu indicatief op `/precos`. Technisch: voeg `plan` toe aan `profiles`
(`free|pro|agency`), laat de admin het (of de Stripe-webhook) zetten, en gate
features (bijv. aantal actieve advertenties, prioriteit, ingebouwde destaques).
De boost-lus is het eerste bouwsteentje; abonnementen zijn een logische
uitbreiding.

## Principe
Blijf eerlijk en koopkracht-bewust: laag voor inwoners, hoger voor internationale
klanten; de basis blijft gratis. Toon prijzen altijd als indicatief tot ze vast
staan (zoals nu op `/precos`).
