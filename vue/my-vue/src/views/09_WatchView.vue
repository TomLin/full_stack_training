<script setup>
import { watch, watchEffect, ref } from 'vue'
const count = ref(0)
const count2 = ref(0)
const msg = ref('')
const msg2 = ref('')
const keyword = ref('原始字串')
const msg3 = ref('')

// 監聽 count 這個 ref 變數的變化, 當 count 變化時會執行後面的回呼函式，會放入兩個參數，分別是新的值(newVal)和舊的值(oldVal)
watch(count, (newVal, oldVal) => {
  msg.value = `count 從 ${oldVal} 變成 ${newVal}`
})

watch(count2, (newVal, oldVal) => {
  if (count2.value > 5) {
    // 也可以寫 newVal > 5
    msg2.value = `count2 超過 5 了，太大了！目前是 ${newVal}，原先的值是 ${oldVal}`
  } else {
    msg2.value = `count2 還沒超過 5，目前是 ${newVal}，原先的值是 ${oldVal}`
  }
})

watchEffect(() => {
  // watchEffect 會自動追蹤裡面用到的 reactive 變數(因此不需要代入參數，它會依照程式碼裡面有用到的ref, reactive 變數, 進行追蹤)，所以
  // 這裡當 keyword 改變時，會重新執行這個函式
  msg3.value = `用 watchEffect 監看的值：${keyword.value}`
})
</script>

<template>
  <h2>09 Watch 監聽範例</h2>
  <!-- .lazy 是指 Do not update the variable while I am typing. Only update it when I confirm the change (usually by clicking away/losing focus). -->
  <input type="number" v-model.lazy="count" />
  <p>目前監聽 count 的值是：{{ count }}</p>
  <p>查看 msg 的值: {{ msg }}</p>
  <hr />
  <input type="number" v-model.lazy="count2" />
  <p>目前監聽 count2 的值是：{{ count2 }}</p>
  <p>查看 msg2 的值: {{ msg2 }}</p>
  <hr />
  <input type="text" v-model.lazy="keyword" />
  <p>目前監聽 keyword 的值是：{{ keyword }}</p>
  <p>查看 msg3 的值: {{ msg3 }}</p>
</template>
