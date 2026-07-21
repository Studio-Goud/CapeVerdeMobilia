import type { MetadataRoute } from 'next';

// PWA manifest (installable web app). Also the icon source Capacitor uses for the
// iOS/Android wrappers. Served at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Djarvista — Cabo Verde',
    short_name: 'Djarvista',
    description:
      'Imóveis, terra, construção e informação oficial em Cabo Verde. Property, land, building and official information — PT / EN / NL.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#003893',
    lang: 'pt',
    categories: ['business', 'lifestyle', 'utilities'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
