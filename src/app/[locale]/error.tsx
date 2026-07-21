'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Algo correu mal · Something went wrong · Er ging iets mis</h1>
      <p className="mt-2 text-sm text-slate-600">Tente novamente. · Please try again. · Probeer het opnieuw.</p>
      <button onClick={() => reset()} className="mt-6 inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark">
        Tentar de novo · Retry · Opnieuw
      </button>
    </div>
  );
}
