import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ACCESS_TOKEN_KEY } from '@/services/httpClient'

// The `storage` event only fires in OTHER tabs when localStorage changes (never
// the tab that made the change), which is exactly what's needed to react to a
// login/logout that happened elsewhere. Clears the query cache unconditionally
// (profile/basket/favorites are stale either way — new user or no user), then
// lets the caller decide whether this route needs to redirect.
export function useAuthSync(onChange: () => void = () => {}) {
    const queryClient = useQueryClient()

    useEffect(() => {
        function handleStorage(e: StorageEvent) {
            if (e.key !== ACCESS_TOKEN_KEY) return
            queryClient.clear()
            onChange()
        }
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [queryClient, onChange])
}
