import type { Basket } from '../basket'

export interface OrderSummaryCardProps {
  basket: Basket | undefined
  height?: number
}
