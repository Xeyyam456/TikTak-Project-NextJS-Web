import { VIEWPORT_RESERVED } from '../constants'

export const clampToViewport = (px: number) => `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`
