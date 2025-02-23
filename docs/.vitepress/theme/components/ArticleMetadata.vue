<template>
  <div class="meta-wrapper">
    <div class="meta-item original"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useData } from "vitepress";

const props = defineProps({
  article: Object,
});

const { theme } = useData();

const data = reactive({
  isOriginal: props.article?.isOriginal ?? true,
  author: props.article?.author ?? theme.value.articleMetadataConfig.author,
  authorLink:
    props.article?.authorLink ?? theme.value.articleMetadataConfig.authorLink,
  date: new Date(props.article?.date) || Date.now().toLocaleString(),
  categories: props.article?.categories ?? [],
  showCategory: props.article?.showCategory ?? true,
  tags: props.article?.tags ?? [],
  showViewCount: theme.value.articleMetadataConfig?.showViewCount ?? false,
  viewCount: 0,
});

const {
  isOriginal,
  author,
  authorLink,
  date,
  categories,
  showCategory,
  tags,
  viewCount,
  showViewCount,
} = toRefs(data);
</script>

<style scoped></style>
