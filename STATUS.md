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
  - **Materiais** — leveranciersprofiel, WhatsApp-offerte (alleen mét nummer), admin-`verified`.
  - **Concursos** — plaatsen, bieden, eigenaar ziet biedingen, open/sluiten, gesloten = geen biedingen.
  - **Projetos** — portfolio met voortgang/mijlpalen + cover.
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

## 🗄️ Migraties
0001–0018 zijn gedraaid — inclusief `0018_featured_guard.sql` (alleen admins mogen `is_featured` zetten + max 1 openstaande boost per advertentie). Zie `MIGRATIONS.md`.

## ⚠️ Alleen jij kunt dit doen
1. **`service_role`-sleutel roteren** (stond meerdere keren in de chat; de app gebruikt 'm niet, dus roteren breekt niets).
2. **Juridische `[…]`-placeholders** invullen in `/termos` en `/privacidade` (rechtsvorm, adres) + juridische check.
3. **Apple App Store**: volg `APP_STORE.md` (Mac + Apple Developer-account $99/jaar nodig): `npx cap add ios` → Xcode → signing → archive → upload → listing (`store/metadata.md`) → submit.
4. **Echte content**: eerste advertenties/profielen plaatsen (of makelaars uitnodigen — `outreach/`) en **echte foto's / hero-beeld** aanleveren. De live site oogt leeg tot er echt aanbod is (bewust — geen nepdata).

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
