'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button, Loader } from '@/shared/components'
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
            <Button
                type="button"
                variant="ghost"
                onClick={() => router.push('/account/orders')}
                className="group flex w-fit flex-shrink-0 items-center gap-1.5 rounded-[8px] border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-[#92D871] hover:bg-[#EFF9EA] hover:text-[#0A955E] hover:shadow-md"
            >
                <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
                geri qayıt
            </Button>

            <OrderInfoGrid order={order} />
            <OrderItemsList items={order.items} total={order.total} />
        </div>
    )
}
