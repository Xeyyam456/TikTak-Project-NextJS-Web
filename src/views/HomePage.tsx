import { Container } from '@/shared/components/layout/Container'
import { BannerCarousel } from '@/shared/components/landing/BannerCarousel'
import { SpecialOffers } from '@/shared/components/landing/SpecialOffers'
import { StatsSection } from '@/shared/components/landing/StatsSection'
import type { Campaign } from '@/types'
import { campaignService } from '@/services'

export async function HomePage() {
  const campaigns: Campaign[] = await campaignService
    .list()
    .then((res) => res.data)
    .catch(() => [])

  return (
    <Container className="space-y-14 py-8">
      <BannerCarousel campaigns={campaigns} />
      <SpecialOffers campaigns={campaigns.slice(0, 4)} />
      <StatsSection />
    </Container>
  )
}
