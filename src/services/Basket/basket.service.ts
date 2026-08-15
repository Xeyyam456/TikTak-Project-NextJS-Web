import type { ApiResponse, Basket } from '@/types'
import httpClient from '../httpClient'

export const basketService = {
  list() {
    return httpClient.get<ApiResponse<Basket>>('/basket')
  },
  add(productId: number) {
    return httpClient.post<ApiResponse<Basket>>(`/basket/${productId}/add`)
  },
  remove(productId: number) {
    return httpClient.post<ApiResponse<Basket>>(`/basket/${productId}/remove`)
  },
  removeAll(productId: number) {
    return httpClient.delete<ApiResponse<Basket>>(`/basket/${productId}/remove-all`)
  },
  clear() {
    return httpClient.delete<ApiResponse<Basket>>('/basket/clear')
  },
}
