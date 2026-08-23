import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useFavorites, useToggleFavorite } from '@/shared/hooks/useFavorites'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { useProduct } from '@/shared/hooks/useProducts'
import type { Product } from '@/types'

export function useProductDetail(productId: number, initialProduct?: Product | null) {
    const hasMounted = useHasMounted()
    const { data: product, isLoading: loading } = useProduct(productId, initialProduct)

    const { data: basket } = useBasket()
    const { add, removeAll } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()
    const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false)

    useEffect(() => {
        if (product) document.title = `${product.title} | TIK TAK`
    }, [product])

    const quantity =
        hasMounted && product ? (basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0) : 0
    const isFavorite =
        hasMounted && product
            ? (favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false)
            : false

    const handleAddToBasket = () => {
        if (!product) return
        if (quantity > 0) {
            toast.info('Bu məhsul artıq səbətdədir')
            return
        }
        add.mutate(product.id)
    }

    const handleConfirmRemove = () => {
        if (!product) return
        removeAll.mutate(product.id)
        setConfirmRemoveOpen(false)
    }

    return {
        product,
        loading,
        quantity,
        isFavorite,
        confirmRemoveOpen,
        setConfirmRemoveOpen,
        handleAddToBasket,
        handleConfirmRemove,
        toggleFavorite,
    }
}
