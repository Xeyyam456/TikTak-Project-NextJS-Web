'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect'
import type { RedirectIfAuthProps } from '@/types'

export function RedirectIfAuth({ children }: RedirectIfAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    // Synchronous, pre-paint: only ever fires navigation, never reveals children.
    useIsomorphicLayoutEffect(() => {
        if (getAccessToken()) router.replace('/')
    }, [router])

    // Regular (post-paint) effect: reveals children once confirmed logged out.
    useEffect(() => {
        if (!getAccessToken()) setChecked(true)
    }, [])

    if (!checked) return null

    return <>{children}</>
}
