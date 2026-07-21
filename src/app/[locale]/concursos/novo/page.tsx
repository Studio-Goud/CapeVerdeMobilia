'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card } from '@/components/ui';
import { upsertTender, type TenderInput } from '@/lib/browserData';

const ISLANDS = ['São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];

// Reusable trilingual per-language labels / qualifiers.
const PT_LBL: TL = { pt: 'Português', en: 'Portuguese', nl: 'Portugees' };
const EN_LBL: TL = { pt: 'Inglês', en: 'English', nl: 'Engels' };
const NL_LBL: TL = { pt: 'Neerlandês', en: 'Dutch', nl: 'Nederlands' };
const REQUIRED: TL = { pt: 'obrigatório', en: 'required', nl: 'verplicht' };
const OPTIONAL: TL = { pt: 'opcional', en: 'optional', nl: 'optioneel' };

/** Compose "Base — qualifier" while staying trilingual. */
function ql(base: TL, qual: TL): TL {
  return { pt: `${base.pt} — ${qual.pt}`, en: `${base.en} — ${qual.en}`, nl: `${base.nl} — ${qual.nl}` };
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

function Notice({ locale, children }: { locale: Locale; children: ReactNode }): JSX.Element {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {children}
      <div className="mt-3">
        <Link href={`/${locale}/concursos`} className="font-semibold text-brand hover:underline">
          ← {tr({ pt: 'Ver concursos', en: 'Browse tenders', nl: 'Aanbestedingen bekijken' }, locale)}
        </Link>
      </div>
    </div>
  );
}

export default function TenderFormPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [f, setF] = useState({
    titlePt: '', titleEn: '', titleNl: '',
    descPt: '', descEn: '', descNl: '',
    island: '',
    kind: 'PRIVATE',
    budget: '',
    deadline: '',
    publish: true,
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const didLoad = useRef(false);

  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));

  // Create-only page: there is no per-tender fetch helper to prefill from, so we
  // just release the loading gate once auth has resolved. The didLoad ref keeps
  // this a one-shot, mirroring the sibling forms.
  useEffect(() => {
    if (didLoad.current || !ready) return;
    didLoad.current = true;
    setLoading(false);
  }, [ready]);

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!configured) {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'A publicação de concursos estará disponível quando a base de dados estiver ligada.',
            en: 'Posting tenders will be available once the live backend is connected.',
            nl: 'Aanbestedingen plaatsen wordt beschikbaar zodra de live-backend is gekoppeld.',
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
            pt: 'Inicie sessão para publicar um concurso.',
            en: 'Log in to post a tender.',
            nl: 'Log in om een aanbesteding te plaatsen.',
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

  const canSubmit = f.titlePt.trim().length > 0 && f.island.trim().length > 0 && !busy;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!f.titlePt.trim() || !f.island) return;
    setError(null);
    setBusy(true);

    const titlePt = f.titlePt.trim();
    const title: TL = { pt: titlePt, en: f.titleEn.trim() || titlePt, nl: f.titleNl.trim() || titlePt };
    const description: TL = { pt: f.descPt, en: f.descEn || f.descPt, nl: f.descNl || f.descPt };

    const budgetRaw = f.budget.trim();
    const budgetNum = budgetRaw === '' ? null : Math.round(Number(budgetRaw));
    const budget_cve = budgetNum != null && Number.isFinite(budgetNum) ? budgetNum : null;

    const slug = `${slugify(titlePt) || 'concurso'}-${Date.now().toString(36)}`;

    const payload: TenderInput = {
      slug,
      title,
      description,
      island: f.island,
      kind: f.kind === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
      budget_cve,
      deadline: f.deadline || null,
      status: f.publish ? 'open' : 'draft',
    };

    const res = await upsertTender(payload);
    setBusy(false);
    if (res === null) { router.push(`/${locale}/concursos`); return; }
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
        title={tr({ pt: 'Publicar concurso', en: 'Post a tender', nl: 'Aanbesteding plaatsen' }, locale)}
        intro={tr(
          {
            pt: 'Publique um pedido aberto e receba propostas de profissionais.',
            en: 'Post an open request and receive bids from professionals.',
            nl: 'Plaats een open aanvraag en ontvang inschrijvingen van professionals.',
          },
          locale,
        )}
      />

      <Card>
        <form onSubmit={onSubmit} className="space-y-5">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">
              {tr({ pt: 'Título', en: 'Title', nl: 'Titel' }, locale)}
            </legend>
            {field('titlePt', ql(PT_LBL, REQUIRED), { required: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('titleEn', ql(EN_LBL, OPTIONAL))}
              {field('titleNl', ql(NL_LBL, OPTIONAL))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">
              {tr({ pt: 'Descrição', en: 'Description', nl: 'Omschrijving' }, locale)}
            </legend>
            {field('descPt', ql(PT_LBL, OPTIONAL), { textarea: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('descEn', ql(EN_LBL, OPTIONAL), { textarea: true })}
              {field('descNl', ql(NL_LBL, OPTIONAL), { textarea: true })}
            </div>
          </fieldset>

          <label className="block text-sm">
            <span className="text-slate-600">{t(locale, 'common.island')} — {tr(REQUIRED, locale)}</span>
            <select value={f.island} onChange={(e) => upd('island', e.target.value)} className={input}>
              <option value="">{tr({ pt: 'Selecione a ilha', en: 'Select island', nl: 'Selecteer eiland' }, locale)}</option>
              {ISLANDS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="text-slate-600">{t(locale, 'common.type')}</span>
            <select value={f.kind} onChange={(e) => upd('kind', e.target.value)} className={input}>
              <option value="PRIVATE">{t(locale, 'tend.private')}</option>
              <option value="PUBLIC">{t(locale, 'tend.public')}</option>
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-slate-600">{t(locale, 'tend.budget')} — {tr(OPTIONAL, locale)}</span>
              <input
                type="number"
                min="0"
                value={f.budget}
                onChange={(e) => upd('budget', e.target.value)}
                className={input}
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-600">{t(locale, 'tend.deadline')} — {tr(OPTIONAL, locale)}</span>
              <input
                type="date"
                value={f.deadline}
                onChange={(e) => upd('deadline', e.target.value)}
                className={input}
              />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
            {tr({ pt: 'Publicar agora', en: 'Publish now', nl: 'Nu publiceren' }, locale)}
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={!canSubmit} className={primary}>
              {busy
                ? tr({ pt: 'A guardar…', en: 'Saving…', nl: 'Opslaan…' }, locale)
                : tr({ pt: 'Publicar concurso', en: 'Post tender', nl: 'Aanbesteding plaatsen' }, locale)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
