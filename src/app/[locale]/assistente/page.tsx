'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { t, tr, formatEur, cveToEur, type Locale, type UIKey } from '@/i18n';
import { WIZARD_PLANS } from '@/content';

type Who = 'foreign' | 'local' | 'investor';
type Goal = 'buyLand' | 'build' | 'buyHome' | 'business';
const ISLANDS = ['São Vicente', 'Santiago', 'Sal', 'Boa Vista', 'Santo Antão', 'Fogo'];

export default function WizardPage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = params.locale;
  const [who, setWho] = useState<Who | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [island, setIsland] = useState<string | null>(null);

  const step = who === null ? 1 : goal === null ? 2 : island === null ? 3 : 4;

  const choice = (active: boolean): string =>
    `rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${active ? 'border-brand bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'}`;

  const Question = ({ n, qKey, children }: { n: number; qKey: UIKey; children: ReactNode }): JSX.Element => (
    <div className={n === step ? '' : 'opacity-60'}>
      <p className="mb-2 text-sm font-semibold text-slate-900"><span className="text-brand">{n}.</span> {t(locale, qKey)}</p>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t(locale, 'wiz.title')}</h1>
      <p className="mt-2 text-sm text-slate-600">{t(locale, 'wiz.intro')}</p>

      <div className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <Question n={1} qKey="wiz.q1">
          {(['foreign', 'local', 'investor'] as Who[]).map((w) => (
            <button key={w} className={choice(who === w)} onClick={() => { setWho(w); }}>
              {t(locale, `wiz.who.${w}` as 'wiz.who.foreign')}
            </button>
          ))}
        </Question>

        {who !== null && (
          <Question n={2} qKey="wiz.q2">
            {(['buyLand', 'build', 'buyHome', 'business'] as Goal[]).map((gk) => (
              <button key={gk} className={choice(goal === gk)} onClick={() => { setGoal(gk); }}>
                {t(locale, `wiz.goal.${gk}` as 'wiz.goal.buyLand')}
              </button>
            ))}
          </Question>
        )}

        {goal !== null && (
          <Question n={3} qKey="wiz.q3">
            {ISLANDS.map((is) => (
              <button key={is} className={choice(island === is)} onClick={() => { setIsland(is); }}>{is}</button>
            ))}
          </Question>
        )}
      </div>

      {who && goal && island && (
        <Result locale={locale} goal={goal} island={island} onRestart={() => { setWho(null); setGoal(null); setIsland(null); }} />
      )}
    </div>
  );
}

function Result({ locale, goal, island, onRestart }: { locale: Locale; goal: Goal; island: string; onRestart: () => void }): JSX.Element {
  const plan = WIZARD_PLANS[goal];
  return (
    <div className="mt-6 space-y-5 rounded-2xl border border-brand-200 bg-brand-50/50 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{t(locale, 'wiz.result')} - {island}</h2>
        <button onClick={onRestart} className="text-sm font-medium text-brand hover:underline">{t(locale, 'common.restart')}</button>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-700">{t(locale, 'wiz.result.steps')}</p>
        <ol className="space-y-2">
          {plan.steps.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-lg bg-white p-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span>
              <span className="text-slate-700">{tr(s, locale)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-3">
          <p className="text-xs font-semibold uppercase text-slate-400">{t(locale, 'wiz.result.cost')}</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            {formatEur(cveToEur(plan.costCve[0]))} – {formatEur(cveToEur(plan.costCve[1]))}
          </p>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="text-xs font-semibold uppercase text-slate-400">{t(locale, 'wiz.result.duration')}</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">{plan.days[0]}–{plan.days[1]} {t(locale, 'proc.days')}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-700">{t(locale, 'wiz.result.risks')}</p>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
          {plan.risks.map((r, i) => <li key={i}>{tr(r, locale)}</li>)}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href={`/${locale}/profissionais`} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">{t(locale, 'wiz.result.pros')}</Link>
        <Link href={`/${locale}/procedimentos`} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{t(locale, 'nav.procedimentos')}</Link>
      </div>

      <p className="text-xs text-slate-500">{t(locale, 'proc.disclaimer')}</p>
    </div>
  );
}
