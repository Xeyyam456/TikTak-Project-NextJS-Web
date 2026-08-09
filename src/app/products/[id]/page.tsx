import type { Metadata } from 'next'
import { ProductDetailPage } from '@/views'
import { productService } from '@/services'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import type { ProductPageParams } from '@/types'

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params
  const robots = { index: false, follow: false }
  try {
    const { data: product } = await productService.getById(Number(id))
    return {
      title: product.title,
      description: product.description || undefined,
      robots,
    }
  } catch {
    return { title: 'Məhsul detalları', robots }
  }
}

export default async function Page({ params }: ProductPageParams) {
  const { id } = await params
  return (
    <RequireAuth>
      <ProductDetailPage productId={Number(id)} />
    </RequireAuth>
  )
}
