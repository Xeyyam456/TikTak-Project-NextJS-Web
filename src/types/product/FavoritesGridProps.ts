import type { Product } from './Product'

export interface FavoritesGridProps {
  products: Product[]
  currentPage: number
  totalPages: number
  total: number
  onSelect: (id: number) => void
  onPageChange: (page: number) => void
}
