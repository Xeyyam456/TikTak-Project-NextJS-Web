'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Heart, ShoppingCart } from 'lucide-react'
import { useBasket } from '@/shared/hooks/useBasket'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useProfile } from '@/shared/hooks/useProfile'
import { useHasMounted } from '@/shared/hooks/useHasMounted'
import { useAuthSync } from '@/shared/hooks/useAuthSync'
import { LogoutButton } from './LogoutButton'

export function NavLinks() {
    const pathname = usePathname()
    const hasMounted = useHasMounted()
    const { data: profile } = useProfile()
    const { data: basket } = useBasket()
    const { data: favorites } = useFavorites()

    // Cross-tab: another tab logged in/out — clear the stale profile/basket/
    // favorites cache here too, so the header badges/avatar/logout button
    // reflect it on every route, not just the auth-gated ones.
    useAuthSync()

    const basketCount = hasMounted ? (basket?.count ?? 0) : 0
    const favoritesCount = hasMounted ? (favorites?.length ?? 0) : 0

    return (
        <nav className="flex items-center gap-6 text-[14px] font-normal leading-none tracking-normal text-foreground">
            <Link
                href="/account"
                className={`flex items-center gap-[10px] hover:text-emerald ${
                    pathname.startsWith('/account') ? 'font-semibold text-emerald' : ''
                }`}
            >
                {hasMounted && profile?.img_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.img_url} alt="" className="h-[30px] w-[30px] rounded-full object-cover" />
                ) : (
                    <User className="h-[17px] w-[17px]" />
                )}
                {hasMounted && profile ? profile.full_name : 'Hesabım'}
            </Link>
            <Link
                href="/favorites"
                className={`relative flex items-center gap-[10px] hover:text-emerald ${
                    pathname === '/favorites' ? 'font-semibold text-emerald' : ''
                }`}
            >
                <span className="relative">
                    <Heart className="h-[17px] w-[17px]" />
                    {favoritesCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-mint px-1 text-[10px] font-semibold leading-none text-white">
                            {favoritesCount}
                        </span>
                    )}
                </span>
                Siyahılarım
            </Link>
            <Link
                href="/basket"
                className={`relative flex items-center gap-[10px] hover:text-emerald ${
                    pathname === '/basket' ? 'font-semibold text-emerald' : ''
                }`}
            >
                <span className="relative">
                    <ShoppingCart className="h-[17px] w-[17px]" />
                    {basketCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-mint px-1 text-[10px] font-semibold leading-none text-white">
                            {basketCount}
                        </span>
                    )}
                </span>
                Səbətim
            </Link>
            {hasMounted && profile && <LogoutButton />}
        </nav>
    )
}
