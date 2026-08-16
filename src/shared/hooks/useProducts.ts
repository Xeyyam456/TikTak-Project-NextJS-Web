import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import type { Product } from '@/types'

export const productsQueryKey = ['products']

export function useProducts(enabled = true) {
    return useQuery({
        queryKey: productsQueryKey,
        queryFn: () => productService.list().then((res) => res.data),
        enabled: enabled && !!getAccessToken(),
    })
}

// `initialData` seeds the query with SSR-fetched data (when the route has it) so no
// client fetch happens on mount; routes without SSR data (e.g. /favorites/[id]) pass
// no initialProduct and fall back to a normal client-side fetch.
export function useProduct(productId: number, initialProduct?: Product | null) {
    return useQuery({
        queryKey: [...productsQueryKey, productId],
        queryFn: () => productService.getById(productId).then((res) => res.data),
        initialData: initialProduct ?? undefined,
        enabled: !!getAccessToken(),
    })
}
