import type { CheckoutPayload, Order } from '@/models'
import httpClient from './httpClient'

export const orderService = {
  checkout(payload: CheckoutPayload) {
    return httpClient.post<Order>('/orders/checkout', payload)
  },
  list() {
    return httpClient.get<Order[]>('/orders/user')
  },
  getById(id: number) {
    return httpClient.get<Order>(`/orders/user/${id}`)
  },
}
