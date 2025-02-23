import { useData } from 'vitepress'

import { computed, type ComputedRef } from 'vue'
import { Permalink } from './types'



export const usePermalink = (): ComputedRef<Permalink | undefined> => {
  const { frontmatter } = useData()
  return computed(() => frontmatter.value.hero?.permalink)
}


export const isExternalLink = (link: string): boolean => {
  return /^((f|ht)tps?:)?\/\//.test(link)
}

