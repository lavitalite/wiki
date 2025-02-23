import type { FooterData } from "../types";




export const data: FooterData = {
  record: {
    icp: '鄂ICP备2024060426号',
    mps: '粤公网安备44200102445449号',
  },
  author: {
    name: 'lavitalite',
    link: 'https://github.com/lavitalite'
  },
  groups: [
    {
      title: '站点导航',
      icon: 'mdi:apple-safari',
      links: [
        {
          name: '收藏站点',
          url: '/wiki/nav'
        },
        {
          name: '玄学宝典',
          url: 'https://github.com/Theo-Messi/xx.theojs.cn'
        },
        {
          name: '常用配置文件',
          url: 'https://github.com/Theo-Messi/dotfiles'
        },
        {
          name: 'Lumen',
          url: 'https://github.com/Theo-Messi/lumen'
        }
      ]
    },
    {
      title: '合作伙伴',
      icon: 'mdi:account-group',
      links: [
        {
          name: '青云梯',
          icon: 'fire',
          url: 'https://qytcc01.qingyunti.pro/register?aff=jjgD79Jd'
        },
        { name: '银河录像局', url: 'https://nf.video/kaIuE' },
        { name: '奈飞小铺', url: 'https://ihezu.love/UKTer6' },
        {
          name: 'FlyingBird',
          url: 'https://fbinv02.fbaff.cc/auth/register?code=RZP3'
        },
        {
          name: '飞兔云',
          url: 'https://feitu.im/index.html?register=2cFF8mg4'
        },
        {
          name: 'SMS-Activate',
          url: 'https://sms-activate.io/?ref=8170513'
        }
      ]
    },
    {
      title: '观影指南',
      icon: 'material-symbols:movie-outline',
      links: [
        {
          name: 'Netflix',
          url: 'https://doc.theojs.cn/streaming/Netflix-guide'
        },
        {
          name: 'Disney+',
          url: 'https://doc.theojs.cn/streaming/Disney-introduce'
        },
        {
          name: 'Spotify Premium',
          url: 'https://doc.theojs.cn/streaming/Spotify'
        },
        {
          name: 'YouTube Premium',
          url: 'https://doc.theojs.cn/streaming/YouTube'
        },
        { name: 'Hulu', url: 'https://doc.theojs.cn/streaming/Hulu' },
        { name: 'HBO Max', url: 'https://doc.theojs.cn/streaming/HBO-Max' }
      ]
    },
    {
      title: '相关链接',
      icon: 'mdi:link',
      links: [
        { name: 'Theo-Docs', url: 'https://doc.theojs.cn/' },
        { name: '玄学宝典', url: 'https://xx.theojs.cn/' },
        { name: 'VitePress', url: 'https://vitepress.dev/' }
      ]
    }
  ]
}