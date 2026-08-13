'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Heart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Loader } from './ui/Loader'
import { ConfirmModal } from './ui/ConfirmModal'
import { useBasket, useBasketMutations } from '@/shared/hooks/useBasket'
import { useFavorites, useToggleFavorite } from '@/shared/hooks/useFavorites'
import { PRODUCT_IMAGE_FALLBACK } from '@/shared/constants/images'
import type { Product, ProductDetailContentProps } from '@/types'
import { productService } from '@/services'

export function ProductDetailContent({ productId, height, className = '', onBack }: ProductDetailContentProps) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    const { data: basket } = useBasket()
    const { add, removeAll } = useBasketMutations()
    const { data: favorites } = useFavorites()
    const toggleFavorite = useToggleFavorite()
    const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false)

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

    const handleAddToBasket = () => {
        if (quantity > 0) {
            toast.info('Bu məhsul artıq səbətdədir')
            return
        }
        add.mutate(product.id)
    }
    const handleConfirmRemove = () => {
        removeAll.mutate(product.id)
        setConfirmRemoveOpen(false)
    }
    const handleToggleFavorite = () => toggleFavorite.mutate(product.id)

    return (
        <div style={{ height }} className={`flex flex-col rounded-2xl bg-white shadow-sm ${className}`}>
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

            <div className="mt-8 flex flex-1 items-center">
                <div className="flex w-full flex-col gap-10 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.img_url || PRODUCT_IMAGE_FALLBACK}
                            alt={product.title}
                            className="max-h-[300px] max-w-full w-auto object-contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">{product.description}</p>
                        <p className="mt-4 text-2xl font-bold text-neutral-900">{product.price} AZN</p>

                        {quantity > 0 ? (
                            <div className="mt-6 flex w-full max-w-xs items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleAddToBasket}
                                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#92D871] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7CB760]"
                                >
                                    <Check size={18} />
                                    Səbətdədir
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setConfirmRemoveOpen(true)}
                                    aria-label="Səbətdən sil"
                                    className="flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#F4A6A6] px-4 py-3.5 text-white transition-colors hover:bg-[#EF8A8A]"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAddToBasket}
                                className="mt-6 w-full max-w-xs cursor-pointer rounded-full bg-[#92D871] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#7CB760]"
                            >
                                Səbətə əlavə et
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={confirmRemoveOpen}
                title="Məhsulu səbətdən silmək istəyirsiniz?"
                description={product.title}
                onConfirm={handleConfirmRemove}
                onCancel={() => setConfirmRemoveOpen(false)}
            />
        </div>
    )
}
