import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.djarvista.com'),
  title: { default: 'Djarvista — Cabo Verde', template: '%s · Djarvista' },
  description: 'Djarvista — a porta digital para imóveis, terra, construção e informação oficial em Cabo Verde. Property, land, building and official information — PT / EN / NL.',
  applicationName: 'Djarvista',
  keywords: ['Cabo Verde', 'Cape Verde', 'imóveis', 'vastgoed', 'real estate', 'São Vicente', 'arrendamento', 'construção', 'Djarvista'],
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
      </body>
    </html>
  );
}
