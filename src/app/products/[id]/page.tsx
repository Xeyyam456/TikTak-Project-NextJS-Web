import type { Metadata } from 'next'
import { ProductDetailPage } from '@/views'
import { serviceGet } from '@/services/serviceAccount'
import type { ApiResponse, Product, ProductPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

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
    })
  } catch {
    return buildMetadata({ title: 'Məhsul detalları', description: 'TIK TAK-da məhsul detalları.', path })
  }
}

export default async function Page({ params }: ProductPageParams) {
  const { id } = await params
  const product = await serviceGet<ApiResponse<Product>>(`/products/${id}`)
    .then((res) => res.data)
    .catch(() => null)

  return <ProductDetailPage productId={Number(id)} initialProduct={product} />
}
