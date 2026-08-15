export interface AvatarUploaderProps {
  avatarPreview: string | null
  uploading: boolean
  onFileSelect: (file: File) => void
}
