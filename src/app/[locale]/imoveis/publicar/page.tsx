'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { uploadFile, publicUrl, fileExt } from '@/lib/storage';
import { isNativeApp, takePhotoAsFile } from '@/lib/native';

const KINDS: { v: string; l: TL }[] = [
  { v: 'PROPERTY_SALE', l: { pt: 'Casa para venda', en: 'Home for sale', nl: 'Woning te koop' } },
  { v: 'PROPERTY_RENT', l: { pt: 'Casa para arrendar', en: 'Home for rent', nl: 'Woning te huur' } },
  { v: 'LAND', l: { pt: 'Terreno', en: 'Land', nl: 'Grond' } },
  { v: 'COMMERCIAL', l: { pt: 'Comercial', en: 'Commercial', nl: 'Commercieel' } },
  { v: 'NEW_DEVELOPMENT', l: { pt: 'Novo projeto', en: 'New development', nl: 'Nieuwbouw' } },
  { v: 'HOLIDAY_RENT', l: { pt: 'Arrendamento de férias', en: 'Holiday rental', nl: 'Vakantieverhuur' } },
  { v: 'SERVICE', l: { pt: 'Serviço', en: 'Service', nl: 'Dienst' } },
];

const ISLANDS = ['São Vicente', 'Santiago', 'Sal', 'Boa Vista', 'Santo Antão', 'Fogo', 'São Nicolau', 'Maio', 'Brava'];

const STEP_TITLES: TL[] = [
  { pt: 'O básico', en: 'The basics', nl: 'De basis' },
  { pt: 'Fotografias', en: 'Photos', nl: "Foto's" },
  { pt: 'Preço & publicar', en: 'Price & publish', nl: 'Prijs & plaatsen' },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function Notice({ locale, children }: { locale: Locale; children: React.ReactNode }): JSX.Element {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {children}
      <div className="mt-3">
        <Link href={`/${locale}/imoveis`} className="font-semibold text-brand hover:underline">
          ← {tr({ pt: 'Ver imóveis', en: 'Browse properties', nl: 'Vastgoed bekijken' }, locale)}
        </Link>
      </div>
    </div>
  );
}

function StepDots({ locale, step }: { locale: Locale; step: number }): JSX.Element {
  return (
    <ol className="mb-6 flex items-center gap-2">
      {STEP_TITLES.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <li key={i} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                active
                  ? 'bg-brand text-white'
                  : done
                    ? 'bg-brand/20 text-brand'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i + 1}
            </span>
            <span className={`hidden text-sm font-medium sm:inline ${active ? 'text-slate-900' : 'text-slate-400'}`}>
              {tr(label, locale)}
            </span>
            {i < STEP_TITLES.length - 1 && <span className={`h-px flex-1 ${done ? 'bg-brand/40' : 'bg-slate-200'}`} />}
          </li>
        );
      })}
    </ol>
  );
}

export default function PublishWizardPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    titlePt: '',
    titleEn: '',
    titleNl: '',
    desc: '',
    kind: 'PROPERTY_SALE',
    island: 'São Vicente',
    municipality: '',
    price: '',
    onRequest: false,
    publish: true,
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));

  // Preset the listing kind from ?kind= (e.g. the homepage "list for rent" CTA).
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('kind');
    if (preset && KINDS.some((k) => k.v === preset)) {
      setF((s) => ({ ...s, kind: preset }));
    }
  }, []);

  // Detect the native app after mount (avoids an SSR/client hydration mismatch).
  const [native, setNative] = useState(false);
  useEffect(() => { setNative(isNativeApp()); }, []);

  function refreshPreviews(files: File[]): void {
    previews.forEach((u) => URL.revokeObjectURL(u)); // avoid leaking old blob URLs
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  }
  function onPickPhotos(list: FileList | null): void {
    const files = list ? Array.from(list).slice(0, 12) : [];
    setPhotos(files);
    refreshPreviews(files);
  }

  // Native app only: append a photo taken with the device camera.
  async function addCameraPhoto(): Promise<void> {
    const file = await takePhotoAsFile();
    if (!file) return;
    const next = [...photos, file].slice(0, 12);
    setPhotos(next);
    refreshPreviews(next);
  }

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!configured) {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'Publicar estará disponível quando a base de dados estiver ligada.',
            en: 'Publishing will be available once the database is connected.',
            nl: 'Plaatsen wordt beschikbaar zodra de database is gekoppeld.',
          },
          locale,
        )}
      </Notice>
    );
  }

  if (!user || user.role === 'private') {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'Para publicar precisa de uma conta empresa/profissional. É rápido — pode sempre mudar mais tarde.',
            en: 'To publish you need a business/professional account. It is quick — you can always switch later.',
            nl: 'Om te plaatsen heb je een zakelijk/professional-account nodig. Het gaat snel — je kunt later altijd wisselen.',
          },
          locale,
        )}
        <div className="mt-2">
          <Link href={`/${locale}/registar`} className="font-semibold text-brand hover:underline">
            {t(locale, 'nav.register')}
          </Link>
        </div>
      </Notice>
    );
  }

  const titleValid = f.titlePt.trim().length > 0;
  const kindValid = KINDS.some((k) => k.v === f.kind);
  const canNext1 = titleValid && kindValid;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setBusy(false);
      setError('not-configured');
      return;
    }
    const { data: auth } = await supabase.auth.getUser();
    const owner = auth.user?.id;
    if (!owner) {
      setBusy(false);
      setError('not-authenticated');
      return;
    }
    const title: TL = { pt: f.titlePt, en: f.titleEn || f.titlePt, nl: f.titleNl || f.titlePt };
    const description: TL = { pt: f.desc, en: f.desc, nl: f.desc };
    const slug = `${slugify(f.titlePt) || 'anuncio'}-${Date.now().toString(36)}`;
    const photoUrls: string[] = [];
    const uploadedPaths: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      const up = await uploadFile('listing-photos', `${owner}/${slug}/${i}.${fileExt(photos[i].name)}`, photos[i]);
      if (up.error) {
        if (uploadedPaths.length) await supabase.storage.from('listing-photos').remove(uploadedPaths);
        setBusy(false);
        setError(up.error);
        return;
      }
      if (up.path) { uploadedPaths.push(up.path); photoUrls.push(publicUrl('listing-photos', up.path)); }
    }
    const { error: err } = await supabase.from('listings').insert({
      owner,
      slug,
      kind: f.kind,
      title,
      description,
      price_amount: f.onRequest || !f.price ? null : Math.round(Number(f.price)),
      price_on_request: f.onRequest,
      island: f.island,
      municipality: f.municipality || f.island,
      thumbnail: photoUrls[0] ?? null,
      photos: photoUrls,
      status: f.publish ? 'published' : 'draft',
      published_at: f.publish ? new Date().toISOString() : null,
    });
    setBusy(false);
    if (err) {
      if (uploadedPaths.length) await supabase.storage.from('listing-photos').remove(uploadedPaths);
      setError(err.message);
      return;
    }
    router.push(`/${locale}/imoveis/${slug}`);
  }

  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2';
  const primary = 'rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60';
  const secondary = 'rounded-lg border border-slate-200 px-4 py-2.5 font-semibold text-slate-700';
  const kindLabel = KINDS.find((k) => k.v === f.kind);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">
        {tr({ pt: 'Publicar a sua casa', en: 'Publish your home', nl: 'Plaats je woning' }, locale)}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        {tr(
          {
            pt: 'Três passos simples: o básico, fotos e o preço. Vamos a isso.',
            en: 'Three simple steps: the basics, photos and the price. Let’s go.',
            nl: 'Drie eenvoudige stappen: de basis, foto’s en de prijs. Aan de slag.',
          },
          locale,
        )}
      </p>

      <form onSubmit={onSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <StepDots locale={locale} step={step} />

        {step === 0 && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-slate-600">{tr({ pt: 'Tipo de anúncio', en: 'Listing type', nl: 'Soort advertentie' }, locale)}</span>
              <select value={f.kind} onChange={(e) => upd('kind', e.target.value)} className={input}>
                {KINDS.map((k) => (
                  <option key={k.v} value={k.v}>
                    {tr(k.l, locale)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-slate-600">{tr({ pt: 'Título (Português)', en: 'Title (Portuguese)', nl: 'Titel (Portugees)' }, locale)}</span>
              <input required value={f.titlePt} onChange={(e) => upd('titlePt', e.target.value)} className={input} />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-600">{tr({ pt: 'Título (Inglês) — opcional', en: 'Title (English) — optional', nl: 'Titel (Engels) — optioneel' }, locale)}</span>
                <input value={f.titleEn} onChange={(e) => upd('titleEn', e.target.value)} className={input} />
              </label>
              <label className="block text-sm">
                <span className="text-slate-600">{tr({ pt: 'Título (Neerlandês) — opcional', en: 'Title (Dutch) — optional', nl: 'Titel (Nederlands) — optioneel' }, locale)}</span>
                <input value={f.titleNl} onChange={(e) => upd('titleNl', e.target.value)} className={input} />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-600">{tr({ pt: 'Ilha', en: 'Island', nl: 'Eiland' }, locale)}</span>
                <select value={f.island} onChange={(e) => upd('island', e.target.value)} className={input}>
                  {ISLANDS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-slate-600">{tr({ pt: 'Concelho', en: 'Municipality', nl: 'Gemeente' }, locale)}</span>
                <input value={f.municipality} onChange={(e) => upd('municipality', e.target.value)} className={input} />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-slate-600">{tr({ pt: 'Descrição curta', en: 'Short description', nl: 'Korte omschrijving' }, locale)}</span>
              <textarea rows={3} value={f.desc} onChange={(e) => upd('desc', e.target.value)} className={input} />
            </label>
            <div className="flex justify-end">
              <button type="button" disabled={!canNext1} onClick={() => setStep(1)} className={primary}>
                {tr({ pt: 'Seguinte', en: 'Next', nl: 'Volgende' }, locale)} →
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-sm text-slate-600">{tr({ pt: 'Fotografias', en: 'Photos', nl: "Foto's" }, locale)}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onPickPhotos(e.target.files)}
                className={`${input} cursor-pointer`}
              />
              {native && (
                <button
                  type="button"
                  onClick={() => void addCameraPhoto()}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand px-3 py-2 text-sm font-semibold text-brand hover:bg-brand-50"
                >
                  📷 {tr({ pt: 'Tirar foto', en: 'Take photo', nl: 'Foto maken' }, locale)}
                </button>
              )}
              <p className="mt-1 text-xs text-slate-400">
                {tr(
                  {
                    pt: 'Adicione várias fotos — a primeira é a foto de capa.',
                    en: 'Add several photos — the first one is the cover photo.',
                    nl: 'Voeg meerdere foto’s toe — de eerste is de omslagfoto.',
                  },
                  locale,
                )}
              </p>
              {previews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {previews.map((src, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      {i === 0 && (
                        <span className="absolute left-1 top-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {tr({ pt: 'Capa', en: 'Cover', nl: 'Omslag' }, locale)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(0)} className={secondary}>
                ← {tr({ pt: 'Voltar', en: 'Back', nl: 'Terug' }, locale)}
              </button>
              <button type="button" onClick={() => setStep(2)} className={primary}>
                {tr({ pt: 'Seguinte', en: 'Next', nl: 'Volgende' }, locale)} →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid items-end gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-600">{tr({ pt: 'Preço (CVE)', en: 'Price (CVE)', nl: 'Prijs (CVE)' }, locale)}</span>
                <input
                  type="number"
                  min="0"
                  value={f.price}
                  disabled={f.onRequest}
                  onChange={(e) => upd('price', e.target.value)}
                  className={`${input} disabled:bg-slate-100`}
                />
              </label>
              <label className="flex items-center gap-2 pb-2 text-sm text-slate-700">
                <input type="checkbox" checked={f.onRequest} onChange={(e) => upd('onRequest', e.target.checked)} />
                {tr({ pt: 'Preço sob consulta', en: 'Price on request', nl: 'Prijs op aanvraag' }, locale)}
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
              {tr({ pt: 'Publicar imediatamente', en: 'Publish immediately', nl: 'Direct publiceren' }, locale)}
            </label>

            <div className="rounded-lg bg-slate-50 p-4 text-sm">
              <h2 className="mb-2 font-semibold text-slate-900">
                {tr({ pt: 'Revisão', en: 'Review', nl: 'Overzicht' }, locale)}
              </h2>
              <dl className="space-y-1 text-slate-600">
                <div className="flex justify-between gap-4">
                  <dt>{tr({ pt: 'Título', en: 'Title', nl: 'Titel' }, locale)}</dt>
                  <dd className="text-right font-medium text-slate-900">{f.titlePt || '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{tr({ pt: 'Tipo', en: 'Type', nl: 'Type' }, locale)}</dt>
                  <dd className="text-right font-medium text-slate-900">{kindLabel ? tr(kindLabel.l, locale) : '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{tr({ pt: 'Ilha', en: 'Island', nl: 'Eiland' }, locale)}</dt>
                  <dd className="text-right font-medium text-slate-900">{f.island}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{tr({ pt: 'Fotografias', en: 'Photos', nl: "Foto's" }, locale)}</dt>
                  <dd className="text-right font-medium text-slate-900">{photos.length}</dd>
                </div>
              </dl>
            </div>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className={secondary}>
                ← {tr({ pt: 'Voltar', en: 'Back', nl: 'Terug' }, locale)}
              </button>
              <button type="submit" disabled={busy} className={primary}>
                {busy
                  ? tr({ pt: 'A publicar…', en: 'Publishing…', nl: 'Publiceren…' }, locale)
                  : tr({ pt: 'Publicar', en: 'Publish', nl: 'Plaatsen' }, locale)}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
