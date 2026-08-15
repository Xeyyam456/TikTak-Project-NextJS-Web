import { forwardRef } from 'react'
import type { InputProps } from '@/types'

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className = '', ...props }, ref) {
    return (
        <input
            ref={ref}
            className={`h-[50px] rounded-[10px] border border-neutral-100 bg-neutral-50 px-4 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-[#92D871] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            {...props}
        />
    )
})
