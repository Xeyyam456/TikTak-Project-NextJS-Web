import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services'
import { getAccessToken } from '@/services/httpClient'

export const productsQueryKey = ['products']

export function useProducts(enabled = true) {
    return useQuery({
        queryKey: productsQueryKey,
        queryFn: () => productService.list().then((res) => res.data),
        enabled: enabled && !!getAccessToken(),
    })
}
