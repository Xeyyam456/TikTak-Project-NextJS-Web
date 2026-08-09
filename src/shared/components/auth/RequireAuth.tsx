'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/services/httpClient'
import { Loader } from '@/shared/components'
import type { RequireAuthProps } from '@/types'

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
