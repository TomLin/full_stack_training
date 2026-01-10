<script setup>
import { defineEmits } from 'vue'

// 這裡的 defineEmits 用來declare 我們這個元件會發送哪些事件給父元件, 回傳的 emit 是個 function
const emit = defineEmits(['childEvent', 'secondEvent']) // 注意，這裡是使用陣列來定義多個事件

function emitEvent() {
  // 第一個參數是事件名稱，第二個之後參數是要傳遞的資料
  // 這裡我們發送一個名為 'childEvent' 的事件，並傳遞一個字串資料, 和一個數值資料
  // 父元件可以監聽這個事件並接收資料

  // 子元件會透過 emitEvent 方法，裡面呼叫 emit，並發送事件和資料給父元件
  emit('childEvent', '櫃子', 1500)
}

function emitSecondEvent() {
  // 第二個事件範例
  emit('secondEvent', '第二個事件邏輯')
}
</script>

<template>
  <div>
    <p>這是Child子元件發送事件的範例</p>
    <button @click="emitEvent" style="display: block; margin-bottom: 0.5rem">
      點擊我，發送事件給父元件
    </button>
    <button @click="emitSecondEvent" style="display: block">
      按鈕二，發送第二個特別事件邏輯給父元件
    </button>
    <p>子元件的底部</p>
    <hr />
  </div>
</template>
