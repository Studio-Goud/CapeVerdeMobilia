import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'Kavíla — imóveis, terra, construção e informação oficial em Cabo Verde',
    template: '%s · Kavíla',
  },
  description:
    'Kavíla — a porta digital para terra, construção e serviços em Cabo Verde. Encontre, verifique e contacte com confiança.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Kavíla',
};

export const viewport: Viewport = {
  themeColor: '#0e7490',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="pt">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
