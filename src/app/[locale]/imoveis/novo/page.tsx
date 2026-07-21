'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { uploadFile, publicUrl, fileExt } from '@/lib/storage';

const TXT = {
  title: { pt: 'Publicar anúncio', en: 'New listing', nl: 'Advertentie plaatsen' } as TL,
  intro: { pt: 'Crie um anúncio real de imóvel ou terreno. Fica guardado na sua conta.', en: 'Create a real property or land listing. It is saved to your account.', nl: 'Maak een echte advertentie voor vastgoed of grond. Wordt in je account opgeslagen.' } as TL,
  needBackend: { pt: 'Publicar anúncios reais requer a ligação à base de dados (Supabase). De momento a plataforma está em modo de demonstração.', en: 'Publishing real listings requires the database (Supabase) connection. The platform is currently in demo mode.', nl: 'Echte advertenties plaatsen vereist de databasekoppeling (Supabase). Het platform staat nu in demo-modus.' } as TL,
  needBusiness: { pt: 'Precisa de entrar com uma conta empresa/profissional para publicar.', en: 'You need a business/professional account to publish.', nl: 'Je hebt een zakelijk/professional-account nodig om te plaatsen.' } as TL,
  titlePt: { pt: 'Título (Português)', en: 'Title (Portuguese)', nl: 'Titel (Portugees)' } as TL,
  titleEn: { pt: 'Título (Inglês)', en: 'Title (English)', nl: 'Titel (Engels)' } as TL,
  titleNl: { pt: 'Título (Neerlandês)', en: 'Title (Dutch)', nl: 'Titel (Nederlands)' } as TL,
  desc: { pt: 'Descrição (Português)', en: 'Description (Portuguese)', nl: 'Omschrijving (Portugees)' } as TL,
  kind: { pt: 'Tipo', en: 'Type', nl: 'Type' } as TL,
  island: { pt: 'Ilha', en: 'Island', nl: 'Eiland' } as TL,
  municipality: { pt: 'Concelho', en: 'Municipality', nl: 'Gemeente' } as TL,
  price: { pt: 'Preço (CVE)', en: 'Price (CVE)', nl: 'Prijs (CVE)' } as TL,
  onRequest: { pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' } as TL,
  photos: { pt: 'Fotografias', en: 'Photos', nl: 'Foto’s' } as TL,
  photosHint: { pt: 'Adicione várias fotos — a primeira é a foto de capa. Diretamente do telemóvel ou galeria.', en: 'Add several photos — the first is the cover photo. Straight from your phone or gallery.', nl: 'Voeg meerdere foto’s toe — de eerste is de omslagfoto. Direct vanaf je telefoon of galerij.' } as TL,
  uploading: { pt: 'A carregar fotos…', en: 'Uploading photos…', nl: 'Foto’s uploaden…' } as TL,
  publish: { pt: 'Publicar imediatamente', en: 'Publish immediately', nl: 'Direct publiceren' } as TL,
  submit: { pt: 'Guardar anúncio', en: 'Save listing', nl: 'Advertentie opslaan' } as TL,
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

function slugify(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);
}

function Notice({ locale, children }: { locale: Locale; children: React.ReactNode }): JSX.Element {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {children}
      <div className="mt-3"><Link href={`/${locale}/imoveis`} className="font-semibold text-brand hover:underline">← {tr({ pt: 'Ver imóveis', en: 'Browse properties', nl: 'Vastgoed bekijken' }, locale)}</Link></div>
    </div>
  );
}

export default function NewListingPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();
  const [f, setF] = useState({ titlePt: '', titleEn: '', titleNl: '', desc: '', kind: 'PROPERTY_SALE', island: 'São Vicente', municipality: '', price: '', onRequest: false, thumb: '', publish: true });

  // Preselect kind from ?kind= (e.g. the "advertise a service" link).
  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('kind');
    if (k && KINDS.some((x) => x.v === k)) setF((s) => ({ ...s, kind: k }));
  }, []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  function onPickPhotos(list: FileList | null): void {
    const files = list ? Array.from(list).slice(0, 12) : [];
    setPhotos(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  if (!ready) return <div className="h-40" aria-hidden />;
  if (!configured) return <Notice locale={locale}>{tr(TXT.needBackend, locale)}</Notice>;
  if (!user || user.role === 'private') {
    return (
      <Notice locale={locale}>
        {tr(TXT.needBusiness, locale)}
        <div className="mt-2"><Link href={`/${locale}/registar`} className="font-semibold text-brand hover:underline">{t(locale, 'nav.register')}</Link></div>
      </Notice>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null); setBusy(true);
    const supabase = getBrowserSupabase();
    if (!supabase) { setBusy(false); return; }
    const { data: auth } = await supabase.auth.getUser();
    const owner = auth.user?.id;
    if (!owner) { setBusy(false); setError('not-authenticated'); return; }
    const title: TL = { pt: f.titlePt, en: f.titleEn || f.titlePt, nl: f.titleNl || f.titlePt };
    const description: TL = { pt: f.desc, en: f.desc, nl: f.desc };
    const slug = `${slugify(f.titlePt) || 'anuncio'}-${Date.now().toString(36)}`;
    const photoUrls: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      const up = await uploadFile('listing-photos', `${owner}/${slug}/${i}.${fileExt(photos[i].name)}`, photos[i]);
      if (up.error) { setBusy(false); setError(up.error); return; }
      if (up.path) photoUrls.push(publicUrl('listing-photos', up.path));
    }
    const { error: err } = await supabase.from('listings').insert({
      owner, slug, kind: f.kind, title, description,
      price_amount: f.onRequest || !f.price ? null : Math.round(Number(f.price)),
      price_on_request: f.onRequest, island: f.island, municipality: f.municipality || f.island,
      thumbnail: photoUrls[0] ?? null, photos: photoUrls, status: f.publish ? 'published' : 'draft',
      published_at: f.publish ? new Date().toISOString() : null,
    });
    setBusy(false);
    if (err) { setError(err.message); return; }
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
          <textarea rows={3} value={f.desc} onChange={(e) => upd('desc', e.target.value)} className={input} /></label>
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
        <div>
          <span className="text-sm text-slate-600">{tr(TXT.photos, locale)}</span>
          <input type="file" accept="image/*" multiple onChange={(e) => onPickPhotos(e.target.files)} className={`${input} cursor-pointer`} />
          <p className="mt-1 text-xs text-slate-400">{tr(TXT.photosHint, locale)}</p>
          {previews.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  {i === 0 && <span className="absolute left-1 top-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">1</span>}
                </div>
              ))}
            </div>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
          {tr(TXT.publish, locale)}</label>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? tr(TXT.uploading, locale) : tr(TXT.submit, locale)}</button>
      </form>
    </div>
  );
}
