import { Eye, EyeOff } from 'lucide-react'
import type { PasswordVisibilityIconProps } from '@/types'

export function PasswordVisibilityIcon({ visible }: PasswordVisibilityIconProps) {
    return visible ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />
}
