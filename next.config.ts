import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Next.js 16 requires opting into any quality value other than the default 75 —
    // otherwise a custom `quality` prop is silently snapped to the closest allowed value.
    qualities: [65, 75],
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
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
  },
};

export default nextConfig;
