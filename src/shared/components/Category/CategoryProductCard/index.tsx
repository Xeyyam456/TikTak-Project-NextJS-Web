'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useFavorites, useToggleFavorite } from '@/shared/hooks/useFavorites'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import { HeartToggle } from '@/shared/components/HeartToggle'
import type { CategoryProductCardProps } from '@/types'
import { QuantityStepper } from './components/QuantityStepper'

export function CategoryProductCard({ product, onSelect }: CategoryProductCardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams<{ id?: string }>()
    const hasMounted = useHasMounted()
    const { data: basket } = useBasket()
    const { add, remove, removeAll } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()

    const quantity = hasMounted ? (basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0) : 0
    const isFavorite = hasMounted
        ? (favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false)
        : false

    const handleOpenDetail = () => {
        if (onSelect) {
            onSelect(product.id)
            return
        }
        const isCategoryDetailPage = pathname.startsWith('/categories/') && !!params.id
        router.push(
            isCategoryDetailPage ? `/categories/${params.id}/products/${product.id}` : `/products/${product.id}`,
        )
    }
    const handleIncrease = (e: React.MouseEvent) => {
        e.stopPropagation()
        add.mutate(product.id)
    }
    const handleDecrease = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (quantity > 1) {
            remove.mutate(product.id)
        } else {
            removeAll.mutate(product.id)
        }
    }
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        toggleFavorite.mutate(product.id)
    }

    return (
        <div
            onClick={handleOpenDetail}
            className="relative z-10 mx-auto flex h-[244px] w-full max-w-[220px] !cursor-pointer flex-col items-center rounded-2xl bg-white p-3 text-center shadow-sm transition-transform duration-200 hover:z-20 hover:scale-105 hover:shadow-lg"
        >
            <HeartToggle isFavorite={isFavorite} onToggle={handleToggleFavorite} variant="card" />

            <div className="relative mb-2 flex h-[100px] w-full shrink-0 cursor-pointer items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={product.img_url || PRODUCT_IMAGE_FALLBACK}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            <div className="flex h-[48px] min-h-0 w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden">
                <p className="line-clamp-2 text-base font-bold leading-6 text-neutral-900">{product.title}</p>
            </div>

            <div className="mt-auto flex w-full flex-col items-center pt-2">
                <p className="mb-1 cursor-pointer text-base text-neutral-500">{product.price} AZN</p>

                <QuantityStepper
                    quantity={quantity}
                    type={product.type}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                />
            </div>
        </div>
    )
}
