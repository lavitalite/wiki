<template>
  <div class="space-x-4 flex items-center text-gray-500 text-sm mt-4">
    <div class="flex items-center">
      <CalendarIcon class="w-4 h-4 mr-2"/>
      <span>{{ formatDate(startTime) }} - {{ formatDate(endTime) }}</span>
    </div>
    <div class="flex items-center">
      <TagIcon class="w-4 h-4 mr-2"/>
      <span>{{ type }}</span>
    </div>
    <div class="flex items-center">
      <ClockIcon class="w-4 h-4 mr-2"/>
      <span>Updated {{ formatDate(updatedAt)  }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CampaignType } from '@/types/marketing';
import { formatDate } from '@/utils/format/date';
import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-vue-next';


defineProps<{
  startTime: string
  endTime: string
  type:CampaignType
  updatedAt: string
}>()
</script>

<style scoped>

</style>