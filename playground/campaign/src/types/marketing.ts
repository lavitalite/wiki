export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startTime: string
  endTime: string
  description: string
  rules: CampaignRule[]
  rewards: CampaignReward[]
  targetAudience: TargetAuidence
  createdAt: string
  updatedAt: string
}


export enum CampaignType  {
  FLASH_SALE = 'FLASH_SALE',
  DISCOUNT = 'DISCOUNT',
  BUNDLE = 'BUNDLE',
  GROUP_BY = 'GROUP_BY',
  LIMITED_TIME = 'LIMITED_TIME',
  NEW_USER = 'NEW_USER'
}


export interface CampaignRule {
  id: string,
  type: CampaignRuleType
  condition: string,
  value: number
}

export enum CampaignRuleType {
  MIN_PURCHASE = 'MIN_PURCHARSE',
  PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
  CATEGORY_SPECIFIC = 'CATEOGRY_SPECIFIC',
  USER_LEVEL = 'USER_LEVEL'
}


export interface CampaignReward {
  id: string,
  value:number ,
  type: CampaignRewardType
  description: string
}


export enum CampaignRewardType {
  PERCENT_DISCOUNT = 'PERCENT_DISCOUNT',
  FIX_DISCOUNT = 'FIXED_DISCOUNT',
  BOUNT_POINTS = 'BOUNS_POINTS',
  FREE_SHIPPING = 'FREE_SHIPPING',
  FREE_PRODUCT = 'FREE_PRODUCT'
}


export interface TargetAuidence {
  regions: string[]
  userlevels: string[]
  tags: string[]
  minAge?:number
  maxAge?: number
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  ENDED = 'ENDED'
}