import { useEffect, useLayoutEffect } from 'react'

// useLayoutEffect runs synchronously before the browser paints, so an auth
// redirect never flashes a frame of gated content first. It warns on the
// server (no DOM to lay out), so fall back to useEffect there — this only
// ever matters in the browser anyway.
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
