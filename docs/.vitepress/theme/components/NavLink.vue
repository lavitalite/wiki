<script setup lang="ts">
import { slugify } from "@mdit-vue/shared";
import { computed } from "vue";

const props = defineProps<{
  icon?: string | { symbolId: string };
  badge?:
    | string
    | {
        text: string;
        type: "info" | "tip" | "warning" | "danger";
      };
  title: string;
  desc?: string;
  link: string;
}>();

const formatTitle = computed(() => {
  if (!props.title) return "";
  return slugify(props.title);
});

const formatBadge = computed(() => {
  if (typeof props.badge !== "string") return props.badge;
  return {
    text: props.badge,
    type: "info",
  };
});

const isExternalIcon = (icon?: string | { symbolId: string }): icon is string =>
  icon != null && typeof icon === "string";
</script>

<template>
  <a v-if="link" :href="link" target="_blank" rel="noreferrer" class="nav-link">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="props.icon">
          <div v-if="isExternalIcon(props.icon)" class="icon">
            <img :src="props.icon" :alt="formatTitle" />
          </div>
          <svg v-else class="icon">
            <use :href="`#${props.icon.symbolId}`" />
          </svg>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title">
          {{ title }}
        </h5>
      </div>
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style scoped>
.nav-link {
  --nav-icon-box-size: 50px;
  --nav-icon-size: 45px;
  --nav-box-gap: 12px;
  display: block;
  height: 100%;
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.25s;
}

.nav-link:hover {
  border-color: var(--vp-c-brand);
  box-shadow: var(--vp-shadow-2);
  text-decoration: initial;
  background-color: var(--vp-c-bg-soft-up);
  transform: translateY(-5px);
}

.nav-link .box {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: var(--nav-box-gap);
  color: var(--vp-c-text-1);
}

.nav-link:has(.box.has-badge) {
  padding-top: calc(var(--nav-box-gap) + 12px);
}

.nav-link .box-header {
  display: flex;
  align-items: center;
}

.nav-link .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc(var(--nav-box-gap) - 2px);
  border-radius: 6px;
  width: var(--nav-icon-box-size);
  height: var(--nav-icon-box-size);
  background-color: var(--vp-c-bg-soft-down);
  transition: background-color 0.25s;
}

.nav-link .icon img {
  object-fit: contain;
  width: 80%;
  height: 80%;
}

.nav-link .icon svg {
  object-fit: contain;
}

.nav-link .title {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
}

.nav-link .badge {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}

.nav-link .desc {
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  overflow: hidden;
  text-overflow: ellipsis;
  margin: calc(var(--nav-box-gap) -2px) 0 0;
}

@media (max-width: 960px) {
  .nav-link {
    --nav-icon-box-size: 60px;
    --nav-icon-size: 60px;
    --nav-box-gap: 15px;
  }
}
</style>
