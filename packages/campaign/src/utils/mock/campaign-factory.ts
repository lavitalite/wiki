/**
 * data configuration and generation
 */
import {  CampaignRewardType, CampaignRuleType, CampaignStatus, CampaignType } from '@/types/marketing';
import type { Campaign, CampaignReward, CampaignRule, TargetAuidence } from '@/types/marketing';
import {faker} from '@faker-js/faker/locale/zh_CN'
import { addDays } from '../format/date';
import { ShuffleService } from '../rand/shuffle';

const CampaignTypes = Object.values(CampaignType)
const ruleTypes = Object.values(CampaignRuleType)
const rewardTypes = Object.values(CampaignRewardType)
const status = Object.values(CampaignStatus)




// 促销活动名称模板
const CAMPAIGN_NAME_TEMPLATES = [
  '${season}${holdiay}${action}',
  '${occasion}专项${benefit}',
  '${cateogry}${action}${benefit}'
]

const SEASONS = ['春季', '夏季', '秋季', '冬季', '年中', '年末']
const HOLIDAYS = ['春节', '中秋', '国庆', '双11', '618', '圣诞']
const OCCASIONS = ['会员', '新人', '周年庆', '开业']
const BENFITS = ['折扣', '立减', '返现', '狂欢', '钜惠']
const CATEGORIES = ['全场', '新品', '精选','热销' ]


export class CampaignFactory {
  private static generateCampaignName(): string {
    const template = ShuffleService.pickOne(CAMPAIGN_NAME_TEMPLATES)
    return template
      .replace('${season}', ShuffleService.pickOne(SEASONS))
      .replace('${holiday}', ShuffleService.pickOne(HOLIDAYS))
      .replace('${occasion}', ShuffleService.pickOne(OCCASIONS))
      .replace('${category}', ShuffleService.pickOne(CATEGORIES))
      .replace('${benefit}', ShuffleService.pickOne(BENFITS))
  }

  private static generateDescription(type: CampaignType, name:string): string {
    const descriptions = {
      [CampaignType.FLASH_SALE]: [
        '限时抢购，错过不再',
        '24小时限时特卖',
        '闪购特惠，先到先得'
      ],
      [CampaignType.DISCOUNT]: [
        '全场商品限时折扣',
        '限时折扣，最高减免'
      ],
      [CampaignType.BUNDLE]: [
        '超值套装优惠',
        '搭配购特惠'
      ],
      [CampaignType.GROUP_BY]: [
        '拼团优惠，一起省',
        '团购特价，邀请好友享优惠'
      ],
      [CampaignType.LIMITED_TIME]: [
        '限时特惠活动',
        '特定时段专享优惠'
      ],
      [CampaignType.NEW_USER]: [
        '新客专享优惠',
        '首单特惠'
      ]
    }
    return ShuffleService.pickOne(descriptions[type])
  }

  static createRule(): CampaignRule {
    const type = ShuffleService.pickOne(ruleTypes)
    

    return {
      id: faker.string.uuid(),
      type,
      condition: this.getRuleCondition(type),
      value: faker.number.int({min: 100, max: 1000})
    }
  }

  private static getRuleCondition(type: CampaignRuleType): string {
    switch(type) {
      case CampaignRuleType.MIN_PURCHASE:
          return "最低消费金额"
      case CampaignRuleType.PRODUCT_QUANTITY:
        return "商品数量要求"
      case CampaignRuleType.CATEGORY_SPECIFIC:
        return "特定品类"
      case CampaignRuleType.USER_LEVEL:
          return "会员等级要求"
      default:
          return "规则未定义"
    }
  }

  static createReward(): CampaignReward {
    const type = faker.helpers.arrayElement(rewardTypes)
    return {
      id: faker.string.uuid(),
      type,
      value: faker.number.int({min:5, max: 30}),
      description: this.getRewardDescription(type)
    }
  }

  private static getRewardDescription(type: CampaignRewardType): string {
    switch(type){
      case CampaignRewardType.PERCENT_DISCOUNT:
        return "折扣优惠"
      case CampaignRewardType.FIX_DISCOUNT:
        return "满减优惠"
      case CampaignRewardType.FREE_SHIPPING:
        return "免运费"
      case CampaignRewardType.BOUNT_POINTS:
        return "额外积分"
      case CampaignRewardType.FREE_PRODUCT:
        return "赠品"
      default: 
        return "奖励未定义"
    }
  }
  static createTargetAudience(): TargetAuidence {
    return {
      userlevels: faker.helpers.arrayElements(["普通会员", "黄金会员", "白金会员", "钻石会员"], faker.number.int({min:1, max:4})),
      regions: faker.helpers.arrayElements(["华东", "华南", "华北", "西南", "东北"], faker.number.int({min:1, max:5})),
      tags: faker.helpers.arrayElements(["新客", "老客", "流失预警", "高频", "高价值"], faker.number.int({min: 1, max: 3})),
      minAge: faker.number.int({min: 18, max: 25}),
      maxAge: faker.number.int({min: 26, max: 65})
    }
  }
  static createCampaign(overrides: Partial<Campaign> = {}): Campaign{
    const startTime = faker.date.soon({days: 7})
    const endTime = addDays(startTime, faker.number.int({min: 7, max: 30}))
    const campaign:Campaign = {
      id: faker.string.uuid(),
      name: `${faker.commerce.productAdjective()}${faker.helpers.arrayElement(["促销","优惠"])}活动`,
      type: faker.helpers.arrayElement(CampaignTypes),
      status: faker.helpers.arrayElement(status),
      startTime: startTime.toISOString(), // date time string fomat
      endTime: endTime.toISOString(),
      description: faker.lorem.sentence(),
      rules: Array.from(
        {length: faker.number.int({min:1, max:3})},
        () => this.createRule()
      ),
      rewards: Array.from(
        {length: faker.number.int({min: 1, max:2})},
        () => this.createReward()
      ),
      targetAudience: this.createTargetAudience(),
      createdAt: faker.date.recent({days:14}).toISOString(),
      updatedAt: faker.date.recent({days:14}).toISOString(),
      ...overrides
    }
    return campaign
  }

  static createMany(count:number): Campaign[] {
    return Array.from({length:count}, () => this.createCampaign())
  }
}

