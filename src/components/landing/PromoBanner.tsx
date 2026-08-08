import Image from 'next/image'
import Link from 'next/link'
import type { Campaign } from '@/models'

interface PromoBannerProps {
    campaign: Campaign
    size?: 'lg' | 'md'
}

const GRADIENTS = [
    'from-emerald-700 to-emerald-500',
    'from-rose-700 to-rose-500',
    'from-neutral-800 to-neutral-600',
    'from-primary-dark to-primary',
]

export function PromoBanner({ campaign, size = 'lg' }: PromoBannerProps) {
    const gradient = GRADIENTS[campaign.id % GRADIENTS.length]
    const height = size === 'lg' ? 'h-[396px]' : 'h-44'

    return (
        <div className={`relative w-full overflow-hidden rounded-xl ${height} bg-gradient-to-br ${gradient}`}>
            {campaign.img_url && (
                <Image
                    src={campaign.img_url}
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                />
            )}

            <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                <div>
                    <h3 className="text-xl font-bold sm:text-2xl">{campaign.title}</h3>
                    {campaign.description && (
                        <p className="mt-1 max-w-xs text-sm text-white/90">{campaign.description}</p>
                    )}
                </div>

                <Link
                    href="/products"
                    className="inline-flex w-fit items-center rounded-md bg-white/90 px-4 py-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white"
                >
                    Ətrafı
                </Link>
            </div>
        </div>
    )
}

