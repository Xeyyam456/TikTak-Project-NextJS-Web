import type { Product } from './Product'

export interface ProductDetailContentProps {
  productId: number
  initialProduct?: Product | null
  height?: number | string
  className?: string
  onBack?: () => void
}
