import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Admin image uploads go through server actions; allow up to the 8 MB file limit (x2 image slots)
  experimental: {
    serverActions: { bodySizeLimit: '20mb' },
  },
  serverExternalPackages: ['better-sqlite3'],
  /* config options here */
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;