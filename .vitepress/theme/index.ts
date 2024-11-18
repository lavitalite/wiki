import './custom.css'
import DefaultTheme from 'vitepress/theme'
import Tags from './components/Tags.vue'
import type { Theme } from 'vitepress'
import {watch} from 'vue'
// import DateTime from './components/DateTime.vue'

import './rainbow.css'
import './custom.css'


export default {
    extends: DefaultTheme,
    enhanceApp({ app, router }) {
      // app.component('datetime', DateTime)
      app.component('tags', Tags)
     
      
    if (typeof window === 'undefined')
      return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/tech_insight/'),
      { immediate: true },
    )
    },

  } satisfies Theme


  if(typeof window !== undefined) {
     // detect browser, add to class for conditional styling
    const browser = navigator.userAgent.toLowerCase()
    if ( browser.includes('chrome'))
      document.documentElement.classList.add('browser-chrome')
    else if (browser.includes('firefox')){
      document.documentElement.classList.add('browser-firefox')
    }
    else if (browser.includes('safari')){
      document.documentElement.classList.add('browser.safari')
    }
  }


/** 
 * homepage rainbow aniamtion
 *  样式动态注入
*/ 


let homePageStyle:HTMLStyleElement | undefined

function updateHomePageStyle(value: boolean) {
  debugger
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}