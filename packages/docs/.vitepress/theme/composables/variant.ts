


import { MaybeRef, type PropType, computed, getCurrentInstance, unref } from 'vue'
import { useColor } from './color'



export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text'
] as const

export type Variant = typeof allowedVariants[number]

export interface VariantProps {
  color?: string
  variant: Variant
}


export function useVariant(
  props: MaybeRef<VariantProps>,// duck type compatible
  name = getCurrentInstance()?.type.name
) {
  const variantClasses = computed(() => {
    const { variant } = unref(props)
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(computed(() => {
    const { variant, color } = unref(props)
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color,
    }
  }))

  return { variantClasses, colorClasses, colorStyles }
}

