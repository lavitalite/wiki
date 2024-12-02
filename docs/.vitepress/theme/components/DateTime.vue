<script>
const formatterKeys = Object.keys(dateFormatter)
</script>

<script setup>
const props = defineProps({
    date: {
        type: [Date,String],
        required: true,
        default: new Date()
    },
    precision: {
        type: String,
        required: false,
        default: "day"
    },
    formatter: {
        type: String,
        required: false,
        validator: value => formatterKeys.includes(value)
    }
})

const date = new Date(props.date)

</script>

<template>
    <time :datetime="date"></time>
</template>