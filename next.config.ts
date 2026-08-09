import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "uploads.sarkhanrahimli.dev",
      },
      {
        protocol: "https",
        hostname: "www.tiktak.az",
      },
    ],
  },
};

export default nextConfig;
