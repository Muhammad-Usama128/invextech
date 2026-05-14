/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // Replace with your image host
        port: "",
        pathname: "/**", // Allows all paths from this host
      },
    ],
  },
};

export default nextConfig;
