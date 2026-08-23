'use client'

import { useEffect } from 'react'
import { CategoryProductCard, Pagination } from '@/shared/components'
import { useGridFit } from '@/shared/hooks/useGridFit'
import type { FavoritesGridProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'
import { BASKET_PANEL_HEIGHT, clampToViewport } from '@/shared/utils/viewport'
import { GRID_FIT } from '../constants'

export function FavoritesGrid({ products, currentPage, onSelect, onPageChange }: FavoritesGridProps) {
    const { boxRef, gridRef, pageSize } = useGridFit(GRID_FIT)

    const totalPages = getTotalPages(products.length, pageSize)
    const showPagination = totalPages > 1
    const safePage = Math.min(currentPage, totalPages)
    const pagedProducts = paginate(products, safePage, pageSize)

    useEffect(() => {
        if (currentPage > totalPages) onPageChange(totalPages)
    }, [currentPage, totalPages, onPageChange])

    return (
        <div ref={boxRef} className="flex flex-col" style={{ height: clampToViewport(BASKET_PANEL_HEIGHT) }}>
            <div
                ref={gridRef}
                className="grid min-h-0 flex-1 content-between grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-[15px] gap-y-[24px]"
            >
                {pagedProducts.map((product) => (
                    <CategoryProductCard key={product.id} product={product} onSelect={onSelect} />
                ))}
            </div>

            {showPagination && (
                <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    total={products.length}
                    pageSize={pageSize}
                    className="flex-shrink-0 pt-3"
                />
            )}
        </div>
    )
}
