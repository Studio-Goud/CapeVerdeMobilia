# Djarvista — Go-live & eind-tot-eind testchecklist

Praktische checklist om **djarvista.com** live te zetten en handmatig te testen in de
browser + het Supabase-dashboard. Werk van boven naar beneden; vink af wat werkt.

**Hoe lezen:** bij elk item staat *wat je doet* en *wat "goed" eruitziet*. Onderaan elke
sectie staat een korte **Als iets misgaat**-notitie met de meest waarschijnlijke oorzaak.

**Paden:** alle pagina's staan onder een taalprefix `/pt`, `/en` of `/nl`
(bijv. `https://www.djarvista.com/pt/painel`). Test bij voorkeur eerst in `/pt`.
De homepage `djarvista.com` stuurt automatisch door naar `/pt`.

**Handig om open te hebben:** een browser (liefst met een privé/incognitovenster erbij voor
een tweede account) én het Supabase-dashboard (SQL Editor, Authentication, Storage, Table Editor).

---

## 1. Vooraf / configuratie

- [ ] **Env-vars in Vercel gezet.** Vercel → project → Settings → Environment Variables:
  `NEXT_PUBLIC_SUPABASE_URL` én `NEXT_PUBLIC_SUPABASE_ANON_KEY`, allebei voor
  **Production** (en Preview/Development). *Goed:* beide staan er, met de juiste project-URL
  en de **anon/public**-key (niet de service_role).
- [ ] **Redeploy ná het zetten van de env-vars.** Deze twee waarden zijn `NEXT_PUBLIC_*` en
  worden bij de **build** ingebakken — wijzigen zonder opnieuw te deployen doet niets.
  Vercel → Deployments → laatste → Redeploy (of push een commit). *Goed:* de laatste
  deployment dateert van ná de laatste env-wijziging en staat op **Ready**.
- [ ] **Demo-banner is weg.** Open `djarvista.com`. *Goed:* geen oranje balk "Demo · fictieve
  data — geen echte dienst." bovenaan, en op `/pt/entrar` staan **geen** snelle-demo-knoppen.
  De banner en die knoppen verschijnen alleen als de backend NIET geconfigureerd is.
- [ ] **Migraties 0001–0011 allemaal gedraaid.** Supabase → Table Editor. *Goed:* de tabellen
  `profiles`, `listings`, `leads`, `favorites`, `reviews`, `verification_requests`,
  `rental_requests`, `messages`, `publications`, `publication_flags` bestaan allemaal.
- [ ] **Custom SMTP (Resend) ingesteld.** Supabase → Authentication → Emails → SMTP Settings:
  Custom SMTP aan, host `smtp.resend.com`, poort `465`, gebruiker `resend`, wachtwoord =
  Resend API-key, afzender `no-reply@djarvista.com`, afzendernaam **Djarvista**. En
  Authentication → URL Configuration: Site URL `https://www.djarvista.com` + Redirect URL
  `https://www.djarvista.com/auth/callback`. *Goed:* domein staat in Resend op **Verified**.
  (Zie `EMAIL_SETUP.md`.)
- [ ] **service_role-key GEROTEERD.** Deze key was uitgelekt. Supabase → Settings → API →
  service_role → **Reset/rotate**. *Goed:* nieuwe key. De app gebruikt deze key **niet**,
  dus roteren breekt niets — maar de oude, gelekte key wordt daarmee ongeldig.
- [ ] **Jezelf tot admin gemaakt.** Registreer eerst je eigen account (sectie 2), draai dan in
  Supabase → SQL Editor:
  ```sql
  update public.profiles set role='admin'
  where id = (select id from auth.users where email='JOUW-EMAIL');
  ```
  *Goed:* in de `profiles`-tabel staat bij jouw rij `role = admin`. Log daarna uit en weer in.

> **Als iets misgaat:** zie je nog de demo-banner of "beschikbaar zodra de database is
> gekoppeld"-meldingen → de env-vars ontbreken of er is niet geredeployd ná het zetten ervan.
> Dat is verreweg de meest voorkomende oorzaak.

---

## 2. Auth-flow (registreren, bevestigen, in-/uitloggen, wachtwoord herstellen)

- [ ] **Particulier registreren.** `/pt/registar` → kies **Particular** (🏠) → naam, e-mail,
  wachtwoord (min. 6 tekens) → **Criar conta**. *Goed:* groene melding "Conta criada.
  Verifique o seu email para confirmar antes de entrar."
- [ ] **Gebrande bevestigingsmail ontvangen.** Check de inbox van dat e-mailadres. *Goed:*
  afzender is **Djarvista** (niet "Supabase Auth"), de mail is gebrand (Djarvista-kleuren/logo),
  en staat in de inbox (niet in spam).
- [ ] **Bevestigen werkt.** Klik de knop/link in de mail. *Goed:* je landt **ingelogd** op
  `/pt/painel` (het dashboard) — géén `localhost`-foutmelding.
- [ ] **Uitloggen.** Klik rechtsboven **Sair** (logout). *Goed:* je bent uitgelogd; rechtsboven
  staan weer **Entrar**/**Registar**.
- [ ] **Inloggen.** `/pt/entrar` → e-mail + wachtwoord → **Entrar**. *Goed:* je komt op
  `/pt/painel`.
- [ ] **Wachtwoord vergeten.** `/pt/entrar` → onderaan **Esqueceu a palavra-passe?** (verschijnt
  alleen als de backend aanstaat) → e-mail invullen → klik. *Goed:* melding "Enviámos um link
  de recuperação para o seu email." en je ontvangt een gebrande herstelmail.
- [ ] **Nieuw wachtwoord instellen.** Klik de herstel-link → je landt op `/pt/nova-senha` →
  nieuw wachtwoord → **Guardar palavra-passe**. *Goed:* "Palavra-passe atualizada." en na ~1 sec
  doorsturen naar het dashboard. (Open je `/pt/nova-senha` zonder geldige link, dan zie je terecht
  "Open deze pagina via de herstel-link in je e-mail.")
- [ ] **Zakelijk account.** Registreer een tweede account: `/pt/registar` → **Empresa** (🏢) →
  vul **bedrijfsnaam** (verplicht) + naam + e-mail + wachtwoord. Bevestig via mail. *Goed:* na
  inloggen toont `/pt/painel` de zakelijke weergave (stats, "Os meus anúncios", leads, pedidos).

> **Als iets misgaat:** geen mail of afzender = "Supabase Auth" → custom SMTP/templates niet
> (goed) ingesteld. `localhost`-fout of dode link → Site URL/Redirect URL in Supabase kloppen
> niet (moet `https://www.djarvista.com` + `/auth/callback` zijn). Geen bevestigingsmail nodig?
> Dan staat "Confirm email" uit in Supabase → voor productie moet die **aan**.

---

## 3. Plaats een woning (publicatie-wizard + detail)

Doe dit als **zakelijk** of **admin** account (een particulier krijgt terecht de melding dat
publiceren een zakelijk/professioneel account vereist).

- [ ] **Wizard openen.** `/pt/imoveis/publicar` (of vanuit het dashboard → **Novo anúncio**).
  *Goed:* stappenbalk met 3 stappen: **O básico → Fotografias → Preço & publicar**.
- [ ] **Stap 1 – basis.** Kies type (bijv. **Casa para arrendar** = `PROPERTY_RENT` als je dit
  later voor de huur-flow wilt gebruiken), vul **Título (Português)** (verplicht), ilha, concelho,
  korte beschrijving → **Seguinte**.
- [ ] **Stap 2 – echte foto's uploaden.** Kies meerdere echte foto's van je computer/telefoon.
  *Goed:* je ziet miniatuur-previews; de eerste heeft een **Capa**-label (omslagfoto) → **Seguinte**.
- [ ] **Stap 3 – prijs & publiceren.** Vul prijs (CVE) of vink **Preço sob consulta**; laat
  **Publicar imediatamente** aangevinkt → **Publicar**. *Goed:* je wordt doorgestuurd naar de
  detailpagina `/pt/imoveis/<slug>`.
- [ ] **Foto's renderen echt.** Op de detailpagina: grote omslagfoto + kleine thumbnails eronder.
  *Goed:* het zijn **jouw geüploade foto's** (niet de blauwe "Djarvista"-placeholder), scherp geladen.
- [ ] **Verschijnt in het overzicht.** Open `/pt/imoveis`. *Goed:* je nieuwe woning staat in het
  raster (alleen **gepubliceerde** advertenties verschijnen hier).
- [ ] **Mini-kaart op detail.** Op de detailpagina, blok **Localização**. *Goed:* een kaartje met
  een pin + tekst "📍 concelho, ilha · Locatie bij benadering" (bij benadering per eiland/gemeente).
- [ ] **Bewerken via dashboard.** `/pt/painel` → bij de advertentie **Editar** → wijzig iets →
  opslaan. *Goed:* de wijziging is zichtbaar op de detailpagina.
- [ ] **Depubliceren / verwijderen.** In het dashboard: **Despublicar** (status → Rascunho, valt
  uit `/pt/imoveis`) en/of **Eliminar** (bevestigen). *Goed:* status/lijst updaten meteen.

> **Als iets misgaat:** foto blijft placeholder of laadt niet → bucket `listing-photos` staat niet
> op **public** of het upload-/leesbeleid ontbreekt (migratie 0002/0003). Publiceren geeft een
> foutmelding → controleer of je account **zakelijk/admin** is en of je nog ingelogd bent.

---

## 4. Huur-flow (aanvraag → accepteren → chatten → intrekken)

Je hebt **twee accounts** nodig: de **verhuurder** (zakelijk account dat de huurwoning bezit) en
een **huurder** (een tweede, particulier account — gebruik een incognitovenster). De woning moet
van het type **PROPERTY_RENT** of **HOLIDAY_RENT** zijn (alleen dan verschijnt het aanvraagformulier).

- [ ] **Huuraanvraag versturen (als huurder).** Log in als huurder → open de detailpagina van de
  huurwoning → blok **Pedir para arrendar** → vul startdatum, einddatum, bericht → klik de knop
  **Pedir para arrendar**. *Goed:* groene bevestiging "Pedido enviado ao senhorio."
- [ ] **Verhuurder ziet de aanvraag.** Log in als verhuurder → `/pt/painel` → sectie **Pedidos de
  arrendamento**. *Goed:* de aanvraag staat er met status **Pendente** (amber) en de juiste
  data/bericht. (De aanvraag komt automatisch bij de échte eigenaar terecht — een huurder kan
  hem niet naar een willekeurig ander account sturen.)
- [ ] **Accepteren.** Klik **Aceitar**. *Goed:* status wordt **Aceite** (groen) en er verschijnt
  een **Mensagem**-knop.
- [ ] **Chatthread opent.** Klik **Mensagem** → `/pt/mensagens/<id>`. *Goed:* een chatscherm met
  het aanvraag-id in de URL.
- [ ] **Beide partijen kunnen chatten.** Stuur een bericht als verhuurder; open dezelfde thread als
  huurder (`/pt/painel` → **Os meus pedidos** → **Mensagem** bij de geaccepteerde aanvraag) en
  antwoord. *Goed:* beide berichten verschijnen bij beide partijen (eigen berichten blauw/rechts,
  van de ander grijs/links; ververst automatisch elke paar seconden).
- [ ] **Huurder kan een openstaande aanvraag intrekken.** Doe een **tweede** aanvraag op een woning
  en laat die op **Pendente** staan → als huurder in `/pt/painel` → **Retirar** → bevestigen.
  *Goed:* status wordt **Retirado**.

> **Als iets misgaat:** geen aanvraagformulier op de detailpagina → de woning is geen
> PROPERTY_RENT/HOLIDAY_RENT. Aanvraag "wordt niet verzonden" → je bent niet ingelogd of de sessie
> is verlopen (opnieuw inloggen). Verhuurder ziet niets → je test per ongeluk met hetzelfde account
> als eigenaar én huurder; gebruik twee verschillende accounts.

---

## 5. Contract & verificatie

- [ ] **Pro-forma contract genereren.** `/pt/contrato` → vul verhuurder, huurder, woning en
  voorwaarden in. *Goed:* rechts verschijnt een live **Portugese** contractvoorbeeld dat meeloopt
  met je invoer.
- [ ] **Printen / PDF.** Klik **Imprimir / Guardar PDF**. *Goed:* het printvenster toont alleen het
  contractdocument (formulier en menu's vallen weg); "Opslaan als PDF" geeft een net document.
- [ ] **ID/selfie indienen.** Log in (elk account) → `/pt/verificar` (of via `/pt/verificacao` →
  knop **Verificar a minha identidade**) → kies documenttype (BI/Passaporte/NIF), upload een
  documentfoto (verplicht) + eventueel selfie, vink de toestemming aan → **Enviar para
  verificação**. *Goed:* groene melding "Recebido! O seu pedido está em análise…". Een tweede keer
  openen toont "Já tem um pedido em análise."
- [ ] **Aanvraag komt in /admin voor menselijke review.** Log in als **admin** → `/pt/admin` →
  tab **Verificações**. *Goed:* de aanvraag staat er (met knoppen **Ver documento** / **Ver selfie**).
- [ ] **Documenten alleen zichtbaar voor admin.** Klik **Ver documento**. *Goed:* opent via een
  tijdelijke (signed) URL — het document laadt. Verificatie is **mensenwerk**, nooit alleen AI.
- [ ] **Goedkeuren → trust-niveau stijgt.** Klik **Aprovar**. *Goed:* de aanvraag verdwijnt uit de
  lijst; in `profiles` (Table Editor) staat bij die gebruiker nu `verification_level = L1_IDENTITY`.
  De gebruiker ziet op `/pt/verificar` het nieuwe niveau als **Nível atual**.
- [ ] **verification-docs is NIET publiek.** Ga in Supabase → Storage → bucket **verification-docs**.
  *Goed:* de bucket is **Private** (niet public). Test desgewenst: kopieer het "public"-pad van een
  doc en open het in een incognitovenster → *Goed:* toegang geweigerd (geen bestand). Alleen de
  eigenaar en een admin (via signed URL) kunnen erbij.

> **Als iets misgaat:** upload faalt → bucket `verification-docs` of het schrijfbeleid ontbreekt
> (migratie 0002). Admin kan document niet openen → de admin-leesregel ontbreekt (migratie 0004),
> of je account is geen echte admin (`profiles.role`). Document tóch publiek benaderbaar → de bucket
> staat per ongeluk op public — zet hem op Private.

---

## 6. Admin / moderatie

- [ ] **/admin laadt voor de admin.** Log in als admin → `/pt/admin`. *Goed:* de **Consola de
  moderação** met de tabs **Verificações** en **Anúncios** laadt.
- [ ] **/admin geblokkeerd voor normale gebruiker.** Log in als particulier/zakelijk (niet-admin) →
  `/pt/admin`. *Goed:* je ziet de kaart "Área reservada à equipa de confiança e operações" —
  géén moderatie-inhoud.
- [ ] **Advertentie modereren/verwijderen.** `/pt/admin` → tab **Anúncios** → bij een advertentie
  **Despublicar**/**Publicar** of **Eliminar** (bevestigen). *Goed:* de status/lijst update meteen;
  een gedepubliceerde advertentie verdwijnt uit `/pt/imoveis`.
- [ ] **Info-editor werkt zonder velden te wissen.** `/pt/info/editor` → **Editar** bij een bestaand
  artikel → wijzig alleen de titel → **Guardar**. *Goed:* na opslaan zijn samenvatting, inhoud,
  entiteit en bron nog steeds gevuld (het bewerken laadt de **volledige** rij, dus opslaan wist niets).
- [ ] **Nieuw artikel maken/publiceren.** In `/pt/info/editor` → knop **Nova** → vul slug, categorie
  (bijv. `arrendamento`), PT-titel (verplicht) + samenvatting/inhoud → zet **Estado de publicação**
  op **Publicado** → **Guardar**. *Goed:* melding "Publicação guardada." en het artikel verschijnt
  op `/pt/info`.

> **Als iets misgaat:** admin-pagina's blokkeren jou terwijl je admin zou moeten zijn → `profiles.role`
> staat niet op `admin` voor jouw rij (opnieuw uit-/inloggen na het zetten). Opslaan in de editor lijkt
> velden leeg te maken → controleer of je een bestaande rij via **Editar** hebt geopend (niet **Nova**).

---

## 7. Info-centrum

- [ ] **/info toont artikelen per pijler.** Open `/pt/info`. *Goed:* de artikelen staan gegroepeerd
  onder kopjes zoals **Arrendamento**, **Compra e venda**, **Construção**, **Impostos** (en
  eventueel **Outros**); je ziet je ~6 artikelen met status-labels.
- [ ] **Detailpagina rendert.** Klik een artikel → `/pt/info/<slug>`. *Goed:* titel, entiteit,
  versie, datum, bron-link en de volledige tekst laden netjes.
- [ ] **"Verouderd melden" werkt.** Onderaan een detailpagina → **Report outdated / verouderd
  melden** → korte notitie → versturen. *Goed:* bevestiging dat de melding is ontvangen. Controleer
  in Supabase → Table Editor → `publication_flags` dat er een rij is bijgekomen.
- [ ] **Wisselt van taal mee.** Zet de taal op EN of NL (sectie 8) en herbekijk een artikel.
  *Goed:* titels/labels en (indien vertaald) de inhoud volgen de gekozen taal.

> **Als iets misgaat:** `/info` is leeg of mist artikelen → de seed-migraties (0006/0008/0010/0011)
> zijn niet gedraaid, of artikelen staan op **Rascunho** i.p.v. **Publicado** (alleen gepubliceerde
> tonen). Melding komt niet aan → controleer het `publication_flags`-beleid (migratie 0006).

---

## 8. i18n & mobiel

- [ ] **Talen wisselen (pt/en/nl).** Gebruik de taalknoppen rechtsboven (**PT / EN / NL**). *Goed:*
  de URL-prefix wisselt (`/pt` → `/en` → `/nl`) op **dezelfde** pagina, en de teksten veranderen mee.
- [ ] **Drie talen op kernpagina's.** Check minstens homepage, `/imoveis`, een detailpagina, `/info`
  en `/painel` in alle drie de talen. *Goed:* geen zichtbare vertaalsleutels (zoals `nav.info`) en
  geen lege teksten.
- [ ] **Mobiele weergave.** Open de site op een telefoon, of in de browser met een smalle
  venster-/apparaatweergave (DevTools → device toolbar, bijv. iPhone-breedte). *Goed:* hamburger-menu
  werkt, geen horizontale scrollbalk, foto's/kaart/tabellen blijven binnen het scherm, knoppen zijn
  aantikbaar.

> **Als iets misgaat:** je ziet ruwe sleutels of lege plekken → een ontbrekende vertaling.
> Kapotte mobiele layout / horizontaal scrollen → meestal een te breed blok (foto, kaart of tabel);
> noteer de pagina zodat het gericht opgelost kan worden.

---

## 9. SEO / analytics / domein

- [ ] **djarvista.com serveert de nieuwste build.** Open zowel `https://djarvista.com` als
  `https://www.djarvista.com`. *Goed:* beide laden de live site (apex stuurt door naar `/pt`), met
  je laatste wijzigingen zichtbaar. In Vercel staat het domein als **Valid/Assigned**.
- [ ] **sitemap.xml laadt.** Open `https://www.djarvista.com/sitemap.xml`. *Goed:* XML met URL's
  voor `/pt`, `/en`, `/nl` en de belangrijkste pagina's.
- [ ] **robots.txt laadt.** Open `https://www.djarvista.com/robots.txt`. *Goed:* `Allow: /` en een
  regel `Sitemap: https://www.djarvista.com/sitemap.xml`.
- [ ] **Vercel Analytics ontvangt hits.** Klik een paar pagina's aan; kijk in Vercel → project →
  **Analytics**. *Goed:* na enkele minuten verschijnen bezoeken/pageviews (Analytics moet in het
  Vercel-project **ingeschakeld** zijn).
- [ ] **Demo-banner is écht weg in productie.** (Herhaling van sectie 1, expliciet op het live domein.)
  *Goed:* geen oranje demo-balk — bewijs dat Supabase in de productie-build geconfigureerd is.

> **Als iets misgaat:** wijzigingen niet zichtbaar → de laatste deploy is niet gepromoveerd naar
> Production, of het domein wijst naar een oude deployment. Nog steeds demo-banner op het live domein
> → env-vars ontbreken in de **Production**-omgeving en/of er is niet geredeployd. Geen analytics →
> Analytics staat uit in Vercel.

---

## 10. Beveiligings-steekproeven

- [ ] **Normale gebruiker kan /admin NIET openen.** Als niet-admin → `/pt/admin`. *Goed:* alleen de
  "Área reservada"-kaart, geen verificaties of moderatie-acties.
- [ ] **Zelf `role=admin` zetten mislukt (verwacht).** Log in als een **normaal** account, open in de
  browser de app (zodat je met de anon-key werkt) en probeer via de app/console je eigen profiel te
  updaten naar `role='admin'`. Of eenvoudiger: vraag iemand dit te testen via de client. *Goed:* de
  rol blijft ongewijzigd — een database-trigger (migratie 0009) draait zelf-promotie terug. Ter
  controle in Table Editor: `role` van dat account staat nog op `private`/`business`.
  *(NB: een update via de Supabase **SQL Editor** mág wel slagen — dat draait als beheerder; dat is
  bedoeld. De test gaat over de gewone gebruiker in de browser.)*
- [ ] **Je kunt andermans verificatie-documenten niet lezen.** Log in als gebruiker A, kopieer het
  opslagpad van een doc van gebruiker B (zichtbaar in `verification_requests`), en probeer als A een
  signed/public URL voor dat pad te openen. *Goed:* toegang geweigerd — alleen de eigenaar of een
  admin komt bij `verification-docs`.
- [ ] **Recensie kan niet zelf "verified" gezet worden.** (Optioneel.) *Goed:* een auteur kan zijn
  eigen review niet als geverifieerd markeren — alleen trust/ops/admin (migratie 0009).
- [ ] **Huuraanvraag-injectie geblokkeerd.** (Optioneel.) *Goed:* een huurder kan een aanvraag niet
  in de inbox van een willekeurig slachtoffer plaatsen; `landlord_id` wordt server-side afgeleid van
  de echte eigenaar van de woning (migratie 0009).

> **Als iets misgaat:** lukt zelf-promotie tot admin wél vanuit de browser, of kan gebruiker A de
> docs van B lezen → een beveiligingsmigratie ontbreekt. Controleer dat **0004** (admin/trust-RLS)
> en **0009** (security hardening) allebei gedraaid zijn, en dat RLS op alle tabellen **aan** staat.

---

### Klaar om live te gaan?

Alle vinkjes gezet en geen openstaande "Als iets misgaat"-punt? Dan is Djarvista klaar voor gebruik.
Bewaar deze checklist en loop hem opnieuw door na grote wijzigingen of een nieuwe deploy.
