<template>
  <div class="flex items-center mt-3 space-x-2">
    <AlertCircleIcon class="w-4 h-4 text-gray-400"/>
    <p class="text-sm text-gray-500">
      {{ ruleLabels}}
    </p>
  </div>
</template>

<script setup lang="ts">
import { AlertCircleIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  rulesCount: number
}>()

const ruleLabels = computed(() => {
  return props.rulesCount > 1 ? `${props.rulesCount} rules applied` :'1 rule applied'
})
</script>

<style scoped>

</style>