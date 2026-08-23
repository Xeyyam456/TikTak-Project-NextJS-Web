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
// Vertical space kept for the pagination row. Subtracted from the box height when working out
// how many rows fit, ALWAYS (whether or not pagination ends up shown) so the row count never
// changes when pagination appears/disappears — and since it's far smaller than a card row,
// reserving it can never itself add/remove a row (no oscillation).
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

    const boxRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

    // Compute how many cards fit the CSS-stretched box (width × height) so pagination breaks
    // exactly at the box edge — no card ever spills below the sidebar-matched height, columns
    // stay fully fluid as the screen grows, and there's no scroll. NOTE: this measures only to
    // derive an item COUNT; it does NOT set any element's height (heights stay pure-CSS stretch),
    // so it does not reintroduce the JS-measured *height* that AGENTS.md warns against here.
    // The box (`boxRef`) is the h-full container whose height equals the sidebar's regardless of
    // its own content, so measuring it is stable — no feedback loop. Runs in a layout effect
    // (before paint) so the exact count is applied before the first frame.
    useIsomorphicLayoutEffect(() => {
        const box = boxRef.current
        if (!box) return
        const measure = () => {
            const { width, height } = box.getBoundingClientRect()
            if (width === 0 || height === 0) return
            const cardHeight = (gridRef.current?.firstElementChild as HTMLElement | null)?.offsetHeight || FALLBACK_CARD_HEIGHT
            const usableHeight = height - PAGINATION_FOOTER
            const columns = Math.max(1, Math.floor((width + COLUMN_GAP) / (CARD_MIN_WIDTH + COLUMN_GAP)))
            const rows = Math.max(1, Math.floor((usableHeight + ROW_GAP) / (cardHeight + ROW_GAP)))
            setPageSize(columns * rows)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(box)
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
    const showPagination = totalPages > 1
    // Resizing wider can drop totalPages below the current page — clamp so we never render an
    // empty page (and Pagination highlights a valid page).
    const safePage = Math.min(currentPage, totalPages)
    const pagedProducts = paginate(products, safePage, pageSize)

    // `content-between` distributes the rows down the flex-1 grid area: when the page is full
    // (or has no pagination) the last row sits on the bottom edge, so the cards line up with the
    // bottom of the sidebar and basket columns instead of leaving a gap. A single partial row
    // (e.g. the last page) stays at the top. The pagination footer only renders when there is
    // more than one page, so a single-page category reclaims that space for the cards.
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
