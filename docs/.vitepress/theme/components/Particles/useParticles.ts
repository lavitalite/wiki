import { ref, Ref, watch } from 'vue'
import type { Particle, ParticleOptions } from './types'

export function useParticles(
  ctx: Ref<CanvasRenderingContext2D | null>,
  w: Ref<number>,
  h: Ref<number>,
  particleColor: Ref<string>,
  opts: ParticleOptions
) {
  const particles = ref<Particle[]>([])
  let animationFrameId: number | null = null
  let isAnimating = false

  const createParticle = (x?: number, y?: number): Particle => ({
    x: x ?? Math.random() * w.value,
    y: y ?? Math.random() * h.value,
    speed: opts.defaultSpeed + Math.random() * opts.addedSpeed,
    directionAngle: Math.floor(Math.random() * 360),
    color: particleColor.value,
    radius: opts.defaultRadius + Math.random() * opts.addedRadius,
    d: {
      x: Math.cos((Math.PI / 180) * Math.floor(Math.random() * 360)) * (opts.defaultSpeed + Math.random() * opts.addedSpeed),
      y: Math.sin((Math.PI / 180) * Math.floor(Math.random() * 360)) * (opts.defaultSpeed + Math.random() * opts.addedSpeed),
    },
    update() {
      this.border()
      this.x += this.d.x
      this.y += this.d.y
    },
    border() {
      if (this.x >= w.value || this.x <= 0) this.d.x *= -1
      if (this.y >= h.value || this.y <= 0) this.d.y *= -1
      this.x = Math.max(0, Math.min(this.x, w.value))
      this.y = Math.max(0, Math.min(this.y, h.value))
    },
    draw(context: CanvasRenderingContext2D) {
      context.beginPath()
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      context.closePath()
      context.fillStyle = particleColor.value
      context.fill()
    },
  })

  const checkDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

  const joinPoints = (point: Particle, particleList: Particle[]) => {
    if (!ctx.value) return
    particleList.forEach((particle) => {
      if (point === particle) return
      const distance = checkDistance(point.x, point.y, particle.x, particle.y)
      const opacity = 1 - distance / opts.joinRadius
      if (opacity > 0) {
        ctx.value!.lineWidth = opacity
        ctx.value!.strokeStyle = particleColor.value
        ctx.value!.beginPath()
        ctx.value!.moveTo(point.x, point.y)
        ctx.value!.lineTo(particle.x, particle.y)
        ctx.value!.stroke()
      }
    })
  }

  const loop = () => {
    if (!ctx.value || !isAnimating) return
    
    ctx.value.clearRect(0, 0, w.value, h.value)
    ctx.value.fillStyle = opts.backgroundColor
    ctx.value.fillRect(0, 0, w.value, h.value)

    particles.value.forEach((p) => {
      p.update()
      p.draw(ctx.value!)
    })

    particles.value.forEach((p) => joinPoints(p, particles.value))
    animationFrameId = requestAnimationFrame(loop)
  }

  const setup = () => {
    if (!ctx.value) return
    particles.value = Array.from({ length: opts.particleAmount }, () => createParticle())
    isAnimating = true
    loop()
  }

  const addParticle = (x: number, y: number) => {
    particles.value.push(createParticle(x, y))
  }

  const removeParticle = () => {
    if (particles.value.length > 0) {
      particles.value.pop()
    }
  }

  const cleanup = () => {
    isAnimating = false
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  }

  // Update particle colors when theme changes
  watch(particleColor, () => {
    particles.value.forEach(particle => {
      particle.color = particleColor.value
    })
  })

  return {
    setup,
    addParticle,
    removeParticle,
    cleanup
  }
}