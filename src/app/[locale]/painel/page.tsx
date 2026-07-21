'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { t, tr, formatEur, cveToEur, formatDate, LISTINGS, type Locale, type Listing, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import {
  fetchBusinessDashboard, fetchMyFavorites, fetchLeads, setListingStatus, deleteListing,
  fetchIncomingRentalRequests, fetchMyRentalRequests, setRentalRequestStatus, fetchMyBookings,
  fetchMyTenders, fetchMyProjects, setTenderStatus, deleteTender, setProjectVisibility, deleteProject,
  type BusinessDashboard, type LeadItem, type OwnedListing, type RentalRequestItem, type Booking,
  type MyTender, type MyProject,
} from '@/lib/browserData';
import { Card, Stat, Pill, TrustBadge } from '@/components/ui';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';

const EMPTY_LISTINGS: TL = { pt: 'Ainda não publicou anúncios.', en: 'You have not published any listings yet.', nl: 'Je hebt nog geen advertenties geplaatst.' };

export default function DashboardPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { ready, user, configured } = useAuth();
  const [biz, setBiz] = useState<BusinessDashboard | null>(null);
  const [leads, setLeads] = useState<LeadItem[] | null>(null);
  const [favs, setFavs] = useState<Listing[] | null>(null);
  const [rentals, setRentals] = useState<RentalRequestItem[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [myTenders, setMyTenders] = useState<MyTender[] | null>(null);
  const [myProjects, setMyProjects] = useState<MyProject[] | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const isBiz = !!user && (user.role === 'business' || user.role === 'admin');

  const reloadBiz = useCallback(async () => {
    const [b, l, r, bk, tn, pj] = await Promise.all([
      fetchBusinessDashboard(), fetchLeads(), fetchIncomingRentalRequests(), fetchMyBookings(),
      fetchMyTenders(), fetchMyProjects(),
    ]);
    setBiz(b); setLeads(l); setRentals(r); setBookings(bk); setMyTenders(tn); setMyProjects(pj);
  }, []);

  useEffect(() => {
    if (!configured || !user) return;
    if (isBiz) void reloadBiz();
    else { void fetchMyFavorites().then(setFavs); void fetchMyRentalRequests().then(setRentals); }
  }, [configured, user, isBiz, reloadBiz]);

  async function rentalAction(id: string, status: 'accepted' | 'declined'): Promise<void> {
    setActionError(null);
    const err = await setRentalRequestStatus(id, status);
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }
  const rrLabel = (s: string): string => t(locale, `rr.status.${s}` as 'rr.status.pending');

  async function withdrawRequest(id: string): Promise<void> {
    if (!window.confirm(t(locale, 'dash.confirmWithdraw'))) return;
    setActionError(null);
    const err = await setRentalRequestStatus(id, 'withdrawn');
    if (err) { setActionError(err); return; }
    setRentals(await fetchMyRentalRequests());
  }

  async function toggleTender(t2: MyTender): Promise<void> {
    setActionError(null);
    const err = await setTenderStatus(t2.id, t2.status === 'open' ? 'closed' : 'open');
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }
  async function removeTender(t2: MyTender): Promise<void> {
    if (!window.confirm(t(locale, 'dash.confirmDelete'))) return;
    setActionError(null);
    const err = await deleteTender(t2.id);
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }
  async function toggleProject(pj: MyProject): Promise<void> {
    setActionError(null);
    const err = await setProjectVisibility(pj.id, pj.visibility === 'published' ? 'draft' : 'published');
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }
  async function removeProject(pj: MyProject): Promise<void> {
    if (!window.confirm(t(locale, 'dash.confirmDelete'))) return;
    setActionError(null);
    const err = await deleteProject(pj.id);
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }

  async function togglePublish(l: OwnedListing): Promise<void> {
    setActionError(null);
    const err = await setListingStatus(l.id, l.status === 'published' ? 'draft' : 'published');
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }
  async function removeListing(l: OwnedListing): Promise<void> {
    if (!window.confirm(t(locale, 'dash.confirmDelete'))) return;
    setActionError(null);
    const err = await deleteListing(l.id);
    if (err) { setActionError(err); return; }
    await reloadBiz();
  }

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="text-slate-600">{t(locale, 'dash.needLogin')}</p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/${locale}/entrar`} className="rounded-lg bg-brand px-4 py-2 font-semibold text-white">{t(locale, 'nav.login')}</Link>
          <Link href={`/${locale}/registar`} className="rounded-lg bg-coral px-4 py-2 font-semibold text-white">{t(locale, 'nav.register')}</Link>
        </div>
      </div>
    );
  }

  const favListings = configured ? (favs ?? []) : LISTINGS.slice(0, 2);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-hero-ocean px-6 py-6 text-white">
        <div>
          <p className="text-sm text-white/80">{t(locale, isBiz ? 'dash.business' : 'dash.private')}</p>
          <h1 className="text-2xl font-bold">{t(locale, 'dash.hello')}, {user.name} 👋</h1>
        </div>
        {isBiz && (
          <div className="rounded-xl bg-white/10 px-4 py-2">
            <p className="text-xs text-white/70">{t(locale, 'dash.verification')}</p>
            <div className="mt-1"><TrustBadge level="L2_BUSINESS" locale={locale} /></div>
          </div>
        )}
      </header>

      {actionError && (
        <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          <span>{t(locale, 'dash.actionError')}</span>
          <button onClick={() => setActionError(null)} className="shrink-0 text-xs font-semibold text-red-600 hover:underline">{t(locale, 'common.close')}</button>
        </div>
      )}

      {isBiz ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={t(locale, 'dash.myListings')} value={configured ? (biz?.listings.length ?? '…') : '3'} />
            <Stat label={t(locale, 'dash.incomingLeads')} value={configured ? (biz?.leadsCount ?? '…') : '7'} />
            <Stat label={t(locale, 'dash.quotes')} value={configured ? '0' : '4'} />
            <Stat label={t(locale, 'dash.reviews')} value={configured ? '—' : '★ 4.6'} hint={configured ? undefined : '8'} />
          </div>

          {/* Directory profiles (professional + supplier) */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{t(locale, 'dash.proProfileTitle')}</h2>
                <p className="mt-0.5 text-sm text-slate-600">{t(locale, 'dash.proProfileBody')}</p>
              </div>
              <Link href={`/${locale}/profissionais/novo`} className="shrink-0 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-50">
                {t(locale, 'dash.proProfileCta')}
              </Link>
            </Card>
            <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{t(locale, 'dash.supplierTitle')}</h2>
                <p className="mt-0.5 text-sm text-slate-600">{t(locale, 'dash.supplierBody')}</p>
              </div>
              <Link href={`/${locale}/materiais/novo`} className="shrink-0 rounded-lg border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-50">
                {t(locale, 'dash.proProfileCta')}
              </Link>
            </Card>
          </div>

          {/* Listings management */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t(locale, 'dash.myListings')}</h2>
              <Link href={`/${locale}/imoveis/publicar`} className="text-sm font-medium text-brand hover:underline">{t(locale, 'dash.newListing')}</Link>
            </div>
            {!configured ? (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.empty')}</p></Card>
            ) : biz && biz.listings.length > 0 ? (
              <div className="space-y-2">
                {biz.listings.map((l) => (
                  <Card key={l.id} className="flex flex-wrap items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.thumbnail} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                    <Link href={`/${locale}/imoveis/${l.slug}`} className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 hover:text-brand">{tr(l.title, locale)}</Link>
                    <Pill tone={l.status === 'published' ? 'emerald' : 'slate'}>{t(locale, l.status === 'published' ? 'dash.statusPublished' : 'dash.statusDraft')}</Pill>
                    <Link href={`/${locale}/imoveis/${l.slug}/editar`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand">
                      {t(locale, 'dash.edit')}
                    </Link>
                    <button onClick={() => void togglePublish(l)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand hover:text-brand">
                      {t(locale, l.status === 'published' ? 'dash.unpublish' : 'dash.publish')}
                    </button>
                    <button onClick={() => void removeListing(l)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                      {t(locale, 'dash.delete')}
                    </button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{tr(EMPTY_LISTINGS, locale)}</p></Card>
            )}
          </section>

          {/* Leads inbox */}
          <section>
            <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.incomingLeads')}</h2>
            {!configured ? (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.empty')}</p></Card>
            ) : leads && leads.length > 0 ? (
              <div className="space-y-2">
                {leads.map((ld) => (
                  <Card key={ld.id}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{ld.name}</p>
                      <span className="text-xs text-slate-400">{formatDate(locale, ld.created_at)}</span>
                    </div>
                    {ld.listingTitle && <p className="text-xs text-slate-500">{t(locale, 'dash.on')} “{tr(ld.listingTitle, locale)}”</p>}
                    <p className="mt-1 text-sm text-slate-700">{ld.message}</p>
                    {(ld.email || ld.phone) && (
                      <p className="mt-2 text-xs text-slate-500">
                        {ld.email && <a href={`mailto:${ld.email}`} className="text-brand hover:underline">{ld.email}</a>}
                        {ld.email && ld.phone && ' · '}
                        {ld.phone && <a href={`tel:${ld.phone}`} className="text-brand hover:underline">{ld.phone}</a>}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.noLeads')}</p></Card>
            )}
          </section>

          {/* Incoming rental requests */}
          <section>
            <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.rentalRequests')}</h2>
            {rentals && rentals.length > 0 ? (
              <div className="space-y-2">
                {rentals.map((r) => (
                  <Card key={r.id}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{r.listingTitle ? tr(r.listingTitle, locale) : '—'}</p>
                      <Pill tone={r.status === 'accepted' ? 'emerald' : r.status === 'declined' || r.status === 'withdrawn' ? 'slate' : 'amber'}>{rrLabel(r.status)}</Pill>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{r.start_date ?? '—'} → {r.end_date ?? '—'}</p>
                    {r.message && <p className="mt-1 text-sm text-slate-700">{r.message}</p>}
                    {r.status === 'pending' && (
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => void rentalAction(r.id, 'accepted')} className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">{t(locale, 'dash.accept')}</button>
                        <button onClick={() => void rentalAction(r.id, 'declined')} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">{t(locale, 'dash.decline')}</button>
                      </div>
                    )}
                    {r.status === 'accepted' && (
                      <div className="mt-2"><Link href={`/${locale}/mensagens/${r.id}`} className="inline-block rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark">{t(locale, 'dash.message')}</Link></div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.noRentals')}</p></Card>
            )}
          </section>

          {bookings && bookings.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.availability')}</h2>
              <AvailabilityCalendar
                booked={bookings.map((b) => ({ start: b.start, end: b.end, label: b.listingTitle ? tr(b.listingTitle, locale) : undefined }))}
                locale={locale}
                months={2}
              />
            </section>
          )}

          {/* My tenders (concursos) */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t(locale, 'dash.myTenders')}</h2>
              <Link href={`/${locale}/concursos/novo`} className="text-sm font-medium text-brand hover:underline">{t(locale, 'dash.postTender')}</Link>
            </div>
            {myTenders && myTenders.length > 0 ? (
              <div className="space-y-2">
                {myTenders.map((tn) => (
                  <Card key={tn.id} className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      {tn.slug
                        ? <Link href={`/${locale}/concursos/${tn.slug}`} className="text-sm font-semibold text-slate-900 hover:text-brand">{tr(tn.title, locale)}</Link>
                        : <span className="text-sm font-semibold text-slate-900">{tr(tn.title, locale)}</span>}
                      <p className="mt-0.5 text-xs text-slate-500">{tn.bids_count} {t(locale, 'tend.bids')} · {t(locale, `tend.state.${tn.status}` as 'tend.state.open')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => void toggleTender(tn)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand">
                        {tn.status === 'open' ? t(locale, 'dash.close') : t(locale, 'dash.reopen')}
                      </button>
                      <button onClick={() => void removeTender(tn)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                        {t(locale, 'dash.delete')}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.noTenders')}</p></Card>
            )}
          </section>

          {/* My projects (projetos) */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t(locale, 'dash.myProjects')}</h2>
              <Link href={`/${locale}/projetos/novo`} className="text-sm font-medium text-brand hover:underline">{t(locale, 'dash.newProject')}</Link>
            </div>
            {myProjects && myProjects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {myProjects.map((pj) => (
                  <Card key={pj.id}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{tr(pj.name, locale)}</p>
                      <Pill tone={pj.status === 'DONE' ? 'emerald' : pj.status === 'IN_PROGRESS' ? 'brand' : 'amber'}>{t(locale, `proj.status.${pj.status}` as 'proj.status.PLANNING')}</Pill>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${pj.progress}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{pj.progress}% · {pj.visibility === 'published' ? t(locale, 'listing.published') : t(locale, 'dash.draft')}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => void toggleProject(pj)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand">
                        {pj.visibility === 'published' ? t(locale, 'dash.unpublish') : t(locale, 'dash.publish')}
                      </button>
                      <button onClick={() => void removeProject(pj)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                        {t(locale, 'dash.delete')}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.noProjects')}</p></Card>
            )}
          </section>

          <div className="flex flex-wrap gap-2">
            <Link href={`/${locale}/imoveis/publicar`} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'dash.newListing')}</Link>
            <Link href={`/${locale}/concursos`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.openTenders')}</Link>
            <Link href={`/${locale}/verificacao`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.raiseLevel')}</Link>
            <Link href={`/${locale}/admin`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'nav.admin')}</Link>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label={t(locale, 'dash.favorites')} value={configured ? favListings.length : '2'} />
            <Stat label={t(locale, 'dash.savedSearches')} value={configured ? '0' : '1'} />
            <Stat label={t(locale, 'dash.myRequests')} value={configured ? '0' : '1'} />
          </div>

          <section>
            <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.favorites')}</h2>
            {favListings.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {favListings.map((l) => (
                  <Link key={l.id} href={`/${locale}/imoveis/${l.slug}`} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:shadow-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.thumbnail} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                    <div><p className="line-clamp-2 text-sm font-medium text-slate-900">{tr(l.title, locale)}</p><p className="text-xs text-slate-500">{l.island}</p></div>
                  </Link>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.empty')}</p></Card>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold">{t(locale, 'dash.myRentalRequests')}</h2>
            {rentals && rentals.length > 0 ? (
              <div className="space-y-2">
                {rentals.map((r) => (
                  <Card key={r.id} className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{r.listingTitle ? tr(r.listingTitle, locale) : '—'}</p>
                      <p className="text-xs text-slate-500">{r.start_date ?? '—'} → {r.end_date ?? '—'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill tone={r.status === 'accepted' ? 'emerald' : r.status === 'declined' || r.status === 'withdrawn' ? 'slate' : 'amber'}>{rrLabel(r.status)}</Pill>
                      {r.status === 'accepted' && <Link href={`/${locale}/mensagens/${r.id}`} className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark">{t(locale, 'dash.message')}</Link>}
                      {r.status === 'pending' && <button onClick={() => void withdrawRequest(r.id)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">{t(locale, 'dash.withdraw')}</button>}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card><p className="text-sm text-slate-500">{t(locale, 'dash.noRentals')}</p></Card>
            )}
          </section>

          <div className="flex flex-wrap gap-2">
            <Link href={`/${locale}/imoveis`} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'dash.browseProps')}</Link>
            <Link href={`/${locale}/assistente`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'dash.startWizard')}</Link>
          </div>
        </>
      )}
    </div>
  );
}
