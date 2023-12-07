<template>
    <div class="gradient-bar" @mousedown="$emit('onMouseDown', $event)" @dragstart="handleItemDragStart">
        <div ref="gradientBar" class="gradient-container" @dblclick="$emit('onAddColor', $event)"></div>

        <!-- Target Created -->
        <!-- <div class="gradient-handle" style="left: 0; z-index: -1000; pointer-events: none">
            <div class="gradient-handle-content"></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';


const gradientBar = inject<Ref>('gradientBar')

const emits = defineEmits<{
    (e: 'onAddColor', value: MouseEvent): void,
    (e: 'onMouseDown', value: MouseEvent): void,
}>()

const handleItemDragStart = (e: MouseEvent) => {
    e.preventDefault()
}


</script>

<style lang="scss" scoped></style>