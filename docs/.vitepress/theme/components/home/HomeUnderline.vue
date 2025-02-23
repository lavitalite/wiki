<script setup lang="ts">
import { useData } from "vitepress";
import { onMounted, ref } from "vue";
import { annotate } from "rough-notation";
const { frontmatter: fm } = useData();

const textRef = ref<HTMLElement | null>(null);

const props = withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: "span",
  }
);

onMounted(() => {
  // 等待目标元素出现
  const moveContent = () => {
    const target = document.querySelector(".VPHero .text");
    if (target) {
      if (textRef.value) {
        target.innerHTML = "";
        target.appendChild(textRef.value);
      }
      if (textRef.value) {
        const annotation = annotate(textRef.value, {
          type: "underline",
          color: "var(--vp-c-brand-1)",
          padding: 2,
          strokeWidth: 2,
          animationDuration: 800,
          iterations: 2,
          multiline: true,
        });
        // 显示动画
        annotation.show();
      }
    } else {
      // 如果元素还不存在，继续等待
      requestAnimationFrame(moveContent);
    }
  };

  moveContent();
});
</script>

<template>
  <component :is="props.tag" ref="textRef">
    {{ fm.hero.text }}
  </component>
</template>

<style scoped>
.hero-text {
  display: inline-block;
  position: relative;
}
</style>
