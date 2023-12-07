<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vue3ColorPicker from './components/Vue3ColorPicker.vue'

const color = ref('linear-gradient(90deg, rgb(68, 71, 119) 26%, rgb(0, 0, 255) 100%')
const handleModel = (e: string) => {
  document.body.style.background = e;
}
onMounted(() => {
  document.body.style.background = color.value
})
</script>

<template>
  <p style="color: #ccc;">{{ color }}</p>
  <Vue3ColorPicker v-model="color" @update:model-value="handleModel" theme="dark" :local="{ angle: 'Ceyhun' }"
    input-type="RGB" :disabled="false" />
</template>

<style>
body {
  height: 100vh;
}
</style>
