import DefaultTheme from 'vitepress/theme'
import { type Theme } from 'vitepress'
import "@utils/svg-symbol-register"





// import 'virtual:group-icons.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {

  }
} satisfies Theme