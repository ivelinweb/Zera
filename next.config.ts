import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_MISTRAL_API_KEY: process.env.NEXT_PUBLIC_MISTRAL_API_KEY || "placeholder-api-key",
  },
  // output:"export",
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "assets.aceternity.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
