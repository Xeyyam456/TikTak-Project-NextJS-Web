import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
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
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
            const wasAdded = res.message.toLowerCase().includes('added')
            toast.success(wasAdded ? 'Seçilmişlərə əlavə edildi' : 'Seçilmişlərdən silindi')
        },
    })
}
