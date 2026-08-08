import { UserRole } from '@/enums'
import type { User } from '@/models'

const profile: User = {
  id: 3,
  full_name: 'Elvin Hesenov',
  phone: '+994516667766',
  address: 'Baki, Nesimi rayonu, Aga Neymatulla 80',
  img_url: 'https://avatars.githubusercontent.com/u/61918721?v=4?s=400',
  role: UserRole.COMMERCE,
  created_at: '2025-06-12T05:47:24.588Z',
}

export default profile
