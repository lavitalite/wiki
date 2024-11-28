<template>
  <Teleport to="body">
    <canvas ref="canvasRef" class="background"></canvas>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Particle {
  x: number;
  y: number;
  speed: number;
  directionAngle: number;
  color: string;
  radius: number;
  d: { x: number; y: number };
  update: () => void;
  border: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

// dark rgba(255, 255, 245, 0.86);
// light rgba(60, 60, 67);

// reactive color
const particleColor = ref("");
// computed the current theme
const isDark = ref(document.documentElement.classList.contains("dark"));
// set color based on theme
const updateParticleColor = () => {
  particleColor.value = isDark.value ? "#fff" : "#000";
};

// watch theme change

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const htmlElement = document.documentElement;
      isDark.value = htmlElement.classList.contains("dark");
      updateParticleColor();
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

const opts = {
  backgroundColor: "transparent",
  particleColor: "",
  particleAmount: 50,
  defaultSpeed: 0.5,
  addedSpeed: 1,

  defaultRadius: 2,
  addedRadius: 2,

  joinRadius: 150,
};

let ctx: CanvasRenderingContext2D | null = null;
let w = 0,
  h = 0;
let particles: Particle[] = [];

const createParticle = (x?: number, y?: number): Particle => ({
  x: x ?? Math.random() * w,
  y: y ?? Math.random() * h,
  speed: opts.defaultSpeed + Math.random() * opts.addedSpeed,
  directionAngle: Math.floor(Math.random() * 360),
  color: particleColor.value,
  radius: opts.defaultRadius + Math.random() * opts.addedRadius,
  d: {
    x:
      Math.cos((Math.PI / 180) * Math.floor(Math.random() * 360)) *
      (opts.defaultSpeed + Math.random() * opts.addedSpeed),
    y:
      Math.sin((Math.PI / 180) * Math.floor(Math.random() * 360)) *
      (opts.defaultSpeed + Math.random() * opts.addedSpeed),
  },
  update() {
    //Checks if this particles touches the border
    this.border();
    this.x += this.d.x;
    this.y += this.d.y;
  },
  border() {
    if (this.x >= w || this.x <= 0) {
      this.d.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.d.y *= -1;
    }
    this.x = Math.max(0, Math.min(this.x, w));
    this.y = Math.max(0, Math.min(this.y, h));
  },
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = particleColor.value;
    ctx.fill();
    // console.log(particleColor);
  },
});

const checkDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const joinPoints = (point: Particle, particles: Particle[]) => {
  particles.forEach((particle) => {
    if (!ctx) return;
    const distance = checkDistance(point.x, point.y, particle.x, particle.y);
    const opacity = 1 - distance / opts.joinRadius;
    if (opacity > 0) {
      ctx.lineWidth = opacity;
      ctx.strokeStyle = particleColor.value;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
    }
  });
};

const setup = () => {
  if (!canvasRef.value || !ctx) return;
  w = canvasRef.value.width = window.innerWidth;
  h = canvasRef.value.height = window.innerHeight;
  particles = Array.from({ length: opts.particleAmount }, () =>
    createParticle()
  );
  updateParticleColor(); // Set initial particle color
  requestAnimationFrame(loop);
};

const loop = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = opts.backgroundColor;
  ctx.fillRect(0, 0, w, h);

  particles.forEach((p) => {
    p.update();
    p.draw(ctx!);
  });

  requestAnimationFrame(loop);
  particles.forEach((p) => joinPoints(p, particles));
};

const handleResize = () => {
  if (!canvasRef.value || !ctx) return;
  w = canvasRef.value.width = window.innerWidth;
  h = canvasRef.value.height = window.innerHeight;
};

// adds a point.
const handleClick = (e: MouseEvent) => {
  particles.push(createParticle(e.pageX, e.pageY));
  console.log(particles.length);
};

//  removes a point
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault();
  if (particles.length > 0) {
    //Takes the last otu from the particles[];
    particles.pop();
    // particles.splice(particles.length - 1, 1);
  }
};

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext("2d");
    w = canvasRef.value.width = window.innerWidth;
    h = canvasRef.value.height = window.innerHeight;
    setup();
    window.addEventListener("resize", handleResize);
    canvasRef.value.addEventListener("click", handleClick);
    canvasRef.value.addEventListener("contextmenu", handleContextMenu);

    // Add event listener for theme changes
    /* window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateParticleColor); */
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (canvasRef.value) {
    canvasRef.value.removeEventListener("click", handleClick);
    canvasRef.value.removeEventListener("contextmenu", handleContextMenu);
  }
  // Remove event listener for theme changes
  /*  window
    .matchMedia("(prefers-color-scheme: dark)")
    .removeEventListener("change", updateParticleColor); */
});
</script>

<style scoped>
.background {
  position: fixed;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: auto;
}
:global(body) {
  pointer-events: none;
}
</style>
