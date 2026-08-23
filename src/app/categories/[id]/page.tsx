import type { Metadata } from 'next'
import { CategoryProductsSection } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Category, CategoryPageParams, PaginatedResponse, Product } from '@/types'
import { buildMetadata, SITE_URL } from '@/shared/utils/seo'

export const revalidate = 300

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/categories/${id}`
  try {
    const categories = await serviceGet<ApiResponse<Category[]>>('/categories').then((res) => res.data)
    const category = categories.find((c) => c.id === Number(id))
    return buildMetadata({
      title: category?.name ?? 'Kateqoriyalar',
      description: category?.description || 'TIK TAK-da bu kateqoriyadakı məhsulları kəşf edin.',
      path,
      robots: { index: true, follow: true },
    })
  } catch {
    return buildMetadata({
      title: 'Kateqoriyalar',
      description: 'TIK TAK-da kateqoriyadakı məhsulları kəşf edin.',
      path,
      robots: { index: true, follow: true },
    })
  }
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  const categoryId = Number(id)

  const categories = await serviceGet<ApiResponse<Category[]>>('/categories')
    .then((res) => res.data)
    .catch(() => [])
  const category = categories.find((c) => c.id === categoryId)

  const products: Product[] = await serviceGet<PaginatedResponse<Product>>('/products')
    .then((res) => res.data.filter((product) => product.category.id === categoryId))
    .catch(() => [])

  const jsonLd = category
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana səhifə', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Kateqoriyalar', item: `${SITE_URL}/categories` },
          { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/categories/${categoryId}` },
        ],
      }
    : null

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <CategoryProductsSection products={products} categoryName={category?.name} />
    </>
  )
}
