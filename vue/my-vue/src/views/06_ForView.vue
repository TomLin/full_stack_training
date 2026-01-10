<script setup>
import { reactive } from 'vue'
const fruits = reactive([
  { name: '蘋果', price: 10, id: 1 },
  { name: '香蕉', price: 20, id: 2 },
  { name: '橘子', price: 30, id: 3 },
  { name: '芒果', price: 40, id: 4 },
  { name: '葡萄', price: 50, id: 5 },
])
</script>

<template>
  <h2>06 For Loop 的列表渲染</h2>
  <div>
    <span>水果列表：</span>
    <p>以下是使用 index 進行列表渲染</p>
    <ul>
      <li v-for="(item, index) in fruits" :key="index">
        index值:{{ index }} - name:{{ item.name }} - price:{{ item.price }}
      </li>
    </ul>
  </div>
  <hr />
  <!-- 另一個span和keyId的寫法 -->
  <div>以下是使用span和keyId的寫法</div>
  <!-- 下面的 v-for 是寫在 div 裡面，表示會產生很多個 div -->
  <div v-for="item in fruits" :key="item.id">
    <span>id:{{ item.id }} - name:{{ item.name }} - price:{{ item.price }}</span>
  </div>
  <hr />
  <!-- 還可以搭配 v-if、v-else、v-show 等指令進行條件渲染 -->
  <div>
    <span>價值大於等於 30 的水果：</span>
    <ul v-for="item in fruits" :key="item.id">
      <li v-if="item.price >= 30">
        id:{{ item.id }} - name:{{ item.name }} - price:{{ item.price }}
      </li>
    </ul>
  </div>
  <hr />
  <!-- 用 v-if 來更改樣式 -->
  <div>用 v-if 來更改樣式的範例：</div>
  <div v-for="item in fruits" :key="item.id">
    <span :style="{ color: item.price >= 30 ? 'red' : 'black' }"
      >id:{{ item.id }} - name:{{ item.name }} - price:{{ item.price }}</span
    >
  </div>
</template>
