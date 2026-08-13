'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart } from 'lucide-react'
import { Loader } from './ui/Loader'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useFavorites, useToggleFavorite } from '@/shared/hooks/useFavorites'
import type { Product, ProductDetailContentProps } from '@/types'
import { productService } from '@/services'

export function ProductDetailContent({ productId, height, className = '', onBack }: ProductDetailContentProps) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    const { data: basket } = useBasket()
    const { add, remove } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()

    useEffect(() => {
        productService
            .getById(productId)
            .then((res) => setProduct(res.data))
            .finally(() => setLoading(false))
    }, [productId])

    if (loading)
        return (
            <div style={{ height }} className={`flex items-center justify-center rounded-2xl bg-white shadow-sm ${className}`}>
                <Loader />
            </div>
        )

    if (!product)
        return (
            <div
                style={{ height }}
                className={`flex items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm ${className}`}
            >
                <p>Mehsul tapilmadi.</p>
            </div>
        )

    const quantity = basket?.items.find((item) => item.product.id === product.id)?.quantity ?? 0
    const isFavorite = favorites?.some((favorite) => favorite.id === product.id) ?? product.is_favorite ?? false

    const handleIncrease = () => add.mutate(product.id)
    const handleDecrease = () => remove.mutate(product.id)
    const handleToggleFavorite = () => toggleFavorite.mutate(product.id)

    return (
        <div style={{ height }} className={`rounded-2xl bg-white shadow-sm ${className}`}>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack ?? (() => router.back())}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                    <ArrowLeft size={18} />
                    geri qayıt
                </button>

                <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-label={isFavorite ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
                >
                    <Heart
                        size={24}
                        strokeWidth={2}
                        className={isFavorite ? 'fill-[#F4A6A6] text-[#F4A6A6]' : 'text-neutral-700'}
                    />
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center">
                <div className="flex flex-1 items-center justify-center">
                    {product.img_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.img_url} alt={product.title} className="max-h-[320px] w-auto object-contain" />
                    )}
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">{product.description}</p>
                    <p className="mt-4 text-2xl font-bold text-neutral-900">{product.price} AZN</p>

                    {quantity === 0 ? (
                        <button
                            type="button"
                            onClick={handleIncrease}
                            className="mt-6 w-full max-w-xs cursor-pointer rounded-full bg-[#92D871] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7CB760]"
                        >
                            Səbətə əlavə et
                        </button>
                    ) : (
                        <div className="mt-6 flex w-full max-w-xs items-center gap-2">
                            <button
                                type="button"
                                onClick={handleDecrease}
                                className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F4A6A6] text-lg font-bold text-white transition-colors hover:bg-[#EF8A8A]"
                            >
                                −
                            </button>
                            <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#92D871] text-base font-semibold text-white">
                                {quantity} {product.type}
                            </span>
                            <button
                                type="button"
                                onClick={handleIncrease}
                                className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#92D871] text-lg font-bold text-white transition-colors hover:bg-[#7CB760]"
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
