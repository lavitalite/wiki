export function isCssColor(color?: string): boolean {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color)
}



