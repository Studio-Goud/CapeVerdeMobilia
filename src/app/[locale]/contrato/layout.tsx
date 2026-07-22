import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { pageMetaFor } from '@/lib/seo';
import { isLocale } from '@/i18n';

// The contrato page is a client component (can't export metadata), so the
// title/description/hreflang live on this server layout.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMetaFor(isLocale(params.locale) ? params.locale : 'pt', '/contrato');
}

export default function ContratoLayout({ children }: { children: ReactNode }): JSX.Element {
  return <>{children}</>;
}
