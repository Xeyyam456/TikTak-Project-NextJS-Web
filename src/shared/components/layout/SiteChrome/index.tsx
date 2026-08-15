'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

const NO_CHROME_ROUTES = ['/login', '/register']

export function SiteChrome({ children }: { children: ReactNode }) {
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
