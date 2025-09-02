<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vue3ColorPicker from './components/Vue3ColorPicker.vue'

const color = ref('radial-gradient(circle at 50% 50%, rgb(37, 47, 199) 0%, rgb(0, 0, 255) 100%)')
const show = ref(false)
const handleModel = (e: string) => {
  document.body.style.background = e;
}
onMounted(() => {
  if (color.value!)
    document.body.style.background = color.value
})
</script>

<template>
  <button @click="show = !show">Show</button>
  <p style="color: #ccc;position: absolute;top:0">{{ color }}</p>
  <Vue3ColorPicker v-if="show" v-model="color" @update:model-value="handleModel" theme="dark" mode="solid"
    gradient-mode="linear" :show-buttons="false" />
</template>

<style>
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
