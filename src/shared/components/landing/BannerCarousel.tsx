'use client'

import type { CampaignCarouselProps } from '@/types'
import { ChevronIcon } from './ChevronIcon'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'

export function BannerCarousel({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const { trackRef, canPrev, canNext, onScroll, prev, next } = useCardCarousel(campaigns.length)

    if (campaigns.length === 0) return null

    return (
        <div className="relative h-[396px] w-full">
            <div
                ref={trackRef}
                onScroll={onScroll}
                className="flex h-full gap-[29px] overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
            >
                {campaigns.map((campaign) => (
                    <div
                        key={campaign.id}
                        className="h-full shrink-0"
                        style={{ width: `calc((100% - ${(perPage - 1) * 29}px) / ${perPage})` }}
                    >
                        <PromoBanner campaign={campaign} size="lg" />
                    </div>
                ))}
            </div>

            {canPrev && (
                <button
                    type="button"
                    aria-label="Evvelki"
                    onClick={prev}
                    className="absolute z-20 left-0 top-1/2 -translate-x-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50"
                >
                    <ChevronIcon direction="left" />
                </button>
            )}
            {canNext && (
                <button
                    type="button"
                    aria-label="Novbeti"
                    onClick={next}
                    className="absolute z-20 right-0 top-1/2 translate-x-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[8px] bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50"
                >
                    <ChevronIcon direction="right" />
                </button>
            )}
        </div>
    )
}

