<template>
    <div class="ck-cp-input-content">
        <span class="ck-cp-input-label">{{ label }}</span>
        <input type="number" :min="min" :max="max" :value="modelValue" @input="handleInputEvent($event)"
            @keydown="handleRGBAOnKeydown" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    label: { default: '', type: String },
    modelValue: { default: 0, type: Number },
    min: { default: 0, type: Number },
    max: { default: 100, type: Number },
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void,
    (e: 'onInput', value: Event): void,
}>()


const handleInputEvent = (e: Event) => {
    emits('update:modelValue', parseInt((e.target as HTMLInputElement).value))
    emits('onInput', e)
}

const handleRGBAOnKeydown = (event: KeyboardEvent) => {
    if (
        event.code == 'KeyE' ||
        event.code == 'Equal' ||
        event.code == 'NumpadSubtract' ||
        event.code == 'Backslash' ||
        event.code == 'Slash' ||
        event.code == 'NumpadDecimal' ||
        event.code == 'NumpadAdd'
    ) {
        event.preventDefault()
    } else {
        let max = parseInt((event.target as HTMLInputElement).max)
        let val = parseInt((event.target as HTMLInputElement).value + event.key)
        if (val > max) {
            event.preventDefault()
        }
    }
}

</script>

<style lang="scss" scoped></style>