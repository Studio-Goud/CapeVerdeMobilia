/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@kavila/ui', '@kavila/database', '@kavila/auth'],
};
export default nextConfig;
