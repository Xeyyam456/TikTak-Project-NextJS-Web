import type { Metadata } from 'next'
import { ProductDetailPage } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Product, ProductPageParams } from '@/types'
import { buildMetadata, SITE_URL } from '@/shared/utils/seo'

export const revalidate = 300

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/products/${id}`
  try {
    const product = await serviceGet<ApiResponse<Product>>(`/products/${id}`).then((res) => res.data)
    return buildMetadata({
      title: product.title,
      description: product.description || 'TIK TAK-da məhsul detalları.',
      path,
      robots: { index: true, follow: true },
    })
  } catch {
    return buildMetadata({
      title: 'Məhsul detalları',
      description: 'TIK TAK-da məhsul detalları.',
      path,
      robots: { index: true, follow: true },
    })
  }
}

export default async function Page({ params }: ProductPageParams) {
  const { id } = await params
  const product = await serviceGet<ApiResponse<Product>>(`/products/${id}`)
    .then((res) => res.data)
    .catch(() => null)

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
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
              url: `${SITE_URL}/products/${id}`,
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Ana səhifə', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'Məhsullar', item: `${SITE_URL}/products` },
              { '@type': 'ListItem', position: 3, name: product.title, item: `${SITE_URL}/products/${id}` },
            ],
          },
        ],
      }
    : null

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <ProductDetailPage productId={Number(id)} initialProduct={product} />
    </>
  )
}
