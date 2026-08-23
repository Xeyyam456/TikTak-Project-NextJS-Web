'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BasketSidebarPanel, CategoryProductCard, EmptyStateCard, Pagination } from '@/shared/components'
import { useGridFit } from '@/shared/hooks/useGridFit'
import type { ProductsGridProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

const BASKET_PANEL_HEIGHT = 594
const VIEWPORT_RESERVED = 180
const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`

// Same fluid-fit behaviour as the category grid: 180px min columns, rows measured against the
// panel height, cards bottom-aligned with the basket panel. Card height self-calibrates.
const GRID_FIT = {
  cardMinWidth: 180,
  columnGap: 15,
  rowGap: 24,
  fallbackCardHeight: 244,
  reservedFooter: 52,
  defaultPageSize: 10,
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

  const { boxRef, gridRef, pageSize } = useGridFit(GRID_FIT)

  const totalPages = getTotalPages(products.length, pageSize)
  const showPagination = totalPages > 1
  const safePage = Math.min(currentPage, totalPages)
  const pagedProducts = paginate(products, safePage, pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      router.replace(totalPages > 1 ? `/products?page=${totalPages}` : '/products')
    }
  }, [currentPage, totalPages, router])

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        {products.length === 0 ? (
          <EmptyStateCard
            height={clampToViewport(BASKET_PANEL_HEIGHT)}
            title="Hazırda məhsul yoxdur"
            subtitle="Zəhmət olmasa daha sonra yenidən yoxlayın"
          />
        ) : (
          <div ref={boxRef} className="flex flex-col" style={{ height: clampToViewport(BASKET_PANEL_HEIGHT) }}>
            <div
              ref={gridRef}
              className="grid min-h-0 flex-1 content-between grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-[15px] gap-y-[24px]"
            >
              {pagedProducts.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>

            {showPagination && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => router.push(`/products?page=${page}`)}
                total={products.length}
                pageSize={pageSize}
                className="flex-shrink-0 pt-3"
              />
            )}
          </div>
        )}
      </div>

      <BasketSidebarPanel height={clampToViewport(BASKET_PANEL_HEIGHT)} headingOffset={-32} />
    </div>
  )
}
