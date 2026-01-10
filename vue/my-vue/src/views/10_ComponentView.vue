<script setup>
import { reactive } from 'vue'
import productItem from '@/components/Product.vue' // @ 符號代表 src (根目錄)資料夾的路徑
import ChildEmit from '@/components/ChildEmit.vue'
import SlotComponent from '@/components/Slot.vue'

const priceList = reactive([
  { item: 'Apple', price: 30 },
  { item: 'Banana', price: 10 },
  { item: 'Orange', price: 20 },
])

function handleChildEvent(item, price) {
  alert(`收到子元件的通知: 商品名稱=${item}, 價格=${price}`)
}

function handleSecondEvent(message) {
  alert(`收到子元件的第二個事件通知: ${message}`)
}
</script>

<template>
  <h2>10 Component 範例</h2>
  <div>
    <p>這是一個簡單的 Vue 元件範例。</p>
    <p>你可以在這裡展示如何使用元件來組織你的應用程式。</p>
  </div>
  <hr />
  <div>
    <h3>產品清單(利用Product元件來組成)</h3>
    <productItem :productName="'基本價格'" :productPrice="5"></productItem>
    <productItem
      v-for="element in priceList"
      :key="element.item"
      :productName="element.item"
      :productPrice="element.price"
    ></productItem>
  </div>
  <div>
    <h3>子元件通知父元件(使用emit方法)</h3>
  </div>
  <!-- 這邊父元件，接受子元件的事件，childEvent 和 secondEvent是從子元件的 emit('事件名稱') 中的"名稱"，得到的 -->
  <!-- 子元件的事件，再去呼叫父元件對應的處理函式 -->
  <ChildEmit @childEvent="handleChildEvent" @secondEvent="handleSecondEvent"></ChildEmit>
  <div>Slot插入內容的範例</div>
  <SlotComponent>
    <p style="color: blue">這是插入到 slot 裡面的內容。</p>
    <p style="color: green">你可以放任何你想要的元素或元件。</p>
    <template #extraInfo>
      <p style="color: red">這是插入到具名 slot (extraInfo) 裡面的內容。</p>
      <p style="color: purple">這裡可以放更多的資訊。</p>
    </template>
  </SlotComponent>
  <h3>(父元件)也可以只放入部份Slot的區域</h3>
  <SlotComponent>
    <!-- #extraInfo 這個slot名稱是可以自訂的 -->
    <template #extraInfo><p style="color: blue">這是只放入部份 slot 的內容。</p></template>
  </SlotComponent>
</template>
