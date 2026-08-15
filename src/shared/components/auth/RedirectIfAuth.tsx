'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect'
import { useAuthSync } from '@/shared/hooks/useAuthSync'
import type { RedirectIfAuthProps } from '@/types'

export function RedirectIfAuth({ children }: RedirectIfAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    // Synchronous, pre-paint: only ever fires navigation, never reveals children.
    useIsomorphicLayoutEffect(() => {
        if (getAccessToken()) router.replace('/')
    }, [router])

    // Cross-tab: another tab logged in — this tab (sitting on /login or
    // /register) should follow along instead of showing a stale auth form.
    useAuthSync(() => {
        if (getAccessToken()) router.replace('/')
    })

    // Regular (post-paint) effect: reveals children once confirmed logged out.
    useEffect(() => {
        if (!getAccessToken()) setChecked(true)
    }, [])

    if (!checked) return null

    return <>{children}</>
}
