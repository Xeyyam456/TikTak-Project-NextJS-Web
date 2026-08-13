import type { Metadata } from 'next'
import { ProductsPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Məhsullar',
  description: 'TIK TAK-da bütün məhsulları kəşf edin və onlayn sifariş edin.',
  path: '/products',
})

export default function Page() {
  return (
    <RequireAuth>
      <ProductsPage />
    </RequireAuth>
  )
}
