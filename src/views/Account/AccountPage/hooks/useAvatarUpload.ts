import { useState } from 'react'
import { toast } from 'sonner'
import { uploadService } from '@/services'
import { useUpdateProfile } from '@/shared/hooks/useProfile'
import type { User } from '@/types'

export function useAvatarUpload(profile: User | undefined, updateProfile: ReturnType<typeof useUpdateProfile>) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [lastSyncedImgUrl, setLastSyncedImgUrl] = useState<string | null>()

    if (profile && profile.img_url !== lastSyncedImgUrl) {
        setLastSyncedImgUrl(profile.img_url)
        setAvatarPreview(profile.img_url)
    }

    const handleAvatarSelect = async (file: File) => {
        const objectUrl = URL.createObjectURL(file)
        setAvatarPreview(objectUrl)
        setUploadingAvatar(true)

        let uploadedUrl: string
        try {
            uploadedUrl = (await uploadService.upload(file)).data.url
        } catch {
            toast.error('Şəkil yüklənmədi, yenidən cəhd edin')
            setAvatarPreview(profile?.img_url ?? null)
            setUploadingAvatar(false)
            return
        }

        try {
            await updateProfile.mutateAsync({
                img_url: uploadedUrl,
                full_name: profile?.full_name,
                address: profile?.address ?? undefined,
            })
        } catch {
            setAvatarPreview(profile?.img_url ?? null)
        } finally {
            setUploadingAvatar(false)
        }
    }

    return { avatarPreview, uploadingAvatar, handleAvatarSelect }
}
