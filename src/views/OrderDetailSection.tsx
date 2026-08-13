'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Loader } from '@/shared/components'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/shared/utils/orderStatus'
import { useOrder } from '@/shared/hooks/useOrders'
import { PaymentMethod } from '@/types'
import type { OrderDetailSectionProps } from '@/types'

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'Qapıda nağd ödəmə',
    [PaymentMethod.CARD]: 'Qapıda kart ilə ödəmə',
}

function formatDateTime(iso: string) {
    const date = new Date(iso)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
}

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
            <button
                type="button"
                onClick={() => router.push('/account/orders')}
                className="group flex w-fit flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-[8px] border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-[#92D871] hover:bg-[#EFF9EA] hover:text-[#0A955E] hover:shadow-md"
            >
                <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
                geri qayıt
            </button>

            <div className="mt-8 grid flex-shrink-0 grid-cols-3 gap-x-6 gap-y-6 text-sm">
                <div>
                    <p className="font-medium text-neutral-900">Sifariş nömrəsi</p>
                    <p className="mt-1 text-neutral-500">{order.orderNumber}</p>
                </div>
                <div>
                    <p className="font-medium text-neutral-900">Sifariş vaxtı</p>
                    <p className="mt-1 text-neutral-500">{formatDateTime(order.createdAt)}</p>
                </div>
                <div>
                    <p className="font-medium text-neutral-900">Status</p>
                    <p className={`mt-1 font-semibold ${ORDER_STATUS_COLORS[order.status]}`}>
                        {ORDER_STATUS_LABELS[order.status]}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-neutral-900">Çatdırılma ünvanı</p>
                    <p className="mt-1 text-neutral-500">{order.address}</p>
                </div>
                <div>
                    <p className="font-medium text-neutral-900">Telefon nömrəsi</p>
                    <p className="mt-1 text-neutral-500">{order.phone}</p>
                </div>
                <div>
                    <p className="font-medium text-neutral-900">Ödəniş metodu</p>
                    <p className="mt-1 text-neutral-500">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
                </div>
                {order.note && (
                    <div className="col-span-3">
                        <p className="font-medium text-neutral-900">Qeyd</p>
                        <p className="mt-1 text-neutral-500">{order.note}</p>
                    </div>
                )}
            </div>

            <h3 className="mb-4 mt-10 flex-shrink-0 text-base font-semibold text-neutral-900">Məhsullar</h3>

            <div className="scrollbar-hide max-h-[186px] min-h-0 flex-1 overflow-y-auto">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-neutral-100 py-2.5 last:border-b-0"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.product.img_url || PRODUCT_IMAGE_FALLBACK}
                                alt={item.product.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <p className="min-w-0 flex-1 truncate text-xs text-neutral-700">
                            {item.product.title} {item.quantity}
                            {item.product.type}
                        </p>
                        <p className="w-16 flex-shrink-0 text-center text-xs text-neutral-500">{item.quantity}</p>
                        <p className="flex-shrink-0 text-xs text-neutral-500">{item.total_price} AZN</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-shrink-0 items-center justify-between text-base font-bold text-neutral-900">
                <span>Yekun məbləğ:</span>
                <span>{order.total} AZN</span>
            </div>
        </div>
    )
}
