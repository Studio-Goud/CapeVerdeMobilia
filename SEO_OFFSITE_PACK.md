# Djarvista — Off-site, Local-SEO & GEO Execution Pack

Prepared 2026-07-22. All URLs verified live. Third-party contacts are **publicly listed**
(not invented) — re-check on the page before sending. Djarvista's **phone** and **street
address** are intentionally left blank (none exist yet — fill with real values only).

## 0. Canonical identity — lock this first (byte-for-byte everywhere)

| Field | Value |
|---|---|
| Name | **Djarvista** (never with a keyword suffix) |
| Website | **https://www.djarvista.com** (keep the `www`; matches the JSON-LD canonical) |
| Email | **info@djarvista.com** *(confirm this is monitored)* |
| Phone | **[your real +238 number — fill in]** |
| Location | **Mindelo, São Vicente, Cabo Verde** (run as a **service-area business**, hide the street until the legal entity is filed) |
| Descriptor (PT) | *"A porta digital independente para imóveis, terra, construção e informação oficial em Cabo Verde."* |
| Descriptor (EN) | *"The independent digital gateway to property, land, building and official information in Cabo Verde."* |

Two blockers for the "real" GBP/Wikidata: (a) legal form/registration is still `[…]` in `/termos`; (b) no published phone. You can create the profiles now as a service-area business; file the entity to unlock the strongest citations.

## 1. Google Business Profile (set up as a **service-area business**, address hidden)
1. Use a dedicated Google account you control (ideally the `info@djarvista.com` mailbox).
2. google.com/business → name exactly **`Djarvista`** (no suffix).
3. "Location customers can visit?" → **No** → "I deliver goods/services" (SAB).
4. Service area: **Cabo Verde** + São Vicente/Mindelo, then Sal, Santiago (Praia), Boa Vista, Santo Antão.
5. **Categories** (Google has no "portal" category): primary **`Real estate consultant`** or **`Property management company`** (fits "not an agency"); or **`Real estate agency`** for max reach. Secondary: `Software company`/`Internet marketing service`, `Media company`/`Publisher`, `Business to business service`.
6. **Verification**: try Search-Console fast-track first (verify the domain — §4); else **video verification** (walk-through showing you can manage the business + branded materials). Postcard is unreliable in CV.
7. **Description (PT, ready to paste):** *"A Djarvista é a porta digital independente para imóveis, terra, construção e informação oficial em Cabo Verde. Na nossa plataforma trilingue (português, inglês e neerlandês) pode pesquisar casas e terrenos à venda ou para arrendar em todas as ilhas, encontrar profissionais verificados (advogados, arquitetos, empresas de construção) e fornecedores de materiais, e consultar guias passo-a-passo sobre procedimentos como comprar um terreno, construir ou registar uma empresa. A Djarvista é uma plataforma self-service: não é agência imobiliária, não é parte contratual e não substitui as autoridades públicas. Sediada em Mindelo, São Vicente."* (No URLs/phones/CAPS in the description.)
8. Add **Services** (individual items in PT), **your own photos** (never stock), languages served = PT/EN/NL, opening date = **same as Wikidata inception**.
9. **Ongoing:** a Google Post every week or two; seed 3–5 Q&A ("É uma agência?", "Em que ilhas funciona?", "É gratuito anunciar?"); reviews flywheel (ask satisfied users/partners, reply to every review).

## 2. Wikidata entity
**Honesty gate:** create it only **after 2+ independent references exist** (chamber listing, a press article, business register) — otherwise it's deleted as non-notable/promotional. Do not create an unsourced item.

- **Label (en):** Djarvista · **Description (en):** *real-estate, services and official-information platform for Cape Verde* · **(pt):** *plataforma de imóveis, serviços e informação oficial de Cabo Verde*
- **Statements** (attach a `reference URL` P854 to each factual one): `instance of` (P31) = **business** (Q4830453); `country` (P17) = **Cape Verde** (Q1011); `headquarters location` (P159) = Mindelo; `official website` (P856) = https://www.djarvista.com; `inception` (P571) = **[real date]**; `industry` (P452) = real estate; `native label` (P1705) = Djarvista (pt); `language of work` (P407) = pt/en/nl; social handles (P2013/P2003/P2002/P4264) only if they exist.
- After it's live, add its **QID to the site `Organization` JSON-LD `sameAs`** (closes the loop). Keep tone strictly factual — no adjectives.

## 3. Local citations & backlinks (verified CV targets)

| Target | What | URL | Prio |
|---|---|---|---|
| **Câmara de Comércio de Barlavento** | Djarvista's home chamber, Mindelo/São Vicente — becomes a citation **and** the independent reference Wikidata needs | https://www.camara.cv | ★★★ |
| **Páginas Amarelas de Cabo Verde** | National yellow-pages / #1 directory | https://www.paginasamarelas.cv | ★★★ |
| **Mindel Insite** | São Vicente/Mindelo news — best-fit press | https://mindelinsite.com | ★★★ |
| **Expresso das Ilhas** | Major weekly (Rádio Morabeza in Mindelo) | https://expressodasilhas.cv | ★★ |
| **A Nação** | Independent national paper | https://www.anacao.cv | ★★ |
| **Inforpress** | State news agency — press release syndicates | https://inforpress.cv | ★★ |
| **Câmara de Comércio de Sotavento** | Praia/Santiago chamber (for expansion) | https://www.ccs.org.cv | ★★ |
| **CABO VERDE info** | Wiki-style portal — propose a neutral entry | https://caboverde-info.com | ★ |
| **GoAfrica Online CV** | Pan-African directory, self-register | https://www.goafricaonline.com/cv/annuaire | ★ |
| **Expat.com Cape Verde** | Directory for your EN/NL audience | https://www.expat.com/en/business/africa/cape-verde/ | ★ |

**Do first:** become a **camara.cv associado** (citation + the reference Wikidata needs), create a **Páginas Amarelas** listing, and pitch **Mindel Insite** — angle: *"Nova plataforma digital mindelense reúne imóveis, profissionais e informação oficial de Cabo Verde em três línguas"* (offer founder interview + screenshots). For Wikidata notability, prioritise the **editorial** mentions (chamber, press, business register) over self-submitted directories.

## 4. GEO checklist (get cited by AI assistants)
- **Structured data (shipped):** Organization + WebSite (search box), LocalBusiness per professional, RealEstateListing per property. **Upgrade:** add `sameAs` to the Organization node (Wikidata QID, GBP/Maps URL, socials, Páginas Amarelas, chamber) — the single biggest missing GEO signal; add `contactPoint` (email/phone, languages pt/en/nl) + `PostalAddress` (Mindelo/São Vicente/CV) + `foundingDate`. Validate in Google Rich Results Test.
- **Consistent NAP** everywhere (§0) — mixed www/non-www or name variants make engines distrust the entity.
- **`llms.txt` (shipped)** at /llms.txt. In **robots.txt**, deliberately allow AI crawlers you want to be cited by (GPTBot, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, CCBot).
- **Search Console + Bing Webmaster** — verify the domain, submit `/sitemap.xml` (ChatGPT/Copilot lean on Bing's index).
- **Be present in the §3 directories/press** — that corpus is what AI answers about "real estate in Cape Verde / Mindelo" are grounded in.
- **Clear factual "about" content:** add an **`/sobre` page** (PT/EN/NL) whose first two sentences state plainly what Djarvista is, where, languages, and that it's independent/self-service/not an agency/not a legal authority; add an **FAQ** with `FAQPage` schema ("What is Djarvista?", "Is it an agency?", "Which islands?", "Is listing free?", "Does it give legal advice?"). AI quotes clean first sentences.

### Suggested order
1. Search Console + Bing; submit sitemap. 2. `/sobre` + FAQ; robots AI rules; add `sameAs`/`contactPoint`/address to Organization JSON-LD. 3. Create GBP. 4. File entity → chamber + Páginas Amarelas listings + pitch Mindel Insite. 5. With 2+ references, create Wikidata and add its QID to `sameAs`.
