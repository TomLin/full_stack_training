<script setup>
import { ref } from 'vue'
const vBindData = ref('我要單向綁定的資料')
</script>

<template>
  <h2>04 單向綁定</h2>
  <h3>原本的 vBindData 的值是: {{ vBindData }}</h3>
  <h3>經過 v-bind:value="vBindData" 之後</h3>
  <input type="text" v-bind:value="vBindData" />
  <!-- 上面的簡寫法，可以寫成 :value="vBindData", 只要是 html 元素的屬性，都可以這樣寫，例如: :type -->
  <p>上面 input 裡面的值，是由單向綁定而來的</p>

  <hr />
  <h3>原本的 vBindData 的值是: {{ vBindData }}</h3>
  <h3>經過雙向綁定之後，可以在 input 裡面修改它的值，也會連動更新原本的vBindData</h3>
  <input type="text" v-model="vBindData" />
  <p>上面 input 裡面的值，是由雙向綁定而來的</p>
</template>
