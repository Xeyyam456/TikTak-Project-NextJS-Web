import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { productService } from '@/services'
import { getAccessToken } from '@/services/httpClient'

export const favoritesQueryKey = ['favorites']

export function useFavorites() {
    return useQuery({
        queryKey: favoritesQueryKey,
        queryFn: () => productService.favorites().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useToggleFavorite() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (productId: number) => productService.toggleFavorite(productId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: favoritesQueryKey }),
    })
}
