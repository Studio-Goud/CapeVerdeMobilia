# Djarvista · verdienmodel & betalingen

Hoe het verdienmodel technisch is aangesloten, en wat er nodig is voor
geautomatiseerde betalingen. Uitgangspunt (`/precos`): **basis gratis** voor
inwoners; we verdienen aan wie waarde ontvangt (profissionais, empresas,
buitenlandse kopers, instellingen) via kleine, koopkracht-aangepaste tarieven.

## Hoe betaalt de Kaapverdiaanse gemeenschap? (onderzoek, juli 2026)

Gedegen uitgezocht met bronnen. Tarieven en onboarding van de lokale gateways
staan niet openbaar; alles hieronder met "te bevestigen" moet direct bij de
partij zelf worden nagevraagd (geen verzonnen cijfers).

**Lokaal (inwoners):**
- **Vinti4** is veruit het meest gebruikte betaalmiddel: het nationale
  debit-/kaartnetwerk van **SISP** (Sociedade Interbancária e Sistemas de
  Pagamentos). Vrijwel iedereen met een bankrekening heeft een Vinti4-kaart.
- **Vinti4net** is de bijbehorende e-commerce gateway: online betalen met Vinti4,
  Visa, Mastercard en Amex. Dit is dé manier om de lokale markt te bereiken, ook
  mensen zonder internationale kaart. Onboarding via SISP (helpdesk@sisp.cv,
  +238 262 6310) of via je bank (BCA, Caixa Económica, BI, BAI). Er bestaat een
  community PHP-SDK (`vinti4pay-php`). Let op: BCA-kaarten kennen online een
  limiet tot ~20.000 CVE. (tarieven/contract: te bevestigen bij SISP/bank)
- **Mobiele wallets / super-apps:** Pagali, A-pay (apay.cv), Faxi. Deze bundelen
  Vinti4 + kaarten + wallet voor rekeningen, recharges en online aankopen; A-pay
  accepteert Visa/Mastercard/Vinti4/PayPal. Pagali positioneert zich als "de
  betaalgateway van Cabo Verde" met open API voor bedrijven. Integratie/tarieven
  niet openbaar → direct navragen. (te bevestigen)
- **MKesh** (mobile money van Unitel T+): betalen met de telefoon zonder
  bankrekening, goed voor financiële inclusie/unbanked.
- **Bankoverschrijving (IBAN)** en **contant**: als achtervang en om vertrouwen op
  te bouwen.

**Diaspora / buitenlandse kopers:**
- **MoneyGram / Western Union**: veelgebruikt voor remittances naar CV.
- **PayPal / Wise**: voor internationale/diaspora-betalingen (PayPal ontvangen in
  CV historisch beperkt → bevestigen).
- **Visa/Mastercard** voor internationale betalingen.

**Belangrijk:**
- **Stripe ondersteunt Cabo Verde NIET als merchant-land** (alleen sinds april
  2025 in de Tax Registration API, geen volledige merchant-support). Stripe/Mollie
  kan dus alleen via een **EU-entiteit** (bijv. een NL-bedrijf), afgerekend in EUR.
- De **escudo is vast gekoppeld aan de euro** (≈ 110,265 CVE = 1 EUR). Buitenlanders
  betalen feitelijk in euro-equivalent; een EU-entiteit + Stripe/Mollie in EUR is
  logisch voor de diaspora-kant. (koppeling vast sinds 1998, actualiteit te bevestigen)
- Cabo Verde kent **deviezenregels/kapitaalcontrole**; geld in/uit en afrekenen in
  EUR vs CVE heeft bancaire gevolgen → check bij een lokale bank/boekhouder.
  (verificatie vereist)

**Aanbevolen aanpak: twee rails + handmatige start.**
1. **Nu:** de handmatige lus hieronder (werkt vandaag, nul integratie): aanvraag →
   betaling via overschrijving/Vinti4/contant/MoneyGram → admin keurt goed.
2. **Rail A (lokaal, primair):** **Vinti4net** voor kaartbetalingen van inwoners,
   direct via SISP/bank of via een wrapper als Pagali/A-pay als hun API + onboarding
   makkelijker is. Dit dekt de wekelijkse/maandelijkse Destaque-betalingen in CVE.
3. **Rail B (buitenland, secundair):** een **EU-entiteit + Stripe/Mollie** (kaarten,
   Apple/Google Pay) en/of **PayPal**, in EUR, voor concierge/buitenlandse kopers en
   het makelaarsplan.

## ✅ Wat er nu werkt (zonder betaalprovider)
**"Destacar / Feature listing"** · de eerste echte monetiseerbare lus, volledig
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

**Aanbevolen route** (zie ook de twee-rails-aanpak onder "Hoe betaalt de
Kaapverdiaanse gemeenschap?"): begin met de handmatige boost-lus (werkt vandaag).
Integreer daarna als eerste **Vinti4net** (rail A) voor lokale kaartbetalingen in
CVE, want dat is wat inwoners gebruiken; overweeg een wrapper als Pagali/A-pay als
die makkelijker te integreren is. Voeg later **Stripe/Mollie via een EU-entiteit**
(rail B) toe voor kaart-/EUR-betalingen van buitenlandse kopers en agencies.

### Stripe-integratie (schets, wanneer je zover bent)
1. `npm i stripe` (server) · nooit de secret key client-side.
2. Server-route (bijv. `src/app/api/checkout/route.ts`) maakt een Stripe
   Checkout Session voor het product (featured-week, Pro-maand, …).
3. **Webhook** (`/api/stripe/webhook`) verifieert `checkout.session.completed` en
   zet dan `is_featured`/`plan` in Supabase (via de service-role, server-side).
4. Bewaar `stripe_customer_id` op `profiles`; modelleer abonnementen in een
   `subscriptions`-tabel met `status` + `current_period_end`.
5. Secrets als env-vars (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).

### Abonnementen (Pro / Empresa) · nog te bouwen
Nu indicatief op `/precos`. Technisch: voeg `plan` toe aan `profiles`
(`free|pro|agency`), laat de admin het (of de Stripe-webhook) zetten, en gate
features (bijv. aantal actieve advertenties, prioriteit, ingebouwde destaques).
De boost-lus is het eerste bouwsteentje; abonnementen zijn een logische
uitbreiding.

## Principe
Blijf eerlijk en koopkracht-bewust: laag voor inwoners, hoger voor internationale
klanten; de basis blijft gratis. Toon prijzen altijd als indicatief tot ze vast
staan (zoals nu op `/precos`).
