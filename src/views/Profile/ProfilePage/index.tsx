'use client'

import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components'
import { Container } from '@/shared/components/layout/Container'
import type { User } from '@/types'
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
  if (!profile)
    return (
      <Container className="py-6">
        <p>Profil tapilmadi.</p>
      </Container>
    )

  return (
    <Container className="py-6">
      <h1 className="mb-4 text-xl font-semibold">Profil</h1>
      <p>{profile.full_name}</p>
      <p className="text-neutral-500">{profile.phone}</p>
      <p className="text-neutral-500">{profile.address ?? 'Unvan yoxdur'}</p>
    </Container>
  )
}
