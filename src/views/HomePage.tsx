import { Container } from '@/shared/components/layout/Container'
import { BannerCarousel } from '@/shared/components/landing/BannerCarousel'
import { SpecialOffers } from '@/shared/components/landing/SpecialOffers'
import { StatsSection } from '@/shared/components/landing/StatsSection'
import type { Campaign } from '@/types'
import { campaignService } from '@/services'
import { SITE_NAME, SITE_URL } from '@/shared/utils/seo'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
    },
    {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],
}

export async function HomePage() {
  const campaigns: Campaign[] = await campaignService
    .list()
    .then((res) => res.data)
    .catch(() => [])

  return (
    <Container className="space-y-14 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BannerCarousel campaigns={campaigns} />
      <SpecialOffers campaigns={campaigns.slice(0, 4)} />
      <StatsSection />
    </Container>
  )
}
