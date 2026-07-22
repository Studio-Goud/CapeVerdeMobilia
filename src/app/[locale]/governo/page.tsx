import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/governo');
}
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card, Pill, OfficialTag, SectionHead } from '@/components/ui';

// --- Page-specific content (trilingual PT / EN / NL) ---------------------

const HERO_TITLE: TL = {
  pt: 'A Djarvista não substitui o Estado - torna a informação oficial mais fácil de encontrar, compreender e consultar.',
  en: 'Djarvista does not replace the government - it makes official information easier to find, understand and access.',
  nl: 'Djarvista vervangt de overheid niet - het maakt officiële informatie makkelijker te vinden, te begrijpen en te bereiken.',
};

const HERO_INTRO: TL = {
  pt: 'Uma plataforma independente ao serviço do interesse público: valor público, transparência, inclusão digital e alívio administrativo para os organismos de Cabo Verde.',
  en: 'An independent platform in the service of the public interest: public value, transparency, digital inclusion and administrative relief for public bodies in Cabo Verde.',
  nl: 'Een onafhankelijk platform in dienst van het algemeen belang: publieke waarde, transparantie, digitale inclusie en administratieve verlichting voor overheidsinstanties in Kaapverdië.',
};

const VALUE_HEAD: TL = {
  pt: 'Valor para os organismos públicos',
  en: 'Value for public bodies',
  nl: 'Waarde voor overheidsinstanties',
};

const VALUES: { h: TL; body: TL }[] = [
  {
    h: { pt: 'Menos perguntas repetidas', en: 'Fewer repeated questions', nl: 'Minder herhaalde vragen' },
    body: {
      pt: 'Informação clara e centralizada reduz os pedidos recorrentes aos balcões e serviços.',
      en: 'Clear, centralised information reduces recurring enquiries at counters and services.',
      nl: 'Duidelijke, gecentraliseerde informatie vermindert terugkerende vragen aan loketten en diensten.',
    },
  },
  {
    h: { pt: 'Melhor prestação de informação', en: 'Better information provision', nl: 'Betere informatievoorziening' },
    body: {
      pt: 'A informação oficial chega ao cidadão de forma acessível, em três línguas.',
      en: 'Official information reaches citizens in an accessible way, in three languages.',
      nl: 'Officiële informatie bereikt de burger op een toegankelijke manier, in drie talen.',
    },
  },
  {
    h: { pt: 'Menos processos incompletos', en: 'Fewer incomplete applications', nl: 'Minder onvolledige aanvragen' },
    body: {
      pt: 'Requisitos explicados antecipadamente resultam em dossiês mais completos à entrada.',
      en: 'Requirements explained upfront lead to more complete files at submission.',
      nl: 'Vooraf uitgelegde vereisten leiden tot completere dossiers bij indiening.',
    },
  },
  {
    h: { pt: 'Processos mais transparentes', en: 'More transparent processes', nl: 'Transparantere processen' },
    body: {
      pt: 'Passos, prazos e autoridades competentes tornam-se visíveis e comparáveis.',
      en: 'Steps, deadlines and competent authorities become visible and comparable.',
      nl: 'Stappen, termijnen en bevoegde autoriteiten worden zichtbaar en vergelijkbaar.',
    },
  },
  {
    h: { pt: 'Melhor experiência do investidor', en: 'Better investor experience', nl: 'Betere investeerderservaring' },
    body: {
      pt: 'Quem investe encontra o caminho oficial mais depressa e com menos incerteza.',
      en: 'Investors find the official pathway faster and with less uncertainty.',
      nl: 'Investeerders vinden het officiële traject sneller en met minder onzekerheid.',
    },
  },
  {
    h: { pt: 'Dossiês de maior qualidade', en: 'Higher-quality dossiers', nl: 'Dossiers van hogere kwaliteit' },
    body: {
      pt: 'Documentação melhor preparada facilita a análise e a decisão administrativa.',
      en: 'Better-prepared documentation eases administrative review and decision-making.',
      nl: 'Beter voorbereide documentatie vergemakkelijkt de administratieve beoordeling en besluitvorming.',
    },
  },
  {
    h: { pt: 'Melhor encaminhamento', en: 'Better referral', nl: 'Betere doorverwijzing' },
    body: {
      pt: 'Cada pedido é orientado para a autoridade competente correta desde o início.',
      en: 'Every request is routed to the correct competent authority from the start.',
      nl: 'Elke aanvraag wordt vanaf het begin naar de juiste bevoegde autoriteit geleid.',
    },
  },
  {
    h: { pt: 'Desenvolvimento económico', en: 'Economic development', nl: 'Economische ontwikkeling' },
    body: {
      pt: 'Menos atrito administrativo apoia o investimento e a criação de emprego local.',
      en: 'Less administrative friction supports investment and local job creation.',
      nl: 'Minder administratieve wrijving ondersteunt investeringen en lokale werkgelegenheid.',
    },
  },
  {
    h: { pt: 'Profissionalização da construção', en: 'Professionalisation of construction', nl: 'Professionalisering van de bouw' },
    body: {
      pt: 'Padrões claros ajudam o setor da construção a operar de forma mais formal.',
      en: 'Clear standards help the construction sector operate more formally.',
      nl: 'Duidelijke normen helpen de bouwsector formeler te opereren.',
    },
  },
  {
    h: { pt: 'Inclusão digital', en: 'Digital inclusion', nl: 'Digitale inclusie' },
    body: {
      pt: 'Uma porta digital simples aproxima a administração pública de toda a população.',
      en: 'A simple digital gateway brings public administration closer to the whole population.',
      nl: 'Een eenvoudige digitale toegangspoort brengt het openbaar bestuur dichter bij de hele bevolking.',
    },
  },
];

const HANDLE_HEAD: TL = {
  pt: 'Como tratamos a informação oficial',
  en: 'How official information is handled',
  nl: 'Hoe officiële informatie wordt behandeld',
};

const HANDLE_INTRO: TL = {
  pt: 'A informação oficial é sempre distinguida da informação comercial. Nada é apresentado como lei ou procedimento confirmado sem publicação oficial.',
  en: 'Official information is always kept distinct from commercial information. Nothing is presented as confirmed law or procedure without official publication.',
  nl: 'Officiële informatie wordt altijd gescheiden gehouden van commerciële informatie. Niets wordt gepresenteerd als bevestigde wet of procedure zonder officiële publicatie.',
};

const HANDLE_POINTS: TL[] = [
  { pt: 'Autoridade responsável', en: 'Responsible authority', nl: 'Verantwoordelijke autoriteit' },
  { pt: 'Estatuto oficial', en: 'Official status', nl: 'Officiële status' },
  { pt: 'Data de publicação e de última atualização', en: 'Publication and last-updated date', nl: 'Publicatie- en laatst-bijgewerkt-datum' },
  { pt: 'Versão', en: 'Version', nl: 'Versie' },
  { pt: 'Documento-fonte', en: 'Source document', nl: 'Brondocument' },
];

const HANDLE_EXAMPLES: { variant: 'official' | 'summary' | 'unconfirmed'; note: TL }[] = [
  {
    variant: 'official',
    note: {
      pt: 'Publicado e verificado pela autoridade competente.',
      en: 'Published and verified by the competent authority.',
      nl: 'Gepubliceerd en geverifieerd door de bevoegde autoriteit.',
    },
  },
  {
    variant: 'summary',
    note: {
      pt: 'Resumo da plataforma para leitura mais fácil - não substitui o documento oficial.',
      en: 'Platform summary for easier reading - it does not replace the official document.',
      nl: 'Platformsamenvatting voor gemakkelijker lezen - vervangt het officiële document niet.',
    },
  },
  {
    variant: 'unconfirmed',
    note: {
      pt: 'Ainda não confirmado oficialmente - marcado como tal até publicação.',
      en: 'Not yet officially confirmed - marked as such until published.',
      nl: 'Nog niet officieel bevestigd - als zodanig gemarkeerd tot publicatie.',
    },
  },
];

const MODELS_HEAD: TL = {
  pt: 'Três modelos de cooperação',
  en: 'Three cooperation models',
  nl: 'Drie samenwerkingsmodellen',
};

const MODELS: { tag: TL; h: TL; body: TL }[] = [
  {
    tag: { pt: 'Modelo A', en: 'Model A', nl: 'Model A' },
    h: { pt: 'Parceiro informal de informação', en: 'Informal information partner', nl: 'Informele informatiepartner' },
    body: {
      pt: 'Divulgamos informação pública já existente, sempre com a fonte e o estatuto claros.',
      en: 'We surface existing public information, always with clear source and status.',
      nl: 'Wij ontsluiten bestaande openbare informatie, altijd met duidelijke bron en status.',
    },
  },
  {
    tag: { pt: 'Modelo B', en: 'Model B', nl: 'Model B' },
    h: { pt: 'Parceiro oficial de publicação', en: 'Official publication partner', nl: 'Officiële publicatiepartner' },
    body: {
      pt: 'O organismo publica diretamente informação oficial validada através da plataforma.',
      en: 'The public body publishes validated official information directly through the platform.',
      nl: 'De overheidsinstantie publiceert gevalideerde officiële informatie rechtstreeks via het platform.',
    },
  },
  {
    tag: { pt: 'Modelo C', en: 'Model C', nl: 'Model C' },
    h: { pt: 'Cooperação digital público-privada', en: 'Public-private digital cooperation', nl: 'Publiek-private digitale samenwerking' },
    body: {
      pt: 'Colaboração estruturada em serviços digitais partilhados ao serviço do cidadão.',
      en: 'Structured collaboration on shared digital services in the service of citizens.',
      nl: 'Gestructureerde samenwerking aan gedeelde digitale diensten ten dienste van de burger.',
    },
  },
];

const SAFEGUARD_HEAD: TL = {
  pt: 'Controlo humano e limites claros',
  en: 'Human control and clear limits',
  nl: 'Menselijke controle en duidelijke grenzen',
};

const SAFEGUARD_HUMAN: TL = {
  pt: 'As verificações sensíveis nunca são feitas apenas por inteligência artificial - existe sempre controlo humano.',
  en: 'Sensitive verifications are never carried out by AI alone - there is always human control.',
  nl: 'Gevoelige verificaties worden nooit alleen door AI uitgevoerd - er is altijd menselijke controle.',
};

const SAFEGUARD_LEGAL: TL = {
  pt: 'A plataforma não presta aconselhamento jurídico. Para decisões formais, consulte a autoridade competente.',
  en: 'The platform does not provide legal advice. For formal decisions, consult the competent authority.',
  nl: 'Het platform geeft geen juridisch advies. Raadpleeg voor formele beslissingen de bevoegde autoriteit.',
};

const CTA_HEAD: TL = {
  pt: 'Explorar a informação oficial',
  en: 'Explore official information',
  nl: 'Officiële informatie verkennen',
};

const CTA_BODY: TL = {
  pt: 'Veja como a informação oficial é apresentada e como a confiança é construída na plataforma.',
  en: 'See how official information is presented and how trust is built on the platform.',
  nl: 'Bekijk hoe officiële informatie wordt gepresenteerd en hoe vertrouwen op het platform wordt opgebouwd.',
};

export default function GovernoPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  return (
    <div className="space-y-10">
      {/* 1. Hero */}
      <section className="bg-hero-ocean overflow-hidden rounded-2xl px-6 py-10 text-white shadow-card sm:px-10 sm:py-14">
        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wide">
          {tr(
            { pt: 'Para organismos públicos', en: 'For public bodies', nl: 'Voor overheidsinstanties' },
            locale,
          )}
        </span>
        <h1 className="mt-4 max-w-4xl text-2xl font-bold leading-tight sm:text-4xl">{tr(HERO_TITLE, locale)}</h1>
        <p className="mt-4 max-w-3xl text-sm text-white/90 sm:text-base">{tr(HERO_INTRO, locale)}</p>
      </section>

      {/* 2. Value for public bodies */}
      <section>
        <SectionHead title={tr(VALUE_HEAD, locale)} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Card key={i}>
              <h3 className="text-base font-semibold text-slate-900">{tr(v.h, locale)}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr(v.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. How official information is handled */}
      <section>
        <SectionHead title={tr(HANDLE_HEAD, locale)} />
        <p className="mb-4 max-w-3xl text-sm text-slate-600">{tr(HANDLE_INTRO, locale)}</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-emerald-200 bg-emerald-50/40">
            <div className="mb-3 flex items-center gap-2">
              <OfficialTag variant="official" locale={locale} />
              <span className="text-sm font-semibold text-emerald-800">
                {tr(
                  { pt: 'Cada ficha oficial mostra sempre', en: 'Every official record always shows', nl: 'Elk officieel item toont altijd' },
                  locale,
                )}
              </span>
            </div>
            <ul className="space-y-2">
              {HANDLE_POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span aria-hidden className="mt-0.5 text-emerald-600">✓</span>
                  {tr(p, locale)}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="mb-3 text-sm font-semibold text-slate-900">
              {tr(
                { pt: 'Estatuto visualmente distinto', en: 'Visually distinct status', nl: 'Visueel onderscheiden status' },
                locale,
              )}
            </p>
            <ul className="space-y-3">
              {HANDLE_EXAMPLES.map((ex, i) => (
                <li key={i} className="flex items-start gap-3">
                  <OfficialTag variant={ex.variant} locale={locale} />
                  <span className="text-sm text-slate-600">{tr(ex.note, locale)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              {tr(
                {
                  pt: 'A informação oficial é sempre distinta da informação comercial.',
                  en: 'Official information is always distinct from commercial information.',
                  nl: 'Officiële informatie is altijd onderscheiden van commerciële informatie.',
                },
                locale,
              )}
            </p>
          </Card>
        </div>
      </section>

      {/* 4. Cooperation models */}
      <section>
        <SectionHead title={tr(MODELS_HEAD, locale)} />
        <div className="grid gap-4 lg:grid-cols-3">
          {MODELS.map((m, i) => (
            <Card key={i}>
              <Pill tone="brand">{tr(m.tag, locale)}</Pill>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{tr(m.h, locale)}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr(m.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Human control + no legal advice */}
      <section>
        <SectionHead title={tr(SAFEGUARD_HEAD, locale)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-emerald-200">
            <Pill tone="emerald">{t(locale, 'official.official')}</Pill>
            <p className="mt-2 text-sm text-slate-700">{tr(SAFEGUARD_HUMAN, locale)}</p>
          </Card>
          <Card className="border-amber-200">
            <Pill tone="amber">{t(locale, 'official.unconfirmed')}</Pill>
            <p className="mt-2 text-sm text-slate-700">{tr(SAFEGUARD_LEGAL, locale)}</p>
          </Card>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-hero-ocean rounded-2xl px-6 py-8 text-white shadow-card sm:px-10">
        <h2 className="text-xl font-semibold sm:text-2xl">{tr(CTA_HEAD, locale)}</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/90">{tr(CTA_BODY, locale)}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/info`}
            className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-white/90"
          >
            {t(locale, 'nav.info')}
          </Link>
          <Link
            href={`/${locale}/verificacao`}
            className="inline-flex rounded-xl border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {t(locale, 'nav.verification')}
          </Link>
        </div>
      </section>
    </div>
  );
}
