<script setup>
import { useMyCounterStore } from '@/stores/myCounter.js'
import { useMyCounterPersistStore } from '@/stores/myCounterPersist'

const counterStore = useMyCounterStore()
const counterPersistStore = useMyCounterPersistStore()
</script>

<template>
  <div>
    <h2>12 Pinia Store Example</h2>
    <p>myCounter計數: {{ counterStore.count }}</p>
    <button @click="counterStore.increment" style="margin-right: 10px">Increment</button>
    <button @click="counterStore.decrement" style="margin-bottom: 10px">Decrement</button>
  </div>
  <hr />
  <div>
    <h2>Persisted Pinia State</h2>
    <p>myCounterPersist計數: {{ counterPersistStore.count }}</p>
    <button @click="counterPersistStore.increment" style="margin-right: 10px">Increment</button>
    <button @click="counterPersistStore.decrement">Decrement</button>
  </div>
</template>
