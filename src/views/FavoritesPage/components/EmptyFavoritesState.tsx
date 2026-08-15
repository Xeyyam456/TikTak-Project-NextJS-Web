import { clampToViewport } from '../utils'
import { PANEL_HEIGHT } from '../constants'

export function EmptyFavoritesState() {
    return (
        <div
            style={{ height: clampToViewport(PANEL_HEIGHT) }}
            className="flex flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-12 text-center shadow-sm"
        >
            <p className="text-lg font-semibold text-neutral-900">Seçilmişlər boşdur</p>
            <p className="mt-2 text-sm text-neutral-500">Bəyəndiyiniz məhsulları buraya əlavə edin</p>
        </div>
    )
}
