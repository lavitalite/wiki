import { CampaignStatus } from '@/types/marketing';
console.log(CampaignStatus)
export const getStatusColor =  (status:CampaignStatus):string => {
  const colors = {
    [CampaignStatus.ACTIVE]: 'bg-green-100 text-green-800',
    [CampaignStatus.SCHEDULED]: 'bg-blue-100 text-blue-800',
    [CampaignStatus.ENDED]: 'bg-gray-100 text-gray-800',
    [CampaignStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [CampaignStatus.DRAFT]: 'bg-pruple-100 text-purple-800'
  }
  return colors[status]
}