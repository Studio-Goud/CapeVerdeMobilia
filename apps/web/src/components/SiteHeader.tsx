import Link from 'next/link';

const NAV = [
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/profissionais', label: 'Profissionais' },
  { href: '/info', label: 'Informação oficial' },
  { href: '/procedimentos', label: 'Procedimentos' },
];

export function SiteHeader(): JSX.Element {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand">
          <span className="text-lg">Ilhavista</span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-4 text-sm font-medium text-slate-600 sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/pedidos/novo"
          className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Publicar pedido
        </Link>
      </div>
    </header>
  );
}
