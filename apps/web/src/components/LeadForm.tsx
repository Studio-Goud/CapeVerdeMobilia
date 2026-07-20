'use client';

import { useState, type FormEvent } from 'react';

type State = 'idle' | 'submitting' | 'success' | 'error';

export function LeadForm({ listingId }: { listingId: string }): JSX.Element {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setState('submitting');
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      listingId,
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? '') || undefined,
      phone: String(form.get('phone') ?? '') || undefined,
      message: String(form.get('message') ?? ''),
      locale: 'pt',
    };
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        throw new Error(body?.error?.message ?? 'Não foi possível enviar. Tente novamente.');
      }
      setState('success');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    }
  }

  if (state === 'success') {
    return <p className="mt-2 rounded bg-emerald-50 p-3 text-sm text-emerald-800">Mensagem enviada. Será contactado em breve.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-2 space-y-2 text-sm">
      <input name="name" required placeholder="Nome" className="w-full rounded border px-2 py-1.5" />
      <input name="email" type="email" placeholder="Email (opcional)" className="w-full rounded border px-2 py-1.5" />
      <input name="phone" placeholder="Telefone / WhatsApp (opcional)" className="w-full rounded border px-2 py-1.5" />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="A sua mensagem"
        className="w-full rounded border px-2 py-1.5"
      />
      {error && <p className="text-xs text-rose-600">{error}</p>}
      <button
        disabled={state === 'submitting'}
        className="w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white disabled:opacity-60"
      >
        {state === 'submitting' ? 'A enviar…' : 'Enviar'}
      </button>
    </form>
  );
}
