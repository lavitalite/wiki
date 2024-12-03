
## 技术栈
mybatis ORM 框架
SpringSecurity 认证和授权
SpringBoot MVC框架
Hutool java工具类库
RabbitMQ 消息队列
Redis 分布式缓存
ElasticSearch 搜索引擎
LogStash 日志收集
Kibana 日志可视化
Nginx 静态资源服务器
Driud 数据库连接词
Minio 对象存储
Swagger-UI 文档生成


## 业务篇


项目结构和开发环境搭建

权限模块 商品模块 订单模块 营销模块 会员模块
数据库表解析
接口设计与实现
功能设计与实现

mall数据库表概览
pms_*：商品模块相关表  
oms_*：订单模块相关表  
sms_*：营销模块相关表  
ums_*：权限模块相关表  
cms_*：内容模块相关表  

### 我的模块

地址管理
我的足迹
我的收藏
我的关注
我的评价
设置


### 商品模块

admin后台管理
商品管理
商品列表
添加商品
商品分类
商品类型
品牌管理


## 订单模块

订单列表
订单设置
秒杀订单超时
正常订单超时
发货超过
订单完成超时
退货申请处理
退货原因设置

## 营销模块

活动列表
<<<<<<< HEAD
```ts [types/Campaign.ts]
=======
```ts [types/campaign.ts]
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4
export interface Campaign {
  id: string;
  title: string;
  type: CampaignType;
  status: CampaignStatus,
  startTime: string,
  endTime: string,
  description: string,
  rules: CampaignRule[],
  targetAudience: TargetAudience;
  createdAt: string,
  updatedAt：string
}


export enum CampaignType {
  FLASH_SALE = 'FLASH_SALE',
  DISCOUNT = 'DISCOUNT',
  BUNDLE = 'BUNDLE',
  GROUP_BUY = 'GROUP_BUY',
  LIMITED_TIME = 'IMITED_TIME',
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
  id: string;
  type: RuleType;
  conidtion: string;
  value: number;
}


export interface CampaignRule {
  id: string,
  type: RuleType,
  condition: string,
  value:number
}

export enum RuleType {
  MIN_PURCHASE = 'MIN_PURCHASE',
  PRODCUT_QUANTITY = 'PRODUCT_QUANTITY',
  CATEGORY_SPECIFIC = 'CATEGORY_SPECIFIC',
  USER_LEVEL = 'USER_LEVEL'
}


export interface CampaignReward {
  id: string;
  type: RewardType;
  value: number;
  description: string;
}

export enum RewardType {
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
  FIXED_DISCOUNT = 'FIXED_DISCOUNT',
  FREE_SHIPPING =  'FREE_SHIPPING',
  BOUNS_POINT = 'BONUS_POINTS',
  FREE_PRODUCT = 'FREE_PRODUCT'
}


export interface TargetAudience {
  userLevels: string[]
  regions: string[]
  tags: string[]
  minAge?: number;
  maxAge?:number;
}


```

## 部署篇



