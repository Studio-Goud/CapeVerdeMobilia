import { pageMetaFor as _pmf } from '@/lib/seo';
import { isLocale as _isLoc } from '@/i18n';
export function generateMetadata({ params }: { params: { locale: string } }) {
  return _pmf(_isLoc(params.locale) ? params.locale : 'pt', '/como-pagar');
}
import Link from 'next/link';
import { tr, type Locale, type TL } from '@/i18n';
import { PageTitle, Card, Pill, SectionHead } from '@/components/ui';
import { LOCAL_METHODS, FOREIGN_METHODS, payMethodReady, anyReady, type PayMethod } from '@/content/payments';

const COPY = {
  title: { pt: 'Como pagar', en: 'How to pay', nl: 'Hoe betaal je' },
  intro: {
    pt: 'A marketplace é gratuita. Só paga se quiser Destaque ou verificação. Aqui está como funciona, em três passos, e o método que lhe convém, seja em Cabo Verde ou no estrangeiro.',
    en: 'The marketplace is free. You only pay if you want Featured placement or verification. Here is how it works, in three steps, and the method that suits you, whether in Cabo Verde or abroad.',
    nl: 'De marktplaats is gratis. Je betaalt alleen als je Destaque of verificatie wilt. Hier is hoe het werkt, in drie stappen, en de methode die bij je past, in Kaapverdië of in het buitenland.',
  },
  stepsHead: { pt: 'Em três passos', en: 'In three steps', nl: 'In drie stappen' },
  steps: [
    {
      pt: 'No seu painel, peça Destaque num anúncio ou peça a verificação do seu negócio.',
      en: 'In your dashboard, request Featured on a listing or request verification of your business.',
      nl: 'Vraag in je dashboard Destaque aan bij een advertentie, of vraag verificatie van je bedrijf aan.',
    },
    {
      pt: 'Pague por um dos métodos abaixo e indique a sua referência (o nome do anúncio ou do negócio).',
      en: 'Pay by one of the methods below and quote your reference (the listing or business name).',
      nl: 'Betaal via een van de methoden hieronder en vermeld je referentie (de naam van de advertentie of het bedrijf).',
    },
    {
      pt: 'Confirmamos o pagamento e ativamos, normalmente dentro de 24 horas.',
      en: 'We confirm the payment and activate it, usually within 24 hours.',
      nl: 'We bevestigen de betaling en activeren het, meestal binnen 24 uur.',
    },
  ] as TL[],
  localHead: { pt: 'Para Cabo Verde', en: 'For Cabo Verde', nl: 'Voor Kaapverdië' },
  localSub: {
    pt: 'O mais fácil é Vinti4. A sua conta bancária não é necessária para começar.',
    en: 'The easiest is Vinti4. You do not need a bank account to start.',
    nl: 'Het makkelijkst is Vinti4. Een bankrekening is niet nodig om te beginnen.',
  },
  foreignHead: { pt: 'Para investidores e diáspora', en: 'For investors and diaspora', nl: 'Voor investeerders en diaspora' },
  foreignSub: {
    pt: 'Para quem não tem conta em Cabo Verde: pague em euros, por cartão ou PayPal.',
    en: 'For those without a Cabo Verde account: pay in euros, by card or PayPal.',
    nl: 'Voor wie geen Kaapverdiaanse rekening heeft: betaal in euro, per kaart of PayPal.',
  },
  soon: { pt: 'brevemente', en: 'coming soon', nl: 'binnenkort' },
  notReady: {
    pt: 'Estamos a finalizar os métodos de pagamento. Registe-se e avisamos assim que estiver ativo.',
    en: 'We are finalising the payment methods. Register and we will let you know as soon as it is live.',
    nl: 'We ronden de betaalmethoden af. Registreer je en we laten het weten zodra het live is.',
  },
  payLabel: { pt: 'Pagar', en: 'Pay', nl: 'Betalen' },
  registerCta: { pt: 'Registar', en: 'Register', nl: 'Registreren' },
  automationHead: { pt: 'Pagamento automático a seguir', en: 'Automatic payment next', nl: 'Automatisch betalen komt eraan' },
  automation: {
    pt: 'Assim que houver volume, ativamos o pagamento automático: Vinti4net e Pagali para Cabo Verde, cartão para o estrangeiro. Até lá, a confirmação é feita por uma pessoa, como a verificação.',
    en: 'As soon as there is volume, we switch on automatic payment: Vinti4net and Pagali for Cabo Verde, card for abroad. Until then, confirmation is done by a person, like verification.',
    nl: 'Zodra er volume is, zetten we automatisch betalen aan: Vinti4net en Pagali voor Kaapverdië, kaart voor het buitenland. Tot dan bevestigt een mens het, net als de verificatie.',
  },
  disclaimerTitle: { pt: 'Valores indicativos', en: 'Indicative figures', nl: 'Indicatieve bedragen' },
  disclaimer: {
    pt: 'Todos os preços em CVE são indicativos e ajustados ao poder de compra local. A base gratuita nunca muda.',
    en: 'All prices in CVE are indicative and adjusted to local purchasing power. The free base never changes.',
    nl: 'Alle prijzen in CVE zijn indicatief en aangepast aan de lokale koopkracht. De gratis basis verandert nooit.',
  },
  seePrices: { pt: 'Ver preços', en: 'See prices', nl: 'Bekijk prijzen' },
  seeAdvertise: { pt: 'O que é anunciar', en: 'What advertising is', nl: 'Wat adverteren is' },
} satisfies Record<string, unknown>;

function MethodCard({ m, locale }: { m: PayMethod; locale: Locale }): JSX.Element {
  const ready = payMethodReady(m);
  return (
    <Card className="rounded-2xl">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{tr(m.label, locale)}</h3>
        {!ready && <Pill tone="slate">{tr(COPY.soon as TL, locale)}</Pill>}
      </div>
      <p className="mt-1 text-sm text-slate-600">{tr(m.note, locale)}</p>
      {ready && m.value.trim() && (
        <p className="mt-3 select-all rounded-lg bg-sand-50 px-3 py-2 font-mono text-sm text-slate-800">{m.value}</p>
      )}
      {ready && m.href && m.href.trim() && (
        <a
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center rounded-xl bg-coral-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral-700"
        >
          {tr(COPY.payLabel as TL, locale)}
        </a>
      )}
    </Card>
  );
}

export default function HowToPayPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const { locale } = params;
  const localReady = anyReady(LOCAL_METHODS);
  const foreignReady = anyReady(FOREIGN_METHODS);

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle title={tr(COPY.title as TL, locale)} intro={tr(COPY.intro as TL, locale)} />

      {/* Three steps */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.stepsHead as TL, locale)} />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(COPY.steps as TL[]).map((s, i) => (
            <li key={i}>
              <Card className="h-full rounded-2xl">
                <div aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</div>
                <p className="mt-2 text-sm text-slate-600">{tr(s, locale)}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Local rail */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.localHead as TL, locale)} />
        <p className="mb-4 max-w-2xl text-sm text-slate-600">{tr(COPY.localSub as TL, locale)}</p>
        {localReady ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LOCAL_METHODS.map((m) => <MethodCard key={m.key} m={m} locale={locale} />)}
          </div>
        ) : (
          <Card className="rounded-2xl bg-sand-50">
            <p className="text-sm text-slate-700">{tr(COPY.notReady as TL, locale)}</p>
            <Link href={`/${locale}/registar`} className="mt-3 inline-flex items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
              {tr(COPY.registerCta as TL, locale)}
            </Link>
          </Card>
        )}
      </section>

      {/* Foreign rail */}
      <section className="mb-10">
        <SectionHead title={tr(COPY.foreignHead as TL, locale)} />
        <p className="mb-4 max-w-2xl text-sm text-slate-600">{tr(COPY.foreignSub as TL, locale)}</p>
        {foreignReady ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FOREIGN_METHODS.map((m) => <MethodCard key={m.key} m={m} locale={locale} />)}
          </div>
        ) : (
          <Card className="rounded-2xl bg-sand-50">
            <p className="text-sm text-slate-700">{tr(COPY.notReady as TL, locale)}</p>
            <Link href={`/${locale}/registar`} className="mt-3 inline-flex items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark">
              {tr(COPY.registerCta as TL, locale)}
            </Link>
          </Card>
        )}
      </section>

      {/* Automation note */}
      <section className="mb-10 rounded-2xl bg-brand-50 p-5 shadow-card sm:p-6">
        <h2 className="text-base font-bold text-brand sm:text-lg">{tr(COPY.automationHead as TL, locale)}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.automation as TL, locale)}</p>
      </section>

      {/* Indicative + cross-links */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-6">
        <div className="flex items-center gap-2">
          <Pill tone="amber">{tr(COPY.disclaimerTitle as TL, locale)}</Pill>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-700">{tr(COPY.disclaimer as TL, locale)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/${locale}/precos`} className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
            {tr(COPY.seePrices as TL, locale)}
          </Link>
          <Link href={`/${locale}/anunciar`} className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
            {tr(COPY.seeAdvertise as TL, locale)}
          </Link>
        </div>
      </section>
    </div>
  );
}
