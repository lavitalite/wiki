import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const updateTheme = () => {
    if (typeof window !== 'undefined') {
      isDark.value = document.documentElement.classList.contains('dark')
    }
  }

  onMounted(() => {
    updateTheme()
    
    // Watch for changes in the 'dark' class on the document element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateTheme()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Clean up the observer when the component is unmounted
    return () => observer.disconnect()
  })

  return { isDark }
}