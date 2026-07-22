'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card } from '@/components/ui';
import { fetchMySupplier, upsertSupplier, type MySupplier } from '@/lib/browserData';

const ISLANDS = ['São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];

// Reusable trilingual field labels / qualifiers.
const L = {
  name: { pt: 'Nome da empresa', en: 'Business name', nl: 'Bedrijfsnaam' },
  category: { pt: 'Categoria', en: 'Category', nl: 'Categorie' },
  island: { pt: 'Ilha', en: 'Island', nl: 'Eiland' },
  description: { pt: 'Descrição', en: 'Description', nl: 'Beschrijving' },
  price: { pt: 'Preço desde', en: 'Price from', nl: 'Prijs vanaf' },
  phone: { pt: 'Telefone (WhatsApp)', en: 'Phone (WhatsApp)', nl: 'Telefoon (WhatsApp)' },
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
        <Link href={`/${locale}/materiais`} className="font-semibold text-brand hover:underline">
          ← {tr({ pt: 'Ver materiais', en: 'Browse materials', nl: 'Materialen bekijken' }, locale)}
        </Link>
      </div>
    </div>
  );
}

export default function SupplierFormPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [f, setF] = useState({
    name: '',
    categoryPt: '', categoryEn: '', categoryNl: '',
    island: '',
    descPt: '', descEn: '', descNl: '',
    pricePt: '', priceEn: '', priceNl: '',
    phone: '',
    publish: true,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loadedId, setLoadedId] = useState<string | undefined>(undefined);
  const [loadedSlug, setLoadedSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didLoad = useRef(false);

  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));

  // Prefill from the current user's existing supplier profile (edit mode). Runs
  // once, once auth has resolved and we know there is a configured backend + user.
  useEffect(() => {
    if (didLoad.current || !ready) return;
    if (!configured || !user) { setLoading(false); return; }
    didLoad.current = true;
    let active = true;
    void fetchMySupplier()
      .then((p) => {
        if (!active || !p) return;
        setLoadedId(p.id);
        setLoadedSlug(p.slug);
        setIsEdit(true);
        setF({
          name: p.name,
          categoryPt: p.category.pt, categoryEn: p.category.en, categoryNl: p.category.nl,
          island: p.island,
          descPt: p.description.pt, descEn: p.description.en, descNl: p.description.nl,
          pricePt: p.price_from?.pt ?? '', priceEn: p.price_from?.en ?? '', priceNl: p.price_from?.nl ?? '',
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
            pt: 'A gestão do perfil de fornecedor estará disponível quando a base de dados estiver ligada.',
            en: 'Managing your supplier profile will be available once the live backend is connected.',
            nl: 'Het beheren van je leveranciersprofiel wordt beschikbaar zodra de live-backend is gekoppeld.',
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
            pt: 'Inicie sessão para criar ou editar o seu perfil de fornecedor.',
            en: 'Log in to create or edit your supplier profile.',
            nl: 'Log in om je leveranciersprofiel aan te maken of te bewerken.',
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

  const canSubmit = f.name.trim().length > 0 && f.categoryPt.trim().length > 0 && !busy;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!f.name.trim() || !f.categoryPt.trim()) return;
    setError(null);
    setBusy(true);

    const category: TL = { pt: f.categoryPt, en: f.categoryEn || f.categoryPt, nl: f.categoryNl || f.categoryPt };
    const description: TL = { pt: f.descPt, en: f.descEn || f.descPt, nl: f.descNl || f.descPt };
    const hasPrice = Boolean(f.pricePt || f.priceEn || f.priceNl);
    const price_from: TL | null = hasPrice
      ? { pt: f.pricePt, en: f.priceEn || f.pricePt, nl: f.priceNl || f.pricePt }
      : null;

    // Never regenerate the slug on edit - keep the fetched one so the public URL is stable.
    const slug = isEdit && loadedSlug
      ? loadedSlug
      : `${slugify(f.name) || 'fornecedor'}-${Date.now().toString(36)}`;

    const payload: MySupplier = {
      id: loadedId,
      slug,
      name: f.name.trim(),
      category,
      island: f.island,
      description,
      price_from,
      phone: f.phone.trim(),
      status: f.publish ? 'published' : 'draft',
    };

    const res = await upsertSupplier(payload);
    setBusy(false);
    if (res === null) { router.push(`/${locale}/materiais`); return; }
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
            ? { pt: 'Editar perfil de fornecedor', en: 'Edit supplier profile', nl: 'Leveranciersprofiel bewerken' }
            : { pt: 'Criar perfil de fornecedor', en: 'Create supplier profile', nl: 'Leveranciersprofiel aanmaken' },
          locale,
        )}
        intro={tr(
          {
            pt: 'Faça a gestão da sua ficha no diretório de materiais de construção.',
            en: 'Manage your listing in the building-materials directory.',
            nl: 'Beheer je vermelding in de bouwmaterialengids.',
          },
          locale,
        )}
      />

      {user.role === 'private' && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {tr(
            {
              pt: 'Os perfis de fornecedor destinam-se a contas empresa. Pode continuar, mas considere mudar o tipo de conta.',
              en: 'Supplier profiles are meant for business accounts. You can continue, but consider switching your account type.',
              nl: 'Leveranciersprofielen zijn bedoeld voor zakelijke accounts. Je kunt doorgaan, maar overweeg je accounttype te wijzigen.',
            },
            locale,
          )}
        </div>
      )}

      <Card>
        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block text-sm">
            <span className="text-slate-600">{tr(ql(L.name, REQUIRED), locale)}</span>
            <input required value={f.name} onChange={(e) => upd('name', e.target.value)} className={input} />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.category, locale)}</legend>
            {field('categoryPt', ql(PT_LBL, REQUIRED), { required: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('categoryEn', ql(EN_LBL, OPTIONAL))}
              {field('categoryNl', ql(NL_LBL, OPTIONAL))}
            </div>
          </fieldset>

          <label className="block text-sm">
            <span className="text-slate-600">{tr(ql(L.island, OPTIONAL), locale)}</span>
            <select value={f.island} onChange={(e) => upd('island', e.target.value)} className={input}>
              <option value="">{tr({ pt: 'Selecione a ilha', en: 'Select island', nl: 'Selecteer eiland' }, locale)}</option>
              {ISLANDS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.description, locale)}</legend>
            {field('descPt', ql(PT_LBL, RECOMMENDED), { textarea: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('descEn', ql(EN_LBL, OPTIONAL), { textarea: true })}
              {field('descNl', ql(NL_LBL, OPTIONAL), { textarea: true })}
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
