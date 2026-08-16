'use client'

import { CarouselNavButton } from '@/shared/components'
import type { CampaignCarouselProps } from '@/types'
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
                {campaigns.map((campaign, index) => (
                    <div
                        key={campaign.id}
                        className="h-full shrink-0"
                        style={{ width: `calc((100% - ${(perPage - 1) * 29}px) / ${perPage})` }}
                    >
                        <PromoBanner campaign={campaign} size="lg" priority={index === 0} />
                    </div>
                ))}
            </div>

            {canPrev && <CarouselNavButton direction="left" onClick={prev} />}
            {canNext && <CarouselNavButton direction="right" onClick={next} />}
        </div>
    )
}

