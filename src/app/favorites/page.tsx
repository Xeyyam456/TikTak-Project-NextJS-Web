import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FavoritesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { Loader } from '@/shared/components'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Siyahılarım',
  description: 'TIK TAK-da seçdiyiniz məhsulları burada görün.',
  path: '/favorites',
})

export default function Page() {
  return (
    <RequireAuth>
      <Suspense fallback={<Loader />}>
        <FavoritesPage />
      </Suspense>
    </RequireAuth>
  )
}
