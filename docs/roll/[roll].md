# Roll Page

You are viewing the page for: {{ $params.target }}

<script setup>
import { useData } from 'vitepress'

// 确保 params 已加载且包含 target
const { params } = useData()

console.log(params.value)  // 打印 params，以确认是否存在 target
</script>

<template>
  <div>
    Current Target: {{ params.target }}
  </div>
</template>