<script setup >
import { ref } from "vue";
import ColorPicker from "./components/ColorPicker.vue";

const dval=ref('rgba(10,20,146,0.5)')
</script>

<template>
    <div>
        {{ dval }}
        <ColorPicker v-model="dval" mode="solid" :showColorList="false" :showEyeDrop="false" style="margin: 150px;" />

    </div>
</template>

<style scoped></style>