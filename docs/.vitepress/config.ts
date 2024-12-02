import { type DefaultTheme, defineConfig, type HeadConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { metaName, linkTag } from './theme/utils/head'

import {toRandDir} from './theme/utils/roll-redirect'



const SITE_URL = 'https://blog.xiyuan.cc'
const SITE_TITLE = "XiYuan's Tech Insight"

const BASE_PATH = '/tech_insight'










// xlab nav
const XLab:  DefaultTheme.NavItemWithLink[] = [
  {text: 'flowable', link: '/xlab/flowable/main'},
  {text: 'mall', link: '/xlab/mall/arch'}
]

// xlab sidebar
const SidebarXLab: DefaultTheme.SidebarItem[] = [
  {
    text: "商城系统",
    collapsed: false,
    /**
     * Base path for the children items.
     */
    base: '/xlab/mall/',
    items: [
      {text: "arch", link: "arch"},
      {text: "deploy", link: "test"},
    ]
  },
  {
    text: "IM即时通讯",
    collapsed: false,
    items: [
      {text: "flight-rules", link: "git/flight-rules" },
      {text: "internal", link: "git/internal"}
    ]
  },
  {
    text: "CMS+livenotebook",
    collapsed: false,
    items: [
      {text: "flight-rules", link: "git/flight-rules" },
      {text: "internal", link: "git/internal"}
    ]
  },
  {
    text: "flowable",
    collapsed: false,
    items: [
      {text: "flight-rules", link: "git/flight-rules" },
      {text: "internal", link: "git/internal"}
    ]
  },
  
  
]


function sidebarDevtools(): DefaultTheme.SidebarItem[]{
  return [
    {
      text: "Vitepress",
      collapsed: false,
      items: [
        {text: "setup", link: "vitepress/setup"},
        {text: "nutshell", link: "vitepress/nutshell"},
        {text: "markdown", link: "vitepress/markdown"},
        {text: "asset handling", link: "vitepress/asset"},
        {text: "seo for CMS", link: "vitepress/seo"},
      ]
    },
    {
      text: "git",
      collapsed: false,
      items: [
        {text: "flight-rules", link: "git/flight-rules" },
        {text: "internal", link: "git/internal"}
      ]
    }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[]{
  return [
    {
      text: "Devtools",
      collapsed: false,
      items: [
        {text: "vitepres in a nutshell", link: "vitepress-nutshell.md"},
        {text: "getting started", link: "setup.md"},
        {text: "Routing", link: "routing.md"},
        {text: "Deploy", link: "deploy.md"}
      ]
    }
  ]
}



const Nav: DefaultTheme.NavItem[] = [
  {
    text: 'XLab',
    items: [
      {
        text: 'XLab',
        items: XLab,
      },
    ],
    activeMatch: '^/xlab/',
  },

  { text: 'Interactive Docs', link: '/interactive/', target: '_blank' },
  { text: 'Playground', link: '/play/', target: '_blank' },
  { text: 'Tutorial', link: 'https://tutorial.unocss.dev/', target: '_blank' },
  {
    text: `v`,
    items: [
      {
        text: 'Release Notes',
        link: 'https://github.com/unocss/unocss/releases',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/unocss/unocss/blob/main/CONTRIBUTING.md',
      },
      {
        component: 'RainbowAnimationSwitcher',
        props: {
          text: 'Rainbow Animation',
        },
      },
    ],
  },
]


export default defineConfig({
  title: SITE_TITLE,
  description: "insight,content, thoughts that worth sharing for dev-enthusiast",
  cleanUrls: true,
  ignoreDeadLinks:true,
  base: BASE_PATH,
  //  provide static assets that are not directly referenced in any of your Markdown or theme components, 
  // put these files in the public directory under the source directory
  head: [
    metaName('google-site-verification', 'uaXLiv-7IiBgEuYIW133LHlLOdqfTbktmr58H_i5Ox4'),
    linkTag('icon', { href: `${BASE_PATH}/favicon.svg`, type: 'image/svg+xml' }),
    linkTag('alternate icon', {href: `${BASE_PATH}/favicon.ico`, type: 'image/png', sizes: '16x16'})
  ],
  vite: {
    server: {
      fs: {
        allow: ['.']
      }
    },
    plugins: [
      groupIconVitePlugin(),
      {
        name: 'custom-route-handler',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/roll') {
              const docsDir = path.join(__dirname, '..')
              const randomDir = toRandDir(docsDir)
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ redirectPath: `/${randomDir}/` }))
            } else {
              next()
            }
          })
        }
      }
    ],
    
  },
  markdown:{
    lineNumbers: true,
    math: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      detailsLabel: "详细信息"
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  // rewrites: {
  //   'roll/index.md': 'roll/index'
  // },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: Nav,
    sidebar: {
      '/devtools': {base: '/devtools/', items: sidebarDevtools()},
      '/devtools/reference/': { base: 'devtools/reference/', items: sidebarReference() },
      '/xlab/': SidebarXLab
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiyuan404/tech_insight' }
    ],
    footer: {
      message: 'All Content retrived from genius In Web, All right reserved for them, Hereby granted<br/>本博客基于vitepress搭建<a href="https://vitepress.dev/" rel="noopener" target="_blank">power by vitepress</a>在此致谢。 '
    }
  }
})
