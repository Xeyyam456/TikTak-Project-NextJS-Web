import type { Product } from '../product'

export interface OrderItem {
  id: number
  quantity: number
  total_price: string
  product: Product
}
