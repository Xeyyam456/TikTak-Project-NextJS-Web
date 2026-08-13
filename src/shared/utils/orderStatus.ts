import { OrderStatus } from '@/types'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Gözləmədə',
    [OrderStatus.CONFIRMED]: 'Təsdiqləndi',
    [OrderStatus.PREPARING]: 'Hazırlanır',
    [OrderStatus.READY]: 'Hazırdır',
    [OrderStatus.DELIVERED]: 'Tamamlandı',
    [OrderStatus.CANCELLED]: 'Ləğv edildi',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'text-neutral-500',
    [OrderStatus.CONFIRMED]: 'text-blue-600',
    [OrderStatus.PREPARING]: 'text-amber-600',
    [OrderStatus.READY]: 'text-blue-600',
    [OrderStatus.DELIVERED]: 'text-[#0A955E]',
    [OrderStatus.CANCELLED]: 'text-red-500',
}
