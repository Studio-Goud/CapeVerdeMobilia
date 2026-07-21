'use client';

import { useEffect } from 'react';
import type { Locale } from '@/i18n';

/**
 * Sets <html lang> to the active locale. The root layout renders a static
 * lang="pt"; this corrects it on EN/NL pages so screen readers use the right
 * pronunciation (WCAG 3.1.1). Renders nothing.
 */
export function HtmlLang({ locale }: { locale: Locale }): null {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
