<script setup>
import { onBeforeMount, reactive } from 'vue'
import { data as importedData } from '../../posts/articles.data'

import ArticlesList from './components/ArticlesList.vue';


/** @type {Record<string, import('vitepress').ContentData[]>} */
const data = reactive(importedData)

// Normalize date
data.forEach(article => {
  article.frontmatter.publishedAt = new Date(article.frontmatter.publishedAt)
})

onBeforeMount(() => {
    /**
     * try to access brower API on import
     * use code that assumes a brower env on import, dynamically import them
     */
  import('./utils/frontmatter').then(({ excerptToLink }) => {
    data.forEach(excerptToLink)
  })
})
</script>

<template>
  <ArticlesList :articles="data"/>
</template>