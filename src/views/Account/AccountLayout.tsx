'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, User } from 'lucide-react'
import { Container } from '@/shared/components/layout/Container'
import type { AccountLayoutProps } from '@/types'

const NAV_ITEMS = [
    { href: '/account', label: 'Hesab məlumatlarım', icon: User },
    { href: '/account/orders', label: 'Sifarişlərim', icon: Package },
]

export function AccountLayout({ children }: AccountLayoutProps) {
    const pathname = usePathname()

    return (
        <Container className="-mt-[15px] py-6">
            <h1 className="mb-4 text-xl font-semibold text-neutral-900">Hesabım</h1>

            <div className="flex items-start gap-4">
                <div className="w-[280px] flex-shrink-0 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                    <nav className="space-y-1">
                        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                            const isActive = href === '/account' ? pathname === '/account' : pathname.startsWith(href)
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm transition-colors ${
                                        isActive ? 'font-semibold text-[#92D871]' : 'text-neutral-700 hover:text-neutral-900'
                                    }`}
                                >
                                    <Icon size={18} />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">{children}</div>
            </div>
        </Container>
    )
}
