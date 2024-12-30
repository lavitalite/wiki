<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import {PropType} from 'vue'

const props = defineProps({
  modelValue: {type: Boolean, defualt: true},
  stateful: {type: Boolean, default: true},
  color: {type: String, default: ""},
  textColor: {type: String, default: '' },
  title: {type: String, default: ''},
  description: {type: String, default: ""},
  closeable: {type: Boolean, default: false},
  closeText: {type: String, default: ''},
  closeIcon: {type: String, default: 'close'},
  center: {type: Boolean, default: false},
  dense: {type: Boolean, default: false},
  outline: {type: Boolean, default: false},
  borderColor: {type: String, default: ""},
  border: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
    default: '',
    validator: (value: string) => ['top', 'bottom', 'right', 'left'].includes(value)
  }

})
</script>

<style lang="scss" scoped>

</style>