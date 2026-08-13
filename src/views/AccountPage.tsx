'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Camera, User as UserIcon } from 'lucide-react'
import { Input, Loader } from '@/shared/components'
import { useProfile, useUpdateProfile } from '@/shared/hooks/useProfile'
import { uploadService } from '@/services'

const updateSchema = z
  .object({
    full_name: z.string().trim().min(2, 'Adınızı daxil edin'),
    address: z.string().trim().optional(),
    password: z.string().optional(),
    password_repeat: z.string().optional(),
  })
  .refine((data) => !data.password || data.password.length >= 4, {
    message: 'Şifrə ən azı 4 simvol olmalıdır',
    path: ['password'],
  })
  .refine((data) => !data.password || data.password === data.password_repeat, {
    message: 'Şifrələr uyğun gəlmir',
    path: ['password_repeat'],
  })

type UpdateFormValues = z.infer<typeof updateSchema>

export function AccountPage() {
  const { data: profile, isLoading } = useProfile()
  const updateProfile = useUpdateProfile()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [lastSyncedImgUrl, setLastSyncedImgUrl] = useState<string | null>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormValues>({
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

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

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

          <div className="relative h-12 w-12 flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-neutral-100">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <UserIcon size={20} className="text-neutral-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              aria-label="Şəkli dəyiş"
              className="absolute -bottom-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#92D871] text-white shadow-sm transition-colors hover:bg-[#7CB760] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Camera size={10} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Adınız</label>
            <Input type="text" placeholder="Adınız" className="w-full" {...register('full_name')} />
            {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Telefon nömrəsi</label>
            <Input type="tel" value={profile?.phone ?? ''} disabled readOnly className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">E-mail</label>
            <Input
              type="email"
              value={profile?.email ?? ''}
              placeholder="E-mail məlumatı mövcud deyil"
              disabled
              readOnly
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Ünvan</label>
            <Input type="text" placeholder="Ünvanınız" className="w-full" {...register('address')} />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-neutral-100 pt-8">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">Şifrənin yenilənməsi</h3>
          <p className="text-xs text-neutral-400">Ehtiyac yoxdursa boş buraxın</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Yeni Şifrə</label>
            <Input type="password" className="w-full" {...register('password')} />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Yeni Şifrənin təkrarı</label>
            <Input type="password" className="w-full" {...register('password_repeat')} />
            {errors.password_repeat && <p className="mt-1 text-xs text-red-600">{errors.password_repeat.message}</p>}
          </div>
        </div>
      </div>

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
