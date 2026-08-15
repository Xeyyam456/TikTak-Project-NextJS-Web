import type { MouseEvent } from 'react'

export interface HeartToggleProps {
  isFavorite: boolean
  onToggle: (e: MouseEvent) => void
  variant: 'card' | 'header'
}
