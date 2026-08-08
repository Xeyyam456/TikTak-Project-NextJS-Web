import { OrderStatus, PaymentMethod } from '@/enums'
import type { Order } from '@/models'
import products from './mehsullar'

const orders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-20250613-630',
    total: '18.89',
    deliveryFee: '0.00',
    paymentMethod: PaymentMethod.CARD,
    status: OrderStatus.PENDING,
    note: 'Zeng vurmadan qapiya qoyun',
    address: 'Baki, Nesimi rayonu, Aga Neymatulla',
    phone: '+994103193897',
    createdAt: '2025-06-13T07:35:41.867Z',
    updatedAt: '2025-06-13T07:35:41.867Z',
    items: [{ id: 1, quantity: 1, total_price: products[6].price, product: products[6] }],
  },
  {
    id: 2,
    orderNumber: 'ORD-20250616-771',
    total: '68.00',
    deliveryFee: '0.00',
    paymentMethod: PaymentMethod.CARD,
    status: OrderStatus.DELIVERED,
    note: null,
    address: 'Baki, Xetai rayonu',
    phone: '+994103193897',
    createdAt: '2025-06-16T09:00:00.000Z',
    updatedAt: '2025-06-16T15:20:00.000Z',
    items: [{ id: 2, quantity: 1, total_price: products[8].price, product: products[8] }],
  },
]

export default orders
