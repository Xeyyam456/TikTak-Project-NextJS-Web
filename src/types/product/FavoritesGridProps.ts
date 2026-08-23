import type { Product } from './Product'

export interface FavoritesGridProps {
  // Full favorites list — FavoritesGrid measures how many fit and paginates internally.
  products: Product[]
  currentPage: number
  onSelect: (id: number) => void
  onPageChange: (page: number) => void
}
