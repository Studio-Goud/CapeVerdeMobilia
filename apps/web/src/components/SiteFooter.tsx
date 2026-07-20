export function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">Kavíla</p>
        <p className="mt-1 max-w-2xl">
          Infraestrutura digital independente para imóveis, construção e informação pública em Cabo
          Verde. A informação comercial é indicativa; a informação oficial é claramente identificada.
          Kavíla não presta aconselhamento jurídico.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Kavíla · Piloto: São Vicente</p>
      </div>
    </footer>
  );
}
