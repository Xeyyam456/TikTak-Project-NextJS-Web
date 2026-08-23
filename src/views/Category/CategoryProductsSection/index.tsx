'use client'

import { useRef, useState } from 'react'
import { SearchX } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { CategoryProductCard, Pagination } from '@/shared/components'
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect'
import type { CategoryProductsSectionProps } from '@/types'
import { getTotalPages, paginate } from '@/shared/utils/pagination'

// Must match the grid + card CSS below: auto-fill min column width, gaps, and card height.
// 180px (not the card's 220px max-width) is chosen so a full row of 4 cards fits at 100%
// browser zoom; wider viewports fit more columns fluidly.
const CARD_MIN_WIDTH = 180
const COLUMN_GAP = 12
const ROW_GAP = 24
const FALLBACK_CARD_HEIGHT = 244
// Fixed footer space reserved for the pagination row so the measured grid-area height stays
// stable whether or not pagination is currently shown (otherwise showing/hiding it would
// change the available height → change pageSize → toggle it again: an oscillation loop).
const PAGINATION_FOOTER = 52
// SSR / pre-measurement page size: keeps the server-rendered HTML populated with product
// cards (SEO — crawlers see the products) and matches the client's first render so there's
// no hydration mismatch. Refined to the exact fit on mount (see the layout effect below).
const DEFAULT_PAGE_SIZE = 8

export function CategoryProductsSection({ products, categoryName }: CategoryProductsSectionProps) {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const searchParams = useSearchParams()
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

    const gridAreaRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

    // Compute how many cards fit the CSS-stretched box (width × height) so pagination breaks
    // exactly at the box edge — no card ever spills below the sidebar-matched height, columns
    // stay fully fluid as the screen grows, and there's no scroll. NOTE: this measures only to
    // derive an item COUNT; it does NOT set any element's height (heights stay pure-CSS stretch),
    // so it does not reintroduce the JS-measured *height* that AGENTS.md warns against here.
    // Runs in a layout effect (before paint) so the exact count is applied before the first frame.
    useIsomorphicLayoutEffect(() => {
        const gridArea = gridAreaRef.current
        if (!gridArea) return
        const measure = () => {
            const { width, height } = gridArea.getBoundingClientRect()
            if (width === 0 || height === 0) return
            const cardHeight = (gridRef.current?.firstElementChild as HTMLElement | null)?.offsetHeight || FALLBACK_CARD_HEIGHT
            const columns = Math.max(1, Math.floor((width + COLUMN_GAP) / (CARD_MIN_WIDTH + COLUMN_GAP)))
            const rows = Math.max(1, Math.floor((height + ROW_GAP) / (cardHeight + ROW_GAP)))
            setPageSize(columns * rows)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(gridArea)
        return () => observer.disconnect()
    }, [])

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

    const totalPages = getTotalPages(products.length, pageSize)
    // Resizing wider can drop totalPages below the current page — clamp so we never render an
    // empty page (and Pagination highlights a valid page).
    const safePage = Math.min(currentPage, totalPages)
    const pagedProducts = paginate(products, safePage, pageSize)

    // Cards top-align in the flex-1 grid area; pagination is pinned to the bottom of the box so
    // it keeps a consistent position (it does NOT rise up to hug the cards when a page is only
    // partially filled — e.g. the last page with a few items).
    return (
        <div className="flex h-full flex-col">
            <h1 className="sr-only">{categoryName ?? 'Kateqoriya'}</h1>
            <div ref={gridAreaRef} className="min-h-0 flex-1">
                <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-[12px] gap-y-[24px]">
                    {pagedProducts.map((product) => (
                        <CategoryProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <div className="flex flex-shrink-0 items-end" style={{ minHeight: PAGINATION_FOOTER }}>
                <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={(page) => router.push(`/categories/${params.id}?page=${page}`)}
                    total={products.length}
                    pageSize={pageSize}
                    className="w-full pt-3"
                />
            </div>
        </div>
    )
}
