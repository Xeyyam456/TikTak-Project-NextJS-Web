import type { Campaign } from '@/models'
import { PromoBanner } from './PromoBanner'

interface SpecialOffersProps {
    campaigns: Campaign[]
}

export function SpecialOffers({ campaigns }: SpecialOffersProps) {
    if (campaigns.length === 0) return null

    return (
        <section>
            <h2 className="text-2xl font-bold text-neutral-900">Xüsusi təkliflər!</h2>
            <p className="mt-1 text-sm text-neutral-500">Sizin üçün seçilmiş ən sərfəli kampaniyalar</p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => (
                    <PromoBanner key={campaign.id} campaign={campaign} size="md" />
                ))}
            </div>
        </section>
    )
}

