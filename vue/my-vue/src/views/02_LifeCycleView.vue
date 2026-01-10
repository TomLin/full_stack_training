<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} from 'vue'

// 生命週期的英文是 life cycle hook

// 原本的寫法，會是 function onBeforeMount() { ... }, 下面是簡寫法
onBeforeMount(() => {
  console.log('02_LifeCircleView 掛載前 onBeforeMount')
})

onMounted(() => {
  console.log('02_LifeCircleView 已掛載 onMounted')
})

onBeforeUpdate(() => {
  console.log('02_LifeCircleView 更新前 onBeforeUpdate')
})

onUpdated(() => {
  console.log('02_LifeCircleView 已更新 onUpdated')
})

// 跳離這個元件之前會觸發 (例如切換到其他頁面)
onBeforeUnmount(() => {
  console.log('02_LifeCircleView 卸載前 onBeforeUnmount')
})

// 元件已經被卸載之後會觸發
onUnmounted(() => {
  console.log('02_LifeCircleView 已卸載 onUnmounted')
})

onErrorCaptured((err, instance, info) => {
  console.log('02_LifeCircleView 錯誤捕獲 onErrorCaptured', err, instance, info)
})
</script>

<template>
  <h2>02 LifeCycle</h2>
  <p>Open the console to see the life cycle logs.</p>
</template>
