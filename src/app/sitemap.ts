import type { MetadataRoute } from 'next';

const BASE = 'https://www.djarvista.com';
const LOCALES = ['pt', 'en', 'nl'];
const PATHS = [
  '', '/imoveis', '/mapa', '/servicos', '/profissionais', '/materiais',
  '/arrendar', '/contrato', '/assistente', '/projetos', '/concursos',
  '/info', '/procedimentos', '/verificacao', '/governo', '/investir', '/precos',
  '/entrar', '/registar',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((l) =>
    PATHS.map((p) => ({
      url: `${BASE}/${l}${p}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
    })),
  );
}
