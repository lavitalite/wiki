<template>
  <!-- merge with existing class instead of overwriting -->
  <svg
    v-if="slug"
    :class="classes"
    :style="{
      fontSize: props.fontScale === 1 ? undefined : `${props.fontScale * 100}%`,
    }"
    v-bind="{ ...baseAttrs, ...$attrs }"
  >
    <title v-if="title">{{ title }}</title>
    <use :href="`#v--${slug}`" :transform="transform" />
  </svg>
  <svg
    v-else
    :class="classes"
    :style="{
      fontSize: props.fontScale === 1 ? undefined : `${props.fontScale * 100}%`,
    }"
    v-bind="{ ...baseAttrs, ...$attrs }"
  >
    <title v-if="title">{{ title }}</title>
    <g :transform="transform">
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./types";

const props = withDefaults(defineProps<IconProps>(), {
  fontScale: 1,
  flipH: false,
  flipV: false,
  rotate: 0,
  scale: 1,
  shiftH: 0,
  shiftV: 0,
});

defineOptions({
  inheritAttrs: false,
});

const baseAttrs = {
  viewBox: "0 0 16 16",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  focusable: "false",
  role: "img",
  "aria-label": "icon",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

const classes = computed(() => ({
  "v-icon": true,
  [`text-${props.variant}`]: props.variant,
  [`v-icon-animation-${props.animation}`]: props.animation,
}));

/**
 * Compute the transforms
 *
 * Note that order is important as SVG transforms are applied in order from
 * left to right and we want flipping/scale to occur before rotation
 * Note shifting is applied separately
 * Assumes that the viewbox is `0 0 16 16` (`8 8` is the center)
 */
const transform = computed(() => {
  const transforms: string[] = [];
  const hasScale = props.flipH || props.flipV || props.scale !== 1;
  const hasRotate = props.rotate !== 0;

  if (hasScale || hasRotate) {
    transforms.push("translate(8 8)");

    if (hasScale) {
      transforms.push(
        `scale(${(props.flipH ? -1 : 1) * props.scale} ${
          (props.flipV ? -1 : 1) * props.scale
        })`
      );
    }

    if (hasRotate) {
      transforms.push(`rotate(${props.rotate})`);
    }

    transforms.push("translate(-8 -8)");
  }

  if (props.shiftH || props.shiftV) {
    transforms.push(
      `translate(${(16 * props.shiftH) / 16} ${(-16 * props.shiftV) / 16})`
    );
  }

  return transforms.join(" ");
});
</script>

<style scoped>
.v-icon {
  --v-icon-animation-duration: 1s;
  /** both width,height,padding are respect,margin are not respect, use text-align in parent for h-align*/
  display: inline-block;
  vertical-align: middle; /** v-align:text-top | text-bottom */
  overflow: visible;

  /* Animations */

  &[class*="v-icon-animation-"] > g,
  &[class*="v-icon-animation-"] > use {
    transform-origin: center;
  }

  &.v-icon-animation-slide > g,
  &.v-icon-animation-slide > use {
    animation: v-icon-slide var(--v-icon-animation-duration) infinite
      ease-in-out alternate;
  }

  &.v-icon-animation-slide-v > g,
  &.v-icon-animation-slide-v > use {
    animation: v-icon-slide-v var(--v-icon-animation-duration) infinite
      ease-in-out alternate;
  }

  &.v-icon-animation-fade > g,
  &.v-icon-animation-fade > use {
    animation: v-icon-fade var(--v-icon-animation-duration) infinite ease-in-out
      alternate;
  }

  &.v-icon-animation-spin > g,
  &.v-icon-animation-spin > use {
    animation: v-icon-spin var(--v-icon-animation-duration) infinite linear
      normal;
  }

  &.v-icon-animation-spin-reverse > g,
  &.v-icon-animation-spin-reverse > use {
    animation: v-icon-spin var(--v-icon-animation-duration) infinite linear
      reverse;
  }

  &.v-icon-animation-throb > g,
  &.v-icon-animation-throb > use {
    animation: v-icon-throb var(--v-icon-animation-duration) infinite
      ease-in-out alternate;
  }

  @media (prefers-reduced-motion: reduce) {
    &[class*="v-icon-animation"] > g,
    &[class*="v-icon-animation"] > use {
      animation: none;
    }
  }
}

@keyframes v-icon-slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

@keyframes v-icon-slide-v {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(25%);
  }
}

@keyframes v-icon-fade {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes v-icon-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes v-icon-throb {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes v-icon-animation-slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}

@keyframes v-icon-animation-slide-vertical {
  0% {
    transform: translateY(25%);
  }
  100% {
    transform: translateY(-25%);
  }
}

@keyframes v-icon-animation-fade {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes v-icon-animation-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes v-icon-animation-throb {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
