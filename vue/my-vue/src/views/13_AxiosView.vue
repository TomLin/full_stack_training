<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ProductItem from '@/components/Product.vue'

const responseData = ref('')
const products = ref([])

const newProductName = ref('')
const newProductPrice = ref(0)
const updateId = ref(1) // 假設要更新的產品ID是1

function btnGet() {
  axios
    .get('https://localhost:7193/api/Test') // 這裡特地創造了一個 CORS (Cross-Origin Resource Sharing) Error 來示範
    .then((response) => {
      console.log(response)
      responseData.value = response.data
      products.value = response.data
    })
    .catch((error) => {
      console.error('There was an error getting the data!', error)
    })
}

function btnPost() {
  axios
    .post('https://localhost:7193/api/Test', {
      // id: -1,
      name: newProductName.value,
      category: 'test_food',
      price: newProductPrice.value,
    })
    .then((response) => {
      console.log(response)
      responseData.value = response.data
    })
    .catch((error) => {
      console.error('There was an error posting the data!', error)
    })
}

function btnPut() {
  axios
    .put(`${import.meta.env.VITE_API_URL}${updateId.value}`, {
      // `https://localhost:7193/api/Test/${updateId.value}`
      // 將URL改成使用環境變數 VITE_API_URL
      id: updateId.value,
      name: newProductName.value,
      category: 'test_food',
      price: newProductPrice.value,
    })
    .then((response) => {
      console.log(response)
      responseData.value = response.data
    })
    .catch((error) => {
      console.error('There was an error putting the data!', error)
    })
}
</script>

<template>
  <h2>13 Axios Example</h2>
  <div>
    <button @click="btnGet">Get Data</button>
    <button @click="btnPost">Post Data</button>
    <button @click="btnPut">Put Data</button>
  </div>
  <div>
    <h2>新增手動資料</h2>
    <input
      type="number"
      placeholder="更新的產品ID(int)"
      v-model.number="updateId"
      style="margin-right: 10px"
    />
    <input type="text" placeholder="產品名稱" v-model="newProductName" style="margin-right: 10px" />
    <input type="number" placeholder="產品價格(int)" v-model.number="newProductPrice" />
  </div>
  <div>
    回傳結果：<br />
    {{ responseData }}
  </div>
  <hr />
  <div>
    <h2>搭配Loop 和 子元件的使用</h2>
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :productName="product.name"
      :productPrice="product.price"
    ></ProductItem>
  </div>
</template>
