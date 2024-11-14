import './custom.css'

import DefaultTheme from 'vitepress/theme'
import Tags from './components/Tags.vue'
// import DateTime from './components/DateTime.vue'


export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
      // app.component('datetime', DateTime)
      app.component('duration', Duration)
      app.component('tags', Tags)
    },
  }