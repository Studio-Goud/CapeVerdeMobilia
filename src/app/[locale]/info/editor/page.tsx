'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { PageTitle, Card, Pill } from '@/components/ui';
import {
  fetchAllPublicationsForEditor,
  savePublication,
  deletePublication,
  type AdminPublication,
  type EditablePublication,
} from '@/lib/browserData';

// --- Inline copy (PT / EN / NL) ---------------------------------------------
const L = {
  title: { pt: 'Editor de informação oficial', en: 'Official information editor', nl: 'Redactie officiële informatie' },
  intro: {
    pt: 'Área editorial da equipa de confiança e operações: criar, rever e publicar páginas do centro de informação oficial.',
    en: 'Editorial area for the trust & operations team: create, review and publish official information-centre pages.',
    nl: 'Redactiegebied voor het vertrouwens- en operationsteam: pagina’s van het officiële informatiecentrum maken, beoordelen en publiceren.',
  },
  notConfigured: {
    pt: 'O editor estará disponível quando a base de dados estiver ligada.',
    en: 'The editor will be available once the database is connected.',
    nl: 'De redactie is beschikbaar zodra de database is verbonden.',
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
  backToInfo: { pt: 'Voltar ao centro de informação', en: 'Back to the information centre', nl: 'Terug naar het informatiecentrum' },
  listTitle: { pt: 'Publicações', en: 'Publications', nl: 'Publicaties' },
  loading: { pt: 'A carregar…', en: 'Loading…', nl: 'Laden…' },
  empty: { pt: 'Ainda não há publicações. Crie a primeira abaixo.', en: 'No publications yet. Create the first one below.', nl: 'Nog geen publicaties. Maak hieronder de eerste aan.' },
  version: { pt: 'Versão', en: 'Version', nl: 'Versie' },
  updated: { pt: 'Atualizado', en: 'Updated', nl: 'Bijgewerkt' },
  edit: { pt: 'Editar', en: 'Edit', nl: 'Bewerken' },
  del: { pt: 'Eliminar', en: 'Delete', nl: 'Verwijderen' },
  confirmDelete: { pt: 'Eliminar esta publicação?', en: 'Delete this publication?', nl: 'Deze publicatie verwijderen?' },
  formNew: { pt: 'Nova publicação', en: 'New publication', nl: 'Nieuwe publicatie' },
  formEdit: { pt: 'Editar publicação', en: 'Edit publication', nl: 'Publicatie bewerken' },
  slug: { pt: 'Slug (endereço)', en: 'Slug (address)', nl: 'Slug (adres)' },
  category: { pt: 'Categoria (ex.: arrendamento, impostos, licenciamento, registo)', en: 'Category (e.g. arrendamento, impostos, licenciamento, registo)', nl: 'Categorie (bijv. arrendamento, impostos, licenciamento, registo)' },
  titleField: { pt: 'Título', en: 'Title', nl: 'Titel' },
  govEntity: { pt: 'Entidade responsável', en: 'Responsible authority', nl: 'Verantwoordelijke instantie' },
  officialStatus: { pt: 'Estado oficial', en: 'Official status', nl: 'Officiële status' },
  versionField: { pt: 'Versão', en: 'Version', nl: 'Versie' },
  sourceUrl: { pt: 'URL da fonte oficial', en: 'Official source URL', nl: 'URL van officiële bron' },
  summary: { pt: 'Resumo', en: 'Summary', nl: 'Samenvatting' },
  body: { pt: 'Conteúdo', en: 'Body', nl: 'Inhoud' },
  status: { pt: 'Estado de publicação', en: 'Publication status', nl: 'Publicatiestatus' },
  statusDraft: { pt: 'Rascunho', en: 'Draft', nl: 'Concept' },
  statusPublished: { pt: 'Publicado', en: 'Published', nl: 'Gepubliceerd' },
  statusArchived: { pt: 'Arquivado', en: 'Archived', nl: 'Gearchiveerd' },
  save: { pt: 'Guardar', en: 'Save', nl: 'Opslaan' },
  saving: { pt: 'A guardar…', en: 'Saving…', nl: 'Opslaan…' },
  newBtn: { pt: 'Nova', en: 'New', nl: 'Nieuw' },
  saved: { pt: 'Publicação guardada.', en: 'Publication saved.', nl: 'Publicatie opgeslagen.' },
  slugRequired: { pt: 'O slug é obrigatório.', en: 'Slug is required.', nl: 'Slug is verplicht.' },
  titleRequired: { pt: 'O título em PT é obrigatório.', en: 'The PT title is required.', nl: 'De PT-titel is verplicht.' },
  officialNote: {
    pt: 'O estado “Oficial” só deve ser usado após validação legal ou pela autoridade competente. Em caso de dúvida, use “Resumo da plataforma” ou “Não confirmado”.',
    en: 'The “Official” status should only be used after real legal or competent-authority validation. When in doubt, use “Platform summary” or “Not confirmed”.',
    nl: 'De status “Officieel” mag alleen worden gebruikt na echte juridische of bevoegde-instantie-validatie. Bij twijfel: gebruik “Platformsamenvatting” of “Niet bevestigd”.',
  },
} satisfies Record<string, TL>;

const OSTATUS_VALUES = ['official', 'summary', 'unconfirmed', 'outdated', 'in_revision'] as const;
const STATUS_VALUES = ['draft', 'published', 'archived'] as const;
type StatusValue = (typeof STATUS_VALUES)[number];

const EMPTY_TL: TL = { pt: '', en: '', nl: '' };

interface FormState {
  id?: string;
  slug: string;
  category: string;
  title: TL;
  gov_entity: string;
  official_status: string;
  version: number;
  source_url: string;
  summary: TL;
  body: TL;
  status: string;
}

const BLANK_FORM: FormState = {
  id: undefined,
  slug: '',
  category: '',
  title: { ...EMPTY_TL },
  gov_entity: '',
  official_status: 'summary',
  version: 1,
  source_url: '',
  summary: { ...EMPTY_TL },
  body: { ...EMPTY_TL },
  status: 'draft',
};

// --- Styles ------------------------------------------------------------------
const INPUT = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';
const LANG_LABEL = 'text-xs font-semibold uppercase tracking-wide text-slate-400';
const FIELD_LABEL = 'text-sm font-medium text-slate-700';
const BTN_NEUTRAL = 'rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50';
const BTN_DANGER = 'rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50';

function formatDate(locale: Locale, iso: string): string {
  const loc = locale === 'nl' ? 'nl-NL' : locale === 'en' ? 'en-GB' : 'pt-PT';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat(loc, { dateStyle: 'medium' }).format(d);
}

function statusTone(status: string): 'emerald' | 'slate' | 'amber' {
  if (status === 'published') return 'emerald';
  if (status === 'archived') return 'amber';
  return 'slate';
}

export default function InfoEditorPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { ready, user, configured } = useAuth();

  const [rows, setRows] = useState<AdminPublication[] | null>(null);
  const [form, setForm] = useState<FormState>({ ...BLANK_FORM });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isAdmin = Boolean(user) && user?.role === 'admin';

  const load = useCallback(async (): Promise<void> => {
    setRows(null);
    const data = await fetchAllPublicationsForEditor();
    setRows(data ?? []);
  }, []);

  useEffect(() => {
    if (!ready || !configured || !isAdmin) return;
    void load();
  }, [ready, configured, isAdmin, load]);

  const setTL = useCallback((field: 'title' | 'summary' | 'body', lang: Locale, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
  }, []);

  const startNew = useCallback((): void => {
    setForm({ ...BLANK_FORM, title: { ...EMPTY_TL }, summary: { ...EMPTY_TL }, body: { ...EMPTY_TL } });
    setError(null);
    setNotice(null);
  }, []);

  const editRow = useCallback((row: AdminPublication): void => {
    setForm({
      ...BLANK_FORM,
      id: row.id,
      slug: row.slug,
      category: row.category ?? '',
      title: { ...EMPTY_TL, ...row.title },
      official_status: row.official_status,
      version: row.version,
      status: row.status,
    });
    setError(null);
    setNotice(null);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const removeRow = useCallback(
    async (id: string): Promise<void> => {
      if (!window.confirm(tr(L.confirmDelete, locale))) return;
      setBusy(true);
      await deletePublication(id);
      if (form.id === id) startNew();
      setBusy(false);
      await load();
    },
    [form.id, load, locale, startNew],
  );

  const save = useCallback(async (): Promise<void> => {
    setError(null);
    setNotice(null);
    if (!form.slug.trim()) {
      setError(tr(L.slugRequired, locale));
      return;
    }
    if (!form.title.pt.trim()) {
      setError(tr(L.titleRequired, locale));
      return;
    }
    const payload: EditablePublication = {
      id: form.id,
      slug: form.slug.trim(),
      category: form.category.trim(),
      title: { pt: form.title.pt, en: form.title.en, nl: form.title.nl },
      gov_entity: form.gov_entity.trim(),
      official_status: form.official_status,
      version: Number.isFinite(form.version) ? form.version : 1,
      source_url: form.source_url.trim(),
      summary: { pt: form.summary.pt, en: form.summary.en, nl: form.summary.nl },
      body: { pt: form.body.pt, en: form.body.en, nl: form.body.nl },
      status: form.status,
    };
    setBusy(true);
    const err = await savePublication(payload);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setNotice(tr(L.saved, locale));
    startNew();
    await load();
  }, [form, load, locale, startNew]);

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
        </Card>
      </div>
    );
  }

  // --- Trilingual field group ------------------------------------------------
  const triInputs = (field: 'title', required?: boolean): JSX.Element => (
    <div className="grid gap-2 sm:grid-cols-3">
      {(['pt', 'en', 'nl'] as Locale[]).map((lang) => (
        <label key={lang} className="block">
          <span className={LANG_LABEL}>{lang.toUpperCase()}</span>
          <input
            type="text"
            className={INPUT}
            value={form[field][lang]}
            required={required && lang === 'pt'}
            onChange={(e) => setTL(field, lang, e.target.value)}
          />
        </label>
      ))}
    </div>
  );

  const triTextareas = (field: 'summary' | 'body'): JSX.Element => (
    <div className="grid gap-2 sm:grid-cols-3">
      {(['pt', 'en', 'nl'] as Locale[]).map((lang) => (
        <label key={lang} className="block">
          <span className={LANG_LABEL}>{lang.toUpperCase()}</span>
          <textarea
            rows={4}
            className={INPUT}
            value={form[field][lang]}
            onChange={(e) => setTL(field, lang, e.target.value)}
          />
        </label>
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageTitle title={tr(L.title, locale)} intro={tr(L.intro, locale)} />

      <div className="mb-6">
        <Link href={`/${locale}/info`} className="text-sm font-medium text-brand hover:underline">
          ← {tr(L.backToInfo, locale)}
        </Link>
      </div>

      {/* Publications list */}
      <section className="mb-8 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">{tr(L.listTitle, locale)}</h2>
        {rows === null ? (
          <p className="text-sm text-slate-500">{tr(L.loading, locale)}</p>
        ) : rows.length === 0 ? (
          <Card>
            <p className="text-sm text-slate-500">{tr(L.empty, locale)}</p>
          </Card>
        ) : (
          rows.map((row) => (
            <Card key={row.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <h3 className="truncate text-sm font-semibold text-slate-900">{tr(row.title, locale)}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={statusTone(row.status)}>
                      {row.status === 'published'
                        ? tr(L.statusPublished, locale)
                        : row.status === 'archived'
                          ? tr(L.statusArchived, locale)
                          : tr(L.statusDraft, locale)}
                    </Pill>
                    <Pill tone="brand">{t(locale, ('ostatus.' + row.official_status) as 'ostatus.official')}</Pill>
                    {row.category && <span className="text-xs text-slate-400">{row.category}</span>}
                  </div>
                  <p className="text-xs text-slate-400">
                    {tr(L.version, locale)} {row.version} · {tr(L.updated, locale)} {formatDate(locale, row.updated_at)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <button type="button" className={BTN_NEUTRAL} onClick={() => editRow(row)}>
                    {tr(L.edit, locale)}
                  </button>
                  <button type="button" disabled={busy} className={BTN_DANGER} onClick={() => void removeRow(row.id)}>
                    {tr(L.del, locale)}
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </section>

      {/* Editor form */}
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">{form.id ? tr(L.formEdit, locale) : tr(L.formNew, locale)}</h2>
          <button type="button" className={BTN_NEUTRAL} onClick={startNew}>
            {tr(L.newBtn, locale)}
          </button>
        </div>

        <form
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.slug, locale)}</span>
              <input
                type="text"
                required
                className={INPUT}
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.category, locale)}</span>
              <input
                type="text"
                className={INPUT}
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              />
            </label>
          </div>

          <div>
            <span className={FIELD_LABEL}>{tr(L.titleField, locale)}</span>
            {triInputs('title', true)}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.govEntity, locale)}</span>
              <input
                type="text"
                className={INPUT}
                value={form.gov_entity}
                onChange={(e) => setForm((p) => ({ ...p, gov_entity: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.officialStatus, locale)}</span>
              <select
                className={INPUT}
                value={form.official_status}
                onChange={(e) => setForm((p) => ({ ...p, official_status: e.target.value }))}
              >
                {OSTATUS_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {t(locale, ('ostatus.' + value) as 'ostatus.official')}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.versionField, locale)}</span>
              <input
                type="number"
                min={1}
                className={INPUT}
                value={form.version}
                onChange={(e) => setForm((p) => ({ ...p, version: Number.parseInt(e.target.value, 10) || 1 }))}
              />
            </label>
            <label className="block">
              <span className={FIELD_LABEL}>{tr(L.sourceUrl, locale)}</span>
              <input
                type="url"
                placeholder="https://boe.incv.cv/…"
                className={INPUT}
                value={form.source_url}
                onChange={(e) => setForm((p) => ({ ...p, source_url: e.target.value }))}
              />
            </label>
          </div>

          <div>
            <span className={FIELD_LABEL}>{tr(L.summary, locale)}</span>
            {triTextareas('summary')}
          </div>

          <div>
            <span className={FIELD_LABEL}>{tr(L.body, locale)}</span>
            {triTextareas('body')}
          </div>

          <label className="block">
            <span className={FIELD_LABEL}>{tr(L.status, locale)}</span>
            <select
              className={INPUT}
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as StatusValue }))}
            >
              <option value="draft">{tr(L.statusDraft, locale)}</option>
              <option value="published">{tr(L.statusPublished, locale)}</option>
              <option value="archived">{tr(L.statusArchived, locale)}</option>
            </select>
          </label>

          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {tr(L.officialNote, locale)}
          </p>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {notice && <p className="text-sm font-medium text-emerald-700">{notice}</p>}

          <button type="submit" disabled={busy} className="rounded-lg bg-brand px-4 py-2 font-semibold text-white disabled:opacity-40">
            {busy ? tr(L.saving, locale) : tr(L.save, locale)}
          </button>
        </form>
      </section>
    </div>
  );
}
