import { BackButton } from '../../BackButton'
import { HeartToggle } from '../../HeartToggle'
import type { ProductHeaderProps } from '@/types'

export function ProductHeader({ isFavorite, onBack, onToggleFavorite }: ProductHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <BackButton onClick={onBack} />

            <HeartToggle isFavorite={isFavorite} onToggle={onToggleFavorite} variant="header" />
        </div>
    )
}
