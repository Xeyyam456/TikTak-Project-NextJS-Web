import type { ButtonProps } from '@/types'

const VARIANT_CLASSES = {
    primary: 'rounded-[8px] bg-mint text-white transition-colors hover:bg-mint-dark',
    dark: 'rounded-[8px] bg-foreground text-white transition-colors hover:bg-foreground-dark',
    secondary: 'rounded-[8px] bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200',
    danger: 'rounded-[8px] bg-danger text-white transition-colors hover:bg-danger-dark',
    ghost: '',
    link: 'text-mint transition-colors hover:text-mint-dark',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
    const base = 'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
    return <button className={`${base} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />
}
