import { whatsappLink } from '@/lib/whatsapp';

export const metadata = { title: 'Publicar um pedido' };

export default function NewJobPage(): JSX.Element {
  const wa = whatsappLink(
    'Olá Kavíla, quero publicar um pedido de obra/serviço. O trabalho é: ',
  );
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Publicar um pedido</h1>
      <p className="text-sm text-slate-500">
        Descreva o trabalho e receba orçamentos de profissionais verificados. No piloto de São
        Vicente, a nossa equipa acompanha cada pedido pessoalmente (modelo concierge).
      </p>

      <ol className="grid gap-2 text-sm text-slate-700">
        <li>1. Descreva o trabalho, categoria e localização</li>
        <li>2. Adicione fotos e um orçamento indicativo</li>
        <li>3. Convide profissionais e compare orçamentos</li>
        <li>4. Selecione um profissional e acompanhe o projeto</li>
      </ol>

      <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-4" method="post" action="/api/jobs">
        <input name="title" required placeholder="Título (ex.: Renovar casa de banho)" className="w-full rounded border px-2 py-1.5 text-sm" />
        <textarea name="description" required rows={4} placeholder="Descreva o trabalho…" className="w-full rounded border px-2 py-1.5 text-sm" />
        <div className="grid grid-cols-2 gap-3">
          <input name="budgetAmount" type="number" placeholder="Orçamento (CVE)" className="rounded border px-2 py-1.5 text-sm" />
          <input name="deadline" type="date" className="rounded border px-2 py-1.5 text-sm" />
        </div>
        <button className="w-full rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">
          Enviar pedido
        </button>
        <p className="text-xs text-slate-400">Precisa de iniciar sessão para publicar um pedido.</p>
      </form>

      <a
        href={wa}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Prefere WhatsApp? Fale connosco
      </a>
    </div>
  );
}
