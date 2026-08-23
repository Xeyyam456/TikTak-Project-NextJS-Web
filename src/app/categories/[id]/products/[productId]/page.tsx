import type { Metadata } from 'next'
import { CategoryProductDetailSection } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, CategoryProductDetailPageParams, Product } from '@/types'
import { buildMetadata, SITE_URL } from '@/shared/utils/seo'

export const revalidate = 300

// Canonical points at /products/:id (the indexed, non-duplicate URL) — this nested route
// renders the same product under a category path and stays noindex by default so it never
// competes with the canonical page for search ranking.
export async function generateMetadata({ params }: CategoryProductDetailPageParams): Promise<Metadata> {
  const { productId } = await params
  const path = `/products/${productId}`
  try {
    const product = await serviceGet<ApiResponse<Product>>(`/products/${productId}`).then((res) => res.data)
    return buildMetadata({
      title: product.title,
      description: product.description || 'TIK TAK-da məhsul detalları.',
      path,
    })
  } catch {
    return buildMetadata({ title: 'Məhsul detalları', description: 'TIK TAK-da məhsul detalları.', path })
  }
}

export default async function Page({ params }: CategoryProductDetailPageParams) {
  const { productId } = await params
  const product = await serviceGet<ApiResponse<Product>>(`/products/${productId}`)
    .then((res) => res.data)
    .catch(() => null)

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.img_url || undefined,
        sku: String(product.id),
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'AZN',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/products/${productId}`,
        },
      }
    : null

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <CategoryProductDetailSection productId={Number(productId)} initialProduct={product} />
    </>
  )
}
