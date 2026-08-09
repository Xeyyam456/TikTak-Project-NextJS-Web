'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import type { RedirectIfAuthProps } from '@/types'

export function RedirectIfAuth({ children }: RedirectIfAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (getAccessToken()) {
            router.replace('/')
            return
        }
        setChecked(true)
    }, [router])

    if (!checked) return null

    return <>{children}</>
}
