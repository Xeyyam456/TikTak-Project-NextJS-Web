'use client'

import { useMemo } from 'react'
import { CarouselNavButton } from '@/shared/components'
import type { CampaignCarouselProps } from '@/types'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { shuffle } from '@/shared/utils/shuffle'

const DISPLAY_COUNT = 4

export function SpecialOffers({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    // Shuffling is client-only randomness: the initial render must match the server's
    // (unshuffled) output or React logs a hydration mismatch, so we only shuffle once
    // `hasMounted` flips true post-hydration — see AGENTS.md "useHasMounted()".
    const hasMounted = useHasMounted()
    const displayed = useMemo(
        () => (hasMounted ? shuffle(campaigns) : campaigns).slice(0, DISPLAY_COUNT),
        [hasMounted, campaigns],
    )

    const { trackRef, canPrev, canNext, onScroll, prev, next } = useCardCarousel(displayed.length)

    if (campaigns.length === 0) return null

    return (
        <section>
            <h2 className="text-[40px] font-bold text-primary">Xüsusi təkliflər!</h2>
            <p className="mt-1 text-[26px] text-primary">Sizin üçün seçilmiş ən sərfəli kampaniyalar</p>

            <div className="relative mt-5 h-[396px]">
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
                            <PromoBanner campaign={campaign} size="lg" hideButton />
                        </div>
                    ))}
                </div>

                {canPrev && <CarouselNavButton direction="left" onClick={prev} />}
                {canNext && <CarouselNavButton direction="right" onClick={next} />}
            </div>
        </section>
    )
}

