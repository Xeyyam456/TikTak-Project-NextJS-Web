'use client'

import { usePathname } from 'next/navigation'
import { useProfile } from '@/shared/hooks/useProfile'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { LocationIcon } from '../icons'

export function AddressBadge() {
    const pathname = usePathname()
    const hasMounted = useHasMounted()
    const { data: profile } = useProfile()

    if (pathname === '/') return null

    return (
        <div className="flex items-center gap-[8px] rounded-[8px] border border-neutral-100 bg-neutral-50 px-3 py-1.5">
            <LocationIcon className="h-8 w-8 flex-shrink-0" />
            <div className="flex flex-col justify-center gap-[2px]">
                <span className="text-[12px] font-medium leading-none text-neutral-400">Ünvan</span>
                <span className="text-[14px] leading-none text-neutral-500">
                    {(hasMounted && profile?.address) || 'Ünvanınızı seçin'}
                </span>
            </div>
        </div>
    )
}
