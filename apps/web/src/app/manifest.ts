import type { MetadataRoute } from 'next';

/** PWA manifest — installable, mobile-first (see /docs/10-technical-architecture.md). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ilhavista',
    short_name: 'Ilhavista',
    description: 'Imóveis, terra, construção e informação oficial em Cabo Verde.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0e7490',
    lang: 'pt',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
