export function digitsFromPhoneValue(value: string) {
    let raw = value.replace(/\D/g, '')
    if (raw.startsWith('994')) raw = raw.slice(3)
    return raw.slice(0, 9)
}

export function formatPhoneValue(digits: string, showPrefix: boolean) {
    if (!digits) return showPrefix ? '(+994) ' : ''
    const groups = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean)
    return `(+994) ${groups.join(' ')}`
}
