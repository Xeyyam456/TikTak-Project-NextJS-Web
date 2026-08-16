export function formatDate(input: string | Date) {
    const date = typeof input === 'string' ? new Date(input) : input
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}.${month}.${date.getFullYear()}`
}

export function formatDateTime(iso: string) {
    const date = new Date(iso)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${formatDate(date)} ${hours}:${minutes}`
}
