import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { basketService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import { basketOptimistic as optimistic } from '@/shared/utils/basketOptimistic'
import type { Basket, Product } from '@/types'

export const basketQueryKey = ['basket']
const basketMutationKey = ['basket-mutation']

export function useBasket() {
    return useQuery({
        queryKey: basketQueryKey,
        queryFn: () => basketService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

// UI updates instantly from the cache while the request runs in the background;
// the snapshot taken in onMutate is restored if it fails.
function useBasketMutation<V>(config: {
    request: (variables: V) => Promise<unknown>
    update: (basket: Basket, variables: V) => Basket
    message: (basket: Basket | undefined, variables: V) => string
}) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationKey: basketMutationKey,
        mutationFn: (variables: V) => {
            if (getAccessToken()) return config.request(variables)
            router.push('/login')
            return Promise.reject(new Error('AUTH_REQUIRED'))
        },
        onMutate: async (variables: V) => {
            if (!getAccessToken()) return { previous: undefined }
            await queryClient.cancelQueries({ queryKey: basketQueryKey })
            const previous = queryClient.getQueryData<Basket>(basketQueryKey)
            if (previous) queryClient.setQueryData(basketQueryKey, config.update(previous, variables))
            toast.success(config.message(previous, variables))
            return { previous }
        },
        onError: (error, _variables, context) => {
            if (context?.previous) queryClient.setQueryData(basketQueryKey, context.previous)
            if (error.message !== 'AUTH_REQUIRED') toast.error('Xəta baş verdi, yenidən cəhd edin')
        },
        // Refetch only after the last in-flight mutation, so an early refetch
        // can't overwrite the optimistic state of a click that's still pending.
        onSettled: () => {
            if (queryClient.isMutating({ mutationKey: basketMutationKey }) === 1) {
                queryClient.invalidateQueries({ queryKey: basketQueryKey })
            }
        },
    })
}

export function useBasketMutations() {
    const add = useBasketMutation<Product>({
        request: (product) => basketService.add(product.id),
        update: optimistic.addProduct,
        message: (basket, product) =>
            optimistic.hasProduct(basket, product.id) ? 'Məhsulun sayı artırıldı' : 'Məhsul səbətə əlavə edildi',
    })
    const remove = useBasketMutation<number>({
        request: basketService.remove,
        update: optimistic.decrementProduct,
        message: () => 'Məhsulun sayı azaldıldı',
    })
    const removeAll = useBasketMutation<number>({
        request: basketService.removeAll,
        update: optimistic.removeProduct,
        message: () => 'Məhsul səbətdən silindi',
    })
    const clear = useBasketMutation<void>({
        request: () => basketService.clear(),
        update: optimistic.empty,
        message: () => 'Səbət təmizləndi',
    })

    return { add, remove, removeAll, clear }
}
