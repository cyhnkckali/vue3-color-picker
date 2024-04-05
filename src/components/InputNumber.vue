<template>
    <div class="ck-cp-input-content">
        <span class="ck-cp-input-label">{{ label }}</span>
        <input
            type="number"
            :min="min"
            :max="max"
            :value="internal"
            @input="handleInput"
            @keydown="handleKeydown"
            @focusout="handleFocusOut"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    label: { default: '', type: String },
    modelValue: { default: 0, type: Number },
    min: { default: 0, type: Number },
    max: { default: 100, type: Number },
});

const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>();

const internal = ref<number | string>(props.modelValue);

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue) internal.value = newValue;
});

const emitUpdateModelValue = (event: Event) => {
    const updateModelAndEmitUpdateModelValue = (value: number) => {
        internal.value = value;
        emits('update:modelValue', value);
    };

    const value = (event.target as HTMLInputElement).value;
        
    if (!value) return updateModelAndEmitUpdateModelValue(props.modelValue);
    if (parseInt(value) > props.max) return updateModelAndEmitUpdateModelValue(props.max);
    emits('update:modelValue', parseInt(value));
};

const handleInput = (event: Event) => {
    internal.value = (event.target as HTMLInputElement).value;
};

const handleKeydown = (event: KeyboardEvent) => {
    const deprecatedCodes = ['KeyE', 'Equal', 'Equal', 'Backslash', 'Slash', 'NumpadDecimal', 'NumpadAdd'];
    if (deprecatedCodes.includes(event.code)) return event.preventDefault();
    if (event.code === 'Enter') emitUpdateModelValue(event);
};

const handleFocusOut = emitUpdateModelValue;
</script>
