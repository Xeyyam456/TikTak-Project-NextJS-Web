import type { ApiResponse, ListQueryParams, PaginatedResponse, Product } from '@/types'
import httpClient from '../httpClient'

export const productService = {
  list(params?: ListQueryParams) {
    return httpClient.get<PaginatedResponse<Product>>('/products', { params })
  },
  getById(id: number) {
    return httpClient.get<ApiResponse<Product>>(`/products/${id}`)
  },
  favorites() {
    return httpClient.get<ApiResponse<Product[]>>('/products/favorites')
  },
  toggleFavorite(id: number) {
    return httpClient.post<ApiResponse<null>>(`/products/${id}/favorite`)
  },
}
