'use client'

import { useEffect, useState } from 'react'
import { CarouselNavButton } from '@/shared/components'
import type { Campaign, CampaignCarouselProps } from '@/types'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'
import { shuffle } from '@/shared/utils/shuffle'

export function BannerCarousel({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const [displayed, setDisplayed] = useState<Campaign[]>(campaigns)

    useEffect(() => {
        setDisplayed(shuffle(campaigns))
    }, [campaigns])

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
                {displayed.map((campaign, index) => (
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

