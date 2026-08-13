import type { Metadata } from 'next'
import { OrdersPage } from '@/views'
import { buildMetadata } from '@/shared/utils/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Sifarişlərim',
  description: 'TIK TAK sifariş tarixçənizi görün.',
  path: '/account/orders',
})

export default function Page() {
  return <OrdersPage />
}
