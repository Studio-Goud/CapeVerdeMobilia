# Djarvista — Apple App Store voorbereiding

Dit document beschrijft **exact** hoe je Djarvista in de Apple App Store krijgt.
De app is een server-rendered Next.js-website (op Vercel, `www.djarvista.com`).
Om die in de App Store aan te bieden verpakken we hem met **Capacitor** in een
native iOS-app. Het uiteindelijke bouwen, ondertekenen en insturen **vereist een
Mac met Xcode en een Apple Developer-account** — dat kan niet vanaf de server.
Alles wat wél vooraf kan, is hier voorbereid (config, icons, manifest, teksten).

> Belangrijk (App Store-regel 4.2 "minimum functionality"): Apple weigert apps
> die "alleen een website in een schil" zijn. We lossen dat op door **echte
> native functies** toe te voegen (camera voor foto's/ID, push-notificaties).
> Zie §6 — doe dit vóór je inzendt.

---

## 1. Wat je nodig hebt (eenmalig)
- Een **Mac** met **Xcode** (App Store, gratis).
- **Apple Developer Program**-lidmaatschap — **$99/jaar** (https://developer.apple.com/programs/).
- Toegang tot **App Store Connect** (https://appstoreconnect.apple.com).
- Node.js op de Mac (voor de Capacitor-CLI).
- Domein live op HTTPS (klaar: `www.djarvista.com`).

## 2. App-identiteit (al vastgelegd)
| Veld | Waarde |
|------|--------|
| App-naam | **Djarvista** |
| Bundle ID / appId | `com.djarvista.app` |
| Primaire taal | Portugees (pt) |
| Categorie | Business (secundair: Lifestyle) |
| Thema-/merkkleur | `#003893` (vlagblauw) |

## 3. Capacitor toevoegen (op de Mac)
In de repo-root:
```bash
# 1) Installeer Capacitor
npm i @capacitor/core @capacitor/cli @capacitor/ios
# (capacitor.config.ts staat al in de repo — laadt www.djarvista.com)

# 2) Voeg het iOS-platform toe (maakt de map ios/ met een Xcode-project)
npx cap add ios

# 3) Synchroniseer config + plugins
npx cap sync ios

# 4) Open in Xcode
npx cap open ios
```
`capacitor.config.ts` is al ingesteld om de live site te laden
(`server.url = https://www.djarvista.com`), met navigatie beperkt tot de eigen
domeinen + Supabase.

## 4. App-icoon & splash
De merk-assets staan klaar:
- App-icoon bron: `public/icons/icon-512.png` (en `icon-192.png`, `apple-touch-icon.png`).
- Genereer de volledige iOS-icoonset + splash met **@capacitor/assets**:
```bash
npm i -D @capacitor/assets
# leg een 1024x1024 icoon en (optioneel) splash klaar in ./assets/
#   assets/icon.png      (1024x1024, ondoorzichtig — géén transparantie voor iOS)
#   assets/splash.png    (2732x2732, gecentreerd logo op #003893)
npx capacitor-assets generate --ios
```
> Maak `assets/icon.png` (1024×1024) op basis van `brand/djarvista-avatar.png`
> (vlagblauw vlak, witte D + zon) — iOS-icons mogen **niet** transparant zijn.
> `brand/djarvista-avatar.png` is precies goed als bron; schaal naar 1024×1024.

## 5. Ondertekenen (Xcode)
1. Xcode → project → **Signing & Capabilities**.
2. Kies je **Team** (je Apple Developer-account). Xcode maakt automatisch een
   provisioning profile aan voor `com.djarvista.app`.
3. Zet **Automatically manage signing** aan.

## 6. Native functies (verplicht tegen weigering 4.2)
Voeg minstens één, liefst deze twee, echte native functies toe. Ze passen
inhoudelijk bij de app en verhogen de kans op goedkeuring sterk.

**a) Camera** — voor het uploaden van woningfoto's en de ID-verificatie.
```bash
npm i @capacitor/camera
npx cap sync ios
```
Info.plist (Xcode → Info) — voeg toe met duidelijke, eerlijke teksten:
- `NSCameraUsageDescription` → "Djarvista gebruikt de camera om foto's van uw
  woning te maken en, indien u dat kiest, uw identiteitsbewijs te verifiëren."
- `NSPhotoLibraryUsageDescription` → "Om foto's van uw woning te uploaden."
Progressieve verbetering in de web-code (voorbeeld — laadt de plugin alleen in de app):
```ts
// alleen aanroepen als we in de native app draaien (Capacitor aanwezig)
const isNative = typeof (window as any).Capacitor !== 'undefined';
if (isNative) {
  const { Camera, CameraResultType } = await import('@capacitor/camera');
  const photo = await Camera.getPhoto({ quality: 80, resultType: CameraResultType.Uri });
  // gebruik photo.webPath → upload naar Supabase storage
}
```

**b) Push-notificaties** — voor nieuwe huuraanvragen / berichten / biedingen.
```bash
npm i @capacitor/push-notifications
```
Xcode → Capabilities → **Push Notifications** + **Background Modes**. Vereist een
**APNs-key** (App Store Connect → Certificates) — zie de Capacitor-docs.

> Zonder minstens één native functie is de kans op afwijzing onder 4.2 reëel.

## 7. App Store Connect — listing
Maak in App Store Connect een nieuwe app aan (Bundle ID `com.djarvista.app`).
Gebruik onderstaande teksten (staan ook in `store/metadata.md`).

- **Naam:** Djarvista
- **Ondertitel (30 tekens):** Imóveis e info · Cabo Verde
- **Support-URL:** https://www.djarvista.com
- **Marketing-URL:** https://www.djarvista.com
- **Privacybeleid-URL (verplicht):** https://www.djarvista.com/pt/privacidade
- **Gebruiksvoorwaarden-URL:** https://www.djarvista.com/pt/termos

## 8. App Privacy ("nutrition labels")
Vul in App Store Connect → App Privacy in, op basis van ons privacybeleid
(`/privacidade`). Wat we verzamelen en koppelen aan identiteit:
| Gegevenstype | Verzameld | Gekoppeld aan gebruiker | Doel |
|--------------|-----------|--------------------------|------|
| Naam, e-mail (account) | Ja | Ja | App-functionaliteit |
| Telefoon (leads) | Ja | Ja | App-functionaliteit |
| Door gebruiker gemaakte inhoud (advertenties, foto's, berichten) | Ja | Ja | App-functionaliteit |
| **Identiteitsdocument / selfie (verificatie)** | Ja | Ja | Verificatie / fraudepreventie — **gevoelig**, menselijk beoordeeld |
| Grove locatie (eiland/gemeente van advertentie) | Ja | Ja | App-functionaliteit |
| Gebruiksgegevens (analytics, geaggregeerd) | Ja | Nee | Analytics |
- **Verkopen we data?** Nee. **Tracking (ATT)?** Nee (geen advertentie-/cross-site tracking).
- Omdat er geen tracking is, is een **App Tracking Transparency**-prompt niet nodig.

## 9. Screenshots (verplicht)
Maak schermafbeeldingen (in de simulator of op een toestel). Vereist:
- **iPhone 6.7"** (1290×2796) — verplicht.
- **iPhone 6.5"** (1242×2688) — aanbevolen.
Optioneel iPad 12.9" als je iPad ondersteunt. Toon: home, imóveis-lijst,
woningdetail met kaart, huuraanvraag/contract, info-centrum, dashboard.

## 10. Leeftijdsclassificatie
Doorloop de vragenlijst → verwacht **4+** (geen aanstootgevende inhoud). Er is
gebruikersgegenereerde inhoud (advertenties/berichten); vermeld dat er moderatie
is (admin kan advertenties verwijderen; verificatieniveaus).

## 11. App Review — notities voor de reviewer
Vul bij "App Review Information" in:
- **Demo-account** (maak een test-login aan en geef e-mail + wachtwoord).
- Uitleg: "Djarvista is een self-service marktplaats + officieel informatiecentrum
  voor Cabo Verde. Identiteitsverificatie is **vrijwillig** en wordt door mensen
  beoordeeld, nooit alleen door AI. De app gebruikt de camera voor woningfoto's en
  optionele ID-verificatie, en push voor aanvragen/berichten."
- Als de reviewer 4.2 aankaart: wijs op de native camera- en push-functies en de
  offline foutpagina.

## 12. Export compliance
De app gebruikt alleen standaard HTTPS/TLS. Bij "Export Compliance" kun je
doorgaans **"gebruikt alleen standaard encryptie / vrijgesteld"** kiezen
(`ITSAppUsesNonExemptEncryption = NO` in Info.plist). Controleer dit voor je
eigen situatie.

## 13. Bouwen & uploaden
1. Xcode → kies **Any iOS Device (arm64)** → **Product → Archive**.
2. In de Organizer: **Distribute App → App Store Connect → Upload**.
3. Wacht tot de build in App Store Connect verschijnt (verwerking ~15 min).
4. Koppel de build aan je versie, vul alle velden, en **Submit for Review**.
5. Optioneel eerst via **TestFlight** testen (aanrader).

## 14. Checklist vóór inzenden
- [ ] Apple Developer-account actief ($99/jaar betaald)
- [ ] `npx cap add ios` gedaan, project opent in Xcode
- [ ] App-icoon (1024, ondoorzichtig) + splash gegenereerd
- [ ] Signing/Team ingesteld
- [ ] Minstens één native functie (camera en/of push) werkt
- [ ] Info.plist: camera/foto-usage-teksten + export-compliance
- [ ] App Store Connect: naam, ondertitel, beschrijving (PT/EN/NL), keywords
- [ ] Privacybeleid-URL + App Privacy-labels ingevuld
- [ ] Screenshots 6.7" (en 6.5")
- [ ] Demo-account + reviewer-notities ingevuld
- [ ] Build geüpload en gekoppeld
- [ ] Submit for Review

---

### Alternatief (later): volledig native / static
Wil je géén remote-URL-schil, dan moet de web-app een **static export** worden
(`output: 'export'`) — dat vergt herarchitectuur (server components/middleware/
Supabase-serverclient omzetten naar client-side). Niet nodig voor een eerste
release; de Capacitor-schil met native functies is de snelste route naar de store.
