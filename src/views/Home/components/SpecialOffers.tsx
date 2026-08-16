'use client'

import { useEffect, useState } from 'react'
import { CarouselNavButton } from '@/shared/components'
import type { Campaign, CampaignCarouselProps } from '@/types'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'
import { shuffle } from '@/shared/utils/shuffle'

const DISPLAY_COUNT = 4

export function SpecialOffers({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const [displayed, setDisplayed] = useState<Campaign[]>(() => campaigns.slice(0, DISPLAY_COUNT))

    useEffect(() => {
        setDisplayed(shuffle(campaigns).slice(0, DISPLAY_COUNT))
    }, [campaigns])

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

