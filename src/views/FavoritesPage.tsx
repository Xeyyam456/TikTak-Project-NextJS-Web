'use client'

import { useEffect, useRef, useState } from 'react'
import { BasketSidebarPanel, CategoryProductCard, Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { useFavorites } from '@/shared/hooks/useFavorites'

const PANEL_HEIGHT = 697
const BASKET_PANEL_HEIGHT = 594
const COLUMNS = 5
const VISIBLE_ROWS = 2
const VIEWPORT_RESERVED = 180

const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`

export function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites()
  const gridRef = useRef<HTMLDivElement>(null)
  const [gridMaxHeight, setGridMaxHeight] = useState<number>()

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.children
    const visibleCount = COLUMNS * VISIBLE_ROWS
    if (cards.length <= visibleCount) {
      setGridMaxHeight(undefined)
      return
    }
    const gridTop = gridRef.current.getBoundingClientRect().top
    const lastVisibleCardBottom = cards[visibleCount - 1].getBoundingClientRect().bottom
    setGridMaxHeight(lastVisibleCardBottom - gridTop + 97)
  }, [favorites])

  if (isLoading) return <Loader />

  return (
    <Container className="-mt-[20px] overflow-hidden py-6">
      <h1 className="mb-4 ml-[10px] text-xl font-semibold text-neutral-900">Siyahılarım</h1>

      <div className="mt-[-15px] flex items-start gap-4">
        <div className="flex-1">
          {!favorites || favorites.length === 0 ? (
            <div
              style={{ height: clampToViewport(PANEL_HEIGHT) }}
              className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm"
            >
              <p className="text-lg font-semibold text-neutral-900">Seçilmişlər boşdur</p>
              <p className="mt-2 text-sm text-neutral-500">Bəyəndiyiniz məhsulları buraya əlavə edin</p>
            </div>
          ) : (
            <div
              ref={gridRef}
              style={{ maxHeight: gridMaxHeight ? clampToViewport(gridMaxHeight) : undefined }}
              className="scrollbar-hide grid grid-cols-5 gap-x-[15px] gap-y-[11px] overflow-y-auto px-[10px] pt-[15px] pb-[20px] [&>*]:!mx-0 [&>*]:mb-[50px]"
            >
              {favorites.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
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
