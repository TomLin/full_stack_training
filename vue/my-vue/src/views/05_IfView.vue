<script setup>
import { ref } from 'vue'
const weekdayNum = ref(2)
</script>

<template>
  <h2>05 If 條件渲染</h2>
  <p>下面的範例示範了 Vue 中的條件渲染功能。</p>
  <p>請在輸入框中輸入一個數字：</p>
  <input type="number" min="1" max="7" v-model="weekdayNum" />
  <div v-if="weekdayNum >= 1 && weekdayNum <= 5">今天營業中</div>
  <div v-else-if="weekdayNum == 6">今天營業到下午</div>
  <div v-else>今天休息</div>
  <hr />
  <h2>實作 v-show 範例</h2>
  <div v-show="weekdayNum >= 1 && weekdayNum <= 4">這是 v-show，值在1到4之間時顯示</div>
  <p>在數值是5到7時，vue會渲染加上 display: none 的樣式</p>
</template>
