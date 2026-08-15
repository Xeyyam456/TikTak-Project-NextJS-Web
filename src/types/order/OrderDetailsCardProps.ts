import type { RefObject } from 'react'
import type { PaymentMethod } from './PaymentMethod'
import type { User } from '../user'

export interface OrderDetailsCardProps {
  cardRef: RefObject<HTMLDivElement | null>
  profile: User | null
  note: string
  onNoteChange: (note: string) => void
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
  error: string | null
  submitting: boolean
  onSubmit: () => void
}
