import type { Product } from './Product'

export interface ProductDetailPageProps {
  productId: number
  initialProduct?: Product | null
}
