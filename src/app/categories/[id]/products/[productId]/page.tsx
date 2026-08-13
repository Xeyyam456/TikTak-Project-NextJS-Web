import type { Metadata } from 'next'
import { CategoryProductDetailSection } from '@/views'
import { productService } from '@/services'
import type { CategoryProductDetailPageParams } from '@/types'

export async function generateMetadata({ params }: CategoryProductDetailPageParams): Promise<Metadata> {
  const { productId } = await params
  const robots = { index: false, follow: false }
  try {
    const { data: product } = await productService.getById(Number(productId))
    return {
      title: product.title,
      description: product.description || undefined,
      robots,
    }
  } catch {
    return { title: 'Məhsul detalları', robots }
  }
}

export default async function Page({ params }: CategoryProductDetailPageParams) {
  const { productId } = await params
  return <CategoryProductDetailSection productId={Number(productId)} />
}
