<script setup >
import { ref } from "vue";
import ColorPicker from "./components/ColorPicker.vue";

const dval=ref()
</script>

<template>
    <div>
        {{ dval }}
        <ColorPicker v-model="dval" mode="solid" :showColorList="false" :showEyeDrop="false" style="margin: 150px;" />

    </div>
</template>

<style scoped></style>