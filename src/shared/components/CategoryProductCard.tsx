'use client'

import { Heart } from 'lucide-react'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useFavorites, useToggleFavorite } from '@/shared/hooks/useFavorites'
import type { CategoryProductCardProps } from '@/types'

export function CategoryProductCard({ product }: CategoryProductCardProps) {
    const { data: basket } = useBasket()
    const { add, remove } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()

    const quantity = basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0
    const isFavorite = favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false

    const handleIncrease = () => add.mutate(product.id)
    const handleDecrease = () => remove.mutate(product.id)
    const handleToggleFavorite = () => toggleFavorite.mutate(product.id)

    return (
        <div className="relative z-10 mx-auto flex w-full max-w-[220px] !cursor-pointer flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm transition-transform duration-200 hover:z-20 hover:scale-105 hover:shadow-lg">
            <button
                type="button"
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
                className={`absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ease-out hover:scale-110 active:scale-90 ${
                    isFavorite
                        ? 'bg-[#F4A6A6]/15 shadow-[0_2px_10px_rgba(244,166,166,0.45)]'
                        : 'bg-white/70 shadow-sm hover:bg-white/90'
                }`}
            >
                <Heart
                    size={17}
                    strokeWidth={2}
                    className={`transition-all duration-200 ${
                        isFavorite ? 'scale-110 fill-[#F4A6A6] text-[#F4A6A6]' : 'text-neutral-400'
                    }`}
                />
            </button>
            <div className="relative mb-3 flex h-[112px] w-full cursor-pointer items-center justify-center">
                {product.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.img_url} alt={product.title} className="max-h-full max-w-full object-contain" />
                )}
            </div>
            <p className="cursor-pointer text-base font-bold text-neutral-900">{product.title}</p>
            <p className="mt-1 cursor-pointer text-base text-neutral-500">{product.price} AZN</p>

            {quantity === 0 ? (
                <button
                    type="button"
                    onClick={handleIncrease}
                    className="mt-3 w-full cursor-pointer rounded-full bg-[#92D871] px-2 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7CB760]"
                >
                    Səbətə əlavə et
                </button>
            ) : (
                <div className="mt-3 flex w-full items-center gap-1.5">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F4A6A6] text-base font-bold text-white transition-colors hover:bg-[#EF8A8A]"
                    >
                        −
                    </button>
                    <span className="flex h-9 flex-1 items-center justify-center rounded-full bg-[#92D871] text-sm font-semibold text-white">
                        {quantity} {product.type}
                    </span>
                    <button
                        type="button"
                        onClick={handleIncrease}
                        className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#92D871] text-base font-bold text-white transition-colors hover:bg-[#7CB760]"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    )
}
