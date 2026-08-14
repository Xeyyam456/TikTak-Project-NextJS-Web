'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import { Loader } from '@/shared/components'
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect'
import type { RequireAuthProps } from '@/types'

export function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    // Synchronous, pre-paint: only ever fires navigation, never reveals children,
    // so there's nothing here that can force a slow render before the browser paints.
    useIsomorphicLayoutEffect(() => {
        if (!getAccessToken()) router.replace('/login')
    }, [router])

    // Regular (post-paint) effect: reveals children once confirmed authenticated.
    // Kept separate from the redirect check above so an authenticated visit still
    // gets an immediate Loader paint instead of blocking on the full page's render.
    useEffect(() => {
        if (getAccessToken()) setChecked(true)
    }, [])

    if (!checked) return <Loader />

    return <>{children}</>
}
