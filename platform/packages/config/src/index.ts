import { z } from 'zod';

/**
 * Central, validated configuration. Import `env` anywhere instead of reading
 * `process.env` directly, so misconfiguration fails fast at boot.
 */
const booleanish = z
  .string()
  .optional()
  .transform((v) => v === 'true' || v === '1');

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  // Optional here so that importing config in tests / client bundles never throws;
  // the database package reads DATABASE_URL directly for Prisma. Runtime DB code
  // should assert its presence where it is actually used. An empty string (some
  // hosts inject empty env vars) is treated as unset.
  DATABASE_URL: z.preprocess((v) => (v === '' ? undefined : v), z.string().min(1).optional()),
  REDIS_URL: z.preprocess((v) => (v === '' ? undefined : v), z.string().min(1).optional()),
  AUTH_SECRET: z.string().min(16).default('dev-only-insecure-secret-change-me'),
  SESSION_TTL_HOURS: z.coerce.number().int().positive().default(168),
  OTP_TTL_MINUTES: z.coerce.number().int().positive().default(10),
  DEFAULT_LOCALE: z.string().default('pt'),
  SUPPORTED_LOCALES: z.string().default('pt,kea,en,nl,fr'),
  WHATSAPP_SUPPORT_NUMBER: z.string().default('2389000000'),
  S3_BUCKET: z.string().optional(),
  S3_PUBLIC_BASE_URL: z.string().optional(),
  MAP_TILES_URL: z.string().default('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
  PAYMENTS_ENABLED: booleanish,
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

/** Parse once. In server contexts only — never import into client components. */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return parsed.data;
}

export const env: Env = loadEnv();

export const SUPPORTED_LOCALES = env.SUPPORTED_LOCALES.split(',').map((s) => s.trim());

/** CVE is pegged to EUR at a fixed rate. Verify before relying on it commercially. */
export const CVE_PER_EUR = 110.265;
export function cveToEur(cve: number): number {
  return Math.round((cve / CVE_PER_EUR) * 100) / 100;
}
export function eurToCve(eur: number): number {
  return Math.round(eur * CVE_PER_EUR);
}
