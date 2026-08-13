import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/utils/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/categories",
        "/products",
        "/favorites",
        "/basket",
        "/checkout",
        "/account",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
