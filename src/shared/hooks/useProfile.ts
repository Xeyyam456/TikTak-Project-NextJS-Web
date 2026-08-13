import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileService } from '@/services'
import { getAccessToken } from '@/services/httpClient'
import type { UpdateProfilePayload } from '@/types'

export const profileQueryKey = ['profile']

export function useProfile() {
    return useQuery({
        queryKey: profileQueryKey,
        queryFn: () => profileService.get().then((res) => res.data),
        enabled: !!getAccessToken(),
    })
}

export function useUpdateProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => profileService.update(payload).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.setQueryData(profileQueryKey, data)
        },
    })
}
