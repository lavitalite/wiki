import { type DefaultTheme, defineConfig } from 'vitepress'
import footnote_plugin from "markdown-it-footnote"


const SITE_URL = 'https://blog.xiyuan.cc'
const SITE_TITLE = "XiYuan's Tech Insight"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE_TITLE,
  description: "insight,content, thoughts that worth sharing for dev-enthusiast",
  srcDir: 'posts',
  cleanUrls: true,
  ignoreDeadLinks:true,
  base: '/tech_insight/',
  markdown:{
    lineNumbers: true,
    math: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      detailsLabel: "详细信息"
    },
    config:(md)=>{
     md.use(footnote_plugin)
     
    },

  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '每日阅读', link: '/readings' },
      { text: '工欲善其事', link: '/devtools' }
    ],

    sidebar: {
      '/devtools': {base: '/devtools/', items: sidebarDevtools()},
      '/devtools/reference/': { base: 'devtools/reference/', items: sidebarReference() }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiyuan404/tech_insight' }
    ],
    footer: {
      message: 'All Content retrived from genius In Web, All right reserved for them, Hereby granted<br/>本博客基于vitepress搭建<a href="https://vitepress.dev/" rel="noopener" target="_blank">power by vitepress</a>在此致谢。 '
    }
  }
})

function sidebarDevtools(): DefaultTheme.SidebarItem[]{
  return [
    {
      text: "Vitepress",
      collapsed: false,
      items: [
        {text: "setup", link: "vitepress/guide/setup"},
        {text: "nutshell", link: "vitepress/guide/nutshell"},
        {text: "markdown", link: "vitepress/guide/markdown"},
        {text: "asset handling", link: "vitepress/guide/asset"},
        {text: "customization", link: "vitepress/guide/customization"},
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