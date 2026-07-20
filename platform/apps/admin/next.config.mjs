/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@djarvista/ui', '@djarvista/database', '@djarvista/auth'],
};
export default nextConfig;
