import Link from 'next/link'
import type { BasketTotalCardProps } from '@/types'

export function BasketTotalCard({ total }: BasketTotalCardProps) {
    return (
        <div className="w-[400px] flex-shrink-0">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">Yekun məbləğ</h2>
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Ümumi</span>
                    <span className="font-medium text-neutral-900">{total} AZN</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-neutral-500">Çatırılma</span>
                    <span className="font-medium text-neutral-900">Pulsuz</span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <span className="font-semibold text-neutral-900">Yekun məbləğ</span>
                    <span className="font-semibold text-neutral-900">{total} AZN</span>
                </div>

                <Link
                    href="/checkout"
                    className="mt-4 block w-full cursor-pointer rounded-[8px] bg-mint py-3 text-center text-base leading-5 font-semibold text-white transition-colors hover:bg-mint-dark"
                >
                    Sifarişi tamamla
                </Link>
            </div>
        </div>
    )
}
