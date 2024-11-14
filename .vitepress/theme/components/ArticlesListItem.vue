<script setup>

import Tags from './tags' 

const props = defineProps({
    article: {
        type: Object,
        required: true,
    }
})

const {
    excerpt,
    frontmatter: {title, publishedAt, tags},
    url
} = props.title
</script>

<template>
    <h2><a :href="url" v-html="title"></a></h2>
    <datetime :date="publishedAt" format="longdate"></datetime>
    <tags :tag="tags"></tags>
    <p v-if="excerpt" v-html="excerpt"></p>
    <a :href="url"> Continue reading</a>
</template>