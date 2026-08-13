'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input, Loader } from '@/shared/components'
import { profileService } from '@/services'
import type { User } from '@/types'

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
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: { full_name: '', address: '', password: '', password_repeat: '' },
  })

  useEffect(() => {
    profileService
      .get()
      .then((res) => {
        setProfile(res.data)
        reset({ full_name: res.data.full_name, address: res.data.address ?? '', password: '', password_repeat: '' })
      })
      .catch((err) => {
        console.error('Profil məlumatları yüklənmədi', err)
        toast.error('Profil məlumatları yüklənmədi')
      })
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await profileService.update({
        full_name: values.full_name,
        address: values.address || undefined,
        password: values.password || undefined,
        password_repeat: values.password_repeat || undefined,
      })
      setProfile(res.data)
      reset({ full_name: res.data.full_name, address: res.data.address ?? '', password: '', password_repeat: '' })
      toast.success('Məlumatlarınız yeniləndi')
    } catch {
      toast.error('Məlumatlar yenilənmədi, yenidən cəhd edin')
    }
  })

  if (loading) return <Loader />

  return (
    <>
      <h2 className="mb-6 text-lg font-semibold text-neutral-900">Əlaqə məlumatlarınız</h2>

      <form className="space-y-6" onSubmit={onSubmit} noValidate>
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
            <Input type="email" placeholder="E-mail məlumatı mövcud deyil" disabled readOnly className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Ünvan</label>
            <Input type="text" placeholder="Ünvanınız" className="w-full" {...register('address')} />
          </div>
        </div>

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

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-md cursor-pointer rounded-[8px] bg-[#92D871] py-3 text-base font-semibold text-white transition-colors hover:bg-[#7CB760] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Göndərilir...' : 'Məlumatları yenilə'}
          </button>
        </div>
      </form>
    </>
  )
}
