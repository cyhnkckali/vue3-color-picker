<template>
    <div class="gradient-bar" @mousedown="$emit('onMouseDown', $event)" @touchstart="$emit('onMouseDown', $event)"
        @dragstart="handleItemDragStart">
        <div ref="gradientBar" class="gradient-container" @dblclick="$emit('onAddColor', $event)"
            @touchstart.self="handleDoubleTouch"></div>

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
    (e: 'onAddColor', value: MouseEvent | TouchEvent): void,
    (e: 'onMouseDown', value: MouseEvent | TouchEvent): void,
}>()

const handleItemDragStart = (e: MouseEvent) => {
    e.preventDefault()
}
let lastTouchTime = 0;
const doubleTapDelay = 300; // 300ms içinde ikinci dokunma yapılırsa çift dokunma sayılacak
const handleDoubleTouch = (e: TouchEvent) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTouchTime;

    if (timeDiff < doubleTapDelay && timeDiff > 0) {
        emits("onAddColor", e)
    }

    lastTouchTime = currentTime;
}


</script>