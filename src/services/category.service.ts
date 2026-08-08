import type { ApiResponse, Category } from '@/models'
import httpClient from './httpClient'

export const categoryService = {
  list() {
    return httpClient.get<ApiResponse<Category[]>>('/categories')
  },
}
