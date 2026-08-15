'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Loader } from '@/shared/components'
import { useProfile, useUpdateProfile } from '@/shared/hooks/useProfile'
import { uploadService } from '@/services'
import type { AccountFormValues } from '@/types'
import { updateSchema } from './constants'
import { AvatarUploader } from './components/AvatarUploader'
import { PersonalInfoFields } from './components/PersonalInfoFields'
import { PasswordFields } from './components/PasswordFields'

export function AccountPage() {
    const { data: profile, isLoading } = useProfile()
    const updateProfile = useUpdateProfile()

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [lastSyncedImgUrl, setLastSyncedImgUrl] = useState<string | null>()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AccountFormValues>({
        resolver: zodResolver(updateSchema),
        defaultValues: { full_name: '', address: '', password: '', password_repeat: '' },
    })

    if (profile && profile.img_url !== lastSyncedImgUrl) {
        setLastSyncedImgUrl(profile.img_url)
        setAvatarPreview(profile.img_url)
    }

    useEffect(() => {
        if (!profile) return
        reset({ full_name: profile.full_name, address: profile.address ?? '', password: '', password_repeat: '' })
    }, [profile, reset])

    const handleAvatarSelect = async (file: File) => {
        const objectUrl = URL.createObjectURL(file)
        setAvatarPreview(objectUrl)
        setUploadingAvatar(true)
        try {
            const uploadRes = await uploadService.upload(file)
            await updateProfile.mutateAsync({
                img_url: uploadRes.data.url,
                full_name: profile?.full_name,
                address: profile?.address ?? undefined,
            })
            toast.success('Profil şəkli yeniləndi')
        } catch {
            toast.error('Şəkil yüklənmədi, yenidən cəhd edin')
            setAvatarPreview(profile?.img_url ?? null)
        } finally {
            setUploadingAvatar(false)
        }
    }

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updateProfile.mutateAsync({
                full_name: values.full_name,
                address: values.address || undefined,
                password: values.password || undefined,
                password_repeat: values.password_repeat || undefined,
            })
            reset({ full_name: values.full_name, address: values.address ?? '', password: '', password_repeat: '' })
            toast.success('Məlumatlarınız yeniləndi')
        } catch {
            toast.error('Məlumatlar yenilənmədi, yenidən cəhd edin')
        }
    })

    if (isLoading) return <Loader />

    return (
        <form className="space-y-8" onSubmit={onSubmit} noValidate>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-900">Əlaqə məlumatlarınız</h2>
                    <AvatarUploader
                        avatarPreview={avatarPreview}
                        uploading={uploadingAvatar}
                        onFileSelect={handleAvatarSelect}
                    />
                </div>

                <PersonalInfoFields
                    register={register}
                    errors={errors}
                    phone={profile?.phone ?? ''}
                    email={profile?.email ?? ''}
                />
            </div>

            <PasswordFields register={register} errors={errors} />

            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting || uploadingAvatar}
                    className="w-full max-w-md cursor-pointer rounded-[8px] bg-[#92D871] py-3 text-base font-semibold text-white transition-colors hover:bg-[#7CB760] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? 'Göndərilir...' : 'Məlumatları yenilə'}
                </button>
            </div>
        </form>
    )
}
