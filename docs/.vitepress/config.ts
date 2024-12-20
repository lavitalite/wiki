
import { type DefaultTheme, defineConfig, type HeadConfig, } from "vitepress";
import { metaName } from "./theme/utils/head";
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { resolve } from 'node:path'
import { transformerTwoslash} from '@shikijs/vitepress-twoslash'

import { createFileSystemTypesCache } from '@shikijs/vitepress-twoslash/cache-fs'

const SITE_URL = "https://blog.xiyuan.cc";
const SITE_TITLE = "XiYuan's Tech Insight";

export const BASE_PATH = "/tech_insight/";

const SidebarXLab: DefaultTheme.SidebarItem[] = [

  {
    text: "Mall商城系统",
    collapsed: false,
    /**
     * Base path for the children items.
     */
    base: "/xlab/mall/",
    items: [
      { text: "arch", link: "arch" },
      { text: "deploy", link: "deploy" },
    ],
  },
  {
    text: "IM即时通讯",
    collapsed: false,
    items: [
      { text: "flight-rules", link: "git/flight-rules" },
      { text: "internal", link: "git/internal" }
    ]
  },
  {
    text: "CMS+livenotebook",
    collapsed: false,
    items: [
      { text: "flight-rules", link: "git/flight-rules" },
      { text: "internal", link: "git/internal" }
    ]
  },
  {
    text: "flowable",
    collapsed: false,
    base: '/xlab/flowable/',
    items: [
      { text: "setup", link: "setup" },
      { text: "internal", link: "git/internal" },
    ],
  },
];





function sidebarDevtools(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Vitepress",
      collapsed: false,
      items: [
        { text: "setup", link: "vitepress/setup" },
        { text: "nutshell", link: "vitepress/nutshell" },
        { text: "markdown", link: "vitepress/markdown" },
        { text: "asset handling", link: "vitepress/asset" },
        { text: "seo for CMS", link: "vitepress/seo" },
      ]
    },
    {
      text: "git",
      collapsed: false,
      items: [
        { text: "flight-rules", link: "git/flight-rules" },
        { text: "internal", link: "git/internal" },
      ],
    },
  ];
}




const Nav: DefaultTheme.NavItem[] =  [
  {
    text: 'Devtools',
    items: [
      { text: 'git', link: '/devtools/git/flight-rules' },
      { text: 'effective-shell', link: '/devtools/effective-shell/shell' },
      { text: 'github', link: '/devtools/github/search'},
    ],
    activeMatch: '^/devtools/'
  },
  {
    text: 'XLab',
    items: [
      { text: 'mall', link: '/xlab/mall/arch'},
      { text: 'flowable', link: '/xlab/flowable/setup'}
    ],
    activeMatch: '^/xlab/'
  },
  {
    text: 'CI/CD',
    items: [
      { text: 'docker', link: '/deploy/docker/why-docker'},
    ],
    activeMatch: '^/deploy/docker'
  },


]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE_TITLE,
  description:
    "insight,content, thoughts that worth sharing for dev-enthusiast",
  cleanUrls: true,
  // srcDir: 'docs',
  base: BASE_PATH,
  outDir: './dist',
  // srcExclude: ["oss"],
  lastUpdated:true,
  head: [
    metaName(
      "google-site-verification",
      "uaXLiv-7IiBgEuYIW133LHlLOdqfTbktmr58H_i5Ox4"
    ),
    ['link', { rel: 'icon', href: `${BASE_PATH}favicon.svg`, type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: `${BASE_PATH}favicon.ico`, type: 'image/png', sizes: '16x16' }],
  ],
  vite: {
   /*  build: {
      rollupOptions: {
        //  打包分类
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        }
      }
    }, */
    plugins: [
      groupIconVitePlugin() as Plugin,
    ],
    resolve: {
      alias: {
        '@/Particles': resolve(__dirname, './theme/components/Particles/index.vue')
      }
    },
  },
  markdown: {
    lineNumbers: true,
    math: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      detailsLabel: "详细信息",
    },
    config(md) {
      md.use(groupIconMdPlugin)
    },
    codeTransformers: [
      transformerTwoslash({
        typesCache: createFileSystemTypesCache() 
      })
    ]
  },
  themeConfig: {

    logo: '/logo.svg',
    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
        indexName: 'vitepress',
      }
    },
    carbonAds: { code: 'CEBDT27Y', placement: 'vuejsorg' },
    nav:Nav,
    sidebar: {
      "/devtools": { base: "/tect-insight/", items: sidebarDevtools() },
      "/xlab/": SidebarXLab,
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/xiyuan404/tech_insight" },
    ],
    footer: {
      message:
        'All Content retrived from genius In Web, All right reserved for them, Hereby granted<br/>本博客基于vitepress搭建<a href="https://vitepress.dev/" rel="noopener" target="_blank">power by vitepress</a>在此致谢。 ',
    },
  },
  async transformPageData(pageData, { siteConfig }) {
      // console.log(pageData)
  }
});
