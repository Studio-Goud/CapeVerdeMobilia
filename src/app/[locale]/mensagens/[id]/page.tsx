'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { t, tr, type Locale, type TL } from '@/i18n';
import { useAuth } from '@/components/Auth';
import { fetchMessages, sendMessage, currentUserId, type Message } from '@/lib/browserData';

const HEADING: TL = { pt: 'Mensagens', en: 'Messages', nl: 'Berichten' };
const BACK: TL = { pt: 'Voltar ao painel', en: 'Back to dashboard', nl: 'Terug naar dashboard' };
const NOT_CONFIGURED: TL = {
  pt: 'As mensagens não estão disponíveis nesta demonstração (base de dados não configurada).',
  en: 'Messages are not available in this demo (database not configured).',
  nl: 'Berichten zijn niet beschikbaar in deze demo (database niet geconfigureerd).',
};
const NEED_LOGIN: TL = {
  pt: 'Precisa de entrar para ver esta conversa.',
  en: 'You need to log in to see this conversation.',
  nl: 'Je moet inloggen om dit gesprek te zien.',
};
const EMPTY: TL = {
  pt: 'Ainda sem mensagens - escreva a primeira.',
  en: 'No messages yet - write the first one.',
  nl: 'Nog geen berichten - schrijf het eerste.',
};
const PLACEHOLDER: TL = { pt: 'Escreva uma mensagem…', en: 'Write a message…', nl: 'Schrijf een bericht…' };
const SEND: TL = { pt: 'Enviar', en: 'Send', nl: 'Versturen' };
const SENDING: TL = { pt: 'A enviar…', en: 'Sending…', nl: 'Versturen…' };
const AUTH_ERR: TL = {
  pt: 'Sessão terminada. Volte a entrar para enviar mensagens.',
  en: 'Session ended. Log in again to send messages.',
  nl: 'Sessie beëindigd. Log opnieuw in om berichten te versturen.',
};
const SEND_ERR: TL = {
  pt: 'Não foi possível enviar a mensagem. Tente novamente.',
  en: 'Could not send the message. Please try again.',
  nl: 'Kon het bericht niet versturen. Probeer het opnieuw.',
};

function timeFormatter(locale: Locale): Intl.DateTimeFormat {
  const loc = locale === 'nl' ? 'nl-NL' : locale === 'en' ? 'en-GB' : 'pt-PT';
  return new Intl.DateTimeFormat(loc, { timeStyle: 'short' });
}

export default function MessagesPage({ params }: { params: { locale: Locale; id: string } }): JSX.Element {
  const locale = params.locale;
  const requestId = params.id;
  const { ready, user, configured } = useAuth();

  const [myUid, setMyUid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const timeFmt = timeFormatter(locale);

  const reload = useCallback(async (): Promise<void> => {
    const list = await fetchMessages(requestId);
    if (list) setMessages(list);
  }, [requestId]);

  useEffect(() => {
    if (!configured || !user) return;
    void currentUserId().then(setMyUid);
    void reload();
    const interval = window.setInterval(() => { void reload(); }, 5000);
    return () => window.clearInterval(interval);
  }, [configured, user, reload]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const text = body.trim();
    if (!text || sending) return;
    setSending(true);
    setError(null);
    const result = await sendMessage(requestId, text);
    if (result === null) {
      setBody('');
      await reload();
    } else {
      setError(result === 'auth' ? tr(AUTH_ERR, locale) : tr(SEND_ERR, locale));
    }
    setSending(false);
  }

  if (!ready) {
    return <div className="mx-auto max-w-2xl px-4 py-10" aria-hidden />;
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {tr(NOT_CONFIGURED, locale)}
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          {tr(NEED_LOGIN, locale)}{' '}
          <Link href={`/${locale}/entrar`} className="font-semibold text-brand underline">
            {t(locale, 'nav.login')}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href={`/${locale}/painel`} className="text-sm font-medium text-brand hover:underline">
        &larr; {tr(BACK, locale)}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tightish text-slate-900">{tr(HEADING, locale)}</h1>

      <div className="mt-4 h-[60vh] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="flex h-full items-center justify-center text-center text-sm text-slate-500">
            {tr(EMPTY, locale)}
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.sender_id === myUid;
            return (
              <div key={m.id} className={mine ? 'flex flex-col items-end' : 'flex flex-col items-start'}>
                <div
                  className={
                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm ' +
                    (mine ? 'bg-brand text-white' : 'bg-slate-100 text-slate-800')
                  }
                >
                  {m.body}
                </div>
                <time className="mt-0.5 px-1 text-[11px] text-slate-400">
                  {timeFmt.format(new Date(m.created_at))}
                </time>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

      <form onSubmit={(e) => { void onSubmit(e); }} className="mt-3 flex gap-2">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={tr(PLACEHOLDER, locale)}
          disabled={sending}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          disabled={sending || body.trim().length === 0}
          className="rounded-lg bg-brand px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {sending ? tr(SENDING, locale) : tr(SEND, locale)}
        </button>
      </form>
    </div>
  );
}
