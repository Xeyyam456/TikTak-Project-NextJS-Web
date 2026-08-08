import type { OrderStatus, PaymentMethod } from '@/enums'
import type { Product } from './product.model'
import type { User } from './user.model'

export interface OrderItem {
  id: number
  quantity: number
  total_price: string
  product: Product
}

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

export interface CheckoutPayload {
  paymentMethod: PaymentMethod
  note?: string
  address: string
  phone: string
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus
}

export interface OrderStats {
  TOTAL: number
  DELIVERED: number
  PENDING: number
  PREPARING: number
  TOTAL_REVENUE: number
}
