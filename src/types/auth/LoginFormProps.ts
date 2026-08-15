export interface LoginFormProps {
  onSuccess: () => void
  onError: (message: string) => void
  onSwitchToRegister: () => void
}
