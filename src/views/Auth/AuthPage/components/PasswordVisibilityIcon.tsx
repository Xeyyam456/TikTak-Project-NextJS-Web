import type { PasswordVisibilityIconProps } from '@/types'

export function PasswordVisibilityIcon({ visible }: PasswordVisibilityIconProps) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            {!visible && <line x1="2" y1="18" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" />}
        </svg>
    )
}
