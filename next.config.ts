import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
