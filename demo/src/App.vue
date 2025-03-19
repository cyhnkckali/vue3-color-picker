<template>
  <div>
    <h1 class="d-flex w-100 align-items-center justify-content-between"><label class="me-10">Vue 3 Color Picker <span
          class="ms-4" style="font-size: 12px; color: #ddd;">v 2.1.1</span></label>


      <div class="d-flex gap-2">
        <a class=" btn btn-sm rounded-circle btn-light" style="width: 40px; height: 40px;padding: 6px"
          href="https://www.npmjs.com/package/@cyhnkckali/vue3-color-picker" data-hotkey="g d" aria-label="Homepage "
          data-turbo="false"
          data-analytics-event="{&quot;category&quot;:&quot;Header&quot;,&quot;action&quot;:&quot;go to dashboard&quot;,&quot;label&quot;:&quot;icon:logo&quot;}">

          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>npm</title>
            <path
              d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
          </svg>
        </a>
        <a class=" btn btn-sm rounded-circle btn-light" style="width: 40px; height: 40px;padding: 3px 3px;"
          href="https://github.com/cyhnkckali/vue3-color-picker" data-hotkey="g d" aria-label="Homepage "
          data-turbo="false"
          data-analytics-event="{&quot;category&quot;:&quot;Header&quot;,&quot;action&quot;:&quot;go to dashboard&quot;,&quot;label&quot;:&quot;icon:logo&quot;}">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true"
            class="octicon octicon-mark-github v-align-middle color-fg-default">
            <title>Git</title>
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z">
            </path>
          </svg>
        </a>
      </div>
    </h1>
    <p><span class="value">Color: {{ color }}</span> </p>
    <div class="container pt-10">
      <Vue3ColorPicker class="test" v-if="isShow" style="width: 270px;" v-model="color" :mode="props.mode"
        :theme="props.theme" :show-alpha="props.showAlpha" :show-color-list="props.showList"
        :input-type="props.inputType" :show-eye-drop="props.showEye" :show-input-menu="props.showMenu"
        :color-list-count="16" :show-input-set="props.showSet" :type="props.type" @update:modelValue="handleChange"
        :disabled="props.disabled" :showPickerMode="props.showPickerMode" :showButtons="props.showButtons"
        gradient-mode="radial" />

      <div class="row m-0" style="max-width: 310px;">
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
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showPickerMode"
            v-model="props.showPickerMode">
          <label class="form-check-label text-white" for="showPickerMode">Show Picker Mode Input
            (showPickerMode)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="showButton" v-model="props.showButtons">
          <label class="form-check-label text-white" for="showButton">Show Button (showButtons)</label>
        </div>
        <div class="form-check form-switch mb-2">
          <input class="form-check-input " type="checkbox" role="switch" id="disabled" v-model="props.disabled">
          <label class="form-check-label text-white" for="disabled">Disabled (disabled)</label>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import { onMounted, reactive, ref } from 'vue';

const color = ref('radial-gradient(circle at 0% 18%, rgb(178, 37, 91) 11%, rgb(15, 85, 182) 40%, rgb(178, 37, 91) 77%, rgb(15, 85, 182) 100%)')
const isShow = ref(true)
const props = reactive({
  mode: 'gradient',
  theme: 'light',
  type: 'HEX8',
  inputType: 'RGB',
  showButtons: false,
  showAlpha: true,
  showList: true,
  showEye: true,
  showMenu: true,
  showSet: true,
  showPickerMode: true,
  show: true,
  disabled: false,
})

const handleChange = () => {
  document.querySelector('#app').style.background = color.value
}

const resetComponent = () => {
  isShow.value = false
  if (props.mode == 'gradient') {
    color.value = 'radial-gradient(circle at 0% 18%, rgb(178, 37, 91) 11%, rgb(15, 85, 182) 40%, rgb(178, 37, 91) 77%, rgb(15, 85, 182) 100%)'
    document.querySelector('#app').style.background = color.value
  }
  else {
    color.value = '#730082'
    document.querySelector('#app').style.background = color.value
  }
  setTimeout(() => { isShow.value = true }, 150)
}

onMounted(() => {
  document.querySelector('#app').style.background = color.value
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
