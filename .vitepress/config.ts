import { defineConfig } from 'vitepress'
import footnote_plugin from "markdown-it-footnote"


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Moon Landing Project",
  description: "insight, expresion, thoughts worth sharing",
  srcDir: 'src',
  cleanUrls: true,
  markdown:{
    lineNumbers: true,
    config:(md)=>{
     md.use(footnote_plugin)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
