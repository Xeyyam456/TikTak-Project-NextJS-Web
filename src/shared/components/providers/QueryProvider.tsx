'use client'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function QueryProvider({ children }: { children: ReactNode }) {
    // Mutations already invalidate the exact queries they affect (basket, favorites, etc.),
    // so a 0ms staleTime just means every remount/window-refocus during normal navigation
    // refetches data that hasn't actually changed. 30s cuts that noise without risking
    // meaningfully stale data between real actions.
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30_000,
                    },
                },
            }),
    )

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
