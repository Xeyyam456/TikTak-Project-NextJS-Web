'use client'

import { useMemo } from 'react'
import { CarouselNavButton } from '@/shared/components'
import type { CampaignCarouselProps } from '@/types'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { shuffle } from '@/shared/utils/shuffle'

export function BannerCarousel({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    // Shuffling is client-only randomness: the initial render must match the server's
    // (unshuffled) output or React logs a hydration mismatch, so we only shuffle once
    // `hasMounted` flips true post-hydration — see AGENTS.md "useHasMounted()".
    const hasMounted = useHasMounted()
    const displayed = useMemo(() => (hasMounted ? shuffle(campaigns) : campaigns), [hasMounted, campaigns])

    // Eager-loading must key off which campaign was first in the ORIGINAL (unshuffled, SSR)
    // order, not the current shuffled index — the shuffle re-render happens post-hydration,
    // often before a throttled LCP image finishes downloading, so whichever campaign the
    // shuffle promotes into the visual-first slot becomes the real LCP element. If priority
    // were keyed off the shuffled index, that promoted campaign would only just now be
    // switching from lazy to eager — too late, since a browser doesn't reliably re-prioritize
    // a fetch after `loading`/`fetchPriority` change post-insertion. Keying off campaign
    // identity instead means every campaign that could ever land in the first `perPage` slots
    // (i.e. was there in the original SSR order) was already eager/high-priority from the very
    // first paint, so the shuffle can only ever swap between already-prioritized candidates.
    const priorityIds = useMemo(() => new Set(campaigns.slice(0, perPage).map((c) => c.id)), [campaigns, perPage])

    const { trackRef, canPrev, canNext, onScroll, prev, next } = useCardCarousel(displayed.length)

    if (campaigns.length === 0) return null

    return (
        <div className="relative h-[396px] w-full">
            <div
                ref={trackRef}
                onScroll={onScroll}
                className="flex h-full gap-[29px] overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
            >
                {displayed.map((campaign) => (
                    <div
                        key={campaign.id}
                        className="h-full shrink-0"
                        style={{ width: `calc((100% - ${(perPage - 1) * 29}px) / ${perPage})` }}
                    >
                        <PromoBanner campaign={campaign} size="lg" priority={priorityIds.has(campaign.id)} />
                    </div>
                ))}
            </div>

            {canPrev && <CarouselNavButton direction="left" onClick={prev} />}
            {canNext && <CarouselNavButton direction="right" onClick={next} />}
        </div>
    )
}

