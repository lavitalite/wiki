<template>
  <div class="space-y-4">
    <CampaignCard
      v-for="campaign in campaigns"
      :key="campaign.id"
      :campaign="campaign"
      @click="onCampaignClick"  
    />
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from '@/types/marketing';
import CampaignCard from './CampaignCard.vue'

defineProps<{
  campaigns: Campaign[]
  onCampaignClick: (campaign: Campaign) => void
}>()

</script>