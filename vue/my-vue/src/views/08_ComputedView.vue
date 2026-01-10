<script setup>
import { computed, reactive, ref } from 'vue'
const categories = reactive([
  { id: 1, name: '水果' },
  { id: 2, name: '蔬菜' },
  { id: 3, name: '肉類' },
])

const categoryItems = reactive([
  { categoryId: 1, items: ['蘋果', '香蕉', '橘子'] },
  { categoryId: 2, items: ['高麗菜', '菠菜', '胡蘿蔔'] },
  { categoryId: 3, items: ['雞肉', '牛肉', '豬肉'] },
])

const selectedCategoryId = ref('')

const selectedCategory = computed(() => {
  if (selectedCategoryId.value == '') {
    // return [] // 若未選擇類別，回傳空陣列
    return categoryItems.flatMap((i) => i.items) // 若未選擇類別，回傳所有項目
  } else {
    return categoryItems.find((i) => i.categoryId == selectedCategoryId.value).items
  }
})
</script>

<template>
  <h2>08 Computed 範例</h2>
  <div>
    <p>這是一個使用 Computed 屬性的範例。</p>
    <p>Computed 屬性會根據其依賴的資料自動更新。</p>
    <h3>類別</h3>
    <select v-model="selectedCategoryId">
      <option value="">全部類別</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
    <h3>項目</h3>
    <p>依照category來顯示項目</p>
    <select>
      <option v-for="item in selectedCategory" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
