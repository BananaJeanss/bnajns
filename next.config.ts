import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readmefm.bnajns.hackclub.app",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
