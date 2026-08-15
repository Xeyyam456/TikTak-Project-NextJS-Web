'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { BasketSidebarPanel, CategoryProductCard, Pagination } from '@/shared/components'
import type { ProductsGridProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

const COLUMNS = 5
const VISIBLE_ROWS = 2
const PAGE_SIZE = COLUMNS * VISIBLE_ROWS
const BASKET_PANEL_HEIGHT = 594
const VIEWPORT_RESERVED = 180

const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

  const totalPages = getTotalPages(products.length, PAGE_SIZE)
  const pagedProducts = paginate(products, currentPage, PAGE_SIZE)

  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        {products.length === 0 ? (
          <div
            style={{ height: clampToViewport(BASKET_PANEL_HEIGHT) }}
            className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm"
          >
            <p className="text-lg font-semibold text-neutral-900">Hazırda məhsul yoxdur</p>
            <p className="mt-2 text-sm text-neutral-500">Zəhmət olmasa daha sonra yenidən yoxlayın</p>
          </div>
        ) : (
          <div style={{ minHeight: clampToViewport(BASKET_PANEL_HEIGHT) }} className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {pagedProducts.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => router.push(`/products?page=${page}`)}
              total={products.length}
              pageSize={PAGE_SIZE}
              className="mt-6"
            />
          </div>
        )}
      </div>

      <BasketSidebarPanel height={clampToViewport(BASKET_PANEL_HEIGHT)} headingOffset={-32} />
    </div>
  )
}
