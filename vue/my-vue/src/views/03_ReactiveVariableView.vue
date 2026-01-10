<script setup>
import { ref, reactive } from 'vue'

const refMessage = ref('這是 ref 響應式變數')
const refNum = ref(100)

// 更改ref 的值
refNum.value = 200

const reactiveObj = reactive({
  message: '這是 reactive 響應式物件',
  count: 200,
})

// 更改 reactive 物件的值
reactiveObj.count = 400
</script>

<template>
  <h2>03 響應式變數 reactive variable</h2>
  <div>
    <h2>這是 refMessage: {{ refMessage }}</h2>
    <h2>這是 refNum: {{ refNum }}</h2>
    <hr />
    <h2>重覆使用 reactive variable</h2>
    <h3>重覆refMessage: {{ refMessage }}</h3>
  </div>
  <hr />
  <br />
  <div>
    <h2>這是 reactiveObj.message: {{ reactiveObj.message }}</h2>
    <h2>這是 reactiveObj.count: {{ reactiveObj.count }}</h2>
    <h2>重覆使用 reactive variable</h2>
    <h3>重覆reactiveObj.count: {{ reactiveObj.count }}</h3>
  </div>
</template>
