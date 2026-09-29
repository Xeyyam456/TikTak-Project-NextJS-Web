import type { Basket, BasketItem, Product } from '@/types'

const toBasket = (items: BasketItem[]): Basket => ({
    items,
    count: items.length,
    total: items.reduce((sum, item) => sum + Number(item.total_price), 0).toFixed(2),
})

const withQuantity = (item: BasketItem, quantity: number): BasketItem => ({
    ...item,
    quantity,
    total_price: (Number(item.product.price) * quantity).toFixed(2),
})

const hasProduct = (basket: Basket | undefined, productId: number) =>
    basket?.items.some((item) => item.product.id === productId) ?? false

const addProduct = (basket: Basket, product: Product) =>
    toBasket(
        hasProduct(basket, product.id)
            ? basket.items.map((item) =>
                  item.product.id === product.id ? withQuantity(item, item.quantity + 1) : item,
              )
            : [...basket.items, withQuantity({ id: Number.MAX_SAFE_INTEGER, quantity: 0, total_price: '0', product }, 1)],
    )

const decrementProduct = (basket: Basket, productId: number) =>
    toBasket(
        basket.items.map((item) =>
            item.product.id === productId && item.quantity > 1 ? withQuantity(item, item.quantity - 1) : item,
        ),
    )

const removeProduct = (basket: Basket, productId: number) =>
    toBasket(basket.items.filter((item) => item.product.id !== productId))

export const basketOptimistic = { hasProduct, addProduct, decrementProduct, removeProduct, empty: () => toBasket([]) }
