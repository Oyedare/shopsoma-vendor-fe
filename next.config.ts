import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "shopsoma.local",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "shopsoma.local",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "api.shopsoma.com",
        pathname: "/wp-content/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/wp/:path*",
        destination: "https://api.shopsoma.com/wp-json/:path*",
      },
    ];
  },
};

export default nextConfig;
