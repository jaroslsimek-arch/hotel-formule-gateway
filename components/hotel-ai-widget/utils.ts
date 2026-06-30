/**
 * Tiny, dependency-free class joiner so this folder stays portable.
 * (Intentionally not importing from `@/lib/utils` to keep the widget
 * self-contained and copy-paste friendly.)
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

/**
 * Build up to two uppercase initials from a name.
 * "Marta" -> "M", "Anna Nováková" -> "AN".
 */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase()
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase()
}
