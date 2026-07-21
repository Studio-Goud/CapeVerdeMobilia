# Djarvista — status & wat er nog moet

Laatste update: 2026-07-21. Overzicht van wat af is en wat er nog te doen is.
Zie ook `LAUNCH_CHECKLIST.md` (live-test) en `APP_STORE.md` (Apple).

## ✅ Echt & werkend (op de echte Supabase-backend)
- **Auth**: registreren (particulier/zakelijk), e-mailbevestiging, login, wachtwoordherstel; admin-rol via `profiles.role`.
- **Imóveis**: zoeken/filteren, detail met galerij + mini-kaart, plaatsen (wizard + fotoupload), bewerken, publiceren/depubliceren/verwijderen.
- **Verhuur**: huuraanvraag → accepteren/afwijzen → berichtenchat; huurder kan intrekken.
- **Contractgenerator** (pro-forma, self-service) met links naar de wetsartikelen.
- **Verificatie**: ID/paspoort + selfie upload → admin-review → trust-level.
- **Admin/moderatie**: advertenties modereren/verwijderen, verificaties, info-editor.
- **Officieel informatiecentrum**: 6 gebronde artikelen (huur, belasting, kopen, bouwen), gegroepeerd per pijler.
- **Directories (nu écht, waren demo):**
  - **Profissionais** (vakmensen/makelaars) — profiel aanmaken, reviews, leads bereiken de professional.
  - **Materiais** (leveranciers) — profiel, WhatsApp-offerte, admin-`verified`.
  - **Concursos** (aanbestedingen) — plaatsen, bieden, eigenaar ziet biedingen.
  - **Projetos** (bouwprojecten) — portfolio met voortgang/mijlpalen + cover.
- **Prijzen** (eerlijk model, gratis basis), **kaart**, **SEO/analytics**, **merk-mails** (Resend).
- **Juridisch**: Gebruiksvoorwaarden + Privacybeleid (concept, drietalig).
- **PWA**: installeerbaar, app-icons + manifest.

## ℹ️ Belangrijk sinds de laatste update
De app toont nu **alleen echte data** op de live site (geen fictieve
voorbeelden meer). Gevolg: zolang er weinig echt aanbod is, ziet de site er
**leeg** uit (lege staten i.p.v. nepdata) — dat is bewust en eerlijk. Vul met
echte advertenties/profielen via de formulieren, of nodig echte makelaars uit
(zie `outreach/makelaar-uitnodiging.md`).

## ⚠️ Alleen jij kunt dit doen
1. **Migratie 0017 draaien** (boost/uitlicht-aanvragen). 0001–0016 zijn gedaan.
2. **`service_role`-sleutel roteren** (stond ooit in de chat).
3. **Juridische `[…]`-placeholders** invullen in `/termos` en `/privacidade` (rechtsvorm, adres) + juridische check.
4. **Apple App Store**: volg `APP_STORE.md` (Mac + Apple Developer-account $99/jaar nodig).
5. **Echte foto's / hero-beeld** aanleveren (nu nette merk-placeholders).

## 🔜 Mogelijke volgende stappen (kies maar)
- **Dashboard uitbreiden**: "mijn concursos" + "mijn projetos" beheer (nu beheer je die via de lijst/detail).
- **Makelaar-outreach**: algemeen bericht (IT/PT/EN/NL) naar kantoren als capoverdecase.com en amicv.cv om ze als partner aan te sluiten.
- **Meer officiële info-artikelen** (erfrecht, condomínio, NIF/registratie-stappen).
- **Native app afmaken** voor de App Store (camera + push, zie `APP_STORE.md` §6).
- **Betaal-/verdienmodel** technisch aansluiten (nu indicatief op /precos).
- **Screenshots + store-listing** invullen (teksten staan klaar in `store/metadata.md`).

## 📌 Belangrijke principes (blijven bewaken)
- Nooit wetten/tarieven verzinnen — bron + datum + betrouwbaarheid; "juridische verificatie vereist".
- Officiële info visueel onderscheiden van commercieel.
- Djarvista is self-service: geen makelaar, geen contractpartij, geen juridische verantwoordelijkheid.
- Gevoelige verificaties nooit volledig door AI.
