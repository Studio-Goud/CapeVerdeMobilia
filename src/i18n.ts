// Djarvista demo - trilingual (PT / EN / NL) strings + fictional content.
// No database, no PII. UI strings and demo content are both localized.
import { placeholderImage } from './lib/placeholder';

export type Locale = 'pt' | 'en' | 'nl';
export const LOCALES: Locale[] = ['pt', 'en', 'nl'];
export const DEFAULT_LOCALE: Locale = 'pt';
export const LOCALE_NAMES: Record<Locale, string> = { pt: 'PT', en: 'EN', nl: 'NL' };
export const isLocale = (v: string): v is Locale => (LOCALES as string[]).includes(v);

/** A translatable string in the three demo languages. */
export type TL = Record<Locale, string>;
export const tr = (v: TL, l: Locale): string => v[l] ?? v.pt ?? '';

// --- UI dictionary (interface chrome). Keys are derived from the object below. ---
const UI = {
  'brand.tagline': { pt: 'A porta digital para terra, construção e serviços em Cabo Verde', en: 'The digital gateway to property, building and public information in Cabo Verde', nl: 'De digitale toegangspoort tot vastgoed, bouw en overheidsinformatie in Kaapverdië' },

  // Navigation groups + items
  'nav.home': { pt: 'Início', en: 'Home', nl: 'Home' },
  'nav.group.property': { pt: 'Imóveis & terra', en: 'Property & land', nl: 'Vastgoed & grond' },
  'nav.group.pros': { pt: 'Profissionais', en: 'Professionals', nl: 'Professionals' },
  'nav.group.build': { pt: 'Construir', en: 'Build', nl: 'Bouwen' },
  'nav.group.gov': { pt: 'Informação oficial', en: 'Official', nl: 'Overheid' },
  'nav.imoveis': { pt: 'Todos os imóveis', en: 'All properties', nl: 'Alle vastgoed' },
  'nav.land': { pt: 'Terrenos', en: 'Land', nl: 'Bouwgrond' },
  'nav.newDev': { pt: 'Novos projetos', en: 'New developments', nl: 'Nieuwbouw' },
  'nav.commercial': { pt: 'Comercial', en: 'Commercial', nl: 'Commercieel' },
  'nav.map': { pt: 'Mapa', en: 'Map', nl: 'Kaart' },
  'nav.profissionais': { pt: 'Diretório de profissionais', en: 'Professionals directory', nl: 'Professionals-gids' },
  'nav.materials': { pt: 'Materiais & fornecedores', en: 'Materials & suppliers', nl: 'Bouwmaterialen & leveranciers' },
  'nav.services': { pt: 'Serviços', en: 'Services', nl: 'Diensten' },
  'nav.contract': { pt: 'Contrato de arrendamento', en: 'Rental contract', nl: 'Huurcontract' },
  'nav.rentals': { pt: 'Arrendar a minha casa', en: 'Rent out my home', nl: 'Mijn woning verhuren' },
  'nav.pricing': { pt: 'Preços', en: 'Pricing', nl: 'Prijzen' },
  'nav.publishWizard': { pt: 'Publicar em 3 passos', en: 'Publish in 3 steps', nl: 'Plaatsen in 3 stappen' },
  'dash.message': { pt: 'Mensagem', en: 'Message', nl: 'Bericht' },
  'dash.availability': { pt: 'Disponibilidade', en: 'Availability', nl: 'Beschikbaarheid' },
  'nav.postJob': { pt: 'Publicar pedido', en: 'Post a job', nl: 'Opdracht plaatsen' },
  'nav.wizard': { pt: 'Assistente de passos', en: 'Step assistant', nl: 'Stappen-assistent' },
  'nav.projects': { pt: 'Projetos de obra', en: 'Building projects', nl: 'Bouwprojecten' },
  'nav.tenders': { pt: 'Concursos & aberturas', en: 'Tenders & jobs', nl: 'Aanbestedingen' },
  'nav.info': { pt: 'Centro de informação', en: 'Information centre', nl: 'Informatiecentrum' },
  'nav.procedimentos': { pt: 'Procedimentos', en: 'Procedures', nl: 'Procedures' },
  'nav.verification': { pt: 'Confiança & verificação', en: 'Trust & verification', nl: 'Vertrouwen & verificatie' },
  'nav.login': { pt: 'Entrar', en: 'Log in', nl: 'Inloggen' },
  'nav.register': { pt: 'Criar conta', en: 'Sign up', nl: 'Account maken' },
  'nav.dashboard': { pt: 'O meu painel', en: 'My dashboard', nl: 'Mijn dashboard' },
  'nav.investir': { pt: 'Investidores', en: 'Investors', nl: 'Investeerders' },
  'nav.governo': { pt: 'Para entidades públicas', en: 'For public bodies', nl: 'Voor overheden' },
  'nav.admin': { pt: 'Administração', en: 'Admin', nl: 'Beheer' },
  'nav.logout': { pt: 'Sair', en: 'Log out', nl: 'Uitloggen' },
  'nav.menu': { pt: 'Menu', en: 'Menu', nl: 'Menu' },
  'nav.close': { pt: 'Fechar', en: 'Close', nl: 'Sluiten' },
  'nav.soon': { pt: 'Em breve', en: 'Soon', nl: 'Binnenkort' },

  // Common
  'common.search': { pt: 'Pesquisar', en: 'Search', nl: 'Zoeken' },
  'common.filter': { pt: 'Filtrar', en: 'Filter', nl: 'Filteren' },
  'common.viewAll': { pt: 'Ver todos', en: 'View all', nl: 'Bekijk alles' },
  'common.results': { pt: 'resultado(s)', en: 'result(s)', nl: 'resulta(a)t(en)' },
  'common.noListings': { pt: 'Ainda não há anúncios aqui.', en: 'No listings here yet.', nl: 'Hier staan nog geen advertenties.' },
  'common.beFirst': { pt: 'Seja o primeiro a publicar', en: 'Be the first to list', nl: 'Wees de eerste die plaatst' },
  'common.send': { pt: 'Enviar', en: 'Send', nl: 'Versturen' },
  'common.close': { pt: 'Fechar', en: 'Close', nl: 'Sluiten' },
  'common.priceOnRequest': { pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' },
  'common.sponsored': { pt: 'Patrocinado', en: 'Sponsored', nl: 'Gesponsord' },
  'common.back': { pt: 'Voltar', en: 'Back', nl: 'Terug' },
  'common.island': { pt: 'Ilha', en: 'Island', nl: 'Eiland' },
  'common.type': { pt: 'Tipo', en: 'Type', nl: 'Type' },
  'common.all': { pt: 'Todos', en: 'All', nl: 'Alle' },
  'common.category': { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  'dir.searchPlaceholder': { pt: 'Nome, categoria…', en: 'Name, category…', nl: 'Naam, categorie…' },
  'common.optional': { pt: 'opcional', en: 'optional', nl: 'optioneel' },
  'common.continue': { pt: 'Continuar', en: 'Continue', nl: 'Doorgaan' },
  'common.next': { pt: 'Seguinte', en: 'Next', nl: 'Volgende' },
  'common.restart': { pt: 'Recomeçar', en: 'Start over', nl: 'Opnieuw' },
  'common.open': { pt: 'Abrir', en: 'Open', nl: 'Openen' },
  'common.demoAction': { pt: 'Demonstração - ação sem efeito real.', en: 'Demo - action has no real effect.', nl: 'Demo - actie heeft geen echt effect.' },

  'demo.banner': { pt: 'Demonstração · dados fictícios - não é um serviço real.', en: 'Demo · fictional data - not a real service.', nl: 'Demo · fictieve data - geen echte dienst.' },

  // Home
  'home.heroTitle': { pt: 'Terra, imóveis, construção e informação oficial num só lugar', en: 'Land, property, building and official information in one place', nl: 'Grond, vastgoed, bouw en officiële informatie op één plek' },
  'home.heroSubtitle': { pt: 'Encontre, verifique e contacte com confiança - a começar por São Vicente.', en: 'Find, verify and contact with confidence - starting on São Vicente.', nl: 'Vind, verifieer en neem met vertrouwen contact op - te beginnen op São Vicente.' },
  'home.searchPlaceholder': { pt: 'Pesquisar imóveis, terrenos, zonas…', en: 'Search properties, land, areas…', nl: 'Zoek vastgoed, grond, gebieden…' },
  'home.land': { pt: 'Terrenos', en: 'Land', nl: 'Bouwgrond' },
  'home.verifiedPros': { pt: 'Profissionais verificados', en: 'Verified professionals', nl: 'Geverifieerde professionals' },
  'home.howTo': { pt: 'Como comprar e construir', en: 'How to buy and build', nl: 'Zo koop en bouw je' },
  'home.featured': { pt: 'Imóveis em destaque', en: 'Featured properties', nl: 'Uitgelicht vastgoed' },
  'home.professionals': { pt: 'Profissionais', en: 'Professionals', nl: 'Professionals' },
  'home.modulesTitle': { pt: 'Tudo o que precisa, num só ecossistema', en: 'Everything you need, in one ecosystem', nl: 'Alles wat je nodig hebt, in één ecosysteem' },
  'home.modulesIntro': { pt: 'Cinco níveis de valor: informação, confiança, visibilidade, transações e acompanhamento.', en: 'Five levels of value: information, trust, visibility, transactions and guidance.', nl: 'Vijf waardeniveaus: informatie, vertrouwen, vindbaarheid, transacties en begeleiding.' },
  'home.trustTitle': { pt: 'Confiança em primeiro lugar', en: 'Trust first', nl: 'Vertrouwen voorop' },
  'home.trustBody': { pt: 'Mostramos sempre quem publicou, quando foi atualizado e o que está verificado. A informação oficial é visualmente distinta da comercial.', en: 'We always show who published, when it was updated and what is verified. Official information is visually distinct from commercial.', nl: 'We tonen altijd wie iets plaatste, wanneer het is bijgewerkt en wat geverifieerd is. Officiële informatie is visueel onderscheiden van commerciële.' },
  'home.ctaTitle': { pt: 'Particular ou empresa? Crie a sua conta.', en: 'Private or business? Create your account.', nl: 'Particulier of zakelijk? Maak je account aan.' },
  'home.ctaBody': { pt: 'Guarde favoritos e pesquisas, ou publique imóveis, receba pedidos e faça a gestão de projetos.', en: 'Save favourites and searches, or list properties, receive jobs and manage projects.', nl: 'Bewaar favorieten en zoekopdrachten, of plaats vastgoed, ontvang opdrachten en beheer projecten.' },
  'home.forBuyers': { pt: 'Para compradores & investidores', en: 'For buyers & investors', nl: 'Voor kopers & investeerders' },
  'home.forPros': { pt: 'Para profissionais & empresas', en: 'For professionals & businesses', nl: 'Voor professionals & bedrijven' },
  'home.forGov': { pt: 'Para entidades públicas', en: 'For public bodies', nl: 'Voor overheidsinstanties' },
  'home.listTitle': { pt: 'Tem uma casa para vender ou arrendar?', en: 'Have a home to sell or rent out?', nl: 'Heb je een huis te koop of te huur?' },
  'home.listBody': { pt: 'Coloque o seu imóvel em poucos minutos: tire fotos, descreva e publique. Simples, direto e sem intermediários.', en: 'List your property in minutes: take photos, describe it and publish. Simple, direct and without middlemen.', nl: 'Plaats je woning in enkele minuten: maak foto’s, beschrijf en publiceer. Eenvoudig, direct en zonder tussenpersonen.' },
  'home.listSale': { pt: 'Anunciar para venda', en: 'List for sale', nl: 'Plaatsen voor verkoop' },
  'home.listRent': { pt: 'Anunciar para arrendar', en: 'List for rent', nl: 'Plaatsen voor verhuur' },

  // Listing detail
  'listing.description': { pt: 'Descrição', en: 'Description', nl: 'Omschrijving' },
  'listing.features': { pt: 'Características', en: 'Features', nl: 'Kenmerken' },
  'listing.terrain': { pt: 'Terreno', en: 'Land', nl: 'Grond' },
  'listing.bedrooms': { pt: 'Quartos', en: 'Bedrooms', nl: 'Slaapkamers' },
  'listing.bathrooms': { pt: 'WC', en: 'Bathrooms', nl: 'Badkamers' },
  'listing.builtArea': { pt: 'Área const.', en: 'Built area', nl: 'Woonopp.' },
  'listing.plot': { pt: 'Terreno', en: 'Plot', nl: 'Perceel' },
  'listing.area': { pt: 'Área', en: 'Area', nl: 'Oppervlakte' },
  'listing.zoning': { pt: 'Zonamento', en: 'Zoning', nl: 'Bestemming' },
  'listing.buildable': { pt: 'Construível', en: 'Buildable', nl: 'Bebouwbaar' },
  'listing.yesToConfirm': { pt: 'Sim (a confirmar)', en: 'Yes (to confirm)', nl: 'Ja (te bevestigen)' },
  'listing.toConfirm': { pt: 'Por confirmar', en: 'To confirm', nl: 'Te bevestigen' },
  'listing.trust': { pt: 'Confiança & documentos', en: 'Trust & documents', nl: 'Vertrouwen & documenten' },
  'listing.lastVerified': { pt: 'Última verificação', en: 'Last verified', nl: 'Laatst geverifieerd' },
  'listing.published': { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  'listing.commercialNote': { pt: 'Informação comercial indicativa. A Djarvista não confirma a propriedade legal nem substitui a devida diligência jurídica.', en: 'Indicative commercial information. Djarvista does not confirm legal ownership and does not replace proper legal due diligence.', nl: 'Indicatieve commerciële informatie. Djarvista bevestigt geen juridisch eigendom en vervangt geen juridische due diligence.' },
  'listing.contactVisit': { pt: 'Contactar / agendar visita', en: 'Contact / schedule a viewing', nl: 'Contact / bezichtiging plannen' },
  'listing.save': { pt: 'Guardar', en: 'Save', nl: 'Bewaren' },
  'listing.saved': { pt: 'Guardado', en: 'Saved', nl: 'Bewaard' },

  // Professionals
  'pros.title': { pt: 'Profissionais e empresas', en: 'Professionals and businesses', nl: 'Professionals en bedrijven' },
  'pros.intro': { pt: 'Encontre profissionais verificados para construção, renovação e serviços. As avaliações “verificadas” têm prova de uma transação ou projeto real.', en: 'Find verified professionals for construction, renovation and services. “Verified” reviews have proof of a real transaction or project.', nl: 'Vind geverifieerde professionals voor bouw, renovatie en diensten. “Geverifieerde” reviews hebben bewijs van een echte transactie of project.' },
  'pros.noReviews': { pt: 'Sem avaliações', en: 'No reviews', nl: 'Geen reviews' },
  'pros.requestQuote': { pt: 'Pedir orçamento', en: 'Request a quote', nl: 'Offerte aanvragen' },
  'pros.profession': { pt: 'Profissão', en: 'Profession', nl: 'Beroep' },

  // Seeded ("phone-book") directory entries + claim flow
  'claim.unclaimed': { pt: 'Não reclamado', en: 'Unclaimed', nl: 'Niet geclaimd' },
  'claim.seededNote': { pt: 'Listagem criada a partir de fontes públicas. Ainda não foi reclamada pelo proprietário.', en: 'Listing created from public sources. It has not yet been claimed by the owner.', nl: 'Vermelding samengesteld uit openbare bronnen. Nog niet geclaimd door de eigenaar.' },
  'claim.source': { pt: 'Fonte', en: 'Source', nl: 'Bron' },
  'claim.cta': { pt: 'É o seu negócio? Reclame este perfil', en: 'Is this your business? Claim this profile', nl: 'Is dit jouw bedrijf? Claim dit profiel' },
  'claim.loginFirst': { pt: 'Inicie sessão (conta empresarial) para reclamar este perfil.', en: 'Log in (business account) to claim this profile.', nl: 'Log in (zakelijk account) om dit profiel te claimen.' },
  'claim.explain': { pt: 'Diga-nos quem é e como podemos confirmar que o negócio é seu (por ex., o número de telefone do negócio). A nossa equipa verifica cada pedido manualmente.', en: 'Tell us who you are and how we can confirm the business is yours (e.g. the business phone number). Our team verifies every request manually.', nl: 'Vertel ons wie je bent en hoe we kunnen bevestigen dat het bedrijf van jou is (bijv. het telefoonnummer van het bedrijf). Ons team controleert elke aanvraag handmatig.' },
  'claim.message': { pt: 'Quem é e qual é a sua ligação ao negócio?', en: 'Who are you and what is your connection to the business?', nl: 'Wie ben je en wat is je band met het bedrijf?' },
  'claim.phone': { pt: 'Telefone para verificação', en: 'Phone for verification', nl: 'Telefoon voor verificatie' },
  'claim.submit': { pt: 'Enviar pedido de reclamação', en: 'Submit claim request', nl: 'Claimverzoek versturen' },
  'claim.sent': { pt: 'Pedido enviado. A nossa equipa vai verificar e entrar em contacto.', en: 'Request sent. Our team will verify and get in touch.', nl: 'Verzoek verstuurd. Ons team controleert het en neemt contact op.' },
  'claim.already': { pt: 'Já existe um pedido pendente para este perfil.', en: 'There is already a pending request for this profile.', nl: 'Er is al een lopende aanvraag voor dit profiel.' },
  'claim.contactDirect': { pt: 'Contacto (fonte pública)', en: 'Contact (public source)', nl: 'Contact (openbare bron)' },
  'claim.leadsAfterClaim': { pt: 'O formulário de contacto fica ativo depois de o perfil ser reclamado pelo proprietário.', en: 'The contact form becomes active once the owner claims this profile.', nl: 'Het contactformulier wordt actief zodra de eigenaar dit profiel heeft geclaimd.' },

  // Services (service advertisements)
  'services.title': { pt: 'Serviços anunciados', en: 'Advertised services', nl: 'Aangeboden diensten' },
  'services.intro': { pt: 'Serviços oferecidos por profissionais e empresas. Publique o seu próprio serviço numa secção separada dos imóveis.', en: 'Services offered by professionals and businesses. Post your own service in a section separate from properties.', nl: 'Diensten aangeboden door professionals en bedrijven. Plaats je eigen dienst in een aparte sectie los van het vastgoed.' },
  'services.post': { pt: 'Anunciar um serviço', en: 'Advertise a service', nl: 'Dienst aanbieden' },
  'services.from': { pt: 'A partir de', en: 'From', nl: 'Vanaf' },
  'services.none': { pt: 'Ainda não há serviços anunciados.', en: 'No services advertised yet.', nl: 'Nog geen diensten aangeboden.' },

  // Official info
  'info.title': { pt: 'Centro de informação oficial', en: 'Official information centre', nl: 'Centrum voor officiële informatie' },
  'info.intro': { pt: 'Informação publicada por, ou resumida a partir de, fontes oficiais. Cada página indica a entidade responsável, o estado oficial e a data de atualização. A Djarvista não substitui as entidades públicas nem presta aconselhamento jurídico.', en: 'Information published by, or summarized from, official sources. Each page states the responsible authority, the official status and the update date. Djarvista does not replace public bodies and does not give legal advice.', nl: 'Informatie gepubliceerd door, of samengevat uit, officiële bronnen. Elke pagina vermeldt de verantwoordelijke instantie, de officiële status en de bijwerkdatum. Djarvista vervangt geen overheidsinstanties en geeft geen juridisch advies.' },
  'info.version': { pt: 'Versão', en: 'Version', nl: 'Versie' },
  'info.updated': { pt: 'Atualizado', en: 'Updated', nl: 'Bijgewerkt' },
  'info.validFrom': { pt: 'Válido desde', en: 'Valid from', nl: 'Geldig vanaf' },
  'info.source': { pt: 'Fonte oficial', en: 'Official source', nl: 'Officiële bron' },
  'info.category': { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  'info.readMore': { pt: 'Ler mais', en: 'Read more', nl: 'Lees meer' },
  'info.reportOutdated': { pt: 'Reportar como desatualizado', en: 'Report as outdated', nl: 'Melden als verouderd' },
  'info.reportSent': { pt: 'Obrigado - vamos rever esta informação.', en: 'Thanks - we will review this information.', nl: 'Bedankt - we bekijken deze informatie.' },
  'info.editorLink': { pt: 'Editor de informação', en: 'Information editor', nl: 'Info-redactie' },
  'ostatus.official': { pt: 'Oficial', en: 'Official', nl: 'Officieel' },
  'ostatus.summary': { pt: 'Resumo da plataforma', en: 'Platform summary', nl: 'Platformsamenvatting' },
  'ostatus.unconfirmed': { pt: 'Não confirmado', en: 'Not confirmed', nl: 'Niet bevestigd' },
  'ostatus.outdated': { pt: 'Desatualizado', en: 'Outdated', nl: 'Verouderd' },
  'ostatus.in_revision': { pt: 'Em revisão', en: 'In revision', nl: 'In herziening' },

  // Procedures
  'proc.title': { pt: 'Procedimentos passo a passo', en: 'Step-by-step procedures', nl: 'Procedures stap voor stap' },
  'proc.intro': { pt: 'A maioria das pessoas começa por se orientar aqui, no Djarvista - primeiro compara imóveis ou terrenos e só depois segue o caminho oficial junto da Câmara Municipal, do notário e das Finanças. Estes guias mostram esse percurso passo a passo: quem faz o quê, que documentos leva e quanto tempo costuma demorar. São indicativos e não constituem aconselhamento jurídico - confirme sempre com as entidades competentes.', en: 'Most people start by orienting themselves here on Djarvista - first comparing homes or land, and only then following the official path via the municipality, the notary and the tax office. These guides walk you through that journey step by step: who does what, which documents to bring and how long it usually takes. They are indicative and not legal advice - always confirm with the competent authorities.', nl: 'De meeste mensen beginnen hier, op Djarvista, met oriënteren - eerst woningen of grond vergelijken en pas daarna het officiële traject volgen via de gemeente (Câmara Municipal), de notaris en de Belastingdienst. Deze gidsen lopen dat traject stap voor stap met je door: wie doet wat, welke documenten je meeneemt en hoe lang het meestal duurt. Ze zijn indicatief en vormen geen juridisch advies - bevestig altijd bij de bevoegde instanties.' },
  'proc.overview': { pt: 'Como costuma correr', en: 'How it usually goes', nl: 'Hoe het meestal verloopt' },
  'proc.watchOut': { pt: 'A ter em atenção em Cabo Verde', en: 'What to watch out for in Cabo Verde', nl: 'Waar je in Kaapverdië op moet letten' },
  'proc.stepTip': { pt: 'Boa prática', en: 'Good practice', nl: 'Goed om te weten' },
  'proc.stepsLabel': { pt: 'Passos, um a um', en: 'The steps, one by one', nl: 'De stappen, één voor één' },
  'proc.steps': { pt: 'passos', en: 'steps', nl: 'stappen' },
  'proc.entity': { pt: 'Entidade', en: 'Authority', nl: 'Instantie' },
  'proc.documents': { pt: 'Documentos', en: 'Documents', nl: 'Documenten' },
  'proc.duration': { pt: 'Duração', en: 'Duration', nl: 'Duur' },
  'proc.days': { pt: 'dias', en: 'days', nl: 'dagen' },
  'proc.estDuration': { pt: 'duração estimada', en: 'estimated duration', nl: 'geschatte duur' },
  'proc.disclaimer': { pt: 'Esta informação é indicativa e pode estar desatualizada. Confirme sempre com as entidades competentes. A Djarvista não presta aconselhamento jurídico.', en: 'This information is indicative and may be outdated. Always confirm with the competent authorities. Djarvista does not provide legal advice.', nl: 'Deze informatie is indicatief en kan verouderd zijn. Bevestig altijd bij de bevoegde instanties. Djarvista geeft geen juridisch advies.' },

  // Post a job
  'job.title': { pt: 'Publicar um pedido', en: 'Post a job', nl: 'Een opdracht plaatsen' },
  'job.intro': { pt: 'Descreva o trabalho e receba orçamentos de profissionais verificados. No piloto de São Vicente, a nossa equipa acompanha cada pedido pessoalmente (modelo concierge).', en: 'Describe the work and receive quotes from verified professionals. In the São Vicente pilot our team supports each request personally (concierge model).', nl: 'Beschrijf het werk en ontvang offertes van geverifieerde professionals. In de São Vicente-pilot begeleidt ons team elke aanvraag persoonlijk (concierge-model).' },
  'job.s1': { pt: 'Descreva o trabalho, categoria e localização', en: 'Describe the work, category and location', nl: 'Beschrijf het werk, de categorie en locatie' },
  'job.s2': { pt: 'Adicione fotos e um orçamento indicativo', en: 'Add photos and an indicative budget', nl: 'Voeg foto’s en een indicatief budget toe' },
  'job.s3': { pt: 'Convide profissionais e compare orçamentos', en: 'Invite professionals and compare quotes', nl: 'Nodig professionals uit en vergelijk offertes' },
  'job.s4': { pt: 'Selecione um profissional e acompanhe o projeto', en: 'Select a professional and follow the project', nl: 'Kies een professional en volg het project' },
  'job.describe': { pt: 'Descreva o seu pedido', en: 'Describe your request', nl: 'Beschrijf je aanvraag' },
  'job.whatsapp': { pt: 'Prefere WhatsApp? Fale connosco', en: 'Prefer WhatsApp? Talk to us', nl: 'Liever WhatsApp? Neem contact op' },

  // Lead form
  'lead.name': { pt: 'Nome', en: 'Name', nl: 'Naam' },
  'lead.email': { pt: 'Email (opcional)', en: 'Email (optional)', nl: 'E-mail (optioneel)' },
  'lead.phone': { pt: 'Telefone / WhatsApp (opcional)', en: 'Phone / WhatsApp (optional)', nl: 'Telefoon / WhatsApp (optioneel)' },
  'lead.message': { pt: 'A sua mensagem', en: 'Your message', nl: 'Je bericht' },
  'lead.ok': { pt: 'Mensagem recebida. Entraremos em contacto em breve.', en: 'Message received. We will get in touch shortly.', nl: 'Bericht ontvangen. We nemen binnenkort contact op.' },
  'lead.viaSuffix': { pt: '- pedido enviado através do Djarvista (djarvista.com)', en: '- request sent via Djarvista (djarvista.com)', nl: '- aanvraag verzonden via Djarvista (djarvista.com)' },
  'contact.viaNote': { pt: 'O seu pedido mostra ao negócio que chegou através do Djarvista.', en: 'Your request shows the business it came through Djarvista.', nl: 'Je aanvraag laat het bedrijf zien dat die via Djarvista binnenkwam.' },
  'contact.whatsapp': { pt: 'Pedir orçamento por WhatsApp', en: 'Request a quote on WhatsApp', nl: 'Offerte aanvragen via WhatsApp' },
  'contact.call': { pt: 'Ligar', en: 'Call', nl: 'Bellen' },

  // Footer
  'footer.body': { pt: 'Infraestrutura digital independente para imóveis, construção e informação pública em Cabo Verde. A informação comercial é indicativa; a informação oficial é claramente identificada. A Djarvista não presta aconselhamento jurídico.', en: 'Independent digital infrastructure for property, building and public information in Cabo Verde. Commercial information is indicative; official information is clearly identified. Djarvista does not provide legal advice.', nl: 'Onafhankelijke digitale infrastructuur voor vastgoed, bouw en overheidsinformatie in Kaapverdië. Commerciële informatie is indicatief; officiële informatie is duidelijk herkenbaar. Djarvista geeft geen juridisch advies.' },
  'footer.demo': { pt: 'Demonstração · dados fictícios · piloto conceptual São Vicente', en: 'Demo · fictional data · conceptual São Vicente pilot', nl: 'Demo · fictieve data · conceptuele São Vicente-pilot' },
  'footer.explore': { pt: 'Explorar', en: 'Explore', nl: 'Ontdek' },
  'footer.account': { pt: 'Conta', en: 'Account', nl: 'Account' },
  'footer.rights': { pt: 'Djarvista · Cabo Verde - a começar por São Vicente', en: 'Djarvista · Cape Verde - starting on São Vicente', nl: 'Djarvista · Kaapverdië - te beginnen op São Vicente' },
  'footer.terms': { pt: 'Termos de utilização', en: 'Terms of use', nl: 'Gebruiksvoorwaarden' },
  'footer.privacy': { pt: 'Privacidade', en: 'Privacy', nl: 'Privacy' },

  // Not found
  'notfound.title': { pt: 'Página não encontrada', en: 'Page not found', nl: 'Pagina niet gevonden' },
  'notfound.body': { pt: 'O conteúdo que procura não existe ou foi removido.', en: 'The content you are looking for does not exist or was removed.', nl: 'De pagina die je zoekt bestaat niet of is verwijderd.' },
  'notfound.home': { pt: 'Voltar ao início', en: 'Back to home', nl: 'Terug naar start' },

  // Official tags
  'official.official': { pt: 'Oficial', en: 'Official', nl: 'Officieel' },
  'official.summary': { pt: 'Resumo da plataforma', en: 'Platform summary', nl: 'Platformsamenvatting' },
  'official.unconfirmed': { pt: 'Não confirmado oficialmente', en: 'Not officially confirmed', nl: 'Niet officieel bevestigd' },

  // Document status
  'doc.VERIFIED': { pt: 'Documentos verificados', en: 'Documents verified', nl: 'Documenten geverifieerd' },
  'doc.UPLOADED': { pt: 'Documentos carregados', en: 'Documents uploaded', nl: 'Documenten geüpload' },
  'doc.DECLARED': { pt: 'Documentos declarados', en: 'Documents declared', nl: 'Documenten opgegeven' },
  'doc.DISPUTED': { pt: 'Em disputa', en: 'Disputed', nl: 'In geschil' },
  'doc.UNKNOWN': { pt: 'Documentos por confirmar', en: 'Documents to confirm', nl: 'Documenten te bevestigen' },

  // Verification levels (short labels)
  'verif.L0': { pt: 'Não verificado', en: 'Not verified', nl: 'Niet geverifieerd' },
  'verif.L1': { pt: 'Identidade verificada', en: 'Identity verified', nl: 'Identiteit geverifieerd' },
  'verif.L2': { pt: 'Empresa verificada', en: 'Business verified', nl: 'Bedrijf geverifieerd' },
  'verif.L3': { pt: 'Documentos verificados', en: 'Documents verified', nl: 'Documenten geverifieerd' },
  'verif.L4': { pt: 'Transação verificada', en: 'Transaction verified', nl: 'Transactie geverifieerd' },
  'verif.L5': { pt: 'Parceiro institucional', en: 'Institutional partner', nl: 'Institutionele partner' },

  // Auth
  'auth.loginTitle': { pt: 'Entrar na Djarvista', en: 'Log in to Djarvista', nl: 'Inloggen bij Djarvista' },
  'auth.loginSubtitle': { pt: 'Aceda ao seu painel de particular ou empresa.', en: 'Access your private or business dashboard.', nl: 'Ga naar je particuliere of zakelijke dashboard.' },
  'auth.registerTitle': { pt: 'Criar uma conta', en: 'Create an account', nl: 'Een account aanmaken' },
  'auth.registerSubtitle': { pt: 'Escolha o tipo de conta que melhor descreve o que precisa.', en: 'Choose the account type that best describes your needs.', nl: 'Kies het accounttype dat het best bij je past.' },
  'auth.email': { pt: 'Email', en: 'Email', nl: 'E-mail' },
  'auth.password': { pt: 'Palavra-passe', en: 'Password', nl: 'Wachtwoord' },
  'auth.name': { pt: 'Nome', en: 'Name', nl: 'Naam' },
  'auth.companyName': { pt: 'Nome da empresa', en: 'Company name', nl: 'Bedrijfsnaam' },
  'auth.accountType': { pt: 'Tipo de conta', en: 'Account type', nl: 'Type account' },
  'auth.private': { pt: 'Particular', en: 'Private', nl: 'Particulier' },
  'auth.privateDesc': { pt: 'Comprar, arrendar, pedir orçamentos e seguir procedimentos.', en: 'Buy, rent, request quotes and follow procedures.', nl: 'Kopen, huren, offertes aanvragen en procedures volgen.' },
  'auth.business': { pt: 'Empresa / profissional', en: 'Business / professional', nl: 'Zakelijk / professional' },
  'auth.businessDesc': { pt: 'Publicar imóveis, receber pedidos, gerir projetos e verificação.', en: 'List properties, receive jobs, manage projects and verification.', nl: 'Vastgoed plaatsen, opdrachten ontvangen, projecten en verificatie beheren.' },
  'auth.loginBtn': { pt: 'Entrar', en: 'Log in', nl: 'Inloggen' },
  'auth.registerBtn': { pt: 'Criar conta', en: 'Create account', nl: 'Account aanmaken' },
  'auth.haveAccount': { pt: 'Já tem conta? Entrar', en: 'Already have an account? Log in', nl: 'Al een account? Inloggen' },
  'auth.noAccount': { pt: 'Não tem conta? Criar conta', en: 'No account? Sign up', nl: 'Nog geen account? Account maken' },
  'auth.demoNote': { pt: 'Login de demonstração: não é criada nenhuma conta real. Os dados ficam apenas no seu navegador e podem ser apagados a qualquer momento.', en: 'Demo login: no real account is created. Data stays only in your browser and can be cleared anytime.', nl: 'Demo-login: er wordt geen echt account aangemaakt. Gegevens blijven alleen in je browser en kun je altijd wissen.' },
  'auth.quickDemo': { pt: 'Ou experimente uma conta de demonstração:', en: 'Or try a demo account:', nl: 'Of probeer een demo-account:' },
  'auth.demoPrivate': { pt: 'Entrar como particular', en: 'Enter as private', nl: 'Inloggen als particulier' },
  'auth.demoBusiness': { pt: 'Entrar como empresa', en: 'Enter as business', nl: 'Inloggen als bedrijf' },

  // Dashboard
  'dash.hello': { pt: 'Olá', en: 'Hi', nl: 'Hallo' },
  'dash.private': { pt: 'Conta particular', en: 'Private account', nl: 'Particulier account' },
  'dash.business': { pt: 'Conta empresa / profissional', en: 'Business / professional account', nl: 'Zakelijk / professional account' },
  'dash.needLogin': { pt: 'Precisa de entrar para ver o painel.', en: 'You need to log in to see the dashboard.', nl: 'Je moet inloggen om het dashboard te zien.' },
  'dash.verification': { pt: 'Nível de verificação', en: 'Verification level', nl: 'Verificatieniveau' },
  'dash.raiseLevel': { pt: 'Aumentar nível de confiança', en: 'Raise trust level', nl: 'Vertrouwensniveau verhogen' },
  'dash.completeProfile': { pt: 'Complete o perfil', en: 'Complete your profile', nl: 'Profiel afronden' },
  'dash.empty': { pt: 'Ainda nada por aqui (demonstração).', en: 'Nothing here yet (demo).', nl: 'Nog niets hier (demo).' },
  // private widgets
  'dash.favorites': { pt: 'Imóveis guardados', en: 'Saved properties', nl: 'Bewaard vastgoed' },
  'dash.savedSearches': { pt: 'Pesquisas guardadas', en: 'Saved searches', nl: 'Bewaarde zoekopdrachten' },
  'dash.myRequests': { pt: 'Os meus pedidos', en: 'My requests', nl: 'Mijn aanvragen' },
  'dash.myChecklist': { pt: 'A minha checklist', en: 'My checklist', nl: 'Mijn checklist' },
  'dash.browseProps': { pt: 'Explorar imóveis', en: 'Browse properties', nl: 'Vastgoed bekijken' },
  'dash.startWizard': { pt: 'Abrir o assistente de passos', en: 'Open the step assistant', nl: 'Open de stappen-assistent' },
  // business widgets
  'dash.myListings': { pt: 'Os meus anúncios', en: 'My listings', nl: 'Mijn advertenties' },
  'dash.incomingLeads': { pt: 'Pedidos recebidos', en: 'Incoming leads', nl: 'Binnengekomen leads' },
  'dash.quotes': { pt: 'Orçamentos', en: 'Quotes', nl: 'Offertes' },
  'dash.projects': { pt: 'Projetos', en: 'Projects', nl: 'Projecten' },
  'dash.reviews': { pt: 'Avaliações', en: 'Reviews', nl: 'Reviews' },
  'dash.newListing': { pt: 'Publicar anúncio', en: 'New listing', nl: 'Advertentie plaatsen' },
  'dash.openTenders': { pt: 'Ver concursos abertos', en: 'View open tenders', nl: 'Open aanbestedingen' },
  'dash.active': { pt: 'ativo(s)', en: 'active', nl: 'actief' },
  'dash.pending': { pt: 'pendente(s)', en: 'pending', nl: 'in behandeling' },
  'dash.noLeads': { pt: 'Ainda sem pedidos recebidos.', en: 'No leads received yet.', nl: 'Nog geen leads ontvangen.' },
  'dash.publish': { pt: 'Publicar', en: 'Publish', nl: 'Publiceren' },
  'dash.unpublish': { pt: 'Despublicar', en: 'Unpublish', nl: 'Depubliceren' },
  'dash.delete': { pt: 'Eliminar', en: 'Delete', nl: 'Verwijderen' },
  'dash.confirmDelete': { pt: 'Eliminar este anúncio?', en: 'Delete this listing?', nl: 'Deze advertentie verwijderen?' },
  'dash.actionError': { pt: 'A ação não foi concluída. Tente novamente.', en: 'The action could not be completed. Please try again.', nl: 'De actie kon niet worden voltooid. Probeer het opnieuw.' },
  'dash.withdraw': { pt: 'Retirar pedido', en: 'Withdraw request', nl: 'Aanvraag intrekken' },
  'dash.proProfileTitle': { pt: 'Perfil profissional', en: 'Professional profile', nl: 'Professioneel profiel' },
  'dash.proProfileBody': { pt: 'Apareça no diretório de profissionais e receba pedidos de clientes.', en: 'Appear in the professionals directory and receive client leads.', nl: 'Verschijn in de vakmensen-gids en ontvang aanvragen van klanten.' },
  'dash.proProfileCta': { pt: 'Criar / editar perfil', en: 'Create / edit profile', nl: 'Profiel aanmaken / bewerken' },
  'dash.supplierTitle': { pt: 'Perfil de fornecedor', en: 'Supplier profile', nl: 'Leveranciersprofiel' },
  'dash.supplierBody': { pt: 'Apareça no diretório de materiais e receba pedidos de orçamento.', en: 'Appear in the materials directory and receive quote requests.', nl: 'Verschijn in de materialen-gids en ontvang offerteaanvragen.' },
  'dash.myTenders': { pt: 'Os meus concursos', en: 'My tenders', nl: 'Mijn aanbestedingen' },
  'dash.postTender': { pt: 'Publicar concurso', en: 'Post a tender', nl: 'Aanbesteding plaatsen' },
  'dash.noTenders': { pt: 'Ainda não publicou concursos.', en: 'You have not posted any tenders yet.', nl: 'Je hebt nog geen aanbestedingen geplaatst.' },
  'dash.myProjects': { pt: 'Os meus projetos', en: 'My projects', nl: 'Mijn projecten' },
  'dash.newProject': { pt: 'Adicionar projeto', en: 'Add project', nl: 'Project toevoegen' },
  'dash.noProjects': { pt: 'Ainda não adicionou projetos.', en: 'You have not added any projects yet.', nl: 'Je hebt nog geen projecten toegevoegd.' },
  'dash.boost': { pt: 'Destacar', en: 'Feature', nl: 'Uitlichten' },
  'dash.boostRequested': { pt: 'Pedido enviado', en: 'Requested', nl: 'Aangevraagd' },
  'dash.close': { pt: 'Fechar', en: 'Close', nl: 'Sluiten' },
  'dash.reopen': { pt: 'Reabrir', en: 'Reopen', nl: 'Heropenen' },
  'dash.draft': { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  'tend.state.open': { pt: 'Aberto', en: 'Open', nl: 'Open' },
  'tend.state.closed': { pt: 'Fechado', en: 'Closed', nl: 'Gesloten' },
  'tend.state.draft': { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  'dash.confirmWithdraw': { pt: 'Retirar este pedido de arrendamento?', en: 'Withdraw this rental request?', nl: 'Deze huuraanvraag intrekken?' },
  'dash.statusDraft': { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  'dash.statusPublished': { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  'dash.on': { pt: 'sobre', en: 'on', nl: 'over' },
  'dash.edit': { pt: 'Editar', en: 'Edit', nl: 'Bewerken' },
  'dash.rentalRequests': { pt: 'Pedidos de arrendamento', en: 'Rental requests', nl: 'Huuraanvragen' },
  'dash.myRentalRequests': { pt: 'Os meus pedidos de arrendamento', en: 'My rental requests', nl: 'Mijn huuraanvragen' },
  'dash.accept': { pt: 'Aceitar', en: 'Accept', nl: 'Accepteren' },
  'dash.decline': { pt: 'Recusar', en: 'Decline', nl: 'Afwijzen' },
  'dash.noRentals': { pt: 'Ainda sem pedidos de arrendamento.', en: 'No rental requests yet.', nl: 'Nog geen huuraanvragen.' },
  'rr.status.pending': { pt: 'Pendente', en: 'Pending', nl: 'In behandeling' },
  'rr.status.accepted': { pt: 'Aceite', en: 'Accepted', nl: 'Geaccepteerd' },
  'rr.status.declined': { pt: 'Recusado', en: 'Declined', nl: 'Afgewezen' },
  'rr.status.withdrawn': { pt: 'Retirado', en: 'Withdrawn', nl: 'Ingetrokken' },

  // Wizard
  'wiz.title': { pt: 'Assistente de passos', en: 'Step assistant', nl: 'Stappen-assistent' },
  'wiz.intro': { pt: 'Responda a três perguntas e receba um plano indicativo: passos, entidades, documentos, profissionais e riscos. Não é aconselhamento jurídico.', en: 'Answer three questions and get an indicative plan: steps, authorities, documents, professionals and risks. This is not legal advice.', nl: 'Beantwoord drie vragen en krijg een indicatief plan: stappen, instanties, documenten, professionals en risico’s. Dit is geen juridisch advies.' },
  'wiz.q1': { pt: 'Qual é o seu perfil?', en: 'Who are you?', nl: 'Wie ben je?' },
  'wiz.q2': { pt: 'O que pretende fazer?', en: 'What do you want to do?', nl: 'Wat wil je doen?' },
  'wiz.q3': { pt: 'Em que ilha?', en: 'On which island?', nl: 'Op welk eiland?' },
  'wiz.who.foreign': { pt: 'Comprador estrangeiro', en: 'Foreign buyer', nl: 'Buitenlandse koper' },
  'wiz.who.local': { pt: 'Comprador local', en: 'Local buyer', nl: 'Lokale koper' },
  'wiz.who.investor': { pt: 'Investidor', en: 'Investor', nl: 'Investeerder' },
  'wiz.goal.buyLand': { pt: 'Comprar terreno', en: 'Buy land', nl: 'Bouwgrond kopen' },
  'wiz.goal.build': { pt: 'Construir uma casa', en: 'Build a house', nl: 'Een huis bouwen' },
  'wiz.goal.buyHome': { pt: 'Comprar uma casa', en: 'Buy a house', nl: 'Een huis kopen' },
  'wiz.goal.business': { pt: 'Abrir uma empresa', en: 'Start a business', nl: 'Een bedrijf starten' },
  'wiz.result': { pt: 'O seu plano indicativo', en: 'Your indicative plan', nl: 'Jouw indicatieve plan' },
  'wiz.result.steps': { pt: 'Passos sugeridos', en: 'Suggested steps', nl: 'Voorgestelde stappen' },
  'wiz.result.pros': { pt: 'Profissionais que podem ajudar', en: 'Professionals who can help', nl: 'Professionals die kunnen helpen' },
  'wiz.result.risks': { pt: 'Riscos a vigiar', en: 'Risks to watch', nl: 'Risico’s om op te letten' },
  'wiz.result.cost': { pt: 'Custo indicativo', en: 'Indicative cost', nl: 'Indicatieve kosten' },
  'wiz.result.duration': { pt: 'Duração indicativa', en: 'Indicative duration', nl: 'Indicatieve duur' },
  'wiz.result.checklist': { pt: 'Guardar como checklist', en: 'Save as checklist', nl: 'Opslaan als checklist' },

  // Projects
  'proj.title': { pt: 'Projetos de obra', en: 'Building projects', nl: 'Bouwprojecten' },
  'proj.intro': { pt: 'Um espaço simples para acompanhar orçamentos, marcos, documentos e pagamentos.', en: 'A simple space to follow quotes, milestones, documents and payments.', nl: 'Een eenvoudige ruimte om offertes, mijlpalen, documenten en betalingen te volgen.' },
  'proj.milestones': { pt: 'Marcos', en: 'Milestones', nl: 'Mijlpalen' },
  'proj.budget': { pt: 'Orçamento', en: 'Budget', nl: 'Budget' },
  'proj.progress': { pt: 'Progresso', en: 'Progress', nl: 'Voortgang' },
  'proj.status.PLANNING': { pt: 'Planeamento', en: 'Planning', nl: 'Planning' },
  'proj.status.IN_PROGRESS': { pt: 'Em curso', en: 'In progress', nl: 'In uitvoering' },
  'proj.status.REVIEW': { pt: 'Em revisão', en: 'In review', nl: 'In controle' },
  'proj.status.DONE': { pt: 'Concluído', en: 'Completed', nl: 'Afgerond' },

  // Tenders
  'tend.title': { pt: 'Concursos & aberturas', en: 'Tenders & open jobs', nl: 'Aanbestedingen & opdrachten' },
  'tend.intro': { pt: 'Pedidos abertos de clientes e organizações. Concursos públicos apenas quando legalmente permitido.', en: 'Open requests from clients and organisations. Public tenders only where legally permitted.', nl: 'Open aanvragen van klanten en organisaties. Publieke aanbestedingen alleen waar juridisch toegestaan.' },
  'tend.deadline': { pt: 'Prazo', en: 'Deadline', nl: 'Deadline' },
  'tend.budget': { pt: 'Orçamento indicativo', en: 'Indicative budget', nl: 'Indicatief budget' },
  'tend.bids': { pt: 'propostas', en: 'bids', nl: 'inschrijvingen' },
  'tend.public': { pt: 'Público', en: 'Public', nl: 'Publiek' },
  'tend.private': { pt: 'Privado', en: 'Private', nl: 'Privaat' },
  'tend.submitBid': { pt: 'Enviar proposta', en: 'Submit a bid', nl: 'Inschrijven' },

  // Materials
  'mat.title': { pt: 'Materiais & fornecedores', en: 'Materials & suppliers', nl: 'Bouwmaterialen & leveranciers' },
  'mat.intro': { pt: 'Diretório de fornecedores de materiais de construção. Preços opcionais; peça orçamento.', en: 'Directory of building-materials suppliers. Prices optional; request a quote.', nl: 'Gids van leveranciers van bouwmaterialen. Prijzen optioneel; vraag een offerte.' },
  'mat.category': { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  'mat.requestQuote': { pt: 'Pedir orçamento', en: 'Request a quote', nl: 'Offerte aanvragen' },

  // Reviews
  'review.write': { pt: 'Escrever avaliação', en: 'Write a review', nl: 'Beoordeling schrijven' },
  'review.rating': { pt: 'Classificação', en: 'Rating', nl: 'Beoordeling' },
  'review.text': { pt: 'A sua avaliação', en: 'Your review', nl: 'Jouw beoordeling' },
  'review.submit': { pt: 'Publicar avaliação', en: 'Post review', nl: 'Beoordeling plaatsen' },
  'review.thanks': { pt: 'Obrigado! A sua avaliação aguarda verificação.', en: 'Thanks! Your review is pending verification.', nl: 'Bedankt! Je beoordeling wacht op verificatie.' },
  'review.loginTo': { pt: 'Entre para escrever uma avaliação.', en: 'Log in to write a review.', nl: 'Log in om een beoordeling te schrijven.' },
  'review.pending': { pt: 'Aguarda verificação', en: 'Pending verification', nl: 'Wacht op verificatie' },
  'review.none': { pt: 'Ainda sem avaliações. Seja o primeiro.', en: 'No reviews yet. Be the first.', nl: 'Nog geen beoordelingen. Wees de eerste.' },
  'review.verifiedNote': { pt: '“Verificado” significa que há prova de uma transação ou projeto real (com controlo humano, nunca só por IA).', en: '“Verified” means there is proof of a real transaction or project (human-checked, never AI-only).', nl: '“Geverifieerd” betekent dat er bewijs is van een echte transactie of project (menselijke controle, nooit alleen AI).' },

  // Verification centre
  'veri.title': { pt: 'Confiança & verificação', en: 'Trust & verification', nl: 'Vertrouwen & verificatie' },
  'veri.intro': { pt: 'Seis níveis de verificação. Cada nível exige provas próprias; as verificações sensíveis nunca são feitas apenas por IA - há sempre controlo humano.', en: 'Six verification levels. Each level requires its own proof; sensitive checks are never done by AI alone - there is always human control.', nl: 'Zes verificatieniveaus. Elk niveau vereist eigen bewijs; gevoelige controles gebeuren nooit alleen door AI - er is altijd menselijke controle.' },
  'veri.proof': { pt: 'Prova necessária', en: 'Proof required', nl: 'Vereist bewijs' },
} satisfies Record<string, TL>;

export type UIKey = keyof typeof UI;
export const t = (l: Locale, key: UIKey): string => tr(UI[key], l);

// Trilingual labels for the known professional categories (the free-text `category`
// stored on each professional). Keyed on the Portuguese value used in the seed.
// Unknown / custom categories fall back to the raw string.
export const PRO_CATEGORY_LABELS: Record<string, TL> = {
  'Advogados': { pt: 'Advogados', en: 'Lawyers', nl: 'Advocaten' },
  'Despachante oficial': { pt: 'Despachante oficial', en: 'Customs broker', nl: 'Douaneagent' },
  'Construção civil': { pt: 'Construção civil', en: 'Construction', nl: 'Bouw' },
  'Serralharia': { pt: 'Serralharia', en: 'Metalwork', nl: 'Metaalbouw' },
  'Arquitetura': { pt: 'Arquitetura', en: 'Architecture', nl: 'Architectuur' },
  'Climatização': { pt: 'Climatização', en: 'Air conditioning', nl: 'Airco' },
  'Limpeza': { pt: 'Limpeza', en: 'Cleaning', nl: 'Schoonmaak' },
  'Gás': { pt: 'Gás', en: 'Gas', nl: 'Gas' },
};
/** Trilingual label for a professional category; falls back to the raw value. */
export const proCategoryLabel = (l: Locale, category: string): string => {
  const tl = PRO_CATEGORY_LABELS[category];
  return tl ? tr(tl, l) : category;
};

// --- Content types ---
export type VerificationLevel = 'L0_NONE' | 'L1_IDENTITY' | 'L2_BUSINESS' | 'L3_DOCUMENTS' | 'L4_TRANSACTION' | 'L5_INSTITUTIONAL';

export interface Listing {
  id: string; slug: string; kind: string; title: TL; description: TL;
  priceAmount: number | null; priceOnRequest: boolean; isFeatured: boolean;
  documentStatus: string; island: string; municipality: string; thumbnail: string;
  owner?: string | null; latitude?: number | null; longitude?: number | null; photos?: string[] | null;
  phone?: string | null;  // direct contact for seeded/service adverts with no owner account
  publishedAt: string; lastVerifiedAt: string | null; riskNotes: TL | null;
  property: { type: string; bedrooms: number | null; bathrooms: number | null; builtAreaSqm: number | null; plotAreaSqm: number | null } | null;
  land: { type: string; areaSqm: number | null; zoning: TL | null; buildable: boolean } | null;
}
export interface Professional {
  id: string; slug: string; displayName: string; headline: TL;
  ratingAvg: number | null; ratingCount: number; verificationLevel: VerificationLevel;
  serviceAreas: string[]; priceIndication: TL | null;
}
export interface ProcedureStep { sortOrder: number; title: TL; description: TL; detail?: TL; responsibleEntity: TL; requiredDocuments: TL[]; estimatedDays: number; tip?: TL }
export interface Procedure { slug: string; title: TL; summary: TL; overview?: TL; watchOut?: TL[]; govEntity: string; estimatedDays: number; steps: ProcedureStep[] }
export interface Publication { title: TL; govEntity: string; officialStatus: boolean; version: number; updatedAt: string; validFrom: string | null; plainSummary: TL }

// --- Helpers ---
const CVE_PER_EUR = 110.265;
export const cveToEur = (cve: number): number => Math.round((cve / CVE_PER_EUR) * 100) / 100;
export function formatPrice(l: Locale, amount: number | null, onRequest: boolean): string {
  if (onRequest || amount == null) return t(l, 'common.priceOnRequest');
  const cve = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(amount);
  const eur = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(cveToEur(amount));
  return `${cve} CVE (~€${eur})`;
}
export function formatEur(amount: number): string {
  return '€' + new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(amount);
}
export function formatDate(l: Locale, d: string | null): string {
  if (!d) return '-';
  const loc = l === 'nl' ? 'nl-NL' : l === 'en' ? 'en-GB' : 'pt-PT';
  return new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(d));
}
export const docLabel = (l: Locale, s: string): string => {
  const key = `doc.${s}` as UIKey;
  return t(l, key in UI ? key : 'doc.UNKNOWN');
};
export const verifLabel = (l: Locale, v: VerificationLevel): string =>
  t(l, ({ L0_NONE: 'verif.L0', L1_IDENTITY: 'verif.L1', L2_BUSINESS: 'verif.L2', L3_DOCUMENTS: 'verif.L3', L4_TRANSACTION: 'verif.L4', L5_INSTITUTIONAL: 'verif.L5' } as Record<VerificationLevel, UIKey>)[v]);
export function whatsappLink(message: string, to: string): string {
  return `https://wa.me/${to.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
/** Cape Verde mobile numbers start with 9 or 5 (landlines start with 2 or 3).
 *  Only mobiles reliably resolve on WhatsApp. */
export function isMobileCV(phone: string): boolean {
  const d = phone.replace(/[^0-9]/g, '').replace(/^238/, '');
  return /^[95]/.test(d);
}
/** A WhatsApp/lead message the recipient can read as coming through Djarvista,
 *  so both sides see the platform did its job. */
export function quoteMessage(l: Locale, businessName: string): string {
  const body: TL = {
    pt: `Bom dia! Vi ${businessName} no Djarvista e gostaria de pedir um orçamento.`,
    en: `Hello! I found ${businessName} on Djarvista and would like to request a quote.`,
    nl: `Goedendag! Ik vond ${businessName} op Djarvista en wil graag een offerte aanvragen.`,
  };
  return `${tr(body, l)} ${t(l, 'lead.viaSuffix')}`;
}
const img = (label: string): string => placeholderImage(label);

// --- Content data (fictional) ---
export const LISTINGS: Listing[] = [
  { id: 'l1', slug: 'villa-vista-mar-monte-sossego', kind: 'PROPERTY_SALE',
    title: { pt: 'Villa com vista mar - Monte Sossego, Mindelo', en: 'Sea-view villa - Monte Sossego, Mindelo', nl: 'Villa met zeezicht - Monte Sossego, Mindelo' },
    description: { pt: 'Villa de 3 quartos com vista para a baía de Mindelo. Documentos declarados, verificação pendente. (Dados fictícios.)', en: '3-bedroom villa overlooking Mindelo bay. Documents declared, verification pending. (Fictional data.)', nl: 'Villa met 3 slaapkamers en uitzicht op de baai van Mindelo. Documenten opgegeven, verificatie in behandeling. (Fictieve data.)' },
    priceAmount: 18500000, priceOnRequest: false, isFeatured: true, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Villa Mindelo'), latitude: 16.876, longitude: -24.995, publishedAt: '2026-06-10', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'VILLA', bedrooms: 3, bathrooms: 2, builtAreaSqm: 180, plotAreaSqm: 420 }, land: null },
  { id: 'l2', slug: 'terreno-600m2-monte-sossego', kind: 'LAND',
    title: { pt: 'Terreno para construção 600 m² - Monte Sossego', en: 'Building land 600 m² - Monte Sossego', nl: 'Bouwgrond 600 m² - Monte Sossego' },
    description: { pt: 'Terreno construível com boa exposição. Zonamento e viabilidade a confirmar com a Câmara Municipal. (Dados fictícios.)', en: 'Buildable plot with good aspect. Zoning and feasibility to be confirmed with the municipality. (Fictional data.)', nl: 'Bebouwbaar perceel met goede ligging. Bestemming en haalbaarheid te bevestigen bij de gemeente. (Fictieve data.)' },
    priceAmount: 4200000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Terreno Sossego'), latitude: 16.879, longitude: -24.999, publishedAt: '2026-06-14', lastVerifiedAt: null,
    riskNotes: { pt: 'Zonamento e viabilidade de construção requerem confirmação municipal.', en: 'Zoning and buildability require municipal confirmation.', nl: 'Bestemming en bebouwbaarheid vereisen bevestiging door de gemeente.' },
    property: null, land: { type: 'BUILDING_LAND', areaSqm: 600, zoning: { pt: 'Residencial (a confirmar)', en: 'Residential (to confirm)', nl: 'Residentieel (te bevestigen)' }, buildable: true } },
  { id: 'l3', slug: 'apartamento-t2-centro-mindelo', kind: 'PROPERTY_RENT',
    title: { pt: 'Apartamento T2 no centro histórico de Mindelo', en: '2-bed apartment in Mindelo old town', nl: 'Appartement (2 slk) in het oude centrum van Mindelo' },
    description: { pt: 'Apartamento renovado perto do Mercado Municipal. Documentos verificados. (Dados fictícios.)', en: 'Renovated apartment near the Municipal Market. Documents verified. (Fictional data.)', nl: 'Gerenoveerd appartement vlak bij de gemeentelijke markt. Documenten geverifieerd. (Fictieve data.)' },
    priceAmount: 65000, priceOnRequest: false, isFeatured: false, documentStatus: 'VERIFIED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('T2 Centro'), latitude: 16.886, longitude: -24.988, publishedAt: '2026-06-20', lastVerifiedAt: '2026-06-22', riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 1, builtAreaSqm: 85, plotAreaSqm: null }, land: null },
  { id: 'l4', slug: 'moradia-santa-maria-sal', kind: 'HOLIDAY_RENT',
    title: { pt: 'Moradia de férias - Santa Maria, Sal', en: 'Holiday home - Santa Maria, Sal', nl: 'Vakantiewoning - Santa Maria, Sal' },
    description: { pt: 'Moradia T3 a 300 m da praia. Ideal para arrendamento turístico. (Dados fictícios.)', en: '3-bedroom house 300 m from the beach. Ideal for holiday rental. (Fictional data.)', nl: 'Woning met 3 slaapkamers op 300 m van het strand. Ideaal voor vakantieverhuur. (Fictieve data.)' },
    priceAmount: 120000, priceOnRequest: false, isFeatured: true, documentStatus: 'UPLOADED', island: 'Sal', municipality: 'Sal',
    thumbnail: img('Santa Maria'), latitude: 16.598, longitude: -22.906, publishedAt: '2026-06-25', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'HOUSE', bedrooms: 3, bathrooms: 2, builtAreaSqm: 140, plotAreaSqm: 300 }, land: null },
  { id: 'l5', slug: 'espaco-comercial-plateau-praia', kind: 'COMMERCIAL',
    title: { pt: 'Espaço comercial - Plateau, Praia', en: 'Commercial space - Plateau, Praia', nl: 'Commerciële ruimte - Plateau, Praia' },
    description: { pt: 'Loja de rés-do-chão na zona do Plateau. Preço sob consulta. (Dados fictícios.)', en: 'Ground-floor shop in the Plateau area. Price on request. (Fictional data.)', nl: 'Winkel op de begane grond in de Plateau-wijk. Prijs op aanvraag. (Fictieve data.)' },
    priceAmount: null, priceOnRequest: true, isFeatured: false, documentStatus: 'DECLARED', island: 'Santiago', municipality: 'Praia',
    thumbnail: img('Plateau Praia'), latitude: 14.917, longitude: -23.51, publishedAt: '2026-05-30', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'COMMERCIAL', bedrooms: null, bathrooms: 1, builtAreaSqm: 110, plotAreaSqm: null }, land: null },
  { id: 'l6', slug: 'projeto-novo-baia-das-gatas', kind: 'NEW_DEVELOPMENT',
    title: { pt: 'Novo projeto - condomínio Baía das Gatas', en: 'New development - Baía das Gatas condominium', nl: 'Nieuw project - condominium Baía das Gatas' },
    description: { pt: 'Projeto de 8 apartamentos em fase de pré-venda. (Dados fictícios.)', en: '8-apartment project in pre-sale phase. (Fictional data.)', nl: 'Project van 8 appartementen in de voorverkoopfase. (Fictieve data.)' },
    priceAmount: 9800000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Baia das Gatas'), latitude: 16.872, longitude: -24.918, publishedAt: '2026-07-01', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 2, builtAreaSqm: 95, plotAreaSqm: null }, land: null },
  { id: 's1', slug: 'servico-canalizacao-mindelo', kind: 'SERVICE',
    title: { pt: 'Serviço de canalização e águas - Mindelo', en: 'Plumbing & water service - Mindelo', nl: 'Loodgieters- en waterdienst - Mindelo' },
    description: { pt: 'Instalação e reparação de canalização, sistemas de água e sanitários. Resposta rápida em São Vicente. (Dados fictícios.)', en: 'Installation and repair of plumbing, water systems and sanitary ware. Fast response on São Vicente. (Fictional data.)', nl: 'Installatie en reparatie van leidingwerk, watersystemen en sanitair. Snelle service op São Vicente. (Fictieve data.)' },
    priceAmount: 3500, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Servico canalizacao'), publishedAt: '2026-07-08', lastVerifiedAt: null, riskNotes: null, property: null, land: null },
  { id: 's2', slug: 'servico-arquitetura-licenciamento', kind: 'SERVICE',
    title: { pt: 'Projetos de arquitetura e licenciamento', en: 'Architecture projects and permits', nl: 'Architectuurontwerp en vergunningen' },
    description: { pt: 'Elaboração de projetos e apoio no licenciamento junto das câmaras municipais. (Dados fictícios.)', en: 'Project design and support with municipal permitting. (Fictional data.)', nl: 'Ontwerp van projecten en ondersteuning bij vergunningen bij de gemeenten. (Fictieve data.)' },
    priceAmount: null, priceOnRequest: true, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Servico arquitetura'), publishedAt: '2026-07-06', lastVerifiedAt: null, riskNotes: null, property: null, land: null },
];

export const PROFESSIONALS: Professional[] = [
  { id: 'p1', slug: 'construcoes-djar', displayName: 'Construções Djar',
    headline: { pt: 'Empreiteiro geral - construção nova e renovação', en: 'General contractor - new build and renovation', nl: 'Hoofdaannemer - nieuwbouw en renovatie' },
    ratingAvg: 4.6, ratingCount: 8, verificationLevel: 'L3_DOCUMENTS', serviceAreas: ['São Vicente'],
    priceIndication: { pt: 'A partir de 45.000 CVE / projeto (indicativo)', en: 'From 45,000 CVE / project (indicative)', nl: 'Vanaf 45.000 CVE / project (indicatief)' } },
  { id: 'p2', slug: 'atelier-morabeza', displayName: 'Atelier Morabeza',
    headline: { pt: 'Arquitetura e licenciamento', en: 'Architecture and permits', nl: 'Architectuur en vergunningen' },
    ratingAvg: 4.9, ratingCount: 12, verificationLevel: 'L4_TRANSACTION', serviceAreas: ['São Vicente', 'Santo Antão'],
    priceIndication: { pt: 'Projeto de arquitetura sob orçamento', en: 'Architecture project on quotation', nl: 'Architectuurproject op offerte' } },
  { id: 'p3', slug: 'eletrica-mindelo', displayName: 'Elétrica Mindelo',
    headline: { pt: 'Instalações elétricas certificadas', en: 'Certified electrical installations', nl: 'Gecertificeerde elektra-installaties' },
    ratingAvg: 4.3, ratingCount: 5, verificationLevel: 'L2_BUSINESS', serviceAreas: ['São Vicente'], priceIndication: null },
  { id: 'p4', slug: 'canalizacoes-oceano', displayName: 'Canalizações Oceano',
    headline: { pt: 'Canalização e sistemas de água', en: 'Plumbing and water systems', nl: 'Loodgieterswerk en watersystemen' },
    ratingAvg: 4.1, ratingCount: 3, verificationLevel: 'L1_IDENTITY', serviceAreas: ['São Vicente', 'Sal'], priceIndication: null },
  { id: 'p5', slug: 'topografia-cabo-verde', displayName: 'Topografia Cabo Verde',
    headline: { pt: 'Levantamentos topográficos e cadastro', en: 'Topographic surveys and cadastre', nl: 'Topografische opmetingen en kadaster' },
    ratingAvg: 4.7, ratingCount: 9, verificationLevel: 'L3_DOCUMENTS', serviceAreas: ['São Vicente', 'Santiago', 'Sal'],
    priceIndication: { pt: 'Levantamento a partir de 30.000 CVE', en: 'Survey from 30,000 CVE', nl: 'Opmeting vanaf 30.000 CVE' } },
  { id: 'p6', slug: 'advocacia-atlantico', displayName: 'Advocacia Atlântico',
    headline: { pt: 'Apoio jurídico em compra e registo de imóveis', en: 'Legal support for property purchase and registration', nl: 'Juridische ondersteuning bij aankoop en registratie van vastgoed' },
    ratingAvg: 4.8, ratingCount: 14, verificationLevel: 'L5_INSTITUTIONAL', serviceAreas: ['São Vicente', 'Santiago'],
    priceIndication: { pt: 'Due diligence a partir de 55.000 CVE', en: 'Due diligence from 55,000 CVE', nl: 'Due diligence vanaf 55.000 CVE' } },
];

export const PROCEDURES: Procedure[] = [
  { slug: 'comprar-terreno-e-construir-casa-ferias-sv',
    title: { pt: 'Comprar terreno e construir uma casa de férias em São Vicente', en: 'Buy land and build a holiday home on São Vicente', nl: 'Bouwgrond kopen en een vakantiewoning bouwen op São Vicente' },
    summary: { pt: 'Visão geral ilustrativa e não jurídica. Os passos e requisitos devem ser confirmados com as entidades competentes.', en: 'Illustrative, non-legal overview. Steps and requirements must be confirmed with the competent authorities.', nl: 'Illustratief, niet-juridisch overzicht. Stappen en vereisten moeten bij de bevoegde instanties worden bevestigd.' },
    overview: { pt: 'A maioria dos compradores estrangeiros começa por se orientar online e depois visita o terreno pessoalmente. Antes de qualquer pagamento, confirma-se quem é o dono e se o terreno pode mesmo ser construído. Só então se avança para a escritura, o registo e, por fim, a licença de construção. Todo o percurso costuma demorar alguns meses e envolve várias entidades - vale a pena reunir os documentos com antecedência e trabalhar com um advogado independente.', en: 'Most foreign buyers start by orienting online and then visit the plot in person. Before any payment, you confirm who the owner is and whether the land can actually be built on. Only then do you move on to the deed, the registration and, finally, the building permit. The whole journey usually takes a few months and involves several authorities - it pays to gather documents early and to work with an independent lawyer.', nl: 'De meeste buitenlandse kopers beginnen met online oriënteren en gaan daarna zelf op de grond kijken. Vóór elke betaling controleer je wie de eigenaar is en of er echt gebouwd mag worden. Pas daarna volgen de akte, de registratie en ten slotte de bouwvergunning. Het hele traject duurt meestal enkele maanden en er zijn meerdere instanties bij betrokken - verzamel je documenten op tijd en werk met een onafhankelijke advocaat.' },
    watchOut: [
      { pt: 'Muitos terrenos são de herança indivisa: confirme que todos os herdeiros assinam, senão a venda pode ser contestada mais tarde.', en: 'Many plots are undivided inheritance: make sure all heirs sign, otherwise the sale can be challenged later.', nl: 'Veel percelen zijn onverdeelde erfenis: zorg dat álle erfgenamen tekenen, anders kan de verkoop later worden aangevochten.' },
      { pt: 'Terrenos junto à costa podem estar em domínio público marítimo e não ser vendáveis - verifique os limites com a Câmara.', en: 'Coastal plots may fall under the maritime public domain and not be sellable - check the boundaries with the municipality.', nl: 'Percelen aan de kust kunnen onder het maritieme publieke domein vallen en niet verkoopbaar zijn - controleer de grenzen bij de gemeente.' },
      { pt: 'Precisa de um NIF cabo-verdiano para comprar e pagar impostos; obtenha-o cedo na Casa do Cidadão ou nas Finanças.', en: 'You need a Cape Verdean tax number (NIF) to buy and pay taxes; get it early at the Casa do Cidadão or the tax office.', nl: 'Je hebt een Kaapverdiaans belastingnummer (NIF) nodig om te kopen en belasting te betalen; regel dit vroeg bij de Casa do Cidadão of de Belastingdienst.' },
      { pt: 'Desde 2026 o antigo IUP foi substituído pelo cITI (na compra) e pelo cIPI (anual) - peça os valores atualizados às Finanças.', en: 'Since 2026 the old IUP was replaced by cITI (on purchase) and cIPI (annual) - ask the tax office for current amounts.', nl: 'Sinds 2026 is de oude IUP vervangen door cITI (bij aankoop) en cIPI (jaarlijks) - vraag de actuele bedragen op bij de Belastingdienst.' },
      { pt: 'Trabalhe sempre com um advogado independente e não pague em dinheiro sem recibo nem antes de o título estar verificado.', en: 'Always use an independent lawyer and never pay cash without a receipt or before the title is verified.', nl: 'Werk altijd met een onafhankelijke advocaat en betaal nooit contant zonder bewijs of vóórdat de titel is gecontroleerd.' },
    ],
    govEntity: 'Câmara Municipal de São Vicente', estimatedDays: 120, steps: [
      { sortOrder: 1, title: { pt: 'Verificar título e ónus', en: 'Verify title and encumbrances', nl: 'Titel en lasten controleren' },
        description: { pt: 'Solicitar a Certidão de Registo Predial na Conservatória do Registo Predial. Contratar um advogado independente.', en: 'Request the Land Registry Certificate from the Conservatória do Registo Predial. Hire an independent lawyer.', nl: 'Vraag het uittreksel bij de Conservatória do Registo Predial (kadaster) op. Schakel een onafhankelijke advocaat in.' },
        detail: { pt: 'Peça a Certidão de Registo Predial na Conservatória para saber quem é o proprietário registado e se existem hipotecas, penhoras ou processos pendentes. Compare o nome do vendedor com o que consta no título e confirme se a área e os limites no papel correspondem ao terreno real. Um advogado independente - nunca o do vendedor - deve rever tudo antes de assinar seja o que for.', en: 'Request the Land Registry Certificate from the Conservatória to learn who the registered owner is and whether there are mortgages, seizures or pending disputes. Compare the seller’s name with the title and confirm that the area and boundaries on paper match the actual plot. An independent lawyer - never the seller’s - should review everything before you sign anything.', nl: 'Vraag het kadastraal uittreksel op bij de Conservatória om te zien wie de geregistreerde eigenaar is en of er hypotheken, beslagen of lopende geschillen zijn. Vergelijk de naam van de verkoper met de titel en controleer of de oppervlakte en grenzen op papier overeenkomen met het echte perceel. Laat een onafhankelijke advocaat - nooit die van de verkoper - alles nakijken voordat je iets tekent.' },
        responsibleEntity: { pt: 'Conservatória do Registo Predial', en: 'Land Registry (Conservatória do Registo Predial)', nl: 'Kadaster (Conservatória do Registo Predial)' },
        requiredDocuments: [{ pt: 'Certidão de registo predial', en: 'Land registry certificate', nl: 'Kadastraal uittreksel' }, { pt: 'Identificação do vendedor', en: 'Seller identification', nl: 'Identificatie van de verkoper' }], estimatedDays: 14,
        tip: { pt: 'Nunca pague sinal antes de ver uma certidão emitida nos últimos 30 dias.', en: 'Never pay a deposit before seeing a certificate issued within the last 30 days.', nl: 'Betaal nooit een aanbetaling voordat je een uittreksel van de laatste 30 dagen hebt gezien.' } },
      { sortOrder: 2, title: { pt: 'Confirmar zonamento e viabilidade', en: 'Confirm zoning and feasibility', nl: 'Bestemming en haalbaarheid bevestigen' },
        description: { pt: 'Confirmar o zonamento e o uso permitido junto do município.', en: 'Confirm zoning and permitted use with the municipality.', nl: 'Bevestig de bestemming en het toegestane gebruik bij de gemeente.' },
        detail: { pt: 'Confirme na Câmara Municipal, através do Plano Diretor Municipal, se o terreno é urbano ou urbanizável e se permite habitação. Verifique também o acesso a água e eletricidade, os recuos exigidos e eventuais restrições (zonas de proteção, costa, aeroporto). Peça esta informação por escrito - uma planta de localização ou informação prévia - para não depender de promessas verbais.', en: 'With the municipality, use the Municipal Master Plan (Plano Diretor Municipal) to confirm whether the plot is urban or developable and whether housing is allowed. Also check access to water and electricity, required setbacks and any restrictions (protection zones, coastline, airport). Ask for this in writing - a site plan or prior-information note - so you don’t rely on verbal promises.', nl: 'Bevestig bij de gemeente via het bestemmingsplan (Plano Diretor Municipal) of het perceel stedelijk of bebouwbaar is en of wonen is toegestaan. Controleer ook de toegang tot water en elektriciteit, de vereiste afstanden en eventuele beperkingen (beschermingszones, kust, luchthaven). Vraag dit schriftelijk op - een situatietekening of voorafgaande informatie - zodat je niet afhankelijk bent van mondelinge beloftes.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Referência cadastral', en: 'Cadastral reference', nl: 'Kadastrale referentie' }, { pt: 'Planta de localização', en: 'Site plan', nl: 'Situatietekening' }], estimatedDays: 21,
        tip: { pt: 'Um terreno mais barato sem viabilidade de construção pode sair muito caro - confirme a viabilidade antes de acertar o preço.', en: 'A cheap plot with no building feasibility can turn out very expensive - confirm feasibility before you agree on price.', nl: 'Een goedkoop perceel zonder bouwmogelijkheid kan juist heel duur uitpakken - bevestig de haalbaarheid vóórdat je de prijs afspreekt.' } },
      { sortOrder: 3, title: { pt: 'Assinar a escritura pública e registar', en: 'Sign the public deed and register', nl: 'De notariële akte tekenen en registreren' },
        description: { pt: 'Assinar a escritura pública perante notário e registar a transmissão.', en: 'Sign the public deed before a notary and register the transfer.', nl: 'Onderteken de notariële akte bij een notaris en registreer de overdracht.' },
        detail: { pt: 'A compra formaliza-se numa escritura pública perante notário. Aí pagam-se o imposto de transmissão (o cITI, que desde 2026 substituiu o antigo IUP) e os emolumentos do notário e do registo. Depois da escritura, registe a transmissão na Conservatória: é o registo - e não apenas a escritura - que o torna proprietário perante terceiros.', en: 'The purchase is formalised in a public deed (escritura pública) before a notary. There you pay the transfer tax (cITI, which since 2026 replaced the old IUP) and the notary and registration fees. After the deed, register the transfer at the Conservatória: it is registration - not the deed alone - that makes you the owner against third parties.', nl: 'De koop wordt vastgelegd in een notariële akte (escritura pública) bij een notaris. Daar betaal je de overdrachtsbelasting (cITI, die sinds 2026 de oude IUP vervangt) en de notaris- en registratiekosten. Registreer na de akte de overdracht bij de Conservatória: het is de registratie - niet de akte alleen - die je eigenaar maakt tegenover derden.' },
        responsibleEntity: { pt: 'Notário + Conservatória', en: 'Notary + Land Registry', nl: 'Notaris + kadaster' },
        requiredDocuments: [{ pt: 'Minuta da escritura', en: 'Draft deed', nl: 'Concept-akte' }, { pt: 'Prova de fundos', en: 'Proof of funds', nl: 'Bewijs van financiering' }], estimatedDays: 30,
        tip: { pt: 'Guarde o comprovativo de registo: sem ele, mais tarde não conseguirá vender nem hipotecar o terreno.', en: 'Keep the registration proof: without it you won’t be able to sell or mortgage the plot later.', nl: 'Bewaar het registratiebewijs: zonder dat kun je het perceel later niet verkopen of met hypotheek belasten.' } },
      { sortOrder: 4, title: { pt: 'Pedido de licença de construção', en: 'Apply for a building permit', nl: 'Bouwvergunning aanvragen' },
        description: { pt: 'Submeter o projeto de arquitetura para a licença de construção.', en: 'Submit the architectural project for the building permit.', nl: 'Dien het architectenontwerp in voor de bouwvergunning.' },
        detail: { pt: 'Um arquiteto ou engenheiro inscrito prepara o projeto de arquitetura e as especialidades e assina o termo de responsabilidade. Submete-se o projeto à Câmara Municipal para a licença de construção; a obra só deve começar depois da licença aprovada. No fim, peça a licença de utilização (habitação) antes de morar ou arrendar.', en: 'A licensed architect or engineer prepares the architectural project and technical drawings and signs the responsibility statement. The project is submitted to the municipality for the building permit; work should only start once the permit is approved. At the end, request the use (habitation) licence before living in or renting out the home.', nl: 'Een ingeschreven architect of ingenieur maakt het architectenontwerp en de technische tekeningen en tekent de verantwoordelijkheidsverklaring. Het ontwerp wordt bij de gemeente ingediend voor de bouwvergunning; met bouwen begin je pas nadat de vergunning is goedgekeurd. Vraag aan het eind de gebruiks-/bewoningsvergunning (licença de habitação) aan voordat je er woont of het verhuurt.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Projeto de arquitetura', en: 'Architectural project', nl: 'Architectenontwerp' }, { pt: 'Termo de responsabilidade do engenheiro', en: 'Engineer sign-off', nl: 'Verklaring van de ingenieur' }], estimatedDays: 45,
        tip: { pt: 'Construir sem licença pode levar a multas ou a uma ordem de demolição - e impede a ligação oficial à água e à luz.', en: 'Building without a permit can lead to fines or a demolition order - and blocks the official water and electricity connection.', nl: 'Bouwen zonder vergunning kan leiden tot boetes of een sloopbevel - en blokkeert de officiële water- en elektriciteitsaansluiting.' } },
    ] },
  { slug: 'comprar-casa-ou-apartamento',
    title: { pt: 'Comprar uma casa ou apartamento já construído', en: 'Buy an existing house or apartment', nl: 'Een bestaande woning of appartement kopen' },
    summary: { pt: 'Visão geral ilustrativa e não jurídica da compra de um imóvel já construído. Confirme sempre os passos e requisitos com as entidades competentes.', en: 'Illustrative, non-legal overview of buying an already-built property. Always confirm the steps and requirements with the competent authorities.', nl: 'Illustratief, niet-juridisch overzicht van de aankoop van een bestaande woning. Bevestig de stappen en vereisten altijd bij de bevoegde instanties.' },
    overview: { pt: 'Comprar uma casa pronta segue uma lógica parecida com a do terreno, mas com atenção extra ao estado legal do imóvel. A maioria dos compradores orienta-se aqui, visita o imóvel e só depois verifica o título, as licenças e eventuais dívidas. A compra fecha-se com escritura, imposto e registo - e termina com a transferência da água, da luz e do imposto anual para o novo dono.', en: 'Buying a finished home follows a logic similar to land, but with extra attention to the property’s legal status. Most buyers orient here, visit the property and only then verify the title, the licences and any debts. The purchase closes with the deed, the tax and registration - and ends with transferring water, electricity and the annual tax to the new owner.', nl: 'Een kant-en-klare woning kopen lijkt op het traject voor grond, maar met extra aandacht voor de juridische status van het pand. De meeste kopers oriënteren zich hier, bezoeken de woning en controleren pas daarna de titel, de vergunningen en eventuele schulden. De koop wordt afgerond met de akte, de belasting en de registratie - en eindigt met het overzetten van water, elektriciteit en de jaarlijkse belasting op de nieuwe eigenaar.' },
    watchOut: [
      { pt: 'Confirme que todos os herdeiros assinam quando o imóvel vem de uma herança - é a causa mais comum de vendas contestadas.', en: 'Make sure all heirs sign when the property comes from an inheritance - the most common cause of contested sales.', nl: 'Zorg dat álle erfgenamen tekenen als de woning uit een erfenis komt - de meest voorkomende oorzaak van aangevochten verkopen.' },
      { pt: 'Obras ou ampliações sem licença podem tornar-se um problema seu - confirme se a construção corresponde às licenças.', en: 'Works or extensions without a permit can become your problem - check that the building matches its licences.', nl: 'Verbouwingen of uitbreidingen zonder vergunning kunnen jouw probleem worden - controleer of het pand overeenkomt met de vergunningen.' },
      { pt: 'Dívidas de condomínio e de imposto (cIPI) podem passar para o novo dono - peça comprovativos de que está tudo pago.', en: 'Condominium and tax (cIPI) debts can pass to the new owner - ask for proof that everything is paid.', nl: 'Schulden voor de VvE en belasting (cIPI) kunnen op de nieuwe eigenaar overgaan - vraag bewijs dat alles is betaald.' },
      { pt: 'Precisa de NIF cabo-verdiano e deve trabalhar com um advogado independente, tal como na compra de terreno.', en: 'You need a Cape Verdean NIF and should work with an independent lawyer, just as when buying land.', nl: 'Je hebt een Kaapverdiaans NIF nodig en werkt het best met een onafhankelijke advocaat, net als bij de aankoop van grond.' },
    ],
    govEntity: 'Conservatória do Registo Predial', estimatedDays: 90, steps: [
      { sortOrder: 1, title: { pt: 'Verificar título e ónus', en: 'Verify title and encumbrances', nl: 'Titel en lasten controleren' },
        description: { pt: 'Confirmar quem é o proprietário registado e se há hipotecas ou penhoras.', en: 'Confirm the registered owner and whether there are mortgages or seizures.', nl: 'Bevestig wie de geregistreerde eigenaar is en of er hypotheken of beslagen zijn.' },
        detail: { pt: 'Peça a Certidão de Registo Predial e confirme que o vendedor é mesmo o dono e que o imóvel está livre de ónus. Verifique também se a descrição no registo (área, frações, confrontações) corresponde ao que vai visitar.', en: 'Request the Land Registry Certificate and confirm the seller really is the owner and the property is free of encumbrances. Also check that the registry description (area, units, boundaries) matches what you will visit.', nl: 'Vraag het kadastraal uittreksel op en bevestig dat de verkoper echt de eigenaar is en dat de woning vrij is van lasten. Controleer ook of de omschrijving in het register (oppervlakte, units, grenzen) klopt met wat je gaat bezichtigen.' },
        responsibleEntity: { pt: 'Conservatória do Registo Predial', en: 'Land Registry (Conservatória do Registo Predial)', nl: 'Kadaster (Conservatória do Registo Predial)' },
        requiredDocuments: [{ pt: 'Certidão de registo predial', en: 'Land registry certificate', nl: 'Kadastraal uittreksel' }, { pt: 'Identificação do vendedor', en: 'Seller identification', nl: 'Identificatie van de verkoper' }], estimatedDays: 14,
        tip: { pt: 'Peça a caderneta predial nas Finanças e compare-a com o registo - devem coincidir.', en: 'Request the tax property record (caderneta predial) and compare it with the registry - they should match.', nl: 'Vraag de fiscale kadastrale kaart (caderneta predial) op bij de Belastingdienst en vergelijk die met het register - ze moeten overeenkomen.' } },
      { sortOrder: 2, title: { pt: 'Verificar o imóvel, licenças e dívidas', en: 'Check the property, licences and debts', nl: 'Woning, vergunningen en schulden controleren' },
        description: { pt: 'Visitar o imóvel e confirmar a licença de habitação, dívidas de condomínio e impostos.', en: 'Visit the property and confirm the habitation licence, condominium debts and taxes.', nl: 'Bezoek de woning en controleer de bewoningsvergunning, VvE-schulden en belastingen.' },
        detail: { pt: 'Visite o imóvel, de preferência com um técnico, e confirme que existe licença de habitação/utilização. Peça comprovativos de que o imposto anual (cIPI) e, num condomínio, as quotas estão pagos. Confirme que não há obras por legalizar.', en: 'Visit the property, ideally with a surveyor, and confirm there is a habitation/use licence. Ask for proof that the annual tax (cIPI) and, in a condominium, the fees are paid. Confirm there are no works still to be legalised.', nl: 'Bezoek de woning, bij voorkeur met een bouwkundige, en bevestig dat er een bewonings-/gebruiksvergunning is. Vraag bewijs dat de jaarlijkse belasting (cIPI) en, bij een VvE, de bijdragen zijn betaald. Bevestig dat er geen verbouwingen nog gelegaliseerd moeten worden.' },
        responsibleEntity: { pt: 'Câmara Municipal + Finanças', en: 'Municipality + tax office', nl: 'Gemeente + Belastingdienst' },
        requiredDocuments: [{ pt: 'Licença de habitação', en: 'Habitation licence', nl: 'Bewoningsvergunning' }, { pt: 'Comprovativos de pagamento (cIPI, condomínio)', en: 'Payment proofs (cIPI, condominium)', nl: 'Betalingsbewijzen (cIPI, VvE)' }], estimatedDays: 14,
        tip: { pt: 'Peça a última fatura da Electra e da água em nome do vendedor - confirma que não há dívidas pendentes.', en: 'Ask for the latest Electra and water bill in the seller’s name - it confirms there are no outstanding debts.', nl: 'Vraag de laatste Electra- en waterrekening op naam van de verkoper - dat bevestigt dat er geen openstaande schulden zijn.' } },
      { sortOrder: 3, title: { pt: 'Escritura, imposto e registo', en: 'Deed, tax and registration', nl: 'Akte, belasting en registratie' },
        description: { pt: 'Assinar a escritura, pagar o cITI e registar a transmissão.', en: 'Sign the deed, pay the cITI and register the transfer.', nl: 'Onderteken de akte, betaal de cITI en registreer de overdracht.' },
        detail: { pt: 'A compra formaliza-se em escritura pública perante notário. Paga-se o imposto de transmissão (cITI) e os emolumentos, e regista-se a transmissão na Conservatória. Só depois do registo é dono perante terceiros.', en: 'The purchase is formalised in a public deed before a notary. You pay the transfer tax (cITI) and fees, and register the transfer at the Conservatória. Only after registration are you the owner against third parties.', nl: 'De koop wordt vastgelegd in een notariële akte bij een notaris. Je betaalt de overdrachtsbelasting (cITI) en de kosten, en registreert de overdracht bij de Conservatória. Pas na de registratie ben je eigenaar tegenover derden.' },
        responsibleEntity: { pt: 'Notário + Conservatória + Finanças', en: 'Notary + Land Registry + tax office', nl: 'Notaris + kadaster + Belastingdienst' },
        requiredDocuments: [{ pt: 'Minuta da escritura', en: 'Draft deed', nl: 'Concept-akte' }, { pt: 'NIF do comprador', en: 'Buyer’s NIF', nl: 'NIF van de koper' }, { pt: 'Prova de fundos', en: 'Proof of funds', nl: 'Bewijs van financiering' }], estimatedDays: 21,
        tip: { pt: 'Peça ao notário uma estimativa de todos os custos (imposto, emolumentos, registo) antes do dia da escritura.', en: 'Ask the notary for an estimate of all costs (tax, fees, registration) before the deed day.', nl: 'Vraag de notaris vóór de aktedag om een schatting van alle kosten (belasting, emolumenten, registratie).' } },
      { sortOrder: 4, title: { pt: 'Passar água, luz e imposto para o seu nome', en: 'Transfer water, electricity and annual tax to your name', nl: 'Water, elektriciteit en jaarlijkse belasting op je naam zetten' },
        description: { pt: 'Transferir os contratos e atualizar o registo fiscal do imóvel.', en: 'Transfer the contracts and update the property’s tax record.', nl: 'Zet de contracten over en werk het fiscale dossier van de woning bij.' },
        detail: { pt: 'Depois de registar, transfira os contratos de água e eletricidade (Electra) para o seu nome e atualize o registo do imóvel nas Finanças, para que o imposto anual (cIPI) passe a ser emitido em seu nome. Guarde cópias digitais de tudo.', en: 'After registering, transfer the water and electricity (Electra) contracts to your name and update the property record at the tax office, so the annual tax (cIPI) is issued in your name. Keep digital copies of everything.', nl: 'Zet na de registratie de water- en elektriciteitscontracten (Electra) op je naam en werk het dossier van de woning bij de Belastingdienst bij, zodat de jaarlijkse belasting (cIPI) op jouw naam komt. Bewaar van alles digitale kopieën.' },
        responsibleEntity: { pt: 'Electra + Finanças', en: 'Electra + tax office', nl: 'Electra + Belastingdienst' },
        requiredDocuments: [{ pt: 'Escritura e comprovativo de registo', en: 'Deed and registration proof', nl: 'Akte en registratiebewijs' }], estimatedDays: 14,
        tip: { pt: 'Faça a leitura dos contadores no dia da entrega das chaves e registe-a - evita pagar consumos do anterior dono.', en: 'Take meter readings on the day you get the keys and record them - it avoids paying the previous owner’s usage.', nl: 'Lees de meterstanden af op de dag van de sleuteloverdracht en leg ze vast - zo voorkom je dat je het verbruik van de vorige eigenaar betaalt.' } },
    ] },
  { slug: 'registar-empresa-empresa-no-dia',
    title: { pt: 'Registar uma empresa (“Empresa no Dia”)', en: 'Register a company (“Empresa no Dia”)', nl: 'Een bedrijf registreren (“Empresa no Dia”)' },
    summary: { pt: 'Como constituir uma empresa através da Casa do Cidadão. Informação indicativa.', en: 'How to set up a company through the Casa do Cidadão. Indicative information.', nl: 'Hoe je een bedrijf opricht via de Casa do Cidadão. Indicatieve informatie.' },
    overview: { pt: 'Cabo Verde tornou a criação de empresas muito rápida: na Casa do Cidadão é possível constituir uma sociedade no próprio dia. A maioria das pessoas reserva primeiro o nome, junta a identificação dos sócios e o capital social, e trata de tudo num só balcão. A seguir vêm os passos habituais para poder faturar: NIF da empresa, início de atividade nas Finanças e inscrição na Segurança Social (INPS).', en: 'Cabo Verde has made starting a company very fast: at the Casa do Cidadão you can incorporate a company on the same day. Most people first reserve the name, gather the partners’ identification and the share capital, and handle everything at a single counter. Then come the usual steps to be able to invoice: the company’s tax number (NIF), start-of-activity at the tax office and registration with social security (INPS).', nl: 'Kaapverdië heeft het oprichten van een bedrijf heel snel gemaakt: bij de Casa do Cidadão kun je een vennootschap dezelfde dag oprichten. De meeste mensen reserveren eerst de naam, verzamelen de identificatie van de vennoten en het maatschappelijk kapitaal, en regelen alles aan één loket. Daarna volgen de gebruikelijke stappen om te mogen factureren: het belastingnummer (NIF) van het bedrijf, start van activiteit bij de Belastingdienst en inschrijving bij de sociale zekerheid (INPS).' },
    watchOut: [
      { pt: 'Precisa de uma sede (morada) para a empresa - pode ser um escritório, um espaço partilhado ou, em certos casos, uma morada de domicílio.', en: 'You need a registered office (address) for the company - an office, a shared space or, in some cases, a home address.', nl: 'Je hebt een zetel (adres) voor het bedrijf nodig - een kantoor, een gedeelde ruimte of, in bepaalde gevallen, een thuisadres.' },
      { pt: 'Atividades reguladas (construção, mediação imobiliária, turismo, restauração) exigem licenças ou alvarás adicionais.', en: 'Regulated activities (construction, real-estate brokerage, tourism, catering) require additional licences or permits.', nl: 'Gereguleerde activiteiten (bouw, vastgoedbemiddeling, toerisme, horeca) vereisen extra vergunningen.' },
      { pt: 'Registe o início de atividade nas Finanças antes de emitir a primeira fatura, para não ter problemas fiscais.', en: 'Register start-of-activity at the tax office before issuing your first invoice, to avoid tax problems.', nl: 'Registreer de start van activiteit bij de Belastingdienst vóór je eerste factuur, om fiscale problemen te voorkomen.' },
      { pt: 'Se contratar pessoal, a inscrição na Segurança Social (INPS) é obrigatória.', en: 'If you hire staff, registration with social security (INPS) is mandatory.', nl: 'Als je personeel aanneemt, is inschrijving bij de sociale zekerheid (INPS) verplicht.' },
    ],
    govEntity: 'Casa do Cidadão', estimatedDays: 1, steps: [
      { sortOrder: 1, title: { pt: 'Reservar o nome / obter o CAF', en: 'Reserve the name / obtain the CAF', nl: 'Naam reserveren / CAF verkrijgen' },
        description: { pt: 'Solicitar o certificado de admissibilidade da firma.', en: 'Request the company name admissibility certificate.', nl: 'Vraag het toelaatbaarheidscertificaat voor de bedrijfsnaam aan.' },
        detail: { pt: 'Peça o certificado de admissibilidade da firma para garantir que o nome escolhido está livre e é aceite. Pode reservar o nome com antecedência, o que evita surpresas no dia da constituição.', en: 'Request the company-name admissibility certificate to make sure your chosen name is free and accepted. You can reserve the name in advance, which avoids surprises on incorporation day.', nl: 'Vraag het toelaatbaarheidscertificaat voor de bedrijfsnaam aan om zeker te weten dat de gekozen naam vrij is en wordt geaccepteerd. Je kunt de naam vooraf reserveren, wat verrassingen op de oprichtingsdag voorkomt.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Documento de identificação', en: 'ID document', nl: 'Identiteitsdocument' }], estimatedDays: 1,
        tip: { pt: 'Leve duas ou três alternativas de nome - se o primeiro estiver ocupado, resolve na hora.', en: 'Bring two or three name alternatives - if the first is taken, you solve it on the spot.', nl: 'Neem twee of drie alternatieve namen mee - als de eerste bezet is, los je het meteen op.' } },
      { sortOrder: 2, title: { pt: 'Constituir a empresa no balcão', en: 'Incorporate the company at the counter', nl: 'Het bedrijf aan de balie oprichten' },
        description: { pt: 'Entregar a documentação e constituir a empresa no mesmo dia.', en: 'Submit the documents and incorporate the company the same day.', nl: 'Lever de documenten in en richt het bedrijf dezelfde dag op.' },
        detail: { pt: 'Com a identificação dos sócios, o comprovativo de capital e a sede definida, a empresa é constituída no balcão e recebe de imediato os documentos de constituição. É também o momento de definir a gerência e a distribuição do capital.', en: 'With the partners’ ID, proof of capital and a defined registered office, the company is incorporated at the counter and immediately receives its incorporation documents. This is also when you set the management and the split of the share capital.', nl: 'Met de identificatie van de vennoten, het kapitaalbewijs en een vastgestelde zetel wordt het bedrijf aan de balie opgericht en ontvang je meteen de oprichtingsdocumenten. Dit is ook het moment om het bestuur en de verdeling van het kapitaal vast te leggen.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Identificação dos sócios', en: 'Partners identification', nl: 'Identificatie van de vennoten' }, { pt: 'Comprovativo de capital', en: 'Proof of capital', nl: 'Bewijs van kapitaal' }], estimatedDays: 1,
        tip: { pt: 'Combine antes, entre sócios, quem gere e quem assina - mudar depois exige nova documentação.', en: 'Agree beforehand, between partners, who manages and who signs - changing it later needs new paperwork.', nl: 'Spreek vooraf met de vennoten af wie bestuurt en wie tekent - dit later wijzigen vereist nieuwe documenten.' } },
      { sortOrder: 3, title: { pt: 'Depois da constituição: NIF, Finanças e Segurança Social', en: 'After incorporation: NIF, tax office and social security', nl: 'Na de oprichting: NIF, Belastingdienst en sociale zekerheid' },
        description: { pt: 'Registar o início de atividade, obter o NIF da empresa e inscrever-se na Segurança Social.', en: 'Register start-of-activity, obtain the company NIF and register with social security.', nl: 'Registreer de start van activiteit, verkrijg het NIF van het bedrijf en schrijf je in bij de sociale zekerheid.' },
        detail: { pt: 'Para poder faturar legalmente, registe o início de atividade nas Finanças e confirme o NIF da empresa. Se for empregar, inscreva a empresa e os trabalhadores no INPS. Muitas empresas abrem também uma conta bancária em nome da sociedade nesta fase.', en: 'To be able to invoice legally, register start-of-activity at the tax office and confirm the company NIF. If you will employ people, register the company and workers with the INPS. Many companies also open a bank account in the company’s name at this stage.', nl: 'Om legaal te kunnen factureren, registreer je de start van activiteit bij de Belastingdienst en bevestig je het NIF van het bedrijf. Als je mensen in dienst neemt, schrijf je het bedrijf en de werknemers in bij het INPS. Veel bedrijven openen in deze fase ook een bankrekening op naam van de vennootschap.' },
        responsibleEntity: { pt: 'Finanças + INPS', en: 'Tax office + INPS', nl: 'Belastingdienst + INPS' },
        requiredDocuments: [{ pt: 'Documentos de constituição', en: 'Incorporation documents', nl: 'Oprichtingsdocumenten' }, { pt: 'NIF dos sócios', en: 'Partners’ NIF', nl: 'NIF van de vennoten' }], estimatedDays: 3,
        tip: { pt: 'Guarde os documentos de constituição em digital - vai precisar deles no banco e nas Finanças.', en: 'Keep the incorporation documents digitally - you’ll need them at the bank and the tax office.', nl: 'Bewaar de oprichtingsdocumenten digitaal - je hebt ze nodig bij de bank en de Belastingdienst.' } },
    ] },
];

export const PUBLICATIONS: Publication[] = [
  { title: { pt: 'Requisitos da licença de construção - São Vicente (demo)', en: 'Building permit requirements - São Vicente (demo)', nl: 'Vereisten bouwvergunning - São Vicente (demo)' },
    govEntity: 'Câmara Municipal de São Vicente (demo)', officialStatus: false, version: 1, updatedAt: '2026-07-01', validFrom: '2026-07-01',
    plainSummary: { pt: 'Resumo em linguagem simples dos passos para a licença de construção (demonstração).', en: 'Plain-language summary of the building-permit steps (demo).', nl: 'Samenvatting in eenvoudige taal van de stappen voor de bouwvergunning (demo).' } },
  { title: { pt: 'Reforma fiscal imobiliária 2026: cITI e cIPI (demo)', en: '2026 real-estate tax reform: cITI and cIPI (demo)', nl: 'Vastgoedbelastinghervorming 2026: cITI en cIPI (demo)' },
    govEntity: 'Portal informativo Djarvista', officialStatus: false, version: 2, updatedAt: '2026-06-15', validFrom: '2026-01-01',
    plainSummary: { pt: 'Desde 1 de janeiro de 2026 o IUP foi substituído pelo cITI (transmissão) e cIPI (propriedade). Resumo indicativo - confirmar com as Finanças.', en: 'Since 1 January 2026 the IUP has been replaced by cITI (transfer) and cIPI (ownership). Indicative summary - confirm with the tax authority.', nl: 'Sinds 1 januari 2026 is de IUP vervangen door cITI (overdracht) en cIPI (eigendom). Indicatieve samenvatting - bevestig bij de Belastingdienst.' } },
];

export function filterListings(rows: Listing[], opts: { q?: string; kind?: string; islandCode?: string }, l: Locale): Listing[] {
  const nameByCode: Record<string, string> = { SV: 'São Vicente', ST: 'Santiago', SL: 'Sal', BV: 'Boa Vista' };
  let out = rows.slice();
  if (opts.kind) out = out.filter((r) => r.kind === opts.kind);
  const island = opts.islandCode ? nameByCode[opts.islandCode] : undefined;
  if (island) out = out.filter((r) => r.island === island);
  if (opts.q) { const q = opts.q.toLowerCase(); out = out.filter((r) => tr(r.title, l).toLowerCase().includes(q) || tr(r.description, l).toLowerCase().includes(q)); }
  return out.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
}
export function searchListings(opts: { q?: string; kind?: string; islandCode?: string }, l: Locale): Listing[] {
  return filterListings(LISTINGS, opts, l);
}
export const getListing = (slug: string): Listing | undefined => LISTINGS.find((l) => l.slug === slug);
export const getProcedure = (slug: string): Procedure | undefined => PROCEDURES.find((p) => p.slug === slug);
export const getProfessional = (slug: string): Professional | undefined => PROFESSIONALS.find((p) => p.slug === slug);
