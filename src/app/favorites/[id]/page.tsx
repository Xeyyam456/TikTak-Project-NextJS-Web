import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FavoritesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { Loader } from '@/shared/components'
import { productService } from '@/services'
import type { ProductPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/favorites/${id}`
  try {
    const { data: product } = await productService.getById(Number(id))
    return buildMetadata({
      title: product.title,
      description: product.description || 'TIK TAK-da məhsul detalları.',
      path,
    })
  } catch {
    return buildMetadata({ title: 'Siyahılarım', description: 'TIK TAK-da seçdiyiniz məhsulları burada görün.', path })
  }
}

export default function Page() {
  return (
    <RequireAuth>
      <Suspense fallback={<Loader />}>
        <FavoritesPage />
      </Suspense>
    </RequireAuth>
  )
}
