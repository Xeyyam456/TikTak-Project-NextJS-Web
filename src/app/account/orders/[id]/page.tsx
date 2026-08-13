import type { Metadata } from 'next'
import { OrderDetailSection } from '@/views'
import { orderService } from '@/services'
import type { OrderPageParams } from '@/types'
import { buildMetadata } from '@/shared/utils/seo'

export async function generateMetadata({ params }: OrderPageParams): Promise<Metadata> {
  const { id } = await params
  const path = `/account/orders/${id}`
  try {
    const order = await orderService.getById(Number(id))
    return buildMetadata({
      title: `Sifariş #${order.orderNumber}`,
      description: 'TIK TAK sifariş detallarınızı görün.',
      path,
    })
  } catch {
    return buildMetadata({ title: 'Sifariş detalları', description: 'TIK TAK sifariş detallarınızı görün.', path })
  }
}

export default async function Page({ params }: OrderPageParams) {
  const { id } = await params
  return <OrderDetailSection orderId={Number(id)} />
}
