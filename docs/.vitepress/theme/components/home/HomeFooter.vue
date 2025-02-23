<template>
  <footer class="footer">
    <div v-if="footer.groups" class="footer__section-container">
      <div
        class="footer__section"
        v-for="(section, idx) in footer.groups"
        :key="section.title"
      >
        <h1 class="footer__section-title">
          <template v-if="section.icon"
            ><VIcon :slug="section.icon"></VIcon> </template
          >&nbsp;
          {{ section.title }}
        </h1>
        <h2
          class="footer__section-link"
          v-for="(link, idx) in section.links"
          :key="link.name"
        >
          <template v-if="link.icon"
            ><VIcon :slug="link.icon" class="link-icon"></VIcon>&nbsp;</template
          >
          <a
            :href="link.url ? link.url : 'javascript:void(0)'"
            :target="isExternalLink(link.url) ? '_blank' : '_self'"
            :aria-label="link.name"
            rel="noopener noreferrer"
            class="footer__section-link"
            >{{ link.name }}
            <VIcon slug="mdi:external-link" class="external-link"></VIcon>
          </a>
        </h2>
      </div>
    </div>
    <div class="footer__info">
      <h1 class="footer_info-item" v-if="footer.record?.icp">
        <VIcon
          :slug="footer.record.icpIcon || 'fluent:globe-shield-48-filled'"
        ></VIcon
        >&nbsp;
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="工信部备案号"
        >
          {{ footer.record.icp }}
        </a>
      </h1>
      <span class="info-spacing" aria-hidden="true"> </span>
      <h1 class="footer_info-item" v-if="footer.record?.mps">
        <VIcon
          :slug="footer.record.mpsIcon || 'fluent:shield-checkmark-20-filled'"
        ></VIcon
        >&nbsp;
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          {{ footer.record.mps }}
        </a>
      </h1>
      <span class="info-spacing" aria-hidden="true"> </span>
      <h1 class="footer_info-item">
        <VIcon slug="mdi:copyright"></VIcon>&nbsp;{{ year }}&nbsp;
        <a
          :href="footer.author?.link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          {{ footer.author?.name }}. </a
        >&nbsp;All Right Reserved
      </h1>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { type FooterData, isExternalLink } from "../../types";
import VIcon from "../VIcon/VIcon.vue";
const props = defineProps<{ data: FooterData }>();
const footer = props.data;

const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: var(--vp-c-bg-alt);
}

.footer__section-container {
  display: flex;
  justify-content: space-evenly;
  max-width: 75%;
  margin-block: 1.25em;
  margin-inline: auto;
}

.footer__section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.footer__section-title {
  display: inline-flex;
  align-items: center;
  font-size: 0.75em;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-bottom: 0.5em;
}

.footer__section-link {
  opacity: 0.9;
  font-size: 0.8em;
  line-height: 2.4;
  letter-spacing: 0.025em;
  position: relative;
  .link-icon {
    margin-block-start: -0.125em;
  }

  .external-link {
    transform: rotate(0deg);
    color: var(--vp-c-text-3);
    font-size: 1.2em;
    vertical-align: baseline;
  }
}

.footer__info {
  margin-block-end: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.footer_info-item {
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.025em;
  font-size: 0.75em;
}
.info-spacing {
  margin-inline-start: 1em;
}

@media (max-width: 960px) {
  .footer__section-container {
    display: grid;
    --section-gap: 1.25em;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-row-gap: var(--section-gap);
    grid-column-gap: var(--section-gap);
    grid-auto-flow: row dense;
  }
}
</style>
