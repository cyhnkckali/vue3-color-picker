<template>
  <div class="ck-cp-local-color-conatiner">
    <div class="ck-cp-color-list-label">
      <div style="display: flex; align-items: center">
        {{ title ? title : "Color Palette" }}

        <i v-if="iconClasses.arrowDown" :class="iconClasses.arrowDown"></i>
        <svg
          v-else
          width="32"
          height="14"
          viewBox="5 -5 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9995 16.8001C11.2995 16.8001 10.5995 16.5301 10.0695 16.0001L3.54953 9.48014C3.25953 9.19014 3.25953 8.71014 3.54953 8.42014C3.83953 8.13014 4.31953 8.13014 4.60953 8.42014L11.1295 14.9401C11.6095 15.4201 12.3895 15.4201 12.8695 14.9401L19.3895 8.42014C19.6795 8.13014 20.1595 8.13014 20.4495 8.42014C20.7395 8.71014 20.7395 9.19014 20.4495 9.48014L13.9295 16.0001C13.3995 16.5301 12.6995 16.8001 11.9995 16.8001Z"
          />
        </svg>
      </div>
      <button
        v-if="isSelectItem"
        type="button"
        class="cp-main-btn"
        @click="deleteColor"
        style="width: 17.33px; height: 17.33px"
      >
        <i v-if="iconClasses.delete" :class="iconClasses.delete"></i>
        <svg
          v-else
          width="18"
          height="18"
          viewBox="-2 -2 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.9997 6.72998C20.9797 6.72998 20.9497 6.72998 20.9197 6.72998C15.6297 6.19998 10.3497 5.99998 5.11967 6.52998L3.07967 6.72998C2.65967 6.76998 2.28967 6.46998 2.24967 6.04998C2.20967 5.62998 2.50967 5.26998 2.91967 5.22998L4.95967 5.02998C10.2797 4.48998 15.6697 4.69998 21.0697 5.22998C21.4797 5.26998 21.7797 5.63998 21.7397 6.04998C21.7097 6.43998 21.3797 6.72998 20.9997 6.72998Z"
          />
          <path
            d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25H13.3107C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76H10.7007C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z"
          />
          <path
            d="M15.2104 22.7501H8.79039C5.30039 22.7501 5.16039 20.8201 5.05039 19.2601L4.40039 9.19007C4.37039 8.78007 4.69039 8.42008 5.10039 8.39008C5.52039 8.37008 5.87039 8.68008 5.90039 9.09008L6.55039 19.1601C6.66039 20.6801 6.70039 21.2501 8.79039 21.2501H15.2104C17.3104 21.2501 17.3504 20.6801 17.4504 19.1601L18.1004 9.09008C18.1304 8.68008 18.4904 8.37008 18.9004 8.39008C19.3104 8.42008 19.6304 8.77007 19.6004 9.19007L18.9504 19.2601C18.8404 20.8201 18.7004 22.7501 15.2104 22.7501Z"
          />
          <path
            d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
          />
          <path
            d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
          />
        </svg>
      </button>
    </div>

    <div class="ck-cp-color-list">
      <div
        v-for="item in localColorList"
        :key="`color-${item.color}`"
        class="ck-cp-color-item"
        :class="item.selected ? 'ck-select' : ''"
        :style="{ backgroundColor: item.color }"
        @click="setSelectColor(item.color)"
      ></div>

      <button type="button" class="cp-btn-save-color" @click="saveColor">
        <i v-if="iconClasses.save" :class="iconClasses.save"></i>
        <svg
          v-else
          width="25"
          height="25"
          viewBox="2 2 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
          />
          <path
            d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { IconClasses } from "../core/types/types.ts";
const props = defineProps({
  colorListCount: { default: 10, type: Number },
  hexVal: { default: "", type: String },
  title: { default: "", type: String },
  iconClasses: {
    default: {
      ruler: "",
      eyeDroper: "",
      arrowDown: "",
      save: "",
      delete: "",
    },
    type: Object as () => IconClasses,
  },
});

const emits = defineEmits<{
  (e: "color-item-click", color: string): void;
}>();

interface ListItem {
  color: string;
  selected: boolean;
}

const localColorList = ref<ListItem[]>([]);

const isSelectItem = computed(() =>
  localColorList.value.some((item) => item.selected == true)
);

const saveColor = () => {
  const status = localColorList.value.find(
    (item) => item.color === props.hexVal
  );
  if (!status) {
    const selectColor = localColorList.value.find(
      (item) => item.selected == true
    );

    if (!selectColor) {
      if (localColorList.value.length === props.colorListCount) {
        localColorList.value.pop();
      }

      let _v = props.hexVal;
      localColorList.value.unshift({ color: _v, selected: false });
    } else {
      selectColor.color = props.hexVal;
    }

    localStorage.setItem(
      "ck-cp-local-color-list",
      JSON.stringify(
        localColorList.value.map((item) => {
          return item.color;
        })
      )
    );
  }
};

const deleteColor = () => {
  localColorList.value = localColorList.value.filter(
    (item) => item.selected == false
  );
  localStorage.setItem(
    "ck-cp-local-color-list",
    JSON.stringify(
      localColorList.value.map((item) => {
        return item.color;
      })
    )
  );
};

const setSelectColor = (color: string) => {
  localColorList.value.forEach((item) => {
    if (item.color === color) {
      item.selected = !item.selected;
    } else {
      item.selected = false;
    }
  });

  emits("color-item-click", color);
};

onBeforeMount(() => {
  let val = localStorage.getItem("ck-cp-local-color-list");
  if (val) {
    let list: string[] = JSON.parse(val);
    localColorList.value = list!.map((item) => {
      return {
        color: item,
        selected: false,
      };
    });
  }
});
</script>

<style></style>
