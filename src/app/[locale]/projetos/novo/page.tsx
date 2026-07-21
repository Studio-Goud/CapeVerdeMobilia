'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card } from '@/components/ui';
import { upsertProject } from '@/lib/browserData';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { uploadFile, publicUrl, fileExt } from '@/lib/storage';

const ISLANDS = ['São Vicente', 'Santo Antão', 'Santiago', 'Sal', 'Boa Vista', 'São Nicolau', 'Fogo', 'Maio', 'Brava'];

const STATUSES: { v: string; l: TL }[] = [
  { v: 'PLANNING', l: { pt: 'Planeamento', en: 'Planning', nl: 'Planning' } },
  { v: 'IN_PROGRESS', l: { pt: 'Em curso', en: 'In progress', nl: 'In uitvoering' } },
  { v: 'REVIEW', l: { pt: 'Em revisão', en: 'In review', nl: 'In beoordeling' } },
  { v: 'DONE', l: { pt: 'Concluído', en: 'Done', nl: 'Voltooid' } },
];

const MAX_MILESTONES = 6;

// Reusable trilingual field labels / qualifiers.
const L = {
  name: { pt: 'Nome do projeto', en: 'Project name', nl: 'Projectnaam' },
  description: { pt: 'Descrição', en: 'Description', nl: 'Beschrijving' },
  island: { pt: 'Ilha', en: 'Island', nl: 'Eiland' },
  status: { pt: 'Estado', en: 'Status', nl: 'Status' },
  progress: { pt: 'Progresso (%)', en: 'Progress (%)', nl: 'Voortgang (%)' },
  budget: { pt: 'Orçamento (CVE)', en: 'Budget (CVE)', nl: 'Budget (CVE)' },
  contractor: { pt: 'Empreiteiro', en: 'Contractor', nl: 'Aannemer' },
  cover: { pt: 'Foto de capa', en: 'Cover photo', nl: 'Omslagfoto' },
  milestones: { pt: 'Marcos', en: 'Milestones', nl: 'Mijlpalen' },
} satisfies Record<string, TL>;

const PT_LBL: TL = { pt: 'Português', en: 'Portuguese', nl: 'Portugees' };
const EN_LBL: TL = { pt: 'Inglês', en: 'English', nl: 'Engels' };
const NL_LBL: TL = { pt: 'Neerlandês', en: 'Dutch', nl: 'Nederlands' };
const REQUIRED: TL = { pt: 'obrigatório', en: 'required', nl: 'verplicht' };
const OPTIONAL: TL = { pt: 'opcional', en: 'optional', nl: 'optioneel' };
const RECOMMENDED: TL = { pt: 'recomendado', en: 'recommended', nl: 'aanbevolen' };
const AUTH_MSG: TL = {
  pt: 'A sua sessão expirou. Inicie sessão novamente.',
  en: 'Your session expired. Please log in again.',
  nl: 'Je sessie is verlopen. Log opnieuw in.',
};

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

function Notice({ locale, children }: { locale: Locale; children: React.ReactNode }): JSX.Element {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      {children}
      <div className="mt-3">
        <Link href={`/${locale}/projetos`} className="font-semibold text-brand hover:underline">
          ← {tr({ pt: 'Ver projetos', en: 'Browse projects', nl: 'Projecten bekijken' }, locale)}
        </Link>
      </div>
    </div>
  );
}

export default function ProjectFormPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const router = useRouter();
  const { ready, user, configured } = useAuth();

  const [f, setF] = useState({
    namePt: '', nameEn: '', nameNl: '',
    descPt: '', descEn: '', descNl: '',
    island: '',
    status: 'PLANNING',
    progress: '0',
    budget: '',
    contractor: '',
    publish: true,
  });
  const [milestones, setMilestones] = useState<{ label: string; done: boolean }[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upd = (k: keyof typeof f, v: string | boolean): void => setF((s) => ({ ...s, [k]: v }));

  const addMilestone = (): void => setMilestones((m) => (m.length >= MAX_MILESTONES ? m : [...m, { label: '', done: false }]));
  const removeMilestone = (i: number): void => setMilestones((m) => m.filter((_, idx) => idx !== i));
  const setMilestoneLabel = (i: number, v: string): void => setMilestones((m) => m.map((it, idx) => (idx === i ? { ...it, label: v } : it)));
  const toggleMilestone = (i: number): void => setMilestones((m) => m.map((it, idx) => (idx === i ? { ...it, done: !it.done } : it)));

  function onPickCover(list: FileList | null): void {
    const file = list && list[0] ? list[0] : null;
    setCoverFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  }

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!configured) {
    return (
      <Notice locale={locale}>
        {tr(
          {
            pt: 'A criação de projetos de portefólio estará disponível quando a base de dados estiver ligada.',
            en: 'Creating portfolio projects will be available once the live backend is connected.',
            nl: 'Het aanmaken van portfolioprojecten wordt beschikbaar zodra de live-backend is gekoppeld.',
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
            pt: 'Inicie sessão para criar um projeto de construção.',
            en: 'Log in to create a construction project.',
            nl: 'Log in om een bouwproject aan te maken.',
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

  const canSubmit = f.namePt.trim().length > 0 && f.island.trim().length > 0 && !busy;

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!f.namePt.trim() || !f.island) return;
    setError(null);
    setBusy(true);

    const slug = `${slugify(f.namePt) || 'projeto'}-${Date.now().toString(36)}`;

    // Optional cover upload to Supabase storage (single image). Skipped if no file.
    let cover: string | null = null;
    if (coverFile) {
      const supa = getBrowserSupabase();
      if (!supa) { setBusy(false); setError('not-configured'); return; }
      const { data: auth } = await supa.auth.getUser();
      const owner = auth.user?.id;
      if (!owner) { setBusy(false); setError(tr(AUTH_MSG, locale)); return; }
      const up = await uploadFile('listing-photos', `${owner}/projects/${slug}/cover.${fileExt(coverFile.name)}`, coverFile);
      if (up.error) { setBusy(false); setError(up.error); return; }
      cover = up.path ? publicUrl('listing-photos', up.path) : null;
    }

    const name: TL = { pt: f.namePt, en: f.nameEn || f.namePt, nl: f.nameNl || f.namePt };
    const description: TL = { pt: f.descPt, en: f.descEn || f.descPt, nl: f.descNl || f.descPt };
    const progress = Math.max(0, Math.min(100, Math.round(Number(f.progress) || 0)));
    const budget_cve = f.budget.trim() ? Math.round(Number(f.budget)) : null;
    const milestonesTL = milestones
      .filter((m) => m.label.trim())
      .map((m) => ({ label: { pt: m.label, en: m.label, nl: m.label } as TL, done: m.done }));

    const res = await upsertProject({
      slug,
      name,
      description,
      island: f.island,
      status: f.status,
      progress,
      budget_cve,
      contractor: f.contractor.trim(),
      cover,
      milestones: milestonesTL,
      visibility: f.publish ? 'published' : 'draft',
    });
    setBusy(false);
    if (res === null) { router.push(`/${locale}/projetos`); return; }
    if (res === 'auth') { setError(tr(AUTH_MSG, locale)); return; }
    if (res === 'demo') {
      setError(tr({ pt: 'Isto precisa da base de dados ativa.', en: 'This needs the live backend.', nl: 'Hiervoor is de live-backend nodig.' }, locale));
      return;
    }
    setError(res);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle
        title={tr({ pt: 'Criar projeto', en: 'Create project', nl: 'Project aanmaken' }, locale)}
        intro={tr(
          {
            pt: 'Adicione uma obra ao seu portefólio de construção.',
            en: 'Add a build to your construction portfolio.',
            nl: 'Voeg een bouwproject toe aan je portfolio.',
          },
          locale,
        )}
      />

      <Card>
        <form onSubmit={onSubmit} className="space-y-5">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.name, locale)}</legend>
            {field('namePt', ql(PT_LBL, REQUIRED), { required: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('nameEn', ql(EN_LBL, OPTIONAL))}
              {field('nameNl', ql(NL_LBL, OPTIONAL))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(L.description, locale)}</legend>
            {field('descPt', ql(PT_LBL, RECOMMENDED), { textarea: true })}
            <div className="grid gap-3 sm:grid-cols-2">
              {field('descEn', ql(EN_LBL, OPTIONAL), { textarea: true })}
              {field('descNl', ql(NL_LBL, OPTIONAL), { textarea: true })}
            </div>
          </fieldset>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-slate-600">{tr(ql(L.island, REQUIRED), locale)}</span>
              <select value={f.island} onChange={(e) => upd('island', e.target.value)} className={input}>
                <option value="">{tr({ pt: 'Selecione a ilha', en: 'Select island', nl: 'Selecteer eiland' }, locale)}</option>
                {ISLANDS.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-slate-600">{tr(L.status, locale)}</span>
              <select value={f.status} onChange={(e) => upd('status', e.target.value)} className={input}>
                {STATUSES.map((s) => (
                  <option key={s.v} value={s.v}>{tr(s.l, locale)}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-slate-600">{tr(L.progress, locale)}</span>
              <input
                type="number"
                min="0"
                max="100"
                value={f.progress}
                onChange={(e) => upd('progress', e.target.value)}
                className={input}
              />
            </label>
            <label className="block text-sm">
              <span className="text-slate-600">{tr(ql(L.budget, OPTIONAL), locale)}</span>
              <input
                type="number"
                min="0"
                value={f.budget}
                onChange={(e) => upd('budget', e.target.value)}
                className={input}
              />
            </label>
          </div>

          {field('contractor', ql(L.contractor, OPTIONAL))}

          <div>
            <span className="text-sm text-slate-600">{tr(ql(L.cover, OPTIONAL), locale)}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onPickCover(e.target.files)}
              className={`${input} cursor-pointer`}
            />
            {coverPreview && (
              <div className="mt-3 aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverPreview} alt="" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-slate-700">{tr(ql(L.milestones, OPTIONAL), locale)}</legend>
            <p className="text-xs text-slate-400">
              {tr(
                {
                  pt: 'Adicione até 6 marcos e marque os que já estão concluídos.',
                  en: 'Add up to 6 milestones and tick the ones already done.',
                  nl: 'Voeg maximaal 6 mijlpalen toe en vink de voltooide aan.',
                },
                locale,
              )}
            </p>
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={m.done}
                  onChange={() => toggleMilestone(i)}
                  aria-label={tr({ pt: 'Concluído', en: 'Done', nl: 'Voltooid' }, locale)}
                />
                <input
                  value={m.label}
                  onChange={(e) => setMilestoneLabel(i, e.target.value)}
                  placeholder={tr({ pt: 'Ex.: Fundações concluídas', en: 'E.g. Foundations complete', nl: 'Bijv. Fundering gereed' }, locale)}
                  className="w-full flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeMilestone(i)}
                  aria-label={tr({ pt: 'Remover', en: 'Remove', nl: 'Verwijderen' }, locale)}
                  className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            {milestones.length < MAX_MILESTONES && (
              <button
                type="button"
                onClick={addMilestone}
                className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-brand hover:text-brand"
              >
                + {tr({ pt: 'Adicionar marco', en: 'Add milestone', nl: 'Mijlpaal toevoegen' }, locale)}
              </button>
            )}
          </fieldset>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={f.publish} onChange={(e) => upd('publish', e.target.checked)} />
            {tr({ pt: 'Publicar agora', en: 'Publish now', nl: 'Nu publiceren' }, locale)}
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={!canSubmit} className={primary}>
              {busy
                ? tr({ pt: 'A guardar…', en: 'Saving…', nl: 'Opslaan…' }, locale)
                : tr({ pt: 'Criar projeto', en: 'Create project', nl: 'Project aanmaken' }, locale)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
