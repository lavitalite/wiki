<template>
  <Teleport to="body">
      <div ref="container" class="particle-container">
        <canvas
          ref="canvasRef"
          class="background"
          @click="handleClick"
          @contextmenu.prevent="handleContextMenu"
        />
      </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useTheme } from './useTheme'
import { useParticles } from './useParticles'
import type { ParticleOptions } from './types'

const container = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const w = ref(0)
const h = ref(0)

const { isDark } = useTheme()
const particleColor = ref(isDark.value ? '#fff' : '#000')

watch(isDark, (newValue) => {
  particleColor.value = newValue ? '#fff' : '#000'
})

const opts: ParticleOptions = {
  backgroundColor: 'transparent',
  particleAmount: 50,
  defaultSpeed: 0.5,
  addedSpeed: 1,
  defaultRadius: 2,
  addedRadius: 2,
  joinRadius: 150,
}

const { setup, addParticle, removeParticle, cleanup } = useParticles(
  ctx,
  w,
  h,
  particleColor,
  opts
)

const handleResize = () => {
  if (!canvasRef.value || !container.value) return
  
  const rect = container.value.getBoundingClientRect()
  w.value = rect.width
  h.value = rect.height
  canvasRef.value.width = w.value
  canvasRef.value.height = h.value
}

const handleClick = (e: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  addParticle(x, y)
}

const handleContextMenu = () => {
  removeParticle()
}

onMounted(() => {
  if (!canvasRef.value) return
  
  ctx.value = canvasRef.value.getContext('2d')
  handleResize()
  window.addEventListener('resize', handleResize)
  
  // Initialize particles after canvas is properly sized
  requestAnimationFrame(() => {
    setup()
    console.log('Particles initialized:', w.value, h.value) // Debug log
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cleanup()
})
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}


</style>