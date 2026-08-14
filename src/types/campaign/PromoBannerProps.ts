import type { Campaign } from './Campaign'

export interface PromoBannerProps {
  campaign: Campaign
  size?: 'lg' | 'md'
  hideButton?: boolean
  priority?: boolean
}
