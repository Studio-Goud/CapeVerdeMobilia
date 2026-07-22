'use client';

import { useCallback, useEffect, useState } from 'react';
import { t, tr, type Locale, type TL, verifLabel } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card, Pill } from '@/components/ui';
import { signedUrl } from '@/lib/storage';
import {
  fetchPendingVerifications,
  reviewVerification,
  fetchAllListingsForMod,
  setListingStatus,
  deleteListing,
  fetchBoostRequests,
  resolveBoost,
  fetchClaimRequests,
  resolveClaim,
  type AdminVerification,
  type AdminListing,
  type BoostRequestItem,
  type ClaimRequestItem,
} from '@/lib/browserData';

type Tab = 'verifications' | 'listings' | 'boosts' | 'claims';

// Verification level accepted by verifLabel — derived, so we avoid `any` and an extra import.
type VerifLevel = Parameters<typeof verifLabel>[1];

// --- Inline copy (PT / EN / NL) ---------------------------------------------
const L = {
  title: { pt: 'Consola de moderação', en: 'Moderation console', nl: 'Moderatieconsole' },
  intro: {
    pt: 'Área da equipa de confiança e operações: rever pedidos de verificação e moderar anúncios.',
    en: 'Trust & operations team area: review verification requests and moderate listings.',
    nl: 'Gebied voor het vertrouwens- en operationsteam: verificatieaanvragen beoordelen en advertenties modereren.',
  },
  notConfigured: {
    pt: 'A verificação e a moderação ficam disponíveis assim que a base de dados estiver ligada.',
    en: 'Verification and moderation become available once the database is connected.',
    nl: 'Verificatie en moderatie worden beschikbaar zodra de database is verbonden.',
  },
  adminsOnlyTitle: {
    pt: 'Área reservada à equipa de confiança e operações',
    en: 'Reserved for the trust & operations team',
    nl: 'Gereserveerd voor het vertrouwens- en operationsteam',
  },
  adminsOnlyBody: {
    pt: 'Esta secção é apenas para administradores. A sua conta não tem esse acesso.',
    en: 'This section is for admins only. Your account does not have that access.',
    nl: 'Deze sectie is alleen voor beheerders. Je account heeft die toegang niet.',
  },
  adminHint: {
    pt: 'Um perfil pode receber o papel de administrador no Supabase:',
    en: 'An admin role can be granted in Supabase:',
    nl: 'Een beheerdersrol kan worden toegekend in Supabase:',
  },
  tabVerifications: { pt: 'Verificações', en: 'Verifications', nl: 'Verificaties' },
  tabListings: { pt: 'Anúncios', en: 'Listings', nl: 'Advertenties' },
  tabBoosts: { pt: 'Destaques', en: 'Boosts', nl: 'Uitlichtingen' },
  noBoosts: { pt: 'Sem pedidos de destaque pendentes.', en: 'No pending boost requests.', nl: 'Geen openstaande uitlicht-aanvragen.' },
  boostHint: { pt: 'Aprovar coloca o anúncio em destaque (pagamento tratado à parte — ver PAYMENTS.md).', en: 'Approving features the listing (payment handled separately — see PAYMENTS.md).', nl: 'Goedkeuren licht de advertentie uit (betaling apart — zie PAYMENTS.md).' },
  tabClaims: { pt: 'Reclamações', en: 'Claims', nl: 'Claims' },
  noClaims: { pt: 'Sem pedidos de reclamação pendentes.', en: 'No pending claim requests.', nl: 'Geen openstaande claimverzoeken.' },
  claimHint: { pt: 'Verifique manualmente (ligue para o número do negócio) antes de aprovar. Aprovar atribui o perfil ao utilizador e encaminha os contactos guardados.', en: 'Verify manually (call the business number) before approving. Approving assigns the profile to the user and forwards stored leads.', nl: 'Controleer handmatig (bel het nummer van het bedrijf) vóór goedkeuring. Goedkeuren wijst het profiel toe aan de gebruiker en stuurt bewaarde leads door.' },
  claimProfile: { pt: 'Perfil', en: 'Profile', nl: 'Profiel' },
  claimVerifyPhone: { pt: 'Telefone para verificação', en: 'Verification phone', nl: 'Verificatietelefoon' },
  loading: { pt: 'A carregar…', en: 'Loading…', nl: 'Laden…' },
  noVerifications: {
    pt: 'Sem pedidos de verificação pendentes.',
    en: 'No pending verification requests.',
    nl: 'Geen openstaande verificatieaanvragen.',
  },
  noListings: { pt: 'Sem anúncios para moderar.', en: 'No listings to moderate.', nl: 'Geen advertenties om te modereren.' },
  user: { pt: 'Utilizador', en: 'User', nl: 'Gebruiker' },
  docType: { pt: 'Tipo de documento', en: 'Document type', nl: 'Documenttype' },
  level: { pt: 'Nível pedido', en: 'Level requested', nl: 'Aangevraagd niveau' },
  submitted: { pt: 'Enviado', en: 'Submitted', nl: 'Ingediend' },
  viewDocument: { pt: 'Ver documento', en: 'View document', nl: 'Document bekijken' },
  viewSelfie: { pt: 'Ver selfie', en: 'View selfie', nl: 'Selfie bekijken' },
  approve: { pt: 'Aprovar', en: 'Approve', nl: 'Goedkeuren' },
  reject: { pt: 'Rejeitar', en: 'Reject', nl: 'Afwijzen' },
  publish: { pt: 'Publicar', en: 'Publish', nl: 'Publiceren' },
  unpublish: { pt: 'Despublicar', en: 'Unpublish', nl: 'Depubliceren' },
  del: { pt: 'Eliminar', en: 'Delete', nl: 'Verwijderen' },
  confirmDelete: { pt: 'Eliminar este anúncio?', en: 'Delete this listing?', nl: 'Deze advertentie verwijderen?' },
  statusPublished: { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  statusDraft: { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  dash: { pt: '—', en: '—', nl: '—' },
} satisfies Record<string, TL>;

// --- Small button styles -----------------------------------------------------
const BTN_BASE = 'rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40';
const BTN_NEUTRAL = `${BTN_BASE} border-slate-300 text-slate-700 hover:bg-slate-50`;
const BTN_APPROVE = `${BTN_BASE} border-emerald-300 text-emerald-700 hover:bg-emerald-50`;
const BTN_DANGER = `${BTN_BASE} border-red-300 text-red-600 hover:bg-red-50`;

function formatDate(locale: Locale, iso: string): string {
  const loc = locale === 'nl' ? 'nl-NL' : locale === 'en' ? 'en-GB' : 'pt-PT';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(d);
}

export default function AdminPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { ready, user, configured } = useAuth();

  const [tab, setTab] = useState<Tab>('verifications');
  const [verifs, setVerifs] = useState<AdminVerification[] | null>(null);
  const [listings, setListings] = useState<AdminListing[] | null>(null);
  const [boosts, setBoosts] = useState<BoostRequestItem[] | null>(null);
  const [claims, setClaims] = useState<ClaimRequestItem[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const isAdmin = Boolean(user) && user?.role === 'admin';

  const loadVerifs = useCallback(async (): Promise<void> => {
    setVerifs(null);
    const rows = await fetchPendingVerifications();
    setVerifs(rows ?? []);
  }, []);

  const loadListings = useCallback(async (): Promise<void> => {
    setListings(null);
    const rows = await fetchAllListingsForMod();
    setListings(rows ?? []);
  }, []);

  const loadBoosts = useCallback(async (): Promise<void> => {
    setBoosts(null);
    const rows = await fetchBoostRequests();
    setBoosts(rows ?? []);
  }, []);

  const loadClaims = useCallback(async (): Promise<void> => {
    setClaims(null);
    const rows = await fetchClaimRequests();
    setClaims(rows ?? []);
  }, []);

  useEffect(() => {
    if (!ready || !configured || !isAdmin) return;
    if (tab === 'verifications') void loadVerifs();
    else if (tab === 'listings') void loadListings();
    else if (tab === 'claims') void loadClaims();
    else void loadBoosts();
  }, [ready, configured, isAdmin, tab, loadVerifs, loadListings, loadBoosts, loadClaims]);

  // --- Actions ---------------------------------------------------------------
  const openDoc = useCallback(async (path: string): Promise<void> => {
    const url = await signedUrl('verification-docs', path);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const decide = useCallback(
    async (req: AdminVerification, approve: boolean): Promise<void> => {
      setBusy(true); setActionError(null);
      const err = await reviewVerification(req.id, req.user_id, approve, req.level_requested);
      setBusy(false);
      if (err) { setActionError(err); return; }
      await loadVerifs();
    },
    [loadVerifs],
  );

  const changeStatus = useCallback(
    async (id: string, status: 'published' | 'draft'): Promise<void> => {
      setBusy(true); setActionError(null);
      const err = await setListingStatus(id, status);
      setBusy(false);
      if (err) { setActionError(err); return; }
      await loadListings();
    },
    [loadListings],
  );

  const removeListing = useCallback(
    async (id: string): Promise<void> => {
      if (!window.confirm(tr(L.confirmDelete, locale))) return;
      setBusy(true); setActionError(null);
      const err = await deleteListing(id);
      setBusy(false);
      if (err) { setActionError(err); return; }
      await loadListings();
    },
    [loadListings, locale],
  );

  const decideBoost = useCallback(
    async (req: BoostRequestItem, approve: boolean): Promise<void> => {
      setBusy(true); setActionError(null);
      const err = await resolveBoost(req.id, req.listing_id, approve);
      setBusy(false);
      if (err) { setActionError(err); return; }
      await loadBoosts();
    },
    [loadBoosts],
  );

  const decideClaim = useCallback(
    async (req: ClaimRequestItem, approve: boolean): Promise<void> => {
      setBusy(true); setActionError(null);
      const err = await resolveClaim(req.id, approve);
      setBusy(false);
      if (err) { setActionError(err); return; }
      await loadClaims();
    },
    [loadClaims],
  );

  // --- Guards ----------------------------------------------------------------
  if (!ready) return <div className="min-h-[40vh]" />;

  if (!configured) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <PageTitle title={tr(L.title, locale)} intro={tr(L.intro, locale)} />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {tr(L.notConfigured, locale)}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <PageTitle title={tr(L.title, locale)} intro={tr(L.intro, locale)} />
        <Card>
          <h2 className="text-base font-semibold text-slate-900">{tr(L.adminsOnlyTitle, locale)}</h2>
          <p className="mt-1 text-sm text-slate-600">{tr(L.adminsOnlyBody, locale)}</p>
          <p className="mt-3 text-xs text-slate-400">{tr(L.adminHint, locale)}</p>
          <code className="mt-1 block overflow-x-auto rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500">
            update public.profiles set role=&#39;admin&#39; where id=&#39;&lt;user-id&gt;&#39;
          </code>
        </Card>
      </div>
    );
  }

  // --- Console ---------------------------------------------------------------
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
      <PageTitle title={tr(L.title, locale)} intro={tr(L.intro, locale)} />

      <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-card">
        {tabBtn('verifications', tr(L.tabVerifications, locale))}
        {tabBtn('listings', tr(L.tabListings, locale))}
        {tabBtn('boosts', tr(L.tabBoosts, locale))}
        {tabBtn('claims', tr(L.tabClaims, locale))}
      </div>

      {actionError && (
        <div role="alert" className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          <span>{t(locale, 'dash.actionError')}</span>
          <button onClick={() => setActionError(null)} className="shrink-0 text-xs font-semibold text-red-600 hover:underline">{t(locale, 'common.close')}</button>
        </div>
      )}

      {tab === 'claims' ? (
        <section className="space-y-3">
          <p className="text-xs text-slate-400">{tr(L.claimHint, locale)}</p>
          {claims === null ? (
            <p className="text-sm text-slate-500">{tr(L.loading, locale)}</p>
          ) : claims.length === 0 ? (
            <Card><p className="text-sm text-slate-500">{tr(L.noClaims, locale)}</p></Card>
          ) : (
            claims.map((req) => (
              <Card key={req.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="brand">{req.profile_type}</Pill>
                      <span className="font-semibold text-slate-900">{req.profileName ?? req.profile_id.slice(0, 8)}</span>
                    </div>
                    {req.message && <p className="whitespace-pre-line text-slate-600">{req.message}</p>}
                    {req.contact_phone && (
                      <p className="text-xs text-slate-500">
                        {tr(L.claimVerifyPhone, locale)}:{' '}
                        <a href={`tel:${req.contact_phone}`} className="font-medium text-brand hover:underline">{req.contact_phone}</a>
                      </p>
                    )}
                    <p className="text-xs text-slate-400">
                      {tr(L.user, locale)}: <span className="font-mono">{req.requester.slice(0, 8)}…</span>
                      {' · '}{tr(L.submitted, locale)}: {formatDate(locale, req.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button type="button" disabled={busy} className={BTN_APPROVE} onClick={() => void decideClaim(req, true)}>{tr(L.approve, locale)}</button>
                    <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => void decideClaim(req, false)}>{tr(L.reject, locale)}</button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </section>
      ) : tab === 'boosts' ? (
        <section className="space-y-3">
          <p className="text-xs text-slate-400">{tr(L.boostHint, locale)}</p>
          {boosts === null ? (
            <p className="text-sm text-slate-500">{tr(L.loading, locale)}</p>
          ) : boosts.length === 0 ? (
            <Card><p className="text-sm text-slate-500">{tr(L.noBoosts, locale)}</p></Card>
          ) : (
            boosts.map((req) => (
              <Card key={req.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{req.listingTitle ? tr(req.listingTitle, locale) : req.listing_id.slice(0, 8)}</h3>
                    <p className="text-xs text-slate-400">{tr(L.submitted, locale)}: {formatDate(locale, req.created_at)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <button type="button" disabled={busy} className={BTN_APPROVE} onClick={() => void decideBoost(req, true)}>{tr(L.approve, locale)}</button>
                    <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => void decideBoost(req, false)}>{tr(L.reject, locale)}</button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </section>
      ) : tab === 'verifications' ? (
        <section className="space-y-3">
          {verifs === null ? (
            <p className="text-sm text-slate-500">{tr(L.loading, locale)}</p>
          ) : verifs.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-500">{tr(L.noVerifications, locale)}</p>
            </Card>
          ) : (
            verifs.map((req) => (
              <Card key={req.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1 text-sm">
                    <p className="font-mono text-xs text-slate-500">
                      {tr(L.user, locale)}: {req.user_id.slice(0, 8)}…
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="brand">{verifLabel(locale, req.level_requested as VerifLevel)}</Pill>
                      {req.doc_type && (
                        <span className="text-slate-600">
                          {tr(L.docType, locale)}: {req.doc_type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {tr(L.submitted, locale)}: {formatDate(locale, req.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {req.doc_path && (
                      <button type="button" className={BTN_NEUTRAL} onClick={() => void openDoc(req.doc_path as string)}>
                        {tr(L.viewDocument, locale)}
                      </button>
                    )}
                    {req.selfie_path && (
                      <button type="button" className={BTN_NEUTRAL} onClick={() => void openDoc(req.selfie_path as string)}>
                        {tr(L.viewSelfie, locale)}
                      </button>
                    )}
                    <button type="button" disabled={busy} className={BTN_APPROVE} onClick={() => void decide(req, true)}>
                      {tr(L.approve, locale)}
                    </button>
                    <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => void decide(req, false)}>
                      {tr(L.reject, locale)}
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </section>
      ) : (
        <section className="space-y-3">
          {listings === null ? (
            <p className="text-sm text-slate-500">{tr(L.loading, locale)}</p>
          ) : listings.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-500">{tr(L.noListings, locale)}</p>
            </Card>
          ) : (
            listings.map((item) => {
              const isPublished = item.status === 'published';
              return (
                <Card key={item.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Pill tone={isPublished ? 'emerald' : 'slate'}>
                          {isPublished ? tr(L.statusPublished, locale) : tr(L.statusDraft, locale)}
                        </Pill>
                        <span className="text-xs text-slate-400">{item.island ?? tr(L.dash, locale)}</span>
                      </div>
                      <h3 className="truncate text-sm font-semibold text-slate-900">{tr(item.title, locale)}</h3>
                      <p className="text-xs text-slate-400">{formatDate(locale, item.created_at)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {isPublished ? (
                        <button
                          type="button"
                          disabled={busy}
                          className={BTN_NEUTRAL}
                          onClick={() => void changeStatus(item.id, 'draft')}
                        >
                          {tr(L.unpublish, locale)}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={busy}
                          className={BTN_APPROVE}
                          onClick={() => void changeStatus(item.id, 'published')}
                        >
                          {tr(L.publish, locale)}
                        </button>
                      )}
                      <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => void removeListing(item.id)}>
                        {tr(L.del, locale)}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </section>
      )}
    </div>
  );
}
