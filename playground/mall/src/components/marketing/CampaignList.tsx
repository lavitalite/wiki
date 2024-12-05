import {defineComponent, type PropType} from 'vue'
import type {Campaign} from '@/types/marketing'
import { CampaignStatus} from '@/types/marketing'

export default defineComponent( {
  name: 'CampaignList',
  props: {
    campaigns: {
      type: Array as PropType<Campaign[]>,
      required: true,
    },
    onCampaignClick: {
      type: Function as PropType<(campaign: Campaign) => void>,
      required: true
    }
  },
  setup(props) {
    const getStatusColor = (status: CampaignStatus):string => {
      const colors = {
        [CampaignStatus.ACTIVE]: 'bg-green-100 text-green-800',
        [CampaignStatus.SCHEDULED]: 'bg-blue-100 text-blue-800',
        [CampaignStatus.PAUSED]: 'bg-yellow-100 text-yellow-800',
        [CampaignStatus.ENDED]: 'bg-gray-100 text-gray-800',
        [CampaignStatus.CANCELLED]: 'bg-red-100 text-red-100',
        [CampaignStatus.DRAFT]: 'bg-purple-100 text-purple-800'
      }
      return colors[status]
    }

    const formateDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString()
    }

    return () => {
      <div className="space-y-4">
        {props.campaigns.map(campaign => {
          <div
            key={campaign.id}
            onClick={() => props.onCampaignClick(campaign)}
            class="bg-white rouned-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
          > 
            <div
              class="flex justify-between items-start "
            >
              <div
              >
                <h3 class="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                <p class="text-sm text-gray-500 mt-1">{campaign.description}</p>
              </div>
              <span
                class={['px-3 py-1 rounded-full text-xs font-medium', getStatusColor(campaign.status)]}
              >
                  {campaign.status}
              </span>
          </div>
        })
      </div>
    }
  }
})