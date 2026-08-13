'use client'

import { useEffect, useState } from 'react'
import { BasketSidebarPanel, CategoryProductCard, Loader, Pagination, ProductDetailContent } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

const PANEL_HEIGHT = 697
const BASKET_PANEL_HEIGHT = 594
const COLUMNS = 5
const VISIBLE_ROWS = 2
const PAGE_SIZE = COLUMNS * VISIBLE_ROWS
const VIEWPORT_RESERVED = 180

const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`

export function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  const totalPages = getTotalPages(favorites?.length ?? 0, PAGE_SIZE)
  const pagedFavorites = paginate(favorites ?? [], currentPage, PAGE_SIZE)

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  if (isLoading) return <Loader />

  return (
    <Container className="-mt-[20px] overflow-hidden py-6">
      <h1 className="mb-4 ml-[10px] text-xl font-semibold text-neutral-900">Siyahılarım</h1>

      <div className="mt-[-15px] flex items-start gap-4">
        <div className="flex-1">
          {selectedProductId ? (
            <ProductDetailContent
              productId={selectedProductId}
              height={clampToViewport(BASKET_PANEL_HEIGHT)}
              className="p-6"
              onBack={() => setSelectedProductId(null)}
            />
          ) : !favorites || favorites.length === 0 ? (
            <div
              style={{ height: clampToViewport(PANEL_HEIGHT) }}
              className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm"
            >
              <p className="text-lg font-semibold text-neutral-900">Seçilmişlər boşdur</p>
              <p className="mt-2 text-sm text-neutral-500">Bəyəndiyiniz məhsulları buraya əlavə edin</p>
            </div>
          ) : (
            <div style={{ height: clampToViewport(BASKET_PANEL_HEIGHT) }} className="flex flex-col">
              <div className="grid grid-cols-5 gap-x-[15px] gap-y-[11px] px-[10px] pt-[15px] [&>*]:!mx-0">
                {pagedFavorites.map((product) => (
                  <CategoryProductCard key={product.id} product={product} onSelect={setSelectedProductId} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                total={favorites.length}
                pageSize={PAGE_SIZE}
                className="mt-auto pb-[10px]"
              />
            </div>
          )}
        </div>

        <div className="mt-[14px]">
          <BasketSidebarPanel height={clampToViewport(BASKET_PANEL_HEIGHT - 14)} headingOffset={-44} />
        </div>
      </div>
    </Container>
  )
}
