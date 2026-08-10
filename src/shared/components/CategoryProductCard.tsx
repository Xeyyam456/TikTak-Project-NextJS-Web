'use client'

import { useState } from 'react'
import { basketService } from '@/services'
import type { CategoryProductCardProps } from '@/types'

export function CategoryProductCard({ product }: CategoryProductCardProps) {
    const [quantity, setQuantity] = useState(0)

    const handleIncrease = () => {
        setQuantity((q) => q + 1)
        basketService.add(product.id).catch(() => setQuantity((q) => Math.max(0, q - 1)))
    }

    const handleDecrease = () => {
        setQuantity((q) => Math.max(0, q - 1))
        basketService.remove(product.id).catch(() => setQuantity((q) => q + 1))
    }

    return (
        <div className="mx-auto flex w-full max-w-[220px] cursor-pointer flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm transition-transform duration-200 hover:z-10 hover:scale-105 hover:shadow-lg">
            <div className="relative mb-3 flex h-28 w-full items-center justify-center">
                {product.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.img_url} alt={product.title} className="max-h-full max-w-full object-contain" />
                )}
            </div>
            <p className="text-base font-bold text-neutral-900">{product.title}</p>
            <p className="mt-1 text-base text-neutral-500">{product.price} AZN</p>

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
