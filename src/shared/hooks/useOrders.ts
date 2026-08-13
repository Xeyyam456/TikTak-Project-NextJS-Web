import { useQuery } from '@tanstack/react-query'
import { orderService } from '@/services'
import { getAccessToken } from '@/services/httpClient'

export const ordersQueryKey = ['orders']

export function useOrders() {
    return useQuery({
        queryKey: ordersQueryKey,
        queryFn: () => orderService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useOrder(orderId: number) {
    return useQuery({
        queryKey: [...ordersQueryKey, orderId],
        queryFn: () => orderService.getById(orderId),
        enabled: !!getAccessToken() && !!orderId,
    })
}
