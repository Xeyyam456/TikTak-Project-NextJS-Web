'use client'

import { useEffect, useState } from 'react'
import { CategoryProductCard, Loader } from '@/shared/components'
import { productService } from '@/services'
import type { CategoryProductsSectionProps, Product } from '@/types'
import { useCategorySidebarHeight } from './CategoryDetailLayout'

export function CategoryProductsSection({ categoryId }: CategoryProductsSectionProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const sidebarHeight = useCategorySidebarHeight()

    useEffect(() => {
        productService
            .list()
            .then((res) => setProducts(res.data.filter((product) => product.category.id === categoryId)))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false))
    }, [categoryId])

    if (loading) {
        return (
            <div
                style={{ height: sidebarHeight }}
                className="flex flex-1 items-center justify-center rounded-2xl border border-neutral-100 bg-white shadow-sm"
            >
                <Loader />
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div
                style={{ height: sidebarHeight }}
                className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white px-6 text-center shadow-sm"
            >
                <svg viewBox="0 0 64 64" className="h-16 w-16 text-neutral-300">
                    <circle cx="27" cy="27" r="16" fill="none" stroke="currentColor" strokeWidth="4" />
                    <line x1="38.5" y1="38.5" x2="52" y2="52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <line x1="20" y1="27" x2="34" y2="27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <p className="mt-4 text-2xl font-bold text-neutral-700">Axtardığınız məhsul tapılmadı</p>
                <p className="mt-2 text-sm text-neutral-400">Bu kateqoriyada hələ heç bir məhsul yoxdur</p>
            </div>
        )
    }

    return (
        <div
            style={{ height: sidebarHeight }}
            className="grid flex-1 grid-cols-2 content-between gap-x-[12px] sm:grid-cols-3 md:grid-cols-4"
        >
            {products.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
