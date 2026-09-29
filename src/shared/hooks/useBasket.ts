import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { basketService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import type { Basket, BasketItem, Product } from '@/types'

export const basketQueryKey = ['basket']
const basketMutationKey = ['basket-mutation']

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

export function useBasket() {
    return useQuery({
        queryKey: basketQueryKey,
        queryFn: () => basketService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useBasketMutations() {
    const queryClient = useQueryClient()
    const router = useRouter()

    const requireAuth = () => {
        if (getAccessToken()) return true
        router.push('/login')
        return false
    }

    // UI updates instantly from the cache; the request runs in the background and
    // the snapshot taken here is restored if it fails.
    const applyOptimistic = async (update: (basket: Basket) => Basket) => {
        if (!getAccessToken()) return { previous: undefined }
        await queryClient.cancelQueries({ queryKey: basketQueryKey })
        const previous = queryClient.getQueryData<Basket>(basketQueryKey)
        if (previous) queryClient.setQueryData<Basket>(basketQueryKey, update(previous))
        return { previous }
    }

    const handleError = (error: Error, _variables: unknown, context?: { previous?: Basket }) => {
        if (context?.previous) queryClient.setQueryData(basketQueryKey, context.previous)
        if (error.message !== 'AUTH_REQUIRED') toast.error('Xəta baş verdi, yenidən cəhd edin')
    }

    // Only refetch once the last in-flight mutation settles, so an early refetch
    // can't overwrite the optimistic state of a click that's still pending.
    const handleSettled = () => {
        if (queryClient.isMutating({ mutationKey: basketMutationKey }) === 1) {
            queryClient.invalidateQueries({ queryKey: basketQueryKey })
        }
    }

    const add = useMutation({
        mutationKey: basketMutationKey,
        mutationFn: (product: Product) => {
            if (!requireAuth()) return Promise.reject(new Error('AUTH_REQUIRED'))
            return basketService.add(product.id)
        },
        onMutate: async (product: Product) => {
            const current = queryClient.getQueryData<Basket>(basketQueryKey)
            const alreadyInBasket = current?.items.some((item) => item.product.id === product.id) ?? false
            const context = await applyOptimistic((basket) =>
                toBasket(
                    alreadyInBasket
                        ? basket.items.map((item) =>
                              item.product.id === product.id ? withQuantity(item, item.quantity + 1) : item,
                          )
                        : [...basket.items, withQuantity({ id: Number.MAX_SAFE_INTEGER, quantity: 0, total_price: '0', product }, 1)],
                ),
            )
            if (getAccessToken()) {
                toast.success(alreadyInBasket ? 'Məhsulun sayı artırıldı' : 'Məhsul səbətə əlavə edildi')
            }
            return context
        },
        onError: handleError,
        onSettled: handleSettled,
    })
    const remove = useMutation({
        mutationKey: basketMutationKey,
        mutationFn: (productId: number) => {
            if (!requireAuth()) return Promise.reject(new Error('AUTH_REQUIRED'))
            return basketService.remove(productId)
        },
        onMutate: async (productId: number) => {
            const context = await applyOptimistic((basket) =>
                toBasket(
                    basket.items.map((item) =>
                        item.product.id === productId && item.quantity > 1
                            ? withQuantity(item, item.quantity - 1)
                            : item,
                    ),
                ),
            )
            if (getAccessToken()) toast.success('Məhsulun sayı azaldıldı')
            return context
        },
        onError: handleError,
        onSettled: handleSettled,
    })
    const removeAll = useMutation({
        mutationKey: basketMutationKey,
        mutationFn: (productId: number) => {
            if (!requireAuth()) return Promise.reject(new Error('AUTH_REQUIRED'))
            return basketService.removeAll(productId)
        },
        onMutate: async (productId: number) => {
            const context = await applyOptimistic((basket) =>
                toBasket(basket.items.filter((item) => item.product.id !== productId)),
            )
            if (getAccessToken()) toast.success('Məhsul səbətdən silindi')
            return context
        },
        onError: handleError,
        onSettled: handleSettled,
    })
    const clear = useMutation({
        mutationKey: basketMutationKey,
        mutationFn: () => {
            if (!requireAuth()) return Promise.reject(new Error('AUTH_REQUIRED'))
            return basketService.clear()
        },
        onMutate: async () => {
            const context = await applyOptimistic(() => toBasket([]))
            if (getAccessToken()) toast.success('Səbət təmizləndi')
            return context
        },
        onError: (error, _variables, context) => handleError(error, _variables, context),
        onSettled: handleSettled,
    })

    return { add, remove, removeAll, clear }
}
