import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/shared/utils/date'
import type { PromoBannerProps } from '@/types'

const GRADIENTS = [
    'from-emerald-700 to-emerald-500',
    'from-rose-700 to-rose-500',
    'from-neutral-800 to-neutral-600',
    'from-primary-dark to-primary',
]

function formatDateRange(isoDate: string) {
    const start = new Date(isoDate)
    const end = new Date(start)
    end.setDate(end.getDate() + 7)
    return `${formatDate(start)} - ${formatDate(end)}`
}

export function PromoBanner({ campaign, size = 'lg', hideButton = false, priority = false }: PromoBannerProps) {
    const gradient = GRADIENTS[campaign.id % GRADIENTS.length]
    const height = size === 'lg' ? 'h-[396px]' : 'h-44'
    const dateRange = formatDateRange(campaign.created_at)

    const content = (
        <>
            {campaign.img_url && (
                <>
                    <Image
                        src={campaign.img_url}
                        alt={campaign.title}
                        fill
                        priority={priority}
                        quality={65}
                        sizes="(max-width: 640px) 100vw, calc(50vw - 75px)"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70" />
                </>
            )}

            <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                <div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-md sm:text-3xl">{campaign.title}</h3>
                    {campaign.description && (
                        <p className="mt-2 max-w-xs text-base text-white/95 drop-shadow-sm">{campaign.description}</p>
                    )}
                    <p className="mt-2 text-lg font-semibold text-white/90 drop-shadow-sm">{dateRange}</p>
                </div>

                {!hideButton && (
                    <Link
                        href="/categories"
                        className="inline-flex w-fit items-center rounded-[8px] bg-teal px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
                    >
                        Ətraflı
                    </Link>
                )}
            </div>
        </>
    )

    const className = `relative block w-full overflow-hidden rounded-xl ${height} bg-gradient-to-br ${gradient}`

    if (hideButton) {
        return (
            <Link href="/categories" className={`${className} cursor-pointer`}>
                {content}
            </Link>
        )
    }

    return <div className={className}>{content}</div>
}

