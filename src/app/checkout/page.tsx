import type { Metadata } from 'next'
import { CheckoutPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Sifarişin tamamlanması',
  description: 'TIK TAK sifarişinizi tamamlayın.',
  path: '/checkout',
})

export default function Page() {
  return (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  )
}
