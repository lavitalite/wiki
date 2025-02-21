import type { DefaultTheme } from "vitepress";
import { nav } from './nav'
import { sidebar } from "./sidebar";
import { localSearchOptions } from "./search/local-search";
import { BASE_PATH } from "../config";

export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,
  logo: '/logo.svg',
  outline: {
    level: 'deep'
  },
  search: {
    provider: 'local',
    options: localSearchOptions
  },
  socialLinks: [
    { icon: "github", link: "https://github.com/lavitalite/wiki" },
  ],
  // @ts-ignore
  articleMetaConfig: {
    author: 'xiyuan',
    authorLink: '/about/biography',
  },
  copyright: {
    license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
    licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
  },
  editLink: {
    pattern: 'https://github.com/lavitalite/wiki/edit/v1-vitepress/packages/docs/content/`:path',
    text: '在 GitHub 上编辑此页'
  },
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  commentConfig: {
    type: 'gitalk',
    showComment: true
  },
  footerConfig: {
    showFooter: true, // 是否显示页脚
    icpRecordCode: '津ICP备2022005864号-2', // ICP备案号
    publicSecurityRecordCode: '津公网安备12011202000677号', // 联网备案号
    copyright: `Copyright © 2019-${new Date().getFullYear()} xiyuan` // 版权信息
  }
}


