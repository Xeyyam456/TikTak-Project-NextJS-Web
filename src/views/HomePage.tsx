'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import { BannerCarousel } from '@/shared/components/landing/BannerCarousel'
import { SpecialOffers } from '@/shared/components/landing/SpecialOffers'
import { StatsSection } from '@/shared/components/landing/StatsSection'
import type { Campaign } from '@/types'
import { campaignService } from '@/services'

export function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    campaignService
      .list()
      .then((res) => setCampaigns(res.data))
      .catch(() => setCampaigns([]))
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

