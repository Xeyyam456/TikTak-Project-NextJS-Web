'use client'

import { useState } from 'react'
import { basketService } from '@/services'
import type { CategoryProductCardProps } from '@/types'

export function CategoryProductCard({ product }: CategoryProductCardProps) {
    const [adding, setAdding] = useState(false)

    const handleAdd = () => {
        setAdding(true)
        basketService.add(product.id).finally(() => setAdding(false))
    }

    return (
        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
            <div className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                {product.img_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.img_url} alt={product.title} className="max-h-full max-w-full object-contain" />
                )}
            </div>
            <p className="text-sm font-semibold text-neutral-800">{product.title}</p>
            <p className="mt-1 text-sm text-neutral-500">{product.price} AZN</p>
            <button
                type="button"
                onClick={handleAdd}
                disabled={adding}
                className="mt-3 rounded-[8px] bg-[#92D871] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7CB760] disabled:opacity-50"
            >
                Səbətə əlavə et
            </button>
        </div>
    )
}
