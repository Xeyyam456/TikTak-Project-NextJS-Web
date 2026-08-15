import type { PaymentMethodOptionProps } from '@/types'

export function PaymentMethodOption({ icon: Icon, label, selected, onSelect, method }: PaymentMethodOptionProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(method)}
            className={`flex cursor-pointer items-center gap-3 rounded-[8px] border p-4 text-left transition-colors ${
                selected ? 'border-transparent bg-[#EFF9EA]' : 'border-neutral-200 bg-white'
            }`}
        >
            <Icon className={selected ? 'text-[#0A955E]' : 'text-neutral-400'} size={22} />
            <span className={`flex-1 text-sm font-medium ${selected ? 'text-[#0A955E]' : 'text-neutral-700'}`}>
                {label}
            </span>
            <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-[#0A955E]' : 'border-neutral-300'
                }`}
            >
                {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#0A955E]" />}
            </span>
        </button>
    )
}
