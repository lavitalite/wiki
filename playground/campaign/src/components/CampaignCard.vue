<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md trnasition-shadow p-4 cursor-pointer">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ campaign.name }}</h3>
        <p class="text-gray-500 text-sm mt-1">{{ campaign.description }}</p>
      </div>
      <CampaignStatus 
        :status="campaign.status"
      />
    </div>
    <CampaignMeta
      :startTime="campaign.startTime"
      :endTime="campaign.endTime"
      :type="campaign.type"
      :updatedAt="campaign.updatedAt"
    />
    <CampaignRule
      v-if="campaign.rules.length > 0"
      :rulesCount="campaign.rules.length"
    />
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from '@/types/marketing';
import CampaignStatus from './CampaignStatus.vue';
import CampaignMeta from './CampaignMeta.vue';
import CampaignRule from './CampaignRule.vue';
defineProps<{
  campaign:Campaign
}>()

defineEmits<{
  (e: 'click', campaign: Campaign):void
}>()
</script>

<style scoped>

</style>