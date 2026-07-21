'use client';

import { useState } from 'react';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';

const TXT = {
  title: { pt: 'Gerador de contrato de arrendamento', en: 'Rental contract generator', nl: 'Huurcontract-generator' } as TL,
  intro: { pt: 'Preencha os dados e gere um contrato de arrendamento pronto a imprimir ou guardar em PDF. O documento é redigido em português (língua legal em Cabo Verde).', en: 'Fill in the details and generate a tenancy agreement ready to print or save as PDF. The document is written in Portuguese (the legal language in Cape Verde).', nl: 'Vul de gegevens in en genereer een huurcontract, klaar om te printen of als PDF op te slaan. Het document is in het Portugees (de juridische taal in Kaapverdië).' } as TL,
  disclaimer: { pt: 'A Djarvista fornece este gerador apenas como serviço/ferramenta. Não é parte no contrato, não presta aconselhamento jurídico e não é responsável pela validade do documento. Recomenda-se validação por advogado/notário e o cumprimento das obrigações de registo e imposto de selo aplicáveis.', en: 'Djarvista provides this generator only as a service/tool. It is not a party to the contract, does not give legal advice and is not responsible for the document’s validity. Legal/notary review and compliance with applicable registration and stamp-duty duties are recommended.', nl: 'Djarvista biedt deze generator uitsluitend als service/tool aan. Djarvista is geen partij bij het contract, geeft geen juridisch advies en is niet verantwoordelijk voor de geldigheid van het document. Validatie door advocaat/notaris en naleving van registratie- en zegelrechtverplichtingen worden aangeraden.' } as TL,
  fill: { pt: 'Dados', en: 'Details', nl: 'Gegevens' } as TL,
  print: { pt: 'Imprimir / Guardar PDF', en: 'Print / Save PDF', nl: 'Printen / PDF opslaan' } as TL,
  preview: { pt: 'Pré-visualização', en: 'Preview', nl: 'Voorbeeld' } as TL,
  // groups
  gLandlord: { pt: 'Senhorio (quem arrenda)', en: 'Landlord', nl: 'Verhuurder' } as TL,
  gTenant: { pt: 'Inquilino (quem aluga)', en: 'Tenant', nl: 'Huurder' } as TL,
  gProperty: { pt: 'Imóvel', en: 'Property', nl: 'Woning' } as TL,
  gTerms: { pt: 'Condições', en: 'Terms', nl: 'Voorwaarden' } as TL,
  name: { pt: 'Nome completo', en: 'Full name', nl: 'Volledige naam' } as TL,
  doc: { pt: 'Documento de identificação (n.º)', en: 'ID / passport number', nl: 'ID-/paspoortnummer' } as TL,
  address: { pt: 'Morada', en: 'Address', nl: 'Adres' } as TL,
  propAddress: { pt: 'Morada do imóvel', en: 'Property address', nl: 'Adres van de woning' } as TL,
  island: { pt: 'Ilha / concelho', en: 'Island / municipality', nl: 'Eiland / gemeente' } as TL,
  type: { pt: 'Tipologia (ex.: T2)', en: 'Type (e.g. 2-bed)', nl: 'Type (bijv. 2 slk)' } as TL,
  furnished: { pt: 'Mobilado', en: 'Furnished', nl: 'Gemeubileerd' } as TL,
  start: { pt: 'Início', en: 'Start date', nl: 'Ingangsdatum' } as TL,
  end: { pt: 'Fim', en: 'End date', nl: 'Einddatum' } as TL,
  rent: { pt: 'Renda mensal (CVE)', en: 'Monthly rent (CVE)', nl: 'Maandhuur (CVE)' } as TL,
  payday: { pt: 'Dia de pagamento', en: 'Payment day', nl: 'Betaaldag' } as TL,
  deposit: { pt: 'Caução (CVE)', en: 'Deposit (CVE)', nl: 'Borg (CVE)' } as TL,
  utilities: { pt: 'Água/luz por conta de', en: 'Utilities paid by', nl: 'Water/licht voor rekening van' } as TL,
  place: { pt: 'Local de assinatura', en: 'Place of signing', nl: 'Plaats van ondertekening' } as TL,
  extra: { pt: 'Cláusulas adicionais (opcional)', en: 'Additional clauses (optional)', nl: 'Aanvullende clausules (optioneel)' } as TL,
};

const PH = '……………………';
function months(a: string, b: string): string {
  if (!a || !b) return PH;
  const d1 = new Date(a), d2 = new Date(b);
  const m = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  return m > 0 ? `${m} ${m === 1 ? 'mês' : 'meses'}` : PH;
}
const fmtDate = (s: string): string => (s ? new Intl.DateTimeFormat('pt-PT', { dateStyle: 'long' }).format(new Date(s)) : PH);
const V = (s: string): string => (s && s.trim() ? s : PH);

export default function ContractPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const { user } = useAuth();
  const [f, setF] = useState({
    llName: user?.name ?? '', llDoc: '', llAddr: '',
    tnName: '', tnDoc: '', tnAddr: '',
    propAddr: '', island: 'São Vicente', type: '', furnished: 'não',
    start: '', end: '', rent: '', payday: '8', deposit: '', utilities: 'inquilino',
    place: 'Mindelo', extra: '',
  });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }): void => setF((s) => ({ ...s, [k]: e.target.value }));
  const inp = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';
  const today = new Intl.DateTimeFormat('pt-PT', { dateStyle: 'long' }).format(new Date());

  return (
    <div>
      <div className="no-print">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{tr(TXT.title, locale)}</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">{tr(TXT.intro, locale)}</p>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">⚖️ {tr(TXT.disclaimer, locale)}</div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* FORM */}
        <form className="no-print space-y-5">
          <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <legend className="px-1 text-sm font-semibold text-slate-800">{tr(TXT.gLandlord, locale)}</legend>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.name, locale)}</span><input value={f.llName} onChange={set('llName')} className={inp} /></label>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.doc, locale)}</span><input value={f.llDoc} onChange={set('llDoc')} className={inp} /></label>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.address, locale)}</span><input value={f.llAddr} onChange={set('llAddr')} className={inp} /></label>
          </fieldset>

          <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <legend className="px-1 text-sm font-semibold text-slate-800">{tr(TXT.gTenant, locale)}</legend>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.name, locale)}</span><input value={f.tnName} onChange={set('tnName')} className={inp} /></label>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.doc, locale)}</span><input value={f.tnDoc} onChange={set('tnDoc')} className={inp} /></label>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.address, locale)}</span><input value={f.tnAddr} onChange={set('tnAddr')} className={inp} /></label>
          </fieldset>

          <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <legend className="px-1 text-sm font-semibold text-slate-800">{tr(TXT.gProperty, locale)}</legend>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.propAddress, locale)}</span><input value={f.propAddr} onChange={set('propAddr')} className={inp} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.island, locale)}</span><input value={f.island} onChange={set('island')} className={inp} /></label>
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.type, locale)}</span><input value={f.type} onChange={set('type')} className={inp} /></label>
            </div>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.furnished, locale)}</span>
              <select value={f.furnished} onChange={set('furnished')} className={inp}><option value="não">Não / No</option><option value="sim">Sim / Yes</option></select>
            </label>
          </fieldset>

          <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <legend className="px-1 text-sm font-semibold text-slate-800">{tr(TXT.gTerms, locale)}</legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.start, locale)}</span><input type="date" value={f.start} onChange={set('start')} className={inp} /></label>
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.end, locale)}</span><input type="date" value={f.end} onChange={set('end')} className={inp} /></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.rent, locale)}</span><input type="number" min="0" value={f.rent} onChange={set('rent')} className={inp} /></label>
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.payday, locale)}</span><input type="number" min="1" max="28" value={f.payday} onChange={set('payday')} className={inp} /></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.deposit, locale)}</span><input type="number" min="0" value={f.deposit} onChange={set('deposit')} className={inp} /></label>
              <label className="block text-sm"><span className="text-slate-600">{tr(TXT.utilities, locale)}</span>
                <select value={f.utilities} onChange={set('utilities')} className={inp}><option value="inquilino">Inquilino / Tenant</option><option value="senhorio">Senhorio / Landlord</option></select>
              </label>
            </div>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.place, locale)}</span><input value={f.place} onChange={set('place')} className={inp} /></label>
            <label className="block text-sm"><span className="text-slate-600">{tr(TXT.extra, locale)}</span><textarea rows={3} value={f.extra} onChange={set('extra')} className={inp} /></label>
          </fieldset>

          <button type="button" onClick={() => window.print()} className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark">
            {tr(TXT.print, locale)}
          </button>
        </form>

        {/* DOCUMENT PREVIEW */}
        <div>
          <p className="no-print mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{tr(TXT.preview, locale)}</p>
          <article id="print-doc" className="rounded-xl border border-slate-200 bg-white p-8 text-[13px] leading-relaxed text-slate-800 shadow-card"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <h2 className="text-center text-lg font-bold uppercase tracking-wide">Contrato de Arrendamento</h2>
            <p className="mt-1 text-center text-[11px] uppercase tracking-widest text-slate-500">para fins habitacionais</p>

            <p className="mt-5">Entre:</p>
            <p className="mt-2"><b>Primeiro Outorgante (Senhorio):</b> {V(f.llName)}, portador(a) do documento de identificação n.º {V(f.llDoc)}, com morada em {V(f.llAddr)}.</p>
            <p className="mt-2"><b>Segundo Outorgante (Inquilino):</b> {V(f.tnName)}, portador(a) do documento de identificação n.º {V(f.tnDoc)}, com morada em {V(f.tnAddr)}.</p>
            <p className="mt-3">É celebrado o presente contrato de arrendamento, que se rege pelas cláusulas seguintes e, no omisso, pela lei cabo-verdiana aplicável.</p>

            <p className="mt-4"><b>Cláusula 1.ª (Objeto)</b> — O Senhorio dá de arrendamento ao Inquilino o imóvel sito em {V(f.propAddr)}, {V(f.island)}, do tipo {V(f.type)}, {f.furnished === 'sim' ? 'mobilado' : 'não mobilado'}, destinado a habitação.</p>
            <p className="mt-2"><b>Cláusula 2.ª (Prazo)</b> — O arrendamento tem início em {fmtDate(f.start)} e termo em {fmtDate(f.end)}, pelo período de {months(f.start, f.end)}, renovável por acordo escrito das partes.</p>
            <p className="mt-2"><b>Cláusula 3.ª (Renda)</b> — A renda mensal é de {V(f.rent)} CVE, paga até ao dia {V(f.payday)} de cada mês.</p>
            <p className="mt-2"><b>Cláusula 4.ª (Caução)</b> — A título de caução, o Inquilino entrega a quantia de {V(f.deposit)} CVE, a devolver no termo do contrato, deduzidas as importâncias devidas por danos ou incumprimento.</p>
            <p className="mt-2"><b>Cláusula 5.ª (Despesas)</b> — As despesas de água, eletricidade e demais consumos ficam a cargo do {f.utilities === 'senhorio' ? 'Senhorio' : 'Inquilino'}.</p>
            <p className="mt-2"><b>Cláusula 6.ª (Obrigações do Inquilino)</b> — Usar o imóvel com prudência para o fim habitacional, mantê-lo em bom estado de conservação, não o subarrendar nem ceder sem autorização escrita, e pagar a renda pontualmente.</p>
            <p className="mt-2"><b>Cláusula 7.ª (Obrigações do Senhorio)</b> — Entregar o imóvel em bom estado, assegurar o gozo pacífico do arrendado e realizar as reparações que lhe competem.</p>
            <p className="mt-2"><b>Cláusula 8.ª (Resolução)</b> — O incumprimento das obrigações confere à parte não faltosa o direito de resolver o contrato, nos termos da lei.</p>
            {f.extra.trim() && <p className="mt-2"><b>Cláusula 9.ª (Cláusulas adicionais)</b> — {f.extra}</p>}
            <p className="mt-2"><b>Cláusula {f.extra.trim() ? '10.ª' : '9.ª'} (Lei e foro)</b> — O presente contrato rege-se pela lei cabo-verdiana, sendo competente o foro da comarca da situação do imóvel.</p>

            <p className="mt-6">{V(f.place)}, {today}.</p>
            <div className="mt-10 flex justify-between gap-8 text-center text-[12px]">
              <div className="flex-1"><div className="border-t border-slate-500 pt-1">O Primeiro Outorgante (Senhorio)</div></div>
              <div className="flex-1"><div className="border-t border-slate-500 pt-1">O Segundo Outorgante (Inquilino)</div></div>
            </div>

            <p className="mt-8 border-t border-slate-200 pt-3 text-[10px] leading-snug text-slate-400">
              Documento gerado através da ferramenta Djarvista, a pedido do utilizador. A Djarvista não é parte neste contrato, não presta aconselhamento jurídico e não garante a sua validade. Recomenda-se validação jurídica/notarial e o cumprimento das obrigações legais de registo e imposto de selo. · Not legal advice · Geen juridisch advies.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
