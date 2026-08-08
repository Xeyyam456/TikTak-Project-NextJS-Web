import type { Product } from './product.model'

export interface BasketItem {
  id: number
  quantity: number
  total_price: string
  product: Product
}

export interface Basket {
  items: BasketItem[]
  total: string
  count: number
}
