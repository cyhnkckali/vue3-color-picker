<template>
  <div ref="pickerWrap" class="cp-picker-wrap" @mousedown="$emit('onEventStart', $event)" @touchstart="
    $event.preventDefault();
  $emit('onEventStart', $event);
  " @dragstart="handleItemDragStart">
    <canvas ref="canvas" class="colour-area"> </canvas>
    <div class="colour-area-mask"></div>
    <div ref="pickerPointer" class="colour-area-point-circle"></div>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref } from "vue";

defineEmits<{
  (e: "onEventStart", value: TouchEvent | MouseEvent): void;
}>();

const canvas = inject<Ref>("canvas");
const pickerWrap = inject<Ref>("pickerWrap");
const pickerPointer = inject<Ref>("pickerPointer");

const handleItemDragStart = (e: MouseEvent) => {
  e.preventDefault();
};
</script>

<style lang="scss" scoped></style>
