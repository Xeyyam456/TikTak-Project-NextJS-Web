'use client'

import { SearchX } from 'lucide-react'
import { CategoryProductCard } from '@/shared/components'
import type { CategoryProductsSectionProps } from '@/types'

export function CategoryProductsSection({ products, categoryName }: CategoryProductsSectionProps) {
    // `h-full` fills the layout's stretched wrapper (which is sized to the sidebar via CSS),
    // so no JS-measured height is needed anymore.
    if (products.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white px-6 text-center shadow-sm">
                <h1 className="sr-only">{categoryName ?? 'Kateqoriya'}</h1>
                <SearchX className="h-16 w-16 text-neutral-300" strokeWidth={1.5} />
                <p className="mt-4 text-2xl font-bold text-neutral-700">Axtardığınız məhsul tapılmadı</p>
                <p className="mt-2 text-sm text-neutral-400">Bu kateqoriyada hələ heç bir məhsul yoxdur</p>
            </div>
        )
    }

    return (
        <div className="grid h-full grid-cols-2 content-between gap-x-[12px] sm:grid-cols-3 md:grid-cols-4">
            <h1 className="sr-only">{categoryName ?? 'Kateqoriya'}</h1>
            {products.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
