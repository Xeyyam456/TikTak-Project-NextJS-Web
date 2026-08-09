import type { Metadata } from 'next'
import { ProductsPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Məhsullar',
  description: 'TIK TAK-da bütün məhsulları kəşf edin və onlayn sifariş edin.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <ProductsPage />
    </RequireAuth>
  )
}
