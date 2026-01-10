<template>
    <div class="box">
        <p>商品名稱: {{ name }}</p>
        <p>商品價格: {{ price }}</p>
        <p>商品描述: {{ description }}</p>
    </div>
</template>

<script setup>

import { defineProps } from 'vue'

defineProps({
    name: String,
    price: Number,
    description: String,
})

</script>

<style scoped>
.box {
    border: 1px solid #ccc;
}
</style>