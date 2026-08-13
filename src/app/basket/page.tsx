import type { Metadata } from 'next'
import { BasketPage } from '@/views'
import { RequireAuth } from '@/shared/components/auth/RequireAuth'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Səbətim',
  description: 'TIK TAK səbətinizdəki məhsulları nəzərdən keçirin və sifarişi tamamlayın.',
  path: '/basket',
})

export default function Page() {
  return (
    <RequireAuth>
      <BasketPage />
    </RequireAuth>
  )
}
