<template>
   <i class="icon icon-{{ type }}"></i>
</template>

<script setup lang="ts">

import { provide } from 'vue';
defineProps({
    type: {
        type: String,
        default: ''
    }
})


</script>

<style lang="scss" scoped>
@font-face{
    font-family: weather;
    src: url("./Whethers-wGjn.ttf") format("truetype");
}

.icon {
    font-style: normal;
}


.icon::before,
.icon::after {
    font-family: weather !important;
}

.icon.icon-sunny:before{
    content: 'M'
}
</style>