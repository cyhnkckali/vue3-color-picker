<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vue3ColorPicker from './components/Vue3ColorPicker.vue'

const color = ref('linear-gradient(rgb(8, 177, 255) 0%, rgb(107, 255, 243) 100%)')
const handleModel = (e: string) => {
  document.body.style.background = e;
}
onMounted(() => {
  if (color.value!)
    document.body.style.background = color.value
})
</script>

<template>
  <p style="color: #ccc;position: absolute;top:0">{{ color }}</p>
  <Vue3ColorPicker v-model="color" @update:model-value="handleModel" theme="dark" mode="gradient" gradient-mode="linear"
    :show-buttons="false" />
</template>

<style>
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
