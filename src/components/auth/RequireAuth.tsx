'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import { Loader } from '@/components'

interface RequireAuthProps {
    children: ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (!getAccessToken()) {
            router.replace('/login')
            return
        }
        setChecked(true)
    }, [router])

    if (!checked) return <Loader />

    return <>{children}</>
}
