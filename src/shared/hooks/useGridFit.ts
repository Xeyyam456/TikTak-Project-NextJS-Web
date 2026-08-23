import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import type { UseGridFitOptions, UseGridFitResult } from '@/types'

// Measures a card-grid's box (width × height) and returns how many cards fit, so a paginated
// grid can break exactly at the box edge: fully-fluid columns, rows that adapt to the available
// height, no scroll, and nothing spilling past the box. It derives an item COUNT only — it never
// sets any element's height (heights stay pure-CSS), so it is NOT the JS-measured *height* that
// AGENTS.md warns against for the category layout. Attach `boxRef` to the element whose size
// bounds the grid (its height must come from CSS: a stretched flex cell or an explicit height),
// and `gridRef` to the grid itself (its first child is measured for the real card height, so the
// count self-calibrates if the card size ever changes).
export function useGridFit({
    cardMinWidth,
    columnGap,
    rowGap,
    fallbackCardHeight,
    reservedFooter,
    defaultPageSize,
}: UseGridFitOptions): UseGridFitResult {
    const boxRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const [pageSize, setPageSize] = useState(defaultPageSize)

    useIsomorphicLayoutEffect(() => {
        const box = boxRef.current
        if (!box) return
        const measure = () => {
            const { width, height } = box.getBoundingClientRect()
            if (width === 0 || height === 0) return
            const cardHeight =
                (gridRef.current?.firstElementChild as HTMLElement | null)?.offsetHeight || fallbackCardHeight
            // Reserve the footer height ALWAYS (whether or not pagination shows) so the row count
            // never flips as pagination appears/disappears. Since the footer is far smaller than a
            // card row, reserving it can't itself add or drop a row.
            const usableHeight = height - reservedFooter
            const columns = Math.max(1, Math.floor((width + columnGap) / (cardMinWidth + columnGap)))
            const rows = Math.max(1, Math.floor((usableHeight + rowGap) / (cardHeight + rowGap)))
            setPageSize(columns * rows)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(box)
        return () => observer.disconnect()
    }, [cardMinWidth, columnGap, rowGap, fallbackCardHeight, reservedFooter])

    return { boxRef, gridRef, pageSize }
}
