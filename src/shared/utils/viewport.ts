export const VIEWPORT_RESERVED = 180
export const BASKET_PANEL_HEIGHT = 594

export function clampToViewport(px: number) {
    return `min(${px}px, calc(100vh - ${VIEWPORT_RESERVED}px))`
}
