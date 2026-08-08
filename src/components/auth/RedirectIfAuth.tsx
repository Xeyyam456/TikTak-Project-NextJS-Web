'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'

interface RedirectIfAuthProps {
    children: ReactNode
}

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
