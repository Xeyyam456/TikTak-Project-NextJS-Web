'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '../constants'

export function AccountSidebarNav() {
    const pathname = usePathname()

    return (
        <div className="w-[280px] flex-shrink-0 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
            <nav className="space-y-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/account' ? pathname === '/account' : pathname.startsWith(href)
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-sm transition-colors ${
                                isActive ? 'font-semibold text-mint' : 'text-neutral-700 hover:text-neutral-900'
                            }`}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
