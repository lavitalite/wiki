export interface Particle {
  x: number
  y: number
  speed: number
  directionAngle: number
  color: string
  radius: number
  d: { x: number; y: number }
  update: () => void
  border: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

export interface ParticleOptions {
  backgroundColor: string
  particleAmount: number
  defaultSpeed: number
  addedSpeed: number
  defaultRadius: number
  addedRadius: number
  joinRadius: number
}