import Link from 'next/link';
export default function NotFound(): JSX.Element {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada · Not found · Niet gevonden</h1>
      <Link href="/pt" className="mt-6 inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-white">Ilhavista</Link>
    </div>
  );
}
