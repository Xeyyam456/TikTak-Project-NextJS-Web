export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  total?: number
  pageSize?: number
  className?: string
}
