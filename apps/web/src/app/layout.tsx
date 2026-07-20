import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { IS_DEMO } from '@/lib/queries';

export const metadata: Metadata = {
  title: {
    default: 'Ilhavista — imóveis, terra, construção e informação oficial em Cabo Verde',
    template: '%s · Ilhavista',
  },
  description:
    'Ilhavista — a porta digital para terra, construção e serviços em Cabo Verde. Encontre, verifique e contacte com confiança.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Ilhavista',
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
        {IS_DEMO && (
          <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-medium text-white">
            Demonstratie · fictieve data — dit is een demo van het Ilhavista-platform, geen live dienst.
          </div>
        )}
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
