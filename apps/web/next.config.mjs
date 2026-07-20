/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Compile workspace packages that ship raw TS/TSX. The public demo build runs
  // without a database, so @djarvista/database and @djarvista/auth are intentionally
  // not part of the web build graph.
  transpilePackages: [
    '@djarvista/ui',
    '@djarvista/types',
    '@djarvista/i18n',
    '@djarvista/validation',
    '@djarvista/config',
    '@djarvista/analytics',
  ],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async headers() {
    // Baseline security headers. Tighten CSP per /docs/13-security-and-privacy.md.
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(self), camera=(), microphone=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
