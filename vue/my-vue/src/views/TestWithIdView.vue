<!-- 當有 setup 時，就不需要 export default 了(舊版 options API 寫法)，它是 syntactic sugar -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('route: ', route)
console.log('route.params.id: ', route.params.id) // 取得 URL 中的參數，例如 /routerParams/456 中的 456
// const id = route.params.id
</script>

<template>
  <div class="test">
    <h1>This is a TEST page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .test {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
