import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "player.videasy.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure headers for iframe embedding
  async headers() {
    return [
      {
        source: '/watch/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://player.videasy.net https://www.youtube.com;",
          },
        ],
      },
    ];
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
