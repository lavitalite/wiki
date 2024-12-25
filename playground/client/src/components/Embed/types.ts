export const TYPES = ['iframe', 'embed', 'video', 'object', 'img'] as const
export const ASPECTS = ['21by9', '16by9', '4by3', '1by1'] as const

export type EmbedType = typeof TYPES[number]
export type AspectRatio = typeof ASPECTS[number]

export interface EmbedProps {
  aspect?: AspectRatio
  tag?: string
  type?: EmbedType
}