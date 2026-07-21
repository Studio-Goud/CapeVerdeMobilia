'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { updateListing } from '@/lib/browserData';
import { uploadFile, publicUrl, fileExt } from '@/lib/storage';

const TXT = {
  title: { pt: 'Editar anúncio', en: 'Edit listing', nl: 'Advertentie bewerken' } as TL,
  intro: { pt: 'Atualize os dados do seu imóvel ou terreno. As alterações ficam guardadas na sua conta.', en: 'Update the details of your property or land. Changes are saved to your account.', nl: 'Werk de gegevens van je vastgoed of grond bij. Wijzigingen worden in je account opgeslagen.' } as TL,
  needBackend: { pt: 'A edição estará disponível quando a base de dados estiver ligada.', en: 'Editing will be available once the database is connected.', nl: 'Bewerken is beschikbaar zodra de database is gekoppeld.' } as TL,
  needLogin: { pt: 'Precisa de entrar na sua conta para editar este anúncio.', en: 'You need to log in to edit this listing.', nl: 'Je moet inloggen om deze advertentie te bewerken.' } as TL,
  loading: { pt: 'A carregar…', en: 'Loading…', nl: 'Laden…' } as TL,
  notFound: { pt: 'Anúncio não encontrado ou sem permissão para o editar.', en: 'Listing not found or you do not have permission to edit it.', nl: 'Advertentie niet gevonden of je hebt geen rechten om deze te bewerken.' } as TL,
  titlePt: { pt: 'Título (Português)', en: 'Title (Portuguese)', nl: 'Titel (Portugees)' } as TL,
  titleEn: { pt: 'Título (Inglês)', en: 'Title (English)', nl: 'Titel (Engels)' } as TL,
  titleNl: { pt: 'Título (Neerlandês)', en: 'Title (Dutch)', nl: 'Titel (Nederlands)' } as TL,
  desc: { pt: 'Descrição (Português)', en: 'Description (Portuguese)', nl: 'Omschrijving (Portugees)' } as TL,
  kind: { pt: 'Tipo', en: 'Type', nl: 'Type' } as TL,
  island: { pt: 'Ilha', en: 'Island', nl: 'Eiland' } as TL,
  municipality: { pt: 'Concelho', en: 'Municipality', nl: 'Gemeente' } as TL,
  price: { pt: 'Preço (CVE)', en: 'Price (CVE)', nl: 'Prijs (CVE)' } as TL,
  onRequest: { pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' } as TL,
  currentPhotos: { pt: 'Fotografias atuais', en: 'Current photos', nl: 'Huidige foto’s' } as TL,
  addPhotos: { pt: 'Adicionar mais fotos', en: 'Add more photos', nl: 'Meer foto’s toevoegen' } as TL,
  photosHint: { pt: 'As novas fotos são acrescentadas às atuais. A primeira foto é a de capa.', en: 'New photos are appended to the current ones. The first photo is the cover.', nl: 'Nieuwe foto’s worden aan de bestaande toegevoegd. De eerste foto is de omslag.' } as TL,
  publish: { pt: 'Publicado (visível para todos)', en: 'Published (visible to everyone)', nl: 'Gepubliceerd (zichtbaar voor iedereen)' } as TL,
  submit: { pt: 'Guardar alterações', en: 'Save changes', nl: 'Wijzigingen opslaan' } as TL,
  saving: { pt: 'A guardar…', en: 'Saving…', nl: 'Opslaan…' } as TL,
};

const KINDS: { v: string; l: TL }[] = [
  { v: 'PROPERTY_SALE', l: { pt: 'Venda', en: 'Sale', nl: 'Koop' } },
  { v: 'PROPERTY_RENT', l: { pt: 'Arrendamento', en: 'Rent', nl: 'Huur' } },
  { v: 'LAND', l: { pt: 'Terreno', en: 'Land', nl: 'Grond' } },
  { v: 'COMMERCIAL', l: { pt: 'Comercial', en: 'Commercial', nl: 'Commercieel' } },
  { v: 'NEW_DEVELOPMENT', l: { pt: 'Novo projeto', en: 'New development', nl: 'Nieuwbouw' } },
  { v: 'HOLIDAY_RENT', l: { pt: 'Férias', en: 'Holiday', nl: 'Vakantie' } },
  { v: 'SERVICE', l: { pt: 'Serviço', en: 'Service', nl: 'Dienst' } },
];
const ISLANDS = ['São Vicente', 'Santiago', 'Sal', 'Boa Vista', 'Santo Antão', 'Fogo', 'São Nicolau', 'Maio', 'Brava'];

interface ListingRow {
  id: string;
  slug: string;
  kind: string;
  title: Partial<TL> | null;
  description: Partial<TL> | null;
  price_amount: number | null;
  price_on_request: boolean;
  island: string | null;
  municipality: string | null;
  thumbnail: string | null;
  photos: string[] | null;
  status: string;
  owner: string | null;
}

function Notice({ locale, children }: { locale: Locale; children: React.ReactNode }): JSX.Element {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {children}
      <div className="mt-3"><Link href={`/${locale}/imoveis`} className="font-semibold text-brand hover:underline">← {tr({ pt: 'Ver imóveis', en: 'Browse properties', nl: 'Vastgoed bekijken' }, locale)}</Link></div>
    </div>
  );
}

export default function EditListingPage({ params }: { params: { locale: Locale; slug: string } }): JSX.Element {
  const locale = params.locale;
  const slug = params.slug;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<ListingRow | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [f, setF] = useState({ titlePt: '', titleEn: '', titleNl: '', descPt: '', kind: 'PROPERTY_SALE', island: 'São Vicente', municipality: '', price: '', onRequest: false, publish: true });

  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load(): Promise<void> {
      const supabase = getBrowserSupabase();
      if (!supabase) { if (active) setLoading(false); return; }
      const { data } = await supabase.from('listings').select('*').eq('slug', slug).maybeSingle();
      if (!active) return;
      const row = (data as ListingRow | null) ?? null;
      // Only the owner may edit. Published listings are world-readable, so a
      // non-owner could otherwise open the form and get a false "saved" (the
      // RLS-filtered UPDATE affects 0 rows and returns no error).
      const { data: auth } = await supabase.auth.getUser();
      if (!active) return;
      if (row && auth.user && row.owner && row.owner !== auth.user.id) {
        setLoading(false);
        return;
      }
      if (row) {
        setListing(row);
        setPhotos(Array.isArray(row.photos) ? row.photos : []);
        setThumbnail(row.thumbnail ?? null);
        setF({
          titlePt: row.title?.pt ?? '',
          titleEn: row.title?.en ?? '',
          titleNl: row.title?.nl ?? '',
          descPt: row.description?.pt ?? '',
          kind: row.kind || 'PROPERTY_SALE',
          island: row.island || 'São Vicente',
          municipality: row.municipality ?? '',
          price: String(row.price_amount ?? ''),
          onRequest: row.price_on_request,
          publish: row.status === 'published',
        });
      }
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [slug]);

  function onPickPhotos(list: FileList | null): void {
    const files = list ? Array.from(list).slice(0, 12) : [];
    setNewPhotos(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  if (!ready) return <div className="h-40" aria-hidden />;
  if (!configured) return <Notice locale={locale}>{tr(TXT.needBackend, locale)}</Notice>;
  if (!user) {
    return (
      <Notice locale={locale}>
        {tr(TXT.needLogin, locale)}
        <div className="mt-2"><Link href={`/${locale}/entrar`} className="font-semibold text-brand hover:underline">{t(locale, 'nav.login')}</Link></div>
      </Notice>
    );
  }
  if (loading) return <div className="mx-auto max-w-2xl py-10 text-center text-sm text-slate-500">{tr(TXT.loading, locale)}</div>;
  if (!listing) return <Notice locale={locale}>{tr(TXT.notFound, locale)}</Notice>;

  const current = listing;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setBusy(true);
    const owner = current.owner ?? 'unknown';
    const merged = [...photos];
    for (let i = 0; i < newPhotos.length; i++) {
      const file = newPhotos[i];
      const up = await uploadFile('listing-photos', `${owner}/${slug}/edit_${Date.now()}_${i}.${fileExt(file.name)}`, file);
      if (up.error) { setBusy(false); setError(up.error); return; }
      if (up.path) merged.push(publicUrl('listing-photos', up.path));
    }
    const title: TL = { pt: f.titlePt, en: f.titleEn || f.titlePt, nl: f.titleNl || f.titlePt };
    const description: TL = { pt: f.descPt, en: f.descPt, nl: f.descPt };
    const err = await updateListing(current.id, {
      title,
      description,
      kind: f.kind,
      island: f.island,
      municipality: f.municipality,
      price_amount: f.onRequest || !f.price ? null : Number(f.price),
      price_on_request: f.onRequest,
      photos: merged,
      thumbnail: merged[0] ?? thumbnail ?? null,
      status: f.publish ? 'published' : 'draft',
    });
    setBusy(false);
    if (err) { setError(err); return; }
    router.push(`/${locale}/imoveis/${slug}`);
  }

  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2';
  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">{tr(TXT.title, locale)}</h1>
      <p className="mt-1 text-sm text-slate-600">{tr(TXT.intro, locale)}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <label className="block text-sm"><span className="text-slate-600">{tr(TXT.titlePt, locale)}</span>
          <input required value={f.titlePt} onChange={(e) => upd('titlePt', e.target.value)} className={input} /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.titleEn, locale)}</span>
            <input value={f.titleEn} onChange={(e) => upd('titleEn', e.target.value)} className={input} /></label>
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.titleNl, locale)}</span>
            <input value={f.titleNl} onChange={(e) => upd('titleNl', e.target.value)} className={input} /></label>
        </div>
        <label className="block text-sm"><span className="text-slate-600">{tr(TXT.desc, locale)}</span>
          <textarea rows={3} value={f.descPt} onChange={(e) => upd('descPt', e.target.value)} className={input} /></label>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.kind, locale)}</span>
            <select value={f.kind} onChange={(e) => upd('kind', e.target.value)} className={input}>
              {KINDS.map((k) => <option key={k.v} value={k.v}>{tr(k.l, locale)}</option>)}</select></label>
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.island, locale)}</span>
            <select value={f.island} onChange={(e) => upd('island', e.target.value)} className={input}>
              {ISLANDS.map((i) => <option key={i} value={i}>{i}</option>)}</select></label>
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.municipality, locale)}</span>
            <input value={f.municipality} onChange={(e) => upd('municipality', e.target.value)} className={input} /></label>
        </div>
        <div className="grid items-end gap-3 sm:grid-cols-2">
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.price, locale)}</span>
            <input type="number" min="0" value={f.price} disabled={f.onRequest} onChange={(e) => upd('price', e.target.value)} className={`${input} disabled:bg-slate-100`} /></label>
          <label className="flex items-center gap-2 pb-2 text-sm text-slate-700">
            <input type="checkbox" checked={f.onRequest} onChange={(e) => upd('onRequest', e.target.checked)} />
            {tr(TXT.onRequest, locale)}</label>
        </div>
        {photos.length > 0 && (
          <div>
            <span className="text-sm text-slate-600">{tr(TXT.currentPhotos, locale)}</span>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {photos.map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  {i === 0 && <span className="absolute left-1 top-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">1</span>}
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <span className="text-sm text-slate-600">{tr(TXT.addPhotos, locale)}</span>
          <input type="file" accept="image/*" multiple onChange={(e) => onPickPhotos(e.target.files)} className={`${input} cursor-pointer`} />
          <p className="mt-1 text-xs text-slate-400">{tr(TXT.photosHint, locale)}</p>
          {previews.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
          {tr(TXT.publish, locale)}</label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? tr(TXT.saving, locale) : tr(TXT.submit, locale)}</button>
      </form>
    </div>
  );
}
