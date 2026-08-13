import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { basketService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import type { Basket } from '@/types'

export const basketQueryKey = ['basket']

export function useBasket() {
    return useQuery({
        queryKey: basketQueryKey,
        queryFn: () => basketService.list().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useBasketMutations() {
    const queryClient = useQueryClient()
    const invalidate = () => queryClient.invalidateQueries({ queryKey: basketQueryKey })

    const add = useMutation({
        mutationFn: (productId: number) => basketService.add(productId),
        onMutate: (productId: number) => {
            const basket = queryClient.getQueryData<Basket>(basketQueryKey)
            const alreadyInBasket = basket?.items.some((item) => item.product.id === productId) ?? false
            return { alreadyInBasket }
        },
        onSuccess: (_data, _productId, context) => {
            invalidate()
            toast.success(context?.alreadyInBasket ? 'Məhsulun sayı artırıldı' : 'Məhsul səbətə əlavə edildi')
        },
    })
    const remove = useMutation({
        mutationFn: (productId: number) => basketService.remove(productId),
        onSuccess: () => {
            invalidate()
            toast.success('Məhsulun sayı azaldıldı')
        },
    })
    const removeAll = useMutation({
        mutationFn: (productId: number) => basketService.removeAll(productId),
        onSuccess: () => {
            invalidate()
            toast.success('Məhsul səbətdən silindi')
        },
    })
    const clear = useMutation({
        mutationFn: () => basketService.clear(),
        onSuccess: () => {
            invalidate()
            toast.success('Səbət təmizləndi')
        },
    })

    return { add, remove, removeAll, clear }
}
