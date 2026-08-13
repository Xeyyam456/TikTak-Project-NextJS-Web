import type { Metadata } from 'next'
import { OrderDetailSection } from '@/views'
import type { OrderPageParams } from '@/types'

export const metadata: Metadata = {
  title: 'Sifariş detalları',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: OrderPageParams) {
  const { id } = await params
  return <OrderDetailSection orderId={Number(id)} />
}
