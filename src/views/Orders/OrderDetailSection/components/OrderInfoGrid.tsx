import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/shared/utils/orderStatus'
import type { OrderInfoGridProps } from '@/types'
import { PAYMENT_METHOD_LABELS } from '../constants'
import { formatDateTime } from '@/shared/utils/date'

export function OrderInfoGrid({ order }: OrderInfoGridProps) {
    return (
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
    )
}
