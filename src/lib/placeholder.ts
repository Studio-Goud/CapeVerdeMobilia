// Self-contained branded placeholder image for listings/thumbnails that have no
// photo yet. Returns an inline SVG data URI — no external dependency (previously
// these were placehold.co boxes). Flag-blue gradient + island silhouette + sun,
// matching the Djarvista brand, so an empty marketplace still looks finished.

const BRAND = '#003893';

function esc(s: string): string {
  return s.replace(/[<>&"]/g, ' ').trim().slice(0, 44);
}

/**
 * @param label optional caption drawn under the wordmark (e.g. the listing
 * title or island). Defaults to just the wordmark when omitted or 'Djarvista'.
 */
export function placeholderImage(label = 'Djarvista'): string {
  const caption = esc(label);
  const showCaption = caption && caption.toLowerCase() !== 'djarvista';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${caption || 'Djarvista'}">` +
    `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b56c4"/><stop offset="1" stop-color="${BRAND}"/></linearGradient></defs>` +
    `<rect width="1200" height="800" fill="url(#s)"/>` +
    `<circle cx="960" cy="205" r="72" fill="#ff7a4d" opacity="0.92"/>` +
    `<path d="M0 560 L220 420 L360 520 L560 380 L760 545 L980 435 L1200 560 L1200 800 L0 800 Z" fill="#00296b" opacity="0.55"/>` +
    `<path d="M0 645 L260 525 L520 635 L820 505 L1080 625 L1200 560 L1200 800 L0 800 Z" fill="#001a45" opacity="0.6"/>` +
    `<text x="600" y="${showCaption ? 350 : 430}" text-anchor="middle" font-family="system-ui,Segoe UI,Helvetica,Arial,sans-serif" font-size="68" font-weight="700" fill="#ffffff">Djarvista</text>` +
    (showCaption
      ? `<text x="600" y="410" text-anchor="middle" font-family="system-ui,Segoe UI,Helvetica,Arial,sans-serif" font-size="30" fill="#ffffff" opacity="0.85">${caption}</text>`
      : '') +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** A stable generic placeholder (no caption) for thumbnails/fallbacks. */
export const PLACEHOLDER_IMAGE = placeholderImage();
