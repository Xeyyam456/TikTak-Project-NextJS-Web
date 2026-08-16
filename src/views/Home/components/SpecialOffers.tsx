'use client'

import { CarouselNavButton } from '@/shared/components'
import type { CampaignCarouselProps } from '@/types'
import { PromoBanner } from './PromoBanner'
import { useCardCarousel } from '@/shared/hooks/useCardCarousel'

export function SpecialOffers({ campaigns, perPage = 2 }: CampaignCarouselProps) {
    const { trackRef, canPrev, canNext, onScroll, prev, next } = useCardCarousel(campaigns.length)

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
                    {campaigns.map((campaign) => (
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

