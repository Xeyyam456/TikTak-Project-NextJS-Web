import { ArrowLeft } from 'lucide-react'
import { HeartToggle } from '@/shared/components/HeartToggle'
import type { ProductHeaderProps } from '@/types'

export function ProductHeader({ isFavorite, onBack, onToggleFavorite }: ProductHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={onBack}
                className="flex cursor-pointer items-center gap-2 rounded-[8px] bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
            >
                <ArrowLeft size={18} />
                geri qayıt
            </button>

            <HeartToggle isFavorite={isFavorite} onToggle={onToggleFavorite} variant="header" />
        </div>
    )
}
