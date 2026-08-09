import type { Metadata } from 'next'
import { OrdersPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Sifarişlərim',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <OrdersPage />
    </RequireAuth>
  )
}
