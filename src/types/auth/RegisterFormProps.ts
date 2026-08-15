export interface RegisterFormProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
  onSwitchToLogin: () => void
}
