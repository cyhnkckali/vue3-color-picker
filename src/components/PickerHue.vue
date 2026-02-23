<template>
    <div class="picker-hue">
        <input :value="modelValue" class="picker-hue-range-slider" type="range" min="0" max="360" step="0.1"
            @input="handleInput" @change="$emit('onChange', $event)" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    modelValue: { default: 0, type: Number },
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void,
    (e: 'onInput', event: Event): void,
    (e: 'onChange', event: Event): void,
}>()

const handleInput = (event: Event) => {
    emits('update:modelValue', parseFloat((event.target as HTMLInputElement).value))
    emits('onInput', event)
}
</script>
