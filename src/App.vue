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
  <p style="color: #ccc;position: absolute;top:0">{{ color }}</p>
  <Vue3ColorPicker v-model="color" @update:model-value="handleModel" theme="light" mode="solid"  :show-picker-mode="true" :show-input-menu="true" :show-color-list="true" :show-eye-drop="true"
    input-type="RGB" :disabled="false"/>
</template>

<style>
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
