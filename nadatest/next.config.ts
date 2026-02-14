import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.todotest.com",
        pathname: "/tests/imgs/**",
      },
    ],
  },
};

export default nextConfig;
