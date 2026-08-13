'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="text-4xl font-bold text-primary">Xəta</p>
            <h2 className="text-xl font-semibold text-neutral-900">Nəsə səhv getdi</h2>
            <p className="text-sm text-neutral-500">Zəhmət olmasa yenidən cəhd edin.</p>
            <button
                type="button"
                onClick={() => unstable_retry()}
                className="mt-2 inline-flex items-center rounded-[8px] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
            >
                Yenidən cəhd et
            </button>
        </div>
    )
}
