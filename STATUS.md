# Djarvista - status & overdracht

Laatste update: 2026-07-23. Dit document is de volledige stand van zaken, bedoeld
om een nieuwe sessie in één keer op de hoogte te brengen.

Zie ook: `MIGRATIONS.md` (database, verplicht lezen), `APP_STORE.md` (Apple-draaiboek),
`PAYMENTS.md` (verdienmodel/gateways), `LAUNCH_CHECKLIST.md` (live-test),
`SEO_GROWTH_PLAN.md` · `SEO_KEYWORD_MAP.md` · `SEO_OFFSITE_PACK.md` · `MARKETING_OUTREACH_ADS.md`
(groei), `store/metadata.md` (winkelteksten), `outreach/` (makelaar-uitnodiging),
`supabase/SEED_0020_SOURCES.md` (bronnen telefoonboek-seed).

## Wat is Djarvista

Een onafhankelijk, drietalig (PT-PT / EN / NL) platform voor Kaapverdië dat vastgoed,
grond, bouw, diensten/professionals, bouwmaterialen en officiële informatie samenbrengt,
met vertrouwensverificatie als kern. Focus eerst op São Vicente / Mindelo. Doel:
informatie vindbaar, verifieerbaar en bruikbaar maken. Kaapverdianen lezen/schrijven in
het **Portugees** (pt-PT); Kriolu is spreektaal, geen schrijftaal - alle content is pt-PT.

## Kernprincipes (blijven bewaken)

- Nooit wetten/tarieven/bedrijfsdata verzinnen: altijd bron + datum + betrouwbaarheid,
  FACT vs ASSUMPTION gemarkeerd, "verificatie vereist / geen juridisch advies".
- Officiële info visueel onderscheiden van commercieel.
- Djarvista is self-service: geen makelaar, geen contractpartij, geen juridische
  verantwoordelijkheid.
- Gevoelige verificaties nooit volledig door AI.
- Geen "AI-tells": geen em-dash (—) in teksten; gewone streep "-" of ander leesteken.

## Techniek & architectuur

- **Next.js 14 App Router** (server components), TypeScript, Tailwind. i18n via
  `src/i18n.ts` (`type TL = Record<Locale,string>`; `tr(TL, locale)`, `t(locale, UIKey)`).
- **Supabase** (Postgres + RLS + storage + auth). Data-toegang in `src/lib/data.ts`;
  demo-fallback als Supabase niet geconfigureerd is.
- **Vercel**: auto-deploy vanaf de default branch (git-integratie).
- **Domein**: www.djarvista.com.

### Branch- & deploy-model (belangrijk)

- **Productie = default branch** `claude/cape-verde-proptech-govtech-fg9zjw` (Vercel deployt
  hiervandaan). Er is GEEN `main`.
- Ontwikkelen op feature-branch `claude/status-md-review-kn89v9`, dan **PR → merge naar de
  default branch → Vercel deployt** automatisch. Dat is "live gaan".
- **Migraties draait de gebruiker handmatig** in Supabase → SQL Editor (idempotent). De app
  degradeert netjes (demo-fallback) voor nog niet gedraaide migraties.

### Verifiëren van live (let op)

- `curl` werkt (proxy-aware) voor live checks. **Playwright/Chromium werkt NIET op live
  URL's** (geen proxy → ERR_CONNECTION_RESET); wel voor lokale `file://`-rendering.
- Beeldbewerking: `sharp` en `playwright-core` zijn met `npm install --no-save` te
  installeren (niet in package.json). Chromium staat in `/opt/pw-browsers`. Run node-scripts
  met `NODE_PATH=/home/user/CapeVerdeMobilia/node_modules`.

## Echt & werkend (op de echte Supabase-backend)

- **Auth**: registreren (particulier/zakelijk), e-mailbevestiging (+ redirect), login,
  wachtwoordherstel; admin-rol via `profiles.role`.
- **Imóveis**: zoeken/filteren (incl. Comercial/Vakantie), detail met galerij + mini-kaart,
  plaatsen (wizard + fotoupload + native camera), bewerken (eigenaarscheck),
  publiceren/depubliceren/verwijderen.
- **Verhuur**: huuraanvraag → accepteren/afwijzen → berichtenchat; huurder kan intrekken.
- **Contractgenerator** (pro-forma, self-service) met links naar de wetsartikelen.
- **Verificatie**: ID/paspoort + selfie upload → admin-review → trust-level.
- **Officieel informatiecentrum** (`/info`): gebronde, drietalige artikelen per pijler.
  DB-seed + 5 SEO-artikelen (kopen, NIF, cITI/cIPI 2026, erfrecht, condomínio) uit `0022`.
- **Procedures** (`/procedimentos`): 3 uitgelegde stap-voor-stap trajecten met narratief
  overzicht, CV-specifieke "let op"-punten, per stap uitleg/documenten/tip; drietalig,
  indicatief. HowTo-structured-data.
- **Directories (echt, met RLS)**:
  - **Profissionais** - profiel aanmaken/bewerken, reviews, leads bereiken de professional.
  - **Materiais** - leveranciersprofiel mét foto, WhatsApp-offerte, "✓ Verificado"-badge.
  - **Concursos** - plaatsen, bieden, eigenaar ziet biedingen, open/sluiten.
  - **Projetos** - portfolio met voortgang/mijlpalen + cover.
- **Dashboard-beheer**: mijn advertenties, leads, huuraanvragen, mijn concursos + projetos,
  agenda, directory-profielen.
- **Admin/moderatie**: verificaties, advertenties, Destaques-tab, info-editor.
- **Prijzen** (eerlijk model, gratis basis), **kaart**, **merk-mails** (Resend).
- **Juridisch**: Gebruiksvoorwaarden + Privacybeleid (concept, drietalig; `[…]`-placeholders
  nog invullen).
- **App/Apple**: PWA (installeerbaar, icons + manifest); Capacitor iOS-schil + native camera
  + push-scaffold; `APP_STORE.md` + `store/metadata.md`.

## Directory- & advertentiemodel (telefoonboek → verdienmodel)

- **Telefoonboek (claimbaar)**: bedrijven kunnen als "niet-geclaimd" op de site staan met
  bron + datum; de echte eigenaar claimt → admin keurt goed (`approve_claim`) → profiel +
  bewaarde leads gaan over. Badge + bronregel tonen de herkomst. Migratie `0019`; eerste
  seed = 25 échte São Vicente-bedrijven (`0020`, gebrond).
- **Operator-verificatie** ("Geverifieerd door Djarvista"): bedrijven zónder account kunnen
  door de operator geverifieerd worden (blijft claimbaar). Professionals: `verified_level`;
  suppliers: `verified` (admin/operator-only via trigger; SQL-editor mag het zetten want
  `auth.uid()` is daar null).
- **Service-advertenties** (`kind=SERVICE`, `/servicos`): fotogalerij + directe
  "Peça orçamento" WhatsApp/bel-knop (`listings.phone`). Owner mag null zijn (operator-seeded,
  claimbaar).
- **Uitlichten = betaalde plaatsing**: `is_featured` (guarded) toont bedrijven mét foto in
  **"Negócios em destaque"** bovenaan de homepage. Zo levert betalen echte zichtbaarheid op.
- **Twee echte voorbeelden (losstaande bedrijven!)**: **Bomclima** (airco-installateur,
  Serviços/Profissionais; `0021`+`0023`) en **3 AS** (elektro-importeur/leverancier, Materiais;
  `0025`). Foto's site-hosted onder `public/listings/bomclima/` en `public/suppliers/3as/`.
- **Verdienmodel-lus**: "Destacar" (aanvraag → admin keurt goed → `is_featured`). Nu zet de
  operator dit handmatig; een self-service "Destacar"-knop in het dashboard is nog te bouwen.
  Gateway-opties in `PAYMENTS.md`.

## SEO / GEO (live)

- **Structured data (JSON-LD)**: Organization + WebSite/zoekbox (site-breed), LocalBusiness
  per professional, RealEstateListing per woning, BreadcrumbList + CollectionPage op
  landingspagina's, HowTo op procedures, Article op info-artikelen.
- **Categorie-/eiland-landingspagina's** (hoog-intentie zoekopdrachten):
  - `/imoveis/<deal>/<eiland>` - venda, terrenos, arrendar, ferias, novos-projetos, comercial
  - `/profissionais/<categorie>/<eiland>` - advogados, ar-condicionado, construcao-civil,
    arquitetura, serralharia, despachante, limpeza, gas
  - `/materiais/<eiland>` - eilanden: São Vicente, Sal, Santiago, Boa Vista
  Elk met keyword-titel/H1 (drietalig, "Cabo Verde" voor disambiguatie), breadcrumb,
  gefilterde resultaten, unieke eiland-koopgids (geen thin content), interne links (footer
  "procuras populares" + verwante-zoekchips). Data in `src/lib/landings.ts` +
  `src/content/islands.ts`.
- **Technisch**: dynamische sitemap (profielen/advertenties/procedures/landingspagina's),
  per-pagina hreflang + canonical, keyword-titels (`src/lib/seo.ts`), `llms.txt`.
  Screaming-Frog-schoon: unieke title/description/canonical/hreflang + 1× H1 per publieke
  pagina; privé/klant-pagina's op `noindex` via middleware.
- **Analytics**: Vercel Web Analytics staat aan. GA4 is ingebouwd (`GoogleAnalytics`-component)
  en wacht op `NEXT_PUBLIC_GA_ID` (env-gated) → GA4 Realtime toont live bezoekers.

## Kwaliteit

- Grote controle (4 parallelle audits) uitgevoerd: demo/fictieve-tekst-lekken weg, pt-PT
  register, correctheid, toegankelijkheid, favicon-fix (vector-SVG als tab-icoon).
- **Geen verzonnen data**: de investir-pagina toont alleen échte status (platform live, ilha
  piloto São Vicente, 3 talen) - de eerdere pilot-cijfers (50 professionals, 150 advertenties)
  zijn verwijderd.
- **Em-dash verwijderd** uit alle code-teksten én DB-content (migratie `0028`); wordmark-`ı`
  en `·`-scheidingstekens intact.

## Migraties

`0001`–`0028` zijn allemaal gedraaid. Overzicht + status in `MIGRATIONS.md`. Laatste reeks:
`0019` claimbaar telefoonboek · `0020` seed 25 bedrijven · `0021` Bomclima · `0022` 5 SEO-
info-artikelen · `0023` operator-verificatie + Bomclima-advertentie · `0024` advertentie-
telefoon · `0025` 3 AS-leverancier · `0026` homepage-uitlichting + leverancierfoto · `0027`
3 AS-logo · `0028` em-dash → hyphen in DB-content. Nieuwe migraties: bestand in
`supabase/migrations/`, gebruiker draait de SQL zelf.

## Alleen jij kunt dit doen

1. **GA4 aankoppelen**: GA4-property maken → Measurement ID (`G-XXXXXXXXXX`) → als
   `NEXT_PUBLIC_GA_ID` in Vercel → Environment Variables → redeploy. Dan toont GA4 → Realtime
   live bezoekers. (Vercel Web Analytics draait al.)
2. **Google Search Console + Bing Webmaster**: domein verifiëren en
   `https://www.djarvista.com/sitemap.xml` indienen voor snelle indexering.
3. **Juridische `[…]`-placeholders** invullen in `/termos` en `/privacidade` (rechtsvorm,
   adres) + juridische check.
4. **`service_role`-sleutel roteren** (de app gebruikt 'm niet, roteren breekt niets).
5. **Apple App Store**: volg `APP_STORE.md` (Mac + Apple Developer $99/jaar): `npx cap add ios`
   → Xcode → signing → archive → upload → listing → submit.
6. **Echte content**: meer advertenties/profielen (of makelaars uitnodigen - `outreach/`) en
   echte foto's / hero-beeld. Losse ambachten (loodgieters, watertrucks) lokaal verzamelen.
7. **Marketing**: Facebook/Instagram-posts + deelbeeld staan klaar (zie chat); posten in
   lokale São Vicente-groepen.

## Open ideeën / volgende bouwstappen (jouw keuze)

- **Self-service "Destacar"-knop** in het dashboard: bedrijf vraagt uitlichting aan → admin
  keurt goed (na betaling) → verschijnt automatisch in "Negócios em destaque". Boost-lus
  (`boost_requests`) bestaat al voor advertenties; uitbreiden naar profielen/leveranciers.
- **Investir-pagina**: is nu volledig openbaar en zegt dat je financiering ophaalt. Overweeg
  privé/`noindex` te maken, en het "De vraag"-blok (`€ ———`) in te vullen of te verbergen.
- Laatste info-artikel `licenca-de-construcao-sao-vicente` schrijven (gebrond).
- FAQPage-structured-data waar zinvol; meer eiland-content.
- Volledige betaal-gateway (Stripe/Vinti4) i.p.v. handmatige boost-goedkeuring.
- Push-notificaties echt activeren (APNs, `APP_STORE.md` §6b).
- Kleine polish: tap-targets, mobiele contact-CTA's hoger, desktop-dropdowns toetsenbord,
  uploadvoortgang meerdere foto's.

## Deze sessie (samenvatting recent werk)

Verdiept: procedures. Gebouwd + live: claimbaar telefoonboek (`0019`) + 25 geverifieerde São
Vicente-bedrijven (`0020`); 5 gebronde SEO-info-artikelen (`0022`); categorie-/eiland-
landingspagina's + JSON-LD + sitemap; HowTo/Article structured data; GA4-hook; wordmark-fix
(koraal-zon); operator-verificatie + Bomclima-service-advertentie (`0023`-`0024`) +
3 AS-leverancier (`0025`); homepage "Negócios em destaque" uitlichting (`0026`) + 3 AS-logo
(`0027`); em-dash site-breed verwijderd (`0028`) en investir-pagina ontdaan van verzonnen
cijfers. Marketing-assets (FB/IG-teksten + deelbeeld 1200×630) opgeleverd in de chat.
