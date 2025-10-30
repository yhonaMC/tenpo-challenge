type ClassValue = string | number | boolean | undefined | null | bigint

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
