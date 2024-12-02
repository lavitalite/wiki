<template>
    <DefaultTheme.Layout>
        
    </DefaultTheme.Layout>
</template>

<script setup lang="ts">

import { nextTick, provide } from 'vue';
import {useData} from 'vitepress'
import { DefaultTheme } from 'vitepress';

const {isDark} = useData()

function enableTransitions() {
    return "startViewTransition" in document
    && window.matchMedia('perfers-reduced-motion: no-preference').matches
}
/**
 * dark mode toggle with animation
 */
provide('toggle-appearance',async({clientX: x, clientY: y}:MouseEvent) => {
    if(!enableTransitions()) {
        isDark.value = !isDark.value
        return
    }
    const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async() => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready
  /** awesome web animation API */
  document.documentElement.animate(
    {clipPath: isDark.value ? clipPath.reverse() : clipPath},
    {
        duration:300,
        easing: 'easin-in',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

