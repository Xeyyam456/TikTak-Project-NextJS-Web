// 180px min column width (not the card's 220px max-width) so a full row of 4 cards fits at 100%
// zoom; wider viewports fit more columns fluidly. Card height self-calibrates in useGridFit.
export const GRID_FIT = {
    cardMinWidth: 180,
    columnGap: 12,
    rowGap: 24,
    fallbackCardHeight: 244,
    reservedFooter: 52,
    defaultPageSize: 8,
}
