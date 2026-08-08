import type { ApiResponse } from '@/models'
import httpClient from './httpClient'

export interface UploadResponseData {
  url: string
}

export const uploadService = {
  upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient.post<ApiResponse<UploadResponseData>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
