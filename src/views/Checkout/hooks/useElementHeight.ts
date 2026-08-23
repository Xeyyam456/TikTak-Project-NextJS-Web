import { useEffect, useRef, useState } from 'react'

export function useElementHeight<T extends HTMLElement>(deps: unknown[]) {
    const ref = useRef<T>(null)
    const [height, setHeight] = useState<number>()

    useEffect(() => {
        if (!ref.current) return
        const observer = new ResizeObserver(([entry]) =>
            setHeight((entry.target as HTMLElement).getBoundingClientRect().height),
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return { ref, height }
}
