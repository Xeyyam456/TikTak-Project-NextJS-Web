import type { Metadata } from 'next'
import { ProductDetailPage } from '@/views'
import { productService } from '@/services'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import type { ProductPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/products/${id}`
  try {
    const { data: product } = await productService.getById(Number(id))
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
  return (
    <RequireAuth>
      <ProductDetailPage productId={Number(id)} />
    </RequireAuth>
  )
}
