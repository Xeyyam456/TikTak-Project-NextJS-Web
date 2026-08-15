'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmModal } from '@/shared/components/ui/ConfirmModal'
import { useBasket } from '@/shared/hooks/useBasket'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useProfile } from '@/shared/hooks/useProfile'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { clearTokens } from '@/services/httpClient'
import { UserIcon, HeartIcon, BasketIcon } from '../icons'

export function NavLinks() {
    const pathname = usePathname()
    const router = useRouter()
    const queryClient = useQueryClient()
    const hasMounted = useHasMounted()
    const { data: profile } = useProfile()
    const { data: basket } = useBasket()
    const { data: favorites } = useFavorites()
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false)

    const basketCount = hasMounted ? (basket?.count ?? 0) : 0
    const favoritesCount = hasMounted ? (favorites?.length ?? 0) : 0

    const handleConfirmLogout = () => {
        clearTokens()
        queryClient.clear()
        setConfirmLogoutOpen(false)
        toast.success('Hesabdan uğurla çıxdınız')
        router.push('/')
    }

    return (
        <nav className="flex items-center gap-6 text-[14px] font-normal leading-none tracking-normal text-foreground">
            <Link
                href="/account"
                className={`flex items-center gap-[10px] hover:text-[#0A955E] ${
                    pathname.startsWith('/account') ? 'font-semibold text-[#0A955E]' : ''
                }`}
            >
                {hasMounted && profile?.img_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.img_url} alt="" className="h-[30px] w-[30px] rounded-full object-cover" />
                ) : (
                    <UserIcon />
                )}
                Hesabım
            </Link>
            <Link
                href="/favorites"
                className={`relative flex items-center gap-[10px] hover:text-[#0A955E] ${
                    pathname === '/favorites' ? 'font-semibold text-[#0A955E]' : ''
                }`}
            >
                <span className="relative">
                    <HeartIcon />
                    {favoritesCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#92D871] px-1 text-[10px] font-semibold leading-none text-white">
                            {favoritesCount}
                        </span>
                    )}
                </span>
                Siyahılarım
            </Link>
            <Link
                href="/basket"
                className={`relative flex items-center gap-[10px] hover:text-[#0A955E] ${
                    pathname === '/basket' ? 'font-semibold text-[#0A955E]' : ''
                }`}
            >
                <span className="relative">
                    <BasketIcon />
                    {basketCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#92D871] px-1 text-[10px] font-semibold leading-none text-white">
                            {basketCount}
                        </span>
                    )}
                </span>
                Səbətim
            </Link>
            {hasMounted && profile && (
                <button
                    type="button"
                    onClick={() => setConfirmLogoutOpen(true)}
                    className="flex cursor-pointer items-center gap-[10px] hover:text-[#0A955E]"
                >
                    <LogOut size={17} />
                    Çıxış
                </button>
            )}

            <ConfirmModal
                open={confirmLogoutOpen}
                title="Hesabdan çıxmaq istəyirsiniz?"
                confirmLabel="Bəli, çıx"
                cancelLabel="İmtina"
                onConfirm={handleConfirmLogout}
                onCancel={() => setConfirmLogoutOpen(false)}
            />
        </nav>
    )
}
