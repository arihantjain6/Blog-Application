import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",

      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3210",
      }
    ],
  },
};

export default nextConfig;
