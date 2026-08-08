'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/components'
import type { User } from '@/models'
import { profileService } from '@/services'

export function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileService
      .get()
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />
  if (!profile) return <p className="p-6">Profil tapilmadi.</p>

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Profil</h1>
      <p>{profile.full_name}</p>
      <p className="text-neutral-500">{profile.phone}</p>
      <p className="text-neutral-500">{profile.address ?? 'Unvan yoxdur'}</p>
    </div>
  )
}
