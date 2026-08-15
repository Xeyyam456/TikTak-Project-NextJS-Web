import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import type { PaymentMethod } from './PaymentMethod'

export interface PaymentMethodOptionProps {
  icon: ComponentType<LucideProps>
  label: string
  selected: boolean
  onSelect: (method: PaymentMethod) => void
  method: PaymentMethod
}
