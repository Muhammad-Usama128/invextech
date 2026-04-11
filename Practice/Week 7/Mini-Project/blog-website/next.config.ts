import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.dev.to", // Replace with your image host
        port: "",
        pathname: "/**", // Allows all paths from this host
      },
    ],
  },
};

export default nextConfig;
