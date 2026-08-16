import { BackButton } from '@/shared/components/BackButton'
import { HeartToggle } from '@/shared/components/HeartToggle'
import type { ProductHeaderProps } from '@/types'

export function ProductHeader({ isFavorite, onBack, onToggleFavorite }: ProductHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <BackButton onClick={onBack} />

            <HeartToggle isFavorite={isFavorite} onToggle={onToggleFavorite} variant="header" />
        </div>
    )
}
