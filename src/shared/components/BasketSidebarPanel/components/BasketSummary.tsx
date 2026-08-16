import Link from 'next/link'
import type { BasketSummaryProps } from '@/types'

export function BasketSummary({ total }: BasketSummaryProps) {
    return (
        <div className="mt-3 flex-shrink-0 space-y-2 border-t border-neutral-100 pt-3">
            <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>Ümumi:</span>
                <span className="text-neutral-900">{total} AZN</span>
            </div>
            <div className="flex items-center justify-between text-sm text-neutral-500">
                <span>Çatdırılma:</span>
                <span className="text-neutral-900">Pulsuz</span>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-sm font-bold text-neutral-900">
                <span>Yekun məbləğ:</span>
                <span>{total} AZN</span>
            </div>
            <Link
                href="/basket"
                className="mt-1 block w-full cursor-pointer rounded-[8px] bg-foreground py-3 text-center text-base font-semibold text-white transition-colors hover:bg-foreground-dark"
            >
                Sifarişi tamamla
            </Link>
        </div>
    )
}
