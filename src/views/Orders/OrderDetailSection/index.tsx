'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BackButton, Loader } from '@/shared/components'
import { useOrder } from '@/shared/hooks/useOrders'
import type { OrderDetailSectionProps } from '@/types'
import { OrderInfoGrid } from './components/OrderInfoGrid'
import { OrderItemsList } from './components/OrderItemsList'

export function OrderDetailSection({ orderId }: OrderDetailSectionProps) {
    const router = useRouter()
    const { data: order, isLoading } = useOrder(orderId)

    useEffect(() => {
        if (order) document.title = `Sifariş #${order.orderNumber} | TIK TAK`
    }, [order])

    if (isLoading) return <Loader />
    if (!order) return <p className="text-sm text-neutral-500">Sifariş tapılmadı.</p>

    return (
        <div className="flex max-h-[calc(100vh-260px)] flex-col">
            <BackButton onClick={() => router.push('/account/orders')} />

            <OrderInfoGrid order={order} />
            <OrderItemsList items={order.items} total={order.total} />
        </div>
    )
}
