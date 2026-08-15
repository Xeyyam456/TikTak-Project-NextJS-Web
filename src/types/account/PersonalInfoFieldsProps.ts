import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { AccountFormValues } from './AccountFormValues'

export interface PersonalInfoFieldsProps {
  register: UseFormRegister<AccountFormValues>
  errors: FieldErrors<AccountFormValues>
  phone: string
  email: string
}
