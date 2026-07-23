/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  // Locale root. Done here (edge-level) instead of a page calling redirect():
  // a statically prerendered page with redirect() shipped a 307 WITHOUT a
  // Location header on Vercel, which Googlebot reported as a redirect error
  // and blocked indexing. Temporary (307) so browsers don't pin it if `/`
  // ever starts language-negotiating.
  async redirects() {
    return [{ source: '/', destination: '/pt', permanent: false }];
  },
};
export default nextConfig;
