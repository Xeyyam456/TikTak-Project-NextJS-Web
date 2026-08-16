import { Button } from '@/shared/components'
import type { PasswordVisibilityToggleProps } from '@/types'
import { PasswordVisibilityIcon } from './PasswordVisibilityIcon'

export function PasswordVisibilityToggle({ visible, onToggle }: PasswordVisibilityToggleProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            tabIndex={-1}
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        >
            <PasswordVisibilityIcon visible={visible} />
        </Button>
    )
}
