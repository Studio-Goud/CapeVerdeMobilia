// Djarvista demo — trilingual (PT / EN / NL) strings + fictional content.
// No database, no PII. UI strings and demo content are both localized.

export type Locale = 'pt' | 'en' | 'nl';
export const LOCALES: Locale[] = ['pt', 'en', 'nl'];
export const DEFAULT_LOCALE: Locale = 'pt';
export const LOCALE_NAMES: Record<Locale, string> = { pt: 'PT', en: 'EN', nl: 'NL' };
export const isLocale = (v: string): v is Locale => (LOCALES as string[]).includes(v);

/** A translatable string in the three demo languages. */
export type TL = Record<Locale, string>;
export const tr = (v: TL, l: Locale): string => v[l] ?? v.pt;

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
  'common.send': { pt: 'Enviar', en: 'Send', nl: 'Versturen' },
  'common.priceOnRequest': { pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' },
  'common.sponsored': { pt: 'Patrocinado', en: 'Sponsored', nl: 'Gesponsord' },
  'common.back': { pt: 'Voltar', en: 'Back', nl: 'Terug' },
  'common.island': { pt: 'Ilha', en: 'Island', nl: 'Eiland' },
  'common.type': { pt: 'Tipo', en: 'Type', nl: 'Type' },
  'common.all': { pt: 'Todos', en: 'All', nl: 'Alle' },
  'common.optional': { pt: 'opcional', en: 'optional', nl: 'optioneel' },
  'common.continue': { pt: 'Continuar', en: 'Continue', nl: 'Doorgaan' },
  'common.next': { pt: 'Seguinte', en: 'Next', nl: 'Volgende' },
  'common.restart': { pt: 'Recomeçar', en: 'Start over', nl: 'Opnieuw' },
  'common.open': { pt: 'Abrir', en: 'Open', nl: 'Openen' },
  'common.demoAction': { pt: 'Demonstração — ação sem efeito real.', en: 'Demo — action has no real effect.', nl: 'Demo — actie heeft geen echt effect.' },

  'demo.banner': { pt: 'Demonstração · dados fictícios — não é um serviço real.', en: 'Demo · fictional data — not a real service.', nl: 'Demo · fictieve data — geen echte dienst.' },

  // Home
  'home.heroTitle': { pt: 'Terra, imóveis, construção e informação oficial num só lugar', en: 'Land, property, building and official information in one place', nl: 'Grond, vastgoed, bouw en officiële informatie op één plek' },
  'home.heroSubtitle': { pt: 'Encontre, verifique e contacte com confiança — a começar por São Vicente.', en: 'Find, verify and contact with confidence — starting on São Vicente.', nl: 'Vind, verifieer en neem met vertrouwen contact op — te beginnen op São Vicente.' },
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

  // Official info
  'info.title': { pt: 'Centro de informação oficial', en: 'Official information centre', nl: 'Centrum voor officiële informatie' },
  'info.intro': { pt: 'Informação publicada por, ou resumida a partir de, fontes oficiais. Cada página indica a entidade responsável, o estado oficial e a data de atualização. A Djarvista não substitui as entidades públicas nem presta aconselhamento jurídico.', en: 'Information published by, or summarized from, official sources. Each page states the responsible authority, the official status and the update date. Djarvista does not replace public bodies and does not give legal advice.', nl: 'Informatie gepubliceerd door, of samengevat uit, officiële bronnen. Elke pagina vermeldt de verantwoordelijke instantie, de officiële status en de bijwerkdatum. Djarvista vervangt geen overheidsinstanties en geeft geen juridisch advies.' },
  'info.version': { pt: 'Versão', en: 'Version', nl: 'Versie' },
  'info.updated': { pt: 'Atualizado', en: 'Updated', nl: 'Bijgewerkt' },
  'info.validFrom': { pt: 'Válido desde', en: 'Valid from', nl: 'Geldig vanaf' },

  // Procedures
  'proc.title': { pt: 'Procedimentos passo a passo', en: 'Step-by-step procedures', nl: 'Procedures stap voor stap' },
  'proc.intro': { pt: 'Guias práticos baseados em informação controlada. Não constituem aconselhamento jurídico — confirme sempre com as entidades competentes.', en: 'Practical guides based on controlled information. They are not legal advice — always confirm with the competent authorities.', nl: 'Praktische gidsen op basis van gecontroleerde informatie. Dit is geen juridisch advies — bevestig altijd bij de bevoegde instanties.' },
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
  'lead.ok': { pt: 'Demonstração: mensagem recebida. Numa versão real seria contactado em breve.', en: 'Demo: message received. In a real version you would be contacted shortly.', nl: 'Demo: bericht ontvangen. In een echte versie word je binnenkort gecontacteerd.' },

  // Footer
  'footer.body': { pt: 'Infraestrutura digital independente para imóveis, construção e informação pública em Cabo Verde. A informação comercial é indicativa; a informação oficial é claramente identificada. A Djarvista não presta aconselhamento jurídico.', en: 'Independent digital infrastructure for property, building and public information in Cabo Verde. Commercial information is indicative; official information is clearly identified. Djarvista does not provide legal advice.', nl: 'Onafhankelijke digitale infrastructuur voor vastgoed, bouw en overheidsinformatie in Kaapverdië. Commerciële informatie is indicatief; officiële informatie is duidelijk herkenbaar. Djarvista geeft geen juridisch advies.' },
  'footer.demo': { pt: 'Demonstração · dados fictícios · piloto conceptual São Vicente', en: 'Demo · fictional data · conceptual São Vicente pilot', nl: 'Demo · fictieve data · conceptuele São Vicente-pilot' },
  'footer.explore': { pt: 'Explorar', en: 'Explore', nl: 'Ontdek' },
  'footer.account': { pt: 'Conta', en: 'Account', nl: 'Account' },

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

  // Wizard
  'wiz.title': { pt: 'Assistente de passos', en: 'Step assistant', nl: 'Stappen-assistent' },
  'wiz.intro': { pt: 'Responda a três perguntas e receba um plano indicativo: passos, entidades, documentos, profissionais e riscos. Não é aconselhamento jurídico.', en: 'Answer three questions and get an indicative plan: steps, authorities, documents, professionals and risks. This is not legal advice.', nl: 'Beantwoord drie vragen en krijg een indicatief plan: stappen, instanties, documenten, professionals en risico’s. Dit is geen juridisch advies.' },
  'wiz.q1': { pt: 'Quem é você?', en: 'Who are you?', nl: 'Wie ben je?' },
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
  'proj.intro': { pt: 'Um espaço simples para acompanhar orçamentos, marcos, documentos e pagamentos. (Exemplos fictícios.)', en: 'A simple space to follow quotes, milestones, documents and payments. (Fictional examples.)', nl: 'Een eenvoudige ruimte om offertes, mijlpalen, documenten en betalingen te volgen. (Fictieve voorbeelden.)' },
  'proj.milestones': { pt: 'Marcos', en: 'Milestones', nl: 'Mijlpalen' },
  'proj.budget': { pt: 'Orçamento', en: 'Budget', nl: 'Budget' },
  'proj.progress': { pt: 'Progresso', en: 'Progress', nl: 'Voortgang' },
  'proj.status.PLANNING': { pt: 'Planeamento', en: 'Planning', nl: 'Planning' },
  'proj.status.IN_PROGRESS': { pt: 'Em curso', en: 'In progress', nl: 'In uitvoering' },
  'proj.status.REVIEW': { pt: 'Em revisão', en: 'In review', nl: 'In controle' },
  'proj.status.DONE': { pt: 'Concluído', en: 'Completed', nl: 'Afgerond' },

  // Tenders
  'tend.title': { pt: 'Concursos & aberturas', en: 'Tenders & open jobs', nl: 'Aanbestedingen & opdrachten' },
  'tend.intro': { pt: 'Pedidos abertos de clientes e organizações. Concursos públicos apenas quando legalmente permitido. (Exemplos fictícios.)', en: 'Open requests from clients and organisations. Public tenders only where legally permitted. (Fictional examples.)', nl: 'Open aanvragen van klanten en organisaties. Publieke aanbestedingen alleen waar juridisch toegestaan. (Fictieve voorbeelden.)' },
  'tend.deadline': { pt: 'Prazo', en: 'Deadline', nl: 'Deadline' },
  'tend.budget': { pt: 'Orçamento indicativo', en: 'Indicative budget', nl: 'Indicatief budget' },
  'tend.bids': { pt: 'propostas', en: 'bids', nl: 'inschrijvingen' },
  'tend.public': { pt: 'Público', en: 'Public', nl: 'Publiek' },
  'tend.private': { pt: 'Privado', en: 'Private', nl: 'Privaat' },
  'tend.submitBid': { pt: 'Enviar proposta', en: 'Submit a bid', nl: 'Inschrijven' },

  // Materials
  'mat.title': { pt: 'Materiais & fornecedores', en: 'Materials & suppliers', nl: 'Bouwmaterialen & leveranciers' },
  'mat.intro': { pt: 'Diretório de fornecedores de materiais de construção. Preços opcionais; peça orçamento. (Exemplos fictícios.)', en: 'Directory of building-materials suppliers. Prices optional; request a quote. (Fictional examples.)', nl: 'Gids van leveranciers van bouwmaterialen. Prijzen optioneel; vraag een offerte. (Fictieve voorbeelden.)' },
  'mat.category': { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  'mat.requestQuote': { pt: 'Pedir orçamento', en: 'Request a quote', nl: 'Offerte aanvragen' },

  // Verification centre
  'veri.title': { pt: 'Confiança & verificação', en: 'Trust & verification', nl: 'Vertrouwen & verificatie' },
  'veri.intro': { pt: 'Seis níveis de verificação. Cada nível exige provas próprias; as verificações sensíveis nunca são feitas apenas por IA — há sempre controlo humano.', en: 'Six verification levels. Each level requires its own proof; sensitive checks are never done by AI alone — there is always human control.', nl: 'Zes verificatieniveaus. Elk niveau vereist eigen bewijs; gevoelige controles gebeuren nooit alleen door AI — er is altijd menselijke controle.' },
  'veri.proof': { pt: 'Prova necessária', en: 'Proof required', nl: 'Vereist bewijs' },
} satisfies Record<string, TL>;

export type UIKey = keyof typeof UI;
export const t = (l: Locale, key: UIKey): string => tr(UI[key], l);

// --- Content types ---
export type VerificationLevel = 'L0_NONE' | 'L1_IDENTITY' | 'L2_BUSINESS' | 'L3_DOCUMENTS' | 'L4_TRANSACTION' | 'L5_INSTITUTIONAL';

export interface Listing {
  id: string; slug: string; kind: string; title: TL; description: TL;
  priceAmount: number | null; priceOnRequest: boolean; isFeatured: boolean;
  documentStatus: string; island: string; municipality: string; thumbnail: string;
  publishedAt: string; lastVerifiedAt: string | null; riskNotes: TL | null;
  property: { type: string; bedrooms: number | null; bathrooms: number | null; builtAreaSqm: number | null; plotAreaSqm: number | null } | null;
  land: { type: string; areaSqm: number | null; zoning: TL | null; buildable: boolean } | null;
}
export interface Professional {
  id: string; slug: string; displayName: string; headline: TL;
  ratingAvg: number | null; ratingCount: number; verificationLevel: VerificationLevel;
  serviceAreas: string[]; priceIndication: TL | null;
}
export interface ProcedureStep { sortOrder: number; title: TL; description: TL; responsibleEntity: TL; requiredDocuments: TL[]; estimatedDays: number }
export interface Procedure { slug: string; title: TL; summary: TL; govEntity: string; estimatedDays: number; steps: ProcedureStep[] }
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
  if (!d) return '—';
  const loc = l === 'nl' ? 'nl-NL' : l === 'en' ? 'en-GB' : 'pt-PT';
  return new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(new Date(d));
}
export const docLabel = (l: Locale, s: string): string => {
  const key = `doc.${s}` as UIKey;
  return t(l, key in UI ? key : 'doc.UNKNOWN');
};
export const verifLabel = (l: Locale, v: VerificationLevel): string =>
  t(l, ({ L0_NONE: 'verif.L0', L1_IDENTITY: 'verif.L1', L2_BUSINESS: 'verif.L2', L3_DOCUMENTS: 'verif.L3', L4_TRANSACTION: 'verif.L4', L5_INSTITUTIONAL: 'verif.L5' } as Record<VerificationLevel, UIKey>)[v]);
export function whatsappLink(message: string, to = '2389000000'): string {
  return `https://wa.me/${to.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
const img = (label: string): string => `https://placehold.co/1200x800/0e6a91/ffffff?text=${encodeURIComponent(label)}`;

// --- Content data (fictional) ---
export const LISTINGS: Listing[] = [
  { id: 'l1', slug: 'villa-vista-mar-monte-sossego', kind: 'PROPERTY_SALE',
    title: { pt: 'Villa com vista mar — Monte Sossego, Mindelo', en: 'Sea-view villa — Monte Sossego, Mindelo', nl: 'Villa met zeezicht — Monte Sossego, Mindelo' },
    description: { pt: 'Villa de 3 quartos com vista para a baía de Mindelo. Documentos declarados, verificação pendente. (Dados fictícios.)', en: '3-bedroom villa overlooking Mindelo bay. Documents declared, verification pending. (Fictional data.)', nl: 'Villa met 3 slaapkamers en uitzicht op de baai van Mindelo. Documenten opgegeven, verificatie in behandeling. (Fictieve data.)' },
    priceAmount: 18500000, priceOnRequest: false, isFeatured: true, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Villa Mindelo'), publishedAt: '2026-06-10', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'VILLA', bedrooms: 3, bathrooms: 2, builtAreaSqm: 180, plotAreaSqm: 420 }, land: null },
  { id: 'l2', slug: 'terreno-600m2-monte-sossego', kind: 'LAND',
    title: { pt: 'Terreno para construção 600 m² — Monte Sossego', en: 'Building land 600 m² — Monte Sossego', nl: 'Bouwgrond 600 m² — Monte Sossego' },
    description: { pt: 'Terreno construível com boa exposição. Zonamento e viabilidade a confirmar com a Câmara Municipal. (Dados fictícios.)', en: 'Buildable plot with good aspect. Zoning and feasibility to be confirmed with the municipality. (Fictional data.)', nl: 'Bebouwbaar perceel met goede ligging. Bestemming en haalbaarheid te bevestigen bij de gemeente. (Fictieve data.)' },
    priceAmount: 4200000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Terreno Sossego'), publishedAt: '2026-06-14', lastVerifiedAt: null,
    riskNotes: { pt: 'Zonamento e viabilidade de construção requerem confirmação municipal.', en: 'Zoning and buildability require municipal confirmation.', nl: 'Bestemming en bebouwbaarheid vereisen bevestiging door de gemeente.' },
    property: null, land: { type: 'BUILDING_LAND', areaSqm: 600, zoning: { pt: 'Residencial (a confirmar)', en: 'Residential (to confirm)', nl: 'Residentieel (te bevestigen)' }, buildable: true } },
  { id: 'l3', slug: 'apartamento-t2-centro-mindelo', kind: 'PROPERTY_RENT',
    title: { pt: 'Apartamento T2 no centro histórico de Mindelo', en: '2-bed apartment in Mindelo old town', nl: 'Appartement (2 slk) in het oude centrum van Mindelo' },
    description: { pt: 'Apartamento renovado perto do Mercado Municipal. Documentos verificados. (Dados fictícios.)', en: 'Renovated apartment near the Municipal Market. Documents verified. (Fictional data.)', nl: 'Gerenoveerd appartement vlak bij de gemeentelijke markt. Documenten geverifieerd. (Fictieve data.)' },
    priceAmount: 65000, priceOnRequest: false, isFeatured: false, documentStatus: 'VERIFIED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('T2 Centro'), publishedAt: '2026-06-20', lastVerifiedAt: '2026-06-22', riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 1, builtAreaSqm: 85, plotAreaSqm: null }, land: null },
  { id: 'l4', slug: 'moradia-santa-maria-sal', kind: 'HOLIDAY_RENT',
    title: { pt: 'Moradia de férias — Santa Maria, Sal', en: 'Holiday home — Santa Maria, Sal', nl: 'Vakantiewoning — Santa Maria, Sal' },
    description: { pt: 'Moradia T3 a 300 m da praia. Ideal para arrendamento turístico. (Dados fictícios.)', en: '3-bedroom house 300 m from the beach. Ideal for holiday rental. (Fictional data.)', nl: 'Woning met 3 slaapkamers op 300 m van het strand. Ideaal voor vakantieverhuur. (Fictieve data.)' },
    priceAmount: 120000, priceOnRequest: false, isFeatured: true, documentStatus: 'UPLOADED', island: 'Sal', municipality: 'Sal',
    thumbnail: img('Santa Maria'), publishedAt: '2026-06-25', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'HOUSE', bedrooms: 3, bathrooms: 2, builtAreaSqm: 140, plotAreaSqm: 300 }, land: null },
  { id: 'l5', slug: 'espaco-comercial-plateau-praia', kind: 'COMMERCIAL',
    title: { pt: 'Espaço comercial — Plateau, Praia', en: 'Commercial space — Plateau, Praia', nl: 'Commerciële ruimte — Plateau, Praia' },
    description: { pt: 'Loja de rés-do-chão na zona do Plateau. Preço sob consulta. (Dados fictícios.)', en: 'Ground-floor shop in the Plateau area. Price on request. (Fictional data.)', nl: 'Winkel op de begane grond in de Plateau-wijk. Prijs op aanvraag. (Fictieve data.)' },
    priceAmount: null, priceOnRequest: true, isFeatured: false, documentStatus: 'DECLARED', island: 'Santiago', municipality: 'Praia',
    thumbnail: img('Plateau Praia'), publishedAt: '2026-05-30', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'COMMERCIAL', bedrooms: null, bathrooms: 1, builtAreaSqm: 110, plotAreaSqm: null }, land: null },
  { id: 'l6', slug: 'projeto-novo-baia-das-gatas', kind: 'NEW_DEVELOPMENT',
    title: { pt: 'Novo projeto — condomínio Baía das Gatas', en: 'New development — Baía das Gatas condominium', nl: 'Nieuw project — condominium Baía das Gatas' },
    description: { pt: 'Projeto de 8 apartamentos em fase de pré-venda. (Dados fictícios.)', en: '8-apartment project in pre-sale phase. (Fictional data.)', nl: 'Project van 8 appartementen in de voorverkoopfase. (Fictieve data.)' },
    priceAmount: 9800000, priceOnRequest: false, isFeatured: false, documentStatus: 'DECLARED', island: 'São Vicente', municipality: 'São Vicente',
    thumbnail: img('Baia das Gatas'), publishedAt: '2026-07-01', lastVerifiedAt: null, riskNotes: null,
    property: { type: 'APARTMENT', bedrooms: 2, bathrooms: 2, builtAreaSqm: 95, plotAreaSqm: null }, land: null },
];

export const PROFESSIONALS: Professional[] = [
  { id: 'p1', slug: 'construcoes-djar', displayName: 'Construções Djar',
    headline: { pt: 'Empreiteiro geral — construção nova e renovação', en: 'General contractor — new build and renovation', nl: 'Hoofdaannemer — nieuwbouw en renovatie' },
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
    govEntity: 'Câmara Municipal de São Vicente (demo)', estimatedDays: 120, steps: [
      { sortOrder: 1, title: { pt: 'Verificar título e ónus', en: 'Verify title and encumbrances', nl: 'Titel en lasten controleren' },
        description: { pt: 'Solicitar a Certidão de Registo Predial na Conservatória do Registo Predial. Contratar um advogado independente.', en: 'Request the Land Registry Certificate from the Conservatória do Registo Predial. Hire an independent lawyer.', nl: 'Vraag het uittreksel bij de Conservatória do Registo Predial (kadaster) op. Schakel een onafhankelijke advocaat in.' },
        responsibleEntity: { pt: 'Conservatória do Registo Predial', en: 'Land Registry (Conservatória do Registo Predial)', nl: 'Kadaster (Conservatória do Registo Predial)' },
        requiredDocuments: [{ pt: 'Certidão de registo predial', en: 'Land registry certificate', nl: 'Kadastraal uittreksel' }, { pt: 'Identificação do vendedor', en: 'Seller identification', nl: 'Identificatie van de verkoper' }], estimatedDays: 14 },
      { sortOrder: 2, title: { pt: 'Confirmar zonamento e viabilidade', en: 'Confirm zoning and feasibility', nl: 'Bestemming en haalbaarheid bevestigen' },
        description: { pt: 'Confirmar o zonamento e o uso permitido junto do município.', en: 'Confirm zoning and permitted use with the municipality.', nl: 'Bevestig de bestemming en het toegestane gebruik bij de gemeente.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Referência cadastral', en: 'Cadastral reference', nl: 'Kadastrale referentie' }, { pt: 'Planta de localização', en: 'Site plan', nl: 'Situatietekening' }], estimatedDays: 21 },
      { sortOrder: 3, title: { pt: 'Assinar a escritura pública e registar', en: 'Sign the public deed and register', nl: 'De notariële akte tekenen en registreren' },
        description: { pt: 'Assinar a escritura pública perante notário e registar a transmissão.', en: 'Sign the public deed before a notary and register the transfer.', nl: 'Onderteken de notariële akte bij een notaris en registreer de overdracht.' },
        responsibleEntity: { pt: 'Notário + Conservatória', en: 'Notary + Land Registry', nl: 'Notaris + kadaster' },
        requiredDocuments: [{ pt: 'Minuta da escritura', en: 'Draft deed', nl: 'Concept-akte' }, { pt: 'Prova de fundos', en: 'Proof of funds', nl: 'Bewijs van financiering' }], estimatedDays: 30 },
      { sortOrder: 4, title: { pt: 'Pedido de licença de construção', en: 'Apply for a building permit', nl: 'Bouwvergunning aanvragen' },
        description: { pt: 'Submeter o projeto de arquitetura para a licença de construção.', en: 'Submit the architectural project for the building permit.', nl: 'Dien het architectenontwerp in voor de bouwvergunning.' },
        responsibleEntity: { pt: 'Câmara Municipal', en: 'Municipality', nl: 'Gemeente' },
        requiredDocuments: [{ pt: 'Projeto de arquitetura', en: 'Architectural project', nl: 'Architectenontwerp' }, { pt: 'Termo de responsabilidade do engenheiro', en: 'Engineer sign-off', nl: 'Verklaring van de ingenieur' }], estimatedDays: 45 },
    ] },
  { slug: 'registar-empresa-empresa-no-dia',
    title: { pt: 'Registar uma empresa (“Empresa no Dia”)', en: 'Register a company (“Empresa no Dia”)', nl: 'Een bedrijf registreren (“Empresa no Dia”)' },
    summary: { pt: 'Como constituir uma empresa através da Casa do Cidadão. Informação indicativa.', en: 'How to set up a company through the Casa do Cidadão. Indicative information.', nl: 'Hoe je een bedrijf opricht via de Casa do Cidadão. Indicatieve informatie.' },
    govEntity: 'Casa do Cidadão (demo)', estimatedDays: 1, steps: [
      { sortOrder: 1, title: { pt: 'Reservar o nome / obter o CAF', en: 'Reserve the name / obtain the CAF', nl: 'Naam reserveren / CAF verkrijgen' },
        description: { pt: 'Solicitar o certificado de admissibilidade da firma.', en: 'Request the company name admissibility certificate.', nl: 'Vraag het toelaatbaarheidscertificaat voor de bedrijfsnaam aan.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Documento de identificação', en: 'ID document', nl: 'Identiteitsdocument' }], estimatedDays: 1 },
      { sortOrder: 2, title: { pt: 'Constituir a empresa no balcão', en: 'Incorporate the company at the counter', nl: 'Het bedrijf aan de balie oprichten' },
        description: { pt: 'Entregar a documentação e constituir a empresa no mesmo dia.', en: 'Submit the documents and incorporate the company the same day.', nl: 'Lever de documenten in en richt het bedrijf dezelfde dag op.' },
        responsibleEntity: { pt: 'Casa do Cidadão', en: 'Casa do Cidadão', nl: 'Casa do Cidadão' },
        requiredDocuments: [{ pt: 'Identificação dos sócios', en: 'Partners identification', nl: 'Identificatie van de vennoten' }, { pt: 'Comprovativo de capital', en: 'Proof of capital', nl: 'Bewijs van kapitaal' }], estimatedDays: 1 },
    ] },
];

export const PUBLICATIONS: Publication[] = [
  { title: { pt: 'Requisitos da licença de construção — São Vicente (demo)', en: 'Building permit requirements — São Vicente (demo)', nl: 'Vereisten bouwvergunning — São Vicente (demo)' },
    govEntity: 'Câmara Municipal de São Vicente (demo)', officialStatus: false, version: 1, updatedAt: '2026-07-01', validFrom: '2026-07-01',
    plainSummary: { pt: 'Resumo em linguagem simples dos passos para a licença de construção (demonstração).', en: 'Plain-language summary of the building-permit steps (demo).', nl: 'Samenvatting in eenvoudige taal van de stappen voor de bouwvergunning (demo).' } },
  { title: { pt: 'Reforma fiscal imobiliária 2026: cITI e cIPI (demo)', en: '2026 real-estate tax reform: cITI and cIPI (demo)', nl: 'Vastgoedbelastinghervorming 2026: cITI en cIPI (demo)' },
    govEntity: 'Portal informativo Djarvista', officialStatus: false, version: 2, updatedAt: '2026-06-15', validFrom: '2026-01-01',
    plainSummary: { pt: 'Desde 1 de janeiro de 2026 o IUP foi substituído pelo cITI (transmissão) e cIPI (propriedade). Resumo indicativo — confirmar com as Finanças.', en: 'Since 1 January 2026 the IUP has been replaced by cITI (transfer) and cIPI (ownership). Indicative summary — confirm with the tax authority.', nl: 'Sinds 1 januari 2026 is de IUP vervangen door cITI (overdracht) en cIPI (eigendom). Indicatieve samenvatting — bevestig bij de Belastingdienst.' } },
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
