'use client'

import { useEffect } from 'react'
import { SearchX } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { CategoryProductCard, Pagination } from '@/shared/components'
import { useGridFit } from '@/shared/hooks/useGridFit'
import type { CategoryProductsSectionProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'
import { GRID_FIT } from './constants'

export function CategoryProductsSection({ products, categoryName }: CategoryProductsSectionProps) {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const searchParams = useSearchParams()
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

    const { boxRef, gridRef, pageSize } = useGridFit(GRID_FIT)

    const totalPages = getTotalPages(products.length, pageSize)
    const showPagination = totalPages > 1
    const safePage = Math.min(currentPage, totalPages)
    const pagedProducts = paginate(products, safePage, pageSize)

    // Resizing wider can fit more per page and drop totalPages below the current ?page= — drop
    // the now-out-of-range page from the URL so it doesn't linger (safePage already clamps what
    // renders; this just keeps the URL honest).
    useEffect(() => {
        if (currentPage > totalPages) {
            router.replace(totalPages > 1 ? `/categories/${params.id}?page=${totalPages}` : `/categories/${params.id}`)
        }
    }, [currentPage, totalPages, params.id, router])

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

    // `content-between` distributes the rows down the flex-1 grid area so the last row sits on the
    // bottom edge — the cards line up with the bottom of the sidebar and basket columns instead of
    // leaving a gap. A single partial row (e.g. the last page) stays at the top. The pagination
    // footer only renders when there's more than one page, so a single-page category reclaims it.
    return (
        <div ref={boxRef} className="flex h-full flex-col">
            <h1 className="sr-only">{categoryName ?? 'Kateqoriya'}</h1>
            <div
                ref={gridRef}
                className="grid min-h-0 flex-1 content-between grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-[12px] gap-y-[24px]"
            >
                {pagedProducts.map((product) => (
                    <CategoryProductCard key={product.id} product={product} />
                ))}
            </div>

            {showPagination && (
                <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={(page) => router.push(`/categories/${params.id}?page=${page}`)}
                    total={products.length}
                    pageSize={pageSize}
                    className="flex-shrink-0 pt-3"
                />
            )}
        </div>
    )
}
