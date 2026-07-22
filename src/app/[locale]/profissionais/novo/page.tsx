'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card } from '@/components/ui';
import { fetchMyProfessional, upsertProfessional, type MyProfessional } from '@/lib/browserData';

const ISLANDS = ['São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'Fogo', 'Maio', 'Brava', 'São Nicolau'];

// Reusable trilingual field labels / qualifiers.
const L = {
  displayName: { pt: 'Nome a apresentar', en: 'Display name', nl: 'Weergavenaam' },
  headline: { pt: 'Título / lema', en: 'Headline / tagline', nl: 'Titel / slogan' },
  bio: { pt: 'Biografia', en: 'Bio', nl: 'Biografie' },
  category: { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  areas: { pt: 'Áreas de serviço', en: 'Service areas', nl: 'Werkgebieden' },
  price: { pt: 'Indicação de preço', en: 'Price indication', nl: 'Prijsindicatie' },
  phone: { pt: 'Telefone', en: 'Phone', nl: 'Telefoon' },
} satisfies Record<string, TL>;

const PT_LBL: TL = { pt: 'Português', en: 'Portuguese', nl: 'Portugees' };
const EN_LBL: TL = { pt: 'Inglês', en: 'English', nl: 'Engels' };
const NL_LBL: TL = { pt: 'Neerlandês', en: 'Dutch', nl: 'Nederlands' };
const REQUIRED: TL = { pt: 'obrigatório', en: 'required', nl: 'verplicht' };
const OPTIONAL: TL = { pt: 'opcional', en: 'optional', nl: 'optioneel' };
const RECOMMENDED: TL = { pt: 'recomendado', en: 'recommended', nl: 'aanbevolen' };

/** Compose "Base - qualifier" while staying trilingual. */
function ql(base: TL, qual: TL): TL {
  return { pt: `${base.pt} - ${qual.pt}`, en: `${base.en} - ${qual.en}`, nl: `${base.nl} - ${qual.nl}` };
}

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
        <Link href={`/${locale}/profissionais`} className="font-semibold text-brand hover:underline">
          ← {tr({ pt: 'Ver profissionais', en: 'Browse professionals', nl: 'Professionals bekijken' }, locale)}
        </Link>
      </div>
    </div>
  );
}

export default function ProfessionalFormPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [f, setF] = useState({
    display_name: '',
    headlinePt: '', headlineEn: '', headlineNl: '',
    bioPt: '', bioEn: '', bioNl: '',
    category: '',
    pricePt: '', priceEn: '', priceNl: '',
    phone: '',
    publish: true,
  });
  const [areas, setAreas] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loadedId, setLoadedId] = useState<string | undefined>(undefined);
  const [loadedSlug, setLoadedSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didLoad = useRef(false);

  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));
  const toggleArea = (a: string): void =>
    setAreas((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));

  // Prefill from the current user's existing profile (edit mode). Runs once,
  // once auth has resolved and we know there is a configured backend + user.
  useEffect(() => {
    if (didLoad.current || !ready) return;
    if (!configured || !user) { setLoading(false); return; }
    didLoad.current = true;
    let active = true;
    void fetchMyProfessional()
      .then((p) => {
        if (!active || !p) return;
        setLoadedId(p.id);
        setLoadedSlug(p.slug);
        setIsEdit(true);
        setAreas(p.service_areas);
        setF({
          display_name: p.display_name,
          headlinePt: p.headline.pt, headlineEn: p.headline.en, headlineNl: p.headline.nl,
          bioPt: p.bio.pt, bioEn: p.bio.en, bioNl: p.bio.nl,
          category: p.category,
          pricePt: p.price_indication?.pt ?? '', priceEn: p.price_indication?.en ?? '', priceNl: p.price_indication?.nl ?? '',
          phone: p.phone,
          publish: p.status === 'published',
        });
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [ready, configured, user]);

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!configured) {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'A gestão do perfil profissional estará disponível quando a base de dados estiver ligada.',
            en: 'Managing your professional profile will be available once the live backend is connected.',
            nl: 'Het beheren van je professionele profiel wordt beschikbaar zodra de live-backend is gekoppeld.',
          },
          locale,
        )}
      </Notice>
    );
  }

  if (!user) {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'Inicie sessão para criar ou editar o seu perfil profissional.',
            en: 'Log in to create or edit your professional profile.',
            nl: 'Log in om je professionele profiel aan te maken of te bewerken.',
          },
          locale,
        )}
        <div className="mt-2">
          <Link href={`/${locale}/entrar`} className="font-semibold text-brand hover:underline">
            {tr({ pt: 'Iniciar sessão', en: 'Log in', nl: 'Inloggen' }, locale)}
          </Link>
        </div>
      </Notice>
    );
  }

  if (loading) return <div className="h-40" aria-hidden />;

  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2';
  const primary = 'rounded-lg bg-brand px-4 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60';

  const field = (key: keyof typeof f, label: TL, opts?: { textarea?: boolean; required?: boolean }): JSX.Element => (
    <label className="block text-sm">
      <span className="text-slate-600">{tr(label, locale)}</span>
      {opts?.textarea ? (
        <textarea rows={3} value={f[key] as string} onChange={(e) => upd(key, e.target.value)} className={input} />
      ) : (
        <input required={opts?.required} value={f[key] as string} onChange={(e) => upd(key, e.target.value)} className={input} />
      )}
    </label>
  );

  const canSubmit = f.display_name.trim().length > 0 && f.headlinePt.trim().length > 0 && !busy;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!f.display_name.trim() || !f.headlinePt.trim()) return;
    setError(null);
    setBusy(true);

    const headline: TL = { pt: f.headlinePt, en: f.headlineEn || f.headlinePt, nl: f.headlineNl || f.headlinePt };
    const bio: TL = { pt: f.bioPt, en: f.bioEn || f.bioPt, nl: f.bioNl || f.bioPt };
    const hasPrice = Boolean(f.pricePt || f.priceEn || f.priceNl);
    const price_indication: TL | null = hasPrice
      ? { pt: f.pricePt, en: f.priceEn || f.pricePt, nl: f.priceNl || f.pricePt }
      : null;

    // Never regenerate the slug on edit - keep the fetched one so the public URL is stable.
    const slug = isEdit && loadedSlug
      ? loadedSlug
      : `${slugify(f.display_name) || 'profissional'}-${Date.now().toString(36)}`;

    const payload: MyProfessional = {
      id: loadedId,
      slug,
      display_name: f.display_name.trim(),
      headline,
      bio,
      category: f.category.trim(),
      service_areas: areas,
      price_indication,
      phone: f.phone.trim(),
      status: f.publish ? 'published' : 'draft',
    };

    const res = await upsertProfessional(payload);
    setBusy(false);
    // A published profile has a public detail page; a draft does not (the detail
    // route filters on status='published'), so send drafts back to the directory.
    if (res === null) { router.push(f.publish ? `/${locale}/profissionais/${slug}` : `/${locale}/profissionais`); return; }
    if (res === 'auth') {
      setError(tr({ pt: 'A sua sessão expirou. Inicie sessão novamente.', en: 'Your session expired. Please log in again.', nl: 'Je sessie is verlopen. Log opnieuw in.' }, locale));
      return;
    }
    if (res === 'demo') {
      setError(tr({ pt: 'Isto precisa da base de dados ativa.', en: 'This needs the live backend.', nl: 'Hiervoor is de live-backend nodig.' }, locale));
      return;
    }
    setError(res);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle
        title={tr(
          isEdit
            ? { pt: 'Editar perfil profissional', en: 'Edit professional profile', nl: 'Professioneel profiel bewerken' }
            : { pt: 'Criar perfil profissional', en: 'Create professional profile', nl: 'Professioneel profiel aanmaken' },
          locale,
        )}
        intro={tr(
          {
            pt: 'Faça a gestão da sua ficha no diretório de profissionais.',
            en: 'Manage your listing in the professionals directory.',
            nl: 'Beheer je vermelding in de professionalsgids.',
          },
          locale,
        )}
      />

      {user.role === 'private' && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {tr(
            {
              pt: 'Os perfis profissionais destinam-se a contas empresa/profissional. Pode continuar, mas considere mudar o tipo de conta.',
              en: 'Professional profiles are meant for business/professional accounts. You can continue, but consider switching your account type.',
              nl: 'Professionele profielen zijn bedoeld voor zakelijke/professional-accounts. Je kunt doorgaan, maar overweeg je accounttype te wijzigen.',
            },
            locale,
          )}
        </div>
      )}

      <Card>
        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block text-sm">
            <span className="text-slate-600">{tr(ql(L.displayName, REQUIRED), locale)}</span>
            <input required value={f.display_name} onChange={(e) => upd('display_name', e.target.value)} className={input} />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.headline, locale)}</legend>
            {field('headlinePt', ql(PT_LBL, REQUIRED), { required: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('headlineEn', ql(EN_LBL, OPTIONAL))}
              {field('headlineNl', ql(NL_LBL, OPTIONAL))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.bio, locale)}</legend>
            {field('bioPt', ql(PT_LBL, RECOMMENDED), { textarea: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('bioEn', ql(EN_LBL, OPTIONAL), { textarea: true })}
              {field('bioNl', ql(NL_LBL, OPTIONAL), { textarea: true })}
            </div>
          </fieldset>

          {field('category', ql(L.category, OPTIONAL))}

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">{tr(ql(L.areas, OPTIONAL), locale)}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ISLANDS.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={areas.includes(a)} onChange={() => toggleArea(a)} />
                  {a}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(ql(L.price, OPTIONAL), locale)}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {field('pricePt', PT_LBL)}
              {field('priceEn', EN_LBL)}
              {field('priceNl', NL_LBL)}
            </div>
          </fieldset>

          {field('phone', ql(L.phone, OPTIONAL))}

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
            {tr({ pt: 'Publicar agora', en: 'Publish now', nl: 'Nu publiceren' }, locale)}
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={!canSubmit} className={primary}>
              {busy
                ? tr({ pt: 'A guardar…', en: 'Saving…', nl: 'Opslaan…' }, locale)
                : isEdit
                  ? tr({ pt: 'Guardar alterações', en: 'Save changes', nl: 'Wijzigingen opslaan' }, locale)
                  : tr({ pt: 'Criar perfil', en: 'Create profile', nl: 'Profiel aanmaken' }, locale)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
