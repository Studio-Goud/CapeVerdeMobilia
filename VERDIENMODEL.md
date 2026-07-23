# Djarvista - verdienmodel (strategie)

Dit document beschrijft het doordachte verdienmodel: de strategie en de tarief-ladder.
Voor de technische betaal-plumbing (boost-lus, Stripe/Vinti4, abonnementen) zie
`PAYMENTS.md`. De publieke uitleg-pagina staat op `/anunciar`
(`src/app/[locale]/anunciar/page.tsx`); de prijzen op `/precos`.

## Kernprincipe

**Gratis aanbod, betaalde zichtbaarheid, verificatie als het echte product.**
De marktplaats (zoeken, plaatsen, contact) is en blijft gratis, want aanbod =
bezoekers = de enige asset die je later verzilvert. We rekenen alleen voor extra
zichtbaarheid en vertrouwen, nooit voor toegang. Alles wat betaald is, is
zichtbaar gelabeld ("Patrocinado"); officiele informatie blijft visueel los van
reclame. Prijzen zijn koopkracht-bewust en altijd "indicatief" tot ze vaststaan.

## Wat de marktleiders doen (samengevat uit diepgaand onderzoek, juli 2026)

Vier onderzoeksclusters (volledige, gebronde rapporten in de scratchpad-bestanden
`research-1..4`, zie ook onderaan):

1. **Trades / lead-gen** (Thumbtack, Angi, Bark, MyBuilder, Werkspot, TaskRabbit):
   de #1 faalmodus is pro's laten betalen voor leads die niet converteren (leidde
   tot de FTC-boete van $7,2M tegen HomeAdvisor). Beste model = betalen-op-echte-
   interesse (MyBuilder/Werkspot: pro betaalt pas als de klant hem kiest), naar
   1-3 pro's, met transparante lage prijzen. Consument altijd gratis.
2. **Verificatie / advertenties** (Google LSA, Yelp, Houzz, Nextdoor, Trustpilot):
   verificatie is de sterkste hefboom (zowel poort als conversie-booster).
   Monetiseer via een "Geverifieerd + Uitgelicht" abonnement, niet via een
   per-lead-veiling die volume vereist. Vermijd de Yelp-antipatronen (betaling
   die ranking/reviews lijkt te beinvloeden).
3. **Classifieds + cross-referral** (OLX, Marktplaats, FB Marketplace):
   gratis basis + gecapte, gelabelde betaalde zichtbaarheid (OLX ~3 Top-ads per
   10 organisch). De cross-referral (koop + laten installeren) is bewezen
   (~35% van Amazons omzet komt uit complementaire cross-sell), maar "automatisch
   doorgelinkt" is het gevaarwoord: dat is het Bark/Angi lead-doorverkoop-patroon
   met de FTC-boete. Bouw het als complementair, met toestemming, gelabeld,
   relevantie-gefilterd en gecapt.
4. **Vastgoedportalen** (Idealista, Imovirtual, Casa Sapo, Funda, Rightmove,
   Zoopla, Immoweb, Zillow): particulieren die moeten betalen om te plaatsen
   (Casa Sapo, Funda, Rightmove) verliezen hun aanbod aan gratis concurrenten.
   Houd particulier gratis; monetiseer via optionele "destaque" per week/maand +
   een licht, plat makelaarsplan. Per-lead is te vroeg voor een kleine markt.

## De tarief-ladder

Elke trede voegt waarde toe zonder ooit het gratis aanbod te belasten. Prijzen in
CVE, indicatief en koopkracht-aangepast.

| Trede | Wat | Prijs (indicatief) | Voor wie |
|------:|-----|--------------------|----------|
| 0. Vermelding | Woning, kavel, dienst of materiaal plaatsen; verschijnt in zoeken + kaart | Gratis, voor altijd | Iedereen |
| 1. Geclaimd profiel | Logo, foto's, openingstijden, contactknop | Gratis | Bedrijven |
| 2. Geverifieerd | Lokale verificatie (NIF, handelsregister, ID, adres) met menselijke controle; badge + toegang tot adverteren | ~250 CVE eenmalig (of in Pro-plan) | Bedrijven die vertrouwen willen |
| 3. Destaque (adverteren) | Homepage + bovenaan zoeken + grotere kaart + meer foto's + badge, gelabeld patrocinado | ~800 CVE/week of ~2.500 CVE/maand | Geverifieerde bedrijven/verkopers |
| 4. Gekoppelde dienst (cross-referral) | "Precisa de instalacao?"-slot: gesponsorde installateur bij een verkoper | ~2.500 CVE/maand per eiland+categorie | Geverifieerde installateurs |

**De scharnier: verificatie is de toegangspoort tot adverteren.** Je mag altijd
gratis vermeld staan, maar om te betalen voor zichtbaarheid moet je geverifieerd
zijn. Dat is de trigger om te verifieren, en het beschermt kopers: alles wat in
destaque op de homepage staat is een echt, gecontroleerd bedrijf.

Aansluitend op `/precos`: Particular (gratis) / Profissional (~1.500 CVE/mnd, incl.
verificatie + 1 destaque) / Empresa (~6.000 CVE/mnd) / Instituicao (B2G). Losse
diensten: verificatie ~250, contract e-sign ~500, destaque ~800/week, gekoppelde
dienst ~2.500/maand.

## Cross-referral (de "koop + laten installeren"-gedachte)

**Verdict: het idee is goed en bewezen** (het is de home-services-versie van
Amazons "frequently bought together"). **Maar bouw het NIET als "automatisch
doorgelinkt" (lead-doorverkoop).** Dat is precies het Bark/Angi/HomeAdvisor-
patroon met de slechtste reputatie, spamklachten en de grootste FTC-boete ($7,2M)
in deze categorie. Op een kleine markt is die vertrouwensschade fataal.

**Zo wel (guardrails, in de UI van de gekoppelde-dienst-slot):**
- Complementair (verkoper -> installateur), niet competitief (verkoper -> meer verkopers).
- Klant start zelf / opt-in ("Ook laten installeren? Toon installateurs"). Nooit stilletjes contactgegevens doorgeven.
- Relevantie + geo-filter (zelfde eiland + categorie). Nooit "hoogste bieder wint".
- Max 1-3 tonen, hooguit 1-2 contacteren. Nooit een veilinglijst.
- Label "Patrocinado" (niet "Promoted"; FTC vindt dat te vaag) + Verificado-badge.
- Afrekenen als vaste maandelijkse slot (voorspelbaar, weinig spamdruk), NIET per doorverkochte lead.
- Eerlijke cijfers naar installateurs; nooit leadkwaliteit overdrijven.

> Juridische check (geen juridisch advies, verificatie vereist): in sommige landen
> zijn verwijzingsvergoedingen in gereguleerde beroepen verboden (VS: RESPA sec. 8).
> Check de lokale CV-wetgeving voordat je per verwijzing laat betalen. De vaste-slot-
> variant (je verkoopt een advertentieplek, geen leads) ontwijkt dit grotendeels.

## Communicatie / chat gating

Splits "bereikbaar zijn" van "chat-tooling":
- **Bereikbaar blijft universeel.** Iedereen (ook niet-geverifieerd) houdt de
  contactknop (WhatsApp/telefoon/orcamento). Nooit contact achter een betaling
  zetten; dat doodt de liquiditeit.
- **In-platform chat/inbox** + "Responde rapido"-badge + offertegeschiedenis =
  perk voor geverifieerde bedrijven. Verificatie ontsluit betere gereedschappen en
  geloofwaardigheid, niet toegang.

## Vastgoed / kavels

Zelfde ladder. Harde regel: particulieren plaatsen altijd gratis (ook terrenos).
Monetiseer via optionele Destaque per week/maand. Eventueel OLX-truc: destaque-prijs
licht meeschalend met de vraagprijs (dure villa's/kavels subsidieren goedkope
advertenties). De paar makelaars: een licht, plat maandplan, geen Rightmove-
monopolieprijzen. Per-lead is nog te vroeg (geen volume/attributie/vertrouwen).

## Pedidos (het Werkspot-element)

"Plaats een klus -> geverifieerde vakmensen reageren", gemodelleerd op de bestaande
Concursos-infrastructuur (aanvraag -> reacties), maar voor consumenten. De aanvraag
gaat naar 1-3 relevante geverifieerde vakmensen (geen blind panel van 8).
Afrekenen op oprechte interesse (Werkspot/MyBuilder): de vakman betaalt pas als de
klant hem echt kiest/shortlist, niet bij elk contact (~100-300 CVE indicatief).
Eventueel gratis voor vakmensen bij de start om liquiditeit op te bouwen. Route
via `/pedidos/novo`.

## Status: gebouwd vs. nog te bouwen

Gebouwd (deze iteratie):
- `/anunciar`: publieke uitleg-pagina (tarief-ladder, voordelen, verificatie-poort,
  chat-gating, cross-referral met guardrails, vastgoed + pedidos). Drietalig, in nav
  (Profissionais-groep) en footer, in sitemap + SEO-meta.
- `/precos`: gekoppelde-dienst-slot toegevoegd + link naar `/anunciar` en `/como-pagar`.
- `/como-pagar`: betaalpagina met twee rails, gekoppeld aan de handmatige goedkeur-lus.
  Rail lokaal (Vinti4/MKesh/overschrijving naar de CV-rekening) + rail buitenland
  (kaart/PayPal in EUR voor investeerders/diaspora zonder CV-rekening). De echte
  betaalgegevens staan in `src/content/payments.ts` (placeholders tot ze ingevuld
  zijn; lege waarden tonen netjes "brevemente"). Dashboard toont na een
  Destaque-aanvraag een hint naar `/como-pagar`. Drietalig, in footer + sitemap + SEO.

Nog te bouwen (kandidaten, in volgorde van waarde):
- De cross-referral "Precisa de instalacao?"-module op de advertentie/dienst-detail
  (opt-in, gelabeld, gecapt, geo+categorie-gefilterd, geverifieerde installateurs).
- Verificatie als harde gate op het kopen van Destaque (nu handmatig via boost-lus).
- De Pedidos-module uitbreiden met de pay-on-interesse-afrekening.
- In-platform chat/inbox als geverifieerde perk.
- Betaalintegratie (Stripe/Vinti4) zodra er volume is; zie `PAYMENTS.md`.

## Bronnen

Diepgaand onderzoek (juli 2026), volledige gebronde rapporten in de scratchpad:
`research-1-services-leadgen.md`, `research-2-verification-ads.md`,
`research-3-classifieds-crossreferral.md`, `research-4-property-portals.md`.
Kernbronnen o.a.: FTC HomeAdvisor-order (jan 2023, $7,2M); Idealista/Imovirtual/
Casa Sapo/Funda/Rightmove/Zoopla tariefpagina's; OLX PT "Top de Anuncios"
(~3:10 cap); Werkspot/MyBuilder pay-on-interest; Amazon/Lowe's "buy + install";
Google Local Services Ads / "Google Guaranteed".
