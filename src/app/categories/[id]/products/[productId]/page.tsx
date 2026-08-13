import type { Metadata } from 'next'
import { CategoryProductDetailSection } from '@/views'
import { productService } from '@/services'
import type { CategoryProductDetailPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export async function generateMetadata({ params }: CategoryProductDetailPageParams): Promise<Metadata> {
  const { id, productId } = await params
  const path = `/categories/${id}/products/${productId}`
  try {
    const { data: product } = await productService.getById(Number(productId))
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
  return <CategoryProductDetailSection productId={Number(productId)} />
}
