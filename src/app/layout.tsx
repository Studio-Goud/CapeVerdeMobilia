import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: 'Djarvista — Cabo Verde', template: '%s · Djarvista' },
  description: 'Djarvista — property, land, building and official information in Cabo Verde (PT / EN / NL demo).',
};
export const viewport: Viewport = { themeColor: '#0e6a91', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="pt">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
