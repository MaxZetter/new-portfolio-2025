import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add external domains if needed (e.g., ['example.com'])
  },
};

export default nextConfig;
