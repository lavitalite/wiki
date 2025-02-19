import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'

import { initSvgSymbols } from "@utils/svg-symbol-register"

// import './styles/settings/_colors.scss'
import './styles/color.css'
import './styles/custom.css'
import './styles/component-vars.css'
import './styles/overwrite.css'
import './styles/home.css'
import 'virtual:group-icons.css'


import NavLinks from './components/NavLinks.vue'
import { VIcon } from './components/VIcon'
import { VChip } from './components/VChip'
import Announcement from './components/Announcement.vue'
import HomeUnderline from './components/home/HomeUnderline.vue'
import HomeFooter from './components/home/HomeFooter.vue'
import { data as FooterData } from './data/footer'

// import 'virtual:group-icons.css'
initSvgSymbols('../../assets/*.svg')



export default {
  ...DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    const { frontmatter } = useData()

    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      'home-hero-info-before': () => h(Announcement),
      'home-hero-image': () => h(VIcon, {
        slug: 'dragon-logo',
        class: 'VPImage image-src'
      }),
      'layout-bottom': () => h(HomeFooter, { data: FooterData })
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('NavLinks', NavLinks)
    app.component('VIcon', VIcon)
    app.component('VChip', VChip)
    app.component('HomeUnderline', HomeUnderline)
  }
} satisfies Theme