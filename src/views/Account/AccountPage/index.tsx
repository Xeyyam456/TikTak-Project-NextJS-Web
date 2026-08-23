'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Loader } from '@/shared/components'
import { useProfile, useUpdateProfile } from '@/shared/hooks/useProfile'
import type { AccountFormValues } from '@/types'
import { updateSchema } from './constants'
import { AvatarUploader } from './components/AvatarUploader'
import { PersonalInfoFields } from './components/PersonalInfoFields'
import { PasswordFields } from './components/PasswordFields'
import { useAvatarUpload } from './hooks/useAvatarUpload'

export function AccountPage() {
    const { data: profile, isLoading } = useProfile()
    const updateProfile = useUpdateProfile()
    const { avatarPreview, uploadingAvatar, handleAvatarSelect } = useAvatarUpload(profile, updateProfile)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AccountFormValues>({
        resolver: zodResolver(updateSchema),
        defaultValues: { full_name: '', address: '', password: '', password_repeat: '' },
    })

    useEffect(() => {
        if (!profile) return
        reset({ full_name: profile.full_name, address: profile.address ?? '', password: '', password_repeat: '' })
    }, [profile, reset])

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updateProfile.mutateAsync({
                full_name: values.full_name,
                address: values.address || undefined,
                password: values.password || undefined,
                password_repeat: values.password_repeat || undefined,
            })
            reset({ full_name: values.full_name, address: values.address ?? '', password: '', password_repeat: '' })
        } catch {
            // error toast handled by useUpdateProfile's onError
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
                <Button
                    type="submit"
                    disabled={isSubmitting || uploadingAvatar}
                    className="w-full max-w-md py-3 text-base font-semibold"
                >
                    {isSubmitting ? 'Göndərilir...' : 'Məlumatları yenilə'}
                </Button>
            </div>
        </form>
    )
}
