<template>
  <component :is="tag" :class="wrapperClass">
    <component :is="type" v-bind="$attrs" :class="embedClasses">
      <slot v-if="type !== 'iframe'"></slot>
    </component>
  </component>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import "embed.scss"


// --- Constants ---
const TYPES = ['iframe', 'embed', 'video', 'object', 'img', 'b-img' 'b-img-lazy'] as const

const ASPECTS = ['21by9', '16by9', '4by3', '1by1'] as const

type EmbedType = typeof TYPES[number]
type AspectRatio = typeof ASPECTS[number]




export default defineComponent({
  name: 'BEmbed',
  props: {
    aspect: {
      type: String as () => AspectRatio,
      default: '16by9',
      validator: (value: string) => ASPECTS.includes(value as AspectRatio)
    },
    tag: {
      type: String,
      defualt: 'div'
    },
    type: {
      type: String as () => EmbedType,
      default: 'iframe',
      validator: (value: string) => TYPES.includes(value as AspectRatio)
    }
  },
  setup(props. { slots, attrs }){
  const resolvedType = computed(() => {
    props.type.startsWith('b') ?
      resolveBComponent(props.type) : props.type
  })

  const wrapperClasses = computed(() => [
    'embed-responsive',
    `embed-responsive-${aspect}`
  ])


  const embedClasses = computed(() => [
    'embed-responsive-item',
  ])

  return () =>
    h(
      props.tag,
      { class: wrapperClasses },
      h(props.type, { class: embedClasses, ...attrs }, slots.default?.())
    )

},

})


</script>

<style lang="postcss">
@import './embed.css'
</style>