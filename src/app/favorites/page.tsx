import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FavoritesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { Loader } from '@/shared/components'

export const metadata: Metadata = {
  title: 'Siyahılarım',
  robots: { index: false, follow: false },
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
