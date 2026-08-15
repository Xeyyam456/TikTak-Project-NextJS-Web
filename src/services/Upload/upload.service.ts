import type { ApiResponse, UploadResponseData } from '@/types'
import httpClient from '../httpClient'

export const uploadService = {
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient.post<ApiResponse<UploadResponseData>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
