/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/service-suite-assets",
  experimental: {
    serverActions:"loose",
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;