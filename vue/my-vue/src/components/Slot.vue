<script setup></script>

<template>
  <div>這是一個slot子元件</div>
  <p>子元件slot開始</p>
  <slot></slot>
  <hr />
  <div>額外資訊的SLOT</div>
  <slot name="extraInfo"></slot>
  <h3>子元件slot底部</h3>
  <hr />
</template>
