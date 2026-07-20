import { env } from '@djarvista/config';

/**
 * Build a WhatsApp click-to-chat deep link. In the concierge MVP, several flows
 * (job intake, onboarding, verification) are handled over WhatsApp before they
 * are fully productised (see /docs/16-go-to-market.md).
 */
export function whatsappLink(message: string, to: string = env.WHATSAPP_SUPPORT_NUMBER): string {
  const num = to.replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
