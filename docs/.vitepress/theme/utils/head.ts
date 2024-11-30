type HeadConfig = [string, Record<string, string>] | [string, Record<string, string>, string]

const metaTag = (attrs: Record<string, string>): HeadConfig => {
  // Only filter out attrs with undefined values
  const filteredAttrs = Object.fromEntries(
    Object.entries(attrs).filter(([_, value]) => value !== undefined)
  ) as Record<string, string>

  // Only return a config if we have non-empty filtered attributes
  return Object.keys(filteredAttrs).length > 0
    ? ['meta' as const, filteredAttrs]
    : ['meta', {}]
}

export const metaProperty = (property: string, content: string): HeadConfig => 
  metaTag({ property, content })

export const metaName = (name: string, content: string): HeadConfig => 
  metaTag({ name, content })