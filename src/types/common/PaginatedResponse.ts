import type { Pagination } from './Pagination'

export interface PaginatedResponse<T> {
  message: string
  data: T[]
  pagination: Pagination
  result: boolean
}
