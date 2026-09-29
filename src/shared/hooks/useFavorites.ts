import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { productService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import type { Product } from '@/types'

export const favoritesQueryKey = ['favorites']
const favoriteMutationKey = ['favorite-mutation']

export function useFavorites() {
    return useQuery({
        queryKey: favoritesQueryKey,
        queryFn: () => productService.favorites().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useToggleFavorite() {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationKey: favoriteMutationKey,
        mutationFn: (product: Product) => {
            if (!getAccessToken()) {
                router.push('/login')
                return Promise.reject(new Error('AUTH_REQUIRED'))
            }
            return productService.toggleFavorite(product.id)
        },
        // Heart flips instantly from the cache; the request runs in the background and
        // the snapshot is restored if it fails.
        onMutate: async (product: Product) => {
            if (!getAccessToken()) return { previous: undefined }
            await queryClient.cancelQueries({ queryKey: favoritesQueryKey })
            const previous = queryClient.getQueryData<Product[]>(favoritesQueryKey)
            const wasFavorite = previous?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false
            if (previous) {
                queryClient.setQueryData<Product[]>(
                    favoritesQueryKey,
                    wasFavorite
                        ? previous.filter((favorite) => favorite.id !== product.id)
                        : [...previous, { ...product, is_favorite: true }],
                )
            }
            toast.success(wasFavorite ? 'Seçilmişlərdən silindi' : 'Seçilmişlərə əlavə edildi')
            return { previous }
        },
        onError: (error, _product, context) => {
            if (context?.previous) queryClient.setQueryData(favoritesQueryKey, context.previous)
            if (error.message !== 'AUTH_REQUIRED') toast.error('Xəta baş verdi, yenidən cəhd edin')
        },
        onSettled: () => {
            if (queryClient.isMutating({ mutationKey: favoriteMutationKey }) === 1) {
                queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
            }
        },
    })
}
