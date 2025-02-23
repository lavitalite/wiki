<template>
  <!-- 
   @see https://bughunters.google.com/learn/invalid-reports/web-platform/navigation/5825028803002368/phishing-by-navigating-browser-tabs
    window.opener.location.assign() change the background tab to phishing page
  -->
  <a
    v-if="permalink"
    class="permalink pulse"
    :href="permalink.copy ? 'javascript:void(0)' : permalink.link"
    :target="isExternalLink(permalink.link) ? '_blank' : '_self'"
    :aria-label="permalink.title"
    rel="noopener noreferrer"
    @click="handleClick($event, permalink)"
  >
    <div class="permalink__content">
      <h1 class="title" v-html="permalink.title"></h1>
      <p
        v-if="permalink.content"
        class="content"
        v-html="permalink.content"
      ></p>
      <span v-if="permalink.date" class="time-info">
        <span class="icon">
          <VIcon :slug="permalink.dateIcon || 'clock'" />
        </span>
        <p aria-hidden="true" v-html="permalink.dateText"></p>
        <p class="date" :aria-label="permalink.date">{{ permalink.date }}</p>
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { isExternalLink, usePermalink, type Permalink } from "../types";
import { VIcon } from "./VIcon";

const permalink = usePermalink();

function handleClick(event: MouseEvent, permalink: Permalink) {
  const toCopy = !!(permalink?.copy && permalink?.install);
  if (!toCopy) return;

  event.preventDefault();
  navigator.clipboard.writeText(permalink.install).then(() => {
    console.log("复制到剪贴板: ", permalink.install);
  });
}
</script>

<style scoped>
.permalink {
  display: inline-flex;
  border: 1px solid var(--Announcement-border);
  border-radius: 0.8em;
  padding: 0.3em 1.5em;
  margin-block-end: 2em;
  background-color: var(--Announcement-bg);
  max-width: 100%;
  box-shadow: var(--vp-shadow-1);
  transition: all 0.5s ease-in-out;
}

.permalink:hover {
  transform: translateY(-1px);
  box-shadow: var(--vp-shadow-2);
  border-color: var(--Announcement-border-hover);
  background-color: var(--Announcement-bg-hover);
  --Announcement-date-color: var(--vp-c-brand-2);
}

.permalink:active {
  transform: var(--Announcement-transform-active);
}

.permalink__content {
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: 600;
  font-size: 0.8em;
  display: inline-flex;
  align-items: center;
  margin-block-start: 0.5em;
}

.content {
  font-weight: 500;
  font-size: 0.75em;
}

.time-info {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.75em;
}
.icon {
  display: inline-flex;
  align-items: center;
  color: var(--Announcement-date-color);
  margin-inline-end: 0.5em;
}

.date {
  color: var(--Announcement-date-color);
  font-weight: bold;
  flex-grow: 1;
  margin-inline-start: 0.5em;
}

@media (max-width: 768px) {
  .time-info {
    justify-content: center;
  }
}
</style>
