<template>
  <div></div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useData } from "vitepress";
const { theme, frontmatter } = useData();

const data = reactive({
  isOriginal: frontmatter.value?.isOriginal ?? true,
  author: frontmatter.value?.author ?? theme.value.articleMetadataConfig.author,
  authorLink:
    frontmatter.value?.authorLink ??
    theme.value.articleMetadataConfig.authorLink,
  articleTitle: frontmatter.value?.articleTitle ?? frontmatter.value?.title,
  articleLink:
    frontmatter.value?.articleLink ?? decodeURI(window.location.href),
});

const { isOriginal, author, authorLink, articleTitle, articleLink } =
  toRefs(data);
toRefs(data);
</script>

<style scoped></style>
