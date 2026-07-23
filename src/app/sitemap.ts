import type { MetadataRoute } from 'next';
import { PROCEDURES } from '@/i18n';
import { fetchProfessionals, fetchListings } from '@/lib/data';
import { landingPaths } from '@/lib/landings';
import { KB_SLUGS } from '@/content/kb';

const BASE = 'https://www.djarvista.com';
const LOCALES = ['pt', 'en', 'nl'];
const PATHS = [
  '', '/imoveis', '/mapa', '/servicos', '/profissionais', '/materiais',
  '/arrendar', '/contrato', '/assistente', '/projetos', '/concursos',
  '/info', '/procedimentos', '/verificacao', '/governo', '/investir', '/precos', '/anunciar', '/como-pagar', '/guias',
  '/entrar', '/registar',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap =>
    LOCALES.map((l) => ({ url: `${BASE}/${l}${path}`, lastModified: now, changeFrequency: 'weekly' as const, priority }));

  const staticEntries = PATHS.flatMap((p) => entry(p, p === '' ? 1 : 0.7));

  // Category × island landing pages (high-intent, place-specific SEO targets).
  const landingEntries = landingPaths().flatMap((p) => entry(p, 0.8));

  // Knowledge-base guides (sourced reference content - authority signals).
  const guideEntries = KB_SLUGS.flatMap((s) => entry(`/guias/${s}`, 0.8));

  // Dynamic content - one entry per real profile / listing / procedure, per locale.
  const dynamicPaths: string[] = PROCEDURES.map((p) => `/procedimentos/${p.slug}`);
  try {
    const [pros, listings] = await Promise.all([fetchProfessionals(), fetchListings()]);
    for (const p of pros) dynamicPaths.push(`/profissionais/${p.slug}`);
    for (const l of listings) dynamicPaths.push(`/imoveis/${l.slug}`);
  } catch {
    // Backend unreachable at build time → ship the static map only.
  }
  const dynamicEntries = dynamicPaths.flatMap((p) => entry(p, 0.6));

  return [...staticEntries, ...landingEntries, ...guideEntries, ...dynamicEntries];
}
