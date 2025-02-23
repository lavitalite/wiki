import { HeadConfig } from "vitepress";

import { metaData } from "./constants";

export const head: HeadConfig[] = [

  ['link', { rel: 'icon', href: 'logo.svg', type: 'image/svg+xml' }],
  ['link', { rel: 'alternate icon', href: 'logo.png', type: 'image/png', sizes: '16x16' }],

  ['meta', { name: 'author', content: 'xiyuan' }],
  ['meta', { name: 'keywords', content: '知识库，博客' }],


  ['meta', { name: 'theme-color', content: '#ffffff' }],

  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:local', content: metaData.locale }],
  ['meta', { property: 'og:site_name', content: metaData.siteName }],
  ['meta', { property: 'og:title', content: metaData.title }],
  ['meta', { property: 'og:image', content: metaData.image }],
  ['meta', { property: 'og:url', content: metaData.site }],
  // 页面访问量统计
  ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
]