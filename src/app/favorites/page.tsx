import type { Metadata } from 'next'
import { FavoritesPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Siyahılarım',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <FavoritesPage />
    </RequireAuth>
  )
}
