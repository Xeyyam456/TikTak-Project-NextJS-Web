import type { RefObject } from 'react'

export interface UseGridFitResult {
  boxRef: RefObject<HTMLDivElement | null>
  gridRef: RefObject<HTMLDivElement | null>
  pageSize: number
}
