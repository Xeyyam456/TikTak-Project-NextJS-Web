import type { Product } from './Product'

export interface CategoryProductCardProps {
  product: Product
  onSelect?: (productId: number) => void
}
