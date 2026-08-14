import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/utils/seo";

// Evaluated once per server process rather than per-request, so lastModified
// reflects when this build/deploy started instead of claiming "now" on every hit.
const BUILD_TIME = new Date();

// Almost every other route requires auth and is intentionally noindex (see AGENTS.md
// "Backend / API" — most endpoints require a login a crawler can never have), so this
// sitemap legitimately lists only the one publicly indexable page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: BUILD_TIME,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
