-- Active: 1733190520250@@127.0.0.1@3306
CREATE DATABASE IF NOT EXISTS mall
DEFAULT CHARACTER SET utf8mb4 -- 汉字和emoji
COLLATE utf8mb4_unicode_ci; -- 比较排序

USE mall;

-- 营销活动主表

CREATE TABLE campaigns (
  id VARCHAR(36) PRIMARY KEY COMMENT '活动唯一标识' ,
  name VARCHAR(100) NOT NULL COMMENT '活动名称' ,
  type VARCHAR(20) NOT NULL CHECK ( type IN ('FLASH_SALE', 'DISCOUNT', 'BUNDLE', 'GROUP_BUY', 'LIMITED_TIME', 'NEW_USER') )
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN 'DRAFT', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'ENDED', 'CANCELLED')
  start_time TIMESTAMP NOT NULL COMMENT '活动开始时间',
  end_time TIMESTAMP NOT NULL COMMENT '活动结束时间',
  description TEXT COMMENT '活动主表',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT check_campaign_dates CHECK (end_time >  start_time),
) COMMENT '营销活动主表';


-- 活动规则表

CREATE TABLE campaign_rules (
  id VARCHAR(36) PRIMARY KEY,
  campaign_id VARCHAR(36) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type in ('MIN_PURCHASE', 'PRODUCT_QUANTITY', 'CATEGORY','USER_LEVEL')),
  condition_desc VARCHAR(255) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  FOREIGN KEY (campaign_Id) REFERENCES campaigns(id) ON DELETE CASCADE
)


-- 活动奖励
CREATE TABLE campaign_rules (
  id VARCHAR(36) PRIMARY KEY,
  campaign_id VARCHAR(36) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type in 'PRECENTAGE_DISCOUNT', 'FIXED_DISCOUNT', 'FREE_SHIPPING', 'BOUNS_POINTS', 'FREE_PRODCUT')
  value DECIMAL(10,2) NOT NULL
  description VARCHAR(255)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Foreign Key (campaign_id) REFERENCES campaigns(id)  ON DELETE CASCADE
)

-- 目标受众

CREATE Table campaign_target_audiences (
  id VARCHAR(36) PRIMARY KEY,
  campaign_id VARCHAR(36) NOT NULL,
  min_age INT,
  max_age INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Foreign Key (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  CONSTRAINT check_age_range CHECK (min_age IS NULL OR max_age IS NULL OR max_age >= min_age)
)


-- 用户等级关联表

CREATE Table campaign_user_levels (
  campaign_id VARCHAR(36) NOT NULL,
  user_level VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (campaign_id, user_level),
  Foreign Key (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
)

-- 地区关联表
CREATE Table campaign_regions (
  campaign_id VARCHAR(36) NOT NULL,
  region VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (campaign_id, region),
  Foreign Key (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
)

-- 

CREATE Table campaign_tags (
  campaign_id VARCHAR(36) NOT NULL,
  tag VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (campaign_id, tag)
  Foreign Key (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
)


-- 活动参与记录表
CREATE Table campaign_participations (
  id VARCHAR(36) PRIMARY KEY,
  campaign_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  participated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  Foreign Key (campaign_id) REFERENCES campaigns(id) on DELETE CASCADE
)

-- 活动效果统计表

CREATE Table campaign_statistics (
  campaign_id VARCHAR(36) PRIMARY KEY,
  total_participants INT NOT NULL DEFAULT 0,
  total_orders INT NOT NULL DEFAULT 0,
  total_revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
  last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  Foreign Key (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE 
)

-- 索引

CREATE INDEX idx_campaigns_status ON campaigns(status)
CREATE INDEX idx_campaigns_type on campaigns(type)
CREATE INDEX idx_campaigns_dates ON campaigns(start_time, end_time)
CREATE INDEX idx_campaigns_rules_type ON campaign_rules(type)
CREATE INDEX idx_campaigns_rewards_type ON campaign_rewards(type)
CREATE INDEX idx_participations_user ON campaign_participations(user_id)
CREATE INDEX idx_participations_campaign_date ON campaign_participations(campaign_id, participated_at)



-- 授权

CREATE USER 'mall_admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON mall.* TO 'mall_admin'@'localhost';
FLUSH PRIVILEGES;