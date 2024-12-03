/* eslint-disable */
// @ts-nocheck

export {}


/** types for global registered components */
declare module "vue" {
  RouterLink: typeof import('vue-router')['RouterLink']
  RouterView: typeof import('vue-router')['RouterView']
}




declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}