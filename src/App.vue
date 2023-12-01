<script setup lang="ts">
import { ref } from 'vue';
import Vue3ColorPicker from './components/Vue3ColorPicker.vue'

const color = ref('#ff0000ff')
const handleModel = (e: string) => {
  document.body.style.background = e;
}
</script>

<template>
  <p style="color: #ccc;">{{ color }}</p>
  <Vue3ColorPicker v-model="color" @update:model-value="handleModel" />
</template>

<style>
body {
  height: 100vh;
}
</style>
