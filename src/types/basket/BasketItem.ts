import type { Product } from '../product'

export interface BasketItem {
  id: number
  quantity: number
  total_price: string
  product: Product
}
