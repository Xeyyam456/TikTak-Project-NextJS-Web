export interface ConfirmOrderModalProps {
  onConfirm: () => void
  onCancel: () => void
  onTimeout: () => void
  submitting: boolean
}
