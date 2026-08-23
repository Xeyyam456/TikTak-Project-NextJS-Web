export const PANEL_HEIGHT = 697

// Same fluid-fit behaviour as the other grids: 180px min columns, rows measured against the
// panel height, cards bottom-aligned with the basket panel. Card height self-calibrates.
export const GRID_FIT = {
    cardMinWidth: 180,
    columnGap: 15,
    rowGap: 24,
    fallbackCardHeight: 244,
    reservedFooter: 52,
    defaultPageSize: 10,
}
