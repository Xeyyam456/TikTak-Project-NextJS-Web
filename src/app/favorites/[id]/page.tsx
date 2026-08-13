import type { Metadata } from 'next'
import { FavoritesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { productService } from '@/services'
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
    return { title: 'Siyahılarım', robots }
  }
}

export default function Page() {
  return (
    <RequireAuth>
      <FavoritesPage />
    </RequireAuth>
  )
}
