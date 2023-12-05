
<template>
  <div>
    <h1>Vue 3 Color Picker</h1>
    <p><span class="value">Color: {{ color }}</span></p>
    <div class="container pt-10">
      <Vue3ColorPicker class="test" v-if="isShow" style="width: 270px;" v-model="color" :mode="props.mode"
        :theme="props.theme" :show-alpha="props.showAlpha" :show-color-list="props.showList" :input-type="props.inputType"
        :show-eye-drop="props.showEye" :show-input-menu="props.showMenu" :color-list-count="16"
        :show-input-set="props.showSet" :type="props.type" @update:modelValue="handleChange" />

      <div class="row m-0" style="max-width: 310px;">
        <label class="form-label text-white m-0 p-0 mb-1">Mode</label>
        <select class="form-select form-select-sm mb-2" aria-label="Default select example" v-model="props.mode"
          @change="resetComponent">
          <option value="gradient">Gradient</option>
          <option value="solid">Solid</option>
        </select>
        <label class="form-label text-white m-0 p-0 mb-1">Theme</label>
        <select class="form-select form-select-sm mb-2" aria-label="Default select example" v-model="props.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label class="form-label text-white m-0 p-0 mb-1">Type</label>
        <select class="form-select form-select-sm mb-2" aria-label="Default select example" v-model="props.type">
          <option value="RGB">RGB</option>
          <option value="RGBA">RGBA</option>
          <option value="HEX">HEX</option>
          <option value="HEX8">HEX8</option>
        </select>
        <label class="form-label text-white m-0 p-0 mb-1">Input Type</label>
        <select class="form-select form-select-sm mb-2" aria-label="Default select example" v-model="props.inputType"
          @change="resetComponent">
          <option value="RGB">RGB</option>
          <option value="HSL">HSL</option>
          <option value="HSV">HSV</option>
          <option value="CMYK">CMYK</option>
        </select>

        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showAlpha" v-model="props.showAlpha">
          <label class="form-check-label text-white" for="showAlpha">Show Alpha (showAlpha)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showList" v-model="props.showList">
          <label class="form-check-label text-white" for="showList">Show List (showColorList)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showEye" v-model="props.showEye">
          <label class="form-check-label text-white" for="showEye">Show Eye Drop (showEyeDrop)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showSet" v-model="props.showSet">
          <label class="form-check-label text-white" for="showSet">Show Input Set (showInputSet)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showMenu" v-model="props.showMenu">
          <label class="form-check-label text-white" for="showMenu">Show Input Menu (showInputMenu)</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { onMounted, reactive, ref } from 'vue';

const color =ref('linear-gradient(90deg, rgb(0, 0, 255) 0%, rgb(178, 37, 91) 91%)')
const isShow=ref(true)
const props=reactive({
  mode:'gradient',
  theme:'light',
  type:'HEX8',
  inputType:'RGB',
  showAlpha:true,
  showList:true,
  showEye:true,
  showMenu:true,
  showSet:true,
})

const handleChange=()=>{
  document.querySelector('#app').style.background=color.value
}

const resetComponent =()=>{
  isShow.value=false
  if(props.mode=='gradient'){
    color.value='linear-gradient(90deg, rgb(0, 0, 255) 0%, rgb(178, 37, 91) 91%)'
    document.querySelector('#app').style.background=color.value
  }
  else{
    color.value='#730082'
    document.querySelector('#app').style.background=color.value
  }
  setTimeout(()=>{isShow.value=true},150)
}

onMounted(()=>{
  document.querySelector('#app').style.background=color.value
})
</script>

<style>
.container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.value {
  background-color: rgba(0, 0, 0, 0.308);
  padding: 10px;
  display: inline;
  margin: 15px 10px;
  color: #cecaca;
  border-radius: 10px;
}

.test input[type="text"] {
  font-size: 14px !important;
}

.test input[type="number"] {
  font-size: 14px !important;
}
</style>


