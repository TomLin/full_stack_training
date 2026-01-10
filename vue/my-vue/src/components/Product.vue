<script setup>
import { defineProps } from 'vue'

// 定義元件的 props (properties的意思)
// props 也是 reactive 的，可以直接在 template 裡使用, 但是它是唯讀的(由父元件傳遞過來的參數)
const props = defineProps({
  // 下面是由父元件傳遞過來的參數，各自可以設定 data type 以及是否必須提供
  productId: {
    type: Number,
    required: false,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div>
    <p>這是我的產品元件</p>
    <p>產品 名稱: {{ props.productName }}</p>
    <p>
      <!-- 可以搭配v-if條件判斷，來顯示部份內容 -->
      產品 價格: {{ props.productPrice }} <label v-if="props.productPrice < 30">(特價中)</label>
    </p>
  </div>
  <hr />
</template>
