export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}

export function pad(n: number) {
  return String(n).padStart(2, '0')
}
