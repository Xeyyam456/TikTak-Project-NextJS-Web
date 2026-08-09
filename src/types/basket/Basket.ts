import type { BasketItem } from './BasketItem'

export interface Basket {
  items: BasketItem[]
  total: string
  count: number
}
