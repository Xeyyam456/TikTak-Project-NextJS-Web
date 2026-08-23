'use client'

import { useEffect } from 'react'
import { CategoryProductCard, Pagination } from '@/shared/components'
import { useGridFit } from '@/shared/hooks/useGridFit'
import type { FavoritesGridProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'
import { clampToViewport } from '../utils'
import { BASKET_PANEL_HEIGHT } from '../constants'

// Same fluid-fit behaviour as the other grids: 180px min columns, rows measured against the
// panel height, cards bottom-aligned with the basket panel. Card height self-calibrates.
const GRID_FIT = {
    cardMinWidth: 180,
    columnGap: 15,
    rowGap: 24,
    fallbackCardHeight: 244,
    reservedFooter: 52,
    defaultPageSize: 10,
}

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
