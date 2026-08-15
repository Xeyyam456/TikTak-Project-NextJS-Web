'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '../Container'
import { AddressBadge } from './components/AddressBadge'
import { SearchBar } from './components/SearchBar'
import { NavLinks } from './components/NavLinks'

export function Header() {
    const pathname = usePathname()
    const isLanding = pathname === '/'

    return (
        <header className="sticky top-0 z-50 bg-white">
            <Container className="pt-[30px] pb-[30px]">
                <div className="flex h-10 items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center text-[40px] font-extrabold leading-none tracking-[0.03em] text-neutral-900"
                        >
                            TIK TAK
                        </Link>

                        <AddressBadge />
                    </div>

                    <SearchBar />

                    <NavLinks />
                </div>
            </Container>

            {!isLanding && <div className="h-3 w-full border-t border-neutral-100 bg-neutral-50" />}
        </header>
    )
}
