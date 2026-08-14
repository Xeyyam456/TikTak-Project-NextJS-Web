export interface BasketSidebarPanelProps {
  height?: number | string
  headingOffset?: number
  // When true, the panel fills its (stretched) parent via absolute positioning instead
  // of a fixed `height`. Used by CategoryDetailLayout so the panel matches the sidebar's
  // height purely through CSS (no JS measurement, no first-paint jump), while never
  // letting its own content dictate the row height. FavoritesPage keeps `height`.
  fill?: boolean
}
