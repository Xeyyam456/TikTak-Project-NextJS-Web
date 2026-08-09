import { useEffect, useRef, useState } from 'react'

export function useCardCarousel(itemCount: number) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [canPrev, setCanPrev] = useState(false)
    const [canNext, setCanNext] = useState(false)

    const updateEdges = () => {
        const el = trackRef.current
        if (!el) return
        setCanPrev(el.scrollLeft > 4)
        setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }

    useEffect(() => {
        updateEdges()
    }, [itemCount])

    const scrollByCard = (direction: 1 | -1) => {
        const el = trackRef.current
        const card = el?.firstElementChild as HTMLElement | null
        if (!el || !card) return
        const gap = parseFloat(getComputedStyle(el).columnGap || '0')
        el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
    }

    return {
        trackRef,
        canPrev,
        canNext,
        onScroll: updateEdges,
        prev: () => scrollByCard(-1),
        next: () => scrollByCard(1),
    }
}
