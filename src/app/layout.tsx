import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.djarvista.com'),
  title: { default: 'Djarvista — Cabo Verde', template: '%s · Djarvista' },
  description: 'Djarvista — a porta digital para imóveis, terra, construção e informação oficial em Cabo Verde. Property, land, building and official information — PT / EN / NL.',
  applicationName: 'Djarvista',
  keywords: ['Cabo Verde', 'Cape Verde', 'imóveis', 'vastgoed', 'real estate', 'São Vicente', 'arrendamento', 'construção', 'Djarvista'],
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Djarvista', statusBarStyle: 'default' },
  icons: {
    // SVG first: crisp in the browser tab at any size. PNGs are the fallback for
    // browsers without SVG-favicon support and the source for PWA/home-screen.
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Djarvista',
    title: 'Djarvista — Cabo Verde',
    description: 'Terra, imóveis, construção e informação oficial em Cabo Verde. PT · EN · NL.',
    url: 'https://www.djarvista.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Djarvista — Cabo Verde',
    description: 'Terra, imóveis, construção e informação oficial em Cabo Verde.',
  },
};
export const viewport: Viewport = { themeColor: '#003893', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="pt">
      <body className="flex min-h-screen flex-col">
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
