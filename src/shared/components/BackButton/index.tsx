import { ArrowLeft } from 'lucide-react'
import { Button } from '../Button'
import type { BackButtonProps } from '@/types'

export function BackButton({ onClick }: BackButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onClick}
            className="group flex w-fit flex-shrink-0 items-center gap-1.5 rounded-[8px] border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-mint hover:bg-emerald-pale hover:text-emerald hover:shadow-md"
        >
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
            geri qayıt
        </Button>
    )
}
