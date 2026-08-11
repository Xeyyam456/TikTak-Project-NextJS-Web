import type { Metadata } from 'next'
import { CheckoutPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'

export const metadata: Metadata = {
  title: 'Sifarişin tamamlanması',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  )
}
