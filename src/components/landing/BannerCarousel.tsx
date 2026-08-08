'use client'

import { useState } from 'react'
import type { Campaign } from '@/models'
import { PromoBanner } from './PromoBanner'

interface BannerCarouselProps {
    campaigns: Campaign[]
    perPage?: number
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path
                d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export function BannerCarousel({ campaigns, perPage = 2 }: BannerCarouselProps) {
    const pageCount = Math.max(1, Math.ceil(campaigns.length / perPage))
    const [page, setPage] = useState(0)

    if (campaigns.length === 0) return null

    const visible = campaigns.slice(page * perPage, page * perPage + perPage)

    const goTo = (nextPage: number) => {
        setPage((nextPage + pageCount) % pageCount)
    }

    return (
        <div className="relative ml-[-15px] h-[396px] w-[1455px] max-w-[calc(100%+15px)]">
            <div className="grid h-full gap-4 sm:grid-cols-2">
                {visible.map((campaign) => (
                    <PromoBanner key={campaign.id} campaign={campaign} size="lg" />
                ))}
            </div>

            {pageCount > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Evvelki"
                        onClick={() => goTo(page - 1)}
                        className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50"
                    >
                        <ChevronIcon direction="left" />
                    </button>
                    <button
                        type="button"
                        aria-label="Novbeti"
                        onClick={() => goTo(page + 1)}
                        className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow ring-1 ring-neutral-200 hover:bg-neutral-50"
                    >
                        <ChevronIcon direction="right" />
                    </button>
                </>
            )}
        </div>
    )
}

