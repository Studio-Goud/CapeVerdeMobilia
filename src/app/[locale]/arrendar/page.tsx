import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/arrendar');
}
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { Card } from '@/components/ui';

/** A titled block of trilingual copy rendered as a Card. */
interface Block { h: TL; body: TL }

const HERO_TITLE: TL = {
  pt: 'Arrende a sua casa de forma simples e segura',
  en: 'Rent out your home simply and safely',
  nl: 'Verhuur je woning eenvoudig en veilig',
};

const HERO_SUBTITLE: TL = {
  pt: 'A Djarvista dá-lhe as ferramentas para publicar, receber pedidos e formalizar o arrendamento — com confiança e transparência.',
  en: 'Djarvista gives you the tools to list, receive requests and formalise the rental — with trust and transparency.',
  nl: 'Djarvista geeft je de tools om te plaatsen, aanvragen te ontvangen en de verhuur te formaliseren — met vertrouwen en transparantie.',
};

const CTA_LIST: TL = {
  pt: 'Coloque a sua casa para arrendar',
  en: 'List your home for rent',
  nl: 'Plaats je woning te huur',
};

const CTA_BROWSE: TL = {
  pt: 'Ver casas para arrendar',
  en: 'Browse homes for rent',
  nl: 'Bekijk woningen te huur',
};

const HOW_TITLE: TL = {
  pt: 'Como funciona',
  en: 'How it works',
  nl: 'Hoe het werkt',
};

const HOW_INTRO: TL = {
  pt: 'Do anúncio ao contrato em quatro passos simples.',
  en: 'From listing to contract in four simple steps.',
  nl: 'Van advertentie tot contract in vier eenvoudige stappen.',
};

const STEPS: Block[] = [
  {
    h: {
      pt: 'Publique a sua casa com fotos',
      en: 'List your home with photos',
      nl: 'Plaats je woning met foto’s',
    },
    body: {
      pt: 'Crie um anúncio claro com fotos, localização e condições de arrendamento.',
      en: 'Create a clear listing with photos, location and rental terms.',
      nl: 'Maak een duidelijke advertentie met foto’s, locatie en huurvoorwaarden.',
    },
  },
  {
    h: {
      pt: 'Receba pedidos para um período',
      en: 'Receive requests for a period',
      nl: 'Ontvang aanvragen voor een periode',
    },
    body: {
      pt: 'Interessados enviam pedidos indicando as datas e a duração pretendida.',
      en: 'Interested tenants send requests stating the dates and duration they want.',
      nl: 'Geïnteresseerden sturen aanvragen met de gewenste data en duur.',
    },
  },
  {
    h: {
      pt: 'Aceite e entre em contacto',
      en: 'Accept and get in touch',
      nl: 'Accepteer en kom in contact',
    },
    body: {
      pt: 'Escolha o pedido certo e comunique diretamente com o inquilino.',
      en: 'Choose the right request and communicate directly with the tenant.',
      nl: 'Kies de juiste aanvraag en communiceer rechtstreeks met de huurder.',
    },
  },
  {
    h: {
      pt: 'Faça um contrato de arrendamento com a nossa ferramenta',
      en: 'Draw up a rental contract with our tool',
      nl: 'Stel een huurcontract op via onze tool',
    },
    body: {
      pt: 'Gere um contrato claro em minutos, pronto a rever e assinar.',
      en: 'Generate a clear contract in minutes, ready to review and sign.',
      nl: 'Genereer in enkele minuten een helder contract, klaar om te controleren en te tekenen.',
    },
  },
];

const SAFE_TITLE: TL = {
  pt: 'Seguro & transparente',
  en: 'Safe & transparent',
  nl: 'Veilig & transparant',
};

const SAFE_INTRO: TL = {
  pt: 'Construímos confiança em cada passo, sem substituir aconselhamento jurídico.',
  en: 'We build trust at every step, without replacing legal advice.',
  nl: 'We bouwen vertrouwen op in elke stap, zonder juridisch advies te vervangen.',
};

const SAFE_FEATURES: Block[] = [
  {
    h: {
      pt: 'Verificação de identidade',
      en: 'Identity verification',
      nl: 'Identiteitsverificatie',
    },
    body: {
      pt: 'Confirmação de identidade por documento oficial (BI ou passaporte), com controlo humano.',
      en: 'Identity confirmed via official document (ID card or passport), with human control.',
      nl: 'Identiteit bevestigd via een officieel document (ID-kaart of paspoort), met menselijke controle.',
    },
  },
  {
    h: {
      pt: 'Perfis verificados e avaliações',
      en: 'Verified profiles and reviews',
      nl: 'Geverifieerde profielen en reviews',
    },
    body: {
      pt: 'Perfis com nível de confiança visível e avaliações com prova de uma relação real.',
      en: 'Profiles with a visible trust level and reviews backed by proof of a real relationship.',
      nl: 'Profielen met een zichtbaar vertrouwensniveau en reviews met bewijs van een echte relatie.',
    },
  },
  {
    h: {
      pt: 'A Djarvista é apenas uma ferramenta',
      en: 'Djarvista is only a tool',
      nl: 'Djarvista is alleen een tool',
    },
    body: {
      pt: 'Facilitamos o contacto e os documentos; não somos parte no contrato nem prestamos aconselhamento jurídico.',
      en: 'We facilitate contact and documents; we are not a party to the contract and give no legal advice.',
      nl: 'We faciliteren contact en documenten; we zijn geen partij bij het contract en geven geen juridisch advies.',
    },
  },
];

const CLOSING_TITLE: TL = {
  pt: 'Pronto para começar?',
  en: 'Ready to start?',
  nl: 'Klaar om te beginnen?',
};

const CTA_CONTRACT: TL = {
  pt: 'Elaborar contrato de arrendamento',
  en: 'Draw up a rental contract',
  nl: 'Huurcontract opstellen',
};

const CTA_VERIFY: TL = {
  pt: 'Verifique a sua identidade',
  en: 'Verify your identity',
  nl: 'Verifieer je identiteit',
};

export default function RentalsHubPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;

  return (
    <div className="space-y-10">
      {/* 1. Hero */}
      <section className="overflow-hidden rounded-3xl bg-hero-ocean px-6 py-12 text-white shadow-card sm:px-10 sm:py-16">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{tr(HERO_TITLE, locale)}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90">{tr(HERO_SUBTITLE, locale)}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/imoveis/novo?kind=PROPERTY_RENT`}
            className="inline-flex items-center justify-center rounded-2xl bg-coral-600 px-6 py-3 font-semibold text-white shadow-card transition hover:bg-coral-700"
          >
            {tr(CTA_LIST, locale)}
          </Link>
          <Link
            href={`/${locale}/imoveis?kind=PROPERTY_RENT`}
            className="inline-flex items-center justify-center rounded-2xl border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            {tr(CTA_BROWSE, locale)}
          </Link>
        </div>
      </section>

      {/* 2. How it works */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(HOW_TITLE, locale)}</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{tr(HOW_INTRO, locale)}</p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.h.en}>
              <Card className="h-full rounded-2xl">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{tr(s.h, locale)}</h3>
                <p className="mt-1 text-sm text-slate-600">{tr(s.body, locale)}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Safe & transparent */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(SAFE_TITLE, locale)}</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{tr(SAFE_INTRO, locale)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {SAFE_FEATURES.map((f) => (
            <Card key={f.h.en} className="h-full rounded-2xl">
              <h3 className="text-sm font-semibold text-brand">{tr(f.h, locale)}</h3>
              <p className="mt-1 text-sm text-slate-600">{tr(f.body, locale)}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Closing CTA row */}
      <section className="overflow-hidden rounded-3xl bg-brand-50 px-6 py-10 sm:px-10">
        <h2 className="text-2xl font-bold text-brand-700">{tr(CLOSING_TITLE, locale)}</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/contrato`}
            className="inline-flex items-center justify-center rounded-2xl bg-coral-600 px-6 py-3 font-semibold text-white shadow-card transition hover:bg-coral-700"
          >
            {tr(CTA_CONTRACT, locale)}
          </Link>
          <Link
            href={`/${locale}/verificar`}
            className="inline-flex items-center justify-center rounded-2xl border border-brand-200 bg-white px-6 py-3 font-semibold text-brand shadow-card transition hover:bg-brand-50"
          >
            {tr(CTA_VERIFY, locale)}
          </Link>
          <Link
            href={`/${locale}/imoveis?kind=PROPERTY_RENT`}
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-brand transition hover:underline"
          >
            {t(locale, 'common.viewAll')}
          </Link>
        </div>
      </section>
    </div>
  );
}
