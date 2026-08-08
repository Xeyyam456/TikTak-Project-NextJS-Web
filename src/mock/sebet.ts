import type { Basket } from '@/models'
import products from './mehsullar'

const basket: Basket = {
  items: [
    { id: 1, quantity: 1, total_price: products[1].price, product: products[1] },
    { id: 2, quantity: 2, total_price: '79.80', product: products[3] },
    { id: 3, quantity: 3, total_price: '56.70', product: products[9] },
  ],
  total: '426.40',
  count: 6,
}

export default basket
