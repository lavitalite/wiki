import BEmbed from './BEmbed.vue'
import type {App} from 'vue'

export {
  BEmbed
}

export const EmbedPlugin = {
  install: (app:App) => {
    app.component('BEmbed', BEmbed)
  }
}

