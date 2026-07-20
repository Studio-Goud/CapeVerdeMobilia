import { cveToEur } from '@ilhavista/config';

/** Format a price with CVE primary and EUR reference (peg). */
export function formatPrice(
  amount: number | null | undefined,
  currency: string,
  priceOnRequest: boolean,
): string {
  if (priceOnRequest || amount == null) return 'Preço sob consulta';
  const cve = new Intl.NumberFormat('pt-CV', { maximumFractionDigits: 0 }).format(amount);
  if (currency === 'CVE') {
    const eur = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(cveToEur(amount));
    return `${cve} CVE (~€${eur})`;
  }
  return `${cve} ${currency}`;
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-PT', { dateStyle: 'medium' }).format(d);
}

export function documentStatusLabel(status: string): string {
  switch (status) {
    case 'VERIFIED':
      return 'Documentos verificados';
    case 'UPLOADED':
      return 'Documentos carregados';
    case 'DECLARED':
      return 'Documentos declarados';
    case 'DISPUTED':
      return 'Em disputa';
    default:
      return 'Documentos por confirmar';
  }
}
