import { ArrowLeft } from 'lucide-react'
import { Button } from '@/shared/components/Button'
import { HeartToggle } from '@/shared/components/HeartToggle'
import type { ProductHeaderProps } from '@/types'

export function ProductHeader({ isFavorite, onBack, onToggleFavorite }: ProductHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <Button
                type="button"
                variant="secondary"
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
                <ArrowLeft size={18} />
                geri qayıt
            </Button>

            <HeartToggle isFavorite={isFavorite} onToggle={onToggleFavorite} variant="header" />
        </div>
    )
}
