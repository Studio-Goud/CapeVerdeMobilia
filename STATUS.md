# Djarvista — status & wat er nog moet

Laatste update: 2026-07-22.
Zie ook: `APP_STORE.md` (Apple-draaiboek), `PAYMENTS.md` (verdienmodel),
`MIGRATIONS.md` (database), `LAUNCH_CHECKLIST.md` (live-test),
`store/metadata.md` (winkelteksten), `outreach/` (makelaar-uitnodiging).

## ✅ Echt & werkend (op de echte Supabase-backend)
- **Auth**: registreren (particulier/zakelijk), e-mailbevestiging (+ redirect), login, wachtwoordherstel; admin-rol via `profiles.role`.
- **Imóveis**: zoeken/filteren (incl. Comercial/Vakantie), detail met galerij + mini-kaart, plaatsen (wizard + fotoupload + native camera), bewerken (met eigenaarscheck), publiceren/depubliceren/verwijderen.
- **Verhuur**: huuraanvraag → accepteren/afwijzen → berichtenchat; huurder kan intrekken.
- **Contractgenerator** (pro-forma, self-service) met links naar de wetsartikelen.
- **Verificatie**: ID/paspoort + selfie upload → admin-review → trust-level.
- **Officieel informatiecentrum**: 6 gebronde, drietalige artikelen (huur, belasting, kopen, bouwen), gegroepeerd per pijler.
- **Procedures (stap-voor-stap)**: 3 uitgelegde trajecten (terrein kopen + bouwen · bestaande woning kopen · bedrijf oprichten) met narratief overzicht ("hoe het meestal verloopt"), CV-specifieke "let op"-punten en per stap uitleg + documenten + tip — drietalig, indicatief (geen juridisch advies).
- **Directories (echt, met RLS):**
  - **Profissionais** — profiel aanmaken/bewerken, reviews, leads bereiken de professional.
  - **Materiais** — leveranciersprofiel mét foto, WhatsApp-offerte (alleen mét nummer), "✓ Verificado"-badge (operator/admin).
  - **Concursos** — plaatsen, bieden, eigenaar ziet biedingen, open/sluiten, gesloten = geen biedingen.
  - **Projetos** — portfolio met voortgang/mijlpalen + cover.
- **Telefoonboek (claimbaar)**: bedrijven kunnen als "niet-geclaimd" op de site staan met bron+datum; de echte eigenaar claimt → admin keurt goed (`approve_claim`) → profiel + bewaarde leads gaan over. Badge + bronregel tonen de herkomst. Migratie `0019`; eerste seed = 25 échte São Vicente-bedrijven (`0020`, gebrond — zie `supabase/SEED_0020_SOURCES.md`).
- **Operator-verificatie + advertenties + uitlichten (verdienmodel zichtbaar)**: bedrijven zonder account kunnen "Geverifieerd door Djarvista" worden (blijft claimbaar). **Service-advertenties** (`kind=SERVICE`) met fotogalerij + directe **"Peça orçamento"** WhatsApp/bel-knop. Betaalde **uitlichting** (`is_featured`) toont bedrijven mét foto in **"Negócios em destaque"** op de homepage. Eerste voorbeelden: **Bomclima** (installateur, Serviços) + **3 AS** (importeur, Materiais) — losstaande bedrijven. Migraties `0023`–`0027`.
- **Dashboard-beheer**: mijn advertenties, leads, huuraanvragen, **mijn concursos** + **mijn projetos** (beheren), agenda, directory-profielen.
- **Verdienmodel**: "Destacar"-lus (aanvraag → admin keurt goed → `is_featured`). Gateway-opties in `PAYMENTS.md`.
- **Admin/moderatie**: verificaties, advertenties, **Destaques**-tab, info-editor; met foutmeldingen.
- **Prijzen** (eerlijk model, gratis basis), **kaart**, **SEO/analytics**, **merk-mails** (Resend).
- **Juridisch**: Gebruiksvoorwaarden + Privacybeleid (concept, drietalig).
- **App/Apple-voorbereiding**: PWA (installeerbaar, icons + manifest); **Capacitor** iOS-schil + native camera ingebouwd + push-scaffold; volledige `APP_STORE.md` + `store/metadata.md`.

## 🧭 Kwaliteit
Grote controle uitgevoerd (4 parallelle audits). Opgelost:
- **Geloofwaardigheid**: alle demo/fictieve-tekst-lekken op de live site weg (footer, contactbevestiging, registratie-note, directory-intro's, investeerderspagina, nep-WhatsApp-nummer).
- **Portugees (pt-PT)**: "A Djarvista", pesquisas, formeel register, PT-plannamen, "à venda", anúncios.
- **Correctheid**: gesloten-concurs biedformulier, admin-foutmeldingen, e-mailredirect, lokale datums, taalwissel behoudt filters.
- **Toegankelijkheid**: `<html lang>` per taal, taalwissel op mobiel, coral-contrast, tap-target hamburger, "A enviar…"-states.
- **Favicon**: tab-icoon toonde een leeg blauw vlak (kapotte 192- + apple-touch-PNG's die de correcte SVG overschreven); nu vector-SVG als primair tab-icoon + geregenereerde PNG's (D + koraal-zon).

## 🔎 SEO / GEO (live)
Structured data (JSON-LD: Organization + WebSite/zoekbox, LocalBusiness per professional,
RealEstateListing per woning, BreadcrumbList + CollectionPage op landingspagina's),
dynamische sitemap (alle profielen/advertenties/procedures/landingspagina's),
per-pagina hreflang + canonical, keyword-titels, directory-zoekbalk, `llms.txt`.
Screaming-Frog-schoon: unieke title/description/canonical/hreflang + 1× H1 per publieke
pagina; privé/klant-pagina's op `noindex` via middleware.
- **Categorie-/eiland-landingspagina's (live)** — de hoog-intentie zoekopdrachten waar de
  algemene lijstpagina's niet op ranken:
  - `/imoveis/<deal>/<eiland>` — venda, terrenos, arrendar, ferias, novos-projetos, comercial
  - `/profissionais/<categorie>/<eiland>` — advogados, ar-condicionado, construção civil, arquitetura, serralharia, despachante, limpeza, gás
  - `/materiais/<eiland>` — eilanden: São Vicente, Sal, Santiago, Boa Vista
  Elk met keyword-titel/H1 (drietalig, "Cabo Verde" voor disambiguatie), breadcrumb,
  gefilterde resultaten, unieke eiland-koopgids (geen thin content) en interne links
  (footer "procuras populares" + verwante-zoekopdracht-chips).
- **Live bezoekers meten**: Vercel Web Analytics staat aan; GA4 is ingebouwd en wacht op
  `NEXT_PUBLIC_GA_ID` (env-gated) → GA4 Realtime toont live bezoekers.
Playbooks in de repo: `SEO_GROWTH_PLAN.md`, `SEO_KEYWORD_MAP.md`, `SEO_OFFSITE_PACK.md`,
`MARKETING_OUTREACH_ADS.md`.

## 🗄️ Migraties
0001–0026 zijn gedraaid (telefoonboek + São Vicente-seed + Bomclima + 5 gebronde
info-artikelen; operator-verificatie + Bomclima-advertentie + 3 AS-leverancier +
homepage-uitlichting). Klein rest: `0027` (3 AS-kaart → logo). Zie `MIGRATIONS.md`.

## ⚠️ Alleen jij kunt dit doen
1. **GA4 aankoppelen voor live bezoekers**: maak een GA4-property → kopieer de Measurement ID (`G-XXXXXXXXXX`) → zet als `NEXT_PUBLIC_GA_ID` in Vercel → Project → Environment Variables → redeploy. Daarna toont GA4 → Reports → Realtime live bezoekers. (Vercel Web Analytics draait al automatisch.)
2. **Google Search Console + Bing Webmaster**: domein verifiëren en `https://www.djarvista.com/sitemap.xml` indienen zodat de nieuwe landingspagina's snel geïndexeerd worden.
3. **`service_role`-sleutel roteren** (stond meerdere keren in de chat; de app gebruikt 'm niet, dus roteren breekt niets).
4. **Juridische `[…]`-placeholders** invullen in `/termos` en `/privacidade` (rechtsvorm, adres) + juridische check.
5. **Apple App Store**: volg `APP_STORE.md` (Mac + Apple Developer-account $99/jaar nodig): `npx cap add ios` → Xcode → signing → archive → upload → listing (`store/metadata.md`) → submit.
6. **Echte content**: meer advertenties/profielen (of makelaars uitnodigen — `outreach/`) en **echte foto's / hero-beeld**. Losse ambachten (loodgieters, watertrucks) lokaal verzamelen — die zijn online niet te vinden.

## 🔜 Optionele polish (geen fouten, jouw keuze)
- Kleine tap-targets vergroten; contact-CTA's op mobiel hoger zetten; desktop-dropdowns toetsenbordvriendelijk; uploadvoortgang bij meerdere foto's; `slate-400`→`slate-500` info-teksten.
- Privé-gebruiker die een concurso/projeto plaatst kan die nu niet beheren (beheer zit in het zakelijke dashboard).
- Meer info-artikelen (erfrecht, condomínio, NIF/registratie).
- Volledige betaal-gateway (Stripe/Vinti4) i.p.v. handmatige boost-goedkeuring.
- Push-notificaties echt activeren (APNs, zie `APP_STORE.md` §6b).

## 📌 Principes (blijven bewaken)
- Nooit wetten/tarieven verzinnen — bron + datum + betrouwbaarheid; "juridische verificatie vereist".
- Officiële info visueel onderscheiden van commercieel.
- Djarvista is self-service: geen makelaar, geen contractpartij, geen juridische verantwoordelijkheid.
- Gevoelige verificaties nooit volledig door AI.
