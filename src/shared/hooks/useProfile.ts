import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
    const router = useRouter()

    return useMutation({
        mutationFn: (payload: UpdateProfilePayload) => {
            if (!getAccessToken()) {
                router.push('/login')
                return Promise.reject(new Error('AUTH_REQUIRED'))
            }
            return profileService.update(payload).then((res) => res.data)
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(profileQueryKey, data)
            toast.success('img_url' in variables ? 'Profil şəkli yeniləndi' : 'Məlumatlarınız yeniləndi')
        },
        onError: (error, variables) => {
            if (error.message === 'AUTH_REQUIRED') return
            toast.error(
                'img_url' in variables ? 'Şəkil yüklənmədi, yenidən cəhd edin' : 'Məlumatlar yenilənmədi, yenidən cəhd edin',
            )
        },
    })
}
