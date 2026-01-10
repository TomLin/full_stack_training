<script setup>
import { ref } from 'vue'
const num = ref(0)
const count = ref(0)
// 提供給鍵盤修飾符的範例
const keyword = ref('')

function increment() {
  num.value++
}

// 定義一個雙向綁定的函數
function updateNum() {
  num.value = count.value
}

// alert 範例
function alert() {
  window.alert('這個按鈕只能點一次，之後就失效了')
}

function handleKeyup() {
  window.alert(keyword.value)
}
</script>

<template>
  <h2>07 事件處理</h2>
  <div>現在的數值: {{ num }}</div>
  <button v-on:click="increment">按我，數值+1</button>
  <!-- 簡寫法，可以用 @click="increment" -->
  <br />
  <div>做雙向綁定</div>
  <!-- @change 指當輸入框的值改變時觸發，滑鼠要離開輸入框才會觸發 -->
  <input type="number" v-model="count" @change="updateNum" />
  <br />
  <div>按紐點一次，就失效的事件修飾符範例</div>
  <button @click.once="alert">只能點一次，之後就失效的按鈕</button>
  <hr />
  <br />
  <div>實作鍵盤修飾符的事件綁定</div>
  <!-- 下面的事件，是監控enter鍵，當它觸發keyup事件時會執行 -->
  <!-- 推薦語法，在html裡面的函數，盡量不要代入參數，參數的設定，放在<script>裡面，讓html變簡潔，並且後續也只需要維護script區域 -->
  <input type="text" placeholder="請按下 Enter 鍵" v-model="keyword" @keyup.enter="handleKeyup" />
</template>
