<template>
  <canvas ref="canvasRef"  class="background"></canvas>
</template>


<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number,
  y: number,
  speed: number,
  directionAngle: number,
  color: string,
  radius: number,
  d: {x:number, y: number},
  update: () => void,
  border: () => void,
  draw: (ctx: CanvasRenderingContext2D) => void
}

const opts = {
  backgroundColor: 'transparent',
  particleColor: '#fcfcfc',
  particleAmount: 40,
  defaultSpeed: 1,
  addedSpeed: 2,
  defaultRadius: 2,
  addedRadius: 2,
  joinRadius: 150,
}

let ctx:CanvasRenderingContext2D | null = null
let w = 0, 
    h = 0
let particles: Particle[] = []


const createParticle = (x?: number, y?: number): Particle => ({
  x: x ?? Math.random() * w,
  y: y ?? Math.random() * h,
  speed: opts.defaultSpeed + Math.random() * opts.addedSpeed,
  directionAngle: Math.floor(Math.random() * 360),
  color: opts.particleColor,
  radius: opts.defaultRadius + Math.random() * opts.addedRadius,
  d: { x: 0, y: 0 },
  update() {
    this.border()
    this.x += this.d.x
    this.y += this.d.y
  },
  border() {
    if (this.x >= w || this.x <= 0) this.d.x *= -1
    if (this.y >= h || this.y <= 0) this.d.y *= -1
    this.x = Math.max(0, Math.min(this.x, w))
    this.y = Math.max(0, Math.min(this.y, h))
  },
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }
})


const checkDistance = (x1: number, y1: number, x2: number, y2: number) => 
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

const joinPoints = (point: Particle, particles: Particle[]) => {
  if (!ctx) return
  particles.forEach(particle => {
    const distance = checkDistance(point.x, point.y, particle.x, particle.y)
    const opacity = 1 - distance / opts.joinRadius
    if (opacity > 0) {
      ctx.lineWidth = opacity
      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(particle.x, particle.y)
      ctx.closePath()
      ctx.stroke()
    }
  })
}


const setup = () => {
  if (!canvasRef.value || !ctx) return
  w = canvasRef.value.width = window.innerWidth
  h = canvasRef.value.height = window.innerHeight
  particles = Array.from({ length: opts.particleAmount }, () => createParticle())
}

const loop = () => {
  if (!ctx) return
  ctx.fillStyle = opts.backgroundColor
  ctx.fillRect(0, 0, w, h)

  particles.forEach(p => {
    p.update()
    p.draw(ctx!)
  })

  particles.forEach(p => joinPoints(p, particles))
  requestAnimationFrame(loop)
}

const handleResize = () => {
  if (!canvasRef.value || !ctx) return
  w = canvasRef.value.width = window.innerWidth
  h = canvasRef.value.height = window.innerHeight
}

const handleClick = (e: MouseEvent) => {
  particles.push(createParticle(e.pageX, e.pageY))
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  if (particles.length > 0) {
    //Takes the last otu from the particles[];
    particles.pop()
    // particles.splice(particles.length - 1, 1); 
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    setup()
    loop()
    window.addEventListener('resize', handleResize)
    canvasRef.value.addEventListener('click', handleClick)
    canvasRef.value.addEventListener('contextmenu', handleContextMenu)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (canvasRef.value) {
    canvasRef.value.removeEventListener('click', handleClick)
    canvasRef.value.removeEventListener('contextmenu', handleContextMenu)
  }
})
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}
</style>