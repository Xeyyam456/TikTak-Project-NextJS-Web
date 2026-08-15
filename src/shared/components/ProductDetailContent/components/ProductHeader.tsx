import { ArrowLeft, Heart } from 'lucide-react'
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

            <button
                type="button"
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
                className="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
            >
                <Heart
                    size={24}
                    strokeWidth={2}
                    className={isFavorite ? 'fill-[#F4A6A6] text-[#F4A6A6]' : 'text-neutral-700'}
                />
            </button>
        </div>
    )
}
