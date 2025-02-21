---
sidebar: false
prev: false
next: false
layoutClass: nav-layout
---


<script setup>
import {data} from './data/site.ts'
import { withBase } from 'vitepress'
</script>



<style src="/../.vitepress/theme/styles/nav.css"> </style>
<VIcon icon="github"></VIcon>

<NavLinks v-for="{title, items} in data" :title="title" :items="items" />


