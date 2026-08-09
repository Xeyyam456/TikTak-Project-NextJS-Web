import type { ContainerProps } from '@/types'

export function Container({ children, className = '' }: ContainerProps) {
    return <div className={`mx-[60px] ${className}`}>{children}</div>
}
