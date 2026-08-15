import type { BasketItem } from './BasketItem'

export interface BasketPageItemRowProps {
  item: BasketItem
  onIncrease: () => void
  onDecreaseOrRemove: () => void
}
