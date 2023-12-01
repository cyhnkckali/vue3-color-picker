<script setup lang="ts">
import { ref } from 'vue';
import ColorPicker from './components/ColorPicker.vue'

const color = ref('#ff0000ff')
const handleModel = (e: string) => {
  document.body.style.background = e;
}
</script>

<template>
  <p style="color: #ccc;">{{ color }}</p>
  <ColorPicker v-model="color" @update:model-value="handleModel" mode="solid" :showColorList="false"
    :showEyeDrop="false" />
</template>

<style>
body {
  height: 100vh;
}
</style>
