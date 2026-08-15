import type { BasketItem } from './BasketItem'

export interface BasketItemRowProps {
  item: BasketItem
  onRemoveClick: () => void
  onIncrease: () => void
  onDecrease: () => void
}
