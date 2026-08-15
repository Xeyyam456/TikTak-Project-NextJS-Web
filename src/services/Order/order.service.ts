import type { ApiResponse, CheckoutPayload, Order } from '@/types'
import httpClient from './httpClient'

export const orderService = {
  checkout(payload: CheckoutPayload) {
    return httpClient.post<ApiResponse<Order>>('/orders/checkout', payload)
  },
  list() {
    return httpClient.get<ApiResponse<Order[]>>('/orders/user')
  },
  getById(id: number) {
    return httpClient.get<Order>(`/orders/user/${id}`)
  },
}
