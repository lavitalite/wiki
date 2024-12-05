<template>
  <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">营销活动管理</h1>
        <p class="mt-2 text-sm text-gray-500">管理所有正在进行和计划中的营销活动</p>
      </div>
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-xl text-gray-900">活动列表</h2>
          <button class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">生成更多活动</button>
        </div>
        <CampaignList
          :campaigns="campaigns"
          :onCampaignClick="handleCampaignClick"
        />
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Campaign } from './types/marketing';
import { CampaignFactory } from './utils/mock/campaign-factory';
import CampaignList from './components/CampaignList.vue';


const campaigns = ref<Campaign[]>(CampaignFactory.createMany(4))
console.log(campaigns)
const handleCampaignClick = (campaign:Campaign) => {
  console.log('Campaign Click ->', campaign)
}
</script>

