import type { User } from '../user'
import type { OrderItem } from './OrderItem'
import type { OrderStatus } from './OrderStatus'
import type { PaymentMethod } from './PaymentMethod'

export interface Order {
  id: number
  orderNumber: string
  total: string
  deliveryFee: string
  paymentMethod: PaymentMethod
  status: OrderStatus
  note: string | null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
  user?: Pick<User, 'id' | 'full_name' | 'img_url'>
  items: OrderItem[]
}
