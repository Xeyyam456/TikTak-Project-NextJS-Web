import type { Metadata } from 'next'
import { CategoryProductsSection } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Category, CategoryPageParams, PaginatedResponse, Product } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

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
    })
  } catch {
    return buildMetadata({ title: 'Kateqoriyalar', description: 'TIK TAK-da kateqoriyadakı məhsulları kəşf edin.', path })
  }
}

export default async function Page({ params }: CategoryPageParams) {
  const { id } = await params
  const categoryId = Number(id)
  const products: Product[] = await serviceGet<PaginatedResponse<Product>>('/products')
    .then((res) => res.data.filter((product) => product.category.id === categoryId))
    .catch(() => [])

  return <CategoryProductsSection products={products} />
}
