import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { AccountFormValues } from './AccountFormValues'

export interface PasswordFieldsProps {
  register: UseFormRegister<AccountFormValues>
  errors: FieldErrors<AccountFormValues>
}
