<template>
    <ul class="color-input-menu">
        <li :class="inputType == 'RGB' ? 'active' : ''" @click="handleClick('RGB')">RGB</li>
        <li :class="inputType == 'HSL' ? 'active' : ''" @click="handleClick('HSL')">HSL</li>
        <li :class="inputType == 'HSV' ? 'active' : ''" @click="handleClick('HSV')">HSV</li>
        <li :class="inputType == 'CMYK' ? 'active' : ''" @click="handleClick('CMYK')">CMYK</li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InputType } from '../core/types/types.ts';
const props = defineProps({
    inputType: { default: 'RGB', type: String as () => InputType, },
})

const inputType = ref(props.inputType)

const emits = defineEmits<{
    (e: 'onChangeInputName', value: InputType): void,
}>()

const handleClick = (type: InputType) => {
    inputType.value = type
    emits("onChangeInputName", type)
}

</script>

<style lang="scss" >
.ck-cp-container .color-input-menu {
    position: absolute;
    z-index: 100;
    background-color: var(--cp-input-menu-bg);
    padding: 5px;
    border-radius: 8px;
    top: 20px;
    right: 0;
    box-shadow: 0px 0px 15px 0px var(--cp-container-shadow);
    width: 83px;
}

.ck-cp-container .color-input-menu li {
    list-style: none;
    text-align: center;
    padding: 5px 10px;
    user-select: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    color: var(--cp-label-color);
    border-radius: 4px;
}

.ck-cp-container .color-input-menu li.active {
    background-color: var(--cp-border-color);
    color: var(--cp-act-color);
}
</style>