import type { Metadata } from 'next'
import { BasketPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Səbətim',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <BasketPage />
    </RequireAuth>
  )
}
