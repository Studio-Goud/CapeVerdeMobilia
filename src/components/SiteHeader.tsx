'use client';

import { useState } from 'react';
import Link from 'next/link';
import { t, type Locale, type UIKey } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from './Auth';
import { Wordmark } from './Wordmark';

interface NavItem { key: UIKey; href: string; soon?: boolean }
interface NavGroup { key: UIKey; items: NavItem[] }

function groups(locale: Locale): NavGroup[] {
  const p = (s: string): string => `/${locale}${s}`;
  return [
    { key: 'nav.group.property', items: [
      { key: 'nav.imoveis', href: p('/imoveis') },
      { key: 'nav.land', href: p('/imoveis?kind=LAND') },
      { key: 'nav.newDev', href: p('/imoveis?kind=NEW_DEVELOPMENT') },
      { key: 'nav.commercial', href: p('/imoveis?kind=COMMERCIAL') },
      { key: 'nav.map', href: p('/imoveis'), soon: true },
    ] },
    { key: 'nav.group.pros', items: [
      { key: 'nav.profissionais', href: p('/profissionais') },
      { key: 'nav.services', href: p('/servicos') },
      { key: 'nav.materials', href: p('/materiais') },
      { key: 'nav.postJob', href: p('/pedidos/novo') },
    ] },
    { key: 'nav.group.build', items: [
      { key: 'nav.wizard', href: p('/assistente') },
      { key: 'nav.projects', href: p('/projetos') },
      { key: 'nav.tenders', href: p('/concursos') },
    ] },
    { key: 'nav.group.gov', items: [
      { key: 'nav.info', href: p('/info') },
      { key: 'nav.procedimentos', href: p('/procedimentos') },
      { key: 'nav.verification', href: p('/verificacao') },
      { key: 'nav.governo', href: p('/governo') },
      { key: 'nav.investir', href: p('/investir') },
    ] },
  ];
}

function SoonTag({ locale }: { locale: Locale }): JSX.Element {
  return <span className="ml-1 rounded bg-sand-200 px-1 py-0.5 text-[10px] font-semibold uppercase text-slate-500">{t(locale, 'nav.soon')}</span>;
}

function AuthArea({ locale, onNavigate }: { locale: Locale; onNavigate?: () => void }): JSX.Element {
  const { ready, user, signOut } = useAuth();
  if (!ready) return <div className="h-8 w-24" aria-hidden />;
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link href={`/${locale}/painel`} onClick={onNavigate} className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark">
          {t(locale, 'nav.dashboard')}
        </Link>
        <button onClick={() => { void signOut(); onNavigate?.(); }} className="rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 hover:text-brand">
          {t(locale, 'nav.logout')}
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Link href={`/${locale}/entrar`} onClick={onNavigate} className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-brand">
        {t(locale, 'nav.login')}
      </Link>
      <Link href={`/${locale}/registar`} onClick={onNavigate} className="rounded-lg bg-coral px-3 py-1.5 text-sm font-semibold text-white hover:bg-coral-600">
        {t(locale, 'nav.register')}
      </Link>
    </div>
  );
}

export function SiteHeader({ locale }: { locale: Locale }): JSX.Element {
  const [open, setOpen] = useState(false);
  const g = groups(locale);
  const close = (): void => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} onClick={close} aria-label="Djarvista">
          <Wordmark className="text-[20px]" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {g.map((grp) => (
            <div key={grp.key} className="group relative">
              <button className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 group-hover:text-brand group-focus-within:text-brand">
                {t(locale, grp.key)}
                <span aria-hidden className="ml-1 text-xs">▾</span>
              </button>
              <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-xl border border-slate-200 bg-white p-1.5 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {grp.items.map((it) => (
                  <Link key={it.key + it.href} href={it.href} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-sand-50 hover:text-brand">
                    {t(locale, it.key)}{it.soon && <SoonTag locale={locale} />}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><LanguageSwitcher current={locale} /></div>
          <div className="hidden md:block"><AuthArea locale={locale} /></div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t(locale, open ? 'nav.close' : 'nav.menu')}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
          >
            <span aria-hidden className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
            {g.map((grp) => (
              <div key={grp.key}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{t(locale, grp.key)}</p>
                <div className="grid grid-cols-2 gap-1">
                  {grp.items.map((it) => (
                    <Link key={it.key + it.href} href={it.href} onClick={close} className="rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-sand-50 hover:text-brand">
                      {t(locale, it.key)}{it.soon && <SoonTag locale={locale} />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3">
              <LanguageSwitcher current={locale} />
              <AuthArea locale={locale} onNavigate={close} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
