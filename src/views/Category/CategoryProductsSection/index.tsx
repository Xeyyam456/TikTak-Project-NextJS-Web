'use client'

import { SearchX } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { CategoryProductCard, Pagination } from '@/shared/components'
import type { CategoryProductsSectionProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

// Matches the 2-visible-rows convention used by ProductsGrid/FavoritesGrid — caps the
// grid's height so it can never outgrow the sidebar-stretched box (see CategoryDetailLayout).
const COLUMNS = 4
const VISIBLE_ROWS = 2
const PAGE_SIZE = COLUMNS * VISIBLE_ROWS

export function CategoryProductsSection({ products, categoryName }: CategoryProductsSectionProps) {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const searchParams = useSearchParams()
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

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

    const totalPages = getTotalPages(products.length, PAGE_SIZE)
    const pagedProducts = paginate(products, currentPage, PAGE_SIZE)

    return (
        <div className="flex h-full flex-col">
            <h1 className="sr-only">{categoryName ?? 'Kateqoriya'}</h1>
            <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px] sm:grid-cols-3 md:grid-cols-4">
                {pagedProducts.map((product) => (
                    <CategoryProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => router.push(`/categories/${params.id}?page=${page}`)}
                total={products.length}
                pageSize={PAGE_SIZE}
                className="mt-auto pt-4"
            />
        </div>
    )
}
