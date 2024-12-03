

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  stauts: CampaignStatus
  startTime: string
  endTime: string
  description: string
  rules: CampaignRule[]
  rewards: CampaignReward[]
  targetAudience: TargetAudience
  createdAt: string
  updatedAt: string
}

export enum CampaignType {
  FLASH_SALE = 'FLASH_SALE',
  DISCOUNT = 'DISCOUNT',
  BUNDLE = 'BUNDLE',
  GROUP_BY = 'GROUP_BY',
  LIMITED_TIME = 'LIMITED_TIME',
  NEW_USER = 'NEW_USER'
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
  CANCELLED = 'CANCELLED'
}


export interface CampaignRule {
  id: string
  type: RuleType
  condition: string;
  value: number;
}

export enum RuleType {
  MIN_PURCHASE = 'MIN_PURCHASE',
  PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
  CATEGORY_SPECIFIC = 'CATEGORY_SPECIFIC',
  USER_LEVEL = 'USER_LEVEL'
}

export interface CampaignReward {
  id: string
  type: RewardType
  value: number
}

export enum RewardType {
  PERCENTAGE_DISCOUNT = 'PRECENTAGE_DISCOUNT',
  FIXED_DISCOUNT = 'FIXED_DISCOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  BOUNS_POINTS = 'BOUNS_POINTS',
  FREE_PRODUCT = 'FREE_PRODUCT'
}

export interface TargetAudience {
  id: string
  regions: string[]
  tags: string[]
  minAge: number
  maxAge: number
  userLevels: string[]
}



