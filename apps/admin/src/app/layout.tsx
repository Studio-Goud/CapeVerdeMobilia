import type { ReactNode } from 'react';

export const metadata = { title: 'Djarvista Admin' };

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="pt">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f8fafc' }}>
        <header style={{ background: '#0f172a', color: 'white', padding: '12px 20px' }}>
          <strong>Djarvista · Admin & Moderation</strong>
        </header>
        <main style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}
