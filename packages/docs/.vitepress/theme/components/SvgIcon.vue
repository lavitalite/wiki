<template>
  <div></div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string | { symbolId: string };
    size?: string;
    alt?: string;
  }>(),
  {
    size: "24px",
  }
);
</script>

<style scoped></style>
