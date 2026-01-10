// 使用 pinia 的範例，都會儲存在 stores 資料夾內，pinia 原本是指鳳梨，而 stores 就是它的每一個果目，各自獨位，但是都屬於 pinia 這個鳳梨
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用 export 目的是讓其他元件可以引入這個 store, 否閱則這個 store 只能在這個檔案內使用
// 一個 vue 或是 js 檔，只能有一個 default export (程式碼不需要加 export keyword)，但可以有多個 named export (程式碼需要加 export keyword)
export const useMyCounterStore = defineStore('myCounter', () => {
  // state 狀態
  const count = ref(0)

  // actions 方法
  function increment() {
    count.value++
  }

  // actions 方法 - 減少
  function decrement() {
    count.value--
  }

  // getters 派生狀態
  // getters 是指從 state 派生出來的狀態，可以理解為計算屬性，派生是指從已有的狀態中計算出新的狀態
  const doubleCount = () => count.value * 2

  // 回傳 state、actions、getters
  return { count, increment, decrement, doubleCount }
})
