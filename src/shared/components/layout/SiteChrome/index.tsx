'use client'

import { usePathname } from 'next/navigation'
import { Header } from '../Header'
import { Footer } from '../Footer'
import type { SiteChromeProps } from '@/types'

const NO_CHROME_ROUTES = ['/login', '/register']

export function SiteChrome({ children }: SiteChromeProps) {
    const pathname = usePathname()
    const hideChrome = NO_CHROME_ROUTES.includes(pathname)
    const isLanding = pathname === '/'
    const showFooter = isLanding

    if (hideChrome) {
        return <main className="flex-1">{children}</main>
    }

    return (
        <>
            <Header />
            <main className={`flex-1 ${isLanding ? 'bg-white' : 'bg-neutral-50'}`}>{children}</main>
            {showFooter && <Footer />}
        </>
    )
}
