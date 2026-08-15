import type { ButtonProps } from '@/types'

const VARIANT_CLASSES = {
    primary: 'rounded-[8px] bg-[#92D871] text-white transition-colors hover:bg-[#7CB760]',
    dark: 'rounded-[8px] bg-[#2B3043] text-white transition-colors hover:bg-[#1F2333]',
    secondary: 'rounded-[8px] bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200',
    danger: 'rounded-[8px] bg-[#F4A6A6] text-white transition-colors hover:bg-[#EF8A8A]',
    ghost: '',
    link: 'text-[#92D871] transition-colors hover:text-[#7CB760]',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
    const base = 'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
    return <button className={`${base} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />
}
