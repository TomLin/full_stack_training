import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // 在 main.js 引入 Pinia

import App from './App.vue'
import router from './router' // 預設會是 src/router/index.js

import piniaPersist from 'pinia-plugin-persistedstate' // 引入 pinia-plugin-persistedstate

const app = createApp(App)

// app.use(createPinia()) 要在 app.use(router) 之前，確保 router 裡面的元件可以使用到 pinia store
const pinia = createPinia()
pinia.use(piniaPersist) // 使用 pinia-plugin-persistedstate
app.use(pinia) // 在 Vue App instance 使用 Pinia

app.use(router)

/* 說明 window.Variable 和使用 app.config.globalProperties.$Variable 的差異
    1. window.Variable 是 JavaScript 原生的全域變數寫法，任何地方都可以使用 (包含非 Vue 的檔案) → 它是在瀏覽器的全域物件 window 下
    2. app.config.globalProperties.$Variable 是 Vue 提供的全域變數寫法，只有在 Vue 的組件 (component) 裡面可以使用 → 它是掛載在 Vue App instance 下
    3. 建議使用 app.config.globalProperties.$Variable 的方式，因為它比較符合 Vue 的設計邏輯，也比較不會跟其他非 Vue 的程式碼產生衝突
    4. 不過如果你有需要在非 Vue 的檔案使用全域變數，那就只能用 window.Variable 的方式了
    5. 注意修改了 window.Variable 後，Vue 的組件(template)不會自動更新畫面 (沒有 reactivity)，需要手動觸發更新
    6. 如果在同一個網頁，包了兩個以上的 Vue App instance，使用 app.config.globalProperties.$Variable 的方式，會各自有自己的值，不會互相影響；但使用 window.Variable 的方式，會共用同一個值，會互相影響
*/

// 這邊加上 JavaScript 的 window 的全域變數
window.windowGlobalVar = '這是我添加的一個全域變數'

// 這邊加上 Vue 的全域變數
app.config.globalProperties.$vueGlobalVar = '這是我添加的一個 Vue 全域變數'

// provide / inject 方式的全域變數
// provide 第一個參數是 key，第二個參數是 value
// provide / inject 類似部門內部分享變數的概念，可以讓子組件注入(使用)這個變數，而不是在全公司範圍內使用
app.provide('provideGlobalVar', '這是我添加的一個 provide / inject 全域變數')

app.mount('#app')
