'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/components'
import { Container } from '@/components/layout/Container'
import { BannerCarousel } from '@/components/landing/BannerCarousel'
import { SpecialOffers } from '@/components/landing/SpecialOffers'
import { StatsSection } from '@/components/landing/StatsSection'
import type { Campaign } from '@/models'
import { campaignService } from '@/services'
import campaignsMock from '@/mock/kampaniyalar'

export function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    campaignService
      .list()
      .then((res) => setCampaigns(res.data.length > 0 ? res.data : campaignsMock))
      .catch(() => setCampaigns(campaignsMock))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <Container className="space-y-14 py-8">
      <BannerCarousel campaigns={campaigns} />
      <SpecialOffers campaigns={campaigns.slice(0, 4)} />
      <StatsSection />
    </Container>
  )
}

