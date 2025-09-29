<template>
  <div class="opacity-bar">
    <input ref="opacitySlider" :value="modelValue" class="opacity_slider" type="range" min="0" max="100"
      @input="handleInput" />
  </div>
</template>

<script setup lang="ts">
import { Ref, inject } from "vue";

defineProps({
  modelValue: { default: 0, type: Number },
});

const opacitySlider = inject<Ref>("opacitySlider");

const emits = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "onInput", event: Event): void;
}>();

const handleInput = (event: Event) => {
  emits(
    "update:modelValue",
    parseInt((event.target as HTMLInputElement).value)
  );
  emits("onInput", event);
};
</script>
