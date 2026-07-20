import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-slate-500">O conteúdo que procura não existe ou foi removido.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-white">
        Voltar ao início
      </Link>
    </div>
  );
}
