import type { CSSProperties, Ref } from 'vue'
import { computed } from 'vue'
import { isCssColor } from '../utils/colorUtils'

export type ColorValue = string | false | null | undefined

export function useColor(colors: Ref<{ background?: ColorValue; text?: ColorValue }>) {
  const colorClasses = computed(() => {
    const classes: string[] = []

    if (colors.value.background) {
      if (!isCssColor(colors.value.background)) {
        classes.push(`bg-${colors.value.background}`)
      }
    }

    if (colors.value.text) {
      if (!isCssColor(colors.value.text)) {
        classes.push(`text-${colors.value.text}`)
      }
    }

    return classes
  })

  const colorStyles = computed(() => {
    const styles: CSSProperties = {}

    if (colors.value.background) {
      if (isCssColor(colors.value.background)) {
        styles.background = colors.value.background
      }
    }

    if (colors.value.text) {
      if (isCssColor(colors.value.text)) {
        styles.color = colors.value.text
      }
    }

    return styles
  })

  return {
    colorClasses,
    colorStyles
  }
}