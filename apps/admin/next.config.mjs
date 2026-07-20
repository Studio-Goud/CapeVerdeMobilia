/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@ilhavista/ui', '@ilhavista/database', '@ilhavista/auth'],
};
export default nextConfig;
