<template>
  <span
    :class="[
      'px-3 py-1 rounded-full text-xs font-medium',
      getStatusColor(status)
    ]"
  >{{ status }}</span>
</template>

<script setup lang="ts">
import { CampaignStatus } from '@/types/marketing';
import { getStatusColor } from '@/utils/campaign/status-color';
defineProps<{
  status: CampaignStatus
}>()
</script>

<style lang="scss" scoped></style>