import type { Metadata } from 'next'
import { OrdersPage } from '@/views'

export const metadata: Metadata = {
  title: 'Sifarişlərim',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <OrdersPage />
}
