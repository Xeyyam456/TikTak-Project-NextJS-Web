import type { MouseEvent } from 'react'
import type { ProductMeasure } from './ProductMeasure'

export interface QuantityStepperProps {
  quantity: number
  type: ProductMeasure
  onIncrease: (e: MouseEvent) => void
  onDecrease: (e: MouseEvent) => void
}
