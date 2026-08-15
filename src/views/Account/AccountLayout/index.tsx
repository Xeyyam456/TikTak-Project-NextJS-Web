'use client'

import { Container } from '@/shared/components/layout/Container'
import type { AccountLayoutProps } from '@/types'
import { AccountSidebarNav } from './components/AccountSidebarNav'

export function AccountLayout({ children }: AccountLayoutProps) {
    return (
        <Container className="-mt-[15px] py-6">
            <h1 className="mb-4 text-xl font-semibold text-neutral-900">Hesabım</h1>

            <div className="flex items-start gap-4">
                <AccountSidebarNav />
                <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">{children}</div>
            </div>
        </Container>
    )
}
