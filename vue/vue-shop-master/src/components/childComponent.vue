<template>
    <div>這是child元件</div>
    <button @click="emit('doAction')">
        點擊我
    </button>
    <slot></slot>
</template>

<script setup>

import { defineEmits } from 'vue'

const emit = defineEmits(['doAction'])

</script>