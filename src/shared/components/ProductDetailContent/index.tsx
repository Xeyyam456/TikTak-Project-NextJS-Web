'use client'

import { useRouter } from 'next/navigation'
import { Loader } from '../Loader'
import { ConfirmModal } from '../ConfirmModal'
import type { ProductDetailContentProps } from '@/types'
import { ProductHeader } from './components/ProductHeader'
import { ProductImage } from './components/ProductImage'
import { AddToBasketControl } from './components/AddToBasketControl'
import { useProductDetail } from './hooks/useProductDetail'

export function ProductDetailContent({
    productId,
    initialProduct = null,
    height,
    className = '',
    onBack,
}: ProductDetailContentProps) {
    const router = useRouter()
    const {
        product,
        loading,
        quantity,
        isFavorite,
        confirmRemoveOpen,
        setConfirmRemoveOpen,
        handleAddToBasket,
        handleConfirmRemove,
        toggleFavorite,
    } = useProductDetail(productId, initialProduct)

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

    return (
        <div style={{ height }} className={`flex flex-col rounded-2xl bg-white shadow-sm ${className}`}>
            <ProductHeader
                isFavorite={isFavorite}
                onBack={onBack ?? (() => router.back())}
                onToggleFavorite={() => toggleFavorite.mutate(product.id)}
            />

            <div className="mt-8 flex flex-1 items-center">
                <div className="flex w-full flex-col gap-10 md:flex-row md:items-center">
                    <ProductImage imgUrl={product.img_url} title={product.title} />

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-neutral-900">{product.title}</h1>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">{product.description}</p>
                        <p className="mt-4 text-2xl font-bold text-neutral-900">{product.price} AZN</p>

                        <AddToBasketControl
                            quantity={quantity}
                            onAdd={handleAddToBasket}
                            onRemove={() => setConfirmRemoveOpen(true)}
                        />
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
