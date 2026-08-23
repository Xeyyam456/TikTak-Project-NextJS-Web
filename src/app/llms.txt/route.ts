import { SITE_NAME, SITE_URL } from "@/shared/utils/seo";

// Machine-readable summary for AI answer engines (ChatGPT, Perplexity, etc.) — a route
// handler rather than a static public/ file so it stays consistent with SITE_URL like
// robots.ts/sitemap.ts do, instead of hardcoding a domain.
export async function GET() {
  const body = `# ${SITE_NAME}

> TIK TAK — Azərbaycanda onlayn supermarket. Gündəlik ehtiyaclar üçün geniş məhsul kataloqu, sürətli çatdırılma və sərfəli qiymətlər.

## Əsas səhifələr
- [Ana səhifə](${SITE_URL}/): kampaniyalar və endirimlər
- [Kateqoriyalar](${SITE_URL}/categories): bütün məhsul kateqoriyaları
- [Məhsullar](${SITE_URL}/products): tam məhsul kataloqu

## Sitemap
${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
