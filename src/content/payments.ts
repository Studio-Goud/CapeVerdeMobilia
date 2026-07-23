import type { TL } from '@/i18n';

/**
 * Betaalmethoden-configuratie.
 *
 * VUL DE ECHTE WAARDEN IN zodra je ze hebt (CV-rekening, MKesh-nummer,
 * PayPal-/kaartlink). Laat `value`/`href` leeg ('') zolang je iets nog niet
 * hebt: de pagina toont dan netjes "brevemente / binnenkort" in plaats van
 * een verzonnen nummer. Niets hier verzinnen; alleen echte gegevens.
 *
 * Twee rails:
 *  - LOCAL_METHODS: voor de Kaapverdiaanse gemeenschap. Vinti4 is het makkelijkst;
 *    de betaling landt op jouw CV-rekening.
 *  - FOREIGN_METHODS: voor investeerders/diaspora zonder CV-rekening, in euro.
 */

export interface PayMethod {
  key: string;
  label: TL;
  /** Concreet gegeven: IBAN / rekeningnr / telefoonnr. Leeg = "brevemente". */
  value: string;
  /** Betaal-URL (PayPal/kaart). Leeg = geen knop. */
  href?: string;
  note: TL;
}

/** Lokaal, voor Cabo Verde. Landt op de CV-rekening. */
export const LOCAL_METHODS: PayMethod[] = [
  {
    key: 'vinti4',
    label: { pt: 'Vinti4 / transferência bancária', en: 'Vinti4 / bank transfer', nl: 'Vinti4 / bankoverschrijving' },
    value: '', // TODO: CV-rekeningnummer / IBAN invullen
    note: {
      pt: 'Transfira para a nossa conta em Cabo Verde e indique a sua referência. O meio mais usado no país.',
      en: 'Transfer to our Cabo Verde account and quote your reference. The most used method in the country.',
      nl: 'Maak over naar onze Kaapverdiaanse rekening en vermeld je referentie. De meest gebruikte methode in het land.',
    },
  },
  {
    key: 'mkesh',
    label: { pt: 'MKesh (dinheiro móvel)', en: 'MKesh (mobile money)', nl: 'MKesh (mobiel geld)' },
    value: '', // TODO: MKesh-nummer invullen
    note: {
      pt: 'Pague pelo telemóvel, sem precisar de conta bancária.',
      en: 'Pay by phone, no bank account needed.',
      nl: 'Betaal met de telefoon, zonder bankrekening.',
    },
  },
];

/** Buitenland, voor investeerders/diaspora zonder CV-rekening. In euro. */
export const FOREIGN_METHODS: PayMethod[] = [
  {
    key: 'paypal',
    label: { pt: 'PayPal (EUR)', en: 'PayPal (EUR)', nl: 'PayPal (EUR)' },
    value: '',
    href: '', // TODO: PayPal-link invullen
    note: {
      pt: 'Para quem paga do estrangeiro, em euros.',
      en: 'For paying from abroad, in euros.',
      nl: 'Voor wie vanuit het buitenland betaalt, in euro.',
    },
  },
  {
    key: 'card',
    label: { pt: 'Cartão (Visa/Mastercard, EUR)', en: 'Card (Visa/Mastercard, EUR)', nl: 'Kaart (Visa/Mastercard, EUR)' },
    value: '',
    href: '', // TODO: Mollie/Stripe-betaallink invullen
    note: {
      pt: 'Pagamento seguro por cartão, em euros.',
      en: 'Secure card payment, in euros.',
      nl: 'Veilige kaartbetaling, in euro.',
    },
  },
];

/** True zodra de methode een echt gegeven of link heeft. */
export function payMethodReady(m: PayMethod): boolean {
  return Boolean(m.value.trim() || (m.href && m.href.trim()));
}

/** True als minstens één methode in de lijst klaar is. */
export function anyReady(methods: PayMethod[]): boolean {
  return methods.some(payMethodReady);
}
