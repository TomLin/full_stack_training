<script setup>
import { inject, ref } from 'vue'
console.log('JavaScript 的 window 的全域變數:', window.windowGlobalVar)

const refVar = ref('')
refVar.value = window.windowGlobalVar
const viteVar = ref('')
viteVar.value = import.meta.env.VITE_TITLE

import { getCurrentInstance } from 'vue'
const internalInstance = getCurrentInstance()
const { proxy } = internalInstance // 這是解構出來的 Vue 元件實例的 proxy 物件
const propertyName = ref('')
propertyName.value = proxy.$vueGlobalVar

const provideInjectVar = ref('')
provideInjectVar.value = inject('provideGlobalVar')
</script>

<template>
  <div>
    <h3>11 JavaScript Window Env 環境變數的使用</h3>
    <!-- JavaScript 的 window 的全域變數, 需要放在 ref 裡面，才能在 template 裡面使用 -->
    <p>{{ refVar }}</p>
  </div>
  <div>
    <!-- VITE 環境變數 -->
    {{ viteVar }}
  </div>
  <div>
    <!-- Vue 全域變數 -->
    {{ propertyName }}
  </div>
  <div>
    <!-- Vue provide/inject 全域變數 -->
    {{ provideInjectVar }}
  </div>
</template>
