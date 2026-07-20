'use client';

import { useState } from 'react';
import { t, tr, type Locale } from '@/i18n';
import { PageTitle, Card, Pill, OfficialTag } from '@/components/ui';

// --- Localized string helper type (matches i18n TL shape) ---
type TL = { pt: string; en: string; nl: string };

// --- Page-specific labels (inline, fictional demo UI) ---
const L = {
  intro: {
    pt: 'Consola de demonstração de operações de confiança. Todas as ações são locais e não têm efeito real — nada é publicado nem alterado em sistemas oficiais.',
    en: 'Demo trust-operations console. All actions are local and have no real effect — nothing is published or changed in official systems.',
    nl: 'Demo-console voor vertrouwensoperaties. Alle acties zijn lokaal en hebben geen echt effect — er wordt niets gepubliceerd of gewijzigd in officiële systemen.',
  },
  tabModeration: { pt: 'Fila de moderação', en: 'Moderation queue', nl: 'Moderatiewachtrij' },
  tabPublications: { pt: 'Publicações oficiais (editor)', en: 'Official publications (editor)', nl: 'Officiële publicaties (editor)' },
  pending: { pt: 'Pendente', en: 'Pending', nl: 'In behandeling' },
  approved: { pt: 'Aprovado', en: 'Approved', nl: 'Goedgekeurd' },
  rejected: { pt: 'Rejeitado', en: 'Rejected', nl: 'Afgewezen' },
  approve: { pt: 'Aprovar', en: 'Approve', nl: 'Goedkeuren' },
  reject: { pt: 'Rejeitar', en: 'Reject', nl: 'Afwijzen' },
  publish: { pt: 'Publicar', en: 'Publish', nl: 'Publiceren' },
  draft: { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  published: { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  pendingCount: { pt: 'itens pendentes', en: 'pending items', nl: 'items in behandeling' },
  reason: { pt: 'Motivo', en: 'Reason', nl: 'Reden' },
  authority: { pt: 'Entidade responsável', en: 'Responsible authority', nl: 'Verantwoordelijke instantie' },
  typeListing: { pt: 'Anúncio', en: 'Listing', nl: 'Advertentie' },
  typeVerification: { pt: 'Verificação', en: 'Verification', nl: 'Verificatie' },
  typeReview: { pt: 'Avaliação denunciada', en: 'Reported review', nl: 'Gerapporteerde review' },
  publishedNote: {
    pt: 'Apresentado com estilo oficial nesta demonstração.',
    en: 'Shown with official styling in this demo.',
    nl: 'Weergegeven met officiële stijl in deze demo.',
  },
  draftNote: {
    pt: 'Ainda em rascunho — não confirmado oficialmente.',
    en: 'Still a draft — not officially confirmed.',
    nl: 'Nog een concept — niet officieel bevestigd.',
  },
} satisfies Record<string, TL>;

// --- Moderation queue types & data ---
type ModerationType = 'listing' | 'verification' | 'review';
type ModerationStatus = 'pending' | 'approved' | 'rejected';

interface ModerationItem {
  id: string;
  type: ModerationType;
  title: TL;
  reason: TL;
  status: ModerationStatus;
}

const INITIAL_MODERATION: ModerationItem[] = [
  {
    id: 'm1',
    type: 'listing',
    title: { pt: 'Villa com vista mar — Monte Sossego, Mindelo', en: 'Sea-view villa — Monte Sossego, Mindelo', nl: 'Villa met zeezicht — Monte Sossego, Mindelo' },
    reason: { pt: 'Novo anúncio a aguardar revisão de fotos e preço.', en: 'New listing awaiting photo and price review.', nl: 'Nieuwe advertentie wacht op controle van foto’s en prijs.' },
    status: 'pending',
  },
  {
    id: 'm2',
    type: 'verification',
    title: { pt: 'Construções Djar — pedido de nível “Documentos verificados”', en: 'Construções Djar — request for “Documents verified” level', nl: 'Construções Djar — aanvraag niveau “Documenten geverifieerd”' },
    reason: { pt: 'Documentos de empresa carregados; requer controlo humano.', en: 'Business documents uploaded; requires human check.', nl: 'Bedrijfsdocumenten geüpload; vereist menselijke controle.' },
    status: 'pending',
  },
  {
    id: 'm3',
    type: 'listing',
    title: { pt: 'Terreno para construção 600 m² — Monte Sossego', en: 'Building land 600 m² — Monte Sossego', nl: 'Bouwgrond 600 m² — Monte Sossego' },
    reason: { pt: 'Zonamento declarado pelo vendedor a confirmar.', en: 'Seller-declared zoning to be confirmed.', nl: 'Door verkoper opgegeven bestemming te bevestigen.' },
    status: 'pending',
  },
  {
    id: 'm4',
    type: 'review',
    title: { pt: 'Avaliação denunciada sobre “Elétrica Mindelo”', en: 'Reported review about “Elétrica Mindelo”', nl: 'Gerapporteerde review over “Elétrica Mindelo”' },
    reason: { pt: 'Denunciada como possivelmente falsa; sem prova de transação.', en: 'Reported as possibly fake; no proof of transaction.', nl: 'Gerapporteerd als mogelijk nep; geen bewijs van transactie.' },
    status: 'pending',
  },
];

const MODERATION_TYPE_LABEL: Record<ModerationType, TL> = {
  listing: L.typeListing,
  verification: L.typeVerification,
  review: L.typeReview,
};

// --- Publications types & data ---
type PublicationStatus = 'draft' | 'published';

interface AdminPublication {
  id: string;
  title: TL;
  authority: string;
  version: number;
  status: PublicationStatus;
}

const INITIAL_PUBLICATIONS: AdminPublication[] = [
  {
    id: 'pub1',
    title: { pt: 'Requisitos da licença de construção — São Vicente (demo)', en: 'Building permit requirements — São Vicente (demo)', nl: 'Vereisten bouwvergunning — São Vicente (demo)' },
    authority: 'Câmara Municipal de São Vicente (demo)',
    version: 1,
    status: 'draft',
  },
  {
    id: 'pub2',
    title: { pt: 'Reforma fiscal imobiliária 2026: cITI e cIPI (demo)', en: '2026 real-estate tax reform: cITI and cIPI (demo)', nl: 'Vastgoedbelastinghervorming 2026: cITI en cIPI (demo)' },
    authority: 'Portal informativo Djarvista (demo)',
    version: 2,
    status: 'published',
  },
  {
    id: 'pub3',
    title: { pt: 'Guia “Empresa no Dia” — passos de registo (demo)', en: '“Empresa no Dia” guide — registration steps (demo)', nl: 'Gids “Empresa no Dia” — registratiestappen (demo)' },
    authority: 'Casa do Cidadão (demo)',
    version: 1,
    status: 'draft',
  },
];

type Tab = 'moderation' | 'publications';

export default function AdminPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const [tab, setTab] = useState<Tab>('moderation');
  const [items, setItems] = useState<ModerationItem[]>(INITIAL_MODERATION);
  const [publications, setPublications] = useState<AdminPublication[]>(INITIAL_PUBLICATIONS);

  const setStatus = (id: string, status: ModerationStatus): void => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  const publishItem = (id: string): void => {
    setPublications((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'published' } : p)));
  };

  const pendingCount = items.filter((it) => it.status === 'pending').length;

  const tabBtn = (value: Tab, label: string): JSX.Element => (
    <button
      type="button"
      onClick={() => setTab(value)}
      className={
        'rounded-lg px-4 py-2 text-sm font-semibold transition ' +
        (tab === value ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100')
      }
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageTitle title={t(locale, 'nav.admin')} intro={tr(L.intro, locale)} />

      <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-card">
        {tabBtn('moderation', tr(L.tabModeration, locale))}
        {tabBtn('publications', tr(L.tabPublications, locale))}
      </div>

      {tab === 'moderation' ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">{tr(L.tabModeration, locale)}</h2>
            <Pill tone={pendingCount > 0 ? 'amber' : 'emerald'}>
              {pendingCount} {tr(L.pendingCount, locale)}
            </Pill>
          </div>

          <p className="text-xs text-slate-400">{t(locale, 'common.demoAction')}</p>

          <ul className="space-y-3">
            {items.map((it) => {
              const decided = it.status !== 'pending';
              const statusTone = it.status === 'approved' ? 'emerald' : it.status === 'rejected' ? 'coral' : 'slate';
              const statusLabel = it.status === 'approved' ? tr(L.approved, locale) : it.status === 'rejected' ? tr(L.rejected, locale) : tr(L.pending, locale);
              return (
                <li key={it.id}>
                  <Card
                    className={
                      it.status === 'approved'
                        ? 'border-emerald-300 bg-emerald-50'
                        : it.status === 'rejected'
                          ? 'border-red-300 bg-red-50'
                          : undefined
                    }
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <Pill tone="brand">{tr(MODERATION_TYPE_LABEL[it.type], locale)}</Pill>
                          <Pill tone={statusTone}>{statusLabel}</Pill>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900">{tr(it.title, locale)}</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          <span className="font-medium text-slate-500">{tr(L.reason, locale)}: </span>
                          {tr(it.reason, locale)}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => setStatus(it.id, 'approved')}
                          disabled={it.status === 'approved'}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40"
                        >
                          {tr(L.approve, locale)}
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus(it.id, 'rejected')}
                          disabled={it.status === 'rejected'}
                          className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-40"
                        >
                          {tr(L.reject, locale)}
                        </button>
                      </div>
                    </div>
                    {decided && (
                      <p className="mt-3 border-t border-slate-200/70 pt-2 text-xs text-slate-400">
                        {t(locale, 'common.demoAction')}
                      </p>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">{tr(L.tabPublications, locale)}</h2>
          <p className="text-xs text-slate-400">{t(locale, 'common.demoAction')}</p>

          <ul className="space-y-3">
            {publications.map((p) => {
              const isPublished = p.status === 'published';
              return (
                <li key={p.id}>
                  <Card
                    className={
                      isPublished ? 'border-emerald-300 bg-emerald-50/60' : 'border-amber-200 bg-amber-50/50'
                    }
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <OfficialTag variant={isPublished ? 'official' : 'unconfirmed'} locale={locale} />
                          <Pill tone={isPublished ? 'emerald' : 'amber'}>
                            {isPublished ? tr(L.published, locale) : tr(L.draft, locale)}
                          </Pill>
                        </div>
                        <h3 className={'text-sm font-semibold ' + (isPublished ? 'text-emerald-900' : 'text-slate-900')}>
                          {tr(p.title, locale)}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {tr(L.authority, locale)}: {p.authority}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t(locale, 'info.version')} {p.version}
                        </p>
                        <p className={'mt-1 text-xs ' + (isPublished ? 'text-emerald-700' : 'text-amber-700')}>
                          {isPublished ? tr(L.publishedNote, locale) : tr(L.draftNote, locale)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-start">
                        <button
                          type="button"
                          onClick={() => publishItem(p.id)}
                          disabled={isPublished}
                          className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
                        >
                          {tr(L.publish, locale)}
                        </button>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
