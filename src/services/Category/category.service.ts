import type { ApiResponse, Category } from '@/types'
import httpClient from '../httpClient'

export const categoryService = {
  list() {
    return httpClient.get<ApiResponse<Category[]>>('/categories')
  },
}
