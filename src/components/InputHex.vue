<template>
    <div class="ck-cp-input-content color-hex">
        <span class="ck-cp-input-label">HEX</span>
        <input
            type="text"
            :value="internal"
            @input="handleInput"
            @keydown="handleKeydown"
            @focusout="handleFocusout"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const internal = ref('');

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    internal.value = value;
    internal.value = `#${value.replace(/#/g, "")}`;
};

const emitModelValue = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    if (value === props.modelValue) return;

    if (!/^#[0-9a-fA-F]+$/.test(value)) {
        internal.value = props.modelValue;
        return;
    }

    let newValue: string = value.replace(/#/g, "");

    switch (newValue.length) {
      case 0:
        newValue = props.modelValue.replace('#', '');
        break;
      case 1:
      case 2:
        newValue = newValue.repeat(3);
        break;
      case 4:
      case 5:
        newValue = newValue.slice(0, 3);
        break;
      case 3:
      case 6:
        break;
      default:
        newValue = newValue.slice(0, 6);
    }

    internal.value = `#${newValue.toUpperCase()}`;
    emits('update:modelValue', internal.value);
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') emitModelValue(event);
};

const handleFocusout = emitModelValue;

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue) internal.value = newValue;
}, { immediate: true });
</script>
