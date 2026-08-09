import type { PaymentMethod } from './PaymentMethod'

export interface CheckoutPayload {
  paymentMethod: PaymentMethod
  note?: string
  address: string
  phone: string
}
