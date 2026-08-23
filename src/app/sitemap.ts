import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/utils/seo";
import { serviceGet } from "@/services/serviceAccount";
import type { ApiResponse, Category, PaginatedResponse, Product } from "@/types";

// Evaluated once per server process rather than per-request, so lastModified
// reflects when this build/deploy started instead of claiming "now" on every hit.
const BUILD_TIME = new Date();

export const revalidate = 300;

// Most routes require auth and stay intentionally noindex (see AGENTS.md "Backend / API").
// /categories and /products (+ their detail pages) are server-rendered via the service
// account with unique content per URL, so they're listed here alongside the landing page.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    serviceGet<ApiResponse<Category[]>>("/categories")
      .then((res) => res.data)
      .catch(() => []),
    serviceGet<PaginatedResponse<Product>>("/products")
      .then((res) => res.data)
      .catch(() => []),
  ]);

  return [
    { url: SITE_URL, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/categories`, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/products`, lastModified: BUILD_TIME, changeFrequency: "daily", priority: 0.8 },
    ...categories.map((category) => ({
      url: `${SITE_URL}/categories/${category.id}`,
      lastModified: BUILD_TIME,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.id}`,
      lastModified: BUILD_TIME,
      changeFrequency: "daily" as const,
      priority: 0.5,
    })),
  ];
}
