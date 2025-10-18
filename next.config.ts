import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/wp/:path*",
        destination: "http://shopsoma.local/wp-json/:path*",
      },
    ];
  },
};

export default nextConfig;
