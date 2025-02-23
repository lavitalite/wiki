<script setup lang="ts">
import { computed } from "vue";
import { slugify } from "@mdit-vue/shared";
import type { INavLink } from "../utils/types";

import NavLink from "./NavLink.vue";

const props = defineProps<{
  title: string;
  noIcon?: boolean;
  items: INavLink[];
}>();

const formatTitle = computed(() => {
  return slugify(props.title);
});
</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="nav-links">
    <NavLink v-for="item in items" v-bind="item"></NavLink>
  </div>
</template>

<style scoped>
.nav-links {
  --nav-gap: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-row-gap: var(--nav-gap);
  grid-column-gap: var(--nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
}
</style>
