import type { MouseEvent } from 'react'

export interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: (e: MouseEvent) => void
}
