<!-- 當有 setup 時，就不需要 export default 了(舊版 options API 寫法)，它是 syntactic sugar -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('route: ', route)
console.log('route.query.keyword: ', route.query.keyword) // 取得 URL 中的查詢參數，例如 /routerQuery?keyword=switch 中的 switch
console.log('route.query.page: ', route.query.page) // 取得 URL 中的查詢參數，例如 /routerQuery?keyword=switch&page=2 中的 2
console.log('route.name: ', route.name) // 取得目前路由的名稱
// const keyword = route.query.keyword
</script>

<template>
  <div class="test">
    <h1>This is a Router Query page</h1>
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
