import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/utils/seo";

// Almost every other route requires auth and is intentionally noindex (see AGENTS.md
// "Backend / API" — most endpoints require a login a crawler can never have), so this
// sitemap legitimately lists only the one publicly indexable page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
