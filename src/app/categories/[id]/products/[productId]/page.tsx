import type { Metadata } from 'next'
import { CategoryProductDetailSection } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, CategoryProductDetailPageParams, Product } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export const revalidate = 300

export async function generateMetadata({ params }: CategoryProductDetailPageParams): Promise<Metadata> {
  const { id, productId } = await params
  const path = `/categories/${id}/products/${productId}`
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

  return <CategoryProductDetailSection productId={Number(productId)} initialProduct={product} />
}
