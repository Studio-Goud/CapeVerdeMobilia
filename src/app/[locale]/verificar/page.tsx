'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { t, tr, verifLabel, type Locale, type TL, type VerificationLevel } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { uploadFile, fileExt } from '@/lib/storage';
import { TrustBadge } from '@/components/ui';

const TXT = {
  title: { pt: 'Verificar a minha identidade', en: 'Verify my identity', nl: 'Mijn identiteit verifiëren' } as TL,
  intro: { pt: 'Envie um documento de identificação para aumentar o seu nível de confiança. A verificação é feita por pessoas da nossa equipa — nunca apenas por IA.', en: 'Upload an identity document to raise your trust level. Verification is done by our team — never by AI alone.', nl: 'Upload een identiteitsbewijs om je vertrouwensniveau te verhogen. Verificatie wordt door ons team gedaan — nooit alleen door AI.' } as TL,
  privacy: { pt: 'Os seus documentos são guardados de forma privada e cifrada, acessíveis apenas a si e à equipa de verificação, usados só para este fim, e podem ser apagados a seu pedido.', en: 'Your documents are stored privately and encrypted, accessible only to you and the verification team, used only for this purpose, and can be deleted on request.', nl: 'Je documenten worden privé en versleuteld opgeslagen, alleen toegankelijk voor jou en het verificatieteam, uitsluitend hiervoor gebruikt, en op verzoek verwijderbaar.' } as TL,
  docType: { pt: 'Tipo de documento', en: 'Document type', nl: 'Type document' } as TL,
  docFile: { pt: 'Documento (foto ou PDF)', en: 'Document (photo or PDF)', nl: 'Document (foto of PDF)' } as TL,
  selfie: { pt: 'Selfie com o documento (opcional)', en: 'Selfie holding the document (optional)', nl: 'Selfie met het document (optioneel)' } as TL,
  consent: { pt: 'Confirmo que os documentos são meus e autorizo a sua utilização para verificação.', en: 'I confirm these documents are mine and authorise their use for verification.', nl: 'Ik bevestig dat deze documenten van mij zijn en geef toestemming ze te gebruiken voor verificatie.' } as TL,
  submit: { pt: 'Enviar para verificação', en: 'Submit for verification', nl: 'Versturen voor verificatie' } as TL,
  needLogin: { pt: 'Entre para verificar a sua identidade.', en: 'Log in to verify your identity.', nl: 'Log in om je identiteit te verifiëren.' } as TL,
  current: { pt: 'Nível atual', en: 'Current level', nl: 'Huidig niveau' } as TL,
  pending: { pt: 'Já tem um pedido em análise. Entraremos em contacto após a revisão.', en: 'You already have a request under review. We will be in touch after review.', nl: 'Je hebt al een aanvraag in behandeling. We nemen contact op na de controle.' } as TL,
  done: { pt: 'Recebido! O seu pedido está em análise pela equipa de verificação.', en: 'Received! Your request is under review by the verification team.', nl: 'Ontvangen! Je aanvraag wordt beoordeeld door het verificatieteam.' } as TL,
  needBackend: { pt: 'A verificação estará disponível quando a base de dados estiver ligada.', en: 'Verification will be available once the database is connected.', nl: 'Verificatie is beschikbaar zodra de database is gekoppeld.' } as TL,
};

export default function VerifyPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { ready, user, configured } = useAuth();
  const [level, setLevel] = useState<VerificationLevel>('L0_NONE');
  const [hasPending, setHasPending] = useState(false);
  const [docType, setDocType] = useState('BI');
  const [doc, setDoc] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!configured || !user) return;
    const supa = getBrowserSupabase();
    if (!supa) return;
    void (async () => {
      const { data: auth } = await supa.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) return;
      const { data: prof } = await supa.from('profiles').select('verification_level').eq('id', uid).maybeSingle();
      if (prof?.verification_level) setLevel(prof.verification_level as VerificationLevel);
      const { data: reqs } = await supa.from('verification_requests').select('status').eq('user_id', uid).eq('status', 'pending').limit(1);
      setHasPending((reqs ?? []).length > 0);
    })();
  }, [configured, user]);

  if (!ready) return <div className="h-40" aria-hidden />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        {tr(TXT.needLogin, locale)}
        <div className="mt-3"><Link href={`/${locale}/entrar`} className="font-semibold text-brand hover:underline">{t(locale, 'nav.login')}</Link></div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    const supa = getBrowserSupabase();
    if (!supa) return;
    const { data: auth } = await supa.auth.getUser();
    const uid = auth.user?.id;
    if (!uid || !doc) return;
    setBusy(true);
    const stamp = Date.now();
    const up1 = await uploadFile('verification-docs', `${uid}/${stamp}_doc.${fileExt(doc.name)}`, doc);
    if (up1.error) { setBusy(false); setError(up1.error); return; }
    let selfiePath: string | null = null;
    if (selfie) {
      const up2 = await uploadFile('verification-docs', `${uid}/${stamp}_selfie.${fileExt(selfie.name)}`, selfie);
      if (up2.error) { setBusy(false); setError(up2.error); return; }
      selfiePath = up2.path ?? null;
    }
    const { error: insErr } = await supa.from('verification_requests').insert({
      user_id: uid, level_requested: 'L1_IDENTITY', doc_type: docType, doc_path: up1.path, selfie_path: selfiePath, status: 'pending',
    });
    setBusy(false);
    if (insErr) { setError(insErr.message); return; }
    setDone(true); setHasPending(true);
  }

  const inp = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900">{tr(TXT.title, locale)}</h1>
      <p className="mt-2 text-sm text-slate-600">{tr(TXT.intro, locale)}</p>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm">
        <span className="text-slate-500">{tr(TXT.current, locale)}:</span> <TrustBadge level={level} locale={locale} />
      </div>

      {!configured ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{tr(TXT.needBackend, locale)}</div>
      ) : done || hasPending ? (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{tr(done ? TXT.done : TXT.pending, locale)}</div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.docType, locale)}</span>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} className={inp}>
              <option value="BI">Bilhete de Identidade</option>
              <option value="Passaporte">Passaporte / Passport</option>
              <option value="NIF">NIF</option>
            </select>
          </label>
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.docFile, locale)}</span>
            <input type="file" required accept="image/*,application/pdf" onChange={(e) => setDoc(e.target.files?.[0] ?? null)} className={inp} />
          </label>
          <label className="block text-sm"><span className="text-slate-600">{tr(TXT.selfie, locale)}</span>
            <input type="file" accept="image/*" capture="user" onChange={(e) => setSelfie(e.target.files?.[0] ?? null)} className={inp} />
          </label>
          <label className="flex items-start gap-2 text-xs text-slate-600">
            <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>{tr(TXT.consent, locale)}</span>
          </label>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={busy || !doc || !consent} className="w-full rounded-lg bg-brand px-3 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
            {busy ? tr({ pt: 'A enviar…', en: 'Uploading…', nl: 'Bezig met verzenden…' }, locale) : tr(TXT.submit, locale)}
          </button>
          <p className="text-[11px] leading-snug text-slate-400">🔒 {tr(TXT.privacy, locale)}</p>
        </form>
      )}
    </div>
  );
}
