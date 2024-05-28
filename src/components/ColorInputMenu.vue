<template>
  <button type="button" class="cp-btn" @click="handleClick">
    {{ inputType }}
    <i v-if="iconClass" :class="iconClass"></i>
    <svg
      v-else
      width="16"
      height="16"
      viewBox="-12 -4 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9995 16.8001C11.2995 16.8001 10.5995 16.5301 10.0695 16.0001L3.54953 9.48014C3.25953 9.19014 3.25953 8.71014 3.54953 8.42014C3.83953 8.13014 4.31953 8.13014 4.60953 8.42014L11.1295 14.9401C11.6095 15.4201 12.3895 15.4201 12.8695 14.9401L19.3895 8.42014C19.6795 8.13014 20.1595 8.13014 20.4495 8.42014C20.7395 8.71014 20.7395 9.19014 20.4495 9.48014L13.9295 16.0001C13.3995 16.5301 12.6995 16.8001 11.9995 16.8001Z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { InputType } from "../core/types/types.ts";
const props = defineProps({
  iconClass: { default: "", type: String },
  inputType: { default: "RGB", type: String as () => InputType },
});

const inputType = ref(props.inputType);

const inputTypes: InputType[] = ["CMYK", "HSL", "HSV", "RGB"];

const emits = defineEmits<{
  (e: "onChangeInputName", value: InputType): void;
}>();

const handleClick = () => {
  const ind = inputTypes.findIndex((item) => item == inputType.value);

  const type = inputTypes[ind + 1] ? inputTypes[ind + 1] : inputTypes[0];

  inputType.value = type;

  emits("onChangeInputName", type);
};
</script>

<style lang="scss"></style>
